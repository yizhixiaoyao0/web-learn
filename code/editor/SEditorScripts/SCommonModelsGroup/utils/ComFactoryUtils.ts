import SPageSomeTemplateCreator from './SPageSomeTemplateCreator';
import { ComDataConfigMysql, BaseComObject, IComBaseStyle, IComBaseDataConfig, ComDataQueryType, ComDataConfigStatic, ComDataConfigApi, ComInteractEventDataConfigBase, ComDataProcessorConfig, DataMapperRules } from '../ServerModel';
import SPageComUtils from './ComNameParsorUtils';
import SdeDynamicClassUtils from './SdeDynamicClassUtils';

export default class ComFactoryUtils {



  // comNameLower: test-foot-text01-d1000-v1-0-0
  public static CreateNewCom(comNameLower: string): BaseComObject {
    let className = SPageComUtils.GetClassNameByUpper(comNameLower);

    // TestFootText01D1000
    console.log('获取: ' + className);

    let PageComClassTypeName: string = 'PageCom_' + className;
    let ComStyleClassTypeName: string = 'ComStyle_' + className;
    let ComDataConfigClassTyleName: string = 'ComDataConfig_' + className;

    let PageComInstance: BaseComObject = SdeDynamicClassUtils.Inst.CreateClassInstance(PageComClassTypeName);
    let ComStyleInstance: IComBaseStyle = SdeDynamicClassUtils.Inst.CreateClassInstance(ComStyleClassTypeName);
    let ComDataConfigInstance: IComBaseDataConfig = SdeDynamicClassUtils.Inst.CreateClassInstance(ComDataConfigClassTyleName);

    PageComInstance.ComStyles = ComStyleInstance;
    PageComInstance.ComStyles.ConfigStyleContent = SPageSomeTemplateCreator.CreateDefaultComConfigStyleContent();

    // 初始的数据配置
    PageComInstance.ComBaseDataConfig = ComDataConfigInstance;
    PageComInstance.ComBaseDataConfig.DataQueryType = ComDataQueryType.kStatic;
    PageComInstance.ComBaseDataConfig = this.CreateComDataConfig(  PageComInstance.ComBaseDataConfig.DataQueryType, PageComInstance.ComBaseDataConfig);

    PageComInstance.ComBaseInteractConfig = new ComInteractEventDataConfigBase();

    // 配置初始的数据处理参数
    let dataProcessorConfig = new ComDataProcessorConfig();
    dataProcessorConfig.ListSourceProcessorFunction = '';
    dataProcessorConfig.ProcessorMapRules = new DataMapperRules();
    dataProcessorConfig.SetDataMapRules = new DataMapperRules();

    PageComInstance.ComBaseDataConfig.DataConfig.DataProcessorConfig = dataProcessorConfig ;


    return PageComInstance;
  }

  public static CreateComDataConfig(queryType: ComDataQueryType, target: IComBaseDataConfig) {
    if (queryType === ComDataQueryType.kStatic) {
        target.DataConfig = new ComDataConfigStatic();
    } else if (queryType === ComDataQueryType.kApi) {
        target.DataConfig = new ComDataConfigApi();
    }
    return target;
}


}
