export{}

class Person {
  name: string = '';
  age:number = 0;
  constructor(name: string, age: number) {
    // 给属性做类型标注
    this.name = name;
    this.age = age;
  }

  sayHi(msg: string): void {
    console.log(this.name, msg);
  }
}