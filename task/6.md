1. 请简述 Vue 首次渲染的过程

    * vue初始化，實例成員以及静态成员，

    * 初始化完成后，调用vue的构造函数， 构造函数中调用this._init(), init函数 是vue的入口

    * `this._init()` 中调用了vm.$mount, $mount 函数有两个， src/platforms/web/entry-runtime-with-compiler.js 中的mount函数的核心作用是将模板编译成render函数， 其中会先判断有没有传递render选项， 没有传入会获取template选项，如果没有template，则会把el作为模板，然后`compilerToFuntion()` 生成render函数，存入`options.render`;

    * src/platforms/web/runtime/index.js 中的$mount 方法会重新获取el，调用src/core/instance/lifecycle.js 中的 `mountcomponent()`

    * `mountcomponent()` 首先会判断是否是render选项，如果没有传入render， 传入了模板，会发送警告，运行时版本不支持编译器， 接着触发beforeMount钩子函数，往下定义了updateComponent,  调用了render和update方法，render函数生成虚拟dom，update函数将虚拟dom转换成真实dom，挂载到dom树上，

    * 创建watch实例， 传入`updateComponent`函数，调用get方法，，在get中调用`updateComponent`。 调用render(用户传入或者模板编译生成的render)函数（调用vm.$creatElement()）， vm.$update() (调用_patch_,将虚拟转为真实挂载真实dom， 记录在vm.$el 中)

    * 触发mounted 钩子函数， 返回vue实例


2. 请简述 Vue 响应式原理

   * initState()初始化vue实例的状态 -> initDate() 将data属性注入到vm实例上-> oberve() 将data对象转换成响应式对象

   * observe(value)会判断value是否是对象， 如果不是直接返回， 如果是则判断value对象是否有_ob_， 如果有直接返回， 如果没有，创建observe对象， 返回 observe对象

   * observe的构造函数中会给value对象定义不可枚举的_ob_属性， 记录当前的observer对象

   * 数组的响应化处理，设置数组的几个特殊的方法（push、pop、sort等）， 这些方法会改变原数组，此时需要发送通知，发送通知需要找到数组对象的ob 对象，调用`dep.notify()`, 然后遍历数组每一个对象，调用observe对象， 如果成员是对象，也会把对象转换为相应式对象， 对象的相应化处理， 调用walk() 方法，walk内部就是遍历对象的所有属性，对每一个属性调用`defineReactive()`

   * `defineReactive()` 会为每一个属性创建dep对象， 如果当前属性的值是对象，调用observe， defineReactive核心是定义getter和setter， getter 中会为每一个属性收集依赖，返回属性的值，如果属性为对象，也要为子对象收集依赖， setter中会先保存新值，如果新值是对象， 调用observe，数据发生变化，发送通知 ，调用`dep.notify()`

   * 依赖收集，首先执行`watcher`对象的get方法， get方法中调用`pushTarget()`记录`Dep.target`属性, 访问data中的成员的时候会收集依赖， 属性对应的watcher对象添加到dep的subs数组中 ， 如果属性是对象， 则创建`childOB`对象收集依赖， 目的是子对象发生变化的时候发送通知

   * watcher: 当数据发生变化的时候会，调用dep.notify发送通知， 调用watcher的update()方法。 update方法会调用queueWatcher(), 判断watcher是否被处理， 如果没有的话添加到queue队列， 并调用flushSchedulerQueue()（刷新任务队列）， flushSchedulerQueue函数会触发beforeUpdate函数， 调用watcher.run()， watcher.run()方法中调用watcher.run() -> watcher.get() -> getter() -> updateComponet();

  * 清空上一次的依赖，重置watcher状态， 触发acitve钩子函数， 触发updated钩子函数。


3. 请简述虚拟 DOM 中 Key 的作用和好处。

    key的作用主要是为了高效的更新虚拟DOM, key的特殊属性主要用在vue的虚拟dom算法， 在新旧node对比是辨识vnodes， 如果不使用key， vue会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法， 使用key，他会基于key的变化重新排列元素顺序， 并且移除key不存在的元素；


4. 请简述 Vue 中模板编译的过程。

  * `compilerToFunction(template)`, 先从缓存中加载编译好的render函数，缓存中没有调用`compiler(templaye, option)`

  * `compiler(templaye, option)` , 合并options, 调用`baseCompiler(template.trim(), finalOptions)`

  * baseCompiler 

      - 调用`parse()`, 把template 转换成AST tree

      - 调用`optimize()`, b标记ast的静态sub trees, 检测到静态子树， 设置为静态， 不需要在每次重新渲染的时候生成节点， patch阶段跳过静态子树

      - 调用`generate()`, AST tree 生成字符串形式的js的创建代码

  * `compileToFunctions(template) `

     - 继续把上一步生成的字符串形式js代码转换为函数

     - `createFunction()`

     - render 和 staticRenderFns初始化完毕，继续挂载到vue实例的options对应的属性中

