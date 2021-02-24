import SPageInfoManagement from './SPageInfoManagement';
import { ComOpenMethodInfo, ComElementInfo, SdeServerValueStruct, IComVueBase, IComReturnDataStruct, PageBaseComObject, ConfigStyleContent } from '../../SCommonModelsGroup/ServerModel';
import { SPageDefines } from '../../SCommonModelsGroup/defines/PageDefines';
import SdeDynamicClassUtils from '../../SCommonModelsGroup/utils/SdeDynamicClassUtils';
import SdeSystemOpenVariableCenter from '../../SCommonModelsGroup/SystemOpenvar/SdeSystemOpenVariableCenter';
import SPageEventsManagement from './SPageEventsManagement';
import SVuePageHelper from '../../SCommonModelsGroup/utils/SVuePageHelper';
import SEditorMainController from '../../SEditorManages/SEditorMainController';
import { VarSentenceResolveOption } from '../../SCommonModelsGroup/SdeExpression/SdeVariableExpress';
import SdeExpressRevolveManager from '../../SCommonModelsGroup/SdeExpression/SdeExpressRevolveManager';
import { throttle } from 'throttle-typescript';

export interface ISPageInfoComsManagement {
  // 获得组件的属性列表
  GetComPropInfos(selfComInstId: string, comInstId: string): string[];
  // 获得组件的开放方法
  GetComInteractOpenMethods(selfComInstId: string, comInstId: string): ComOpenMethodInfo[];
  // 获取组件可交互元素的数组
  GetComInteractElements(selfComInstId: string, comInstId: string): ComElementInfo[];
  // 获取组件定义的开放变量列表
  GetComOpenVariableNames(selfComInstId: string, comInstId: string): SdeServerValueStruct[];
  // 获取组件定义返回数据结构类名
  GetComRetuanDataClassTypeName(selfComInstId: string, comInstId: string): string;

  // 获取页面定义的开放变量列表
  GetPageOpenVariableNames(selfComInstId: string): SdeServerValueStruct[];
  // 获取系统定义的变量列表
  GetSystemOpenVariableNames(selfComInstId: string): SdeServerValueStruct[];


  // 获取值-获取组件属性值
  GetValueFromComProp(selfComInstId: string, comInstId: string, propName: string): SPageDefines.SdeValueStruct;
  // 获取值-获取组件开放变量值
  GetValueFromComOpenVariable(selfComInstId: string, comInstId: string, varName: string): SPageDefines.SdeValueStruct;
  // 获取值-获取页面开放变量值
  GetValueFromPageOpenVariable(selfComInstId: string, varName: string): SPageDefines.SdeValueStruct;
  // 获取值-获取系统预制变量值
  GetValueFromSystemVariable(selfComInstId: string, varName: string): SPageDefines.SdeValueStruct;
}



// 页面内的页面/组件/系统的变量管理类
export default class SPageInfoComsManegement implements ISPageInfoComsManagement {


  public _comInst: IComVueBase;
  public _styleContent: ConfigStyleContent;


  private SPageInfoMng: SPageInfoManagement = null;

  private fooWrapper = throttle(this.NoticeComInstSetStyle, 200);

  public Initialize(PageInfoMng: SPageInfoManagement) {
    this.SPageInfoMng = PageInfoMng;
  }

  public GetComPropInfos(comInstId: string): string[] {
    let comInst = this.SPageInfoMng.GetComInst(comInstId);
    if (comInst == null) { return null; }
    return comInst.GetComDataClassPropertyNames();
  }

  public GetComInteractOpenMethods(comInstId: string): ComOpenMethodInfo[] {
    let comInst = this.SPageInfoMng.GetComInst(comInstId);
    if (comInst == null) { return null; }
    return comInst.GetInteractOpenMethods();
  }

  public GetComInteractElements(comInstId: string): ComElementInfo[] {
    let comInst = this.SPageInfoMng.GetComInst(comInstId);
    if (comInst == null) { return null; }
    return comInst.GetInteractElements();
  }



  /**
   *
   * 读取组件开放变量名称
   * 如果是自身读取,那么返回所有开放变量
   * 如果是其他组件读取,那么返回所有IsPublicGet==true的开放变量
   * @param {string} selfComInstId
   * @param {string} comInstId
   * @returns {Array<SdeServerValueStruct>}
   * @memberof SPageInfoComsManegement
   */
  public GetComOpenVariableNames(selfComInstId: string, comInstId: string): SdeServerValueStruct[] {
    // 目标组件
    let com = this.SPageInfoMng.GetCom(comInstId);
    if (com == null) { return null; }

    if (selfComInstId === comInstId) {
      return com.Com.OpenVariableCollection;
    } else {
      return com.Com.OpenVariableCollection.filter((p) => p.IsPublicGet === true);
    }
  }

