/**
 * 输出所有的assets以及资源大小
 */
module.exports = class FileListPlugin {
  constructor(options) {
    let {filename} = options
    this.filename = filename
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('file-list-flugin', (compilation, callback) => {
      let content = `## 文件名       资源大小(字节)\n`
      let assets = compilation.assets
      Object.entries(assets).forEach(([assetName, statObj]) => {
        content += `-  ${assetName}       ${statObj.size()}\n`
      })
      assets[this.filename] = {
        source() {
          return content
        },
        size() {
          return content.length
        }
      }
      callback()
    })
  }
}