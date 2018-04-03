'use strict';

angular.module('Event2Go.event', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/event',{
		templateUrl: '/event/event.html',
		controller: 'EventCtrl'
	});
}])

.controller('EventCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', '$timeout', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location, $timeout){
	//startup the create form  
	$scope.user = { event: '',description: '',Location: '', date: 1522206895 };
	$scope.eventForm = {};//not useful atm
	$scope.edit = { event: 'Event Name',description: 'Event Description',Location: 'Event Location', date: 1522206895 };//not useful atm
	$scope.editForm = {};//not useful atm

	//get user signed in info
	$scope.username = CommonProp.getUser();
	$scope.userEvent = {};

	//hide /show views based on user commands
	$scope.showCreate = false;$scope.showList = false;$scope.showLoad = true;$scope.showEdit = false;
	$scope.current = Date.now();

	// one type db data pull
	var add = firebase.database().ref().child('Event');
	$scope.events = $firebaseArray(add);
	$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;$scope.showEdit = false;

	/*var ref = firebase.database().ref("Event");
	ref.orderByChild("email").equalTo($scope.username).on("child_added", function(snapshot) {
		 	$timeout(function(){ 
		    	$scope.userEvent = snapshot.val();
		    	console.log($scope.userEvent);
		    	var timestamp = data[0].bdatetime;
				var date = new Date(timestamp * 1000);
				var datevalues = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
				$scope.bdatetime = datevalues;
				$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;$scope.showEdit = false;
		  	});
		}, function(error) {
			  // The Promise was rejected.
			  console.error(error);});*/

	//create a new event, show alert if created successfully
	$scope.Create = function(){
		$scope.events.$add({
			event: $scope.user.event,
			email: $scope.username,
			description: $scope.user.description,
			Location: $scope.user.Location,
			date: $scope.user.date.getTime()
		}).then(function(add){
			console.log("Event Created !!");
			ons.notification.alert('event successfully created');
			$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;$scope.showEdit = false;
		});
	}

	//edit event details, show error if any
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
		}
		else{
			console.log("Error with event update!!");
		}
	}

	//show the create event form, hide the rest of the views
	$scope.Createform = function(){
		$scope.showCreate = true;$scope.showList = false;$scope.showLoad = false;$scope.showEdit = false;
	}

	//show the edit event form, hide the rest of the views
	$scope.editEvent = function(id){
		var ref = firebase.database().ref().child('Event/' + id);
		$scope.editPostData = $firebaseObject(ref);
		$scope.showCreate = false;$scope.showList = false;$scope.showLoad = false;$scope.showEdit = true;	
	}

	//fetch the event id for the event and them remove it
	$scope.deleteEvent = function(id){
		$scope.showCreate = false;$scope.showList = false;$scope.showLoad = true;$scope.showEdit = false;
		var ref = firebase.database().ref().child('Event/' + id);
		$timeout(function(){
			ref.remove();
			console.log("Value deleted");
			ons.notification.alert('Event deletion successful');

			//reload the events currently owned by the user
			var reload = firebase.database().ref().child('Event');
			$scope.events = $firebaseArray(reload);
			$scope.showCreate = false;$scope.showList = true;$scope.showLoad = false;$scope.showEdit = false;
		});
	}

	//cancel all forms and show my events list
	$scope.Cancel = function(){
		$scope.showCreate = false;$scope.showList = true;$scope.showEdit = false;$scope.showLoad = false;	
	}

	//if user not logged in
	if(!$scope.username){
		$location.path('/home');
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}]);