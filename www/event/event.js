'use strict';

angular.module('Event2Go.event', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/event',{
		templateUrl: '/event/event.html',
		controller: 'EventCtrl'
	});
}])

.controller('EventCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', '$timeout', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location, $timeout){
	$scope.user = { name: 'Event Name',description: 'Event Description',location: 'Event Location', date: 1522206895 };
	$scope.eventForm = {};
	$scope.edit = { name: 'Event Name',description: 'Event Description',location: 'Event Location', date: 1522206895 };
	$scope.editForm = {};
	$scope.username = CommonProp.getUser();
	$scope.userEvent = {};
	$scope.showCreate = false;
	$scope.showList = false;
	$scope.showLoad = true;
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
				$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;
			  });
		}, function(error) {
			  // The Promise was rejected.
			  console.error(error);});

	$scope.Create = function(){
		$scope.events.$add({
			event: $scope.user.name,
			email: $scope.username,
			description: $scope.user.description,
			Location: $scope.user.location,
			date: $scope.user.date.getTime()
		}).then(function(add){
			console.log("Event Created !!");
			$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;$scope.showEdit = false;
		});
	}

	$scope.Createform = function(){
		$scope.showCreate = true;$scope.showList = false;$scope.showLoad = false;$scope.showEdit = false;
	}
	$scope.editEvent = function(id){
		var edit = firebase.database().ref().child('Event/' + id);
		$timeout(function(){
		$scope.edits = $firebaseObject(edit);
		$scope.showCreate = false;$scope.showList = false;$scope.showLoad = false;$scope.showEdit = true;	
	});

	}
	$scope.deleteEvent = function(id){
		$scope.showCreate = false;$scope.showList = false;$scope.showLoad = true;$scope.showEdit = false;
		var ref = firebase.database().ref().child('Event/' + id);
		$timeout(function(){
			ref.remove();
			console.log("Value deleted");
			var reload = firebase.database().ref().child('Event');
			$scope.events = $firebaseArray(reload);
			$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;$scope.showEdit = false;
		});
	}
	$scope.Cancel = function(){
		$scope.showCreate = false;$scope.showList = true;$scope.showEdit = false;$scope.showLoad = false;	
	}

	if(!$scope.username){
		$location.path('/home');
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}]);