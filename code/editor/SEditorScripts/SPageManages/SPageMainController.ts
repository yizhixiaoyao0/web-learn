import SPageInfoManagement from './mngs/SPageInfoManagement';
import { SDEPageInfo, PageBaseComObject, IComVueBase, ComEventData, ComInteractEventDataConfigBase, DataMapperRules, DataMapperRuleItem, ComDataProcessorConfig, ESComPlugins, SoloEventDefine, ESoloEventLifeType } from '../SCommonModelsGroup/ServerModel';
import SVuePageHelper from '../SCommonModelsGroup/utils/SVuePageHelper';
import SPageEventsManagement from './mngs/SPageEventsManagement';
import SPageInteractManagement from './mngs/SPageInteractManagement';
import SdeExpressRevolveManager from '../SCommonModelsGroup/SdeExpression/SdeExpressRevolveManager';
import { SPageDefines } from '../SCommonModelsGroup/defines/PageDefines';
import SHttpUtils from '../SCommonModelsGroup/utils/SHttpUtils';
import SPageDataProcessorFlowManagement from './mngs/SPageDataProcessorFlowManagement';
import SPagePluginManagement from './mngs/SPagePluginManagement';
import SPageConfigManagement from './mngs/SPageConfigManagement';
import SPageAnimatorHelper, { AnimatorParamsOption } from './mngs/SPageAnimatorHelper';
import SPageSoloEventsManagement from './mngs/SPageSoloEventsManagement';
import SComMngCenter from './comsmng/SComMngCenter';
import BaseComVue from '@/core/SDataBaseCom/BaseComVue';
import TimeUtils from '@/kernel/TimeUtils';



export default class SPageMainController  {

  private static _inst: SPageMainController;
  public static get Inst(): SPageMainController {
    if (this._inst == null) {
      this._inst = new SPageMainController();
    }
    return this._inst;
  }

  //#region  Mng定义
    // 页面信息管理器
  public PageInfoMng: SPageInfoManagement = new SPageInfoManagement();
  public SPageEvents: SPageEventsManagement = SPageEventsManagement.Inst;
  public SPageInteractMng: SPageInteractManagement = SPageInteractManagement.Inst;
  public SPageDataProcessorFlowMng: SPageDataProcessorFlowManagement = SPageDataProcessorFlowManagement.Inst;

  public IsEditor: boolean = false;
  //#endregion

  /*
  * Initialize By Mounted
  * 页面数据PageInfo的初始化
  * 先进行数据获取-->页面数据绑定-->组件数据处理-->组件页面渲染和绑定的基本思路
  */
  public Initialize(vuePage: BaseComVue, pageId: string, CB: (sinfo: SDEPageInfo) => any, isEditor: boolean = false) {

    this.IsEditor = isEditor;

    SPagePluginManagement.Inst.InitializeDefineData();
    SPageConfigManagement.Inst.InitializeConfig();

    // PageInfoManager 初始化
    this.PageInfoMng.Initialize(vuePage);

    // 初始化页面数据
    this.PageInfoMng.RequestPageInfoFromServer(pageId, (info) => {

      // 设置页面信息 (这里是存放的实际页面信息位置)
      this.PageInfoMng.SetPageInfo(pageId, info);

      // 初始化变量表达式解析器
      this.InitSdeVarExpressResolve();

      if (CB != null) {
        CB(info);
      }
    });

  }

  // 涉及到组件的数据初始化
  // 可在页面组件实例渲染前操作
  public InitOnBefourPageInit(): void {
      /* 组件循环初始化 - 不使用comInst (此时只处理数据) */
      this.PageInfoMng.GetComs().forEach((com: PageBaseComObject) => {
        // 完善com身上的一些值,供页面上使用
        com.ComDataClassTypeName = SVuePageHelper.GetClassTypeNameOfReturnComDataClass(com.Com.ComClassName);
      });


      SPageEventsManagement.Inst.PageComDataChangedEvent.attach((id: string) => {

          let comInst = this.PageInfoMng.GetComInst(id);
          let com = this.PageInfoMng.GetCom(id);

          this.PageInfoMng.ComsMng.SetDataToComInst(
            id, comInst, com.Com.Data);
      },
    );

  }


