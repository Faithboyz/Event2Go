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
		var cpassword = $scope.user.cpassword;
		var username = $scope.user.name;

		if(username !="" && password && useremail && password==cpassword){
			var auth = $firebaseAuth();
			auth.$createUserWithEmailAndPassword(useremail, password).then(function(){
				auth.$signInWithEmailAndPassword(username, password);
				var user = firebase.auth().currentUser;
				user.sendEmailVerification().then(function() {
					$scope.username = CommonProp.getUser();
		        	CommonProp.logoutUser();
		        }, function(error) {
		          console.log(error.message);
		        });
				console.log("User Successfully Created, please verify email");
		        ons.notification.alert("User Successfully Created");
				$location.path('/home');
			}).catch(function(error){
				$scope.errMsg = true;
				$scope.errorMessage = error.message;
			});
		}

	}

}])