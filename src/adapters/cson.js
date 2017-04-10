var CSON = require('cson-parser')
module.exports = function(data){
  return CSON.parse(data)
}
