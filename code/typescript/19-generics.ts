// 抽象类
export{} // 确保跟其他实例没有成员冲突

function CreateNumberArray<T>(length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value);
  return arr;
}

const res= CreateNumberArray<number>(3, 100);
