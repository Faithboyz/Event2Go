'use strict';

// Declare app level module which depends on views, and components
angular.module('e2g', [
  'ngRoute',
  'e2g.login',
  'e2g.signup',
  'e2g.home',
  'e2g.event',
  'e2g.account'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/login'});
}]);