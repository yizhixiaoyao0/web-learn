import { SPageDefines } from '../defines/PageDefines';
import { SoloEventDefine, ComInteractEventDataConfigItem } from '../ServerModel';
import TimeUtils from '@/kernel/TimeUtils';
import GUIDHelper from '@/kernel/GUIDHelper';

/**
 * SoloEvent内容数据结构定义
 *
 * @export
 * @class SoloEventData
 */
export default class PageSoloEventData {

  public Timestamp: number = 0;

  /* 事件ID-GUID创建 */
  public EventId: string = '';

  public EventName: string = '';

  /* 事件发送来源类型-组件/页面/系统/  */
  public FromType: SPageDefines.ETargetKind = SPageDefines.ETargetKind.kUnknown;
  /* 来源ComInstID, 组件实例ID/页面为空/系统为空 */
  public FromComInstId: string = '';

  public Data: string = '';

  // 自定义的标记,比如Unity的Proto协议,可以约定填写 unity_proto
  public CustomSign: string = '';

  constructor() {
    this.Timestamp = TimeUtils.GetTimestampNow();
  }
}

/**
 * SoloEvent 事件的定义格式
 *
 * @export
 * @class SoloEventDefineItem
 */
export class PageSoloEventDefineItem {
  public get EventId(): string {
    return this._EventId;
  }

  // 对象存储的事件配置(引用)
  public SoloEventDefine: SoloEventDefine = new SoloEventDefine();

  /* 事件创建来源类型-组件/页面/系统/  */
  public CreateFromType: SPageDefines.ETargetKind = SPageDefines.ETargetKind.kUnknown;

  /* 如果为组件创建,这里为创建的ComInstID */
  public CreateComInstId: string = '';

  /* 被监听的所有注册信息 */
  public ListenerList: SoloEventListenerInfo[] = [];

  /* 是否是通过组件实例定义的事件 */
  public IsFromComInstDefine: boolean = false;

  /* 事件ID-GUID创建 */
  private _EventId: string;

  constructor() {
    this._EventId = GUIDHelper.Create();
  }

}


/**
 * 监听者信息
 *
 * @export
 * @class SoloEventListenerInfo
 */
export class SoloEventListenerInfo {

  public ComInstId: string = '';

  public ListenerType: SPageDefines.ETargetKind = SPageDefines.ETargetKind.kUnknown;

  // 处理回调(引用)
  public ComInteractEventDataConfigItem: ComInteractEventDataConfigItem = new ComInteractEventDataConfigItem();
}


// /**
//  * 已注册的SoloEvents仓库
//  *
//  * @export
//  * @class SoloEventDefineStores
//  */
// export class SoloEventDefineStores implements ISoloEventDefineStores {


//   //存储监听事件信息


//   //DoEventsHandler: 执行事件委托回调
//   private DoEventsHandler:(e:SoloEventDefineItem,data:SoloEventData) => void = null;

//   //DoEventsHandler: 执行事件委托回调
//   Initialize(doEventsHandler:(e:SoloEventDefineItem,data:SoloEventData) => void) {
//     this.DoEventsHandler = doEventsHandler;
//   }

//   //创建事件
//   CreateEvent(fromType: SPageDefines.ETargetKind, EventType: ESoloEventType, comInstId: string): boolean;
//   CreateEvent(fromType: SPageDefines.ETargetKind, EventType: ESoloEventType): boolean;
//   CreateEvent(fromType:  SPageDefines.ETargetKind, EventType: ESoloEventType, comInstId?: string) :boolean {
//     if(fromType == SPageDefines.ETargetKind.kCom) {
//       if(comInstId == null || comInstId.trim() == "") {
//         return false;
//       }
//     }
//     if(fromType == SPageDefines.ETargetKind.kUnknown) return false;

//     let e = new SoloEventDefineItem();
//     e.CreateFromType = fromType;
//     e.CreateComInstId = comInstId;
//     e.EventType = EventType;

//     this.stores.push(e);
//   }

//   /* 获取事件定义 */
//   GetEventDefine(eventId:string) : SoloEventDefineItem{
//     if(eventId == null || eventId.trim() == "") return null;

//     let querys = this.stores.filter(p => p.EventId == eventId);
//     if(querys != null && querys.length > 0) {
//       return querys[0];
//     }
//     return null;
//   }


//   /* 执行事件 */
//   StartDoEvent(data:SoloEventData) :void{
//     if(this.DoEventsHandler != null) {
//       let e = this.GetEventDefine(data.EventId);
//       if(e == null) {
//         return;
//       }
//       this.DoEventsHandler(e,data);

//       //TODO: 如果事件Lift类型是: OnlyOnce,则执行完销毁
//     }
//   }

//   /* 监听事件 */
//   AttachEvent(eventId:string) {

//   }




// }
