var socrexControllers = angular.module('socrex.controllers', ['ui.bootstrap']);

socrexControllers.controller('newListingFormCtrl', ['$scope' , '$rootScope' , '$http' , '$location', function ($scope, $rootScope, $http, $location) {

    $scope.listingFormData = {};
   


    $scope.onSubmitNewListing = function(){
        var listingDataToSend = $scope.processListingData($scope.listingFormData);
        this.saveListing(listingDataToSend);
    }

    $scope.processListingData  = function(formData){
        // set pinctures array
        formData.pictures = $scope.generatePicturesArray(formData.picturesString);
        // delete picturesString attribute from formData object
        delete formData.picturesString;
        // return formadata
        return formData;
    }

    $scope.generatePicturesArray  = function(picturesString){
        var returnArray = picturesString.split(",");
        return returnArray;
    }

    $scope.saveListing = function(requestObj){
        // do call to server to save preferences
        var responsePromise = $http({
            //url: 'http://127.0.0.1:5000/listings/filter', 
            url: 'http://byopapp-api-stage.herokuapp.com/listings',
            method: 'POST',
            data: $.param(requestObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        responsePromise.success(function(data, status, headers, config) {
            console.log("Succeeded response");
            //$rootScope.currentListingFilter = data.Data.PreferenceId.$oid;
            //var preferenceId = data.Data.PreferenceId.$oid;
            //$scope.toListingList(preferenceId);
        });
        
        responsePromise.error(function(data, status, headers, config) {
            console.log("Succeeded response - error");
        }); 
    }

}]);