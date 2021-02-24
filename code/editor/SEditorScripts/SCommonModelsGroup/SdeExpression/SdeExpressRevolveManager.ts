import { SdeVariableExpressSpace } from './SdeVariableExpress';
import { PageGetTargetVariableValueDelegate, PageSetTargetVariableValueDelegate, SPageDefines } from '../defines/PageDefines';
import SdeFunctionUtils from './SdeFunction/SdeFunctionUtils';
import { SdeExpressResolvorSpace } from './SdeExpressionResolvor';

// 设置变量的单个信息,比如通过 @(#:var) = 3  ,分析得到以下的结构
// export class SetExpressItemInfo {
//   VarExpressRaw:string = "";
//   ComInstId:string = "";
//   VarName:string = "";
//   Value:any = null;
//   targetKind:SPageDefines.ETargetKind;
// }

// Sde表达式解析-总控制管理
export default class SdeExpressRevolveManager {

  private static _inst: SdeExpressRevolveManager;
  public static get Inst(): SdeExpressRevolveManager {
    if (this._inst == null) {
      this._inst = new SdeExpressRevolveManager();
    }
    return this._inst;
  }

  // 变量表达式解析器
  public VarExpressResolver: SdeVariableExpressSpace.SdeVariableExpressResolver = new SdeVariableExpressSpace.SdeVariableExpressResolver();

  public SdeExpressionResolver: SdeExpressResolvorSpace.SdeConditionExpressResolve = new SdeExpressResolvorSpace.SdeConditionExpressResolve ();


  // 初始化,必须页面内首先调用
  public Initialize(
    // tslint:disable-next-line: no-shadowed-variable
    PageGetTargetVariableValueDelegate: PageGetTargetVariableValueDelegate,
    // tslint:disable-next-line: no-shadowed-variable
    PageSetTargetVariableValueDelegate: PageSetTargetVariableValueDelegate,
    ) {
    this.VarExpressResolver.Initialize(PageGetTargetVariableValueDelegate, PageSetTargetVariableValueDelegate);
    this.SdeExpressionResolver.Initialize(this.VarExpressResolver);
  }

  /**
   * 执行表达式,必须含关键词: 比如@DO[]等
   *
   * @param {string} comInstId
   * @param {string} contentExpress
   * @returns {string} 返回解析条件表达式后的语句
   * @memberof SdeExpressRevolveManager
   */
  public ResolveWithSdeKeyWords(comInstId: string, contentExpress: string): string {
    let exp = this.ResolveConditionExpress(comInstId, contentExpress);
    if (exp == null) { return ''; }
    exp = exp.trim();
    // 得到: if(false) @DO[] elseif(false) @EIFDO[] @ELSEDO []

    // 找出@DO[]
    let do_body = this.GetDoExpressBody(exp);
    // 找出@EIFDO[]
    let eifdo_body = this.GetEIFDoExpressBody(exp);
    // 找出@ELSEDO[]
    let elsedo_body = this.GetELSEDoExpressBody(exp);

    // console.log(exp);

    if (exp.indexOf('if(true)') !== -1 || exp.indexOf('if(false)') !== -1) {

      let ptif = /^if\(true\).*?/g;
      let arrif = exp.match(ptif);

      if ( arrif != null && arrif.length > 0 ) {
        if (do_body != null && do_body.length > 0) {
          this.InvokeDoByBody(comInstId, do_body[0]);
        }

      } else if (exp.indexOf('elseif(true)') !== -1) {
        if (eifdo_body != null && eifdo_body.length > 0) {
          this.InvokeDoByBody(comInstId, eifdo_body[0]);
        }
      } else  {
        if (elsedo_body != null && elsedo_body.length > 0) {
          this.InvokeDoByBody(comInstId, elsedo_body[0]);
        }
      }

    } else {
      if (do_body != null && do_body.length > 0) {
        this.InvokeDoByBody(comInstId, do_body[0]);
      }
    }

    return exp;
  }


  /**
   * 执行条件表达式,可以含有变量表达式
   * 不含KeyWords
   * @param {string} comInstId
   * @param {string} conditionExpress
   * @returns {boolean}
   * @memberof SdeExpressRevolveManager
   */
  public InvokeConditionExp(comInstId: string, conditionExpress: string): boolean {
    return this.SdeExpressionResolver.ResolveConditionExpressRaw(comInstId, conditionExpress);
  }


  // doBodyExpress
  // 这里的Express表达式,不含关键词,举例如: "@(::prop)++" 或者 "console.log('hello');"
  public InvokeDoByBody(selfComInstId: string, doBodyExpress: string): string {

    if (doBodyExpress == null || doBodyExpress.trim() === '') {
      return '表达式为空';
    }

    // 先获取所有的Set语句,先设置所有变量
    let SetArr = this.GetSetExpressPatternArrList(doBodyExpress);

    // 替换所有的设置语句成空白字符串
    if (SetArr != null) {
      this.SetExpressRawList(SetArr, selfComInstId);  // 设置所有变量
      SetArr.forEach((element) => {
         doBodyExpress = doBodyExpress.replace(element, '');
      });
    }

    // 再去替换其他语句中的变量表达式
    let varExpressArr =  this.VarExpressResolver.FindVarBodyArr(doBodyExpress);
    if (varExpressArr != null) {
      varExpressArr.forEach((varexp) => {
        doBodyExpress = this.VarExpressResolver.ResolveAndReplaceOneVariable(doBodyExpress, varexp, selfComInstId);
      });
    }

    // console.log(TimeUtils.GetDayTimeNow() + ": Invoke DoExpress FromCom: " + selfComInstId + "  body: " + doBodyExpress);

    return SdeFunctionUtils.Invoke(doBodyExpress);
  }





