'use strict';

angular.module('dilbertFrontendApp')
  .controller('MainCtrl', function ($scope, $http, $location, $anchorScroll, Datatypes) {

    var hostname = '';
    //var hostname = 'http://localhost:1337';

  	$scope.body = '';
  	$scope.statusCode = '200';
  	$scope.serviceType = 'arrayofvalues';
  	$scope.valueType = 'guid';
    $scope.objectFields = [];
    $scope.dataTypes = null;
    
  	$scope.mockIt = function(){

      console.log("hola putos");

  		var requestData = {
  			httpStatus: $scope.statusCode,
  			type: $scope.serviceType
  		};

  		if($scope.serviceType === 'singlevalue' || $scope.serviceType === 'arrayofvalues'){
        requestData.data = [{
          "valueType" : $scope.valueType
        }];
  		}else if($scope.serviceType === 'custom'){
  			requestData.data = $scope.body;
  		}else if($scope.serviceType === 'arrayofobjects'){
        requestData.data = angular.copy($scope.objectFields);
      }

  		$http({
  			method: 'POST', 
  			url: hostname + '/endpoint/create',
  			data: $.param(requestData),
  			headers: {
		        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
  		}).
		    success(function(data, status, headers, config) {
		      	$scope.serverResponse = hostname + '/mock/' + JSON.parse(data);
		    }).
		    error(function(data, status, headers, config) {
		      console.log(data);
	    	});

  	};

    $scope.addField = function(){

      $scope.objectFields.push({
        "keyName" : "",
        "valueType" : "guid"
      });

    };

    $scope.removeField = function(field){
      for (var key in $scope.objectFields) {
          if ($scope.objectFields[key] == field) {
              $scope.objectFields.splice(key, 1);
          }
      }
    };

    $scope.goToMockIt = function(){
        $location.hash('mockitDiv');
        // call $anchorScroll()
        $anchorScroll();
    };

    $scope.addField();

    $scope.dataTypes = Datatypes.getDataTypesAvailable();

  });
