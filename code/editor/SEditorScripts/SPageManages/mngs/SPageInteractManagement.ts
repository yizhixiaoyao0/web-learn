import {
  ComInteractEventDataTargetInfo,
  ComInteractEventDataConfigBase,
  ComInteractEventDataConfigItem,
  EComInteractTriggerType,
  ComInteractDoBehaviorOptions,
  SMethodArgItem,
  SDEPageInfo,
} from '../../SCommonModelsGroup/ServerModel';
import SPageEventsManagement, {
  SPageComInterConditions,
  SPageVariableChangedEventData,
  SPageComInterVarDataInfo,
} from './SPageEventsManagement';
import SdeExpressRevolveManager from '../../SCommonModelsGroup/SdeExpression/SdeExpressRevolveManager';
import { SdeVariableExpressSpace, VarSentenceResolveOption } from '../../SCommonModelsGroup/SdeExpression/SdeVariableExpress';
import SdeSystemOpenVariableCenter from '../../SCommonModelsGroup/SystemOpenvar/SdeSystemOpenVariableCenter';
import SPageMainController from '../SPageMainController';
import SPageInfoElementsHelper from './SPageInfoElementsHelper';
import SPageSoloEventsManagement from './SPageSoloEventsManagement';
import GUIDHelper from '@/kernel/GUIDHelper';
import TimeUtils from '@/kernel/TimeUtils';

export enum EDoStatus {
  waiting = 0,
  end = 1,
}

export interface IRPageInteractConfig {
  Id: string; // guid 标识ID
  FromComInstId: string; // 配置来源的组件实例ID
  DoStatus: EDoStatus; // ( `等待执行`,`已执行`) 行为触发状态
  DoTotalCount: number; // 执行行为一共的次数
  LastDoTimestamp: number; // 上次触发的时间戳
  LastDoHasError: boolean; // 最后一次执行结果是否有错误
  LastDoErrorMsg: string; // 最后一次执行错误的信息

  DoOptions: ComInteractDoBehaviorOptions;
  GetConfigType(): number;
}

// 交互配置基类 (R表示Reset,指只存在于Page上的重新设计的交互配置数据类型)
export abstract class RPageInteractConfigBase {
  public Id: string = ''; // guid 标识ID
  public FromComInstId: string = ''; // 配置来源的组件实例ID
  public DoStatus: EDoStatus = EDoStatus.waiting; // ( `等待执行`,`已执行`) 行为触发状态
  public DoTotalCount: number = 0; // 执行行为一共的次数
  public LastDoTimestamp: number = 0; // 上次触发的时间戳
  public LastDoHasError: boolean = false; // 最后一次执行结果是否有错误
  public LastDoErrorMsg: string = ''; // 最后一次执行错误的信息
  public DoOptions: ComInteractDoBehaviorOptions = null;

  public InterEventDataItem: ComInteractEventDataConfigItem = null;

  constructor(fromComInstId: string) {
    this.Id = GUIDHelper.Create();
    this.FromComInstId = fromComInstId;
  }
}

// 表达式配置
export class RPageInteractConditionExpressConfig extends RPageInteractConfigBase
  implements IRPageInteractConfig {
  public CondExpress: string = ''; // 条件表达式
  public DoExpress: string = ''; // 行为表达式
  constructor(fromComInstId: string) {
    super(fromComInstId);
  }
  public GetConfigType(): number {
    return 0;
  }
}

// 按钮交互并触发执行方法
export class RPageInteractButtonClickToRunMethodConfig
  extends RPageInteractConfigBase
  implements IRPageInteractConfig {
  public BtnId: string = ''; // 按钮Id
  public target: ComInteractEventDataTargetInfo[] = []; // 目标配置
  constructor(fromComInstId: string) {
    super(fromComInstId);
  }
  public GetConfigType(): number {
    return 1;
  }
}

// 按钮交互并触发执行行为表达式
export class RPageInteractButtonClickToRunBehaviorExpressConfig
  extends RPageInteractConfigBase
  implements IRPageInteractConfig {
  public BtnId: string = ''; // 按钮Id
  public DoExpress: string = ''; // 行为表达式
  constructor(fromComInstId: string) {
    super(fromComInstId);
  }
  public GetConfigType(): number {
    return 2;
  }
}

export default class SPageInteractManagement {
  public static get Inst(): SPageInteractManagement {
    if (this._inst == null) {
      this._inst = new SPageInteractManagement();
    }
    return this._inst;
  }
  private static _inst: SPageInteractManagement;

  // 存储页面内所有组件进行梳理后的交互的配置
  private AllPageInteractConfigItems: IRPageInteractConfig[] = [];

