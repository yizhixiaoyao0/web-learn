import { EValueType, SdeServerValueStruct } from '../ServerModel';

import cron from 'cron';
import SPageAssetsManagement from '../../SPageManages/mngs/SPageAssetsManagement';
import SPageMainController from '../../SPageManages/SPageMainController';
import TimeUtils from '@/kernel/TimeUtils';
// let CronJob = cron.CronJob;
// let CronTime = cron.CronTime;
// let SHTimeZone = 'Asia/Shanghai';
//  @(#@SysTimestampNow)
/*
SysTimestampNow  |  当前时间戳 | 示例: 1593658763
// SysTimeShortStringNow | | 18:30
// SysTimeFullStringNow | | 18:30:01
// SysDateStringNow | | 2018-12-08
SysDateTimeStringNow | | 2018-12-08 18:30:01
SysDateWithYearNow | | 2018
SysDateWithMonthNow | | 12
SysDateWithDayNow | | 8
SysTimeWithHourNow | | 18
SysTimeWithMinuteNow | | 30
SysTimeWithSecondNow | | 1

SysPageComCount | 当前页面组件数量 |  15
SysPageUrl | 当前页面Url | "http://**"

*/

class SdeSystemOpenVarStoreItemStruct {
  public varName: string = '';
  public value: SdeServerValueStruct = new SdeServerValueStruct();
  public UpdateValueMethod: (selfComInstId: string, s: SdeServerValueStruct) => SdeServerValueStruct;

  // 这个系统变量是否是动态变化的,默认false
  public isDynamic: boolean = false;
  // 配置的Cron Job,默认null, 如果配置了,在其中如果变更,会进行 系统变量变化的通知
  // cronJob:cron.CronJob = null;
  // 是否被监听,默认false
  public beListened: boolean = false;

  // Cron Job
  public TimerBoxId: string = '';
}

/**
 * Sde系统开放变量定义管理
* @kind SysTimestampNow - 获取当前时间戳
* @kind SysDateTimeStringNow - 时间格式:2018-12-08 18:30:01
*
*/
export default class SdeSystemOpenVariableCenter {
  public static get Inst(): SdeSystemOpenVariableCenter {
    if (this._inst == null) {
      this._inst = new SdeSystemOpenVariableCenter();
      this._inst.Initialize();
    }
    return this._inst;
  }


  private static _inst: SdeSystemOpenVariableCenter;

  private PropStores: SdeSystemOpenVarStoreItemStruct[] = [];
  private Props: SdeServerValueStruct[] = [];

  // 需要被监听的系统变量
  private HasListenedSystemVarNames: string[] = [];


  /**
   * 获取所有系统变量信息
   * @returns {Array<SdeServerValueStruct>}
   * @memberof SdeSystemOpenVariableCenter
   */
  public GetProps(): SdeServerValueStruct[] {
    return this.Props;
  }

  /**
   * 获取系统变量的当前值
   *
   * @param {string} varName 变量名称
   * @returns {SdeServerValueStruct}
   * @memberof SdeSystemOpenVariableCenter
   */
  public GetSysPropValue(fromComInstId: string, varName: string): SdeServerValueStruct {
    let s = this.GetStorePropInfo(fromComInstId, varName);
    if (s == null) { return null; }

    return s.UpdateValueMethod(fromComInstId, s.value);
  }

  /**
   * 添加系统变量的监听事件,当其按照自身属性变化时,通知回调
   *
   * @param {string} varName
   * @memberof SdeSystemOpenVariableCenter
   */
  public AddVarListener(varName: string) {

    // 先查找系统变量
    let s = this.GetStorePropInfo(null, varName);
    if (s == null) { return; }

    if (!this.HasListenedSystemVarNames.includes(varName)) {

      s.beListened = true; // 标记此变量被监听了
      this.HasListenedSystemVarNames.push(varName);

      // this.CheckSysVarCronJob();
    }
  }



  // 发送事件-通知系统变量变化
  // private NoticeSysVarValueChanged(varName:string,oldValue:any,newValue:any) {
  //   let data = new SPageVariableChangedEventData();
  //   data.kind = SPageDefines.ETargetKind.kSys;
  //   data.OldValue = oldValue;
  //   data.NewValue = newValue;
  //   data.varName = varName;
  //   data.varFullExpress = SdeExpressRevolveManager.Inst.VarExpressResolver.CreateVarFullExpress_SysVar(varName); //拼接成系统变量的表达式 @(#@SysTimestampNow)
  //   data.varType = SdeVariableExpressSpace.EOpenVarPrefixType.kSysOpenVar;

  //   SPageMainController.Inst.SPageEvents.NoticeVariableValueChanged(data);
  // }

