const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  // 指定项目入口文件
  entry: './src/client/index.js',
  // 指定文件打包位置及文件名称
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  }
}

module.exports = merge(baseConfig, config);