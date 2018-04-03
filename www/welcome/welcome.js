'use strict';

angular.module('Event2Go.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome',{
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])
.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location','$timeout', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location,$timeout){
	$scope.username = CommonProp.getUser();
	$scope.showLoad = true;
	$scope.showData = false;

	//check if user logged in
	if(!$scope.username){
		$location.path('/home');
	}

	// get events created by user -- removed, code for refrence
	/*var rev = firebase.database().ref("Event");
	rev.orderByChild("email").equalTo($scope.username).on("child_added", function(snapshot) {
			 $timeout(function(){ 
			    $scope.userEvent = snapshot.val();
			    $scope.showLoad = false;$scope.showData = true;
			  });
		}, function(error) {
			  // The Promise was rejected.
			  console.error(error);});*/

	//get list of events from db
	var list = firebase.database().ref().child('Event');
	$scope.events = $firebaseArray(list);
	$scope.showLoad = false;$scope.showData = true;
	
	//if the user wanted to edit data for an event
	$scope.editEvent = function(id){
		var ref = firebase.database().ref().child('Event/' + id);
		$scope.editPostData = $firebaseObject(ref);
	};

	// When a user joins an event -- work in progress	
	$scope.JoinPost = function(id){
	var add = firebase.database().ref().child('Group');
	var user = $scope.username;
	$scope.groups = $firebaseArray(add);
	 	$scope.groups.$add({
	 		event: id,
	 		user: $scope.username
	 	}).then(function(add){
	 		console.log("Event joined!!");
	 	});
	 };

	//after join event if a user wants to leave an event -- work in progress	
	$scope.updateEvent = function(id){
		var ref = firebase.database().ref().child('Group/' + id);
		ref.update({
			title: $scope.editPostData.title,
			post: $scope.editPostData.post
		}).then(function(ref){

		}, function(error){
			console.log(error);
		});
	};

	//When a user joins a event, it gets removed from the welcome page -- work in progress	
	$scope.deleteCnf = function(article){
		$scope.deleteArticle = article;
	};

	//When a user joins a event, it gets removed from the welcome page -- work in progress
	$scope.deleteEvent = function(deleteArticle){
		$scope.articles.$remove(deleteArticle);
		$("#deleteModal").modal('hide');
	};

	//logout user
	$scope.logout = function(){
		CommonProp.logoutUser();
	}

}]);
//slide menu
function openNav() {
document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//trial with onsen ui
document.addEventListener('init', function(event) {
var page = event.target;

if (page.id === 'list_Events') {
    page.querySelector('#push-button').onclick = function() {
      document.querySelector('#myNavigator').pushPage('view_event.html', {data: {title: event.event}});
    };
}else if (page.id === 'view_event') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
}
});
var notify = function() {
  ons.notification.alert('You have successfully joined this event');
};
