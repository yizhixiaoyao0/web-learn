// 高阶函数- 函数作为参数

function forEach(array, fn) {
  for(let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
}

let arr = [12, 13, 14];

// forEach(arr, function(item) {
//   console.log(item);
// })

function filter(array, fn) {
  let result = [];
  for(let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

filter(arr, function(item) {
  return item % 2 === 0;
})


