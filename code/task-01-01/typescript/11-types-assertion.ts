export{}

const nums = [110, 120, 130];

const res = nums.find(i => i > 0);

const num1 = res as number;
const num2 = <number>res;  // jsx下不能使用
