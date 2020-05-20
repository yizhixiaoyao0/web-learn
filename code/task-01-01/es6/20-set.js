const s = new Set();
s.add(1).add(2);

console.log(s.size())
console.log(s.has(1));
console.log(s.delete(1));
s.clear();

const arr = [1,2,3,4];

const result = Array.from(new Set(arr));

const result1 = [...new Set(arr)];