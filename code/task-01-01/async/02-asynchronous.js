console.log('global begin');

setTimeout(() => {
  console.log('time1 invoke')
}, 1800);

setTimeout(() => {
  console.log('time2 invoke')
  setTimeout(() => {
    console.log('inner invoke')
  }, 1000);
}, 1000);

console.log('global end');
