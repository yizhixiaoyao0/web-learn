// 模拟lodash  curry 


function curry(fn) {
  return function curryFn(...arg) {

    if (arg.length < fn.length) {
      return function() {
        return curryFn(...arg.concat(Array.from(arguments)));
      }
    }
    return fn(...arg);
  }

}