  // 需要实时判断的条件表达式
  private AllPageInteractConditionExpresses: SPageComInterConditions[] = [];

  public Initialize(sinfo: SDEPageInfo) {
    // 通过数据库中所有数组的交互配置,来统一初始化交互配置
    if (sinfo != null) {
      sinfo.Coms.forEach((com) => {
        if (com.Com.ComBaseInteractConfig != null) {

          let cfgs = <ComInteractEventDataConfigBase> (
            com.Com.ComBaseInteractConfig
          );
          if (cfgs != null) {
            this.InitComConfig(com.ComInstId, cfgs);
          }
        }
      });
    }

    // 监听事件-交互条件表达式满足条件的事件-来处理回调
    SPageEventsManagement.Inst.SPageComInterConditionMeetedEvent.attach(
      this.OnPageInterConditionMeetedEventHandler,
    );

    /*
      监听变量变化事件-来处理回调
      实时判断,如果交互配置中的条件表达式满足时,
      满足条件的话,会通知  SPageEventsManagement.Inst.SPageComInterConditionMeetedEvent 事件
    */
    // SPageEventsManagement.Inst.SPageVariableChangedEvent.attach(this.OnSPageVariableChanged);
  }


  public InvokeOpenMethodsByInterConfig(comInstId: string, item: ComInteractEventDataConfigItem) {
    if (item == null) { return; }

    // 执行目标组件的方法
    if (item.targets != null && item.targets.length > 0) {

      // 是否按照顺序执行,每次执行一个方法
      // 如果配置了循环依次执行,此项记录下次执行的序号
      if (item.IsTargetInvokeByOrderAndCircle) {
        if (item.TargetNextInvokeTargetItemIndex >= item.targets.length) {
          item.TargetNextInvokeTargetItemIndex = 0;
        }
      }

      for (let index = 0; index < item.targets.length; index++) {
        const element = item.targets[index];

        // 是否按照顺序执行,每次执行一个方法
        if (item.IsTargetInvokeByOrderAndCircle) {
          if (index !== item.TargetNextInvokeTargetItemIndex) {
            continue;
          }
        }
        this.InvokeTargetMethod(comInstId, element);
      }

      // 记录下一次应该执行的方法序号
      if (item.IsTargetInvokeByOrderAndCircle) {
        item.TargetNextInvokeTargetItemIndex += 1;
        if (item.TargetNextInvokeTargetItemIndex >= item.targets.length) {
          item.TargetNextInvokeTargetItemIndex = 0;
        }
      }
    }
  }

  // 获取交互配置item
  public GetInterConfigItem(rConfigId: string): IRPageInteractConfig {
    let querys = this.AllPageInteractConfigItems.filter((p) => p.Id === rConfigId);
    if (querys == null || querys.length <= 0) { return null; }
    return querys[0];
  }

  public DoExpressOnly(selfComInstId: string, doExpressRaw: string): string {
    return SdeExpressRevolveManager.Inst.InvokeDoByBody(
      selfComInstId,
      doExpressRaw,
    );
  }

  // 根据数据库的组件交互配置,初始化到页面交互配置中
  private InitComConfig(
    ComInstId: string,
    configs: ComInteractEventDataConfigBase,
  ) {

    configs.items.forEach((element) => {
      this.InitComConfigItem(ComInstId, element);
    });
  }

