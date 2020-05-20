setTimeout(() => {
  console.log('settimeout')
}, 0);

Promise.resolve()
.then(value => {
  console.log(promise)
}).then(value => {
  console.log(promise)
}).then(value => {
  console.log(promise)
})

console.log('global end');