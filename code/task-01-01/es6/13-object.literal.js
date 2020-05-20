const bar = 'sd';

const obj = {
  foo: 123,
  bar,
  methods() {
    console.log(this);
  },
  [Math.random()]: 123,
  [bar]: 123
}

console.log(obj);

obj.methods();