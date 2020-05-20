/// class 关键词

function Person(name) {
  this.name = name;
}

Person.prototype.say = function() {
  console.log('hi')
}

class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(this)
  }
}

const p = new Person('tom');