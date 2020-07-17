# vue 03-01

1. 当我们点击按钮的时候动态给data增加的成员是否是响应式数据， 如果不是的话， 如果把新增成员设置成响应式数据， 他的内部原理是什么

    ```js
    let vm = new Vue({
    el: '#el'
    data: {
      o: 'object',
      dog: {}
    },
    method: {
      clickHandler () {
      // 该 name 属性是否是响应式的
      this.dog.name = 'Trump'
      }
    }
    })
    
    ```

    当前 this.dog.name 不是响应式的，我们可以通过`this.$set(this.dog, 'name', 'Trump')` 来实现响应式， 他的内部就是通过调用`Object.defineproperty`将当前的属性转换为getter和setter来实现响应式。



2. 简述diff算法的执行过程

    diff 算法是找同级别的子节点依次比较， 然后再找下一级别的节点比较， 这样的算法时间复杂度为O(n)：

      * 在进行同级别节点比较的时候， 首先会对新老节点数组的开始和结尾设置标记索引， 比那里的过程中移动索引

      * 在对开始和结束节点比较的时候有四种情况
          
          - `oldStartVnode/newStartVnode` (旧开始节点/新开始节点)

          - `oldEndVnode / newEndVnode` (旧结束节点/ 新结束节点)

          - `oldStartVnode / oldEndVnode` (旧开始节点/ 新结束节点)

          - `oldEndVnode / newStartVnode` (旧结束节点/ 新开始节点)
      
      * 开始节点和结束节点比较， 这两种情况类似
         
         - `oldStartVnode/newStartVnode` (旧开始节点/新开始节点)

         - `oldEndVnode / newEndVnode` (旧结束节点/ 新结束节点)

      * 如果oldStartVnode和newStartVnode是相同节点
         
         - 调用patchVnode() 对比和更新节点

         - 把旧开始和新开始索引往后移动， `oldEndVnode++ / newEndVnode++`
      
      * 如果oldStartVnode和newEndVnode是相同节点
         
         - 调用patchVnode() 对比和更新节点

         - 把oldStartVnode 对应的dom元素，移动到右边

         - 更新索引
      
      * 如果oldEndVnode和newStartVnode是相同节点

        - 调用patchVnode() 对比和更新节点

        - 把oldEndVnode对应的Dom元素，移动到左边

        - 更新索引
      
      * 如果不是以上四种情况：
        
        - 遍历新节点， 使用newStartNode的key在老节点中找相同节点

        - 如果没有找到，说明newStartNode是新节点

          - 创建新节点对应的dom元素， 插入到dom树中
        
        - 如果找到

           - 判断新节点和找到的老街店的sel选择器是否是想用

           - 如果不相同，说明节点被修改了， 重新创建对应的dom元素

           - 如果相同，吧eleToMove 对应的dom元素移动到左边

      * 循环结束
         
         - 当老节点的所有子节点先遍历完（oldstartIdn > oldEndIndx）， 循环结束

         - 新节点的所有子节点先遍历完（newstartIdn > newEndIndx）， 循环结束
      
      * 如果老节点的数组先遍历完， 说明新节点有剩余， 把剩余节点批量插入到右边

      * 如果新节点的数组先遍历完， 说明老节点有剩余， 把剩余节点删除
      

## 编程题

1. 模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

```js

let _Vue = null;

export default class VueRouter {

  static install(vue) {
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true

    _Vue = vue;

    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      }
    })

  }

  constructor(options) {
    this.options = options;
    this.routerMap = {};

    // 创建响应式对象
    this.data = _Vue.observable({
      current: '/'
    })
  }


  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }

  createRouteMap() {
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponents(Vue) {

    let self = this;
    Vue.component('router-link', {
      props: {
        to: String,
      },
      render(h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          pushHash(this.to);
          this.$router.data.current = this.to;
          e.preventDefault();
        }
      }
    });

    Vue.component('router-view', {
      render(h) {
        const component = self.routerMap[self.data.current];
        // h可以将dom元素转换为虚拟dom
        return h(component)
      }
    })
  }

  initEvent() {
    window.addEventListener('hashchange', () => {
      this.data.current = getHash();
      console.log(getHash(), 'this.data.current')
    })
  }
}

function getHash() {
  // 因为兼容性的问题，这里没有直接使用 window.location.hash
  // 因为 Firefox decode hash 值
  const href = window.location.href
  const index = href.indexOf('#')
  return index === -1 ? '/' : '/' + decodeURI(href.slice(index + 1))
}

// 添加一个hash
function pushHash(path) {
  window.location.hash = path
}

```

2. 在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

```js
class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    console.log(this.el, 'this.el')
    this.compile(this.el);
  }

  // 编译模板处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if(this.isTextNode(node)) {
        this.compileText(node)
      } else if(this.isElementNode(node)) {
        this.compileElement(node)
      }
      
      // 判断node节点是否有子节点，如果有子节点，递归调用compiler
      if(node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    })

  }

  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater'];
    updateFn && updateFn.call(this, node, this.vm[key], key);
  }

  // 处理v-text指令
  textUpdater(node, value, key) {
    node.textContent = value;
    console.log(node, value, key)
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    })
  }

  // v-model
  modelUpdater(node, value, key) {
    console.dir(node)
    node.value = value;
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    })

    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value;
    })
  }

  // v-html
  htmlUpdater(node, value, key) {
    node.innerHTML = value
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue;
    })
  }

  // v-on
  onUpdater(node, value, key) {
    node.onclick = value.bind(this.vm);
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue;
    })
  }

  // 编译元素节点，处理指令
  compileElement(node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    // 判断是否有指令
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2);

        let key = attr.value;

        console.log(attrName, 'key')

        this.update(node, key, attrName);

        new Watcher(this.vm, key, (newValue) => {

          this.update(node, key, attrName);
        })
      }
    })
  }

  // 编译文本节点，处理插值表达式
  compileText(node) {
    // 以对象的形式打印出来
    // console.dir(node)
    // {{msg}}
    let reg = /\{\{(.+?)\}\}/;

    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue;
      })
    }
  }


  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }

}
```


3. 参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：