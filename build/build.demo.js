/* create by Micheal Xiao 2019/7/29 16:40 */
/* create by Micheal Xiao 2018/11/7 16:53 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('../config')
var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
  entry: ["./example/index.js"],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: '[name].js',
    publicPath: '',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config.dev.env)
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ // html 模板插件，不指定模板会自动创建模板
      chunksSortMode: 'none',
      template: 'src/index.html',
    }),
    // new BundleAnalyzerPlugin(),
  ]
});