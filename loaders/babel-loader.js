let babel = require('@babel/core')
let {getOptions} = require('loader-utils')

function loader(source) {
  let options = getOptions(this)
  this.async()
  let cb = this.callback
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