  private InitComConfigItem(
    ComInstId: string,
    item: ComInteractEventDataConfigItem,
  ): void {

    if (item == null) { return; }
    if (item.Enable === false) { return; }

    // 如果是按钮触发
    if (item.TriggerType === EComInteractTriggerType.kElementButton) {


      setTimeout(() => {

        // 如果是按钮触发,则需要根据配置,在页面找出此组件的按钮元素 (这个初始化要确保在所有组件元素都渲染完成之后)
        // 找出按钮元素
        let btn = SPageInfoElementsHelper.Inst.GetPageElementById(ComInstId, item.TriggerButtonName);

        if (btn != null) {
          console.error('Btn Click AddEvent!' + item.TriggerButtonName);

          (<HTMLButtonElement> btn).addEventListener('click', () => {
            console.log('hahha', item);

            // 执行事件-执行行为表达式
            if (item.targetBehaviorExpress != null) {
              this.DoExpressOnly(ComInstId, item.targetBehaviorExpress);
            }

            this.InvokeOpenMethodsByInterConfig(ComInstId, item);

          });
        } else {
          console.error('找不到按钮,可能没有渲染成功!' + item.TriggerButtonName);
        }

      }, 2000);


    } else if (item.TriggerType === EComInteractTriggerType.kConditionExpress) {
      if (
        item.conditionExpress == null ||
        item.conditionExpress.trim() === ''
      ) {

        if (item.DoOptions.DoEndWaitTime <= 0) {
          console.error(
            'SPageInteractMng: 表达式内容为空,并且等待时间为0. InitComConfigItem Error - comInstId: ' + ComInstId,
          );
          return;
        } else {
          item.conditionExpress = 'true';
        }
      }

      let rconfig = new RPageInteractConditionExpressConfig(ComInstId);
      rconfig.CondExpress = item.conditionExpress;
      rconfig.DoExpress = item.targetBehaviorExpress != null ? item.targetBehaviorExpress : '';
      rconfig.DoOptions = item.DoOptions;
      rconfig.InterEventDataItem = item;

      // 添加到页面交互配置总数组
      this.AddInterConfigItem(rconfig);

      item.Id = rconfig.Id;

      /*
        注册条件表达式到事件-以便让Page层,统一处理和监视注册的表达式是否满足条件,
        满足条件的话,会通知  SPageEventsManagement.Inst.SPageComInterConditionMeetedEvent 事件
      */
      // TODO:
      this.RigisterPageInterConditionExpress(rconfig);
    } else if (item.TriggerType === EComInteractTriggerType.kSoloEvent) {

      // 注册事件监听
      SPageSoloEventsManagement.Inst.AttachEventFromCom(ComInstId, item);
    }

  }

  private InvokeTargetMethod(comInstId: string, element: ComInteractEventDataTargetInfo) {
    // 分别执行目标组件的方法
    let targetComInst: any = SPageMainController.Inst.PageInfoMng.GetComInst(
      element.TargetComInstId,
    );

    // 循环传入方法的参数,解析其中的变量表达式
    let ResolveOption = new VarSentenceResolveOption();
    ResolveOption.ResultStringVarExpWithDoubleQuotationMarks = false;



    let args: any[] = [];
    if (element.ArgsConfig.ArgCount > 0) {
      for (let index = 0; index < element.ArgsConfig.Args.length; index++) {
        let argCfg = element.ArgsConfig.Args[index];
        let argTypeNameLower = argCfg.ArgTypeName.toLowerCase();

        let valueSeted = argCfg.ValueSet;

        let valueType = 'any';
        let argValue: any = null;

        // 如果含有表达式,则将设置的值先进行转换
        if (argCfg.HasVarExpress) {
          valueSeted = SdeExpressRevolveManager.Inst.VarExpressResolver.ResolveAndReplaceSentense(comInstId, argCfg.ValueSet, ResolveOption);
        }

        if (argTypeNameLower === 'string' || argTypeNameLower === 'str') {
          valueType = 'string';
          argValue = '';
          if (argCfg.HasDefault) {
            argValue = (argCfg as SMethodArgItem<string>).DefaultValue;
          }


          try {
            argValue = valueSeted.toString();
          } catch (error) {
            console.error(error);
          }

        } else if (argTypeNameLower === 'boolean' || argTypeNameLower === 'bool') {
          valueType = 'boolean';
          argValue = false;
          if (argCfg.HasDefault) {
            argValue = (argCfg as SMethodArgItem<boolean>).DefaultValue;
          }

          try {
            argValue = Boolean(valueSeted);
          } catch (error) {
            console.error(error);
          }

        } else if (argTypeNameLower === 'number' || argTypeNameLower === 'int' || argTypeNameLower === 'float') {
          valueType = 'number';
          argValue = 0;
          if (argCfg.HasDefault) {
            argValue = (argCfg as SMethodArgItem<number>).DefaultValue;
          }

          try {
            argValue = Number(valueSeted);
          } catch (error) {
            console.error(error);
          }

        } else {
          valueType = 'any';
          argValue = null;
          if (argCfg.HasDefault) {
            argValue = (argCfg as SMethodArgItem<any>).DefaultValue;
          }

          try {
            if (argCfg.IsJsonObject) {
              let jobj = JSON.parse(valueSeted);
              if (jobj != null) {
                argValue = jobj;
              } else {
                argValue = valueSeted;
              }
            }
          } catch (error) {
            console.error(error);
          }

        }

        args.push(argValue);

      }
    }

    if (element.TargetMethodName != null && element.TargetMethodName.trim() !== '') {
      // 传入参数执行方法
      console.log('执行目标组件方法:' + element.TargetMethodName + ' 参数:' , args);
      try {
        targetComInst[element.TargetMethodName](...args);
      } catch (error) {
        console.error(error);
      }

    }


    /* 如果配置有调用事件,则发送事件 */
    if (element.TargetSoloEventName != null && element.TargetSoloEventName.trim() !== '') {
      SPageSoloEventsManagement.Inst.PostEventFromCom(comInstId, element.TargetComInstId, element.TargetSoloEventName, element.TargetSoloEventDataStr);
    }
  }



