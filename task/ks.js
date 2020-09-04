// function red() {
//   console.log('red')
// } // 3秒
// function green() {
//   console.log('green')
// } // 1秒
// function yellow() {
//   console.log('yellow')
// } // 2秒


// function promise(fn) {
//     return  new Promise((resolve, reject) => {
//         fn(resolve)
//     })
// }
// function light() {
//     let lightOn = promise((resolve) => {
//         red();
//         setTimeout(() => {  
//             resolve()
//         }, 3000)
//     }).then(() => {
//         green();
//         return promise((resolve) => {
//             setTimeout(() => {  
//                 resolve()
//             }, 1000)
//         })
//     }).then(() => {
//         yellow(); 
//         setTimeout(() => {
//           light()
//         }, 2000)
//     })
// }

// light();

// var User = {
//      count:1,
//      action:{
//       getCount:function () {
//           return this.count
//           }
//     }
// }
// var getCount = User.action.getCount;
// //     setTimeout(function ()  {
// //     console.log("result 1",User.action.getCount())
// // })
// console.log("result 1",User.action.getCount())
// console.log("result 2",getCount())