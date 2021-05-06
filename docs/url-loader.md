# url-loader

file-loader和url-loader都是处理图片类型资源的loader。loader默认将文件内容以utf8的格式读取，针对图片类型，需要读入二进制文件，loader的raw属性需要为true
```
loader.raw = true
```
url-loader需要有个limit值，我们需要做验证
```
let {validate} = require('schema-utils')
let {getOptions} = require('loader-utils')
function loader(source) {
  const options = getOptions(this)
  validate({
    type: 'object',
    properties: {
      limit: {
        type: 'number'
      }
    }
  }, options, {
    name: 'url-loader'
  })
  
  // TODO
}
```
* 当文件不超过limit时，我们需要将buffer转化为base64，另外图片类型的base64需要前缀`data:image/xxx;base64,`，我们需要`mime`工具库获取图片格式。
* 当文件长度超过limit值，我们需要使用file-loader。
```
if (options && options.limit && options.limit > source.length) {
  let ext = mime.getType(this.resource)
  let base64Str = source.toString('base64')
  return `module.exports="data:${ext};base64,${base64Str}"` 
} else {
  return require('./file-loader').call(this, source)
}
```

file-loader的任务如下：
* 生成文件，可以直接使用loaderContext.emitFile方法
* 返回文件路径，需要使用`module.exports`导出图片路径

文件名使用[interpolateName](https://github.com/webpack/loader-utils#interpolatename)方法，支持模板字符串。