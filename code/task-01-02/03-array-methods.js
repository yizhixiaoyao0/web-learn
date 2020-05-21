// 模拟常用的高阶函数

// map

const map = (array, fn) => {
  let result = [];

  for(let i of array) {
    result.push(fn(array[i]));
  }

  return result;
}

let arr = [1, 2, 3, 4];

// arr = map(arr, v => v * v);

// console.log(arr);

// every
const every = (array, fn) => {
  let result = true;

  for(let value of array) {
    if (!fn(value)) {
      result = fn(value);
      break
    };
  }

  return result;
}


// console.log(every(arr, v => v > 10));

// some
const some = (array, fn) => {
  let result = false;

  for(let value of array) {
    if (fn(value)) {
      result = fn(value);
      break
    };
  }

  return result;
}

console.log(some(arr, v => v % 2 === 0));


