'use strict';


// Declare app level module which depends on filters, and services
angular.module('socrex', [
  'ngRoute',
  'socrex.filters',
  'socrex.services',
  'socrex.directives',
  'socrex.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/listing/', {templateUrl: 'partials/new.html', controller: 'newListingFormCtrl'});
}]);

