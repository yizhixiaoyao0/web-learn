const fp = require('lodash/fp');

// 代码题1
const cars = [{
  name: '1',
  horsepower: 1,
  dollar_value: 1,
  in_stock: true,
}, {
  name: '2',
  horsepower: 2,
  dollar_value: 2,
  in_stock: false,
}]


// 代码1-1
const isLastInStock = fp.flowRight(fp.prop('in_stock') ,fp.last);

console.log(isLastInStock(cars));

// 代码1-2
const isFirstInStock = fp.flowRight(fp.prop('name') ,fp.first);

console.log(isFirstInStock(cars));

// 代码1-3
let _average = (xs) => fp.reduce(fp.add, 0, xs) / xs.length;

let averaDollarValue = function(cars) {
  const res = fp.flowRight(_average, fp.map((car) => car.dollar_value))
  return res(cars);
}

console.log(averaDollarValue(cars));

// 代码1-4
let _underscore = fp.replace(/\W+/g, '_')

const saniyizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower)));

console.log(saniyizeNames(['Hello World', 'SS ss']))


// 代码题 2
class Container {
  static of (value) {
    return new Container(value);
  }

  constructor(value) {
    this._value = value;
  }

  map (fn) {
    return Container.of(fn(this._value));
  }
}

class Maybe {
  static of (x) {
    return new Maybe(x);
  }

  constructor(value) {
    this._value = value;
  }

  map (fn) {
    return this.isNothing() ? this : Container.of(fn(this._value));
  }

  isNothing() {
    return this._value === null || this._value === undefined;
  }
}

// 代码2-1
let maybe = Maybe.of([5, 6, 1]);

let exl = (y) => maybe.map(fp.map(fp.add(y)));

console.log(exl(2), 'exl')

// 代码2-2
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so']);

let ex2 = xs.map(fp.first);

console.log(ex2, 'ex2')

// 代码2-3
let safeProp = fp.curry((x, o) => Maybe.of(o[x]));

let user = {id: 2, name: 'Albert'};

let ex3 = safeProp('name')(user).map(fp.first);

console.log(ex3, 'ex3');

// 代码2-4 
// let ex4 = function(n) {
//   if (n) {return parseInt(n)};
// }

let ex4 = (n) => Maybe.of(n).map(parseInt)._value;
console.log(ex4('1'))

