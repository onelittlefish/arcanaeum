var path = require('path');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: {
    index: './src/presentation/index',
    login: './src/presentation/login'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' }, // creates style nodes from JS strings
          { loader: 'css-loader' }, // translates CSS into CommonJS
          { loader: 'less-loader' }, // compiles Less to CSS
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          { loader: 'file-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'index.html' },
      { from: 'login.html' }
    ]),
  ],
  devServer: {
    contentBase: false,
    hot: false,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false
      },
      "/auth": {
        target: "http://localhost:8080",
        secure: false
      }
    },
    port: 3000
  }
};
