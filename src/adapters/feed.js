var FeedParser = require('feedparser')
module.exports = function(data, callback){
  var feedparser = new FeedParser()
  var items = []
  feedparser.on('readable', function() {
    while (item = feedparser.read()) {
      items.push(item)
    }
  }).on('end', function() {
    if(callback){
      callback(items)
    }
  })
  feedparser.end(data)
}
