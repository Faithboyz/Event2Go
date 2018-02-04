 <script src="https://www.gstatic.com/firebasejs/4.8.2/firebase.js"></script>
  <script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBEy6cTMAe5NZAzrQILCPS5rgoEr9vGTXA",
    authDomain: "project-39b2d.firebaseapp.com",
    databaseURL: "https://project-39b2d.firebaseio.com",
    projectId: "project-39b2d",
    storageBucket: "project-39b2d.appspot.com",
    messagingSenderId: "329664062631"
  };
  firebase.initializeApp(config);
  </script>
    <script>
    var module = angular.module('project-39b2d', ['onsen']);
    module.controller('PageController', function($scope) {
      $scope.alert = function(message) {
        ons.notification.alert(message);
      };
    });
  </script>
  <script type="text/javascript" src="cordova.js"></script>

 
  <script type="text/javascript" >                                                                                                                                                                                                                      
var auth = new FirebaseSimpleLogin(firebaseRef, function(error, user) {
    if (!error) {
        if (user) {
            $scope.username = user.email;
            myNavigator.pushPage('home.html', {
                animation: 'slide'
            });
        }
    }
});
  </script>