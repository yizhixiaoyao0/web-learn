// 柯里化

function check(min) {
  return function(age) {
    return age > min;
  }
}

check(18)(20)