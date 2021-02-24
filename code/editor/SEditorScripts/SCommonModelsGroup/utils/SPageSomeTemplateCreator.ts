import { ConfigStyleContent, ConfigStyleGroup, ConfigStyleItem, ConfigStyleItemType } from '../../SCommonModelsGroup/ServerModel';

// 页面的一些初始化模版或者测试数据

export default class SPageSomeTemplateCreator {

  // 初始化页面样式内容默认模版
  public static CreateDefaultPageStyleContent(): ConfigStyleContent {
    let config = new ConfigStyleContent();

    let group = new ConfigStyleGroup('基础属性', true);
    group.AddItem(new ConfigStyleItem('宽', ConfigStyleItemType.kInputNormal, '1920', 'width', 'px'));
    group.AddItem(new ConfigStyleItem('高', ConfigStyleItemType.kInputNormal, '1080', 'height', 'px'));
    group.AddItem(new ConfigStyleItem('颜色', ConfigStyleItemType.kColor, '#06040C'));
    group.AddItem(new ConfigStyleItem('背景图', ConfigStyleItemType.kUploadIMage, '', 'backgroundImage'));

    let item = new ConfigStyleItem('缩放方式', ConfigStyleItemType.kSelectOption, '2');
    item.selectOption = [];
    item.selectOption.push({value: '0', label: '等比缩放宽度铺满' });
    item.selectOption.push({value: '1', label: '等比缩放高度铺满' });
    item.selectOption.push({value: '2', label: '全屏铺满' });
    group.AddItem(item);

    config.AddGroup(group);
    return config;
  }

  // 初始化组件的样式基础内容配置
  public static CreateDefaultComConfigStyleContent(width: string = '1920', height: string = '1080', sizeGroupName: string = '基础属性'): ConfigStyleContent {

    let config = new ConfigStyleContent();

    let group = new ConfigStyleGroup(sizeGroupName, true);

    group.AddItem(new ConfigStyleItem('宽', ConfigStyleItemType.kInputNormal, width, 'width', 'px'));
    group.AddItem(new ConfigStyleItem('高', ConfigStyleItemType.kInputNormal, height, 'height', 'px'));
    group.AddItem(new ConfigStyleItem('横坐标', ConfigStyleItemType.kInputNumber, ''));
    group.AddItem(new ConfigStyleItem('纵坐标', ConfigStyleItemType.kInputNumber, ''));
    group.AddItem(new ConfigStyleItem('旋转角度', ConfigStyleItemType.kInputNumber, '0'));
    group.AddItem(new ConfigStyleItem('透明度', ConfigStyleItemType.kInputNumber, '1'));

    config.AddGroup(group);

    return config;
  }
}
