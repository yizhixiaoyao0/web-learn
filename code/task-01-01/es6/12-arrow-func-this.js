const person = {
  name: 'tom',

  sayhi() {
    console.log(this.name);
  },

  sayhi2: () => {
    console.log(this.name);
  },

  sayhiAsync: function() {
    // setTimeout(function() {
    //   console.log(this.name);
    //   // undefined, 此时回调函数会在全局调用， this指向全局
    // }, 1000);

    setTimeout(() => {
      console.log(this.name);
      // this始终指向当前作用域的this
    }, 1000);
  }
}

person.sayhi();