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

ajax('../api/user.json').then(function(value) {
  console.log(value);
}, function(error) {
  console.log(error);
})

ajax('../api/user.json').then(function(value) {
  console.log(value);
}).then(undefined, function(error) {
  console.log(error);
})

ajax('../api/user.json').then(function(value) {
  console.log(value);
}).catch(function (error){
  console.log(error)
})

window.addEventListener('unhandledrejection', event => {
  const {reason, promise} = event;
  // reason  promise失败的原因
  // promise 出现异常的promise对象

  event.preventDefault();
}, false)