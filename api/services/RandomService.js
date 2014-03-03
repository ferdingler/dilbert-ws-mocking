// RandomService.js - in api/services
exports.getRandomForType = function(type) {

	var Chance = require('chance');
    var chance = new Chance();

    return chance[type]();

};