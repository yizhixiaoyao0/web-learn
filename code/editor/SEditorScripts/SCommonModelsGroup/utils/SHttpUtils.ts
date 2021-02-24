import axios, { AxiosRequestConfig } from 'axios';
import { DataMapperRules } from '../ServerModel';
import SPageDataMapperUtils from '../../SPageManages/mngs/SPageDataMapperUtils';

export default class SHttpUtils {
  public static get Inst(): SHttpUtils {
    if (this._inst == null) {
      this._inst = new SHttpUtils();
    }
    return this._inst;
  }


  // 配置设置
  // static InitAccessAllowOrigin() {
    // Vue.prototype.$axios = axios;
    // axios.defaults.baseURL = '/_replace'
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // Vue.config.productionTip = false;
    //     axios.interceptors.request.use((request:AxiosRequestConfig) => {
    //       request.url =  request.url.replace("/_base","http://localhost:63409/api");
    //       console.log(request);
    //       return request;
    //     });
  // }


  /**
   * 请求HttpGet
   * @private
   * @static
   * @template T 指定类型
   * @template RETURN 指定返回类型
   * @param {string} fullUrl 完整的url
   * @param {string} [prop=""] 返回对象的点属性(只支持一级)比如res
   * @param {AxiosRequestConfig} [config] 请求配置
   * @param {boolean} [forceByReturnStruct=true] 是否强制返回指定返回类型的数据结构,默认为true (就算源数据没有此属性,也会返回完整的返回类型的数据结构)
   * @param {{new(): RETURN}} [createT=null] 传入的返回类型,直接传入class类型,注意class内的属性都要有初始值,否则会创建不了没有赋值初始值的属性
   * @param {DataMapperRules} [rules] Data属性mapper规则
   * @returns {Promise<RETURN>} 返回指定数据类型
   * @memberof SHttpUtils
   */
  public static RequestByGet(
    comInstId: string,
    fullUrl: string, prop: string = '',
    config?: AxiosRequestConfig,
    forceByReturnStruct: boolean = true,
    createT: new() => any = null,
    rules?: DataMapperRules): Promise<any> {
    return this._RequestByGetAndReturnStruct<any, any>(comInstId, false, fullUrl, prop, config, forceByReturnStruct, createT, rules);
  }

  /**
   * HttpGet并指定返回类型Array<T>
   *
   * @private
   * @static
   * @template T 指定类型
   * @template RETURN 指定返回类型
   * @param {string} fullUrl 完整的url
   * @param {string} [prop=""] 返回对象的点属性(只支持一级)比如res
   * @param {AxiosRequestConfig} [config] 请求配置
   * @param {boolean} [forceByReturnStruct=true] 是否强制返回指定返回类型的数据结构,默认为true (就算源数据没有此属性,也会返回完整的返回类型的数据结构)
   * @param {{new(): RETURN}} [createT=null] 传入的返回类型,直接传入class类型,注意class内的属性都要有初始值,否则会创建不了没有赋值初始值的属性;如果这里为null,forceByReturnStruct的设置会无效;
   * @param {DataMapperRules} [rules] Data属性mapper规则
   * @returns {Promise<RETURN>} 返回指定数据类型
   * @memberof SHttpUtils
   */
  public static RequestByGetAndReturnArrayT<T>(
    comInstId: string,
    fullUrl: string, prop: string = '',
    config?: AxiosRequestConfig,
    forceByReturnStruct: boolean = true,
    createT: new() => T = null,
    rules?: DataMapperRules): Promise<T[]> {
    return this._RequestByGetAndReturnStruct<T, T[]>(comInstId, true, fullUrl, prop, config, forceByReturnStruct, createT, rules);
  }

  /**
   * HttpGet并指定返回类型T
   *
   * @private
   * @static
   * @template T 指定类型
   * @template RETURN 指定返回类型
   * @param {string} fullUrl 完整的url
   * @param {string} [prop=""] 返回对象的点属性(只支持一级)比如res
   * @param {AxiosRequestConfig} [config] 请求配置
   * @param {boolean} [forceByReturnStruct=true] 是否强制返回指定返回类型的数据结构,默认为true (就算源数据没有此属性,也会返回完整的返回类型的数据结构)
   * @param {{new(): RETURN}} [createT=null] 传入的返回类型,直接传入class类型,注意class内的属性都要有初始值,否则会创建不了没有赋值初始值的属性;如果这里为null,forceByReturnStruct的设置会无效;
   * @param {DataMapperRules} [rules] Data属性mapper规则
   * @returns {Promise<RETURN>} 返回指定数据类型
   * @memberof SHttpUtils
   */
  public static RequestByGetAndReturnT<T>(
    comInstId: string,
    fullUrl: string, prop: string = '',
    config?: AxiosRequestConfig,
    forceByReturnStruct: boolean = true,
    createT: new() => T = null,
    rules?: DataMapperRules)
  : Promise<T> {
    return this._RequestByGetAndReturnStruct<T, T>(comInstId, false, fullUrl, prop, config, forceByReturnStruct, createT, rules);
  }


