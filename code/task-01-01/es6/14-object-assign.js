const surce1 = {
  a: 123,
  b: 234
};

const surce2 = {
  b: 123,
  d: 234
};

const target = {
  a: 123,
  c: 234
};

const result = Object.assign(target, surce1, surce2);

console.log(result);

console.log(result === target);