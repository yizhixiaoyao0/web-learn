import { PageBaseComObject, SDEPageInfo, IComVueBase, SqlBaseComObject, STool_DesignRecordItem } from '../../SCommonModelsGroup/ServerModel';
import SPageMainController from '../../SPageManages/SPageMainController';

// 编辑器-Vue页面上的绑定数据封装类
export default class SEditorAreaVueData {

  public PageId: string = '';
  public PageInfo: SDEPageInfo = new SDEPageInfo();

  // 当前选中的组件-指向PageInfo内的组件数据对象
  public SelectedCom: PageBaseComObject;
  // 当前选中的组件vue实例
  public SelectedComInst: IComVueBase;

  public ScalePoint: number = 0;

  // 组件的zIndex相关
  public zIndexInit = 0;
  public zIndexMax = 0;

  // 服务器组件列表 (以后再加上权限分组)
  public SqlComList: SqlBaseComObject[] = [];

  // 设计号配置
  public DesignConfigs: STool_DesignRecordItem[] = [];

  public GetComInst(comInstId: string) {
    return SPageMainController.Inst.PageInfoMng.GetComInst(comInstId);
  }

  public GetCom(comInstId: string) {
    return SPageMainController.Inst.PageInfoMng.GetCom(comInstId);
  }

}


