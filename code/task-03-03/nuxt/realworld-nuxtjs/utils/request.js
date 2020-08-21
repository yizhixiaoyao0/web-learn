import axios from "axios";

const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 请求失败（此时请求还未发出去）
    return Promise.reject(error);
  }
);

// 响应拦截器

export default request;
