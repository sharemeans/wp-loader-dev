let {getOptions} = require('loader-utils')
let {validate} = require('schema-utils')
let mime = require('mime')

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
  
  if (options && options.limit && options.limit > source.length) {
    let ext = mime.getType(this.resource)
    let base64Str = source.toString('base64')
    return `module.exports="data:${ext};base64,${base64Str}"` 
  } else {
    return require('./file-loader').call(this, source)
  }
}
loader.raw = true
module.exports = loader