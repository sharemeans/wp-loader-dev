let path = require('path')
let htmlWebpackPlugin = require('html-webpack-plugin')
let miniCssExtractplugin = require('mini-css-extract-plugin')
let fileListPlugin = require('./plugins/file-list-plugin')
let inlineSourcePlugin = require('./plugins/inline-source-plugin')


module.exports = {
  mode: 'development',
  // mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  // watch: true,
  // resolveLoader: {
  //   modules: ['node_modules', path.resolve(__dirname,'loaders')]
  // },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [ 
          {
            loader: path.resolve(__dirname,'loaders', 'url-loader'),
            options: {
              limit: 20*1024
            }
          }
        ],
      },
      {
        test: /\.js$/,
        // use: ['js-loader']
        use: [
          {
            loader: path.resolve(__dirname,'loaders', 'babel-loader'),
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ],
      },
      {
        test: /\.js$/,
        // use: ['js-loader']
        use: [
          {
            loader: path.resolve(__dirname,'loaders', 'banner-loader'),
            options: {
              text: '作者',
              template: path.resolve(__dirname, 'banner.txt') 
            }
          }
        ],
      },
      {
        test: /\.less$/,
        // use: ['style-loader', 'less-loader']
        use: [
          path.resolve(__dirname,'loaders', 'style-loader'),
          path.resolve(__dirname,'loaders', 'css-loader'),
          path.resolve(__dirname,'loaders', 'less-loader')
        ]
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'less-loader']
        use: [
          miniCssExtractplugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html'
    }),
    new fileListPlugin({
      filename: 'list.md'
    }),
    new miniCssExtractplugin({
      filename: 'main.css'
    }),
    new inlineSourcePlugin({
      match: /\.(js|css)$/
    })
  ]
}