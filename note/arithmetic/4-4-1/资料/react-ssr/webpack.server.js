const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const nodeExternals = require('webpack-node-externals');

const config = {
  // 指定项目打包目标支持环境
  target: 'node',
  // 指定项目入口文件
  entry: './src/server/index.js',
  // 指定文件打包位置及文件名称
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  externals: [nodeExternals()]
}

module.exports = merge(baseConfig, config);