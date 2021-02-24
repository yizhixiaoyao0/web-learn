import * as tsEvents from 'ts-events';
import SPageTimerManagement, { TimerPageEventData } from './SPageTimerManagement';
import { SPageDefines } from '../../SCommonModelsGroup/defines/PageDefines';
import { SdeVariableExpressSpace } from '../../SCommonModelsGroup/SdeExpression/SdeVariableExpress';
import SdeExpressRevolveManager from '../../SCommonModelsGroup/SdeExpression/SdeExpressRevolveManager';
import { ComInteractEventDataConfigItem } from '../../SCommonModelsGroup/ServerModel';
import SPageInteractManagement from './SPageInteractManagement';

// 组件交互配置中-交互条件表达式满足条件的事件内容
export class SPageComInterConditions {
  public RConfigId: string  = ''; // guid
  public ComInstId: string = ''; // 来源的ComInstId
  public CondExpress: string = ''; // 条件表达式
  public Result: boolean = false; // 条件表达式执行结果
  public HasErr: boolean = false; // 是否有错误或异常,如果有那么结果无效
  public InterEventDataItem: ComInteractEventDataConfigItem = null;

  // 条件表达式内涉及的变量存储字符串数组,比如: ["@(::prop)", "@(#:comInstID&var)"]
  // 修改为结构体: [{name:"@(::prop)", oldValue:any, newValue:any}]
  // 初始化时分析条件表达式,存储所有的变量表达式进来，默认值都为null
  public VarExpressObjs: SPageComInterVarDataInfo[] = [];

  // 正在Tick
  public IsTicking: boolean = false;
  // 已经启动StartTick
  public IsStarting: boolean = false;

  // Cron Job
  public TimerBoxId: string = '';

  // 记录变量值
  // RecordVarValue(data:SPageVariableChangedEventData) {
  //   this.VarExpressObjs.forEach((element:SPageComInterVarDataInfo) => {
  //     if(element.varFullExpress == data.varFullExpress) {
  //       element.OldValue = data.OldValue;
  //       element.NewValue = data.NewValue;
  //     }
  //   });
  // }

  // 当分析的 VarExpressObjs 数组元素 > 0 时,会进行每秒Tick
  public StartTick() {

      if (this.IsStarting)  {
        return;
      }
      if (this.VarExpressObjs != null) {
        if (this.TimerBoxId == null || this.TimerBoxId === '') {
            // 立即执行
            this.TimerBoxId = SPageTimerManagement.Inst.ApplyTimerBox(SPageDefines.ETargetKind.kFramework, 'SPageCondition_RConfig_' + this.RConfigId,
            '交互配置条件TickTimer', SPageTimerManagement.CreateCronHelper_GetEverySecond(),
            this.Tick, null, false, false, this,
          );
        }

        SPageTimerManagement.Inst.StartJob(this.TimerBoxId);
        this.IsStarting = true;
      }
  }

  // 每秒Tick方法
  // 检测表达式在当前Tick中是否满足条件
  // 如果满足则发送条件满足事件
  public Tick() {
    if (this.IsStarting === false) {
      return;
    }


    // console.log("Tick"+ this.RConfigId);
    // console.log("正在Tick:" + this.RConfigId);

    this.IsTicking = true;
    let condResult = SdeExpressRevolveManager.Inst.InvokeConditionExp(this.ComInstId, this.CondExpress);

    if (condResult) {
        // console.log("条件Tick(" + this.RConfigId + ") " + this.CondExpress + " 结果："+ condResult);
        // 修改此配置的状态
        this.Result = true;
        this.HasErr = false;
        // 如果条件成立,则通知事件->触发交互配置
        SPageEventsManagement.Inst.NoticePageComInterConditionMeeted(this);

        // 触发调用目标的方法
        SPageInteractManagement.Inst.InvokeOpenMethodsByInterConfig(this.ComInstId, this.InterEventDataItem);
    }
    this.IsTicking = false;
  }

  public StopTick() {
    this.IsStarting = false;
    this.IsTicking = false;
    SPageTimerManagement.Inst.StopJob(this.TimerBoxId);
  }

}

export class SPageComInterVarDataInfo {
  public varFullExpress: string = ''; // 可以为空, 比如 "@(::prop)", "@(#:comInstID&var)"
  public NewValue: any;
  public OldValue: any;
}


export class SPageVariableChangedEventData {
  public kind: SPageDefines.ETargetKind;
  public varType: SdeVariableExpressSpace.EOpenVarPrefixType;
  public fromComInstId: string = '';
  public varName: string = ''; // 变量名
  public varFullExpress: string = ''; // 可以为空, 比如 "@(::prop)", "@(#:comInstID&var)"
  public NewValue: any;
  public OldValue: any;
  // ChangedTimestamp:number = "";
}

export default class SPageEventsManagement {

  private static _inst: SPageEventsManagement;
  public static get Inst(): SPageEventsManagement {
    if (this._inst == null) {
      this._inst = new SPageEventsManagement();
    }
    return this._inst;
  }

  // Timer事件
  // private SPageTimerEvent = new tsEvents.SyncEvent<TimerPageEventData>();

  // 组件交互配置中-交互条件表达式满足条件的事件
  public SPageComInterConditionMeetedEvent = new tsEvents.SyncEvent<SPageComInterConditions>();

  // 组件/页面/系统变量变化的事件
  // public SPageVariableChangedEvent = new  tsEvents.SyncEvent<SPageVariableChangedEventData>();

  // 组件的ComData如果有变化,通知事件,只有在 PageComDataChangedEventToggle == true时会发送通知
  // 参数: ComInstId
  public PageComDataChangedEventToggle: boolean = true;
  public PageComDataChangedEvent = new tsEvents.SyncEvent<string>();


  // 通知变量数值改变
  // NoticeVariableValueChanged(data:SPageVariableChangedEventData) {
  //   this.SPageVariableChangedEvent.post(data);
  // }

  /**
   * 通知事件-条件表达式满足条件
   *
   * @param {SPageComInterConditions} data
   * @memberof SPageEventsManagement
   */
  public NoticePageComInterConditionMeeted(data: SPageComInterConditions) {
    this.SPageComInterConditionMeetedEvent.post(data);
  }


  public NoticePageComDataChanged(comInstId: string) {
    if (SPageEventsManagement.Inst.PageComDataChangedEventToggle) {
      SPageEventsManagement.Inst.PageComDataChangedEvent.post(comInstId);
    }
  }

}