  /**
   * 手动触发启动-开始监听所有被注册监听的系统变量的变化
   *
   * @memberof SdeSystemOpenVariableCenter
   */
  public StartAllListenJobs() {

    // setTimeout(() => {

    //   this.PropStores.forEach(element => {
    //       if(element.beListened && element.isDynamic && element.cronJob != null) {
    //         element.cronJob.start();
    //       }
    //   });

    // }, 5000);

  }

  private Initialize() {
    this.StartRigister();
  }

  private GetStorePropInfo(selfComInstId: string, varName: string): SdeSystemOpenVarStoreItemStruct {
    let item = this.PropStores.filter((p) => p.varName === varName);
    if (item == null || item.length <= 0) { return null; }
    return item[0];
  }

  private RigistProp(varName: string, desc: string, getCB: (fromComInstId: string, s: SdeServerValueStruct) => SdeServerValueStruct, isDynamic: boolean): void {
    let querys = this.PropStores.filter((p) => p.varName === varName);
    if (querys != null && querys.length > 0) { return; }

    let storeItem = new SdeSystemOpenVarStoreItemStruct();
    storeItem.varName = varName;
    storeItem.UpdateValueMethod = getCB;
    storeItem.value.desc = desc;
    storeItem.value.propName = varName;
    storeItem.isDynamic = isDynamic;

    this.PropStores.push(storeItem);
    this.Props.push(storeItem.value);
  }


  private StartRigister() {
    // 当前时间戳 | 示例: 1593658763
    this.RigistProp('SysTimestampNow', '当前时间戳(秒)', (comInstId, s) => {
      s.value = TimeUtils.GetTimestampNow().toString();
      s.valueType = EValueType.kNumber;
      s.defaultValue = '0';
      return s;
    }, true);

    // 当前时间到秒 | 示例: 2018-12-08 18:30:01
    this.RigistProp('SysDateTimeStringNow', '完整的日期和时间(2018-12-08 18:30:01)', (comInstId, s) => {
      s.value = TimeUtils.GetDayTimeNow().toString();
      s.valueType = EValueType.kString;
      return s;
    }, true);


    // 当前年份 (数字类型) | 示例: 2019
    this.RigistProp('SysCurrentYear', '当前年份(示例:2019)', (comInstId, s) => {
      let Dates = new Date();
      let year: number = Dates.getFullYear();
      s.value = year.toString();
      s.valueType = EValueType.kNumber;
      return s;
    }, true);

    // 当前月份 (数字类型) | 示例: 3 (3月)
    this.RigistProp('SysCurrentMonth', '当前月份(示例:3)', (comInstId, s) => {
      let Dates = new Date();
      let month: any = Dates.getMonth() + 1;
      s.value = month.toString();
      s.valueType = EValueType.kNumber;
      return s;
    }, true);


    // 当前日 (数字类型) | 示例: 25
    this.RigistProp('SysCurrentDay', '当前日(示例:25)', (comInstId, s) => {
      let Dates = new Date();
      let day: any = Dates.getDate();
      s.value = day.toString();
      s.valueType = EValueType.kNumber;
      return s;
    }, true);


    // 调用组件的资源根目录,以/结尾
    this.RigistProp('FromComAssetBaseEndWithSlash', '调用组件的资源根目录,以斜杠结尾', (comInstId, s) => {
      s.value = SPageAssetsManagement.Inst.GetComAssetBasePath(comInstId);
      s.valueType = EValueType.kString;
      return s;
    }, true);


    // 调用页面内部的资源根目录,以/结尾
    this.RigistProp('FromCustomPageAssetDirWithSlash', '调用页面内部资源根目录,以斜杠结尾', (comInstId, s) => {
      s.value = SPageAssetsManagement.Inst.GetCustomPageDirBasePath(SPageMainController.Inst.PageInfoMng.PageId);
      s.valueType = EValueType.kString;
      return s;
    }, true);

  }

  // 遍历所有系统变量,如果标记是被监听,并且 job == null, 则要设置cron job, 默认job都不启动
  private CheckSysVarCronJob() {
    this.PropStores.forEach((element) => {
      if (element.isDynamic && element.beListened && element.TimerBoxId === '')  {

        // //每秒执行的系统变量
        // if(element.varName == "SysTimestampNow" ||
        //   element.varName == "SysDateTimeStringNow"
        // ) {

        //   //系统变量创建Cron Job
        //   element.TimerBoxId = SPageTimerManagement.Inst.ApplyTimerBox(
        //     SPageDefines.ETargetKind.kFramework,"SystemOpenVar_" + element.varName,"系统变量变更TimerJob",
        //       SPageTimerManagement.CreateCronHelper_GetEverySecond(),
        //       () => {
        //         let oldValue = element.value;
        //         let newValue = this.GetSysPropValue(element.varName);
        //         this.NoticeSysVarValueChanged(element.varName,oldValue,newValue);
        //       },
        //       null,false,false,this
        //     )

        // }

      }
    });

  }
}
