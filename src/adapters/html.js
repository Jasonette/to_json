var cheerio = require('cheerio')
module.exports = function(data){
  $ = cheerio.load(data)
  return $(data)
}
