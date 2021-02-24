/*** CsToTs工具自动生成 ***/
/* 工具版本: 1.0.0.20180818 */
/* 时间: 2019-11-20 10:11:20 */
/* 作者: 汪子文 */
/* 注意: 请勿手动修改此文件,如需修改要使用工具自动转换 */

import * as tsEvents from "ts-events";

    

export class ReceiveFromWebDataRaw {

    

    
    MethodName: string = "";
    
    Content: string = "";

}
    

export interface IUWProto {

    


}
    

export class SendToWebData<T extends IUWProto> {

    

    
    InstId: string = "";
    /** 
* MethodName和协议名称一致! uw_proto_system_scene_started
*/
    MethodName: string = "";
    /** 
* uw协议类型,继承于IUWProto
*/
    Data: T;

}
    

export class uw_proto_system_scene_started implements IUWProto {

    

    
    InstId: string = "";

}
    

export interface IWUProto {

    


}
    

export class wu_proto_system_scene_loadend implements IWUProto {

    

    
    InstId: string = "";

}
    

export class wu_proto_system_set_webunity_debug implements IWUProto {

    

    
    toggle: boolean = false;
    
    socketUrl: string = "";

}
    

export class wu_proto_system_set_keyboard_input implements IWUProto {

    

    
    toggle: boolean = false;

}
    
/* 页面方案信息 */
export class SDEPageInfo {

    

    
    SDEPageSetting: SDEPageSetting = new SDEPageSetting();
    
    Coms: Array<PageBaseComObject> = [];
    
    OpenVariableCollection: Array<SdeServerValueStruct> = [];
    
    EditorSetOption: EditorSetOption = new EditorSetOption();
    
    Id: string = "";
    
    Desc: string = "";
    
    PageTitle: string = "";
    
    CreateTimestamp: number = 0;

}
    
/* 页面方案设置项 */
export class SDEPageSetting {

    

    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();
    
    GlobalDataSetting: SDEPageGlobalDataSetting = new SDEPageGlobalDataSetting();

}
    
/* 通用配置组数据结构 */
export class ConfigStyleContent {

        AddGroup(group:ConfigStyleGroup) {    this.Groups.push(group);     }

    
    Groups: Array<ConfigStyleGroup> = [];

}
    
/* 通用样式配置组明细数据结构 */
export class ConfigStyleGroup {

    constructor(name:string = '',show:boolean = true) { 
  this.GroupName = name; 
  this.ShowGroupName = show;  
} 
    AddItem(item:ConfigStyleItem) {    this.Items.push(item);     }

    
    Items: Array<ConfigStyleItem> = [];
    
    ShowGroupName: boolean;
    
    GroupName: string = "";

}
    
/* 配置样式 通用数据结构 */
export class ConfigStyleItem {

         constructor(desc:string = '',type:ConfigStyleItemType = ConfigStyleItemType.kInputNormal,value:any = '',styleName:string = '',unitType:string = '',notice:boolean = false, noticeText:string = '') {  
   this.desc = desc; 
   this.type = type; 
   this.value = value; 
   this.styleName = styleName; 
    this.unitType = unitType; 
    this.notice = notice; 
    this.noticeText = noticeText; 
}

    
    desc: string = "";
    
    type: ConfigStyleItemType;
    
    selectOption: any;
    /** 
* 如果类型是Button,value为参数结构体对象json { name : 'test'} 
*/
    value: any;
    
    unitType: string = "";
    
    styleName: string = "";
    
    notice: boolean;
    
    noticeText: string = "";

}
    
/* 页面全局数据配置 */
export class SDEPageGlobalDataSetting {

    


}
    
/* <summary> 
页面组件实例类型  
Com:  根据组件类型，实例化不同的继承于BaseComObject的定义的组件类ComLayout：  根据组件类型，实例化不同的继承于PageComStyle的定义的组件样式类</summary> */
export class PageBaseComObject {

    

    /** 
* 页面内实例ID
*/
    ComInstId: string = "";
    /** 
* 组件实例
*/
    Com: BaseComObject;
    /** 
* 页面内组件布局
*/
    ComLayout: PageComStyle = new PageComStyle();
    /** 
* 页面内组件是否隐藏
*/
    PageComShow: boolean;
    /** 
* 页面内组件是否锁定
*/
    PageComLocked: boolean;
    /** 
* ComDataClassTypeName
*/
    ComDataClassTypeName: string = "";
    /** 
* 页面内组件归属组
*/
    GroupOfCom: PageGroupOfBaseComsObject = new PageGroupOfBaseComsObject();

}
    
/* 组件基类接口 */
export interface IBaseComObject {

    

    
    ComStyles: IComBaseStyle;

}
    
/* 组件的样式基类接口 */
export interface IComBaseStyle {

    

    
    InitWidth: number;
    
    InitHeight: number;
    
    ConfigStyleContent: ConfigStyleContent;

}
    
/* 组件数据库定义类 */
export class SqlBaseComObject {

    

    /** 
* 组件类型ID
*/
    ComID: string = "";
    /** 
* 组件名称(sde-normal-title)
*/
    ComName: string = "";
    /** 
* 组件版本(1.0.0)
*/
    Version: string = "";
    /** 
* npm名称(TextTitleNumberReverse01D1000V100
*/
    ComNpmName: string = "";
    /** 
* class类型名(TextTitleNumberReverse01D1000
*/
    ComClassName: string = "";
    /** 
* 组件标题
*/
    Title: string = "";
    /** 
* 开发状态
*/
    DevStatus: ESqlPageComDevStatus;
    /** 
* 发布状态
*/
    PublishStatus: ESqlPageComPublishStatus;
    /** 
* 主类型
*/
    TypeMain: string = "";
    /** 
* 子类型
*/
    TypeChild: string = "";
    /** 
* 设计代号
*/
    DesignCode: string = "";
    /** 
* 标签
*/
    Tags: string = "";
    /** 
* 说明
*/
    Remarks: string = "";
    /** 
* 新增时间
*/
    AddTimestamp: number = 0;
    /** 
* 修改时间
*/
    ModTimestamp: number = 0;
    /** 
* 开发者
*/
    DevelopMemberName: string = "";
    /** 
* 审核者
*/
    ApproveMemberName: string = "";
    /** 
* 缩略图
*/
    Pic: string = "";

}
    
/* 页面组件的基类 */
export abstract class BaseComObject extends SqlBaseComObject implements IBaseComObject {

    

    
    OpenVariableCollection: Array<SdeServerValueStruct> = [];
    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;
    /** 
* 页面组件中的额外扩展信息
*/
    ExtendsInfo: BaseComObjectExtendsInfo = new BaseComObjectExtendsInfo();

}
    
/* Sde值结构体的服务器定义 */
export class SdeServerValueStruct {

    

    
    desc: string = "";
    
    propName: string = "";
    
    valueType: EValueType;
    
    value: string = "";
    
    defaultValue: string = "";
    
    bindSelfPropertyName: string = "";
    
    IsPublicGet: boolean = true;
    
    IsPublicSet: boolean = false;

}
    
/* 组件的数据配置 */
export interface IComBaseDataConfig {

    

    /** 
* 数据获取途径
*/
    DataQueryType: ComDataQueryType;
    /** 
* 数据配置
*/
    DataConfig: IComDataQueryTypeStruct;

}
    
/* 所有数据获取的基础接口 */
export interface IComDataQueryTypeStruct {

    

    /** 
* 列表数据处理设置
*/
    DataProcessorConfig: ComDataProcessorConfig;
    /** 
* http请求的提交PostJson参数
*/
    HttpPostJsonData: string;
    /** 
* 是否自动刷新数据
*/
    AutoUpdate: boolean;
    /** 
* 刷新频率 (单位秒)
*/
    TimeInterval: number;

}
    
/* 数据处理设置 */
export class ComDataProcessorConfig {

    

