### 模块一

1. 最终输出的结果， 并解释为什么？

    ```
    var a = [];
    for(var i = 0; i < 10; i++) {
      a[i] = function() {
        console.log(i);
      }
    }
    a[6]();   // 结果为 9

    // var声明的变量在全局作用域下， a[6]()执行的时候i已经在for循环完成之后变为9;

    ```

2. 最终输出的结果， 并解释为什么？

    ```
    var temp = 123;

    if (true) {
      console.log(temp);   
      // 报错 
      // 进入temp的块级作用域，临时死区开始， 变量被认为未被初始化
      let temp;
    }

    ```

3. 结合es6新语法，用最简单的方式找出数组中的最小值；

    ```
    var arr = [12,34,32,89,4];

    
    console.log(Math.min(...arr));

    ```

4. 请详细说明var 、let、 const 三种声明变量方式之间的具体差别。

    let/const与var的区别：

        1. 可用来声明块级作用域下的变量；
        2. 不会存在变量提升， 存在临时死亡区的约束，因此不能先使用后声明；
        3. 不能重复声明；
         
    const与var的区别： 

        const用来定义常量/衡量， 声明的时候必须赋值， 且后续不能进行修改，这里说的修改是指不能修改内存地址；
    

5. 最终输出的结果， 并解释为什么？
    ```
    var a = 10;
    var obj = {
      a: 20,
      fn() {
        setTimemout(() => {
          console.log(this.a);
        })
      }
    }
    obj.fn()  // 打印值为20
    //  obj.fn()执行，是obj对象调用，此时fn内部this指向obj， 而setTimemout函数内部的回调函数为箭头函数，箭头函数本身是没有this的，不会改变this的指向。此时this指向他的上一层的指向也就是obj；
    ```

6. symbol类型的用途。

   1. 作为对象的属性和方法，模拟对象的私有化;

   2. 作为类型的私有属性，防止定义的冲突和外部访问；

   3. 定义常量；

   4. 修改js的某些行为；

7. 什么是浅拷贝，什么是深拷贝。

    浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存, 它会创建一个新对象，这个对象有着原始对象属性值一样的值。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址，如果其中的一个对象改变了地址，就会影响到原来的对象，即默认拷贝构造函数只是对对象进行浅拷贝复制，只复制对象空间不复制资源；
    浅拷贝的实现一般有

        1. Object.assign();当object只有一层时是深拷贝；
        2. Array.prototype.concat()；
        3. Array.prototype.slice();

    深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会影响到原对象。深拷贝的实现一般有

        1. JSON.parse(JSON.stringify())；
        2. 手写递归方法；
        3. lodash.cloneDeep();

8. 如何理解js异步编程的，Eventloop是做什么的，什么是宏任务，什么是微任务。

    1. eventloop 用来监听调用栈和消息队列，当调用栈任务结束，时间循环就会从回调队列中取出第一个任务压入调用栈；

    2. 宏任务就是回调队列中的任务，依次排队执行；

    3. 微任务通常来说就是需要在当前任务执行结束后立即执行的任务；


9. 将下面异步代码使用Promise改进

    ```
    setTimeout(function() {
      var a = 'hello';
      setTimeout(function() {
        var b = 'lagou';
        setTimeout(function() {
          var c = 'IU';
          console.log(a+b+c);
        }, 10)
      }, 10)
    }, 10)

    // promise
    const promise = new Promise(function(resolve, reject) {
      resolve('hello');
    })

    promise.then(function(value) {
      return value + 'lagou'
    }).then(function(value) {
      console.log(value + 'IU');
    })

    ```
10. 请简述Typescript与Javascript之间的关系。

    TS和JS都是ES的具体实现，而TS是JS的语法超集，在JS的基础上添加了一套完整的类型系统，以及一些扩展的方法，TS最终会被编译成JS，然后被执行；

11. 请谈谈你所认为的Typescript优缺点。

    优点：
      * 完善的静态类型检查系统，在开发时就能给出编译错误，作为强类型语言，可以明确数据类型，代码可读性较强，便于后期修改或重构代码；

      * TS支持最低到es3，兼容性较强，任何JS可以运行的环境都支持TS;

      * 原生的一些JS代码也能在TS中运行，上手较容易；

      * 生态社区健全；
    
    缺点： 
      * TS需要编译才能变成JS代码；

      * 添加第三方模块需要添加对应类型声明或者下载相关声明文件；

      * TS语言本身添加了一些概念；





 