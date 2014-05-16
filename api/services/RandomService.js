// RandomService.js - in api/services
var Chance = require('chance');
var chance = new Chance();

exports.getRandomForType = function(type) {

    return chance[type]();

};