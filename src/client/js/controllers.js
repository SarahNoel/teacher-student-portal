//--------------NAVBAR/ETC CONTROLLER---------------//

app.controller('MainController', ['$scope', '$location', '$window', '$auth', '$http', 'UserServices', function($scope, $location, $window, $auth, $http, UserServices){

//   //highlights active navbar tab
//   $scope.isActive = function (viewLocation) {
//     return viewLocation === $location.path();
//   };

//   $scope.isTeacher = function(){
//     return UserServices.isTeacher();
//   };

//   //checks if user is authenticated
//   $scope.isLoggedIn= function(){
//     $scope.showUser = UserServices.getUser();
//     if($auth.isAuthenticated() || UserServices.getUser()){
//       return true;
//     }
//     return false;
//   };

//   //logs out user
//   $scope.logout = function() {
//     console.log('gone!');
//     $auth.logout();
//     delete $window.localStorage.currentUser;
//     UserServices.logout();
//     $location.path('/');
//   };

//   $scope.getUser = function(){
//     $scope.showUser = UserServices.getUser();
//   };

//   //get user
//   $scope.getUser();
//   //checks if teacher
//   $scope.isTeacher();

}]);

//--------------TEACHER CONTROLLER-------------------//

app.controller('TeacherCtrl', ['$scope', '$http', 'UserServices',function($scope, $http, UserServices) {

  //non-populated user
  var user = UserServices.getUser();

  $scope.getVocabGame = function(id){
    console.log(id);
  };

  $scope.allInfo = function(){
    $http.get('/studentUsers/students/'+ user._id)
    .then(function(data){
      console.log('then ', data.data);
      $scope.showUser = data.data;
    })
    .catch(function(data){
      console.log('catch ', data);
    });
  };

  $scope.allInfo();

}]);


//--------------CHAT CONTROLLER-------------------//

app.controller('chatCtrl', ['$scope', 'UserServices', 'ChatServices', function($scope, UserServices, ChatServices) {

  $scope.MyData= ChatServices;


}]);
