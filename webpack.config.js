const webpack = require('webpack');

module.exports = {
  entry: "./client/main.js",
  mode: "development",
  output: {
    path: __dirname + '/public/build/',
    filename: "./bundle.js",
    publicPath: "build/"
  },
  devServer: {
    contentBase: __dirname + '/public/',
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};