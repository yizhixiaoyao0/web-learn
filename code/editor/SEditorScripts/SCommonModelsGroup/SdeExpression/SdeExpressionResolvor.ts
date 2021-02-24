import { ISdeConditionExpressResolve } from './SdeExpressInterface';
import SdeFunctionUtils from './SdeFunction/SdeFunctionUtils';
import { SdeVariableExpressSpace } from './SdeVariableExpress';

export  namespace SdeExpressResolvorSpace {

  // 条件表达式解析器
  export class SdeConditionExpressResolve implements ISdeConditionExpressResolve {

    public VarExpressResolver: SdeVariableExpressSpace.SdeVariableExpressResolver;

    public Initialize( varExpressResolver: SdeVariableExpressSpace.SdeVariableExpressResolver) {
      this.VarExpressResolver = varExpressResolver;
    }

    // 解析条件表达式
    // 输入裸表达式ConditionExpressRaw: 举例:   @(::prop) > 10
    // 输入例子解释:  判断组件自身的属性prop的值 > 10,返回满足true,还是不满足false
    // 实例:  @(::prop) > 10   ==> 表示 如果自身属性 > 10
    // 实例:  @(#%var) ==  5 || @(##comInstID&var)  < 0  ==> 表示页面变量等于5或者comInstId组件上的开放变量var 小于 0
    public ResolveConditionExpressRaw(selfComInstId: string, expressRaw: string): boolean {

      expressRaw = this.GetRealRawExpress(selfComInstId, expressRaw);
      if (expressRaw == null) { return null; }
      let result = SdeFunctionUtils.InvokeCondition(expressRaw);

      return result;
    }


    // 解析行为表达式,支持含有变量表达式
    // 不能含有SET语句
    public ResolveDoExpressAndReturnValue(selfComInstId: string, expressRaw: string): any {
      expressRaw = this.GetRealRawExpress(selfComInstId, expressRaw);
      if (expressRaw == null) { return null; }

      let result = SdeFunctionUtils.InvokeAndReturn(expressRaw);
      return result;

    }

    // 解析行为表达式,支持含有变量表达式
    // 不能含有SET语句
    // 传入一个参数的解析
    public ResolveDoExpressAndReturnValueWithOneArgFromObject(selfComInstId: string, src: object, express: string, varName: string = '_data'): any {
      let expressRaw = this.GetRealRawExpress(selfComInstId, express);
      if (expressRaw == null) { return null; }
      return SdeFunctionUtils.InvokeAndReturnWithOneArgFromObject(src, express, varName);
    }

    public ResolveDoExpressAndReturnValueWithOneArgFromString(selfComInstId: string, src: string, express: string, varName: string = '_data'): any {
      let expressRaw = this.GetRealRawExpress(selfComInstId, express);
      if (expressRaw == null) { return null; }
      return SdeFunctionUtils.InvokeAndReturnWithOneArgFromString(src, express, varName);
    }



    // 从含有变量表达式的语句中,解析出所有的变量表达式,并返回真正的执行表达式
    private GetRealRawExpress(selfComInstId: string, expressRaw: string): string {
      if (expressRaw == null || expressRaw.trim() === '') { return null; }
      expressRaw = expressRaw.trim();

      // 举例:   var str = "@(#%var) ==  5 || @(##comInstID&var)  < 0";
      // 依据正则找出:  ['@(#%var)', '@(##comInstID&var)']
      // 找出表达式中所有的变量表达式
      let varExpressArr =  this.VarExpressResolver.FindVarBodyArr(expressRaw);

      // 如果含有变量表达式,要将所有的值取出,并替换变量表达式
      if (varExpressArr != null && varExpressArr.length > 0) {

        varExpressArr.forEach((varexp) => {

          expressRaw = this.VarExpressResolver.ResolveAndReplaceOneVariable(expressRaw, varexp, selfComInstId);

        });
      } else {
        // 不含变量表达式
      }

      return expressRaw;
    }

  }



}
