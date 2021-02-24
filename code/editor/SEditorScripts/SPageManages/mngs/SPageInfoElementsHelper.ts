import SVuePageHelper from '../../SCommonModelsGroup/utils/SVuePageHelper';

export default class SPageInfoElementsHelper {

  private static _inst: SPageInfoElementsHelper;
  public static get Inst(): SPageInfoElementsHelper {
    if (this._inst == null) {
      this._inst = new SPageInfoElementsHelper();
    }
    return this._inst;
  }


  // 找出页面元素
  public GetPageElementById(comInstId: string, elementId: string) {
    let id = SVuePageHelper.GetComElementId(comInstId, elementId);
    return document.getElementById(id);
  }

  // 元素绑定事件
  // AddElementEventListener(element:HTMLElement,type:string) {
  //   element.addEventListener(type,() => {});
  // }



}
