此项目为webpack loader和plugin开发学习专用。

### plugins

##### inline-source-plugin
利用html-webpack-plugin的自定义钩子，将打包生成的代码内联到style标签和script标签中，从而减少请求次数。

##### file-list-plugin
打包结束后将所有资源的文件名和资源大小打印到文件中的一个简单插件。
### loaders

##### banner-loader
在所有生成的文件开头加上一段注释内容。

##### babel-loader
一个简单的babel-loader，利用@babel/core编译js模块。

##### file-loader和url-loader
图片模块处理器。仿file-loader和url-loader。

##### less-loader
仿less-loader。利用less语法解析器解析less模块并返回。

##### style-loader
仿style-loader。



