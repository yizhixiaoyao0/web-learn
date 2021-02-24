export default class SPageComUtils {


  // text-title-number-reverse01-d1000
  // 得到  TextTitleNumberReverse01D1000
  public static GetClassUpNameByComName(comName: string, splitLast: boolean = false) {
    let arr = comName.split('-');
    let className = '';

    if (splitLast) {
      arr.pop();
    }

    arr.forEach((element) => {
        let first = element[0].toUpperCase();
        className += (first + element.substring(1));
    });
    return className;
  }


  // SceneNormalUnitySceneLoader01D1001V100
  // 转成 scene-normal-unity-scene-loader01-d1001-v100
  public static GetCompLowerSplit(s: string) {
    s = s.trim();

    let a = s.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (a.startsWith('-')) {
      a = a.substring(1);
    }
    return a;
  }


  // SceneNormalUnitySceneLoader01D1001V100
  // 转成 SceneNormalUnitySceneLoader01D1001
  public static GetClassNameByUpper(name: string) {
    let a = this.GetCompLowerSplit(name);
    let b = this.GetClassUpNameByComName(a, true);
    return b;
  }
}