  /**
   * 请求HttpPost
   */
  public static RequestByPost(comInstId: string, fullUrl: string, prop: string = '', data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this._RequestByPostAndReturnStruct<any, any>(comInstId, fullUrl, prop, data, config, true, null);
  }

  public static RequestByPostAndReturnT<T>(comInstId: string, fullUrl: string,  prop: string = '', data?: any, config?: AxiosRequestConfig, rules?: DataMapperRules): Promise<T> {
    return this._RequestByPostAndReturnStruct<T, T>(comInstId, fullUrl, prop, data, config, true, null, rules );
  }
  private static _inst: SHttpUtils;

  /**
   * 请求HttpGet并指定返回结构
   *
   * @private
   * @static
   * @template T 指定类型
   * @template RETURN 指定返回类型
   * @param {string} fullUrl 完整的url
   * @param {string} [prop=""] 返回对象的点属性(只支持一级)比如res
   * @param {AxiosRequestConfig} [config] 请求配置
   * @param {boolean} [forceByReturnStruct=true] 是否强制返回指定返回类型的数据结构,默认为true (就算源数据没有此属性,也会返回完整的返回类型的数据结构)
   * @param {{new(): RETURN}} [createT=null] 传入的返回类型,直接传入class类型,注意class内的属性都要有初始值,否则会创建不了没有赋值初始值的属性;如果这里为null,forceByReturnStruct的设置会无效;
   * @param {DataMapperRules} [rules] Data属性mapper规则
   * @returns {Promise<RETURN>} 返回指定数据类型
   * @memberof SHttpUtils
   */
  private static _RequestByGetAndReturnStruct<T, RETURN>(
    comInstId: string,
    returnIsArr: boolean,
    fullUrl: string, prop: string = '',
    config?: AxiosRequestConfig,
    forceByReturnStruct: boolean = true,
    createT: new() => any = null,
    rules?: DataMapperRules,
    ): Promise<RETURN> {


    return new Promise((fulfill, reject) => {

        if (fullUrl == null) {
          return ;
        }

        axios.get(fullUrl, config)
          .then((response) => {
              let resp = response.data.res;
              let fromData = resp;
              if (prop !== '') {
                  fromData = resp[prop];
              }

              // 如果返回数组（表示数据源也是数组）
              if (returnIsArr) {
                let returnArr: any = [];
                fromData.forEach((element: any) => {
                    let returnData = SPageDataMapperUtils.Inst.ProduceDataFromObj(createT, element, comInstId, rules, forceByReturnStruct);
                    if (returnData != null) {
                      returnArr.push(returnData);
                    }
                });
                fulfill(returnArr as RETURN);

              } else {
                let returnData = SPageDataMapperUtils.Inst.ProduceDataFromObj<any, RETURN>(createT, fromData, comInstId, rules, forceByReturnStruct);
                fulfill(returnData);
              }

          }).catch((error) => {
              console.error('Http Get 请求出错! url:' + fullUrl);
              console.error(error);
              reject(error);
          });
    });
  }

  /**
   * 请求HttpPost并指定返回结构
   *
   * @private
   * @static
   * @template T 指定类型
   * @template RETURN 指定返回类型
   * @param {string} fullUrl 完整的url
   * @param {string} [prop=""] 返回对象的点属性(只支持一级)比如res
   * @param {AxiosRequestConfig} [config] 请求配置
   * @param {boolean} [forceByReturnStruct=true] 是否强制返回指定返回类型的数据结构,默认为true (就算源数据没有此属性,也会返回完整的返回类型的数据结构)
   * @param {{new(): RETURN}} [createT=null] 传入的返回类型,直接传入class类型,注意class内的属性都要有初始值,否则会创建不了没有赋值初始值的属性;如果这里为null,forceByReturnStruct的设置会无效;
   * @param {DataMapperRules} [rules] Data属性mapper规则
   * @returns {Promise<RETURN>} 返回指定数据类型
   * @memberof SHttpUtils
   */
  private static _RequestByPostAndReturnStruct<T, RETURN>(
    comInstId: string,
    fullUrl: string,
    prop: string = '',
    data?: any,
    config?: AxiosRequestConfig,
    forceByReturnStruct: boolean = true,
    createT: new() => any = null,
    rules?: DataMapperRules): Promise<RETURN> {

    return new Promise((fulfill, reject) => {

        if (fullUrl == null) {
          return ;
        }

        axios.post(fullUrl, data, config)
          .then((response) => {
              let resp = response.data;
              let fromData = resp;
              if (prop !== '') {
                  fromData = resp[prop];
              }
              let returnData = SPageDataMapperUtils.Inst.ProduceDataFromObj<any, RETURN>(createT, fromData, comInstId, rules, forceByReturnStruct);
              fulfill(returnData);

          }).catch((error) => {
              console.error('Http Post 请求出错! url:' + fullUrl);
              console.error(error);
              reject(error);
          });
    });
  }

  // static RequestByPostAndReturnArrayT<T>(fullUrl:string,data?:any,prop:string = "",config?: AxiosRequestConfig) : Promise<Array<T>> {
  //   return this._RequestByPostAndReturnStruct<T,Array<T>>(fullUrl,data,prop,config);
  // }






}
