var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'app', 'main.js'),
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./app'),
    ]
  },

  module: {
    loaders: [
      { test: /\.js$|\.jsx$/, exclude: /node_modules/, loader: 'babel',  },
      { test: /\.css$/, loader: 'style!css?modules!postcss' },
    ]
  },

  postcss: [
    require('autoprefixer'),
  ],

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: "./public",
    colors: true,
    hot: true,
  },

};
