export default class LoadJsPluginsUtils {

  public static loadJSPlugin(plugins: string[], callback: any, toBody: boolean = false) {
    if (plugins.length > 0) {
      let path = plugins.shift();
      this.loadScript(path, () => {
          this.loadJSPlugin(plugins, callback, toBody);
      }, toBody);
    } else {
        if (callback != null) {
           callback();
        }
    }
  }

  public static loadScript(url: any, callback: any, toBody: boolean = false) {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      if (typeof(callback) !== 'undefined') {
        if ((<any> script).readyState) {
            (<any> script).onreadystatechange = function() {
            if ((<any> script).readyState === 'loaded' || (<any> script).readyState === 'complete') {
              (<any> script).onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = function() {
            callback();
          };
        }
      }
      script.src = url;

      if (toBody) {
       document.body.appendChild(script);
    } else {
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }

      /**
     * 动态加载CSS
     * @param {string} url 样式地址
     */
    public static LoadCss(url: string) {
      let head = document.getElementsByTagName('head')[0];
      let link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      head.appendChild(link);
    }

}
