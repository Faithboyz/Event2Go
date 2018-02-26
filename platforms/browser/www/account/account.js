'use strict';

angular.module('Event2Go.account', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/account',{
		templateUrl: 'account/account.html',
		controller: 'AccountCtrl'
	});
}])
.controller('AccountCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location){
	$scope.username = CommonProp.getUser();
	$scope.userAccount = {};
	var ref = firebase.database().ref("Account");
	var rep = ref.orderByChild("email").equalTo($scope.username).on("child_added", function(snapshot) {
			$scope.userAccount = snapshot.val();
			console.log(userAccount.name);
		}, function(error) {
			  // The Promise was rejected.
			  console.error(error);});

	if(!$scope.username){
		$location.path('/home');
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}]);
	function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
	}

	function closeNav() {
	    document.getElementById("mySidenav").style.width = "0";
	}