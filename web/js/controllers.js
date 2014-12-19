var socrexControllers = angular.module('socrex.controllers', ['ui.bootstrap']);

socrexControllers.controller('newListingFormCtrl', ['$scope' , '$rootScope' , '$http' , '$location', function ($scope, $rootScope, $http, $location) {

    $scope.listingFormData = {};
    $scope.statusMessage = "";


    $scope.onSubmitNewListing = function(){
        var listingDataToSend = $scope.processListingData($scope.listingFormData);
        this.saveListing(listingDataToSend);
    }

    $scope.parseIntValue = function(keyArray, formData){
        for (var i = 0 ; i < keyArray.length ; i++){
            var keyElement = keyArray[i];
            if(keyElement in formData){
                formData[keyElement] = parseInt(formData[keyElement]);
            }
        }
    }

    $scope.processListingData  = function(formData){
        // set pictures array string
        formData.pictures = JSON.stringify($scope.generatePicturesArray(formData.picturesString));
        formData.move_in = formData.move_in.split("-").join("");
        formData.source = formData.source + "-manual";

        var keyArray = ['amenities' , 'cieling' , 'classic', 'deck_balcony' , 'hardwood' , 'kitchen' , 'laundry' , 'lighting'
                        , 'loft', 'modern','parking','pet' , 'spacing', 'studio', 'sublet_roomate', 'view']

        $scope.parseIntValue(keyArray, formData);
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
        $scope.statusMessage = "Saving listing into database ... ";
        var responsePromise = $http({
            //url: 'http://127.0.0.1:5000/listings/filter', 
            url: 'http://byopapp-api-dev.herokuapp.com/listings',
            //url: 'http://0.0.0.0:8080/listings',
            method: 'POST',
            data: $.param(requestObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        responsePromise.success(function(data, status, headers, config) {
            $scope.statusMessage = "The listing was succesfully saved";
            $scope.listingLink = "http://www.gotrotter.com/#/listingDetails/" + data.Data._id.$oid
            $scope.listingFormData = {};
            console.log("Succeeded response");
            //$rootScope.currentListingFilter = data.Data.PreferenceId.$oid;
            //var preferenceId = data.Data.PreferenceId.$oid;
            //$scope.toListingList(preferenceId);
        });
        
        responsePromise.error(function(data, status, headers, config) {
            $scope.statusMessage = "There was an error saving the listing, please try again";
            console.log("Succeeded response - error");
        }); 
    }

}]);













socrexControllers.controller('addShortlistFormCtrl', ['$scope' , '$rootScope' , '$http' , '$location', function ($scope, $rootScope, $http, $location) {

    $scope.listingFormData = {};
    $scope.statusMessage = "";


    $scope.onSubmitRecommend = function(){
        $scope.addShortlist($scope.formData);
    }

    $scope.addShortlist = function(requestObj){
        // do call to server to save preferences
        $scope.statusMessage = "Saving listing into database ... ";
        var responsePromise = $http({
            //url: 'http://127.0.0.1:5000/listings/filter', 
            url: 'http://byopapp-api-dev.herokuapp.com/recommend',
            //url: 'http://0.0.0.0:8080/listings',
            method: 'POST',
            data: $.param(requestObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        responsePromise.success(function(data, status, headers, config) {
            $scope.statusMessage = "The listing was succesfully saved";
            $scope.listingFormData = {};
            console.log("Succeeded response");
        });
        
        responsePromise.error(function(data, status, headers, config) {
            $scope.statusMessage = "There was an error saving the listing, please try again";
            console.log("Succeeded response - error");
        }); 
    }

}]);