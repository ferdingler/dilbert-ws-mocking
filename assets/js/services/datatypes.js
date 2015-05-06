'use strict';

angular.module('dilbertFrontendApp')
  .service('Datatypes', function Datatypes() {
    	
		this.types = [
				{
					"name": "UUID",
					"value": "guid"
				},
				{
					"name": "String",
					"value": "string"
				},
				{
					"name": "Bool",
					"value": "bool"
				},
				{
					"name": "Char",
					"value": "character"
				},
				{
					"name": "Integer",
					"value": "integer"
				},
				{
					"name": "Float",
					"value": "floating"
				},
				{
					"name": "Paragraph",
					"value": "paragraph"
				},
				{
					"name": "Sentence",
					"value": "sentence"
				},
				{
					"name": "Syllable",
					"value": "syllable"
				},
				{
					"name": "Word",
					"value": "word"
				},
				{
					"name": "First Name",
					"value": "first"
				},
				{
					"name": "Last Name",
					"value": "last"
				},
				{
					"name": "Age",
					"value": "age"
				},
				{
					"name": "Birthday",
					"value": "birthday"
				},
				{
					"name": "Prefix",
					"value": "prefix"
				},
				{
					"name": "Gender",
					"value": "gender"
				},
				{
					"name": "Email",
					"value": "email"
				},
				{
					"name": "Color",
					"value": "color"
				},
				{
					"name": "Domain Name",
					"value": "domain"
				},
				{
					"name": "Facebook ID",
					"value": "fbid"
				},
				{
					"name": "Hashtag",
					"value": "hashtag"
				},
				{
					"name": "IP Address",
					"value": "ip"
				},
				{
					"name": "IP Address v6",
					"value": "ipv6"
				},
				{
					"name": "Klout Score",
					"value": "klout"
				},
				{
					"name": "Twitter",
					"value": "twitter"
				},
				{
					"name": "Top Level Domain",
					"value": "tld"
				},
				{
					"name": "Address",
					"value": "address"
				},
				{
					"name": "Area Code",
					"value": "areacode"
				},
				{
					"name": "City",
					"value": "city"
				},
				{
					"name": "Coordinates",
					"value": "coordinates"
				},
				{
					"name": "Latitude",
					"value": "latitude"
				},
				{
					"name": "Longitude",
					"value": "longitude"
				},
				{
					"name": "Phone",
					"value": "phone"
				},
				{
					"name": "Postal",
					"value": "postal"
				},
				{
					"name": "Province",
					"value": "province"
				},
				{
					"name": "State",
					"value": "state"
				},
				{
					"name": "Street",
					"value": "street"
				},
				{
					"name": "Zip Code",
					"value": "zip"
				},
		];

		this.getDataTypesAvailable = function(){
			return this.types;
		};

  });