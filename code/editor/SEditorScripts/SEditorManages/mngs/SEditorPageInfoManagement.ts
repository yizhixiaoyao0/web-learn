import { SqlBaseComObject, PageBaseComObject, SDEPageInfo } from '../../SCommonModelsGroup/ServerModel';
import ComFactoryUtils from '../../SCommonModelsGroup/utils/ComFactoryUtils';
import SPageInfoManagement from '../../SPageManages/mngs/SPageInfoManagement';
import SEditorAreaVueData from '../defines/SEditorAreaVueData';
import GUIDHelper from '@/kernel/GUIDHelper';

export interface ISEditorPageInfoManagement {
  Initialize(EditorData: SEditorAreaVueData, pageInfoMng: SPageInfoManagement, info: SDEPageInfo): void;
  // 获取页面信息结构体
  GetPageInfo(): SDEPageInfo;
  // 获取组件列表信息的引用
  GetComs(): PageBaseComObject[];
  // 获取指定组件-依据页面的实例ID
  GetCom(comInstId: string): PageBaseComObject;
  // 组件依据zIndex排序
  ComsOrderByzIndex(reorder: boolean): void;
}

export default class SEditorPageInfoManagement implements ISEditorPageInfoManagement {

  public EditorData: SEditorAreaVueData;
  private SPageInfoManagement: SPageInfoManagement;

  public Initialize(EditorData: SEditorAreaVueData, pageInfoMng: SPageInfoManagement, info: SDEPageInfo): void {

    this.EditorData = EditorData;


    this.SPageInfoManagement = pageInfoMng;

    this.EditorData.PageInfo = info;

    this.EditorData.zIndexMax = info.Coms.length;
  }

  public GetPageInfo(): SDEPageInfo {
    return this.SPageInfoManagement.GetPageInfo();
  }

  public GetComs(): PageBaseComObject[] {
    return this.SPageInfoManagement.GetComs();
  }

  public GetCom(comInstId: string): PageBaseComObject {
    let com = this.SPageInfoManagement.GetCom(comInstId);
    return com;
  }

  // 编辑器添加组件
  public AddCom(sqlCom: SqlBaseComObject, CB: (com: PageBaseComObject) => void ) {
    // 先重新排序
    this.ComsOrderByzIndex();
    let newcom = this.CreateCom(this.EditorData.zIndexMax, sqlCom);

    console.log('创建新组件实例:', newcom);

    this.SPageInfoManagement.GetComs().push(newcom);

    if (CB) {
      CB(newcom);
    }

    // //添加组件
    // this.SPageInfoManagement.GetComs().push(newcom);

    // 通知事件-保存信息
    // SEditorPageEventManagement.Inst.CallSavePageToServer();
  }

  // 组件依据zIndex排序
  public ComsOrderByzIndex(reorder: boolean = true): void {
    this.SPageInfoManagement.ComsOrderByzIndex();
    this.EditorData.zIndexMax = this.GetComs().length;
  }

  // 创建新组件信息方法
  private CreateCom(zIndex: number, sqlCom: SqlBaseComObject) {

    let com: PageBaseComObject = new PageBaseComObject();
    com.ComInstId =  GUIDHelper.Create();
    com.PageComShow = true;
    com.PageComLocked = false;
    com.Com = ComFactoryUtils.CreateNewCom(sqlCom.ComNpmName);

    com.Com.ComID = sqlCom.ComID;
    com.Com.ComName = sqlCom.ComName;
    com.Com.ComNpmName = sqlCom.ComNpmName;
    com.Com.ComClassName = sqlCom.ComClassName;
    com.Com.Version = sqlCom.Version;
    com.Com.Title = sqlCom.Title;
    com.Com.TypeMain = sqlCom.TypeMain;
    com.Com.TypeChild = sqlCom.TypeChild;

    com.ComLayout.zindex = zIndex;
    com.ComLayout.width = com.Com.ComStyles.InitWidth;
    com.ComLayout.height = com.Com.ComStyles.InitHeight;

    return com;
  }


}
