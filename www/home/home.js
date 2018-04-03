'use strict';

angular.module('Event2Go.home', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	});
}])


.controller('HomeCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){
	//get currently signed up user info
	$scope.username = CommonProp.getUser();

	//check if user signed in
	if($scope.username){
		$location.path('/welcome');
	}

	// user sign in fucntion
	$scope.signIn = function(){
		var username = $scope.user.email;
		var password = $scope.user.password;
		var auth = $firebaseAuth();
		// user sign in function
		auth.$signInWithEmailAndPassword(username, password).then(function(){
			//get user info
			CommonProp.setUser($scope.user.email);
			var user  = firebase.auth().currentUser;
			//check if email verified
			if(user.emailVerified){
				$location.path('/welcome');
				ons.notification.alert("User Login Successful");
				console.log("User Login Succesfully");
			}//else sign out and show alert
			else{
				ons.notification.alert("Email not verified");
				CommonProp.logoutUser();
			}	
		}).catch(function(error){
			$scope.errMsg = true;
			//other errors if any
			 ons.notification.alert('Incorrect username or password.');  
			 console.log("Incorrect username or password.");
			$scope.errorMessage = error.message;
		});
	}

}])
//example with getters and setters
.service('CommonProp', ['$location', '$firebaseAuth', function($location, $firebaseAuth){
	var user = "";
	var auth = $firebaseAuth();

	return {
		getUser: function(){
			if(user == ""){
				user = localStorage.getItem("userEmail");
			}
			return user;
		},
		setUser: function(value){
			localStorage.setItem("userEmail", value);
			user = value;
		},
		logoutUser: function(){
			auth.$signOut();
			console.log("Logged Out Succesfully");
			
			user = "";
			localStorage.removeItem('userEmail');
			$location.path('/home');

			if(user.emailVerified){
			ons.notification.alert('Logged Out Succesfully'); 
			 }
		}
	};
}]);