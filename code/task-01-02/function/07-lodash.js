const _ = require('lodash');

const arr = [1, 2, 3, 4];

console.log(_.first(arr));


console.log(_.last(arr));

console.log(_.reverse(arr));

console.log(_.reverse(arr));

const r = _.forEach(arr, (item, index) => {
  console.log(item, index);
})

