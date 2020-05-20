function ajax(url) {
  return new Promise(function(reslove, reject) {
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