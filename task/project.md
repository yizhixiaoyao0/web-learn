#  前端框架


1. 基础框架 [**vue**](https://vuejs.org/) 2.* + [**typescript**](https://www.typescriptlang.org/)

2. 脚手架 **@vue/cli** : 3.*


3. ui框架 [**element-ui**](https://element.eleme.cn/#/zh-CN)


4. 代码检测工具，当前使用[**tslint**](https://palantir.github.io/tslint/), 但是tslint作者宣布不维护，推荐使用[**eslint**](https://eslint.org/)， 风格 standard


5. **sass/scss**, 两者一样，scss是sass3引入的新语法， 并且继承sass的功能， 解析：**node-sass、sass-loader**

6. node版本 **10.15.0**， 8.9.0以上皆可， 推荐**nvm**管理node版本切换

7. 依赖包安装工具  **Yarn**


9. 框架内部工具

    * vue全家桶 **vue** + **vue-router** + **vuex**

    * http请求 **axios**

    * 轮播 **swiper**

    * css自动添加前缀 **postcss**， 风格 postcss-salad

    * 添加组件脚本 **plop**， 模板自己编写  ： 组件名称大驼峰， 文件夹小驼峰

    * 单元测试 **jest**

    * 动画 **animejs**

10. 框架内部文件分布结构

```
├──@types  // ts模块类型申明
├── assets  // 资源目录 图片，样式，iconfont
├── config.js  // 项目配置，开关
├── directives  // 拓展指令集合
├── components // 公用组件
├── servers // 服务层
│   ├── helper
|   |   └── axiosHelper.ts
│   ├── goods
│   │   ├── requestApis.ts
│   │   └── translators.ts
│   ├── ...
├── sitescripts // 领域层
│   ├── taskManages
│   │   ├── taskController.ts
│   │   └── tasksModules.ts
│   ├── ...
├── kernel // 公用函数
│   └── TimeUtils.ts
├── routers // 路由
|   ├── index.ts  // 拦截器、创建
|   └── routers.ts // 路由数组
├── stores // vuex
└── views // 页面视图层
    ├── index
    │   ├── App.vue
    │   ├── components
    │   │   ├── nav.ts
    │   │   └── nav.scss
```
