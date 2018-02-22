'use strict';

// Declare app level module which depends on views, and components
angular.module('Event2Go', [
  'ngRoute',
  'Event2Go.home',
  'Event2Go.signup',
  'Event2Go.welcome'
  'Event2Go.forget_password'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
