class Observer {
  constructor(data) {
    this.wlak(data)
  }
  // 遍历对象所有属性
  wlak(data) {
    // 1. 判断data是否是对象
    if(!data || typeof data !== 'object') {
      return false;
    }
    // 2. 遍历data中的所有属性
    Object.keys(data).forEach(key => {
      this.definedReactive(data, key, data[key]);
    })
  }

  definedReactive(data, key, value) {
    let that = this;
    // 负责收集依赖， 并发送通知
    let dep = new Dep();
    // 如果value 是对象，把value 内部的属性也转换为响应式数据
    this.wlak(value);
    Object.defineProperties(data, key, {
      enumerable: true,
      configurable: true,
      get () {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if(newValue === value) {
          return 
        }
        data[key] = newValue;
        that.wlak(newValue);
        dep.notify()
      }
    })
  }
}