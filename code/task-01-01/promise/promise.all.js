function promiseAll(arr) {
  let array = Array.from(arr);
  let resloveNum = 0;
  let len = array.length;
  let res = new Array(len);
  return new Promise((reslove, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(array[i])
        .then((r) => {
          res[i] = r;
          resloveNum++;
          if (resloveNum === len) {
            reject(res);
          }
        })
        .catch((re) => {
          resloveNum++;
          console.log(resloveNum);
          return reject(re);
        });
    }
  });
}

promiseAll([1, 2, 3]);
