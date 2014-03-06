/**
 * EndpointController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var Chance = require('chance');
var chance = new Chance();

module.exports = {
    
  create: function(req, res){

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    
    // Endpoint Attributes
    var endpointId = chance.guid();
    var endpointType = req.param('type');
    var endpointHttpStatus = req.param('httpStatus');
    var endpointData = req.param('data');
    var valueType = req.param('valueType');

    Endpoint.create({
      "uuid": endpointId,
      "type": endpointType,
      "httpStatus": endpointHttpStatus,
      "data": endpointData
    }).done(function(err, endpoint) {

      if(err){
        return res.json('Error creating endpoint');
      }

      return res.json(endpointId);
      
    });

  },

  serve: function (req, res) {

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Content-Type', 'application/json');

    var endpointId = req.param('uuid');
    var response = null;

    Endpoint.findOne({ uuid: endpointId}, function(err, endpoint) {
      
      if(endpoint.type === 'custom'){
        
        response = endpoint.data;

      }else if(endpoint.type === 'singlevalue'){
        
        endpointData = endpoint.data[0];
        response = RandomService.getRandomForType(endpointData.valueType);

      }else if(endpoint.type === 'arrayofvalues'){
        
        endpointData = endpoint.data[0];
        var arrayLength = chance.integer({min: 2, max: 25});
        response = [];
        for(var i=0;i<arrayLength;i++){
          response.push(RandomService.getRandomForType(endpointData.valueType));
        }

      }else if(endpoint.type === 'arrayofobjects'){

        response = [];
        var arrayLength = chance.integer({min: 2, max: 25});
        for(var i=0; i<arrayLength; i++){
          var newObject = {};
          for(var j=0; j<endpoint.data.length; j++){
            newObject[endpoint.data[j].keyName] = RandomService.getRandomForType(endpoint.data[j].valueType);
          }   
          response.push(newObject);
        }

      }

      return res.send(response, endpoint.httpStatus);

    });

  },


  list: function(req, res){

    var Chance = require('chance');
    var chance = new Chance();
    var response = {};

    Endpoint.find().exec(function(err, endpoints) {
      return res.json(endpoints);
    });

  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to EndpointController)
   */
  _config: {}

  
};