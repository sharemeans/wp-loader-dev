let {interpolateName} = require('loader-utils')
function loader(source) {
  let filename = interpolateName(this, '/assets/[name].[hash:8].[ext]', {content: source})
  this.emitFile(filename, source)
  return `module.exports="${filename}"`
}
loader.raw = true
module.exports = loader