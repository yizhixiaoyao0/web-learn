var num = 20;

const obj = {
  num: 10,
  func: (num) => {
    // 箭头函数，this指向函数声明时所在环境的this
    // 浏览器指向window, node 指向export
    this.num += 5;
    console.log(this.num);
    num += 5;

    // var num = 30 变量提升，到当前作用域顶部， 然后被传入的参数赋值为40
    console.log(num);
    // 45
    var num = 30;
    return function() {
      // 函数直接被执行
      // this 浏览器被指向window node指向global
      // 浏览器 29
      // node NaN
      this.num += 4;
      console.log(this.num);
      // num 沿着作用域链找到30
      num += 10;
      console.log(num);
    }
  }
}

obj.func(40)();