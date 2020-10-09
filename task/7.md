1. vue3.0 性能提升主要通过哪几个方面

  1. 响应式系统升级

    * vue.JS 3.0 中使用proxy对象重写响应式系统

      - 可以监听动态新增的属性

      - 可以监听删除的属性

      - 可以监听数组的索引和length属性

  2. 编译优化

      * vue.js 2.x 中通过标记静态根节点， 优化diff的过程

      * vue.js 3.0中标记和提升所有的静态根节点， diff的时候只需要对比动态节点内容

        - fragments（升级vetur插件）

        - 静态提升

        - patch flag

        - 缓存事件处理函数

  3. 源码体积的优化

    * Vue.js 3.0 中移除了一些不常用的api

      - 例如： inline-template、filter等

    * Tree-shaking

      - 按需引入

2. Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

  * Option API

    - 包含一个描述组件选项（data, methods、 props等) 的对象

    - Options API 开发复杂组件， 同一个功能逻辑的代码被拆分到不同选项
  
  * Composition API

    - 一组基于函数的API

    - 可以更灵活的组织组件的逻辑


3. Proxy 相对于 Object.defineProperty 有哪些优点？

  * proxy对象实现属性监听

  * 多层属性嵌套，在访问属性的过程中处理下一级属性

  * 默认监听动态添加的属性

  * 默认监听属性的删除操作

  * 默认监听数组索引和length属性
  

4. Vue 3.0 在编译方面有哪些优化？

  * vue.js 3.0中标记和提升所有的静态根节点， diff的时候只需要对比动态节点内容

    - fragments（升级vetur插件）

    - 静态提升

    - patch flag

    - 缓存事件处理函数

5. Vue.js 3.0 响应式系统的实现原理？  

  使用Proxy 来实现数据劫持， 设置get/set/defineProperty,
  在get中使用track来收集依赖，track为targetMap设置depsMap和dep， 如果下一级是对象，则继续设置为proxy代理的对象；
  在set中设置改变的值并触发dep中存储的effect方法。

