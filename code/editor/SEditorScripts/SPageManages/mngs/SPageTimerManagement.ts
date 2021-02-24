import { SPageDefines } from '../../SCommonModelsGroup/defines/PageDefines';

import cron from 'cron';
import GUIDHelper from '@/kernel/GUIDHelper';
let CronJob = cron.CronJob;
let CronTime = cron.CronTime;
let SHTimeZone = 'Asia/Shanghai';


export class TimerBox {
  // 分配的BoxId
  public BoxId: string = '';
  // 是否启用
  public IsRunning: boolean = false;
  // 申请者类型 页面/组件/系统
  public OwnerType: SPageDefines.ETargetKind;
  // 申请者标识 (如果是组件,则是ComInstId)
  public OwnerId: string = '';
  // 此定时器描述
  public Desc: string = '';
  // 定时器cron时间表达式
  public CronExpress: string | Date;
  // Job
  public Job: cron.CronJob;
}

// 定时器发送通知事件的内容
export class TimerPageEventData {
  public TimerBox: TimerBox = null;
}


export default class SPageTimerManagement {
  public static get Inst(): SPageTimerManagement {
    if (this._inst == null) {
      this._inst = new SPageTimerManagement();
    }
    return this._inst;
  }

  public static CreateCronHelper_GetEverySecond(): string {
    return '* * * * * *';
  }
  private static _inst: SPageTimerManagement;

  private Boxes: TimerBox[] = new Array<TimerBox>();

  // 申请TimerBox
  // 返回唯一guid
  // 注意OnTick中避免使用 this， 或者 context一定要传入
  public ApplyTimerBox(OwnerType: SPageDefines.ETargetKind, OwnerId: string, Desc: string, CronExpress: string | Date,
                       OnTick: () => void, OnComplete: () => void, start: boolean = false,  runOnInit: boolean = false, context: any = null,
    )
    : string {
    // 创建Box
    let box = new TimerBox();
    box.BoxId = GUIDHelper.Create();  // 创建GUID
    box.CronExpress = CronExpress;
    box.Desc = Desc;
    box.OwnerId = OwnerId;
    box.OwnerType = OwnerType;
    ``;
    // 创建Job
    box.Job = this.CreateJob(CronExpress, OnTick, OnComplete, start, SHTimeZone, context, runOnInit);
    box.IsRunning = start;

    this.Boxes.push(box); // 记录到Boxes列表
    console.log(
      ' 创建了TimerBox: ' + box.BoxId +  ' ' + OwnerId + ' ' + Desc +
      ' 当前box数量:' + this.Boxes.length);

    return box.BoxId;
  }

  // 启动定时器-根据boxId
  public StartJob(boxId: string) {
    let box = this.GetBox(boxId);
    if (box != null) {
      if (!box.Job.running) {
        box.Job.start();
      }
    }
  }

  public StopJob(boxId: string) {
    let box = this.GetBox(boxId);
    if (box != null) {
      if (box.Job.running) {
        box.Job.stop();
      }
    }
  }


  private GetBoxs(boxId: string): TimerBox[] {
    return this.Boxes.filter((p) => p.BoxId === boxId);
  }

  private GetBox(boxId: string): TimerBox  {
    let boxs = this.GetBoxs(boxId);
    if (boxs == null || boxs.length <= 0) { return null; }
    return boxs[0];
  }

  private CreateJob(cronTime: string | Date, onTick: () => void, onComplete?: () => void, start?: boolean, timeZone?: string, context?: any, runOnInit?: boolean): cron.CronJob {
    return new CronJob(cronTime, onTick, onComplete, start, timeZone, context, runOnInit);
  }

}
