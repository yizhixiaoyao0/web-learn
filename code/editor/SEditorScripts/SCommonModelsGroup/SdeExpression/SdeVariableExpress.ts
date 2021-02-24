import {
  PageGetTargetVariableValueDelegate,
  SPageDefines,
  PageSetTargetVariableValueDelegate,
} from '../defines/PageDefines';
import { EValueType } from '../ServerModel';


export class VarSentenceResolveOption {

  /**
   * 解析字符串变量后,是否自动将此加上双引号,默认 true
   *
   * @type {boolean}
   * @memberof VarSentenceResolveOption
   */
  public ResultStringVarExpWithDoubleQuotationMarks: boolean = true;
}


// SDE 变量表达式解析器
export namespace SdeVariableExpressSpace {
  export enum EOpenVarPrefixType {
    kUnKnown = 0,
    kComSelfProperty = 1,
    kComSelfOpenVar = 2,
    kComWithIdOpenVar = 3,
    kPageOpenVar = 4,
    kSysOpenVar = 5,
  }

  // 变量表达式解析器
  export class SdeVariableExpressResolver {
    // 回调可以得到目标的变量值
    public PageGetTargetVariableValueDelegate: PageGetTargetVariableValueDelegate = null;
    public PageSetTargetVariableValueDelegate: PageSetTargetVariableValueDelegate = null;

    public Initialize(
      pageGetTragetVariableValueDelegate: PageGetTargetVariableValueDelegate,
      pageSetTargetVariableValueDelegate: PageSetTargetVariableValueDelegate,
    ) {
      this.PageGetTargetVariableValueDelegate = pageGetTragetVariableValueDelegate;
      this.PageSetTargetVariableValueDelegate = pageSetTargetVariableValueDelegate;
    }

    /**
     * 找出所有的变量表达式.
     * 返回比如: ['@(#%var)', '@(##comInstID&var)']
     *
     * @param {string} expressRaw 来源表达式
     * @returns 返回变量表达式数组
     * @memberof SdeVariableExpressResolver
     */
    public FindVarBodyArr(expressRaw: string) {
      if (expressRaw == null) { return []; }
      // 举例:   var str = "@(#%var) ==  5 || @(##comInstID&var)  < 0";
      // 依据正则找出:  ['@(#%var)', '@(##comInstID&var)']
      // 找出表达式中所有的变量表达式
      let pattern = /@\(.*?\)/g;
      let varExpressArr = expressRaw.match(pattern);
      return varExpressArr;
    }

    /**
     * 解析变量表达式体获取数值,
     * 并将value值替换原表达式中的变量表达式
     * (不含@IF这样的关键词)
     *
     * @param {string} rawExpress 原表达式
     * @param {string} varexp 变量表达式
     * @param {string} selfComInstId 组件ID
     * @returns {string} 返回替换后的表达式
     * @memberof SdeVariableExpressResolver
     */
    public ResolveAndReplaceOneVariable(
      rawExpress: string,
      varexp: string,
      selfComInstId: string,
      option?: VarSentenceResolveOption,
    ): string {

      let valueStruct = this.ResolveExpressAndReturnValue(
        varexp,
        selfComInstId,
      );

      let v = valueStruct.GetValue();


      if (valueStruct.valueType === EValueType.kString) {

        if (option && option.ResultStringVarExpWithDoubleQuotationMarks) {
          v = '"' + v + '"';
        }

      } else if (valueStruct.valueType === EValueType.kNumber) {
        if (v == null || v === '') {
          v = 0;
        }
      }

      let newExpress = rawExpress.replace(varexp, v.toString());

      return newExpress;
    }


    /**
     * 解析一条语句,将里面的变量表达式全部替换后返回
     *
     * @memberof SdeVariableExpressResolver
     */
    public ResolveAndReplaceSentense(selfComInstId: string, SentenceWithVarExp: string, option?: VarSentenceResolveOption) {
      let str = SentenceWithVarExp;
      let varExpressArr =  this.FindVarBodyArr(SentenceWithVarExp);

      if (varExpressArr != null) {
        varExpressArr.forEach((varexp) => {
          str = this.ResolveAndReplaceOneVariable(str, varexp, selfComInstId, option);
        });
      }
      return str;
    }
    /**
     * 得到变量表达式Body @(::prop) 剥离成 ::prop
     *
     * @param {string} express
     * @returns
     * @memberof SdeVariableExpressResolver
     */
    public GetVarExpressBody(express: string) {
      express = express.trim();

      // @(::prop) 剥离成 ::prop
      // @(#:comInstID&var) 剥离成 #:comInstID&var 等等
      let expBody: string = express.substring(2, express.length - 1);
      return expBody;
    }

