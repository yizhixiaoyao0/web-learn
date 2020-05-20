const cache = {}

// a.js =======================
cache['a'] = '';

// b.js =========================
cache['a'] = '123'

console.log(Symbol(123));

const name = Symbol();
const obj = {
  [name]: '123',
};
obj[Symbol()] = '123';
obj[Symbol()] = '456';

const obj = {
  [Symbol.toStringTag]: 'XObject',
  foo: 'normal',
}

console.log(Object.getOwnPropertySymbols(obj));