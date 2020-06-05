#!/usr/bin/env node

// argv 是一个数组
process.argv.push('--cwd');
process.argv.push(process.cwd());
process.argv.push('--gulpfile');
// 自动找到package.json中的入口文件
process.argv.push(require.resolve('..'))

require('gulp/bin/gulp');