import { ComDataProcessorConfig, SDEPageInfo, IComBaseDataConfig, ComDataQueryType, IComDataQueryTypeStruct, ComDataConfigApi, PageBaseComObject, TargetAttrData } from '../../SCommonModelsGroup/ServerModel';
import SPageDataMapperUtils from './SPageDataMapperUtils';
import SdeExpressRevolveManager from '../../SCommonModelsGroup/SdeExpression/SdeExpressRevolveManager';
import SPageTimerManagement from './SPageTimerManagement';
import { SPageDefines } from '../../SCommonModelsGroup/defines/PageDefines';
import SPageMainController from '../SPageMainController';
import SHttpUtils from '../../SCommonModelsGroup/utils/SHttpUtils';
import SdeDynamicClassUtils from '../../SCommonModelsGroup/utils/SdeDynamicClassUtils';
import { VarSentenceResolveOption } from '../../SCommonModelsGroup/SdeExpression/SdeVariableExpress';


export class ComDataProcessorPageData {
  public ComInstId: string = '';

  public ComDataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
  public DataConfig: IComDataQueryTypeStruct;
  public ApiConfig: ComDataConfigApi;

  // 请求数据的TimerBoxId
  public TimerBoxId: string = '';
  // 正在Tick
  public IsTicking: boolean = false;
  // 已经启动StartTick
  public IsStarting: boolean = false;
  public CronExpress: string = '';

  public ComData: any = null;
  public ComDataType: any;
  public ComDataClassName: string = '';


  public StartTick() {
    if (this.IsStarting)  {
      return;
    }
    if (this.TimerBoxId == null || this.TimerBoxId === '') {
        // 立即执行
        this.TimerBoxId = SPageTimerManagement.Inst.ApplyTimerBox(SPageDefines.ETargetKind.kCom, this.ComInstId, 'APIRequest', this.CronExpress, this.Tick, null, false, false, this);
    }

    console.log('=============== 001');

    this.ComDataClassName = SPageMainController.Inst.PageInfoMng.ComsMng.GetComRetuanDataClassTypeName(this.ComInstId);
    if (this.ComDataClassName != null && this.ComDataClassName !== '') {

    console.log('=============== 002', this.ComDataClassName);

    this.ComData = SdeDynamicClassUtils.Inst.CreateClassInstance(this.ComDataClassName);
    this.ComDataType = SdeDynamicClassUtils.Inst.GetClassType(this.ComDataClassName);
    }

    if (this.ComDataQueryType === ComDataQueryType.kApi) {
      this.ApiConfig = this.DataConfig as ComDataConfigApi;
    }

    SPageTimerManagement.Inst.StartJob(this.TimerBoxId);
    this.IsStarting = true;
  }

  public StopTick() {
    this.IsStarting = false;
    this.IsTicking = false;
    SPageTimerManagement.Inst.StopJob(this.TimerBoxId);
  }


