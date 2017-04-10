var parser = require('x2js')
module.exports = function(data){
  return new parser().xml2js(data)
}
