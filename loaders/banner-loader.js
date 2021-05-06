let {getOptions} = require('loader-utils')
let {validate} = require('schema-utils')
let schemaJson = require('./banner-schema.json')
let fs = require('fs')

module.exports = function loader(source) {
  let options = getOptions(this)
  let cb = this.async()
  this.cacheable && this.cacheable(true)
  validate(schemaJson, options, {
    name: 'banner-loader'
  })

  this.addDependency(options.template,)
  if (options.template) {
    fs.readFile(options.template, 'utf8', function(err,content) {
      cb(err, `/**${content}**/${source}`)
    })
  } else {
    cb(null, source)
  }
}