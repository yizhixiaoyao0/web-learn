import { ComClasses } from '../auto/ComClassesDefine';

export default class SdeDynamicClassUtils {
  public static get Inst(): SdeDynamicClassUtils {
    if (this._inst == null) {
      this._inst = new SdeDynamicClassUtils();
    }
    return this._inst;
  }


  private static _inst: SdeDynamicClassUtils;
  private ClassesOrigin: any = null;

  constructor(classes: any = null) {
    if (classes == null) {
        this.ClassesOrigin = ComClasses;
    } else {
        this.ClassesOrigin = classes;
    }
  }

  public SetClassesOrigin(classes: any = null) {
    this.ClassesOrigin = classes;
  }
  public ResetComClasses() {
      this.ClassesOrigin = ComClasses;
  }

  public GetClassType(className: string): any {
    try {
      return this.ClassesOrigin[className];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public CreateClassInstance(className: string, ...args: any[]): any {
    try {
      const c = this.GetClassType(className);
      return new c(args);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // 通过json对象, 在已知类名时, 反解析为对应的类实例对象
  public CopyJsonDataToClassInst(
    className: string,
    originJsonValueData: string,
  ) {
    try {
      let classInst: any = SdeDynamicClassUtils.Inst.CreateClassInstance(className);
      let data: any = JSON.parse(originJsonValueData);
      let obj = Object.assign(classInst, data);
      return obj;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // 根据属性名称,和结构体,来获取属性值
  // 没有此属性或者异常,返回null
  public GetPropValueFromDataObj(obj: any, propName: string): any {
    return obj[propName];
  }

  // public SetPropValueToDataObj(obj:any,propName:string,value:any) :void {
  //   let item = this.GetPropValueFromDataObj(obj,propName);
  //   item = value;
  // }
}
