const path = require('path')
const WebpackBar = require('webpackbar');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        use: 'babel-loader'
      }, 
      {
        test: /\.css$/,
        loader: 'typings-for-css-modules-loader?modules&namedExport'
        // use: [
        //   {loader: "style-loader"},
        //   {
        //     loader: "css-loader",
        //     options: {
        //       sourceMap: true,
        //       modules: true,
        //     }
        //   }
        ]
      }, 
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      }, 
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30720
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new WebpackBar(), // 编译进度条组件
  ]
}
