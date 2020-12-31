## 1. 请简述 React 16 版本中初始渲染的流程

  react的渲染流程可以分为Scheduler、 Reconcliation、 Commit 这三个阶段：

  Scheduler 阶段：

  Scheduer 流程主要是创建更新，创建更新的方式：

  * ReactDOM.render

    * 调用 legacyRenderSubtreeIntoContainer

    * 调用 root.render

      - 清除根节点下的所有子元素
      - 创建 ReactRoot
      - ReactSyncRoot： 创建fiberRoot和rootFiber

  * setState

## 2. 为什么 React 16 版本中 render 阶段放弃了使用递归

<br/>
  React 16之前的版本对比更新VirtualDom 的过程是采用循环加递归的实现的， 这种对比方式有一个问题，就是一旦任务开始就无法中断， 如果应用中华组件数量庞大， 主线程被长期占用，直到整颗virtualDom树对比更新完成之后主线程才能被释放，主线程才能执行其他任务。这就会导致一些用户交互，动画等任务无法立即得到执行，页面就会产生卡顿, 非常的影响用户体验。 

<br/>
<br/>
<br/>

## 3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

  * before Mutation

      通过遍历 effect list，判断每一个 effect 的副作用类型

      * Class 组件且使用了 getSnapShotBeforeUpdate

      进入第一个判断，在内部会执行 getSnaoShotBeforeUpdate 生命周期，也只有 Class 组件会进入这个判断

      * 函数式组件且使用了 useEffect

      标记 rootDoesHavePassiveEffects 标志位，在 commit 阶段的末尾会判断当前 commit 是否具有被动的副作用，有的话会设置一些额外的标志位用于下一轮的调度。
      安排一个回调，回调内部会触发 flushPassiveEffects 。
  
  * Mutation

    根据effectTag与上可能的标志位，得到最终的标志位，再执行想用的dom操作

  * Layout
    
    调用组件的 componentDidMount 生命周期。

    对于函数式组件而言，主要调用 commitHookEffectListMount，和上方 commitHookEffectListUnmount 逻辑类似，都是从 updateQueue.lastEffect 中取出副作用链表，区别在于本次是调用 effect.create()， 并且将返回值赋值给 effect.desotry，等待下一轮调度前刷新



## 4. 请简述 workInProgress Fiber 树存在的意义是什么



  React 使用双缓存技术完成 Fiber 树的构建与替换，实现DOM对象的快速更新。

  在 React 中最多会同时存在两棵 Fiber 树，当前在屏幕中显示的内容对应的 Fiber 树叫做 current Fiber 树，当发生更新时，React 会在内存中重新构建一颗新的 Fiber 树，这颗正在构建的 Fiber 树叫做 workInProgress Fiber 树。在双缓存技术中，workInProgress Fiber 树就是即将要显示在页面中的 Fiber 树，当这颗 Fiber 树构建完成后，React 会使用它直接替换 current Fiber 树达到快速更新 DOM 的目的，因为 workInProgress Fiber 树是在内存中构建的所以构建它的速度是非常快的。
