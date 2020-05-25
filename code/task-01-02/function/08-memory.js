// const _ = require('lodash');

function getArea(r) {
  return Math.PI * r * r;
}

// let getAreaWithMe = _.memoize(getArea);

// console.log(getAreaWithMe(4));

// console.log(getAreaWithMe(4));


// console.log(getAreaWithMe(4));

function memoize(f) {
  let cache = {}
  return function() {
    let key = JSON.stringify(arguments)
    cache[key] = cache[key] || f.apply(f, arguments);
    return cache[key];
  }
}

memoize(getArea(4))