    /** 
* 默认为空,返回格式的一级属性名比如res
*/
    ResponseProp: string = "";
    /** 
* 通过属性名读取后的原始数据是否是数组
*/
    RawDataIsArr: boolean = false;
    /** 
* 数组处理表达式,转换为待处理的对象
*/
    ListSourceProcessorFunction: string = "";
    /** 
* 启用-数据处理的数据映射规则
*/
    ProcessorMapRulesToggle: boolean = true;
    /** 
* 数据处理的数据映射规则
*/
    ProcessorMapRules: DataMapperRules = new DataMapperRules();
    /** 
* 启用-组件SetData时的数据映射规则
*/
    SetDataMapRulesToggle: boolean = false;
    /** 
* 组件SetData时的数据映射规则(启用表示必须按此匹配)
*/
    SetDataMapRules: DataMapperRules = new DataMapperRules();
    /** 
* 启用-组件 Set目标属性的数据
*/
    SetTargetSourceDataToggle: boolean = false;
    /** 
* 组件目标SetData
*/
    SetTargetAttrData: TargetAttrData = new TargetAttrData();

}
    

export class DataMapperRules {

    

    
    mapper: Array<DataMapperRuleItem> = [];

}
    

export class DataMapperRuleItem {

    

    /** 
* 数据源的属性名称,支持点语法
*/
    SourceName: string = "";
    /** 
* 目标对象的属性名称,支持点语法
*/
    DestName: string = "";
    /** 
* 如果Source对象是数组,并且这里>=0,要取得元素值去映射到Dest
*/
    ArrayIndex: number = -1;
    /** 
* 如果true,则将DestName当成变量表达式看待,进行设置公开变量或者其他组件的变量
*/
    IsSetToVariable: boolean = false;

}
    

export class TargetAttrData {

    

    
    list: Array<TargetAttrDataItem> = [];

}
    

export class TargetAttrDataItem {

    

    /** 
* 目标对象的属性名称,支持点语法
*/
    DestName: string = "";
    /** 
* 目标对象的属性值
*/
    DestValue: string = "";

}
    
/* 组件交互配置接口 */
export interface IComBaseInteractConfig {

    


}
    
/* 组件的数据格式泛型接口 */
export interface IComReturnDataStruct {

    


}
    
/* 页面组件中的额外扩展信息 */
export class BaseComObjectExtendsInfo {

    

    
    Title: string = "";
    
    Remarks: string = "";
    
    ComEnterAnimatorConfig: ComEnterStartAnimationConfig = new ComEnterStartAnimationConfig();
    
    SoloEventDefines: Array<SoloEventDefine> = [];

}
    
/* 组件入场动画配置 */
export class ComEnterStartAnimationConfig {

    

    /** 
* 入场动画开关
*/
    enable: boolean = true;
    /** 
* 是否淡入(默认是)
*/
    isFadeIn: boolean = true;
    /** 
* 时长
*/
    during: number = 1000;
    /** 
* easing方式(默认easeInExpo)
*/
    easingType: EAnimationEasingType = EAnimationEasingType.easeInExpo;
    /** 
* 入场前x偏移
*/
    translateX: number = 100;
    /** 
* 入场前y偏移
*/
    translateY: number = 0;
    /** 
* 旋转量
*/
    rotate: number = 0;
    /** 
* 是否随机演示()
*/
    isRandomDelay: boolean = true;
    /** 
* 随机延时最大值(0-max)
*/
    randomDelayMax: number = 1200;
    /** 
* 入场延时(毫秒)
*/
    delay: number = 0;

}
    

export class SoloEventDefine {

    

    /** 
* Page层控制初始化(生成GUID),默认存储任何值都不会有效
*/
    EventId: string = "";
    /** 
* 事件名称(单个对象内名称唯一)
*/
    EventName: string = "";
    /** 
* 生命类型
*/
    LifeType: ESoloEventLifeType = ESoloEventLifeType.kPermanent;
    /** 
* 启用
*/
    Enable: boolean = true;
    /** 
* 备注参考
*/
    Remarks: string = "";
    /** 
* 标记
*/
    Sign: string = "";

}
    
/* 组件在页面内的样式布局接口 */
export interface IPageComStyle {

    

    
    top: number;
    
    left: number;
    
    width: number;
    
    height: number;
    
    zindex: number;

}
    
/* 页面组件样式基类 */
export class PageComStyle implements IPageComStyle {

    

    
    top: number = 0;
    
    left: number = 0;
    
    width: number = 0;
    
    height: number = 0;
    
    zindex: number = 0;
    
    rotate: number = 0;
    
    opcity: number = 0;

}
    
/* 页面内实例组件归属组类型 */
export class PageGroupOfBaseComsObject {

    

    /** 
* 页面组件归属组Id
*/
    GroupId: string = "";
    /** 
* 页面组件归属组名称
*/
    GroupName: string = "";
    /** 
* 页面内组件布局
*/
    GroupLayout: PageComStyle = new PageComStyle();
    /** 
* 页面内组是否隐藏
*/
    PageGroupShow: boolean;
    /** 
* 页面内组是否锁定
*/
    PageGroupLocked: boolean;

}
    
/* 此页面编辑器状态时的控制选项 */
export class EditorSetOption {

    

    /** 
* 是否加载Unity3D
*/
    LoadUnity3D: boolean;

}
    
/* 下拉框设置 */
export class SelectionOption {

    

    
    value: string = "";
    
    label: string = "";

}
    
/* 组件元素信息结构体 */
export class ComElementInfo {

    

    
    id: string = "";
    
    canInteract: boolean = false;

}
    

export class SComPluginDefines {

        constructor() { this.defines =[{"id":"1000","group":"plug-echarts","name":"echarts","version":[{"ver":"4.2.0-rc2","types":[{"enumValue":1,"enumName":"k1000_pluge_charts_echarts_420rc2_min_js","type":"min","files":["echarts.min.js"]}]}]},{"id":"1001","group":"plug-echarts","name":"echarts-gl","version":[{"ver":"1.1.1","types":[{"enumValue":2,"enumName":"k1001_plug_echarts_echarts_gl_111_min_js","type":"min","files":["echarts-gl.min.js"]}]}]},{"id":"1002","group":"plug-unity","name":"unity","version":[{"ver":"2018","types":[{"enumValue":3,"enumName":"k1002_plug_unity_unity_2018_normal_unityloader_js","type":"normal","files":["UnityLoader.js"]}]}]},{"id":"1003","group":"plug-echarts","name":"plugs","version":[{"ver":"maps","types":[{"enumValue":4,"enumName":"k1003_pluge_charts_maps_world_js","type":"","files":["world.js"]}]}]},{"id":"1004","group":"plug-ui","name":"iview","version":[{"ver":"1.0.1","types":[{"enumValue":5,"enumName":"k1004_plug_ui_iview_min_js","type":"","files":[]}]}]},{"id":"1005","group":"plug-echarts","name":"echarts-liquidfill","version":[{"ver":"2.0.5","types":[{"enumValue":6,"enumName":"k1005_plug_echarts_echarts_liquidfill_js","type":"","files":["echarts-liquidfill.js"]}]}]}]}

    
    defines: Array<STool_PluginItem> = [];

}
    

export class STool_PluginItem {

    

    
    id: string = "";
    
    group: string = "";
    
    name: string = "";
    
    version: Array<STool_PluginItemVer> = [];

}
    

export class STool_PluginItemVer {

    

    
    ver: string = "";
    
    types: Array<STool_PluginItemVerTypeObj> = [];

}
    

export class STool_PluginItemVerTypeObj {

    

    
    enumValue: number = 0;
    
    enumName: string = "";
    
    type: string = "";
    
    files: Array<string> = [];

}
    

export class ComTypesDefines {

        constructor() { this.defines =[  {    "group": "demo",    "title": "默认",    "childs": [      {        "type": "base",        "title": "默认"      },      {        "type": "chart",        "title": "图表"      },      {        "type": "media",        "title": "媒体"      },      {        "type": "button",        "title": "按钮"      },      {        "type": "effect",        "title": "特效"      },      {        "type": "3d",        "title": "3D"      },      {        "type": "divitem",        "title": "Div元素"      },      {        "type": "unreal",        "title": "虚幻3D"      }    ]  },  {    "group": "charts",    "title": "图表",    "childs": [      {        "type": "bar",        "title": "柱状图"      },      {        "type": "radar",        "title": "雷达图"      },      {        "type": "line",        "title": "折线图"      },      {        "type": "pie",        "title": "饼图"      },      {        "type": "gagued",        "title": "仪表盘"      },			{				"type": "map",				"title": "地图"			},			{				"type": "liquidfill",				"title": "液体填充图表"			}    ]  },  {    "group": "data",    "title": "数据",    "childs": [      {        "type": "table",        "title": "表格"      },      {        "type": "tag",        "title": "标签"      },      {        "type": "progress",        "title": "进度条"      }    ]  },  {    "group": "normal",    "title": "其他",    "childs": [      {        "type": "base",        "title": "默认"      },      {        "type": "text",        "title": "文字"      }    ]  },   {    "group": "iview",    "title": "IView",    "childs": [      {        "type": "base",        "title": "默认"      }    ]  },]}

    
    defines: Array<ComTypeItem> = [];

}
    

