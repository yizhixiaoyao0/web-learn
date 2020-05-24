// folktale

const { compose, curry } = require('folktale');
const {toUpper, first } = require('lodash');

let r = curry((x, y) => x + y, 2);

console.log(r(1,2));

let f = compose(toUpper, first);

console.log(f(['hello', 'guys']));


