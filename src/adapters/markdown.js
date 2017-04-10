var marked = require('marked')
module.exports = function(data){
  return marked.lexer(data)
}