export class ComTypeItem {

    

    
    group: string = "";
    
    title: string = "";
    
    childs: Array<ComTypeChildItem> = [];

}
    

export class ComTypeChildItem {

    

    
    type: string = "";
    
    title: string = "";

}
    

export class ComOpenMethodInfo {

    

    
    Name: string = "";
    
    Desc: string = "";
    
    ArgsConfig: SMethodArgsConfig = new SMethodArgsConfig();

}
    
/* 方法的参数配置 */
export class SMethodArgsConfig {

    
    constructor(count?:number,args?:Array<ISMethodArgItem>) {
        if(count) {
            this.ArgCount = count;
        }
        if(args) {
            this.Args = args;
        }
    }
 

    /** 
* 参数个数
*/
    ArgCount: number = 0;
    
    Args: Array<ISMethodArgItem> = [];

}
    

export interface ISMethodArgItem {

    

    /** 
* 变量类型名称
*/
    ArgTypeName: string;
    /** 
* 变量名称
*/
    ArgVarName: string;
    /** 
* 是否有默认值
*/
    HasDefault: boolean;
    /** 
* 描述
*/
    Desc: string;
    /** 
* 是否为JSON对象
*/
    IsJsonObject: boolean;
    /** 
* 配置中设置的值
*/
    ValueSet: string;
    /** 
* 是否含有变量表达式
*/
    HasVarExpress: boolean;

}
    

export abstract class ComDataQueryTypeStructBase implements IComDataQueryTypeStruct {

    

    
    AutoUpdate: boolean = false;
    
    TimeInterval: number = 1;
    
    DataProcessorConfig: ComDataProcessorConfig = new ComDataProcessorConfig();
    
    HttpPostJsonData: string = "";

}
    
/* 静态数据配置基类 */
export class ComDataConfigStatic extends ComDataQueryTypeStructBase {

    

    
    StaticData: string = "";

}
    
/* Api数据配置基类 */
export class ComDataConfigApi extends ComDataQueryTypeStructBase {

    

    
    httpType: string = "";
    /** 
* URL 支持变量表达式
*/
    url: string = "";

}
    
/* Api POST 数据配置基类 */
export class ComDataPostConfigApi extends ComDataConfigApi {

    

    
    ConnectString: string = "";
    /** 
* sql 语句
*/
    Sql: string = "";

}
    
/* Mysql请求配置基类 */
export class ComDataConfigMysql extends ComDataQueryTypeStructBase {

    

    
    serverName: string = "";
    
    sql: string = "";

}
    
/* 组件实例内部定义的事件名称 */
export class ComInstEventDefine {

    

    
    EventName: string = "";

}
    
/* 组件事件数据(用于组件向页面传递事件) */
export class ComEventData {

    

    /** 
* 组件实例ID
*/
    SenderComInstId: string = "";
    
    EventType: ComEventType;
    
    Content: string = "";
    
    EventName: string = "";

}
    
/* 组件交互事件的配置 */
export class ComInteractEventDataConfigBase implements IComBaseInteractConfig {

    

    
    items: Array<ComInteractEventDataConfigItem> = [];

}
    

export class ComInteractEventDataConfigItem {

    

    
    EventTriggerCfg: SoloEventTriggerStructCfg = new SoloEventTriggerStructCfg();
    
    Id: string = "";
    /** 
* 是否启用
*/
    Enable: boolean = true;
    
    TriggerType: EComInteractTriggerType;
    
    TriggerButtonName: string = "";
    
    conditionExpress: string = "";
    
    targets: Array<ComInteractEventDataTargetInfo> = [];
    
    targetBehaviorExpress: string = "";
    
    DoOptions: ComInteractDoBehaviorOptions = new ComInteractDoBehaviorOptions();
    /** 
* 目标方法是否循环依次执行(每次执行一个方法)
*/
    IsTargetInvokeByOrderAndCircle: boolean = false;
    /** 
* 如果配置了循环依次执行,此项记录下次执行的序号
*/
    TargetNextInvokeTargetItemIndex: number = 0;

}
    

export class SoloEventTriggerStructCfg {

    

    
    TargetType: number = 0;
    
    TargetEventName: string = "";
    
    TargetComInstId: string = "";
    
    Enable: boolean = true;

}
    

export class ComInteractEventDataTargetInfo {

    

    /** 
* 目标方法配置项序号
*/
    OrderIndex: number = 0;
    
    TargetComInstId: string = "";
    
    TargetComName: string = "";
    
    TargetMethodName: string = "";
    
    ArgsConfig: SMethodArgsConfig = new SMethodArgsConfig();
    
    TargetSoloEventName: string = "";
    
    TargetSoloEventDataStr: string = "";

}
    

export class ComInteractDoBehaviorOptions {

    

    
    DoEndWaitTime: number = 0;
    
    DoEndAutoReset: boolean = false;

}
    
/* 单个参数配置 T是Web用类型 */
export class SMethodArgItem<T> implements ISMethodArgItem {

    
    constructor(Desc?:string,ArgTypeName?:string,ArgVarName?:string,HasDefault?:boolean,DefaultValue?:T,IsJsonObject?:boolean){
            if(Desc) this.Desc = Desc;
            if(ArgTypeName) this.ArgTypeName = ArgTypeName;
            if(ArgVarName) this.ArgVarName = ArgVarName;
            if(HasDefault) this.HasDefault = HasDefault;
            if(DefaultValue) this.DefaultValue = DefaultValue;
            if(IsJsonObject) this.IsJsonObject = IsJsonObject;
    }
    

    /** 
* 变量类型名称
*/
    ArgTypeName: string = "";
    /** 
* 变量名称
*/
    ArgVarName: string = "";
    /** 
* 是否有默认值
*/
    HasDefault: boolean = false;
    /** 
* 配置中设置的值
*/
    ValueSet: string = "";
    /** 
* 值
*/
    Value: T;
    /** 
* 是否含有变量表达式
*/
    HasVarExpress: boolean = false;
    /** 
* 默认值
*/
    DefaultValue: T;
    /** 
* 描述
*/
    Desc: string = "";
    /** 
* 是否为JSON对象
*/
    IsJsonObject: boolean = false;

}
    

export class STool_ComDefine {

    

    
    Title: string = "";
    
    TypeMain: string = "";
    
    TypeChild: string = "";
    
    DesignCode: string = "";
    
    Tags: Array<string> = [];
    
    Remarks: string = "";
    
    ConfigDate: string = "";

}
    

export class STool_ProjectComPackages {

    

    
    type: string = "";
    
    desc: string = "";
    
    list: Array<string> = [];

}
    

export class STool_ProjectComs {

    

    
    SelectType: string = "";
    
    ConfigData: Array<STool_ProjectComPackages> = [];

}
    

export class STool_ComInfo {

    

    
    ComDefine: STool_ComDefine = new STool_ComDefine();
    
    classLowerWithMiddleLine: string = "";
    
    versionLowerWithMiddleLine: string = "";
    
    versionUpper: string = "";
    
    versionLowerWithPointStartWithV: string = "";
    
    versionLowerWithPointNoV: string = "";
    
    classUpper: string = "";
    
    npmFullNameLowerWithMiddleLine: string = "";
    
    npmPageElementLowerName: string = "";
    
    fullNameUpper: string = "";

}
    

export class STool_DesignRecordItem {

    

    
    id: number = 0;
    
    desc: string = "";
    
    preview_path: string = "";
    
    proj_desc: string = "";
    
    proj_number: string = "";
    
    create_date: string = "";

}
    
/* 组件vue实现的基础接口 */
export interface IComVueBase {

    

    /** 
* 组件事件
*/
    ComEvents: tsEvents.SyncEvent<ComEventData>;

