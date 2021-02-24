import { PageBaseComObject } from '../../SCommonModelsGroup/ServerModel';
import SPageTimerManagement from './SPageTimerManagement';
import { ComDataProcessorPageData } from './SPageDataProcessorFlowManagement';

export class SComPageDatas {
  public comInstId: string = '';
  public comObject: PageBaseComObject;

  public requestDataConfig: ComDataProcessorPageData = new ComDataProcessorPageData();
}


export default class SComPageDatasManagement {
  private SComPageDatasList: SComPageDatas[] = [];

  public AddComPageData(comInstId: string, comObject: PageBaseComObject): void {
    if (comInstId == null || comInstId.trim() === '') { return; }

    let find = this.GetComPageData(comInstId);
    if (find != null) {
      return;
    }
    let d = new SComPageDatas();
    d.comInstId = comInstId;
    d.comObject = comObject;

    d.requestDataConfig.ComInstId = comInstId;
    this.SComPageDatasList.push(d);
  }

  public GetComPageData(comInstId: string): SComPageDatas {
    let query = this.SComPageDatasList.filter((p) => p.comInstId === comInstId);
    if (query != null && query.length > 0) {
      return query[0];
    }
    return  null;
  }


}
