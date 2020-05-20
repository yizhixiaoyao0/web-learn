class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(this)
  }
}

class Student extends Person {
  constructor(name) {
    super(name)
  }
}