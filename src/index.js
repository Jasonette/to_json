// Initialization to attach adapters
var init = function(options){
  // unless otherwise specifed, include all
  var adapters = options || require('./adapters')
  // Add 'to_json' to String.prototype
  String.prototype.to_json = function(type, callback){
    return adapters[type](this.toString(), callback)
  }
}

// Update JSON.stringify in case there's a circular reference
var _stringify = JSON.stringify
JSON.stringify = function(val, replacer, spaces){
	var cache = []
  return _stringify(val, function(key, val){
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

// simply requiring should initialize automatically
init()

module.exports = {
  init: init
}
