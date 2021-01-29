// 模拟lodash  curry

function curry(fn) {
  return function curryFn(...arg) {
    if (arg.length < fn.length) {
      return function () {
        return curryFn(...arg.concat(Array.from(arguments)));
      };
    }
    return fn(...arg);
  };
}

function add(x, y) {
  return x + y;
}

curry(add);

function argsSum(args) {
  return args.reduce((pre, cur) => {
    return pre + cur;
  });
}
function add(...args1) {
  let sum1 = argsSum(args1);
  let fn = function (...args2) {
    let sum2 = argsSum(args2);
    return add(sum1 + sum2);
  };
  fn.toString = function () {
    return sum1;
  };
  return fn;
}

// function curry(fn) {
//   return function curryFn(...args) {
//     if (args.length >= fn.length) {
//       return fn.apply(null, ...args)
//     }
//     return function() {
//       retutn curryFn(args.concat(Array.from(arguments)))
//     }
//   }
// }

function sum(args) {
  return args.length > 0 ? args.reduce((pre, next) => pre + next) : 0;
}

function add(...args) {
  let sum1 = sum(args);
  let fn = function (...arg2) {
    sum1 += sum(arg2);
    return fn;
  };
  fn.toString = function () {
    return sum1;
  };
  return fn;
}
