/**
 * 把外链的标签变成内联代码
 */
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = class InlineSourcePlugin {
  constructor(options) {
    let {match} = options
    this.reg = match
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      console.log('the compiler is starting a new compilation')
      htmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'InlineSourcePlugin',
        (data, cb) => {
          // console.log('--------',data)
          data = this.processTags(data, compilation)
          cb(null, data)
        }
      )
    })
  }
  processTags(data, compilation) {
    let headTags = []
    let bodyTags = []
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation))
    })
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation))
    })

    return {
      ...data,
      bodyTags,
      headTags
    }
  }
  processTag(tag, compilation) {
    let newTag = {}, url
    if (tag.tagName === 'link' && tag.attributes.rel === 'stylesheet' && this.reg.test(tag.attributes.href)) {
      newTag.tagName = 'style'
      url = tag.attributes.href
    }
    else if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag.tagName = 'script'
      url = tag.attributes.src
    }
    if(url) {
      newTag.innerHTML = compilation.assets[url].source()
      delete compilation.assets[url]
      return newTag
    } else {
      return tag
    }
    
  }
}