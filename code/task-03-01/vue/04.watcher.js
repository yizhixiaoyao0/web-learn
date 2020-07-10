
// 发布者目标

class Dep {
  constructor () {
    // 记录所有订阅者
    this.subs = []
  }

  addSub(sub) {
    if(sub && sub.update) {
      this.subs.push(sub)
    }
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}



// 订阅者-观察者

class Watcher {
  update() {
    console.log('update')
  }
}

let dep = new Dep();

let watcher = new Watcher();

dep.addSub(watcher);