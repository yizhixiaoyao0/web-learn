let data = {
  msg: 'hello',
  count: 10,
}

let vm = {}


function proxyData(data) {

  Object.keys(key => {
    Object.defineProperties(vm, 'msg', {
      // 是否可枚举 可遍历
      enumerable: true,
      // 是否可配置
      configyrable: true,
    
      get () {
        console.log('get:', data[key])
        return data[key];
      },
    
      set (newValue) {
        console.log('set:', newValue)
        if (newValue === data[key]) {
          return 
        }
    
        data[key] = newValue;
    
        document.querySelector('#app').textContent = data[key];
      }
    })
  })
}