  // 添加到页面交互配置总数组
  private AddInterConfigItem(c: IRPageInteractConfig) {
    this.AllPageInteractConfigItems.push(c);
  }

  // 注册页面交互条件表达式-以便页面整体监听变量,并及时处理条件表达式
  /*
    - 如果通过监听变量形式,来触发条件表达式是否满足.
        - 如果这个条件表达式内,没有写任何变量,怎么办?
            - 那么在初始化,进行条件表达式分析时,如果发现没有任何变量, 那么就： `等待3秒发送满足条件事件,通知执行.`
        - 如何监听系统变量? 比如表达式 @(#@SysTimestampNow) % 2 == 0 , 当当前时间戳是偶数时：
            - 总不能每一个系统变量都要实时监听吧? 这样太费计算量了.
            - 统一注册到 `系统变量中心管理器 SdeSystemOpenVariableCenter` 统一处理
            - 这样, 监听中心根据哪一些系统变量需要监听,再根据对应的系统变量的性质,进行处理
            - 比如 @(#@SysTimestampNow) 这种,需要创建一个定时器,每一秒执行后,进行触发回调--->再进行系统变量更新事件的通知
  */
  private RigisterPageInterConditionExpress(
    rconfig: RPageInteractConditionExpressConfig,
  ) {
    if (
      rconfig == null ||
      rconfig.CondExpress == null ||
      rconfig.CondExpress.trim() === ''
    ) {
      return;
    }

    // 检查表达式中的变量表达式
    let varExpArr = SdeExpressRevolveManager.Inst.VarExpressResolver.FindVarBodyArr(
      rconfig.CondExpress,
    );

    // 如果不存在任何变量表达式,则直接执行条件,结果为是,则等待3秒后,通知执行事件
    // 这样的表达式,之后是不会被Page层继续实时监听的.
    // if(varExpArr == null || varExpArr.length <= 0) {
    // //执行执行条件,看结果为true还是false
    // let condResult = SdeFunctionUtils.InvokeCondition(rconfig.CondExpress);
    // if(condResult) {

    //   //1秒后立即执行
    //   // setTimeout(() => {
    //     this.DoExpress(null, rconfig.FromComInstId, rconfig.DoExpress,null);
    //   // }, 1000);

    // } else {
    //   //条件配置错误,这样的条件配置,是永远不被触发的
    //   console.error("SPageInteractMng:the Condition Config will never be executed!  ComInstId: " + rconfig.FromComInstId + " express: " + rconfig.CondExpress);
    // }
    // } else {
    // 解析数组

    let extData = new SPageComInterConditions();
    extData.ComInstId = rconfig.FromComInstId;
    extData.CondExpress = rconfig.CondExpress;
    extData.HasErr = false;
    extData.RConfigId = rconfig.Id;
    extData.Result = false;
    extData.VarExpressObjs = [];
    extData.InterEventDataItem = rconfig.InterEventDataItem;

    if (varExpArr != null && varExpArr.length > 0) {
      varExpArr.forEach((element) => {
        let item = new SPageComInterVarDataInfo();
        item.varFullExpress = element;
        item.NewValue = null;
        item.OldValue = null;

        extData.VarExpressObjs.push(item);
      });
    }

    // 记录了条件表达式
    this.AllPageInteractConditionExpresses.push(extData);

    setTimeout(() => {
      extData.StartTick();
    }, 2000);

    if (varExpArr != null && varExpArr.length > 0) {
      varExpArr.forEach((varExp) => {
        // 得到 ##comInstID&var  或者  #%var
        let expBody = SdeExpressRevolveManager.Inst.VarExpressResolver.GetVarExpressBody(
          varExp,
        );
        // 得到类型  自身属性/自身变量/组件变量/页面变量/系统变量
        let type = SdeExpressRevolveManager.Inst.VarExpressResolver.GetPrefixStringAndReturnType(
          expBody,
        );

        // 得到 comInstID&var 或者 var
        let varName = SdeExpressRevolveManager.Inst.VarExpressResolver.GetExpBodyVarName(
          expBody,
        );

        // 系统变量
        if (type === SdeVariableExpressSpace.EOpenVarPrefixType.kSysOpenVar) {
          // 注册到系统变量监听
          SdeSystemOpenVariableCenter.Inst.AddVarListener(varName);
        }
        // TODO?
        // else if (type == SdeVariableExpressSpace.EOpenVarPrefixType.) {
        // }
      });
    }
    // 如果变量中,含有系统变量--->通过系统变量管理器,注册并处理监听变化
    // 组件属性-->组件内部通过Data的监听,通知事件出来,进行触发组件属性的变化
    // 组件变量-->Page层,在 Set 组件变量处,进行触发
    // 页面变量-->Page层,在 Set 组件变量处,进行触发
    // varExp:  '@(#%var)', '@(##comInstID&var)'

    // 执行系统监听变量变更
    SdeSystemOpenVariableCenter.Inst.StartAllListenJobs();
  }

