'use strict';

angular.module('Event2Go.event', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/event',{
		templateUrl: '/event/event.html',
		controller: 'EventCtrl'
	});
}])

.controller('EventCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', '$timeout', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location, $timeout){
	$scope.user = { name: 'EventName',time: 'B',description: 'EventDescription',location: 'EventLocation', date: 'B' };
	$scope.eventForm = {};
	$scope.username = CommonProp.getUser();
	$scope.userEvent = {};
	$scope.showCreate = true;
	$scope.current = Date.now();

	var add = firebase.database().ref().child('Event');
	$scope.event = $firebaseArray(add);

	var ref = firebase.database().ref("Event");
	ref.orderByChild("email").equalTo($scope.username).on("child_added", function(snapshot) {
			$scope.userEvent = snapshot.val();
			 $timeout(function(){ 
			    $scope.userEvent = snapshot.val();
			    /*var timestamp = data[0].bdatetime;
				var date = new Date(timestamp * 1000);
				var datevalues = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
				$scope.bdatetime = datevalues;*/
			  });
		}, function(error) {
			  // The Promise was rejected.
			  console.error(error);});

	$scope.Create = function(){
		var eventName = $scope.user.name;
		var Location = $scope.user.location;
		var email = $scope.username
		var description = $scope.user.description;
		var time = $scope.user.time;
		console.log($scope.user.time.getTime());
		console.log("break");
		var date = $scope.user.date;
		console.log(date);
		/*$scope.event.$add({
			event: eventName,
			email: email,
			description: description,
			Location: Location,
			time: time,
			date: date
		}).then(function(add){
			console.log("Event Created !!");
		});*/
	}

	if(!$scope.username){
		$location.path('/home');
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}]);