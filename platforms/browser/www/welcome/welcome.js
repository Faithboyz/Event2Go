	'use strict';

	angular.module('Event2Go.welcome', ['ngRoute', 'firebase'])

	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/welcome',{
			templateUrl: 'welcome/welcome.html',
			controller: 'WelcomeCtrl'
		});
	}])


.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', '$timeout', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location, $timeout){
	$scope.user = { event: 'Event Name',description: 'Event Description',Location: 'Event Location', date: 1522206895 };
	$scope.eventForm = {};
	$scope.edit = { event: 'Event Name',description: 'Event Description',Location: 'Event Location', date: 1522206895 };
	$scope.editForm = {};
	$scope.username = CommonProp.getUser();
	$scope.userEvent = {};
	$scope.showCreate = false;$scope.showList = false;$scope.showLoad = true;$scope.showEdit = false;
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
				$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;$scope.showEdit = false;
		  	});
		}, function(error) {
			  // The Promise was rejected.
			  console.error(error);});

	$scope.Create = function(){
		$scope.events.$add({
			event: $scope.user.event,
			email: $scope.username,
			description: $scope.user.description,
			Location: $scope.user.Location,
			date: $scope.user.date.getTime()
		}).then(function(add){
			console.log("Event create Successful");
			ons.notification.alert("Event create Successful");
			$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;$scope.showEdit = false;
		});
	}

	$scope.Update = function(id){
		var ref = firebase.database().ref().child('Event/' + id);
		if($scope.editPostData.event!=null && $scope.editPostData.date!=null && $scope.editPostData.description!=null && $scope.editPostData.Location!=null)
		{
			ref.update({
				event: $scope.editPostData.event,
				email: $scope.username,
				description: $scope.editPostData.description,
				Location: $scope.editPostData.Location,
				date: $scope.editPostData.date.getTime()
			}).then(function(ref){
			}, function(error){
				console.log(error);
			});
			$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;$scope.showEdit = false;
			console.log("Event Update Successful");
			ons.notification.alert("Event Update Successful");
		}
		else{
			console.log("Error with event update!!");
		}
	}

	$scope.Createform = function(){
		$scope.showCreate = true;$scope.showList = false;$scope.showLoad = false;$scope.showEdit = false;

	}
	$scope.editEvent = function(id){
		var ref = firebase.database().ref().child('Event/' + id);
		$scope.editPostData = $firebaseObject(ref);
		$scope.showCreate = false;$scope.showList = false;$scope.showLoad = false;$scope.showEdit = true;	

	}
	$scope.deleteEvent = function(id){
		$scope.showCreate = false;$scope.showList = false;$scope.showLoad = true;$scope.showEdit = false;
		var ref = firebase.database().ref().child('Event/' + id);
		$timeout(function(){
			ref.remove();
			console.log("Event Deletion Successful");
			ons.notification.alert("Event Deletion Successful");
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