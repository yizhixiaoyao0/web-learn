let _Vue = null;

export default class VueRouter {
  static install(Vue) {
    // 1. 判断插件是否已经被安装
    if(VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    // 2. 把vue构造函数记录到全局变量
  
    _Vue = Vue
    // 3. 把创建vue实例时候传入的router对象传入到vue实例
    // 混入
    _Vue.mixin({
      beforeCreate () {
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
    this.creatRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }

  creatRouteMap () {
    this.options.routes.forEach(route => {
      this.routeMap[route.apth] = route.component
    })
  }

  initComponents (Vue) {
    
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
          history.pushState({}, '', this.to);
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
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }


}