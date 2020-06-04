// // gulp 的入口文件
// // 导出函数成员
// // 每个任务都为异步任务

// exports.foo = done => {
//   console.log('foo');

//   done();  // 表示任务完成
// }

// // 默认执行任务
// exports.default = done => {
//   console.log('default task working');
//   done();  // 表示任务完成
// }

// // const gulp = require('gulp');

// // // 不被推荐   gulp4.0以前的任务注册方式
// // gulp.task('bar', done => {
// //   console.log('bar working');
// //   done();
// // })

// const { series, parallel }  = require('gulp');

// const task1 = done => {
//   setTimeout(() => {
//     console.log('task1 working');
//     done();
//   }, 1000)
// }


// const task2 = done => {
//   setTimeout(() => {
//     console.log('task1 working');
//     done();
//   }, 1000)
// }

// // 依次执行  例如： 部署
// exports.bar = series(task1, task2);

// // 并行执行
// exports.foz = parallel(task1, task2);

// // 异步

// exports.callback = done => {
//   console.log('done');
//   done();
// }

// exports.callback_error = done => {
//   console.log('done');
//   done(new Error('task error'));
// }

// exports.promise = () => {
//   console.log('promise task')
//   return Promise.resolve();
// }

// exports.promise_error = () => {
//   console.log('promise task')
//   return Promise.reject(new Error('task error'));
// }

// const timeout = (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve()
//     }, time)
//   })
// }

// exports.async = async () => {
//   await timeout(1000);
// }

// const fs = require('fs');

// exports.stream = () => {
//   const readStream = fs.createReadStream('package.json');
//   const writeStream = fs.createWriteStream('temp.txt');
//   readStream.pipe(writeStream);
//   return readStream;
// }
// // gulp中注册了end事件
// exports.stream = done => {
//   const readStream = fs.createReadStream('package.json');
//   const writeStream = fs.createWriteStream('temp.txt');
//   readStream.pipe(writeStream);
//   readStream.on('end', () => {
//     done();
//   })
// }

const fs = require('fs');
const  { Transform } = require('stream');

exports.css = () => {
  // 文件读取流
  const read = fs.createReadStream('normalize.css');
  const write = fs.createWriteStream('normalize.min.css');

  // 文件转换流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      // 核心转换过程实现
      // chunk => 拿到读取刘总读取到的内容 (Buffer)  字节数组

      // 拿到文本内容
      const input = chunk.toString();
      console.log(input, 'input')
      console.log(input.replace(/\s+/g, ''))
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '');

      // 错误优先回调函数
      callback(null, output)
    }
  })

  // 把读取出来的文件流导入写入文件流
  read
    .pipe(transform) // 转换
    .pipe(write); // 写入

  return read;
}

// 自动加载插件
// yarn add gulp-load-plugins --dev
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();
const { src, dest, parallel, series, watch } = require('gulp');

// exports.gulpFile = () => {
//   // 可使用通配符

//   // 完成文件的压缩转换  yarn add gulp-clean-css
//   // 重命名  yarn add gulp-rename --dev
//   return src('./*.css')
//     .pipe(plugins.cleanCss())
//     .pipe(plugins.rename({extname: '.min.css'}))
//     .pipe(dest('dist'))
// }

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
      // 插件的集合  最新所有ecmascript特性的集合
      preset: ['@babel/preset-env']
    }))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream: true}));
}

const data = {};
// yarn add gulp-swig--dev  模板引擎
const page = () => {
  return src('src/**/*.html', {base: 'src'})
    .pipe(plugins.swig({data}))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream: true}));
}

// 图片
const imagemin = require('gulp-imagemin');
const image = () => {
  return src('src/images/**', {base: 'src'})
    .pipe(imagemin())
    .pipe(dest(dist))
}

const font = () => {
  return src('src/font/**', {base: 'src'})
    .pipe(imagemin())
    .pipe(dest(dist))
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
const build =  series(clean, parallel(series(compile, useref), extra, image, font), );

// 开发环境
const develop = series(compile, serve);

module.exports = {
  clean,
  build,
  develop,
}


