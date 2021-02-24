import { ISComMngInterface } from './SComMngCenter';
import { SendToWebData, IUWProto, IWUProto, EComInstBaseClassType, wu_proto_system_scene_loadend, uw_proto_system_scene_started, wu_proto_system_set_keyboard_input, wu_proto_system_set_webunity_debug } from '../../SCommonModelsGroup/ServerModel';
import SPageMainController from '../SPageMainController';
import SPageSoloEventsManagement from '../mngs/SPageSoloEventsManagement';
import { IUWProtoHandler } from '../../../core/page-com-ui/src/core/BaseVueDefines/UnityBaseVue';

export class UnityInstStoreItem {
  public id: string = '';
  public inst: any = null;
}

// tslint:disable-next-line: class-name
export default class SComMng_UnityMain implements ISComMngInterface {


  // { instanid: 对应的Unity实例 }
  private AllUnityInstance: any = {};

  public Initialize(): void {
        /**
     *注册通信函数
     */
      (<any> (window)).uw_base = new Object();
      (<any> (window)).uw_base.uw_SendMessageToPage = this.OnHandlerAllUnityMessage;
      console.log('SComMng_UnityMain Initialize ---- init');
  }

  public RigistUnityInstance(id: string, unityInst: any) {
     let inst =  this.AllUnityInstance[id];
     if (inst == null) {
       this.AllUnityInstance[id] = unityInst;
     }
  }


  // Web->Unity 利用组件交互,同继承于UnityBaseVue的组件进行交互
  public SendMessageToUnityFromProto<T extends IWUProto>(InstId: string, methodName: string, data: T): void  {

    let dstr = JSON.stringify(data);

    this.SendMessageToUnityFromProtoString(InstId, methodName, dstr);
  }

  public SendMessageToUnityFromProtoString(InstId: string, methodName: string, data: string) {
      let comInst = SPageMainController.Inst.PageInfoMng.GetComInst(InstId);

      if (comInst == null) {
        console.error('SendMessageToUnityFromProtoString ERR: cant found comInst: ' + InstId);
        return;
      }

      let arr: string[] = [];
      arr.push(methodName);
      arr.push(data);

      // 传入参数执行方法
      try {
        (<any> comInst)['OpenInteract_SendMessage'](arr);
      } catch (error) {
        console.error(error);
      }
  }


  public CheckIsUnityCom(comInstId: string): boolean {
    let comInst = SPageMainController.Inst.PageInfoMng.GetComInst(comInstId);
    if (comInst == null) { return false; }

    // 必须是继承于UnityBaseVue的组件
    let baseInstType = comInst.GetComInstBaseClassType();
    if (baseInstType !== EComInstBaseClassType.kUnity) {
      return false;
    }

    return true;
  }

  // 从Unity实例中得到 Web->Unity的协议名称
  public GetWUProtoInfos(comInstId: string): any[] {
    if (!this.CheckIsUnityCom(comInstId)) {
      return;
    }

    let comInst = SPageMainController.Inst.PageInfoMng.GetComInst(comInstId);
    let wuprotoInfost = ((<any> comInst).UWProtoHandler as IUWProtoHandler).GetWUProtoNames();


    wuprotoInfost.push(['wu_proto_system_scene_loadend', () => new wu_proto_system_scene_loadend() ]);
    wuprotoInfost.push(['wu_proto_system_set_keyboard_input', () => new wu_proto_system_set_keyboard_input() ]);
    wuprotoInfost.push(['wu_proto_system_set_webunity_debug', () => new wu_proto_system_set_webunity_debug() ]);

    console.log(wuprotoInfost);
    return wuprotoInfost;
  }


  // 从Unity实例中得到 Unity->Web的协议名称
  public GetUWProtoInfos(comInstId: string): any[] {
    if (!this.CheckIsUnityCom(comInstId)) {
      return;
    }

    let comInst = SPageMainController.Inst.PageInfoMng.GetComInst(comInstId);
    let uwprotoInfost = ((<any> comInst).UWProtoHandler as IUWProtoHandler).GetUWProtoNames();

    uwprotoInfost.push(['uw_proto_system_scene_started', () => new uw_proto_system_scene_started() ]);

    console.log(uwprotoInfost);
    return uwprotoInfost;
  }

  private GetUnityInst(id: string): any {
    let inst =  this.AllUnityInstance[id];
    if (inst != null) {
       return inst;
     } else {
       return null;
     }
  }

  // 解析U->W协议,并产生事件发送到统一的SoloEvent事件中心进行处理
  private  OnHandlerAllUnityMessage(data: string) {
    if (data == null || data === '') {
      console.error('OnHandlerAllUnityMessage Error! data is null!', data);
      return;
    }

    console.log('---------------uw_SendModelSceneStart-----------');
    let msgData = JSON.parse(data) as SendToWebData<IUWProto>;

    let contentStr = JSON.stringify(msgData.Data);

    let comInst = SPageMainController.Inst.PageInfoMng.GetComInst(msgData.InstId);
    if (comInst == null) {
      console.error('OnHandlerAllUnityMessage ERR: cant found comInst: ' + msgData.InstId);
      return;
    }


    // 接收到消息后发送组件事件
    SPageSoloEventsManagement.Inst.PostEventFromCom(msgData.InstId, msgData.InstId, msgData.MethodName, contentStr, 'unity_proto');

    // 传入参数执行方法
    try {
      (<any> comInst)['ReceiveMessageFromUnity'](msgData);
    } catch (error) {
      console.error(error);
    }

  }

}
