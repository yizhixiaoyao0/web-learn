import { ComTypesDefines } from '../../SCommonModelsGroup/ServerModel';

export default class SPageConfigManagement {
  private static _inst: SPageConfigManagement;
  public static get Inst(): SPageConfigManagement {
    if (this._inst == null) {
      this._inst = new SPageConfigManagement();
    }
    return this._inst;
  }

  private ComTypesDefines: ComTypesDefines = new ComTypesDefines();

  public InitializeConfig() {
    // do
  }

  public GetGroupTitle(groupName: string): string {
    let index =  this.ComTypesDefines.defines.findIndex((p) => p.group === groupName);
    if (index !== -1) {
      return this.ComTypesDefines.defines[index].title;
    } else {
      return '未知';
    }
  }

  public GetChildTitle(groupName: string, child: string): string {
    let index =  this.ComTypesDefines.defines.findIndex((p) => p.group === groupName);
    if (index !== -1) {
      let carr = this.ComTypesDefines.defines[index].childs;

      let childQuery = carr.filter((p) => p.type === child);
      if (childQuery != null && childQuery.length > 0) {
        return childQuery[0].title;
      }
    }

    if (child === 'All') {
      return '全部';
    }

    return '未知';

  }

}
