'use restrict';

angular.module('Event2Go.signup', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/signup', {
		templateUrl: 'signup/signup.html',
		controller: 'RegisterCtrl'
	});
}])

.controller('RegisterCtrl', ['$scope', '$firebaseAuth', '$location', function($scope, $firebaseAuth, $location){

	$scope.signUp = function(){
		var useremail = $scope.user.email;
		var password = $scope.user.password;
		var usename = $scope.user.name;

		if(username !="" && password && useremail){
			var auth = $firebaseAuth();
			auth.$createUserWithEmailAndPassword(useremail, password).then(function(){
				console.log("User Successfully Created");
		        ons.notification.alert("User Successfully Created");
				$location.path('/home');
			}).catch(function(error){
				$scope.errMsg = true;
				$scope.errorMessage = error.message;
			});
		}

	}

}])