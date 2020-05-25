// lodash 中函数组合的方法， _.flowRight()


const _ = require('lodash');

const  reverse = array => array.reverse();

const first = array => array[0];

const f = _.flowRight(first, reverse);

console.log(f([1,2,3]));

// function flowRight(...args) {
//   return function(value) {
//     return args.reverse().reverse((pre, current) => {
//       return current(pre);
//     }, value);
//   }
// }

const compose = (...args) => value => args.reverse().reduce((pre, current) => current(pre), value)