    /*
      - 组件自身属性:     @(::prop)
      - 组件自身开放变量: @(#:var)
      - 其他组件开放变量: @(##comInstID&var)
      - 页面开放变量:     @(#%var)
      - 系统预制变量:     @(#@timestamp_now)
    */
    // 解析变量表达式
    // express:传入的值形式如上
    // 解析不出会返回null
    public ResolveExpressAndReturnValue(
      express: string,
      selfComInstId: string,
    ): SPageDefines.SdeValueStruct {
      // @(::) 肯定是5个以上的字符串
      if (express.length <= 5) { return null; }
      express = express.trim();

      // @(::prop) 剥离成 ::prop
      // @(#:comInstID&var) 剥离成 #:comInstID&var 等等
      let expBody: string = this.GetVarExpressBody(express);

      return this.ResolveExpressAndReturnValueByBody(expBody, selfComInstId);
    }

    /**
     * 通过变量表达式的Body,去掉系统标识符,得到剩下的名称,
     * 比如 "::prop" 得到 "prop",
     * 比如 "#:var" 得到 "var",
     * 比如 "##comInstID&var" 得到 "comInstID&var",
     * 比如 "#%var" 得到 "var",
     * @param {string} expBody
     * @memberof SdeVariableExpressResolver
     */
    public GetExpBodyVarName(expBody: string) {
      expBody = expBody.trim();
      return expBody.substring(2, expBody.length);
    }


    // 设置调用
    /**
     *
     *
     * @param {string} expBody 形如:   #:comInstID&var
     * @param {string} selfComInstId
     * @param {*} value
     * @returns {void}
     * @memberof SdeVariableExpressResolver
     */
    public ResolveExpressAndSetValue( expBody: string,  selfComInstId: string, value: any): void {
      let prefixType = this.GetPrefixStringAndReturnType(expBody);
      let rightBody = this.GetExpBodyVarName(expBody);
      switch (prefixType) {
        // 自身属性
        case EOpenVarPrefixType.kComSelfProperty:
          this.SetProp(selfComInstId, selfComInstId, rightBody, value);
          return;
        // 自身开放变量
        case EOpenVarPrefixType.kComSelfOpenVar:
          this.SetOpenVar(selfComInstId, selfComInstId, rightBody, value);
          return;

        // 其他组件开放变量
        case EOpenVarPrefixType.kComWithIdOpenVar:
          let arr = rightBody.split('&');
          if (arr.length !== 2) {
            return null;
          }

          this.SetOpenVar(selfComInstId, arr[0], arr[1], value);
          return;

        // 页面开放变量
        case EOpenVarPrefixType.kPageOpenVar:
          this.SetPageVar(selfComInstId, rightBody, value);
          return;

        default:
          return;
      }
    }

    // expBody例如  #:comInstID&var
    // 解析不出会返回null
    public ResolveExpressAndReturnValueByBody(
      expBody: string,
      selfComInstId: string,
    ): SPageDefines.SdeValueStruct {
      let prefixType = this.GetPrefixStringAndReturnType(expBody);
      let rightBody = this.GetExpBodyVarName(expBody);


      switch (prefixType) {
        // 自身属性
        case EOpenVarPrefixType.kComSelfProperty:
          return this.GetProp(selfComInstId, selfComInstId, rightBody);

        // 自身开放变量
        case EOpenVarPrefixType.kComSelfOpenVar:
          return this.GetOpenVar(selfComInstId, selfComInstId, rightBody);

        // 其他组件开放变量
        case EOpenVarPrefixType.kComWithIdOpenVar:
          let arr = rightBody.split('&');
          if (arr.length !== 2) {
            return null;
          }
          return this.GetOpenVar(selfComInstId, arr[0], arr[1]);

        // 页面开放变量
        case EOpenVarPrefixType.kPageOpenVar:
          return this.GetPageVar(selfComInstId, rightBody);

        // 系统开放变量
        case EOpenVarPrefixType.kSysOpenVar:

          return this.GetSysVar(selfComInstId, rightBody);

        default:
          return null;
      }
    }

    // //@SET[ @(#:var) = 3; @(#:comInstID&var) = "hello";]
    // public SetVariableExpress(express: string) {}

    // //@(#:var) = 3
    // public SetVariableExpressRaw(expressRaw: string) {}

    /**
     * 通过变量表达式体(比如: #:var)来解析，得到是什么类型的变量表达式
     *
     * @param {string} expBody #:comInstID&var
     * @returns {EOpenVarPrefixType}
     * @memberof SdeVariableExpressResolver
     */
    public GetPrefixStringAndReturnType(expBody: string): EOpenVarPrefixType {
      // 得到前缀比如 :: 或者 #:
      let prefix: string = expBody.slice(0, 2);
      // 根据前缀得到类型
      let prefixType: EOpenVarPrefixType = this.GetPrefixType(prefix);
      return prefixType;
    }

