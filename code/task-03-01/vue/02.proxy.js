let data = {
  msg: 'hello',
  count: 10,
}

let vm = new Proxy(data, {
  // 执行代理行为IDE函数

  // 当访问 vm 的成员执行
  get (target, key) {
    console.log('get:', target[key])
    return target[key];
  },

  set (target, key, newValue) {
    console.log('set:', newValue)
    if (newValue === target[key]) {
      return 
    }

    target[key] = newValue;

    document.querySelector('#app').textContent = target[key];
  }
})
