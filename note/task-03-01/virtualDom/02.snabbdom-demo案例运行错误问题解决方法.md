# snabbdom-demo 案例运行错误问题解决方法

如果遇到下面的错误，检查 Snabbdom 的版本，Snabbdom 在 2020年6月18日更新到 v1.0.1 版本。

**Cannot resolve dependency 'snabbdom/init'**

案例中用的版本是 v0.7.4 版本，如果你安装的是 Snabbdom@v1.0.1 的版本会出现上面的错误。

**解决方法**：安装 Snabbdom@v0.7.4版本

**原因**：v1.0.1 版本相对于 v0.7.4 版本的变化，去除了 snabbdom.ts 模块，新增了 init.ts 模块，如果使用 v1.0.1 版本的话导入 h、init 函数，文档中写的是如下的方式：

```js
import { init } from 'snabbdom/init'
import { h } from 'snabbdom/h' // helper function for creating vnodes
```

但是我们案例中改成这样的导入方式，问题依然无法解决。

因为模块路径并不是 snabbdom/int，这个路径是作者在 package.json 中的 exports 字段设置的，而我们使用的打包工具不支持 exports 这个字段，webpack 4 也不支持，webpack 5 beta 支持该字段。该字段在导入 snabbdom/init 的时候会补全路径成 snabbdom/build/package/init.js。

```js
"exports": {
    "./init": "./build/package/init.js",
    "./h": "./build/package/h.js",
    "./helpers/attachto": "./build/package/helpers/attachto.js",
    "./hooks": "./build/package/hooks.js",
    "./htmldomapi": "./build/package/htmldomapi.js",
    "./is": "./build/package/is.js",
    "./jsx": "./build/package/jsx.js",
    "./modules/attributes": "./build/package/modules/attributes.js",
    "./modules/class": "./build/package/modules/class.js",
    "./modules/dataset": "./build/package/modules/dataset.js",
    "./modules/eventlisteners": "./build/package/modules/eventlisteners.js",
    "./modules/hero": "./build/package/modules/hero.js",
    "./modules/module": "./build/package/modules/module.js",
    "./modules/props": "./build/package/modules/props.js",
    "./modules/style": "./build/package/modules/style.js",
    "./thunk": "./build/package/thunk.js",
    "./tovnode": "./build/package/tovnode.js",
    "./vnode": "./build/package/vnode.js"
  }
```

所以如果使用 Snabbdom@v1.0.1 的话，导入 init、h，以及模块只要把把路径补全即可。

```js
import { h } from 'snabbdom/build/package/h'
import { init } from 'snabbdom/build/package/init'
import { classModule } from 'snabbdom/build/package/modules/class'
```



## 作者关于该问题的回复

https://github.com/snabbdom/snabbdom/issues/723

