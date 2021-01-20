module.exports = {
  // 指定当前为开发模式
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage"
                }
              ],
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  }
};
