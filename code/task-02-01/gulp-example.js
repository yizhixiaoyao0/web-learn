// 自动加载插件
// yarn add gulp-load-plugins --dev
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();
const { src, dest, parallel, series, watch } = require('gulp');

// 返回当前命令行所在的工作目录
const cwd = process.cwd();
const path = require('path');

// 若项目没有配置文件 则读取默认配置
let config = {
  // default config
};

try {
  const loadConfig = path.join(cwd, '/pages.config.js');
  config = Object.assign({}, config, loadConfig);
} catch (error) {}


const style = () => {
  // src 后面路径原样输出   gulp-sass里面依赖node-sass  里面有使用c二进制， 一些依赖是在国外的插件，因此需要配置镜像下载
  return src('src/styles/*.css', {base: 'src'})
    .pipe(plugins.sass({outputStyle:'expended'}))
    .pipe(dest('temp'))
}

// yarn add @babel/core @babel/preset-env --dev
const scripts = () => {
  // src 后面路径原样输出
  return src('src/js/*.js', {base: 'src'})
    .pipe(plugins.babel({
      // 插件的集合  最新所有ecmascript特性的集合；
      // require 会在当前目录下找该模块 ，若没有就依次往上找；
      preset: [require('@babel/preset-env')]
    }))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream: true}));
}

const data = {};
// yarn add gulp-swig--dev  模板引擎
const page = () => {
  return src('src/**/*.html', {base: 'src'})
    .pipe(plugins.swig({data: config.data}))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream: true}));
}


const image = () => {
  return src('src/images/**', {base: 'src'})
    .pipe(plugins.imagemin({}))
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/font/**', {base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', {base: 'public'})
    .pipe(dest('dist'))
}

const del = require('del');
// yarn add del --dev
const clean = () => {
  return del(['dist', 'temp'])
}

// 开发服务器
// yarn add browser-sync --dev  自动热更新 
const browserSync = require('browser-sync');

const bs = browserSync.create()

const serve = () => {
  watch('src/styles/*.css', style);
  watch('src/js/*.js', scripts);
  watch(['src/images/**'], bs.reload);

  bs.init({
    // 是否连接的提示
    notify: false,
    // 端口号
    port: 2080,
    // 自动打开浏览器
    open: true,
    // 指定字符串 监听文件路径通配符
    // files: 'dist/**',
    server: {
      // 配置入口路径  图片 字体 打包时候才需要压缩，因此开发阶段不用进行监听，减少开销；
      baseDir: ['temp', 'dist', 'src', 'public'],
      // 优先于basedir  /node_modules的请求指向 ’node_modules‘
      routes: {
        '/node_modules': 'node_modules',
      }
    }
  })
}

// 构建注释转换 压缩文件 创建新的文件   yarn add gulp-htmlmin gulp-uglify gulp-clean-css --dev(压缩)   yarn add gulp-if --dev  (判断文件类型)
const useref = () => {
  return src('temp/*.html', {base: 'temp'})
    .pipe(plugins.useref({searchPath: ['dist', '.']}))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({ 
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    })))
    .pipe(dest('release'))
}

// 组合任务 编译
// 压缩 yarn add gulp-imagemin --dev
const compile = parallel(style, scripts, page);

// 上线之前执行的任务
const build =  series(clean, parallel(series(compile, useref), extra, image, font));

// 开发环境
const develop = series(compile, serve);

module.exports = {
  clean,
  compile,
  build,
  develop,
  serve,
  useref
}


