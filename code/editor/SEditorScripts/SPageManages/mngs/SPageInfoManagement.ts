import {
  SDEPageInfo,
  PageBaseComObject,
  IComVueBase,
  ComDataProcessorConfig,
  DataMapperRules,
  ComOpenMethodInfo,
} from '../../SCommonModelsGroup/ServerModel';
import SPageSomeTemplateCreator from '../../SCommonModelsGroup/utils/SPageSomeTemplateCreator';
import SVuePageHelper from '../../SCommonModelsGroup/utils/SVuePageHelper';
import SPageInfoComsManegement from './SPageInfoComsManegement';
import SComPageDatasManagement from './SComPageDatasManagement';
import SPageStylesManeagement from './SPageStylesManegement';
import BaseComVue from '@/core/SDataBaseCom/BaseComVue';
import { ApiDefine_Editor_API } from '@/server/editor_api';

export interface ISPageInfoManagement {
  PageId: string;

  // 设置页面信息结构体
  SetPageInfo(PageId: string, info: SDEPageInfo): void;
  // 获取页面信息结构体
  GetPageInfo(): SDEPageInfo;
  // 获取组件列表信息的引用
  GetComs(): PageBaseComObject[];
  // 获取指定组件-依据页面的实例ID
  GetCom(comInstId: string): PageBaseComObject;

  // 获取组件Vue实例
  GetComInst(comInstId: string): IComVueBase;

  // 获取页面服务器数据
  RequestPageInfoFromServer(
    PageId: string,
    CB: (info: SDEPageInfo) => any,
  ): void;
  // 组件依据zIndex排序
  ComsOrderByzIndex(reorder: boolean): void;

  //#region 管理变量

  //#endregion
}

export default class SPageInfoManagement implements ISPageInfoManagement {
  public ComsMng: SPageInfoComsManegement = null;
  public ComPageDataMng: SComPageDatasManagement = null;

  public PageId: string = '';

  public vuePage: BaseComVue;
  // 数据库得到的该页面方案的页面数据信息
  private PageServerDataInfo: SDEPageInfo;

  constructor() {
    this.PageServerDataInfo = new SDEPageInfo();
    this.PageServerDataInfo.Id = 'default';
    this.PageServerDataInfo.Desc = '默认编辑页面';
    this.PageServerDataInfo.PageTitle = '默认编辑页面';
    this.PageServerDataInfo.SDEPageSetting.ConfigStyleContent = SPageSomeTemplateCreator.CreateDefaultPageStyleContent();
    this.ComsMng = new SPageInfoComsManegement();
    this.ComsMng.Initialize(this);

    this.ComPageDataMng = new SComPageDatasManagement();
  }

  public Initialize(vuePage: BaseComVue) {
    this.vuePage = vuePage;
  }

  public SetPageInfo(PageId: string, info: SDEPageInfo): void {
    this.PageId = PageId;
    this.PageServerDataInfo = info;
    this.CheckPageInfoHealth();
  }

  public GetPageInfo(): SDEPageInfo {
    return this.PageServerDataInfo;
  }

  public GetComs(): PageBaseComObject[] {
    return this.PageServerDataInfo.Coms;
  }

  public GetCom(comInstId: string): PageBaseComObject {
    let querys = this.GetComs().filter((p) => p.ComInstId === comInstId);
    if (querys.length <= 0) { return null; }
    return querys[0];
  }

  public GetComInst(comInstId: string): IComVueBase {
    return SVuePageHelper.FindComInstByInstId(this.vuePage, comInstId);
  }

  // 获取组件的方法列表
  public GetComOpenMethods(comInstId: string): ComOpenMethodInfo[] {
    let comInst = this.GetComInst(comInstId);
    if (comInst == null)  {
      return null;
    } else {
      return comInst.GetInteractOpenMethods();
    }
  }

  // 匹配组件方法信息
  public GetComOpenMethod(comInstId: string, methodName: string): ComOpenMethodInfo {
    let list = this.GetComOpenMethods(comInstId);
    if (list == null) { return null; }
    let querys = list.filter((p) => p.Name === methodName);
    if (querys != null && querys.length > 0) {
      return querys[0];
    }
    return null;
  }



  // 组件依据zIndex排序 并 可以重排index
  public ComsOrderByzIndex(reorder: boolean = true): void {
    let coms = this.GetComs();
    coms.sort(this.ComOrderCompareSortByZIndex);

    if (reorder) {
      let index = 0;
      coms.forEach((element) => {
        element.ComLayout.zindex = index;
        ++index;
      });
    }

    console.log('是否排序成功?');
    console.log(coms);
  }

  // 通过API获取页面数据
  public RequestPageInfoFromServer(
    PageId: string,
    CB: (info: SDEPageInfo) => any,
  ) {
    if (PageId != null && PageId !== '') {
      ApiDefine_Editor_API.Action_GetPageSolution(PageId).then((res) => {
        if (res != null) {
          // tslint:disable-next-line: no-shadowed-variable
          let SDEPageInfo: SDEPageInfo = JSON.parse(res);
          if (CB != null) {
            CB(SDEPageInfo);
          }
        } else {
          if (CB != null) {
            CB(null);
          }
        }
      });
    }
  }

  // 检查结构体的完整性-避免迭代版本升级导致的已有数据加载出错
  private CheckPageInfoHealth() {
    this.PageServerDataInfo.Coms.forEach((com) => {

      let comDataInfo = this.ComPageDataMng.GetComPageData(com.ComInstId);
      if (comDataInfo == null) {
        this.ComPageDataMng.AddComPageData(com.ComInstId, com);
      }

      if (com.Com.ComBaseDataConfig.DataConfig.DataProcessorConfig == null) {
        // 配置初始的数据处理参数
        let dataProcessorConfig = new ComDataProcessorConfig();
        dataProcessorConfig.ListSourceProcessorFunction = '';
        dataProcessorConfig.SetDataMapRules = new DataMapperRules();
        dataProcessorConfig.ProcessorMapRules = new DataMapperRules();
        com.Com.ComBaseDataConfig.DataConfig.DataProcessorConfig = dataProcessorConfig;
      }
    });
  }

  // 依据zindex排序的Fn
  private ComOrderCompareSortByZIndex = (
    a: PageBaseComObject,
    b: PageBaseComObject,
  ) => {
    if (a.ComLayout.zindex > b.ComLayout.zindex) { return 1; } else if (a.ComLayout.zindex < b.ComLayout.zindex) { return -1; } else { return 0; }
  }









}
