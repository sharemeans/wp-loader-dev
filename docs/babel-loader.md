# babel-loader

babel-loader的核心是@babel/core和@babel/preset-env。我们需要用这俩工具完成对js代码的编译。

## 配置babel-loader

```
// webpack.config.js
{
  test: /\.js$/,
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
```

## 获取loader配置
每个loader其实就是一个函数，接收模块代码作为参数。loader函数可以直接返回同步处理后的结果，也可以选择异步调用callback。这里我选择异步调用。
```
// babel-loader.js
let babel = require('@babel/core')
let loaderUtils = require('loader-utils')

function loader(source) {
  let options = loaderUtils.getOptions(this)
  let cb = this.async()
  babel.transformAsync(source, {
    ...options,
    sourceMap: this.sourceMap,
    filename: this.resource
  })
  .then(result => {
    cb(null, result.code, result.map, result.ast)
  })
  .catch(err => {
    cb(err)
  })
}
module.exports = loader
```
loader函数内部的this被称之为loader context。

> 注意：尽管this.callback和this.async()的返回值相等，我们依然需要调用async来告知外界loader的处理结果是异步返回的。否则外界企图通过获取loader的return值来获取loader处理结果。

this.sourceMap的值来源于webpackConfig.devtool的配置。

浏览器显示的具体的sourceMap的文件名取决于我们的[babel-config:filename](https://www.babeljs.cn/docs/options#filename)字段，所以，尽管这个字段在文档中声明为非必填，但是对于有sourcemap的打包结果，filename非常有必要，否则在浏览器中只会显示一个unknown
![](https://gitee.com/ndrkjvmkl/picture/raw/master/2021-5-4/1620140278083-image.png)
这是因为sourcemap的文件名[默认值](https://www.babeljs.cn/docs/options#sourcefilename)依赖于filenameRelative，而filenameRelative的[默认值](https://www.babeljs.cn/docs/options#filenamerelative)
![](https://gitee.com/ndrkjvmkl/picture/raw/master/2021-5-4/1620140470804-image.png)又依赖于filename

参考：
* [@babel/core](https://www.babeljs.cn/docs/babel-core#transformasync)


