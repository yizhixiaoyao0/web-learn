// promise 基本实例

const promise = new Promise(function(resolve, reject) {
  // 只能调用二者其一
  resolve(100) // 承诺达成；
  reject(new Error('promise rejected'));
})

promise.then(function(value) {
  console.log(value)
}, function(error) {
  console.log(error);
})