import { SComPluginDefines, ESComPlugins } from '../../SCommonModelsGroup/ServerModel';
import SPageMainController from '../SPageMainController';
import LoadJsPluginsUtils from '../../SCommonModelsGroup/utils/LoadJsPluginsUtils';

export default class SPagePluginManagement {
  private static _inst: SPagePluginManagement;
  public static get Inst(): SPagePluginManagement {
    if (this._inst == null) {
      this._inst = new SPagePluginManagement();
    }
    return this._inst;
  }

  private PluginDefines: SComPluginDefines = new SComPluginDefines();

  // (v:ESComPlugins) => STool_PluginItemVerTypeObj;
  private PluginsByEnumValue: any =  {};

  /* 系统启动时调用一次 */
  public InitializeDefineData() {
    // 初始化插件的定义,解析为后期好匹配的格式
    this.PluginDefines.defines.forEach((group) => {
      for (let index = 0; index < group.version.length; index++) {
        const verItem = group.version[index];

        for (let t = 0; t < verItem.types.length; t++) {
          const typeItem = verItem.types[t];

          let urlList = [];

          for (let f = 0; f < typeItem.files.length; f++) {
            const file = typeItem.files[f];
            urlList.push('/SEditorSpace/plugins/' +  group.group + '/' + group.name + '/' + verItem.ver + '/' + file);
          }

          this.PluginsByEnumValue[typeItem.enumValue] = {
            info: typeItem,
            urlList,
          };
        }
      }
    });

    // console.log(this.PluginsByEnumValue);
    // this.GetPluginFilePaths(1);
    // this.GetPluginFilePaths(2);
  }

  public PageLoadPlugin(types: ESComPlugins[], callback: any) {
    let files: string[] = [];
    types.forEach((element) => {

      if (SPageMainController.Inst.IsEditor) {

        if (!SPageMainController.Inst.PageInfoMng.GetPageInfo().EditorSetOption.LoadUnity3D) {
          if (element === ESComPlugins.k1002_plug_unity_unity_2018_normal_unityloader_js) {
            return;
          }
        }

      }


      files = files.concat(this.GetPluginFilePaths(element));

      // 如果含有iview插件,则编辑器或工程层面需要提示安装iview的npm包
      if (element === ESComPlugins.k1004_plug_ui_iview_min_js) {

        try {
          require.resolve('iview');
        } catch (error) {
          console.error('请安装 iview !');
          document.body.outerHTML = '<div style=\'color:red;font-size:30px\'>该页面含有iview组件, 但未安装, 请安装 iview (yarn add iview --save) !</div>';
        }
      }

    });

    console.log('加载Plugins', files);

    let jsList: string[] = [];
    let cssList: string[] = [];

    files.forEach((plugFilePath) => {
      if (plugFilePath.endsWith('.js')) {
        jsList.push(plugFilePath);
      } else if (plugFilePath.endsWith('.css')) {
        cssList.push(plugFilePath);
      }
    });

    LoadJsPluginsUtils.loadJSPlugin(jsList, callback);

    cssList.forEach((cssPath) => {
      LoadJsPluginsUtils.LoadCss(cssPath);
    });
  }


  // PageLoadPlugin(pathArr:string[],callback:any) {
  //   LoadJsPluginsUtils.loadJSPlugin(pathArr,callback);
  // }


  /* 得到插件相对路径的列表 */
  public GetPluginFilePaths(v: ESComPlugins): string[] {
    let res = this.PluginsByEnumValue[v.toString()];

    if (res == null) {
      console.log('找不到');
      return [];
    }
    return res.urlList;
  }


}
