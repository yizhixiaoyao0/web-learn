// 数组的结构

const arr = [100, 200, 300];

// const [foo, bar, baz] = arr;

// const [ , , baz] = arr;

// const [foo, ...rest] = arr;
// // 只能在最后结构位置的最后一个成员

// console.log(rest);

const [foo] = arr;
// 从前往后提取

console.log(foo);


const [foo, bar, baz, more] = arr;

console.log(more);  // undefined

const [foo, bar, baz, more = 'default'] = arr;

console.log(more);  // default

const path = '/foo/bar';

const [, dir] = path.split('/');

console.log(dir);

