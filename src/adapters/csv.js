var csv=require('csvtojson')

module.exports = function(data, callback){
	csv().fromString(data).on('end_parsed', function(result){
		callback(result)
	})
}
