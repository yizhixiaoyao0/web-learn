import SComMng_UnityMain from './SComMng_UnityMain';

export interface ISComMngInterface {
  Initialize(): void;
}

export default class SComMngCenter implements ISComMngInterface {

  private static _inst: SComMngCenter;
  public static get Inst(): SComMngCenter {
    if (this._inst == null) {
      this._inst = new SComMngCenter();
    }
    return this._inst;
  }

  // 统一管理页面中所有Unity的基本通信协议和处理接口
  public SComMng_UnityMain: SComMng_UnityMain = new SComMng_UnityMain();


  public Initialize(): void {
    this.SComMng_UnityMain.Initialize();
  }

}
