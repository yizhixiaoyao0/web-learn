
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
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.css',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**',
    }
  }
};

try {
  const loadConfig = path.join(cwd, '/pages.config.js');
  config = Object.assign({}, config, loadConfig);
} catch (error) {}


const style = () => {
  // src 后面路径原样输出   gulp-sass里面依赖node-sass  里面有使用c二进制， 一些依赖是在国外的插件，因此需要配置镜像下载
  // cwd默认当前项目目录， 也可以指定工作目录
  return src(config.build.paths.styles, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.sass({outputStyle:'expended'}))
    .pipe(dest(config.build.temp))
}

// yarn add @babel/core @babel/preset-env --dev
const scripts = () => {
  // src 后面路径原样输出
  return src(config.build.paths.scripts, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.babel({
      // 插件的集合  最新所有ecmascript特性的集合；
      // require 会在当前目录下找该模块 ，若没有就依次往上找；
      preset: [require('@babel/preset-env')]
    }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({stream: true}));
}

// yarn add gulp-swig--dev  模板引擎
const page = () => {
  return src(config.build.paths.pages, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.swig({data: config.data}))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({stream: true}));
}


const image = () => {
  return src(config.build.paths.images, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.imagemin({}))
    .pipe(dest(config.build.dist))
}

const font = () => {
  return src(config.build.paths.fonts, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist))
}

const extra = () => {
  return src('**', {base: config.build.public, cwd: config.build.public})
    .pipe(dest(config.build.dist))
}

const del = require('del');
// yarn add del --dev
const clean = () => {
  return del([config.build.dist, config.build.temp])
}

// 开发服务器
// yarn add browser-sync --dev  自动热更新 
const browserSync = require('browser-sync');

const bs = browserSync.create();

const serve = () => {
  watch(config.build.paths.styles, {cwd: config.build.src},  style);
  watch(config.build.paths.scripts, {cwd: config.build.src},scripts);
  watch([config.build.paths.image, config.build.paths.fonts], {cwd: config.build.src}, bs.reload);
  watch(["**"], {cwd: config.build.public}, bs.reload);

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
      baseDir: [config.build.temp, config.build.dist, config.build.src, config.build.public],
      // 优先于basedir  /node_modules的请求指向 ’node_modules‘
      routes: {
        '/node_modules': 'node_modules',
      }
    }
  })
}

// 构建注释转换 压缩文件 创建新的文件   yarn add gulp-htmlmin gulp-uglify gulp-clean-css --dev(压缩)   yarn add gulp-if --dev  (判断文件类型)
const useref = () => {
  return src(config.build.paths.pages, {base: config.build.temp, cwd: config.build.temp})
    .pipe(plugins.useref({searchPath: [config.build.temp, '.']}))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({ 
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    })))
    .pipe(dest(config.build.dist))
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