  /**
   * 获取页面开放变量名称
   *
   * @returns {SdeServerValueStruct[]}
   * @memberof SPageInfoComsManegement
   */
  public GetPageOpenVariableNames(): SdeServerValueStruct[] {
    return this.SPageInfoMng.GetPageInfo().OpenVariableCollection;
  }


  /**
   * 获取系统开放变量名称
   *
   * @returns {SdeServerValueStruct[]}
   * @memberof SPageInfoComsManegement
   */
  public GetSystemOpenVariableNames(): SdeServerValueStruct[] {
    return SdeSystemOpenVariableCenter.Inst.GetProps();
  }


  /**
   * 获取组件的数据类型class的名称
   *
   * @param {string} comInstId
   * @returns {string}
   * @memberof SPageInfoComsManegement
   */
  public GetComRetuanDataClassTypeName(comInstId: string): string {
    // let comInst = this.SPageInfoMng.GetComInst(comInstId);
    // if(comInst == null) return null;
    // return comInst.GetComDataClassTypeName();
    let com = this.SPageInfoMng.GetCom(comInstId);

    return  SVuePageHelper.GetClassTypeNameOfReturnComDataClass(com.Com.ComClassName);
  }

  /**
   * 获取组件属性值
   * 如果是自身,则可以获取
   * 如果是别的组件,则不可以获取,返回null
   * @param {string} selfComInstId
   * @param {string} comInstId
   * @param {string} propName
   * @returns {SPageDefines.SdeValueStruct}
   * @memberof SPageInfoComsManegement
   */
  public GetValueFromComProp(selfComInstId: string, comInstId: string, propName: string, ignoreCheckSelf: boolean = false): SPageDefines.SdeValueStruct {
    if (!ignoreCheckSelf) {
      if (selfComInstId !== comInstId) {
        return null;
      }
    }

    let com = this.SPageInfoMng.GetCom(comInstId);
    if (com == null) { return null; }

    let data = com.Com.Data;
    let value = SdeDynamicClassUtils.Inst.GetPropValueFromDataObj(data, propName);

    return SPageDefines.SdeValueStruct.CreateByUnKnownValueType(propName, value, value);
  }

  /**
   * 获取组件开放变量的值
   * 如果是自身,则可以获取值
   * 如果是别的组件,需要看此开放变量是否IsPublicGet
   * 如果设置有映射属性,则读取映射属性的值
   * @param {string} selfComInstId
   * @param {string} comInstId
   * @param {string} varName
   * @returns {SPageDefines.SdeValueStruct}
   * @memberof SPageInfoComsManegement
   */
  public GetValueFromComOpenVariable(selfComInstId: string, comInstId: string, varName: string): SPageDefines.SdeValueStruct {
    let com = this.SPageInfoMng.GetCom(comInstId);
    if (com == null) { return null; }

    let servValues = com.Com.OpenVariableCollection;
    let querys = servValues.filter((p) => p.propName === varName);
    if (querys == null || querys.length <= 0) {  return null; }
    let data = querys[0];


    if (selfComInstId !== comInstId) {
      if (data.IsPublicGet === false) {
        return null;
      }
    }

   /*这里的开放变量,要判断,是否在此变量所在的组件上,进行了自身属性的数据映射
    如果配置了映射关系,那么返回的是映射属性的value值
    */
    if (data.bindSelfPropertyName != null && data.bindSelfPropertyName.trim() !== '') {
        return this.GetValueFromComProp(selfComInstId, comInstId, data.bindSelfPropertyName, true);
    }
    let s = SPageDefines.SdeValueStruct.Create(varName, data.value, data.defaultValue, data.valueType, data.desc);
    return s;
  }

  public GetValueFromPageOpenVariable(selfComInstId: string, varName: string): SPageDefines.SdeValueStruct {
    let servValues = this.SPageInfoMng.GetPageInfo().OpenVariableCollection;
    let querys = servValues.filter((p) => p.propName === varName);
    if (querys == null || querys.length <= 0) {  return null; }
    let data = querys[0];

    let s = SPageDefines.SdeValueStruct.Create(varName, data.value, data.defaultValue, data.valueType, data.desc);
    return s;
  }

  public GetValueFromSystemVariable(selfComInstId: string, varName: string): SPageDefines.SdeValueStruct {
    let servValues = SdeSystemOpenVariableCenter.Inst.GetSysPropValue(selfComInstId, varName);
    let s = SPageDefines.SdeValueStruct.Create(varName, servValues.value, servValues.defaultValue, servValues.valueType, servValues.desc);

    return s;
  }

