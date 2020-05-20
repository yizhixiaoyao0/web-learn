
// 数组类型

export {}

const arr1: Array<number> = [1, 2, 3];
const arr2: number[] = [1, 2, 3];

// -----------------------

function sum(...args: number[]) {
  return args.reduce((prev, current) => prev+current, 0) 
}

sum(1, 2);