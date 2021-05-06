let {stringifyRequest} = require('loader-utils')
function loader(source) {
  let style = 
  "style = document.createElement('style');"
  +"style.innerHTML = "
  + `${JSON.stringify(source).replace(/\\n/g,'')}`
  + ";document.head.appendChild(style)"
  return style
}
loader.pitch = function(remainRequest) {
  let style = 
  "style = document.createElement('style');"
  +`style.innerHTML = require(${stringifyRequest(this, '!!'+remainRequest)})`
  + ";document.head.appendChild(style)"
  return style
}
module.exports = loader