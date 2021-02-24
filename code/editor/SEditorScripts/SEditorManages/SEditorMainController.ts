import SPageMainController from '../SPageManages/SPageMainController';
import SEditorPageInfoManagement from './mngs/SEditorPageInfoManagement';
import { SDEPageInfo } from '../SCommonModelsGroup/ServerModel';
import SEditorPageEventManagement from './mngs/SEditorPageEventManagement';
import SEditorAreaVueData from './defines/SEditorAreaVueData';
import LoadJsPluginsUtils from '../SCommonModelsGroup/utils/LoadJsPluginsUtils';
import SEditorComsStoreManagement from './mngs/SEditorComsStoreManagement';
import BaseComVue from '@/core/SDataBaseCom/BaseComVue';
import { ApiDefine_Editor_API } from '@/server/editor_api';

export default class SEditorMainController {

  private static _inst: SEditorMainController;
  public static get Inst(): SEditorMainController {
    if (this._inst == null) {
      this._inst = new SEditorMainController();
    }
    return this._inst;
  }

  // 可绑定的编辑器数据封装体 【指向到这里】
  public EditorData: SEditorAreaVueData = new SEditorAreaVueData();

  // 页面总控制器
  public PageMainController: SPageMainController = SPageMainController.Inst;

  // 编辑器-页面信息管理
  public EditorPageInfoMng: SEditorPageInfoManagement = new SEditorPageInfoManagement();
  public EditorPageEventMng: SEditorPageEventManagement = SEditorPageEventManagement.Inst;

  // 初始化页面方案
  public InitializePage(vuePage: BaseComVue, pageId: string, CB: (pageInfo: SDEPageInfo) => any) {

    // 加载Editor一些系统插件
    // LoadJsPluginsUtils.loadJSPlugin(["/SEditorSpace/plugins/plug-system/interact/interact.min.js"],()=> {
    // },true);
   LoadJsPluginsUtils.loadJSPlugin([
     '/SEditorSpace/plugins/plug-system/codemirror/lib/codemirror.js',
     '/SEditorSpace/plugins/plug-system/codemirror/lib/util/formatting.js',
     '/SEditorSpace/plugins/plug-system/codemirror/mode/javascript/javascript.js',
    ], () => {
      // do
    }, true);

   LoadJsPluginsUtils.LoadCss('/SEditorSpace/plugins/plug-system/codemirror/lib/codemirror.css');
   LoadJsPluginsUtils.LoadCss('/SEditorSpace/plugins/plug-system/codemirror/theme/3024-night.css');
   LoadJsPluginsUtils.LoadCss('/SEditorSpace/plugins/plug-system/codemirror/theme/darcula.css');
   LoadJsPluginsUtils.LoadCss('/SEditorSpace/plugins/plug-system/codemirror/theme/eclipse.css');




    // 打开通知ComData变化事件(当改变组件的自身属性也就是Com上Data时,根据此开关进行是否通知.)
   this.PageMainController.SPageEvents.PageComDataChangedEventToggle = true;

    // 初始化页面数据
   this.PageMainController.Initialize(vuePage, pageId, (info) => {
      this.EditorPageInfoMng.Initialize(this.EditorData, this.PageMainController.PageInfoMng, info);
      // 获取编辑器的可用组件列表
      ApiDefine_Editor_API.Action_GetSqlComList()
      .then((res) => {


        this.EditorData.SqlComList = res;

        this.EditorData.SqlComList.sort((a, b) => {
          if (a.TypeMain === 'demo') {
            return 1;
          } else {
            return -1;
          }
        });

        SEditorPageEventManagement.Inst.SEditorDataChangedEvent.post(true);

        if (CB != null) {
          CB(info);
        }
      });


    }, true);

    // 初始化
   this.EditorPageEventMng.Initialize(this.EditorData);

   SEditorComsStoreManagement.Inst.Initialize();

  }




}
