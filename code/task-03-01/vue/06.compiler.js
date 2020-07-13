class Compiler {
  constructor(vm) {
    this.el = this.$el;
    this.vm = vm;
    this.compile(this.el);
  }

  // 编译模板处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if(this.isTextNode(node)) {
        this.compileText(node)
      } else if(this.isElementNode(node)) {
        this.compileElement(node)
      }
      
      // 判断node节点是否有子节点，如果有子节点，递归调用compiler
      if(node.childNodes && node.childNodes.length) {
        this.compile(node.childNodes);
      }
    })

  }

  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater'];
    updateFn && updateFn.call(this, node, this.vm[key], key);
  }

  // 处理v-text指令
  textUpdater(node, value, key) {
    node.textContent = value;
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    })
  }

  // v-text
  modelUpdater(node, value, key) {
    node.value = value;
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    })

    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value;
    })
  }

  // 编译元素节点，处理指令
  compileElement(node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    // 判断是否有指令
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.arrtName
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2);

        let key = attr.value;

        this.update(node, key, attr);

        new Watcher(this.vm, key, (newValue) => {

          this.update(node, key, attr);
        })
      }
    })
  }

  // 编译文本节点，处理插值表达式
  compileText(node) {
    // 以对象的形式打印出来
    // console.dir(node)
    // {{msg}}
    let reg = /\{\{(.+?)\}\}/;

    let vaue = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue;
      })
    }
  }


  // 判断元素属性是否是指令
  isDirective(arrtName) {
    return arrtName.startsWith('v-')
  }

  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }


}