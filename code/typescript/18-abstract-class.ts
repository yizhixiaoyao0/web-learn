// 抽象类
export{} // 确保跟其他实例没有成员冲突

abstract class Animal {
  eat(food: string): void {
    console.log(food);
  }
  abstract run (distance:number): void
}

class Dog extends Animal {
  run(distance: number): void {
    throw new Error("Method not implemented.");
  }
}
