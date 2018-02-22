'use strict';

angular.module('Event2Go.forget_password', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/forget_password', {
		templateUrl: 'forget_password/fp.html',
		controller: 'HomeCtrl'
	});
}])


.controller('HomeCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if($scope.username){
		$location.path('/welcome');
	}

	$scope.fp = function(){
		var username = $scope.user.email;
		var auth = $firebaseAuth();

		auth.$sendPasswordResetEmail(emailAddress).then(function(){
			ons.notification.alert("Please check email for password recovery");
			console.log("account recover success");
			CommonProp.setUser($scope.user.email);
			//var user  = firebase.auth().currentUser;
			//if(user.emailVerified){
				$location.path('/welcome');
			
		}).catch(function(error){
			$scope.errMsg = true;
			 ons.notification.alert('Account not Found.Please try again later');  
			 console.log("account not found");
			$scope.errorMessage = error.message;
		});
	}

}])

