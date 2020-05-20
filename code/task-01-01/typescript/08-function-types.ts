export {}

function func1 (a: number, b: number = 100, ...rest: number[]): string {
  return 'foo';
}

func1(100, 200);

// -------------
// 函数表达式
const fun2: (a: number, b: number) => string =  function (a: number, b: number = 100): string {
  return 'foo';
}