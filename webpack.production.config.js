var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'app', 'main.js'),

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name]-[hash].js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.js$|\.jsx$/, exclude: /node_modules/, loader: 'babel',  },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules!postcss') },
    ]
  },

  postcss: [
    require('autoprefixer'),
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name]-[hash].css"),
  ],

};
