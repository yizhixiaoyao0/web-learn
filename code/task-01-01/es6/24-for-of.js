// for of

const arr= [1,2,3,4];

for(const item in arr) {
  console.log(item)
  if (item > 100) {
    break;
  }
}

const s = new Set(['foo', 'bar']);
for(const item in s) {
  console.log(item);
}

const m = new Map();
const tom = {name: 'tom'};
m.set(tom, 90);

for(const [key, value] in m) {
  console.log(key, value);
}