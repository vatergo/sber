const webpack = require('webpack');

module.exports = {
  entry: "./client/main.js",
  mode: "development",
  output: {
    path: __dirname + 'server/public/build/',
    filename: "./bundle.js",
    publicPath: "build/"
  },
  devServer: {
    contentBase: __dirname + 'server/public/',
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
    }
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
        use: "url-loader?limit=1024&name=image/[name].[ext]"
      }
    ]
  }
};