  // 处理回调-页面交互所有注册的条件表达式如果有满足-则通知到这里-并进行处理
  private OnPageInterConditionMeetedEventHandler(
    data: SPageComInterConditions,
  ): void {
    if (data.RConfigId == null || data.RConfigId === '') { return; }
    if (data.HasErr || data.Result === false) { return; }

    /* 获取交互配置 */
    let config = SPageInteractManagement.Inst.GetInterConfigItem(
      data.RConfigId,
    );
    if (config == null) { return; }

    /* 判断状态 */
    if (config.DoStatus === EDoStatus.end) { return; }

    /* 执行前设置config一些状态 */
    config.LastDoErrorMsg = '';
    config.LastDoHasError = false;
    config.LastDoTimestamp = TimeUtils.GetTimestampNow();
    config.DoTotalCount++;

    /* 开始执行 */
    config.DoStatus = EDoStatus.end; // 马上修改状态为执行过的状态,防止同时触发
    data.StopTick();

    /* 根据config中的配置类型转换为相应的类型 */
    let ctype = config.GetConfigType();
    // 处理表达式的配置
    if (ctype === 0) {
      let config0 = <RPageInteractConditionExpressConfig> config;

      let err = SPageInteractManagement.Inst.DoExpress(
        config0,
        config0.FromComInstId,
        config0.DoExpress,
        data,
      );

      if (err != null && err !== '') {
        config.LastDoErrorMsg = err;
        config.LastDoHasError = true;
      }
    } else if (ctype === 2) {
      let config2 = <RPageInteractButtonClickToRunBehaviorExpressConfig> config;

      let err = this.DoExpress(
        config2,
        config2.FromComInstId,
        config2.DoExpress,
        data,
      );

      if (err != null && err !== '') {
        config.LastDoErrorMsg = err;
        config.LastDoHasError = true;
      }
    } else if (ctype === 1) {
      let config1 = <RPageInteractButtonClickToRunMethodConfig> config;
      // TODO:
    }

    /* 执行后,以后扩展是否要自动重置等等 */
  }

  // 执行行为表达式
  // 返回Err信息,空字符串或者null表式成功
  private DoExpress(
    config: IRPageInteractConfig,
    comInstId: string,
    doExpressRaw: string,
    data: SPageComInterConditions,
  ): string {
    // 执行行为表达式
    let err = SdeExpressRevolveManager.Inst.InvokeDoByBody(
      comInstId,
      doExpressRaw,
    );

    // 根据配置,执行完是否等待, 和是否自动重置
    if (config != null && config.DoOptions != null) {
      // 如果自动重置
      if (config.DoOptions.DoEndAutoReset) {
        if (config.DoOptions.DoEndWaitTime > 0) {
          // 等待秒数
          setTimeout(() => {
            // 重置状态
            config.DoStatus = EDoStatus.waiting;
            data.StartTick();
          }, config.DoOptions.DoEndWaitTime * 1000);
        } else {
          // 重置状态
          config.DoStatus = EDoStatus.waiting;
          data.StartTick();
        }
      }
    }

    return err;
  }

  /* 处理当变量值改变时的回调 */
  private OnSPageVariableChanged(data: SPageVariableChangedEventData) {
    // 只管存储相关变量的值到对应的表达式中
    SPageInteractManagement.Inst.AllPageInteractConditionExpresses.forEach(
      (element) => {
        if (element.IsTicking) {
          return;
        }

        // 有一个特殊形况,如果此变量完整形式是: 自身属性或者自身变量,需要再次比较一下ComInstId
        if (
          data.varType ===
          SdeVariableExpressSpace.EOpenVarPrefixType.kComSelfOpenVar ||
          data.varType ===
          SdeVariableExpressSpace.EOpenVarPrefixType.kComSelfProperty
        ) {
          if (data.fromComInstId !== element.ComInstId) {
            return;
          }
        }

        // element.RecordVarValue(data);
      },
    );
  }
}