  public InitOnAfterPageInit(): void {

    SComMngCenter.Inst.Initialize();

    this.PageInfoMng.vuePage.$nextTick(() => {


    setTimeout(() => {

      let pageInfo = this.PageInfoMng.GetPageInfo();

      let allPlugins: ESComPlugins[] = [];

      /* 组件循环渲染初始化 - 使用comInst (此时处理和渲染) */
      this.PageInfoMng.GetComs().forEach((com: PageBaseComObject) => {
        let comInst = this.PageInfoMng.GetComInst(com.ComInstId);

        // 注册组件发送事件
        this.InitComponentEvent(com, comInst);

        // 页面加载JS插件
        let plugins = comInst.GetPageReadyLoadJSPluginNames();
        plugins.forEach((element) => {
          if (!allPlugins.includes(element)) {
            allPlugins.push(element);
          }
        });

        // 找出组件定义的SoloEvent,以及组件实例内部定义的SoloEvent,全部注册到SPageSoloEventsManager中
        if (com.Com.ExtendsInfo && com.Com.ExtendsInfo.SoloEventDefines != null)  {
          com.Com.ExtendsInfo.SoloEventDefines.forEach((eventDefine) => {
            SPageSoloEventsManagement.Inst.RegistEnableEventFromCom(com.ComInstId, eventDefine);
          });
        }

        // TODO: 通过ComInst找出SoloEvent定义
        let instEvents =  comInst.GetComInstEventDefineList();
        if (instEvents != null) {

          console.log('事件:' , instEvents);

          instEvents.forEach((element) => {
            let d = new SoloEventDefine();
            d.EventName = element.EventName;
            d.Enable = true;
            d.LifeType = ESoloEventLifeType.kPermanent;
            d.Remarks = 'Defined From ComInst Inner';

            SPageSoloEventsManagement.Inst.RegistEnableEventFromComInst(com.ComInstId, d);
          });
        }


      });
      // END:循环组件


      // 初始化页面组件的数据源设置,并启动数据源获取
      this.SPageDataProcessorFlowMng.InitPageDataProcessor(pageInfo);

      // 初始化SoloEvents底层事件
      SPageSoloEventsManagement.Inst.Initialize();

      // 加载页面的动画插件
      SPageAnimatorHelper.Inst.LoadAnimatorPlugin(() => {


              // 加载所有组件的插件
          SPagePluginManagement.Inst.PageLoadPlugin(allPlugins, () => {

            this.PageInfoMng.GetComs().forEach((com: PageBaseComObject) => {
              let comInst = this.PageInfoMng.GetComInst(com.ComInstId);

              // //得到入场动画配置
              let animEnterConfig = com.Com.ExtendsInfo.ComEnterAnimatorConfig;

              // 设置数据
              // comInst.SetData(com.Com.Data, {first:true});
              this.PageInfoMng.ComsMng.SetDataToComInst(com.ComInstId, comInst, com.Com.Data, {first: true});

              // //动画
              SPageAnimatorHelper.Inst.Set_ComEnterStartAnimation(com, com.ComInstId, null, () => {
                // 组件开始
                comInst.Start(com.ComInstId);
                // 调用启动动画
                comInst.RunEntryAnimation(com.ComInstId);

              },  // EndCB
              animEnterConfig,
              );



            });


            setTimeout(() => {
              // 初始化页面交互配置
              this.SPageInteractMng.Initialize(pageInfo);
            }, 1000);


        });


      });


      // 测试代码
      // this.TestCode();


    }, 200);


  });
  }










  // 注册组件事件
  public InitComponentEvent(item: PageBaseComObject, vuecomInst: IComVueBase): void {

    // 监听组件向页面传递事件 - 预留事件处理handler
    vuecomInst.ComEvents.attach((eventData: ComEventData) => {
      // 如果想获取页面实例ComInst: SPageMainController.Inst.PageInfoMng.GetComInst(eventData.SenderComInstId);

      // console.log("接收到Unity发来的事件",eventData);

      SPageSoloEventsManagement.Inst.PostEventFromCom(item.ComInstId, item.ComInstId, eventData.EventName, eventData.Content);
    });

    // 组件交互配置保证不为空
    if (item.Com.ComBaseInteractConfig == null) {
      item.Com.ComBaseInteractConfig = new ComInteractEventDataConfigBase();
    }
    if ((<ComInteractEventDataConfigBase> item.Com.ComBaseInteractConfig).items == null) {
      (<ComInteractEventDataConfigBase> item.Com.ComBaseInteractConfig).items = [];
    }
    // vuecomInst.SetComInteractConfig((<ComInteractEventDataConfigBase>(item.Com.ComBaseInteractConfig)));
  }


