function promiseAll(arr: any) {
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
            reslove(res);
          }
        })
        .catch((re) => {
          return reject(re);
        });
    }
  });
}
