// 函数组合

function compose(f, g) {
  return function(value) {
    return f(g(value));
  }
}

const  reverse = function(array) {
  return array.reverse();
}

const first = function(array) {
  return array[0];
}

const last = compose(first, reverse);

console.log(last);