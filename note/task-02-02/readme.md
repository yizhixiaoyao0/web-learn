[2020.7.7](https://shimo.im/docs/dgqw9GVGkDyqwY9J/read)


1. webpack 和 guilp、grunt 之类工具的区别

  webpack 是一种模块化的解决方案， 通过一个入口递归遍历查找依赖项，使用loaders来处理他们，最后打包为浏览器可以识别的js文件，
  而gulp、grunt是前端开发流程优化的工具，在一个配置文件里面通过文件类型来进行编译转换压缩，执行相应任务会帮你自动完成， 但是现在webpack发展至今，
  新增了很多插件以及完善机制，在现今开发中能在很多场景下代替glup、grunt，比如现在很火的前端框架vue、react之前的版本都是使用webpack来进行打包，虽然
  新版本改了打包方式。

2. Loader 与 Plugin 之间的差异

  loader我们一般用于类型文件的加载编译， 例如.js文件我们一般会用babel-loader来加载转换es版本， 将其转为浏览器可识别js代码，当然这过程中需要安装@babel/core,@babel/preset-env
  plugin我们一般用于扩展除文件加载之外的操作，例如copy，clean，打包进度条， 配置模板等等

3. Tree-shaking、sideEffects

  treeshaking 是功能搭配之后的效果，
  treeshaking这个概念最早来自rollup，一般用来抖落代码中最后我们没有使用或者引用到的部分，在webpack中这部分会在生产环境中默认打开，tree-shaking前提是esm模式， 由webpack打包的代码必须使用esm，我们经常在网上看见tree-shaking不能使用babel-loader， 是因为babel-loader 中@babel/preset-env插件会将esm转换为commonjs, 此时tree-shaking将不会开启，一般设置的地方在optimization/useExports: true, 用来标记值导出外部使用了的成员，最新的babel-loader，根据标识自动关闭esm的转换， 我们将minimize，会将未引用的代码压缩调。除了usexports之外，我们可以将
  concatenatemodules设置为true, 打包之后会将所有模块合并输出到一个模块当中， 称之为scope hositing， 作用域提升；


  webapck新增了sideEffects， 更好的利于tree-shaking， sideEffects一般用于npm包标记是否有副作用， 也会在production模式下自动开启，在package.json 中配置`sideEffects： false`,
  确保你的代码真的没有副作用， 副作用指的是导入该模块后会在当前模块添加新的方法或者变量，例如原型链上新增方法，标记有副作用的文件例如 `sideEffects：['./src/*.js']`