    /** 
* 初始化组件样式数据结构
*/
    InitComStyleContent(width: string, height: string) : ConfigStyleContent;
    /** 
* 获取初始数据
*/
    GetInitData() : IComReturnDataStruct;
    /** 
* 设置数据
*/
    SetData(value: IComReturnDataStruct, options: any) : boolean;
    /** 
* 设置样式
*/
    SetStyle(style: ConfigStyleContent) : boolean;
    /** 
* 转换为组件数据实例
*/
    TransferReturnDataFromStr(value: string) : IComReturnDataStruct;
    /** 
* 运行启动动画
*/
    RunEntryAnimation(id: string) : void;
    
    StartLoopAnimation(id: string) : void;
    
    StopLoopAnimation(id: string) : void;
    /** 
* 开始运行
*/
    Start(id: string) : void;
    /** 
* 编辑器按钮触发方法arg基础结构为{"name":"test"}
*/
    OnEditorClickButton(arg: string) : void;
    /** 
* 获取页面初始化时依赖的外部JS路径列表
*/
    GetPageReadyLoadJSPluginNames() : Array<ESComPlugins>;
    /** 
* 页面调用,得到所有可交互元素的数组
*/
    GetInteractElements() : Array<ComElementInfo>;
    /** 
* 页面调用,得到组件所有开放的方法
*/
    GetInteractOpenMethods() : Array<ComOpenMethodInfo>;
    /** 
* 获取组件数据格式的属性名列表
*/
    GetComDataClassPropertyNames() : Array<string>;
    /** 
* 获取组件内部定义的事件名称
*/
    GetComInstEventDefineList() : Array<ComInstEventDefine>;
    /** 
* 组件继承的基类类型
*/
    GetComInstBaseClassType() : EComInstBaseClassType;
}
    

export class setChartsBarHor003List {

    

    
    name: string = "";
    
    value: number = 0;
    
    total: number = 0;

}
    
/* 页面组件的基类 */
export class PageCom_ChartGaguedDatadistributionD1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartGaguedDatadistributionD1100 implements IComBaseStyle {

    

    
    InitWidth: number = 819;
    
    InitHeight: number = 245;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartGaguedDatadistributionD1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartGaguedDatadistributionD1100 implements IComReturnDataStruct {

    

    
    items: Array<data> = [{"totalTopic":"内存","totalValue":[{"id":"1","value":"6"},{"id":"2","value":"11"},{"id":"3","value":"14"},{"id":"4","value":"18"},{"id":"5","value":"13"},{"id":"6","value":"20"},{"id":"7","value":"8"},{"id":"8","value":"10"}]},{"totalTopic":"CPU","totalValue":[{"id":"1","value":"4"},{"id":"2","value":"15"},{"id":"3","value":"4"},{"id":"4","value":"20"},{"id":"5","value":"13"},{"id":"6","value":"15"},{"id":"7","value":"20"},{"id":"8","value":"9"}]}];

}
    

export class data {

    

    
    totalTopic: string = "";
    
