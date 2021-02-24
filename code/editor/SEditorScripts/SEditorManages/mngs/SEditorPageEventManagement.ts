import * as tsEvents from 'ts-events';
import { PageBaseComObject } from '../../SCommonModelsGroup/ServerModel';
import SEditorMainController from '../SEditorMainController';
import SEditorAreaVueData from '../defines/SEditorAreaVueData';
import SVuePageHelper from '../../SCommonModelsGroup/utils/SVuePageHelper';
import BaseComVue from '@/core/SDataBaseCom/BaseComVue';
import { ApiDefine_Editor_API } from '@/server/editor_api';

export class SelectedComEventData {
  public VuePage: BaseComVue;
  public com: PageBaseComObject;
}

export default class SEditorPageEventManagement {
  public static get Inst(): SEditorPageEventManagement {
    if (this._inst == null) {
      this._inst = new SEditorPageEventManagement();
    }
    return this._inst;
  }

  private static _inst: SEditorPageEventManagement;

  public EditorData: SEditorAreaVueData;

  // 事件-编辑器选中组件 Selected A Com Instance
  public SEditorSelectedComInstEvent = new tsEvents.SyncEvent<SelectedComEventData>();
  public SEditorSelectedComInstSetEndEvent = new tsEvents.SyncEvent<SelectedComEventData>();

  // 事件-编辑器改变磁力吸附
  public SEditorChangeWelt = new tsEvents.SyncEvent<boolean>();

  // 编辑器EditorData改变通知
  public SEditorDataChangedEvent = new tsEvents.SyncEvent<boolean>();

  // 撤销操作任务存储列表
  public SEditorUndoOperationTaskList: SEditorAreaVueData[] = [];

  // 还原操作任务存储列表
  public SEditorRedoOperationTaskList: SEditorAreaVueData[] = [];

  // 事件-存储服务器该页面信息 Save PageInfo To Server
  private SEditorSavePageToServerEvent = new tsEvents.SyncEvent<string>();

  public Initialize(EditorData: SEditorAreaVueData) {
    this.EditorData = EditorData;

    // 注册事件基础Handler
    this.Register_SavePageToServer_Handler();

    this.Register_SelectedComInst_Handler();
  }

  public CallSavePageToServer() {
    this.SEditorSavePageToServerEvent.post(null);
  }

  // 功能快捷 —— 撤销


  // 功能快捷 —— 恢复


  // 功能菜单 —— 删除 delete
  public deleteCom(ComInstId: string): void {
    let com = this.EditorData.GetCom(ComInstId);
    let index = this.EditorData.PageInfo.Coms.findIndex((p) => p === com);
    if (index === -1) {
      return;
    }

    this.EditorData.PageInfo.Coms.splice(index, 1);

    this.setComponentIndex();
    this.CallSavePageToServer();
  }


  // 功能菜单 —— 锁定 locked or unlock
  public locked(): void {
    this.EditorData.SelectedCom.PageComLocked = !this.EditorData.SelectedCom.PageComLocked;
    this.EditorData.PageInfo.Coms.forEach((item) => {
      item.ComInstId === this.EditorData.SelectedCom.ComInstId ? item.PageComLocked = this.EditorData.SelectedCom.PageComLocked : '';
    });
  }


  // 功能菜单 —— 隐藏  hidden or show


  // 功能菜单 —— 成组



  // 功能菜单 —— 取消成组


  // reset zIndex
  private setComponentIndex() {
    let comList = this.EditorData.PageInfo.Coms;
    comList.forEach((item, index) => {
      item.ComLayout.zindex = index + 1;
    });
  }

  // Save PageInfo To Server
  private Register_SavePageToServer_Handler() {
    this.SEditorSavePageToServerEvent.attach((thing: string) => {
      let pageInfo = SEditorMainController.Inst.EditorPageInfoMng.GetPageInfo();
      console.log(pageInfo, 'pageInfo');
      ApiDefine_Editor_API.Action_UpdatePageSolution(pageInfo.Id, pageInfo)
      .then()
      .catch((err) => {
        console.log(err);
      });
    });
  }

  // Selected A ComInstance 通知选择某个组件
  private Register_SelectedComInst_Handler() {
    this.SEditorSelectedComInstEvent.attach((data: SelectedComEventData) => {


      if (data.com == null)  {
        this.EditorData.SelectedCom = null;
        this.EditorData.SelectedComInst = null;
        return;
      }

      // 赋值当前选中的组件信息对象
      this.EditorData.SelectedCom = data.com;
      this.EditorData.SelectedComInst = null;

      // 通过实例Id寻找 vuecom组件实例
      let vuecom = SVuePageHelper.FindComInstByInstId(data.VuePage, data.com.ComInstId);
      if (vuecom != null) {
        // 赋值当前选中的组件页面实例
        this.EditorData.SelectedComInst = vuecom;
        this.SEditorSelectedComInstSetEndEvent.post(data);
      }

    });
  }


}