  private Tick() {
    if (this.ComDataQueryType === ComDataQueryType.kStatic) { return; }
    if (this.DataConfig.TimeInterval <= 0) { return; }

    if (this.IsStarting === false) {
      return;
    }
    this.IsTicking = true;

    if (this.ComDataQueryType === ComDataQueryType.kApi) {

        console.log('222' , this.ApiConfig);
        if (this.ApiConfig.AutoUpdate === false) {
          return;
        }

        // console.log("哈哈哈TimerTick",this.CronExpress);
        if (this.ApiConfig.url == null || this.ApiConfig.url.trim() === '') {
          return;
        }

        let ResolveOption = new VarSentenceResolveOption();
        ResolveOption.ResultStringVarExpWithDoubleQuotationMarks = false;
        // 分析Url是否含有变量表达式:
        let url = SdeExpressRevolveManager.Inst.VarExpressResolver.ResolveAndReplaceSentense(this.ComInstId, this.ApiConfig.url, ResolveOption);

        // console.log("===========",url);
        if (this.ApiConfig.httpType === 'get') {
            // 获取API数据
            SHttpUtils.RequestByGet(this.ComInstId, url, '', null, true, null, null)
            .then((data) => {
              console.log('API获取数据啦 Get!' + url);
              let result = SPageDataProcessorFlowManagement.Inst.GetDataFromOrigin(this.ComDataType, this.ComInstId, data, this.DataConfig.DataProcessorConfig);

              // 设置SetData
              let com = SPageMainController.Inst.PageInfoMng.GetCom(this.ComInstId);
              let newData = SPageDataProcessorFlowManagement.Inst.SetDataByMapperRule(com.Com.Data, result, this.ComInstId, this.DataConfig.DataProcessorConfig);
              let comInst = SPageMainController.Inst.PageInfoMng.GetComInst(this.ComInstId);
              SPageMainController.Inst.PageInfoMng.ComsMng.SetDataToComInst(this.ComInstId, comInst, newData);

              console.log('处理完数据!');
              console.log(result);
            });
        } else  if ( this.ApiConfig.httpType === 'post') {

              let jsonstr = this.DataConfig.HttpPostJsonData; // string

              // 解析postData中含有的条件表达式
              let postDataResolveVariable = SdeExpressRevolveManager.Inst.VarExpressResolver.ResolveAndReplaceSentense(this.ComInstId, jsonstr, ResolveOption);

              let postData = {};
              try {
                postData = JSON.parse(postDataResolveVariable);
              } catch (error) {
                console.warn('转换post参数为json失败! url :' + url);
              }




              // 获取API数据
              SHttpUtils.RequestByPost(this.ComInstId, url, '', postData, null)
              .then((data) => {
                console.log('API获取数据啦! Post' + url);
                // console.log(data);
                let result = SPageDataProcessorFlowManagement.Inst.GetDataFromOrigin(this.ComDataType, this.ComInstId, data, this.DataConfig.DataProcessorConfig);
                // 设置SetData
                let com = SPageMainController.Inst.PageInfoMng.GetCom(this.ComInstId);
                console.log(com, result, 'com');

                let newData = SPageDataProcessorFlowManagement.Inst.SetDataByMapperRule(com.Com.Data, result, this.ComInstId, this.DataConfig.DataProcessorConfig);

                let comInst = SPageMainController.Inst.PageInfoMng.GetComInst(this.ComInstId);
                SPageMainController.Inst.PageInfoMng.ComsMng.SetDataToComInst(this.ComInstId, comInst, newData);

                console.log('处理完数据!');
                console.log(result);
              });
        }
    }


    this.IsTicking = false;
  }
}


export default class SPageDataProcessorFlowManagement {
  private static _inst: SPageDataProcessorFlowManagement;
  public static get Inst(): SPageDataProcessorFlowManagement {
    if (this._inst == null) {
      this._inst = new SPageDataProcessorFlowManagement();
    }
    return this._inst;
  }


  // 依据数据处理流程,通过原始数据,经过步骤,得到目标数据
  public GetDataFromOrigin<DEST>(createT: new() => DEST = null, selfComInstId: string, rawData: any, config: ComDataProcessorConfig): DEST {
    if (rawData == null) {  return null; }

    let data = rawData;
    // STEP2: `通过属性定义,获取目标原始数据`
    if (config.ResponseProp != null && config.ResponseProp.trim() !== '') {
        data = SPageDataMapperUtils.Inst.GetPropValueByLayer([config.ResponseProp], data);
        if (data == null) {
          return null;
        }
    }

    // STEP3: `处理数组原始数据,得到待处理数据对象`
    if (config.RawDataIsArr) {
      let varName: string = '_data';

      if (config.ListSourceProcessorFunction != null && config.ListSourceProcessorFunction.trim() !== '') {
        console.log(config.ListSourceProcessorFunction, 'config.ListSourceProcessorFunction');
        // 执行表达式,并返回处理对象
        let expResolveValue = SdeExpressRevolveManager.Inst.SdeExpressionResolver.ResolveDoExpressAndReturnValueWithOneArgFromObject(selfComInstId, data, config.ListSourceProcessorFunction, varName);
        if (expResolveValue == null) {
          return null;
        }
        data = expResolveValue;
      } else {
        // 如果没有配置,直接返回,不处理. 返回null;
        return null;
      }
    }

    // 创建返回的类型实例
    let ReturnData = new createT();

    // STEP4: `待处理对象,进行数据映射处理`
    if (config.ProcessorMapRulesToggle) {
      // 进行映射,从data映射到ReturnData
      ReturnData = SPageDataMapperUtils.Inst.ProduceDataFromObj(createT, data, selfComInstId, config.ProcessorMapRules, true);
    } else {
      return data as DEST;
    }
    console.log(ReturnData, 'ReturnData1');


    // STEP5: `处理目标源属性（与数据源无直接关联属性）`
    // if (config.SetTargetSourceDataToggle) {
    //   ReturnData = this.SetTargetAttrData(ReturnData, config.SetTargetAttrData);
    // } else {
    //   return data as DEST;
    // }
    // console.log(ReturnData, 'ReturnData')


    return ReturnData;
  }


