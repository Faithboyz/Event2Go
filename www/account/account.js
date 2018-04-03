'use strict';


angular.module('Event2Go.account', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/account',{
		templateUrl: 'account/account.html',
		controller: 'AccountCtrl'
	});
}])
.controller('AccountCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', '$timeout', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location, $timeout){
	//initialize the form variable so as to not cause error later
	$scope.user = { name: 'B',age: 'B',description: 'B',location: 'B' };
	$scope.updateForm = {};

	//retrieve the user logged in
	$scope.username = CommonProp.getUser();
	$scope.userAccount = {};

	//set user location as a basic mesure
	$scope.location = "Toronto, ON";
	$scope.showLoad = true;
	$scope.showData = false;
	$scope.showEdit = false;
	$scope.ID = null;

	//fetch user account info based on current user signed up
	var ref = firebase.database().ref("Account");
	ref.orderByChild("email").equalTo($scope.username).on("child_added", function(snapshot) {
			$scope.userAccount = snapshot.val();
			 $timeout(function(){ 
			    $scope.userAccount = snapshot.val();
			    $scope.showLoad = false;$scope.showData = true;$scope.showEdit = false;
			    $scope.ID = snapshot.key;
			  });
		}, function(error) {
			  // The Promise was rejected.
			  console.error(error);});

	//retrieve data for the edit account info form
	$scope.editPost = function(id){
		//var ref = firebase.database().ref().child('Articles/' + id);
		$scope.editPostData = $firebaseObject(ref);
	};

	//show the form for edit and hide the rest of the views
	$scope.Edit = function(id){
		$scope.showLoad = false;$scope.showData = false;$scope.showEdit = true;
	};

	//cancel the edit
	$scope.Cancel = function(id){
		$scope.showLoad = false;$scope.showData = true;$scope.showEdit = false;
	};

	//update the account info but check if the values have been modiefied or not
	$scope.Update = function(){
		if ($scope.user.name != 'B'){
			var name = $scope.user.name;
		}
		else{
			var name = $scope.userAccount.name;
		}

		if ($scope.user.age != 'B'){
			var age = $scope.user.age;
		}
		else{
			var age = $scope.userAccount.age;
		}
		
		if ($scope.user.description != 'B'){
			var description = $scope.user.description;
		}
		else{
			var description = $scope.userAccount.description;
		}
		
		if ($scope.user.location != 'B'){
			var location = $scope.user.location;
		}
		else{
			var location = $scope.location;
		}
		var ref = firebase.database().ref().child('Account/' + $scope.ID);
		ref.update({
			age: age,
			description: description,
			email: $scope.username,
			name: name,
			picture: 'default.jpg',
			location: location
			  
		}).then(function(ref){
		}, function(error){
			console.log(error);
		});

		$scope.showLoad = false;$scope.showData = true;$scope.showEdit = false;
		ons.notification.alert('successfully update user details');
	};

	//check if user not logged in
	if(!$scope.username){
		$location.path('/home');
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}]);

//slide menu code
function openNav() {
document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}