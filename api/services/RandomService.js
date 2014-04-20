// RandomService.js - in api/services
var Chance = require('chance');
var chance = new Chance();

chance.mixin({
    'ibeacon': function() {
        return {
        	id: chance.guid(),
            first: chance.first(),
            last: chance.last(),
            email: chance.email(),
            age: chance.age(),
            state: chance.state(),
            gender: chance.gender(),
            timestamp: chance.date()
        };
    }
});

chance.mixin({
    'temperature': function() {
        return {
            temperature: chance.natural({min: 40, max: 90}),
            timestamp: chance.date()
        };
    }
});

chance.mixin({
    'proximity': function() {
        return {
            proximity: chance.floating({min: 0.1, max: 2.0}),
            timestamp: chance.date()
        };
    }
});

exports.getRandomForType = function(type) {

    return chance[type]();

};