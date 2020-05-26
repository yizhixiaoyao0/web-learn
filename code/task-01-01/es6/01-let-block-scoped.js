// if (true) {
//   let foo = 'foo';
// }

// console.log(foo);

// for(var i = 0; i < 3; i++) {
//   for(var i = 0; i < 3; i++) {
//     console.log(i);
//   }
// }


// for(let i = 0; i < 3; i++) {
//   for(let i = 0; i < 3; i++) {
//     console.log(i);
//   }
// }

// -------------------------------------------

// var element = [{}, {}, {}];
// for(var i = 0; i < element.length; i++) {
//   element[i].onclick = (function (i) {
//     console.log(i);
//   })(i)
// }

// element[2].onclick();

// for(let i = 0; i < 3; i++) {
//   let i = 'foo';
//   console.log(i)
// }

// let i = 0;
// if (i < 3) {
//   let i = 'foo';
//   console.log(i)
// }
// i++

// if (i < 3) {
//   let i = 'foo';
//   console.log(i)
// }

// i++


var a = [];

for(var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}

a[6]();


