'use strict';


angular.module('Event2Go.account', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/account',{
		templateUrl: 'account/account.html',
		controller: 'AccountCtrl'
	});
}])
.controller('AccountCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', '$timeout', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location, $timeout){
	$scope.username = CommonProp.getUser();
	$scope.userAccount = {};
	$scope.showLoad = true;
	var ref = firebase.database().ref("Account");
	ref.orderByChild("email").equalTo($scope.username).on("child_added", function(snapshot) {
			$scope.userAccount = snapshot.val();
			 $timeout(function(){ 
			    $scope.userAccount = snapshot.val();
			    $scope.showLoad = false;
			    console.log(userAccount.name);
			  });
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