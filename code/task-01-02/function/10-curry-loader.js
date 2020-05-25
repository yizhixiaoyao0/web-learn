// 柯里化

const _ = reuqire('lodash');


const match = _.curry(function (reg, str) {
  str.match(reg);
})

const num = match(/\d+/);

num('');