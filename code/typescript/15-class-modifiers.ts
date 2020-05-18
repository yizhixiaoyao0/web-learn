export {}

class Person {
  public name: string = '';
  private age:number = 0;
  // 只允许在子类访问,允许继承
  protected readonly gender: boolean
  constructor(name: string, age: number) {
    // 给属性做类型标注
    this.name = name;
    this.age = age;
    this.gender = false;
  }

  sayHi(msg: string): void {
    console.log(this.name, msg);
  }
}

class Student extends Person {
  // 不允许实例化不允许访问
  private constructor(name: string, age: number) {
    super(name, age);
    console.log(this.gender);
  }

  static create(name: string, age: number) {
    return new Student(name, age);
  }
}

const tom = new Person('tom', 12);
console.log(tom.name);