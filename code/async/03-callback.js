
function foo(callback) {
  setTimeout(() => {
    callback();
  }, 3000);
}

foo(function() {
  console.log('这就是回调函数');
})
