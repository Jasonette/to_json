var h = require('hjson')
module.exports = function(data){
	return h.parse(data)
}
