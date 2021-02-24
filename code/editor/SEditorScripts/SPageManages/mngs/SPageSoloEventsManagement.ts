import { SPageDefines } from '../../SCommonModelsGroup/defines/PageDefines';
import * as tsEvents from 'ts-events';
import PageSoloEventData, { PageSoloEventDefineItem, SoloEventListenerInfo } from '../../SCommonModelsGroup/SdeSoloEvent/SoloEventData';
import { SoloEventDefine, SoloEventTriggerStructCfg, ComInteractEventDataConfigItem, EComInteractTriggerType } from '../../SCommonModelsGroup/ServerModel';
import SPageMainController from '../SPageMainController';
import SPageInteractManagement from './SPageInteractManagement';
import SdeExpressRevolveManager from '../../SCommonModelsGroup/SdeExpression/SdeExpressRevolveManager';
import { VarSentenceResolveOption } from '../../SCommonModelsGroup/SdeExpression/SdeVariableExpress';



// tslint:disable-next-line: no-empty-interface
export interface ISPageSoloEventsManagement {
}


export default class SPageSoloEventsManagement {
  public static get Inst(): SPageSoloEventsManagement {
    if (this._inst == null) {
      this._inst = new SPageSoloEventsManagement();
    }
    return this._inst;
  }
  private static _inst: SPageSoloEventsManagement;

  // 流程: 应先存储所有的事件定义,再进行事件监听的初始化


  // 所有的SoloEvent都是走入这个底层事件
  private _SoloEnterEvent = new tsEvents.SyncEvent<PageSoloEventData>();

  // 存储所有已定义并且是可用的事件
  // 如果生命类型是OnlyOnce,触发一次后,会从 _EventStores 删除事件.
  // 来源: 组件交互配置中定义的,  组件实例传出定义的, 页面的事件定义的
  private _EventStores: PageSoloEventDefineItem[] = new Array<PageSoloEventDefineItem>();


  public Initialize() {
    // 底层事件进行Attach
    this._SoloEnterEvent.attach(this.SysEnterEventHandler);
  }

  //#region    /* 通过组件交互配置,组件实例配置,页面配置 等方式, 存储所有可用事件 */
  public RegistEnableEventFromCom(comInstId: string, define: SoloEventDefine) {
    let type = SPageDefines.ETargetKind.kCom;
    let isFromComInstDefine = false;

    this.RegistEvent(type, comInstId, isFromComInstDefine, define);
  }

  public RegistEnableEventFromComInst(comInstId: string, define: SoloEventDefine) {
    let com = SPageMainController.Inst.PageInfoMng.GetCom(comInstId);

    let query = com.Com.ExtendsInfo.SoloEventDefines.filter((p) => p.EventName === define.EventName);
    if (query == null || query.length <= 0) {
      define.Sign = 'lock';
      com.Com.ExtendsInfo.SoloEventDefines.push(define);

      let type = SPageDefines.ETargetKind.kCom;
      let isFromComInstDefine = true;
      this.RegistEvent(type, comInstId, isFromComInstDefine, define);
    }
  }

  public RegistEnableEventFromPage(define: SoloEventDefine) {
    let type = SPageDefines.ETargetKind.kPage;
    let isFromComInstDefine = false;

    this.RegistEvent(type, '', isFromComInstDefine, define);
  }

  // 通过交互的事件监听的配置,初始化事件的监听
  public AttachEventFromCom(listnerComInstId: string, cfg: ComInteractEventDataConfigItem) {
    if (cfg.TriggerType !== EComInteractTriggerType.kSoloEvent) {
      return;
    }

    if (cfg.EventTriggerCfg == null) {
      return;
    }

    if (cfg.EventTriggerCfg.Enable === false) {
      return;
    }

    if (cfg.EventTriggerCfg.TargetType === SPageDefines.ETargetKind.kCom) {
        let e = this.FindEventDefineItemByEventName(SPageDefines.ETargetKind.kCom, cfg.EventTriggerCfg.TargetEventName, cfg.EventTriggerCfg.TargetComInstId);

        if (e == null) {
          console.error('AttachEvent失败: 没有找到该事件 ' , cfg);
          return;
        }

        if (e.ListenerList == null) {
          e.ListenerList = new Array<SoloEventListenerInfo>();
        }

        let newListner = new SoloEventListenerInfo();
        newListner.ComInstId = listnerComInstId;
        newListner.ListenerType = SPageDefines.ETargetKind.kCom;
        newListner.ComInteractEventDataConfigItem = cfg;

        e.ListenerList.push(newListner);

        console.debug('监听注册:', newListner);
    }

    return;
  }

  // 获得组件上所有可用的事件,包含定义的和实例内定义的
  public GetEventsFromCom(comInstId: string): PageSoloEventDefineItem[] {
    let querys = this._EventStores.filter((p) => p.CreateFromType === SPageDefines.ETargetKind.kCom && p.CreateComInstId === comInstId);
    if (querys != null && querys.length > 0) {
      return querys;
    }

    return null;
  }

