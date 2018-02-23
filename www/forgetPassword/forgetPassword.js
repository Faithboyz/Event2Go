'use strict';

angular.module('Event2Go.forgetPassword', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/forgetPassword', {
		templateUrl: 'forgetPassword/forgetPassword.html',
		controller: 'FPCtrl'
	});
}])


.controller('FPCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if($scope.username){
		$location.path('/welcome');
	}

	$scope.fp = function(){
		var emailAddress = $scope.user.email;
		var auth = $firebaseAuth();

		auth.$sendPasswordResetEmail(emailAddress).then(function(){
			ons.notification.alert("Please check email for password recovery");
			console.log("account recover success");
			//CommonProp.setUser($scope.user.email); *redirect to login 
			//var user  = firebase.auth().currentUser;
			//if(user.emailVerified){
				$location.path('/home');
			
		}).catch(function(error){
			$scope.errMsg = true;
			 ons.notification.alert('Account not Found.Please try again later');  
			 console.log("account not found");
			$scope.errorMessage = error.message;
		});
	}

}])

