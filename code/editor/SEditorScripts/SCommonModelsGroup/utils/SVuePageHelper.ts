import { IComVueBase } from '../ServerModel';
import BaseComVue from '@/core/SDataBaseCom/BaseComVue';

export default class SVuePageHelper {

  public static GetComDivID(ComInstId: string): string {
    return 'sdata_canvas_com' + ComInstId;
  }


  public static FindComInstByInstId(vuePage: BaseComVue, id: string): IComVueBase {
    if (id == null) { return null; }

    // 通过实例Id寻找 vuecom组件实例
    let vuecom = vuePage.FindRef<IComVueBase>(id);

    if (vuecom == null) {  return null; }
    return (<any> vuecom)[0];
  }


  // 得到组件的开放可交互的元素ID,规则是 实例ComInstId 和 名称ID的结合
  public static GetComElementId(comInstId: string, id: string) {
    return id + comInstId;
  }

  // 得到组件返回数据的Class名
  public static GetClassTypeNameOfReturnComDataClass(ComClassTypeName: string) {
    return 'ComReturnDataStruct_' + ComClassTypeName;
  }

  // 获取组件完整的数据配置类名
  public static GetClassTypeNameOfDataConfig(ComClassTypeName: string) {
    return 'ComDataConfig_' + ComClassTypeName;
  }
}
