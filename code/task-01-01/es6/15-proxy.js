const person = {
  name: 123,
  age: 234
};

const personProxy = new Proxy(person, {
  get(targrt, property) {
    console.log(targrt, property);
    return property in target ? target[property] : 'default';
  },
  set(targrt, property, value) {
    console.log(targrt, property, value);
    if (property === 'age' && !Number.isInteger(value)) {
      throw Error('error');
    }
    target[property] = value;
  },
  defineProperty(target, property) {
    console.log(targrt, property);
    delete target[property]
  }
})

console.log(personProxy.name);

delete person[age];

const list = [];

const listProxy = new Proxy(list, {
  set(target, property, value) {
    target[property] = value;
  }
})

listProxy.push('100');