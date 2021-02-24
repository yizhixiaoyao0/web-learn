import LoadJsPluginsUtils from '../../SCommonModelsGroup/utils/LoadJsPluginsUtils';
import AnimeLoader from '../../../core/@types/AnimeLoader';
import SVuePageHelper from '../../SCommonModelsGroup/utils/SVuePageHelper';
import { ComEnterStartAnimationConfig, EAnimationEasingType, PageBaseComObject } from '../../SCommonModelsGroup/ServerModel';
import SPageStylesManeagement from './SPageStylesManegement';

class SPageAnimeParams implements anime.AnimeParams {
    public targets: AnimeTarget | ReadonlyArray<AnimeTarget>;

    public duration?: number | FunctionBasedParameter;
    public delay?: number | FunctionBasedParameter;
    public elasticity?: number | FunctionBasedParameter;
    public round?: number | boolean | FunctionBasedParameter;

    public easing?: string | ReadonlyArray<number>;

    public begin?: AnimeCallbackFunction;
    public run?: AnimeCallbackFunction;
    public update?: AnimeCallbackFunction;
    public complete?: AnimeCallbackFunction;
    [AnyAnimatedProperty: string]: any;


    public loop?: number | boolean;
    public autoplay?: boolean;
    public direction?: anime.DirectionOptions | string;

    public opacity?: number;
}

/**
 * 动画参数可选项
 *
 * @export
 * @class AnimatorParamsOption
 */
export class AnimatorParamsOption {
  /* 延时 (毫秒) */
  public delay: number = 0;

  /* 延时是否随机(默认否) */
  public randomDelay: boolean = false;

  /* 随机延时最大值(默认 1200毫秒) */
  public randomDelayMax: number = 1200;

  /* 动画开始时CB */
  public OnAniStart: () => void = null ;

  /* 动画完成时CB */
  public OnAniEnd: () => void = null;
}

export default class SPageAnimatorHelper {
  private static _inst: SPageAnimatorHelper;
  public static get Inst(): SPageAnimatorHelper {
    if (this._inst == null) {
      this._inst = new SPageAnimatorHelper();
    }
    return this._inst;
  }

  public LoadAnimatorPlugin(CB: () => void) {
    LoadJsPluginsUtils.loadJSPlugin([
      '/SEditorSpace/plugins/plug-system/animejs/anime.min.js',
      '/SEditorSpace/plugins/plug-system/textfx/charming.min.js',
      '/SEditorSpace/plugins/plug-system/textfx/textfx.js'], CB, true);
  }

  // 组件淡入
  public PlayComAnim_TransparentFadeIn(com: PageBaseComObject) {
    // 全部淡入进场
    SPageAnimatorHelper.Inst.SetValueAnim_Num_From0_To100((a: number) => {
      let optValue = (a / 100).toFixed(1);
      SPageStylesManeagement.Inst.SetComOpercity(com, optValue);
    });
  }


  public SetAnim_EaseOut_BySelect(targetSelect: string) {
    let params: SPageAnimeParams =  new SPageAnimeParams();
    params.targets =  targetSelect;
    params.opacity = 0;
    params.easing = 'easeInOutQuad';
    AnimeLoader.Anime(params);
  }

  public SetAnim_EaseIn_BySelect(targetSelect: string) {
    let params: SPageAnimeParams =  new SPageAnimeParams();
    params.targets =  targetSelect;
    params.opacity = 1;
    params.easing = 'easeInOutQuad';
    AnimeLoader.Anime(params);
  }



  public SetValueAnim_Num_From0_To100(OnUpdate: (value: number) => void) {
    let obj = { charged: 0 };

    AnimeLoader.Anime({
      targets: obj,
      charged: 100,
      round: 1,
      easing: 'linear',
      update() {
        if (OnUpdate) {
          OnUpdate(obj.charged);
        }
      },
    });
  }


  /**
   * 设置组件实例的入场动画
   *
   * @param {string} comInstId  组件实例ID
   * @param {number} [during=1000] during
   * @param {number} [delay=0] delay
   * @param {() =>void} [DoOnStart=null] 开始执行前的CB
   * @param {() => void} [DoOnEnd=null] 动画完成后的CB
   * @param {boolean} [randomDelay=false] 是否随机延时
   * @param {number} [randomDelayMax=1200] 默认随机延时最大值1200毫秒
   * @memberof SPageAnimatorHelper
   */
  public Set_ComEnterStartAnimation( com: PageBaseComObject, comInstId: string, OnAniStart: () => void = null, OnAniEnd: () => void = null, option: ComEnterStartAnimationConfig = null) {

    if (option.enable === false)  {
      SPageStylesManeagement.Inst.SetComOpercity(com, '1');
      return;
    }

    let delay = option.delay;

    if (option && option.isRandomDelay) {
      delay = Math.ceil(Math.random() * option.randomDelayMax);
    }

    // 获取Enum 枚举的名字
    let easingTypeName = EAnimationEasingType[option.easingType];

    setTimeout(() => {
      let comDivId = SVuePageHelper.GetComDivID(comInstId);

      // 如果设置为淡入,需要判断透明度为0
      if (option.isFadeIn) {
        SPageStylesManeagement.Inst.SetComOpercity(com, '0');
        this.PlayComAnim_TransparentFadeIn(com);
      }


      AnimeLoader.Anime({
        begin: OnAniStart,
        complete: OnAniEnd,
        targets: '#' + comDivId,
        translateX: option.translateX,
        translateY: option.translateY,
        duration: option.during,
        easing: easingTypeName,  // https://easings.net/zh-cn
        direction: 'reverse', // 方向-反过来
        rotate: option.rotate + 'turn', // 旋转
        // backgroundColor: [ //背景色变化
        //   {value: '#FFF'}, // Or #FFFFFF
        //   {value: 'rgb(255, 0, 0)'},
        //   {value: 'hsl(100, 60%, 60%)'}
        // ],
      });


    }, delay);


  }


  /**
   * 设置组件中元素的动画
   *
   * @param {string} comInstId
   * @param {string} elementId
   * @memberof SPageAnimatorHelper
   */
  public PageCom_SetElementAnim(comInstId: string, elementId: string, params: SPageAnimeParams = null, option: AnimatorParamsOption = null) {
    let delay = option.delay;
    if (option && option.randomDelay) {
      delay = Math.ceil(Math.random() * option.randomDelayMax);
    }

    setTimeout(() => {
      // let comDivId = SVuePageHelper.GetComDivID(comInstId);
      // tslint:disable-next-line: no-shadowed-variable
      let params: SPageAnimeParams =  new SPageAnimeParams();
      params.begin = option.OnAniStart;
      params.complete = option.OnAniEnd;
      params.targets  = '#' + elementId;

      AnimeLoader.Anime(params);
    }, delay);
  }


}