  // 解析条件表达式
  // 输入ConditionExpress: 举例:  @IF[ @(::prop) > 10] @DO[] @ELSEIF[] @EIFDO[] @ELSEDO []
  // 输入例子解释:  判断组件自身的属性prop的值 > 10 是否满足
  // 返回 if(true) @DO[] elseif(false) @EIFDO[] @ELSEDO[ ]
  private ResolveConditionExpress(selfComInstId: string, express: string): string {

    let pattern_if =  /@IF\[.*?\]/g;
    let pattern_elseif =  /@ELSEIF\[.*?\]/g;

    let expressArr_if = express.match(pattern_if) ;
    let expressArr_elseif = express.match(pattern_elseif) ;

    // console.log(expressArr_if);
    // console.log(expressArr_elseif);

    // 处理if的所有表达式,最终转换为 if(true) 或者 if(false)
    expressArr_if.forEach((element) => {
        element = element.trim();
        // element此时是:  @IF[@(##1001&comAge) > @(#@nowDay)]
        let conditionRaw = element.substring(4, element.length - 1);
        // conditionRaw为@(##1001&comAge) > @(#@nowDay)
        // console.log(conditionRaw);
        let resbool = this.SdeExpressionResolver.ResolveConditionExpressRaw(selfComInstId, conditionRaw);
        express = express.replace(element, 'if(' + resbool + ')');
    });

    // 处理elseif的所有表达式,最终转换为 elseif(true) 或者 elseif(false)
    expressArr_elseif.forEach((element) => {
        element = element.trim();
        // element此时是:  @ELSEIF[@(##1001&comAge) > @(#@nowDay)]
        let conditionRaw = element.substring(8, element.length - 1);
        // conditionRaw为@(##1001&comAge) > @(#@nowDay)
        // console.log(conditionRaw);
        let resbool = this.SdeExpressionResolver.ResolveConditionExpressRaw(selfComInstId, conditionRaw);
        express = express.replace(element, 'elseif(' + resbool + ')');
    });

    return express;
  }


  private GetDoExpressBody(express: string): string[] {
    let pattern =  /@DO\[.*?\]/g;
    let arr = express.match(pattern) ;

    // console.log("GetDoExpressBody: " + express);
    let newarr: string[] = [];
    if (arr != null) {

    arr.forEach((element) => {
      let raw = element.substring(4, element.length - 1);
      newarr.push(raw);
    });
  }

    return newarr;
  }
  private GetEIFDoExpressBody(express: string): string[] {

    // console.log("GetEIFDoExpressBody: " + express);


    let pattern =  /@EIFDO\[.*?\]/g;
    let arr = express.match(pattern) ;
    let newarr: string[] = [];
    if (arr != null) {

    arr.forEach((element) => {
      let raw = element.substring(7, element.length - 1);
      newarr.push(raw);
    });
  }
    return newarr;
  }
  private GetELSEDoExpressBody(express: string): string[] {
    // console.log("GetELSEDoExpressBody: " + express);

    let pattern =  /@ELSEDO\[.*?\]/g;
    let arr = express.match(pattern) ;

    let newarr: string[] = [];
    if (arr != null) {
      arr.forEach((element) => {
        let raw = element.substring(8, element.length - 1);
        newarr.push(raw);
      });
    }

    return newarr;
  }


  // 找出所有的Set语法: @SET[ @(#:var) = 3 ]
  // 得到  @(#:var) = 3
  private GetSetExpressPatternArrList(express: string): string[] {
    let pattern =  /@SET\[.*?\]/g;
    let arr = express.match(pattern) ;
    return arr;
  }


  // 传入数组,设置变量
  // newarr：  @SET[ @(#:var) = 3 ] 这样的数组
  private SetExpressRawList(arr: string[], comInstId: string) {
    arr.forEach((element) => {
      let raw = element.substring(5, element.length - 1);
      this.SetExpressItemValue(raw, comInstId);
    });
  }

  // 通过设置得到所有的设置语句
  // 直接设置值
  // body: @(#:var) = 3
  private SetExpressItemValue(body: string, comInstId: string): void {
    // 根据 = 等于号进行分割
    let arr = body.split('=');
    if (arr == null || arr.length !== 2) {
      return ;
    }

    let varExp = arr[0].trim();   // @(#:var)
    let valueExp = arr[1].trim();  //  @(#:var2) 或者 3 这样的值

    // let finalValue:any = null;

    // 检测valueExp是否含有变量表达式,如果有,进行执行获取值
    let rightValue = this.SdeExpressionResolver.ResolveDoExpressAndReturnValue(comInstId, valueExp);
    // let rValueStruct = this.VarExpressResolver.ResolveExpressAndReturnValue(,comInstId);
    // //如果=右边有变量表达式,直接执行
    // if(rValueStruct != null) {
    //   finalValue = rValueStruct.GetValue();
    // } else {
    //   //
    //   finalValue = valueExp;
    // }

    if (rightValue == null) {
      return;
    }
    let varExpBody = this.VarExpressResolver.GetVarExpressBody(varExp);
    this.VarExpressResolver.ResolveExpressAndSetValue(varExpBody, comInstId, rightValue);
  }



}

