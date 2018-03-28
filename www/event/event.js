'use strict';

angular.module('Event2Go.event', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/event',{
		templateUrl: '/event/event.html',
		controller: 'EventCtrl'
	});
}])

.controller('EventCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', '$timeout', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location, $timeout){
	$scope.user = { name: 'EventName',description: 'EventDescription',location: 'EventLocation', date: 1522206895 };
	$scope.eventForm = {};
	$scope.username = CommonProp.getUser();
	$scope.userEvent = {};
	$scope.showCreate = false;
	$scope.showList = true;
	$scope.current = Date.now();

	var add = firebase.database().ref().child('Event');
	$scope.events = $firebaseArray(add);


	var ref = firebase.database().ref("Event");
	ref.orderByChild("email").equalTo($scope.username).on("child_added", function(snapshot) {
			 $timeout(function(){ 
			    $scope.userEvent = snapshot.val();
			    console.log($scope.userEvent);
			    /*var timestamp = data[0].bdatetime;
				var date = new Date(timestamp * 1000);
				var datevalues = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
				$scope.bdatetime = datevalues;*/
			  });
		}, function(error) {
			  // The Promise was rejected.
			  console.error(error);});


	$scope.Create = function(){
		$scope.event.$add({
			event: $scope.user.name,
			email: $scope.username,
			description: $scope.user.description,
			Location: $scope.user.location,
			date: $scope.user.date.getTime()
		}).then(function(add){
			console.log("Event Created !!");
			$scope.showCreate = false;$scope.showList = true;
		});
	}

	$scope.Createform = function(){
		$scope.showCreate = true;$scope.showList = false;
	}

	$scope.Cancel = function(){
		$scope.showCreate = false;$scope.showList = true;
	}

	if(!$scope.username){
		$location.path('/home');
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}]);