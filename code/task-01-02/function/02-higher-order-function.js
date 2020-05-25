// 高阶函数 --- 函数作为返回值


function makeFn() {
  let msg = 'hello';

  return function  () {
    console.log(hell);
  }

}

makeFn()();

// 例如支付 仅被执行一次
function once(fn) {
  let done = false;
  return function() {
    if (!done) {
      done = true;
      return fn.apply(this, arguments)
    }
  }
}

let pay = once(function(money) {
  console.lof(`支付了${money}`);
})

pay(5)