const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// 清除webpack 打包生成注释   这个任务应该挂载在bundle.js 内容明确过后
class MyPlugin {
  apply(compiler) {
    console.log('MyPlugin 启动');
    // 即将要将打包文件输出到输出目录中
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      // 每个文件的名称
      for (const name in compilation.assets) {
        console.log(name)
      }
    })
  }
}

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'output'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ejs', '.html'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },
  devtool: 'source-map',
  devServer: {
    hotOnly: true,
    contentBase: ['./public'],
    proxy: {
      '/api': {
        // http://localhost:8080/api/user -> https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:8080/api/user -> https://api.github.com/users
        pathRewrite: {
          '^/api': ''
        },
        // 不能使用  localhost:8080 作为请求github 的主机名
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /.md$/,
        use: [
          'html-loader',
          './markdown-loader.js'
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /.css$/,
        use: [
          // 从右往左执行
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.png$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024
          }
        }
      },
      // {
      //   test: /.html$/,
      //   exclude: /node_modules|src\/index.html/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       attributes: {
      //         list: [
      //           {
      //             tag: 'img',
      //             attribute: 'src',
      //             type: 'src',
      //           },
      //           {
      //             tag: 'link',
      //             attribute: 'href',
      //             type: 'src',
      //           }
      //         ]
      //       }
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack plugin sample',
      meta: {
        viewport: 'width=device-width'
      },
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 开发过程中不使用
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: path.resolve(__dirname, 'public')}
    //   ]
    // }),
    new MyPlugin(),
  ]
}