    totalValue: Array<dataItem> = [];

}
    

export class dataItem {

    

    
    id: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarAveragebar001D1300 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarAveragebar001D1300 implements IComBaseStyle {

    

    
    InitWidth: number = 443;
    
    InitHeight: number = 885;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarAveragebar001D1300 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarAveragebar001D1300 implements IComReturnDataStruct {

    

    
    BarList: Array<ComReturnDataStruct_ChartsBarAveragebar001D1300Item> = [];
    
    Average: number = 0;
    
    Title: string = "";

}
    

export class ComReturnDataStruct_ChartsBarAveragebar001D1300Item {

    

    
    Key: string = "";
    
    Value: number = 0;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarBevelfillbar001D1300 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarBevelfillbar001D1300 implements IComBaseStyle {

    

    
    InitWidth: number = 409;
    
    InitHeight: number = 183;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarBevelfillbar001D1300 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarBevelfillbar001D1300 implements IComReturnDataStruct {

    

    
    liveData001Items: Array<BevelFillBar001Item> = [{"name":"Jan","value":1440},{"name":"Feb","value":1020},{"name":"Mar","value":1180},{"name":"Apr","value":960},{"name":"May","value":260},{"name":"Jun","value":990},{"name":"Jul","value":1020},{"name":"Aug","value":1000},{"name":"Sep","value":940},{"name":"Oct","value":980},{"name":"Now","value":240},{"name":"Dec","value":1180}];
    
    bevelFillBar001Title: string = "历史耗电量统计（t/小时）";

}
    

export class BevelFillBar001Item {

    

    
    name: string = "";
    
    value: number = 0;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarBevelhorizontal001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarBevelhorizontal001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarBevelhorizontal001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarBevelhorizontal001D1100 implements IComReturnDataStruct {

    

    
    items: Array<ChartsBarBevelhorizontalItem> = [{"name":"规则条目01","value":"1460300","sequence":"01"},{"name":"规则条目02","value":"1460300","sequence":"01"},{"name":"规则条目03","value":"1460300","sequence":"01"},{"name":"规则条目04","value":"1460300","sequence":"01"},{"name":"规则条目05","value":"1460300","sequence":"01"}];
    
    sumNumber: string = "1680000";

}
    

export class ChartsBarBevelhorizontalItem {

    

    
    name: string = "";
    
    value: string = "";
    
    sequence: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarBgvertical001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarBgvertical001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 850;
    
    InitHeight: number = 350;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarBgvertical001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarBgvertical001D1100 implements IComReturnDataStruct {

    

    
    items: Array<ChartsBarBgverticalItem> = [{"name":"VDC1","value":"88"},{"name":"VDC2","value":"76"},{"name":"VDC3","value":"71"},{"name":"VDC4","value":"64"},{"name":"VDC5","value":"58"},{"name":"VDC6","value":"50"},{"name":"VDC7","value":"45"},{"name":"VDC8","value":"37"},{"name":"VDC9","value":"23"},{"name":"VDC10","value":"20"}];
    
    sumNumber: string = "100";

}
    

export class ChartsBarBgverticalItem {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarCoordinateaxisD1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarCoordinateaxisD1100 implements IComBaseStyle {

    

    
    InitWidth: number = 832;
    
    InitHeight: number = 256;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarCoordinateaxisD1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarCoordinateaxisD1100 implements IComReturnDataStruct {

    

    
    chartLineDatas: Array<ChartsBarCoordinateaxisDItem> = [{"name": "06-15", "value": [12,13,14,15,14,13,12,11]},{"name": "06-16", "value": [10,9,8,7,8,9,10,11]},{"name": "06-17", "value": [10,9,8,7,8,9,10,11]},{"name": "06-18", "value": [10,9,8,7,8,9,10,11]},{"name": "06-19", "value": [10,9,8,7,8,9,10,11]}];
    
    title: string = "CPU";
    
    theme: string = "资源池分配趋势";

}
    

export class ChartsBarCoordinateaxisDItem {

    

    
    name: string = "";
    
    value: Array<number> = [];

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarDatacontrastbar001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarDatacontrastbar001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 618;
    
    InitHeight: number = 183;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarDatacontrastbar001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarDatacontrastbar001D1400 implements IComReturnDataStruct {

    

    
    itemList: Array<ChartsBarDataContrastItem> = [{"name":"浦东","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"黄埔","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"徐汇","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"长宁","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"静安","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"普陀","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"虹口","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"杨浦","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"闵行","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"宝山","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"嘉定","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"金山","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"松江","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"青浦","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"奉贤","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"崇明","value1":50,"prevValue1":54,"value2":42,"prevValue2":38},{"name":"其他单位","value1":50,"prevValue1":54,"value2":42,"prevValue2":38}];

}
    

export class ChartsBarDataContrastItem {

    

    
    name: string = "";
    
    value1: number = 0;
    
    prevValue1: number = 0;
    
    value2: number = 0;
    
    prevValue2: number = 0;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarGradualkeys001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarGradualkeys001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 833;
    
    InitHeight: number = 264;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarGradualkeys001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarGradualkeys001D1100 implements IComReturnDataStruct {

    

    
    label1: Array<number> = [15,10,15,15,10,15,15,10,15,15,10,15,15,10,15,15,10,15,15,10,15,15,10,15];
    
    label02: Array<number> = [15,10,15,15,10,15,15,10,15,15,10,15,15,10,15,15,10,15,15,10,15,15,10,15];
    
    BarData: Array<ChartsBarGradualkeysItem> = [{"name": "发送", "value":58 },{"name": "接收", "value":75}];

}
    

export class ChartsBarGradualkeysItem {

    

    
    name: string = "";
    
    value: number = 0;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarHorizontal001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarHorizontal001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 415;
    
    InitHeight: number = 282;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarHorizontal001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarHorizontal001D1100 implements IComReturnDataStruct {

    

    
    dataList: Array<ComReturnDataStruct_ChartsBarHorizontal001D1100_Item> = [{"value":102,"desc":"192.168.114.68"},{"value":98,"desc":"192.168.114.69"},{"value":59,"desc":"192.168.114.189"},{"value":45,"desc":"192.168.114.195"},{"value":23,"desc":"192.168.114.39"}];
    
    maxValue: number = 150;

}
    

export class ComReturnDataStruct_ChartsBarHorizontal001D1100_Item {

    

    
    value: number = 0;
    
    desc: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarHorizontal002D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarHorizontal002D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 400;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarHorizontal002D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarHorizontal002D1100 implements IComReturnDataStruct {

    

    
    items: Array<ChartsBarHorizontalItem> = [{"name":"拒绝服务","value":"1132"},{"name":"后门攻击","value":"960"},{"name":"漏洞攻击","value":"805"},{"name":"网络扫描窃听","value":"798"},{"name":"网络钓鱼","value":"621"},{"name":"干扰","value":"589"},{"name":"其他","value":"353"}];
    
    maxValue: number = 1500;

}
    

export class ChartsBarHorizontalItem {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarHorizontal003D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarHorizontal003D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 422;
    
    InitHeight: number = 221;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarHorizontal003D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarHorizontal003D1100 implements IComReturnDataStruct {

    

    
    items: Array<setChartsBarHor003List> = [{"name":"空调","value":6289, "total":29570},{"name":"照明","value":9173, "total":29570},{"name":"消防","value":7285, "total":29570},{"name":"医疗","value":6823, "total":29570}];

}
    
/* 页面组件的基类 */
export class PageCom_ChartsBarRadiusgradual001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsBarRadiusgradual001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 738;
    
    InitHeight: number = 197;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsBarRadiusgradual001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsBarRadiusgradual001D1100 implements IComReturnDataStruct {

    

    
    items: Array<ChartsBarRadiusgradualItem> = [{"name":"VDC1","value":"39"},{"name":"VDC2","value":"35"},{"name":"VDC3","value":"32"},{"name":"VDC4","value":"29"},{"name":"VDC5","value":"27"},{"name":"VDC6","value":"24"},{"name":"VDC7","value":"19"},{"name":"VDC8","value":"17"},{"name":"VDC9","value":"15"},{"name":"VDC10","value":"13"}];
    
    totleNum: string = "50";

}
    

export class ChartsBarRadiusgradualItem {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedAdjacenthalfcirclegagued001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedAdjacenthalfcirclegagued001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 336;
    
    InitHeight: number = 240;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedAdjacenthalfcirclegagued001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedAdjacenthalfcirclegagued001D1400 implements IComReturnDataStruct {

    

    
    FirstTitle: string = "工作人员";
    
    FirstValue: number = 421;
    
    FirstTotal: number = 500;
    
    SecondTitle: string = "观众";
    
    SecondValue: number = 4233;
    
    SecondTotal: number = 5000;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedAnimegagued002D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedAnimegagued002D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 236;
    
    InitHeight: number = 236;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedAnimegagued002D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedAnimegagued002D1100 implements IComReturnDataStruct {

    

    
    item: ChartsGaguedAnimegaguedItem = new ChartsGaguedAnimegaguedItem();

}
    

export class ChartsGaguedAnimegaguedItem {

    

    
    totalNum: number = 100;
    
    hitNum: number = 8.4;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedAnimegagued003D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedAnimegagued003D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 138;
    
    InitHeight: number = 132;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedAnimegagued003D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedAnimegagued003D1100 implements IComReturnDataStruct {

    

    
    responseValue: string = "响应时间";
    
    responseNum: string = "1ms";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedBasegagued001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedBasegagued001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 128;
    
    InitHeight: number = 139;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedBasegagued001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedBasegagued001D1400 implements IComReturnDataStruct {

    

    
    baseGagued001Title: string = "交通指数";
    
    baseGagued001Value: number = 3.2;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedBasegagued002D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedBasegagued002D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 154;
    
    InitHeight: number = 162;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedBasegagued002D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedBasegagued002D1400 implements IComReturnDataStruct {

    

    
    baseGagued002Title: string = "交通指数";
    
    baseGagued002Value: number = 3.4;
    
    baseGagued002Total: number = 10;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedCalibrationdashboard001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedCalibrationdashboard001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 239;
    
    InitHeight: number = 155;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedCalibrationdashboard001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedCalibrationdashboard001D1100 implements IComReturnDataStruct {

    

    
    setNum: number = 5.4;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedColorgagued001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedColorgagued001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 149;
    
    InitHeight: number = 159;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedColorgagued001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedColorgagued001D1400 implements IComReturnDataStruct {

    

    
    GaguedColor001Value: number = 4561;
    
    GaguedColor001MaxValue: number = 4561;
    
    GaguedColor001Title: string = "交通事故";
    
    GaguedColor001Day: string = "今日";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedColorgagued002D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedColorgagued002D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 152;
    
    InitHeight: number = 131;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedColorgagued002D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedColorgagued002D1400 implements IComReturnDataStruct {

    

    
    Title: string = "交通情况";
    
    SubTitle: string = "拥堵率";
    
    Value: number = 32.4;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedGagued001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedGagued001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedGagued001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedGagued001D1100 implements IComReturnDataStruct {

    

    
    item: ChartsGaugeGauge001D1100Item = new ChartsGaugeGauge001D1100Item();

}
    

export class ChartsGaugeGauge001D1100Item {

    

    
    totalNum: number = 2538685;
    
    hitNum: number = 2538685;
    
    title: string = "命中率";
    
    hitName: string = "命中次数";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedGagued002D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedGagued002D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 305;
    
    InitHeight: number = 174;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedGagued002D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedGagued002D1100 implements IComReturnDataStruct {

    

    
    item: Array<ChartsGaguedGaguedItem> = [{"name":"开机","value":"18"},{"name":"关机","value":"3"},{"name":"故障","value":"1"}];

}
    

export class ChartsGaguedGaguedItem {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedRingprogressbar001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedRingprogressbar001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 185;
    
    InitHeight: number = 147;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedRingprogressbar001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedRingprogressbar001D1400 implements IComReturnDataStruct {

    

    
    PieBasefill001Title: string = "环比上月";
    
    PieBasefill001Value: number = -10;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedScalegagued001D1300 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedScalegagued001D1300 implements IComBaseStyle {

    

    
    InitWidth: number = 90;
    
    InitHeight: number = 90;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedScalegagued001D1300 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedScalegagued001D1300 implements IComReturnDataStruct {

    

    
    chartsPieHor002Vaule: number = 60.40;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsGaguedSplicinggagued001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsGaguedSplicinggagued001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 305;
    
    InitHeight: number = 174;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsGaguedSplicinggagued001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsGaguedSplicinggagued001D1100 implements IComReturnDataStruct {

    

    
    items: Array<ChartsGaguedSplicinggaguedItem> = [{"name":"可用","value":"47"},];
    
    allNum: number = 89;

}
    

export class ChartsGaguedSplicinggaguedItem {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsLineBgline001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsLineBgline001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 365;
    
    InitHeight: number = 234;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsLineBgline001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsLineBgline001D1400 implements IComReturnDataStruct {

    

    
    Items: Array<setLineBgLine001Item> = [{"month":"09","value":"10"},{"month":"10","value":"06"},{"month":"11","value":"18"},{"month":"12","value":"15"},{"month":"01","value":"03"},{"month":"02","value":"11"}];

}
    

export class setLineBgLine001Item {

    

    
    value: string = "";
    
    month: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsLineCurve001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsLineCurve001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 821;
    
    InitHeight: number = 248;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsLineCurve001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsLineCurve001D1100 implements IComReturnDataStruct {

    

    
    dataLabel01: Array<number> = [28,7,27,39,28,7,27,39,28,7,27,39,28,7,27,39,28,7,27,39,28,7,27,39];
    
    dataLabel02: Array<number> = [28,7,27,39,28,7,27,39,28,7,27,39,28,7,27,39,28,7,27,39,28,7,27,39];
    
    titleName: Array<string> = ["流入","流出",];

}
    
/* 页面组件的基类 */
export class PageCom_ChartsLineGradua001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsLineGradua001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsLineGradua001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsLineGradua001D1100 implements IComReturnDataStruct {

    

    
    chartLineData: Array<ComReturnDataStruct_ChartItem> = [{"name": "累计SQL执行数", "value": [2,1,3,4,2,3,]},{"name": "累计事务", "value": [2.5,1.5,3.5,4.5,2.5,3.5,]},{"name": "累计IOPS", "value": [1.5,0.5,2.5,3.5,1.5,2.5]}];
    
    time: Array<string> = ["11-8","11-9","11-10","11-11","11-12","11-13",];

}
    

export class ComReturnDataStruct_ChartItem {

    

    
    name: string = "";
    
    value: Array<number> = [];

}
    
/* 页面组件的基类 */
export class PageCom_ChartsLineGradua002D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsLineGradua002D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 819;
    
    InitHeight: number = 245;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsLineGradua002D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsLineGradua002D1100 implements IComReturnDataStruct {

    

    
    items: Array<setData1> = [{"id":1,"name":"一级告警","value":[96.3,96.4,97.5,95.6,98.1,94.8,89.6,94.1,80.1,52.4,75.8,94.7,96.3,96.4,97.5,95.6,98.1,94.8,89.6,94.1,80.1,52.4,75.8,94.7,96,88,108,55,88,99]},{"id":2,"name":"二级告警","value":[97.3,99.2,99.3,100.0,99.6,90.6,80.0,91.5,69.8,67.5,90.4,64.9,76.3,46.4,107.5,85.6,78.1,44.8,99.6,92.1,83.1,72.4,71.8,54.7,66,68,100,52,81,81]},{"id":3,"name":"三级告警","value":[84.2,81.0,67.5,72.1,43.7,88.5,91.9,101.8,79.7,87.6,92.9,88,99,100,111,77,66,55,44,55,88,77,55,44,96,54,52,88,99,99]},{"id":4,"name":"四级告警","value":[50,60,86,55,47,56,95,86,45,65,75,85,95,86,76,45,100,95,45,55,65,45,75,85,71,75,85,65,60,60]},{"id":5,"name":"五级告警","value":[105,80,106,86,75,78,76,105,66,88,65,45,86,105,99,88,99,80,99,105,85,80,88,99,85,85,75,85,105,105]}];
    
    title: string = "告警数统计";
    
    day: number = 30;

}
    

export class setData1 {

    

    
    id: number = 0;
    
    name: string = "";
    
    value: Array<number> = [];

}
    
/* 页面组件的基类 */
export class PageCom_ChartsLineGradua003D1300 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsLineGradua003D1300 implements IComBaseStyle {

    

    
    InitWidth: number = 408;
    
    InitHeight: number = 200;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsLineGradua003D1300 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsLineGradua003D1300 implements IComReturnDataStruct {

    

    
    LineGradua003ItemList: Array<LineGradua003Item> = [{"name":"当日用电量统计图","value":[15,10,6,10,15,15,18,26,10,15,15,10,6,10,15,15,18,26,10,15,10,16,18,24]},{"name":"昨日用电量统计图","value":[10,12,16,12,14,18,14,22,11,12,15,12,6,14,15,17,18,22,10,12,10,18,18,20]}];
    
    LineGradua003Title: string = "实时用电量统计（t/小时）";
    
    XList: Array<string> = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
    
    XShaftName: string = "日";
    
    YShaftName: string = "MW·H";

}
    

export class LineGradua003Item {

    

    
    name: string = "";
    
    value: Array<number> = [];

}
    
/* 页面组件的基类 */
export class PageCom_ChartsLineHorizontal001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsLineHorizontal001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 900;
    
    InitHeight: number = 193;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsLineHorizontal001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsLineHorizontal001D1100 implements IComReturnDataStruct {

    

    
    items: Array<ChartsLineHorizontalItem> = [{"name":"14:55","value":"6"},{"name":"15:00","value":"19"},{"name":"15:05","value":"7"},{"name":"15:10","value":"10"},{"name":"15:15","value":"7"},{"name":"15:20","value":"20"},{"name":"15:25","value":"30"},{"name":"15:30","value":"12"},{"name":"15:35","value":"15"},{"name":"15:40","value":"11"},{"name":"15:45","value":"20"},{"name":"15:50","value":"12"}];
    
    demo: string = "";

}
    

export class ChartsLineHorizontalItem {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsLineLivedata002D1300 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsLineLivedata002D1300 implements IComBaseStyle {

    

    
    InitWidth: number = 287;
    
    InitHeight: number = 150;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsLineLivedata002D1300 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsLineLivedata002D1300 implements IComReturnDataStruct {

    

    
    liveData001Items: Array<LiveData001Item> = [{"liveDataTime":"14:00","liveDataElectricity":40},{"liveDataTime":"14:30","liveDataElectricity":38.39}];
    
    liveDataWarning: number = 38.39;

}
    

export class LiveData001Item {

    

    
    liveDataTime: string = "";
    
    liveDataElectricity: number = 0;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsLineLivedatapoint003D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsLineLivedatapoint003D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 619;
    
    InitHeight: number = 234;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsLineLivedatapoint003D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsLineLivedatapoint003D1400 implements IComReturnDataStruct {

    

    
    Items: Array<setLineLiveDataPoint003Item> = [{"xItem":"4:00","yItem":"25"},{"xItem":"5:00","yItem":"35"},{"xItem":"6:00","yItem":"45"},{"xItem":"7:00","yItem":"55"},{"xItem":"8:00","yItem":"70"},{"xItem":"9:00","yItem":"82"},{"xItem":"10:00","yItem":"67"},{"xItem":"11:00","yItem":"50"},{"xItem":"12:00","yItem":"40"},{"xItem":"13:00","yItem":"45"},{"xItem":"14:00","yItem":"42"},{"xItem":"现在","yItem":"55"}];

}
    

export class setLineLiveDataPoint003Item {

    

    
    xItem: string = "";
    
    yItem: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsLiquidfillWaterwave001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsLiquidfillWaterwave001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 90;
    
    InitHeight: number = 110;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsLiquidfillWaterwave001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsLiquidfillWaterwave001D1400 implements IComReturnDataStruct {

    

    
    LiquidfillWaterwave001Title: string = "预计投入度";
    
    LiquidfillWaterwave001Value: number = 80;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsMapWord001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsMapWord001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 1500;
    
    InitHeight: number = 560;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsMapWord001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsMapWord001D1100 implements IComReturnDataStruct {

    

    
    geoCoordMap: string = "";
    
    coverData: Array<string> = [];
    
    startPoint: string = "西藏";

}
    
/* 页面组件的基类 */
export class PageCom_ChartsPieBasefilletpie001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsPieBasefilletpie001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 255;
    
    InitHeight: number = 144;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsPieBasefilletpie001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsPieBasefilletpie001D1400 implements IComReturnDataStruct {

    

    
    PieBasefill001Title: string = "处警率";
    
    PieBasefill001Value: number = 99;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsPieGraduallumppie001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsPieGraduallumppie001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 151;
    
    InitHeight: number = 151;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsPieGraduallumppie001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsPieGraduallumppie001D1400 implements IComReturnDataStruct {

    

    
    GraPieTitle: string = "警力";
    
    GraPieValue: number = 37468;
    
    GraPieTotla: number = 50000;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsPieNestedringpie001D1400 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsPieNestedringpie001D1400 implements IComBaseStyle {

    

    
    InitWidth: number = 338;
    
    InitHeight: number = 250;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsPieNestedringpie001D1400 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsPieNestedringpie001D1400 implements IComReturnDataStruct {

    

    
    Title: string = "警力数";
    
    Value: number = 342;
    
    Total: number = 500;

}
    
/* 页面组件的基类 */
export class PageCom_ChartsRadarRadar001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_ChartsRadarRadar001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_ChartsRadarRadar001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_ChartsRadarRadar001D1100 implements IComReturnDataStruct {

    

    
    DataList: Array<number> = [85,80,50,90,82,43];
    
    DataListText: Array<ComReturnDataStruct_ChartsRadarRadar001D1100_item> = [{"max":100,"name":"设备故障"},{"max":200,"name":"信息泄露"},{"max":100,"name":"认证授权"},{"max":300,"name":"违规与误操作"},{"max":100,"name":"攻击入侵"},{"max":100,"name":"恶意代码"}];

}
    

export class ComReturnDataStruct_ChartsRadarRadar001D1100_item {

    

    
    name: string = "";
    
    max: number = 0;

}
    
/* 页面组件的基类 */
export class PageCom_DataTableTable001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DataTableTable001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DataTableTable001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DataTableTable001D1100 implements IComReturnDataStruct {

    

    
    ContentRowCount: number = 0;
    
    ShowKeys: Array<string> = [];
    
    Title: string = "";
    
    TableContent: Array<string> = [];

}
    
/* 页面组件的基类 */
export class PageCom_DataTagBg001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DataTagBg001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 276;
    
    InitHeight: number = 264;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DataTagBg001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DataTagBg001D1100 implements IComReturnDataStruct {

    

    
    datavalue: Array<DataTagBgItem> = [{"name": "CPU使用率", "value": "35"}];

}
    

export class DataTagBgItem {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DataTagBg002D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DataTagBg002D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 276;
    
    InitHeight: number = 264;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DataTagBg002D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DataTagBg002D1100 implements IComReturnDataStruct {

    

    
    datavalue02: Array<DataTagBg02> = [{"name": "内存使用率", "value": "58"}];

}
    

export class DataTagBg02 {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_Demo3dUnity2018001D1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_Demo3dUnity2018001D1000 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_Demo3dUnity2018001D1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_Demo3dUnity2018001D1000 implements IComReturnDataStruct {

    

    
    JsonPath: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoBaseTest01D1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoBaseTest01D1000 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoBaseTest01D1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoBaseTest01D1000 implements IComReturnDataStruct {

    

    
    demo: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoBaseTest02D1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoBaseTest02D1000 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoBaseTest02D1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoBaseTest02D1000 implements IComReturnDataStruct {

    

    
    demo: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoButtonSinglebtn001D1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoButtonSinglebtn001D1000 implements IComBaseStyle {

    

    
    InitWidth: number = 160;
    
    InitHeight: number = 60;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoButtonSinglebtn001D1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoButtonSinglebtn001D1000 implements IComReturnDataStruct {

    

    /** 
* 按钮显示的文字
*/
    text: string = "BUTTON";

}
    
/* 页面组件的基类 */
export class PageCom_DemoButtonSinglebtn002D1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoButtonSinglebtn002D1000 implements IComBaseStyle {

    

    
    InitWidth: number = 228;
    
    InitHeight: number = 60;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoButtonSinglebtn002D1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoButtonSinglebtn002D1000 implements IComReturnDataStruct {

    

    
    value: boolean = false;

}
    
/* 页面组件的基类 */
export class PageCom_DemoChartEchart01D1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoChartEchart01D1000 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoChartEchart01D1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoChartEchart01D1000 implements IComReturnDataStruct {

    

    
    demo: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemBgcontent001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemBgcontent001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemBgcontent001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemBgcontent001D1100 implements IComReturnDataStruct {

    

    
    demo: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemCssinput001D1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemCssinput001D1000 implements IComBaseStyle {

    

    
    InitWidth: number = 232;
    
    InitHeight: number = 46;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemCssinput001D1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemCssinput001D1000 implements IComReturnDataStruct {

    

    
    value: string = "";
    
    placeholder: string = "请输入内容";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemDatadisplay003D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemDatadisplay003D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 914;
    
    InitHeight: number = 248;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemDatadisplay003D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemDatadisplay003D1100 implements IComReturnDataStruct {

    

    
    items: Array<dataDisplay> = [{"totalTopic":"网络","totalValue":[{"name":"弹性IP","value":"135"},{"name":"虚拟负载均衡","value":"2156"}]},{"totalTopic":"大数据","totalValue":[{"name":"关系型数据库","value":"624"}]},{"totalTopic":"数据库","totalValue":[{"name":"关系型数据库","value":"531"}]},{"totalTopic":"备份与容灾","totalValue":[{"name":"云主机备份","value":"5782"},{"name":"云硬盘备份","value":"2314"}]}];

}
    

export class dataDisplay {

    

    
    totalTopic: string = "";
    
    totalValue: Array<dataDisplayItem> = [];

}
    

export class dataDisplayItem {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemDatadisplay004D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemDatadisplay004D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 682;
    
    InitHeight: number = 276;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemDatadisplay004D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemDatadisplay004D1100 implements IComReturnDataStruct {

    

    
    items: Array<setData> = [{"id":1,"name":"健康值","value":"50%"},{"id":2,"name":"容量指数","value":"259"},{"id":3,"name":"故障指数","value":"30"}];

}
    

export class setData {

    

    
    id: number = 0;
    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemDatatrend001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemDatatrend001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 125;
    
    InitHeight: number = 120;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemDatatrend001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemDatatrend001D1100 implements IComReturnDataStruct {

    

    
    Name: string = "环比";
    
    dataValue: number = 66;

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemEffectdatadisplay001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemEffectdatadisplay001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 457;
    
    InitHeight: number = 290;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemEffectdatadisplay001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemEffectdatadisplay001D1100 implements IComReturnDataStruct {

    

    
    setValue1: string = "虚拟机1";
    
    setNum1: string = "32%";
    
    setValue2: string = "虚拟机2";
    
    setNum2: string = "24%";
    
    setValue3: string = "虚拟机3";
    
    setNum3: string = "82%";
    
    setValue4: string = "虚拟机4";
    
    setNum4: string = "50%";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemGraduadata001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemGraduadata001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 800;
    
    InitHeight: number = 204;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemGraduadata001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemGraduadata001D1100 implements IComReturnDataStruct {

    

    
    items: Array<DivitemGRaduadataItem> = [{"name":"VDC1","value":"88"},{"name":"VDC2","value":"64"},{"name":"VDC3","value":"60"},{"name":"VDC4","value":"45"},{"name":"VDC5","value":"31"},{"name":"VDC6","value":"28"},{"name":"VDC7","value":"22"},{"name":"VDC8","value":"18"},{"name":"VDC9","value":"11"},{"name":"VDC10","value":"3"}];
    
    SumValue: number = 100;

}
    

export class DivitemGRaduadataItem {

    

    
    name: string = "";
    
    value: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemPictitle001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemPictitle001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 86;
    
    InitHeight: number = 184;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemPictitle001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemPictitle001D1100 implements IComReturnDataStruct {

    

    
    setName: string = "防火墙";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemTextpicture001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemTextpicture001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 73;
    
    InitHeight: number = 125;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemTextpicture001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemTextpicture001D1100 implements IComReturnDataStruct {

    

    
    name: string = "主机";
    
    value: string = "988";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemTextpicture002D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemTextpicture002D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 200;
    
    InitHeight: number = 100;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemTextpicture002D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemTextpicture002D1100 implements IComReturnDataStruct {

    

    
    name: string = "实时更新";
    
    value: string = "11910";

}
    
/* 页面组件的基类 */
export class PageCom_DemoDivitemTitle001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoDivitemTitle001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 400;
    
    InitHeight: number = 50;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoDivitemTitle001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoDivitemTitle001D1100 implements IComReturnDataStruct {

    

    
    mainTitle: string = "实时";
    
    subTitle: string = "攻击日志";

}
    
/* 页面组件的基类 */
export class PageCom_DemoEffectCsssky001D1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoEffectCsssky001D1000 implements IComBaseStyle {

    

    
    InitWidth: number = 960;
    
    InitHeight: number = 480;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoEffectCsssky001D1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoEffectCsssky001D1000 implements IComReturnDataStruct {

    

    
    demo: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoEffectStar001D1200 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoEffectStar001D1200 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoEffectStar001D1200 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoEffectStar001D1200 implements IComReturnDataStruct {

    

    
    demo: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_DemoMediaSingleimgD1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoMediaSingleimgD1000 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoMediaSingleimgD1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoMediaSingleimgD1000 implements IComReturnDataStruct {

    

    /** 
* 图片路径
*/
    src: string = "@(#@FromComAssetBaseEndWithSlash)base/preview/thumbnail.png";
    /** 
* 图片鼠标悬浮后描述
*/
    alt: string = "";
    /** 
* 是否可以点击(默认false)
*/
    canClick: boolean = false;
    /** 
* 点击后跳转链接
*/
    link: string = "";
    /** 
* 跳转方式(默认_blank)
*/
    targetType: string = "_blank";
    /** 
* 图片尺寸控制设置
*/
    imgStyle: string = "width:100%;height:100%;";

}
    
/* 页面组件的基类 */
export class PageCom_DemoMediaSinglevideoD1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoMediaSinglevideoD1000 implements IComBaseStyle {

    

    
    InitWidth: number = 537;
    
    InitHeight: number = 428;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoMediaSinglevideoD1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoMediaSinglevideoD1000 implements IComReturnDataStruct {

    

    
    src: string = "/SEditorSpace/assets/videos/examples/monitor1.mp4";
    
    autoplay: boolean = true;
    
    loop: boolean = true;
    
    controls: boolean = false;
    
    type: string = "video/mp4";

}
    
/* 页面组件的基类 */
export class PageCom_DemoUnreal3ddemo001D1000 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_DemoUnreal3ddemo001D1000 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_DemoUnreal3ddemo001D1000 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_DemoUnreal3ddemo001D1000 implements IComReturnDataStruct {

    

    
    demo: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_NormalBaseSelect001D1200 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_NormalBaseSelect001D1200 implements IComBaseStyle {

    

    
    InitWidth: number = 360;
    
    InitHeight: number = 55;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_NormalBaseSelect001D1200 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_NormalBaseSelect001D1200 implements IComReturnDataStruct {

    

    
    level: Array<string> = ["第一级","第二级","第三级","第四级","第五级"];

}
    
/* 页面组件的基类 */
export class PageCom_NormalBaseTimepicker001D1200 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_NormalBaseTimepicker001D1200 implements IComBaseStyle {

    

    
    InitWidth: number = 460;
    
    InitHeight: number = 60;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_NormalBaseTimepicker001D1200 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_NormalBaseTimepicker001D1200 implements IComReturnDataStruct {

    

    
    demo: string = "";

}
    
/* 页面组件的基类 */
export class PageCom_NormalTextArctext001D1100 extends BaseComObject {

    

    /** 
* 样式接口属性
*/
    ComStyles: IComBaseStyle;
    /** 
* 数据接口配置属性
*/
    ComBaseDataConfig: IComBaseDataConfig;
    /** 
* 组件交互接口
*/
    ComBaseInteractConfig: IComBaseInteractConfig;
    /** 
* 组件绑定的数据属性
*/
    Data: IComReturnDataStruct;

}
    

export class ComStyle_NormalTextArctext001D1100 implements IComBaseStyle {

    

    
    InitWidth: number = 600;
    
    InitHeight: number = 300;
    
    ConfigStyleContent: ConfigStyleContent = new ConfigStyleContent();

}
    

export class ComDataConfig_NormalTextArctext001D1100 implements IComBaseDataConfig {

    

    
    DataQueryType: ComDataQueryType = ComDataQueryType.kStatic;
    
    DataConfig: IComDataQueryTypeStruct;
    
    Data: IComReturnDataStruct;

}
    

export class ComReturnDataStruct_NormalTextArctext001D1100 implements IComReturnDataStruct {

    

    
    demo: string = "";

}
    

export class PageSolutionUploadPage {

    

    
    solution: PageSolution = new PageSolution();
    
    pageData: string = "";

}
    

export class PageSolution {

    

    
    Id: string = "";
    
    Desc: string = "";
    
    Title: string = "";
    
    UploadState: boolean;
    
    CreateTimestamp: number = 0;

}
    

export class CustomFavorComInstConfig {

    

    
    Id: string = "";
    
    Com_Name: string = "";
    
    Com_Title: string = "";
    
    Com_Tags: string = "";
    
    Remarks: string = "";
    
    Data: string = "";

}
    

export class RBPictureLibrary {

    

    
    Id: string = "";
    
    Url: string = "";
    
    Type: number = 0;
    
    PictureName: string = "";
    
    Suffix: string = "";

}
/** 
* 配置元素类型
*/
export enum ConfigStyleItemType {
    
    kInputNormal = 0,
    
    kSelectOption = 1,
    
    kColor = 2,
    
    kInputNumber = 3,
    
    kCheckBox = 4,
    
    kButton = 5,
    
    kUploadIMage = 6,
}
/** 
* 组件开发状态
*/
export enum ESqlPageComDevStatus {
    /** 
* 计划
*/
    kPlan = 0,
    /** 
* 开发中
*/
    kDeveloping = 1,
    /** 
* 待审核
*/
    kBeApproving = 2,
    /** 
* 审核通过
*/
    kApproveSuccess = 3,
    /** 
* 审核失败
*/
    kApproveFailed = 4,
}
/** 
* 组件发布状态
*/
export enum ESqlPageComPublishStatus {
    /** 
* 未发布
*/
    kNone = 0,
    /** 
* 已发布
*/
    kPublished = 1,
    /** 
* 已关闭
*/
    kClosed = 2,
}

export enum EValueType {
    
    kUnknown = 0,
    
    kString = 1,
    
    kNumber = 2,
    
    kBoolean = 3,
}
/** 
* 数据源类型
*/
export enum ComDataQueryType {
    /** 
* 静态数据
*/
    kStatic = 0,
    /** 
* api获取数据
*/
    kApi = 1,
}

export enum EAnimationEasingType {
    
    linear = 0,
    
    easeInQuad = 1,
    
    easeInCubic = 2,
    
    easeInQuart = 3,
    
    easeInQuint = 4,
    
    easeInSine = 5,
    
    easeInExpo = 6,
    
    easeInCirc = 7,
    
    easeInBack = 8,
    
    easeInElastic = 9,
    
    easeOutQuad = 10,
    
    easeOutCubic = 11,
    
    easeOutQuart = 12,
    
    easeOutQuint = 13,
    
    easeOutSine = 14,
    
    easeOutExpo = 15,
    
    easeOutCirc = 16,
    
    easeOutBack = 17,
    
    easeOutElastic = 18,
    
    easeInOutQuad = 19,
    
    easeInOutCubic = 20,
    
    easeInOutQuart = 21,
    
    easeInOutQuint = 22,
    
    easeInOutSine = 23,
    
    easeInOutExpo = 24,
    
    easeInOutCirc = 25,
    
    easeInOutBack = 26,
    
    easeInOutElastic = 27,
}

export enum ESoloEventLifeType {
    
    kPermanent = 0,
    
    kOnlyOnce = 1,
}
/** 
* 页面缩放方式
*/
export enum PageScaleType {
    
    kFullWidth = 0,
    
    kFullHeight = 1,
    
    kFullScreen = 2,
}

export enum ESComPlugins {
    /** 
* [echarts.min.js]
*/
    k1000_pluge_charts_echarts_420rc2_min_js = 1,
    /** 
* [echarts-gl.min.js]
*/
    k1001_plug_echarts_echarts_gl_111_min_js = 2,
    /** 
* [UnityLoader.js]
*/
    k1002_plug_unity_unity_2018_normal_unityloader_js = 3,
    /** 
* [world.js]
*/
    k1003_pluge_charts_maps_world_js = 4,
    /** 
* []
*/
    k1004_plug_ui_iview_min_js = 5,
    /** 
* [echarts-liquidfill.js]
*/
    k1005_plug_echarts_echarts_liquidfill_js = 6,
}
/** 
* 组件事件类型(用于组件向页面传递事件)
*/
export enum ComEventType {
}
/** 
* 组件交互触发方式
*/
export enum EComInteractTriggerType {
    /** 
* 条件表达式
*/
    kConditionExpress = 0,
    /** 
* 监听组件内button元素触发
*/
    kElementButton = 1,
    /** 
* 事件触发
*/
    kSoloEvent = 2,
}

export enum EComInstBaseClassType {
    
    kDefault = 0,
    /** 
* 继承于 UnityBaseVue
*/
    kUnity = 1,
    /** 
* 继承于 EchartsBaseVue
*/
    kEchart = 2,
}

