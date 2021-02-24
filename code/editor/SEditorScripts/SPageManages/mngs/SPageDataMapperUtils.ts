import { DataMapperRules } from '../../SCommonModelsGroup/ServerModel';
import SdeExpressRevolveManager from '../../SCommonModelsGroup/SdeExpression/SdeExpressRevolveManager';

/**
 * 数据处理的规则接口
 * 包括如何进行属性映射
 *
 * @export
 * @class SDataProcessRules
 */
// export interface IDataProcessRules {
//   //属性名称对应规则
//   PropNameMapRules:Array<{DestName:string,SourceName:string}>;

// }


// export interface ISPageDataMapperUtils {
//   //源数据结构体 通过规则 转换为目标数据结构
//   ProduceDataFromObj<From,Dest>(c: {new(): Dest},fromData:From,ruls?:IDataProcessRules) : Dest;
// }

/**
 * 数据处理层
 *
 * @export
 * @class SPageDataMapperUtils
 */
export default class SPageDataMapperUtils {
  public static get Inst(): SPageDataMapperUtils {
    if (this._inst == null) {
      this._inst = new SPageDataMapperUtils();
    }
    return this._inst;
  }

  private static _inst: SPageDataMapperUtils;


  /*
  1. 从一个结构体,映射属性或者二级属性等,来取值并赋值到Dest
  2. 从数据列表,通过规则(输入:列表) 一一转换为属性值,并赋值到Dest
  */

  public ProduceDataFromObj<From, Dest>(createDest: new() => Dest, fromData: From, selfComInstId: string , rules?: DataMapperRules, forceByReturnStruct: boolean = true): Dest {

    if (!forceByReturnStruct || createDest == null) {
      return (<any> fromData) as Dest;
    }

    let result: Dest = new createDest();

    return this.ProduceDataFromObjToExistData(fromData, result, selfComInstId, rules);
  }

  public ProduceDataFromObjToExistData<From, Dest>(fromData: From, targetExistData: Dest, selfComInstId: string, rules?: DataMapperRules): Dest {

    // 如果没有规则,则尝试直接转换From到Dest结构,如果转换错误,返回null
    let keys = Object.keys(fromData);
    let destKeys = Object.keys(targetExistData);

    // 先赋值相同名称的属性
    keys.forEach((element) => {
      if (destKeys.includes(element)) {
        (<any> targetExistData)[element] = (<any> fromData)[element];
      }
    });

    if (rules != null) {
      rules.mapper.forEach((map) => {
        // 来源的映射属性有没有点操作符
        let  sourcePropArr = map.SourceName.split('.');

        // 获取来源对象的属性值
        let fromPropValue =  this.GetPropValueByLayer(sourcePropArr, fromData);
        if (fromPropValue == null) {
          return;
        }

        let fromPropValueResult: any = fromPropValue;

        // 判断rule的 ArrayIndex,如果fromPropValue是数组,并且元素Index有设置，则取得元素值赋值到dest上
        if (map.ArrayIndex >= 0) {
          try {
            let item = fromPropValue[map.ArrayIndex];
            if (item != null) {
              fromPropValueResult = item;
            }
          } catch (error) {
            console.error(error);
          }
        }


        // 如果IsSetToVariable=true,则赋值到变量.
        if (map.IsSetToVariable) {

          SdeExpressRevolveManager.Inst.VarExpressResolver.ResolveExpressAndSetValue(map.DestName, selfComInstId, fromPropValueResult);

        } else {
            // 看看有没有.
            let destPropArr = map.DestName.split('.');

            // 赋值到对象,自动判断点操作符
            this.SetPropValueByLayer(destPropArr, targetExistData, fromPropValueResult);
        }

      });
    }

    return targetExistData;
  }

  /*
   * 严格按照Rule规则来进行匹配
   * 比如都有name属性,但规则中没有匹配,则目标对象保持原数据不变
   * 如果rule==null,返回原来的目标数据 targetExistData
   * @template From
   * @template Dest
   * @param {From} fromData
   * @param {Dest} targetExistData
   * @param {DataMapperRules} [rules]
   * @returns {Dest}
   * @memberof SPageDataMapperUtils
   */
  public ProduceDataFromObjToExistDataStrick<From, Dest>(fromData: From, targetExistData: Dest, rules?: DataMapperRules): Dest {

    // 如果没有规则,则尝试直接转换From到Dest结构,如果转换错误,返回null
    let keys = Object.keys(fromData);
    let destKeys = Object.keys(targetExistData);

    if (rules != null) {
      rules.mapper.forEach((map) => {
        // 来源的映射属性有没有点操作符
        let  sourcePropArr = map.SourceName.split('.');

        // 获取来源对象的属性值
        let fromPropValue =  this.GetPropValueByLayer(sourcePropArr, fromData);
        if (fromPropValue == null) {
          return;
        }

        // 看看有没有.
        let destPropArr = map.DestName.split('.');

        // 赋值到对象,自动判断点操作符
        this.SetPropValueByLayer(destPropArr, targetExistData, fromPropValue);
      });
    }

    return targetExistData;
  }


  public GetPropValueByLayer(arr: string[], data: any): any {
    if (arr == null || data == null || arr.length <= 0) { return; }
    let target: any;

    for (let index = 0; index < arr.length; index++) {
      const name = arr[index];

      if (index === 0) {
        target = this.GetPropData(data, arr[0]);
      } else {
        target =  this.GetPropData(target, arr[index]);
      }

      if (target == null) {
        return null;
      }
    }

    return target;
  }


  // nowLayer从0开始
  // 比如 a.b.c  表示arr["a","b","c"], nowLayer从0 - 2
  private SetPropValueByLayer(arr: string[], data: any, value: any): void {
    if (arr == null || data == null || value == null || arr.length <= 0) { return; }

    // console.log("Set:", arr,data,value);
    let arrLength = arr.length;

    if (arrLength === 1) {
      this.SetPropValue(data, arr[0], value, data.name, arr);
      return;
    }

    if (arrLength === 2) {
      this.SetPropValue(data[arr[0]], arr[1], value, data.name, arr);
      return;
    }

    let target: any;

    for (let index = 0; index < arrLength; index++) {
      const name = arr[index];

      if (index === 0) {
        target = this.GetPropData(data, arr[0]);
      } else {

        if (index === arrLength - 1) {
          // 设置值:
          this.SetPropValue(target, arr[arrLength - 1], value, data.name, arr);
          return;
        }  else {
          target = this.GetPropData(target, arr[index]);
        }
      }

      if (target == null) {
        return ;
      }
    }
  }


  private SetPropValue(data: any, propName: string, value: any, dataName: string, propArr: any): void {
    let keys = Object.keys(data);
    if (keys.includes(propName)) {
      data[propName] = value;
    } else {
      console.error( dataName + '不包含属性:' + propName);
    }
  }

  private GetPropData(data: any, propName: string): any {
    let keys = Object.keys(data);
    if (keys.includes(propName)) {
      return data[propName];
    } else {
      console.error( data.name + '不包含属性:' + propName);
      return null;
    }
  }

  // private create<T>(c: {new(): T}): T {
  //   return new c();
  // }


}
