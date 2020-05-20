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


function * main() {
  const users = yield ajax('');
  console.log(users);
  const users2 = yield ajax('');
  console.log(users2);
}

const g= main();

const result = g.next();

result.value.then(data => {
  const result = g.next(data);
  if (!result.done) {
    result.value.then(value => {
      g.next(value);
    }, error => {
      console.lof(error);
    })
  }
})

function handleResult(result) {
  if (result.done) return 
  result.value.then(value => {
    handleResult(result.next(value))
  }, error => {
    console.lof(error);
  })
}

handleResult(g.next());


function co(generator) {
  const g = generator();

  function handleResult(result) {
    if (result.done) return 
    result.value.then(value => {
      handleResult(result.next(value))
    }, error => {
      console.lof(error);
    })
  }
  handleResult(g.next());
}

co(main)