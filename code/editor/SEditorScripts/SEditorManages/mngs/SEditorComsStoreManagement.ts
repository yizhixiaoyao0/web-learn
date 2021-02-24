import SEditorMainController from '../SEditorMainController';
import SEditorPageEventManagement from './SEditorPageEventManagement';
import { ApiDefine_Editor_API } from '@/server/editor_api';

export default class SEditorComsStoreManagement {

  private static _inst: SEditorComsStoreManagement;
  public static get Inst(): SEditorComsStoreManagement {
    if (this._inst == null) {
      this._inst = new SEditorComsStoreManagement();
    }
    return this._inst;
  }


  public Initialize() {
    // 获取设计号
    ApiDefine_Editor_API.Action_GetAllDesignConfigs()
    .then((res) => {
      SEditorMainController.Inst.EditorData.DesignConfigs = res;

      SEditorPageEventManagement.Inst.SEditorDataChangedEvent.post(true);
    });
  }

}
