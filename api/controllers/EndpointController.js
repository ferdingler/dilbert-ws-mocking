/**
 * EndpointController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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

module.exports = {
    
  create: function(req, res){

    var Chance = require('chance');
    var chance = new Chance();
    
    // Endpoint Attributes
    var endpointId = chance.guid();
    var endpointType = req.param('type');
    var endpointHttpStatus = req.param('httpStatus');
    var endpointData = req.param('data');

    // If the request does not contain data,
    // maybe it contains valueType
    if(endpointData === undefined){
      var valueType = req.param('valueType');
      if(valueType != undefined && endpointType === 'singlevalue'){
        endpointData = [{
          "valueType": valueType
        }];
      }else{
        return res.json('Error creating endpoint');
      }
    }

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
  
  /**
   * Action blueprints:
   *    `/endpoint/serve`
   */
   serve: function (req, res) {

    var Chance = require('chance');
    var chance = new Chance();
    var endpointId = req.param('uuid');
    var response = {};

    Endpoint.findOne({ uuid: endpointId}, function(err, endpoint) {
      if(endpoint.type === 'custom'){
        response = endpoint.data;
      }else if(endpoint.type === 'singlevalue'){
        endpointData = endpoint.data[endpoint.data.length - 1];
        if(endpointData.valueType === 'randomString'){
          response = chance.string();
        }
      }
      return res.json(response, endpoint.httpStatus);
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
