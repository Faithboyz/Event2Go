'use restrict';

angular.module('Event2Go.signup', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/signup', {
		templateUrl: 'signup/signup.html',
		controller: 'RegisterCtrl'
	});
}])

.controller('RegisterCtrl', ['$scope','CommonProp', '$firebaseAuth', '$location', '$firebaseArray', function($scope, CommonProp, $firebaseAuth, $location, $firebaseArray){

	var ref = firebase.database().ref().child('Account');
	$scope.account = $firebaseArray(ref);

	$scope.signUp = function(){
		var useremail = $scope.user.email;
		var password = $scope.user.password;
		var cpassword = $scope.user.cpassword;
		var username = $scope.user.name;
		var description = "Hey, it's sure nice to meet you";
		var profilePic = "default.jpg";
		var age = 18;

		if(username !="" && password && useremail && password==cpassword){
			var auth = $firebaseAuth();
			auth.$createUserWithEmailAndPassword(useremail, password).then(function(){
				$scope.account.$add({
				email: useremail,
				name: username,
				description: description,
				picture: profilePic,
				age: age
				}).then(function(ref){
					console.log(ref);
				});
				auth.$signInWithEmailAndPassword(useremail, password);
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