  public PostEventFromCom(fromComInstId: string, targetComInstId: string, targetEventName: string, data: string, customSign: string = ''): void {

    console.log(this._EventStores);

    let e = SPageSoloEventsManagement.Inst.FindEventDefineItemByEventName(SPageDefines.ETargetKind.kCom, targetEventName, targetComInstId);
    if (e == null) {
      console.error('执行错误,没有此事件: ' + targetEventName + ' From:' + targetComInstId);
      return null;
    }

    let soloData: PageSoloEventData = new PageSoloEventData();
    soloData.FromType = SPageDefines.ETargetKind.kCom;
    soloData.FromComInstId = fromComInstId;
    soloData.EventName = targetEventName;
    soloData.Data = data;
    soloData.EventId = e.EventId;
    soloData.CustomSign = customSign;

    SPageSoloEventsManagement.Inst.PostEvent(soloData);
  }

  private RegistEvent(type: SPageDefines.ETargetKind, comInstId: string, isFromComInstDefine: boolean, define: SoloEventDefine) {

    if (define.Enable === false) {
      return;
    }

    let querys = this._EventStores.filter((p) => p.SoloEventDefine === define);
    if (querys != null && querys.length > 0) {
      return;
    }

    let pageEvent = new PageSoloEventDefineItem();
    pageEvent.CreateComInstId = comInstId;
    pageEvent.CreateFromType = type;
    pageEvent.IsFromComInstDefine = isFromComInstDefine;
    pageEvent.ListenerList = [];

    // 设置EventID到配置中
    define.EventId = pageEvent.EventId;
    pageEvent.SoloEventDefine = define;

    this._EventStores.push(pageEvent);

    console.debug('加入事件:', pageEvent);
  }


  //#endregion




  // 底层事件处理入口
  private SysEnterEventHandler(soloData: PageSoloEventData) {
    SPageSoloEventsManagement.Inst.PostEventHandler(soloData);
  }



  /* 查找事件定义,失败返回null */
  private FindEventDefineItem(eventId: string): PageSoloEventDefineItem {
    if (eventId == null || eventId.trim() === '') { return null; }

    let querys = this._EventStores.filter((p) => p.EventId === eventId);
    if (querys != null && querys.length > 0) {
      return querys[0];
    }

    console.error('没有找到该事件: eventId:' + eventId);

    return null;
  }

  /* 查找事件定义,失败返回null */
  private FindEventDefineItemByEventName(type: SPageDefines.ETargetKind, eventName: string, comInstId: string): PageSoloEventDefineItem {
    if (eventName == null || eventName.trim() === '') { return null; }

    if (type === SPageDefines.ETargetKind.kCom) {
      let querys = this._EventStores.filter((p) => p.SoloEventDefine.EventName === eventName && p.CreateFromType === type && p.CreateComInstId === comInstId);
      if (querys != null && querys.length > 0) {
        return querys[0];
      }
    } else {
      let querys = this._EventStores.filter((p) => p.SoloEventDefine.EventName === eventName && p.CreateFromType === type);
      if (querys != null && querys.length > 0) {
        return querys[0];
      }
    }
    console.error('没有找到该事件: eventName:' + eventName);
    return null;
  }


  private PostEvent(soloData: PageSoloEventData) {
    console.log('发送事件 soloData: ', soloData);
    SPageSoloEventsManagement.Inst._SoloEnterEvent.post(soloData);
  }

  /* Post接收Handler */
  private PostEventHandler(soloData: PageSoloEventData): void {

    // 查看事件ID是否存在
    let e = SPageSoloEventsManagement.Inst.FindEventDefineItem(soloData.EventId);
    if (e == null || e.SoloEventDefine.Enable === false) {
      return;
    }

    // 处理内容字符串,替换变量表达式
    let ResolveOption = new VarSentenceResolveOption();
    ResolveOption.ResultStringVarExpWithDoubleQuotationMarks = false;
    soloData.Data =  SdeExpressRevolveManager.Inst.VarExpressResolver.ResolveAndReplaceSentense(soloData.FromComInstId, soloData.Data);


    // 循环处理监听
    e.ListenerList.forEach((element) => {
        SPageSoloEventsManagement.Inst.PostToListnerHandler(element, soloData);
    });

    // 如果Life 是OnlyOnce
    // TODO:
  }


  /* 发送监听的事件,并执行 */
  private PostToListnerHandler(listner: SoloEventListenerInfo, data: PageSoloEventData) {
    if (listner == null) { return; }

    console.log(data);

    // 如果监听者是组件
    if (listner.ListenerType === SPageDefines.ETargetKind.kCom) {
      // 按照自身,设置自己的公开变量
      let expBody = '#:' + '__' + data.EventName + '__';
      SdeExpressRevolveManager.Inst.VarExpressResolver.ResolveExpressAndSetValue(expBody, listner.ComInstId, data.Data);

      // 执行事件-执行行为表达式
      if (listner.ComInteractEventDataConfigItem.targetBehaviorExpress != null) {
        SPageInteractManagement.Inst.DoExpressOnly(listner.ComInstId, listner.ComInteractEventDataConfigItem.targetBehaviorExpress);
      }

      // 执行方法
      SPageInteractManagement.Inst.InvokeOpenMethodsByInterConfig(listner.ComInstId, listner.ComInteractEventDataConfigItem);

    }



    // TODO: 如果是页面
  }



}
