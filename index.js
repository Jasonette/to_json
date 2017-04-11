/*******************************************************
 * USAGE

# 1. Setup

  require('to_json')
    .use('html', require('html.to_json'), {circular: false})
    .use('csv', require('csv.to_json'))
    .use('md', require('markdown.to_json'))
    .use('markdown', require('markdown.to_json'))
    .use('cson', require('cson.to_json'), {circular: false})

# 2. Usage

  # Synchronous
  var json = str.to_json("html")      // html to json
  var json = str.to_json("markdown")  // markdown to json

  # Asynchronous
  str.to_json("csv", function(json){      // csv to json
    console.log(json)
  })

*******************************************************/

(function(){
  var non_circular_stringify = function(val, replacer, spaces){
    var cache = []
    return JSON.stringify(val, function(key, val){
      if (typeof val === 'object' && val !== null) {
        if (cache.indexOf(val) !== -1) {
          return "[Circular]"
        }
        cache.push(val)
      }
      return val
    }, spaces)
    cache = null
  }

  var o = {
    adapters: {},
    use: function(name, mod, options){
      /*********************
      * circular handling
      *********************/
      var allows_circular
      if(!options){
        // options doesn't exist => (circular = true)
        allows_circular = true
      } else if(options.circular){
        allows_circular = true
        // options exists and circular = true
      } else {
        allows_circular = false
        // options exists and circular = false
      }

      o.adapters[name] = {
        mod: mod,
        circular: allows_circular
      };

      String.prototype.to_json = function(name, callback){
        if(o.adapters[name].circular){
            return o.adapters[name].mod(this.toString(), callback)
        } else {
            return JSON.parse(non_circular_stringify(o.adapters[name].mod(this.toString(), callback)))
        }
      }

      return o
    }
  }

  module.exports = o

})()