  private InitSdeVarExpressResolve() {
    SdeExpressRevolveManager.Inst.Initialize(
      (targetKind: SPageDefines.ETargetKind, selfComInstId: string, comInstId: string, propName: string, isOpenVar: boolean)  => {
        let value: any = null;

        if (targetKind === SPageDefines.ETargetKind.kCom) {

          let com = this.PageInfoMng.GetCom(comInstId);

          if (com == null) { return null; }
          // 组件的开放变量
          if (isOpenVar) {
            value = this.PageInfoMng.ComsMng.GetValueFromComOpenVariable(selfComInstId, comInstId, propName);
          } else {
            value = this.PageInfoMng.ComsMng.GetValueFromComProp(selfComInstId, comInstId, propName, false);
          }
        } else if (targetKind === SPageDefines.ETargetKind.kPage) {
          value = this.PageInfoMng.ComsMng.GetValueFromPageOpenVariable(selfComInstId, propName);
        } else if (targetKind === SPageDefines.ETargetKind.kSys) {
          value = this.PageInfoMng.ComsMng.GetValueFromSystemVariable(selfComInstId, propName);
        }

        if (value == null) { return null; }

        return value;
     },

     (targetKind: SPageDefines.ETargetKind, selfComInstId: string, comInstId: string, propName: string, isOpenVar: boolean, value: any)  => {

      // console.log("设置Delegate:" , targetKind,selfComInstId,comInstId,propName,isOpenVar,value);

      if (targetKind === SPageDefines.ETargetKind.kCom) {
        let com = this.PageInfoMng.GetCom(comInstId);

        if (com == null) { return null; }
        // 组件的开放变量
        if (isOpenVar) {
          this.PageInfoMng.ComsMng.SetValueToComOpenVariable(selfComInstId, comInstId, propName, value);
        } else {
          this.PageInfoMng.ComsMng.SetValueToComProp(selfComInstId, comInstId, propName, value);
        }
      } else if (targetKind === SPageDefines.ETargetKind.kPage) {
        this.PageInfoMng.ComsMng.SetValueToPageOpenVariable(propName, value);
      } else if (targetKind === SPageDefines.ETargetKind.kSys) {
        // todo
      }
      return ;
   });

  }



  private TestCode() {
    console.group('TestCode代码!');

    let sourceData: TA = new TA();
    sourceData.age1 = TimeUtils.GetTimestampNow();
    sourceData.name = 'kevek';
    sourceData.item = new TItem();
    sourceData.item.itemb = new TItemB();

    sourceData.item.childName = 'FromTAChildName';
    sourceData.item.itemb.haha = 888888;

    sourceData.list.push('汪子文');

    let destData: TB = new TB();

    let rule = new DataMapperRules();
    // rule.mapper.push({ SourceName: "age1", DestName: "item.childNumber"});
    // rule.mapper.push({SourceName: "item.childName",DestName: "item.childName" });
    // rule.mapper.push({ SourceName: "item.itemb.haha", DestName: "item.PPP"});
    // rule.mapper.push({ SourceName: "list", DestName: "item.list"});



    // let res = SPageDataMapperUtils.Inst.ProduceDataFromObj(TB,sourceData,rule);

    // console.log(res);
    console.groupEnd();

// #region
    // console.group("测试来源数据为List的处理!");

    // let sList = [
    //   {name:"k1", age:100},
    //   {name:"k2", age:101},
    //   {name:"k3", age:102}
    // ];

    // let sListStr = JSON.stringify(sList);

    // let express:string = `
    //     var c = 0;
    //     _arr.forEach(element => {
    //       c += element.age;
    //     });
    //     return {count:c};
    // `;

    // let resObj = SPageDataMapperUtils.Inst.ProduceDataFromListByFunction(sListStr,express);

    // console.log(resObj);

    // console.groupEnd();

//#endregion

//#region
    console.group('测试HttpGet');

    SHttpUtils.RequestByGetAndReturnT<HttpGetDemoClass>('http://localhost:63409/api/DemoData/GetData', 'res')
    // tslint:disable-next-line: no-shadowed-variable
    .then((data) => {
      console.log('Get 1');
      console.log(data);
    });


    let ruls: DataMapperRules = new DataMapperRules();
    let rulesItem: DataMapperRuleItem = new DataMapperRuleItem();
    rulesItem.SourceName = 'date';
    rulesItem.DestName = 'name';
    ruls.mapper.push(rulesItem);

    // SHttpUtils.RequestByGetAndReturnArrayT<HttpGetDemoClass>(
    //   "http://localhost:63409/api/DemoData/GetDataList",
    //   "res",null,true,HttpGetDemoClass,ruls)
    // .then((data) => {
    //   console.log("Get 2");
    //   console.log(data);
    // })


    console.groupEnd();
//#endregion

//#region
    console.group('测试数据处理流程');
    let c = new ComDataProcessorConfig();
    c.SetDataMapRules = rule;
    let data = SPageDataProcessorFlowManagement.Inst.GetDataFromOrigin(TB, '', sourceData, c);
    console.groupEnd();
//#endregion


  }


  private TestEvent() {
    console.log('测试发送事件');
    //  SPageSoloEventsManagement.Inst.PostEventFromCom("c25512e6d43b837f6c78614b32ebaa9d","c25512e6d43b837f6c78614b32ebaa9d","EventTest1","{name:'nana'}");

  }

}

export class HttpGetDemoClass {
  public count: number = 0;
  public date: string = '';
  public timestamp: number = 0;
  public name: string = '';
}


class TA {
  public name: string = '';
  public age1: number = 0;

  public cc: boolean = false;

  public item: TItem = new TItem();

  public list: string[] = [];
}

class TB {
  public name: string = 'tb';
  public age: number = 100;
  public uuu: number = 60;

  public item: TItem = new TItem();
}

class TItem {
  public childName: string = 'hello';
  public childNumber: number = 0;
  public PPP: number = 0;

  public itemb: TItemB = new TItemB();

  public list: string[] = [];
}

class TItemB {
  public haha: number = 100;
}
