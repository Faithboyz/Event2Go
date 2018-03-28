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

	if(!$scope.username){
		$location.path('/home');
	}
	var rev = firebase.database().ref("Event");
	rev.orderByChild("email").equalTo($scope.username).on("child_added", function(snapshot) {
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

	var list = firebase.database().ref().child('Event');
	$scope.events = $firebaseArray(list);

	$scope.editEvent = function(id){
		var ref = firebase.database().ref().child('Event/' + id);
		$scope.editPostData = $firebaseObject(ref);
	};

	$scope.updateEvent = function(id){
		var ref = firebase.database().ref().child('Event/' + id);
		ref.update({
			title: $scope.editPostData.title,
			post: $scope.editPostData.post
		}).then(function(ref){
			$scope.$apply(function(){
				$("#editModal").modal('hide');
			});
		}, function(error){
			console.log(error);
		});
	};

	$scope.deleteCnf = function(article){
		$scope.deleteArticle = article;
	};

	$scope.deleteEvent = function(deleteArticle){
		$scope.articles.$remove(deleteArticle);
		$("#deleteModal").modal('hide');
	};

	$scope.logout = function(){
		CommonProp.logoutUser();
	}

}]);

	function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
	}

	function closeNav() {
	    document.getElementById("mySidenav").style.width = "0";
	}