    public GetPrefixType(sign: string): EOpenVarPrefixType {
      sign = sign.trim();
      switch (sign) {
        case '::':
          return EOpenVarPrefixType.kComSelfProperty;
        case '#:':
          return EOpenVarPrefixType.kComSelfOpenVar;
        case '##':
          return EOpenVarPrefixType.kComWithIdOpenVar;
        case '#%':
          return EOpenVarPrefixType.kPageOpenVar;
        case '#@':
          return EOpenVarPrefixType.kSysOpenVar;
        default:
          return EOpenVarPrefixType.kUnKnown;
      }
    }


    /**
     * 书写变量表达式-自身属性 @(::prop)
     *
     * @param {string} propName
     * @returns
     * @memberof SdeVariableExpressResolver
     */
    public CreateVarFullExpress_SelfProp(propName: string) {
      return '@(::' + propName + ')';
    }
    /**
     * 书写变量表达式-自身开放变量 @(#:var)
     *
     * @param {string} varName
     * @returns
     * @memberof SdeVariableExpressResolver
     */
    public CreateVarFullExpress_SelfOpenVar(varName: string) {
      return '@(#:' + varName + ')';
    }
    /**
     * 书写变量表达式-其他组件开放变量 @(##comInstID&var)
     *
     * @param {string} targetComInstId
     * @param {string} varName
     * @returns
     * @memberof SdeVariableExpressResolver
     */
    public CreateVarFullExpress_ComWithIdOpenVar(
      targetComInstId: string,
      varName: string,
    ) {
      return '@(##' + targetComInstId + '&' + varName + ')';
    }
    /**
     * 书写变量表达式-页面开放变量  @(#%var)
     *
     * @param {string} varName
     * @returns
     * @memberof SdeVariableExpressResolver
     */
    public CreateVarFullExpress_PageOpenVar(varName: string) {
      return '@(#%' + varName + ')';
    }
    /**
     * 书写变量表达式-系统预制变量 @(#@timestamp_now)
     *
     * @param {string} varName
     * @returns
     * @memberof SdeVariableExpressResolver
     */
    public CreateVarFullExpress_SysVar(varName: string) {
      return '@(#@' + varName + ')';
    }

    // 获取目标组件属性值
    private GetProp(
      selfComInstId: string,
      targetComInstId: string,
      propName: string,
    ): SPageDefines.SdeValueStruct {
      let v = this.PageGetTargetVariableValueDelegate(
        SPageDefines.ETargetKind.kCom,
        selfComInstId, targetComInstId,
        propName,
        false,
      );
      return v;
    }

    // 设置目标组件属性值
    private SetProp(
       selfComInstId: string,
       targetComInstId: string, propName: string, value: any): void {

      this.PageSetTargetVariableValueDelegate(
        SPageDefines.ETargetKind.kCom,
        selfComInstId, targetComInstId,
        propName,
        false,
        value,
        );
    }

    // 获取目标组件OpenVar变量值
    private GetOpenVar(
      selfComInstId: string,
      targetComInstId: string,
      varName: string,
    ): SPageDefines.SdeValueStruct {
      let v = this.PageGetTargetVariableValueDelegate(
        SPageDefines.ETargetKind.kCom,
        selfComInstId, targetComInstId,
        varName,
        true,
      );
      return v;
    }

    // 设置目标组件OpenVar变量值
    private SetOpenVar(     selfComInstId: string,
                            targetComInstId: string, varName: string, value: any): void {
      this.PageSetTargetVariableValueDelegate(
        SPageDefines.ETargetKind.kCom,
        selfComInstId, targetComInstId,
        varName,
        true,
        value,
        );
    }

    // 获取页面OpenVar变量值
    private GetPageVar(  selfComInstId: string, varName: string): SPageDefines.SdeValueStruct {
      let v = this.PageGetTargetVariableValueDelegate(
        SPageDefines.ETargetKind.kPage,
        selfComInstId, '',
        varName,
        true,
      );
      return v;
    }

    // 设置页面OpenVar变量值
    private SetPageVar(  selfComInstId: string, varName: string, value: any): void {
      this.PageSetTargetVariableValueDelegate(
        SPageDefines.ETargetKind.kPage,
        selfComInstId,
        '',
        varName,
        true,
        value,
      );
    }

    // 获取系统OpenVar变量值
    private GetSysVar(  selfComInstId: string, varName: string): SPageDefines.SdeValueStruct {
      let v = this.PageGetTargetVariableValueDelegate(
        SPageDefines.ETargetKind.kSys,
        selfComInstId,
        '',
        varName,
        true,
      );
      return v;
    }
  }
}
