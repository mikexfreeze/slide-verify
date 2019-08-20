/* create by Micheal Xiao 2018/11/7 16:52 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('../config')
const webpack = require('webpack')

module.exports = merge(common, {
  entry: ["./src/index.js"],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: config.dev.port,
    open: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config.dev.env)
    }),
    new HtmlWebpackPlugin({ // html 模板插件，不指定模板会自动创建模板
      chunksSortMode: 'none',
      template: 'src/index.html',
    }),
  ],
});