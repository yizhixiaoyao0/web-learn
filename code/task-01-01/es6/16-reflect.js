const person = {
  name: 123,
  age: 234
};

const personProxy = new Proxy(person, {
  get(targrt, property) {
    console.log(targrt, property);
    return Reflect.get(targrt, property);
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

console.log('name' in obj);
console.log(delete obj['age']);
console.log(Object.keys(obj));

console.log(Reflect.has(obj, 'name'));
console.log(Reflect.deleteProperty(obj, 'name'));
console.log(Reflect.ownKeys(obj));
