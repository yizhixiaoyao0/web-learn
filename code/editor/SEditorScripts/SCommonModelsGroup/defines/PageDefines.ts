import { EValueType, SdeServerValueStruct } from '../ServerModel';

// 页面内获取目标组件-属性/开放变量的值
// targetKind为非组件时, comInstId可以为任意值,不影响,建议填空‘’
export type PageGetTargetVariableValueDelegate =
(targetKind: SPageDefines.ETargetKind, selfComInstId: string, targetComInstId: string, propName: string, isOpenVar: boolean)
 => SPageDefines.SdeValueStruct;

 // 设置变量值委托
export type PageSetTargetVariableValueDelegate =
(targetKind: SPageDefines.ETargetKind, selfComInstId: string, targetComInstId: string, propName: string, isOpenVar: boolean, value: any)
 => void;

export namespace SPageDefines {

  // 目标类型
  export enum ETargetKind {
    kCom = 0, // 组件
    kPage = 1, // 页面
    kSys = 2, // 系统
    kFramework = 3, // 框架
    kUnknown = 9, // 未知
  }



  // 定义某一个值信息的结构体
  export  class SdeValueStruct {

    public static Create(propName: string = '', value: number | string | boolean = '', defaultValue: number | string | boolean = '', valueType: EValueType = EValueType.kUnknown, desc: string = ''): SdeValueStruct {
      return new SdeValueStruct(propName, value, defaultValue, valueType, desc);
    }
    public static CreateByUnKnownValueType(propName: string = '', value: number | string | boolean = '', defaultValue: number | string | boolean = '', desc: string = ''): SdeValueStruct {
      return SdeValueStruct.Create(propName, value, defaultValue, EValueType.kUnknown, desc);
    }

    public static GetValueType(value: any): EValueType {
      if (typeof value === 'number') {
        return EValueType.kNumber;
      } else  if (typeof value === 'string') {
        return EValueType.kString;
      } else if (typeof value === 'boolean') {
        return EValueType.kBoolean;
      }
      return EValueType.kUnknown;
    }

    public desc: string = ''; // 描述

    // 属性或者变量名称
    public propName: string = '';

    // 属性或者变量的类型
    public valueType: EValueType = EValueType.kUnknown;

    // 目标的值的字符串形式
    private value: number | string | boolean ;

    // 默认值
    private defaultValue: number | string | boolean ;

    constructor(propName: string = '', value: number | string | boolean = '', defaultValue: number | string | boolean = '', valueType: EValueType = EValueType.kUnknown, desc: string = '') {
      this.propName = propName;
      this.value = value;
      this.defaultValue = defaultValue;
      this.valueType = valueType;
      this.desc = desc;

      this.SetValueType(valueType);
    }

    public SetValueByServerStruct(sv: SdeServerValueStruct) {
      this.propName = sv.propName;
      this.desc = sv.desc;
      this.value = sv.value;
      this.valueType = sv.valueType;
      this.defaultValue = sv.defaultValue;

      this.SetValueType(this.valueType);
    }

    public SetValue(value: number | string | boolean, defaultValue: number | string | boolean = '') {
      if (value != null && value !== '') {
        this.value = value;

        if (defaultValue != null && defaultValue !== '') {
          this.defaultValue = defaultValue;
        }

        this.SetValueType(SdeValueStruct.GetValueType(value));
      }
    }

    public GetValue(useDefault: boolean = true): number | string | boolean {

      if (this.value == null) {
        this.value = '';
      }
      if (useDefault) {
        if (this.value == null) {
          if (this.defaultValue != null || this.defaultValue !== '') {
            this.value = this.defaultValue;
          }
        }
      }
      return this.value;
    }

    private SetValueType(valueType: EValueType) {

      if (valueType === EValueType.kUnknown) {
        if (typeof this.value === 'number') {
          this.valueType = EValueType.kNumber;
          this.defaultValue = <number> this.defaultValue;
        } else  if (typeof this.value === 'string') {
          this.valueType = EValueType.kString;
          this.defaultValue = <string> this.defaultValue;
        } else if (typeof this.value === 'boolean') {
          this.valueType = EValueType.kBoolean;
          this.defaultValue = <boolean> this.defaultValue;
        }
      } else {
        this.valueType = valueType;
        if (valueType === EValueType.kNumber) {
          this.value = <number> this.value;
          this.defaultValue = <number> this.defaultValue;
        } else if (valueType === EValueType.kString) {
          this.value = <string> this.value;
          this.defaultValue = <string> this.defaultValue;
        } else if (valueType === EValueType.kBoolean) {
          this.value = <boolean> this.value;
          this.defaultValue = <boolean> this.defaultValue;
        }
      }
    }

  }

}
