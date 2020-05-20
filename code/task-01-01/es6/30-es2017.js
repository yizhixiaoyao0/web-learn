const obj = {
  foo: 'foo'
}

console.log(Object.values(obj));

//==========================================

console.log(Object.entries(obj));

for(const [key, value] of Object.entries(obj)) {
  console.log(key, value)
}

console.log(new Map(Object.entries(obj)));


//==========================================

const p1 = {
  firstName: 'foo',
  get fullName() {
    return this.firstName + 'l';
  }
}
const descriptors = Object.getOwnPropertyDescriptors(p1);

const p2 = Object.defineProperties({}, descriptors);

p2.firstName = 'bar';

console.log(p2.fullName);


//==========================================


const book = {
  html: 5,
  css: 6
}

for(const [name, count] of Object.entries(book)) {
  console.log(`${name.padEnd(16, '-')}|${count.padEnd(3, '0')}`)
}


