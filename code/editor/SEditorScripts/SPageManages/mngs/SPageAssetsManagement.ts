import SPageMainController from '../SPageMainController';

export default class SPageAssetsManagement {
  private static _inst: SPageAssetsManagement;
  public static get Inst(): SPageAssetsManagement {
    if (this._inst == null) {
      this._inst = new SPageAssetsManagement();
    }
    return this._inst;
  }

  // 获取组件自身的资源根目录,根据实例id
  public GetComAssetBasePath(comInstId: string): string {
    if (comInstId == null || comInstId.trim() === '') {
      return this.GetSystemBasePath();
    }
    let com = SPageMainController.Inst.PageInfoMng.GetCom(comInstId);
    if (com == null) {
      return this.GetSystemBasePath();
    }

    return this.GetComAssetBasePathByClassTypeName(com.Com.ComClassName);
  }

  // 获取组件自身的资源根目录 根据组件类型名称
  public GetComAssetBasePathByClassTypeName(comClassTypeName: string) {
    return '/SEditorSpace/ComAssets/' + comClassTypeName + '/';
  }


  // 获取组件的默认预览图片地址
  public GetComDefaultPreviewImgSrc(comClassTypeName: string) {
    return this.GetComAssetBasePathByClassTypeName(comClassTypeName) + 'base/preview/thumbnail.png';
  }

  // 获取组件的默认错误图片
  public GetComDefaultPreviewErrorImgSrc() {
    return  'this.src="/SEditorSpace/assets/imgs/com_preview_err.png"';
  }


  // 获取系统资源根目录
  public GetSystemBasePath() {
    return '/SEditorSpace/';
  }


  // 获取页面内部的资源根目录
  public GetCustomPageDirBasePath(pageId: string) {
    return '/SEditorSpace/CustomPages/' + pageId + '/';
  }

}
