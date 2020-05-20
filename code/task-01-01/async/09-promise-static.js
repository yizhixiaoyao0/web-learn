function ajax(url) {
  return new Promise(function(reslove, reject) {
    foo();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (this.status === 200) {
        reslove(this.response)
      }else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send();
  })
}

Promise.resolve('foo')
.then(function(value) {
  console.log(value);
})

const promise = ajax('/api/user.json');
var promise2  = Promise.resolve(promise);

console.log(promise2 === promise);

// 带有then方法的对象实现了thenable的接口
Promise.resolve({
  then: function(onFulfilled, onRejected) {
    onFulfilled('foo');
  }
})

// 快速创建一定是失败的方法
Promise.reject(new Error('rejected'))
.catch((error) => {
  console.log(error);
})