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


async function main() {
  const users = await ajax('');
  console.log(users);
  const users2 = await ajax('');
  console.log(users2);
}