  // 设置数据,通过数据映射规则
  public SetDataByMapperRule<T>(comData: T, fromData: T, selfComInstId: string, config: ComDataProcessorConfig): T {
    console.log(comData, 'comData', config.SetDataMapRulesToggle);
    if (config.SetDataMapRulesToggle) {
      comData = SPageDataMapperUtils.Inst.ProduceDataFromObjToExistDataStrick(fromData, comData, config.SetDataMapRules);
      return comData;
    } else {
      comData = SPageDataMapperUtils.Inst.ProduceDataFromObjToExistData(fromData, comData, selfComInstId, config.SetDataMapRules);
      return comData;
    }
  }


  public InitPageDataProcessor(sinfo: SDEPageInfo) {
    if (sinfo != null) {
      sinfo.Coms.forEach((com) => {
        if (com.Com.ComBaseDataConfig != null) {
            this.InitComDataProcessorConfig(com);
        }
      });
    }
  }

  private InitComDataProcessorConfig(com: PageBaseComObject) {
    let config = com.Com.ComBaseDataConfig;

    if (config.DataConfig.AutoUpdate === false || config.DataConfig.TimeInterval <= 0) {
      return;
    }
    // 如果是静态数据,不用处理
    if (config.DataQueryType === ComDataQueryType.kStatic) {
      return;
    }
    let comInfo = SPageMainController.Inst.PageInfoMng.ComPageDataMng.GetComPageData(com.ComInstId);
    comInfo.requestDataConfig.ComDataQueryType = config.DataQueryType ;
    comInfo.requestDataConfig.DataConfig = config.DataConfig;

    // 如果是API,则根据刷新频率,注册Timer,在Tick中获取API数据,并执行数据处理
    if (config.DataQueryType === ComDataQueryType.kApi) {

      let cron: string = SPageTimerManagement.CreateCronHelper_GetEverySecond();

      // 配置Cron
      if (config.DataConfig.TimeInterval < 60) {
        cron = '*/' + config.DataConfig.TimeInterval + ' * * * * *';
      } else {
        let minute = Math.floor(config.DataConfig.TimeInterval / 60);
        cron = '* */' + minute + ' * * * *';
      }

      // 设置Cron表达式
      comInfo.requestDataConfig.CronExpress = cron;
      comInfo.requestDataConfig.StartTick();
    }

    // 如果是Sql,待实现
  }

  // // API 设置目标属性数据
  // private SetTargetAttrData<Dest>(createDest: Dest, rules:TargetAttrData) : Dest {

  //   // let result:Dest = new createDest();
  //   return this.ProduceDataFromObjToExistData(createDest,rules);
  // }

  // private ProduceDataFromObjToExistData<From, Dest>(targetExistData:Dest, rules: TargetAttrData): Dest {
  //   let destKeys = Object.keys(targetExistData);
  //   rules.list.forEach((item) => {
  //     if (destKeys.includes(item.DestName)) {
  //       let data:any = '';

  //       try{
  //         data = typeof(<any>targetExistData)[item.DestName] !== "string" ? JSON.parse(item.DestValue) : item.DestValue;
  //       }catch{
  //         console.warn('转换目标属性设置数据失败！')
  //       }

  //       (<any>targetExistData)[item.DestName] = data;
  //     }
  //   });
  //   return targetExistData;
  // }

}
