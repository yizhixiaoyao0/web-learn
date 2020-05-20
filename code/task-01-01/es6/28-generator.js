// function * foo() {
//   console.log('zc');
//   return 100
// }

// const result = foo();
// console.log(result);

function * foo() {
  console.log('111');
  yield 100
  console.log('222');
  yield 200
}

const result = foo();
console.log(result.next());
console.log(result.next());
console.log(result.next());

function * createIdMaker() {
  let id = 1;
  while(true) {
    yield id++
  }
}

const idMaker = createIdMaker();


console.log(idMaker.next().value);


const obj = {
  life: ['吃个饭', '洗澡'],
  learn: ['语文', 's数学'],
  [Symbol.interator]: function * () {
    const arr = [...this.life, ...this.learn];
    for(item of arr) {
      yield item
    }
  }
}