/**
 * Endpoint
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	uuid: {
  		type: 'uuid',
  		required: true
  	},
  	httpStatus: {
      type: 'INTEGER',
      defaultsTo: 200
    },
  	type: {
      type: 'STRING',
      required: true,
      defaultsTo: 'custom'
    },
  	data: 'JSON'
  }

};