  /**
   *  设置组件属性
   *  如果是自身属性,可设置
   *  如果不是自身属性,不可以设置
   * @param {string} selfComInstId
   * @param {string} comInstId
   * @param {string} propName
   * @param {*} value
   * @returns {void}
   * @memberof SPageInfoComsManegement
   */
  public SetValueToComProp(selfComInstId: string, comInstId: string, propName: string, value: any): void {
    if (selfComInstId !== comInstId) {
      return;
    }

    let com = this.SPageInfoMng.GetCom(comInstId);
    if (com == null) { return; }

    let data = com.Com.Data;

    this.SetObjPropData(data, propName, value);

    SPageEventsManagement.Inst.NoticePageComDataChanged(comInstId);
  }

  /**
   * 设置组件开放变量
   * 如果是自身开放变量,可以设置
   * 如果不是自身来设置,要判断,IsPublicSet 是否为true
   * 如果映射了属性,则属性也要修改
   * @param {string} selfComInstId
   * @param {string} comInstId
   * @param {string} varName
   * @param {*} value
   * @returns {void}
   * @memberof SPageInfoComsManegement
   */
  public SetValueToComOpenVariable(selfComInstId: string, comInstId: string, varName: string, value: any): void {

    let com = this.SPageInfoMng.GetCom(comInstId);
    if (com == null) { return; }
    let servValues = com.Com.OpenVariableCollection;

    let querys = servValues.filter((p) => p.propName === varName);
    if (querys == null || querys.length <= 0) {
      return;
    }

    if (selfComInstId !== comInstId) {
      // 读取变量的配置是否IsPublicSet
      if (querys[0].IsPublicSet === false) {
        console.log('目标变量是Private,无法设置:' + comInstId + ' [' + varName + ']');
        return;
      }
    }

    if (querys[0].bindSelfPropertyName !=  null && querys[0].bindSelfPropertyName !== '') {
      console.log('bind!!!!');
      // 修改目标组件映射的属性值
      this.SetValueToComProp(comInstId, comInstId, querys[0].bindSelfPropertyName, value);
    }

    // 设置开放变量值
    this.SetValueToOpenVariableData(servValues, varName, value);
  }

  // 设置页面开放变量
  public SetValueToPageOpenVariable(varName: string, value: any): void {
    let servValues = this.SPageInfoMng.GetPageInfo().OpenVariableCollection;
    this.SetValueToOpenVariableData(servValues, varName, value);
  }



  // 修改组件的实例ID
  public ModifyComInstIdInPage(oldComInstId: string, newComInstId: string) {
    if (oldComInstId == null || oldComInstId.trim() === '' || newComInstId == null || newComInstId.trim() === '') {
       return;
    }

    let com = this.SPageInfoMng.GetCom(oldComInstId);
    if (com == null) {
      return;
    }

    com.ComInstId = newComInstId;

    SEditorMainController.Inst.EditorPageEventMng.CallSavePageToServer();

  }


  public SetDataToComInst(ComInstId: string, comInst: IComVueBase, data: IComReturnDataStruct, options: any = null, resolveOptions: VarSentenceResolveOption = null) {

    if (comInst == null) {
      console.error('SetDataToComInst ComInst is NULL');
      return;
    }

    // 设置数据之前,查找其中的变量字符串,进行解析一次
    if (resolveOptions == null) {
      resolveOptions = new VarSentenceResolveOption();
      resolveOptions.ResultStringVarExpWithDoubleQuotationMarks = false;
    }

    let dataStr = JSON.stringify(data);
    dataStr = SdeExpressRevolveManager.Inst.VarExpressResolver.ResolveAndReplaceSentense(ComInstId, dataStr);
    let sendData = JSON.parse(dataStr);


    // console.log("SetDataToComInst SendData", sendData);

    comInst.SetData(sendData, options);
  }


   // 通知comInst修改样式
  public SetStyleToComInst(comInst: IComVueBase, styleContent: ConfigStyleContent) {
    this._comInst = comInst;
    this._styleContent = styleContent;

    this.fooWrapper();
  }

  // 设置变量
  private SetValueToOpenVariableData(servValues: SdeServerValueStruct[], varName: string, value: any): void {
    servValues.forEach((element) => {
        if (element.propName === varName) {
            element.value = value;
            return;
        }
    });
  }

  private SetObjPropData(data: any, propName: string, value: any) {
    (<any> data)[propName] = value;
  }

  private NoticeComInstSetStyle(): void {
    this._comInst.SetStyle(this._styleContent);
  }

}
