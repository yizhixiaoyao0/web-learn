console.log('global begin');
function bar() {
  console.log('bar task');
}
function foo() {
  console.log('bar task');
  bar();
}
foo();
console.log('global end');