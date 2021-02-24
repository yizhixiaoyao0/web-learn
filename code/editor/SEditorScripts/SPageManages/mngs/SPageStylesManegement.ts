import { ConfigStyleItem, PageBaseComObject, ConfigStyleGroup } from '../../SCommonModelsGroup/ServerModel';
import SPageMainController from '../SPageMainController';

export default class SPageStylesManeagement {
  private static _inst: SPageStylesManeagement;
  public static get Inst(): SPageStylesManeagement {
    if (this._inst == null) {
      this._inst = new SPageStylesManeagement();
    }
    return this._inst;
  }


  /**
   * 获取组件的必备基础属性的样式Group配置
   *
   * @param {PageBaseComObject} com
   * @returns {ConfigStyleGroup}
   * @memberof SPageStylesManeagement
   */
  public GetCom_BaseStyleGroup(com: PageBaseComObject): ConfigStyleGroup {
    let styleGroupBase = com.Com.ComStyles.ConfigStyleContent.Groups.filter((p) => p.GroupName === '基础属性');
    return styleGroupBase[0];
  }

    /**
   * 获取页面的必备基础属性的样式Group配置
   * 含有页面宽，高,等信息
   * @param {PageBaseComObject} com
   * @returns {ConfigStyleGroup}
   * @memberof SPageStylesManeagement
   */
  public GetPageStyle_BasePropGroup(): ConfigStyleGroup {
    let styleGroupBase = SPageMainController.Inst.PageInfoMng.GetPageInfo().SDEPageSetting.ConfigStyleContent.Groups.filter((p) => p.GroupName === '基础属性');
    return styleGroupBase[0];
  }

  /**
   * 获取组件的透明度样式设置
   *
   * @param {PageBaseComObject} com
   * @returns {ConfigStyleItem}
   * @memberof SPageStylesManeagement
   */
  public GetCom_OpercityStyleItem(com: PageBaseComObject): ConfigStyleItem {
    let styleGroupBase = this.GetCom_BaseStyleGroup(com);
    let opc = styleGroupBase.Items.filter((p) => p.desc === '透明度');
    return opc[0];
  }

  /**
   * 设置组件的透明度
   *
   * @param {PageBaseComObject} com
   * @param {string} value
   * @memberof SPageStylesManeagement
   */
  public SetComOpercity(com: PageBaseComObject, value: string) {
    let styleCfg = SPageStylesManeagement.Inst.GetCom_OpercityStyleItem(com);
    styleCfg.value = value;
  }


  public GetPageStyle_GetWidthAndHeight(): number[] {
    let group = this.GetPageStyle_BasePropGroup();

    let width = group.Items.filter((p) => p.desc === '宽')[0].value;
    let height = group.Items.filter((p) => p.desc === '高')[0].value;

    let obj = [ Number(width), Number(height)];
    return obj;
  }


}
