export default class SdeFunctionUtils {


  /**
   * 执行条件语句
   * 注意: 这里的express中不能含有变量表达式和Sde表达式,应该需要在外部全部解析后转换为值,再传入这里
   * @static
   * @param {string} express 不含有变量表达式和Sde表达式的语句
   * @returns {boolean}
   * @memberof SdeFunctionUtils
   */
  public static InvokeCondition(express: string): boolean {
    // console.log("执行条件表达式:" + express);
    let exp = this.AddReturnExp(express);
    try {
      let fx = this.GetMyNewFunction(exp);
      return fx();
    } catch (error) {
      console.error('InvokeCondition Express Error : ' + express);
      return false;
    }
  }


  /**
   * 执行行为语句
   * 注意: 这里的express中不能含有变量表达式和Sde表达式,应该需要在外部全部解析后转换为值,再传入这里
   * @static
   * @param {string} express 不含有变量表达式和Sde表达式的语句
   * @returns {boolean}
   * @memberof SdeFunctionUtils
   */
  public static Invoke(express: string): string {
    try {
      let fx = this.GetMyNewFunction(express);
      fx();
      return '';
    } catch (error) {
      console.error('Invoke Express Error : ' + express);
      return 'Invoke Express Error : ' + express;
    }
  }

  public static InvokeAndReturn(express: string): any {
    try {
      // let expressFull = "return (" + express + ")";
      let expressFull =  this.AddReturnExp(express);

      let fx = this.GetMyNewFunction(expressFull);
      return fx();

    } catch (error) {
      console.error('Invoke ExpressAndReturn Error : ' + express);
      return null;
    }
  }

  // tslint:disable-next-line: ban-types
  public static CreateFunction(...args: string[]): Function {
    let fx = this.GetMyNewFunction(...args);
    return fx;
  }


  // 执行含有一个传入参数的表达式,得到并返回值.
  // express不含有变量表达式
  public static InvokeAndReturnWithOneArgFromString(src: string, express: string, varName: string = '_data'): any {
    // 转换为JSON对象
    let obj = JSON.parse(src);
    return this.InvokeAndReturnWithOneArgFromObject(obj, express, varName);
  }

  // express不含有变量表达式
  public static InvokeAndReturnWithOneArgFromObject(src: object, express: string, varName: string = '_data'): any {
    if (src == null) {
      console.error('转换对象失败,无法处理!');
      console.error(src);
      return null;
    }
    let f = SdeFunctionUtils.CreateFunction(varName, express);
    let result = f(src);
    return result;
  }


  // tslint:disable-next-line: ban-types
  private static GetMyNewFunction(...express: string[]): Function {
    return new Function(...express);
  }


  private static AddReturnExp(express: string): string {
    // let i = express.trim().lastIndexOf(";");
    // if (i == 0) {
    //   express = express.substring(0, express.length - 1);
    //   console.log(express);
    // }

    let expressFull = 'return ' + express + '';

    return expressFull;
  }
}
