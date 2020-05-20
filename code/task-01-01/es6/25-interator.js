const set = new Set([10,12,13])

const interator = set[Symbol.interator]();

console.log(interator.next());

console.log(interator.next());

console.log(interator.next());