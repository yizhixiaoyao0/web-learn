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

// var permuteUnique = function (nums) {
//   let res = [];
//   let len = nums.length;

//   nums = nums.sort();

//   console.log(nums, "nums");

//   let dfs = (begin) => {
//     if (begin === len - 1) {
//       res.push(nums.slice());
//       console.log("sssss", nums);
//       return false;
//     }

//    let map = new Map();

//     for (let i = begin; i < len; i++) {
//       if (i !== begin && (nums[begin] === nums[i] || nums[i-1]==nums[i])) {
//         continue;
//       } else {
//         let s = ""+nums[begin]+""+nums[i];
//         if(map.has(s)){
//            continue;
//         } else{
//           map.set(s,1);
//         }
//         console.log(i, begin);
//         [nums[begin], nums[i]] = [nums[i], nums[begin]];
//         dfs(begin + 1);
//         [nums[begin], nums[i]] = [nums[i], nums[begin]];
//       }
//     }
//   };

//   dfs(0);

//   return res;
// };

// console.log(permuteUnique([2, 1, 1, 2]));
