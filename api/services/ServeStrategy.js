// ServeStrategy.js - in api/services
var Chance = require('chance');
var chance = new Chance();

// Will choose the appropiate strategy to serve an endpoint
// if no strategy is found, it will return an empty response
exports.serve = function(endpoint) {
	
	var response = '';

	try{
		response = ServeStrategy['serve_' + endpoint.type](endpoint);
	} catch(err){
		console.log('Strategy not found ' + endpoint.uuid + ' : ' + endpoint.type);
	}
	
	return response;
};

exports.serve_custom = function(endpoint){
	return endpoint.data;
};

exports.serve_singlevalue = function(endpoint){
	var endpointData = endpoint.data[0];
	return RandomService.getRandomForType(endpointData.valueType);
};

exports.serve_arrayofvalues = function(endpoint){
	var endpointData = endpoint.data[0];
    var arrayLength = chance.integer({min: 2, max: 25});
    var response = [];
    for(var i=0;i<arrayLength;i++){
      response.push(RandomService.getRandomForType(endpointData.valueType));
    }
    return response;
};

exports.serve_arrayofobjects = function(endpoint){
	var response = [];
    var arrayLength = chance.integer({min: 2, max: 25});
    for(var i=0; i<arrayLength; i++){
      var newObject = {};
      for(var j=0; j<endpoint.data.length; j++){
        newObject[endpoint.data[j].keyName] = RandomService.getRandomForType(endpoint.data[j].valueType);
      }   
      response.push(newObject);
    }
    return response;
};