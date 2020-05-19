const ts = require("typescript");

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

// 等待所有任务结束才会结束
const promise = Promise.all([
  ajax(''),
  ajax('')
])

promise.then(value => {
  console.log(value)
})

ajax('/api/urls.json')
.then(function(value) {
  const urls = Object.values(value);
  const tasks = urls.map(url => ajax(url))
  return Promise.all(tasks);
})
.then(value => {
  console.log(value);
})

const requst = ajax('');

const time = new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject(new Error('reject'))
  }, 500);
})

Promise.race([
  requst,
  time
])
.then(value => {
  console.lof(value);
}).catch(error => {
  console.log(error)
})