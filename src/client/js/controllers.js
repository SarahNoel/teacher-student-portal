//--------------NAVBAR/ETC CONTROLLER---------------//

app.controller('MainController', ['$scope', '$location', '$window', '$auth', '$http', 'UserServices', function($scope, $location, $window, $auth, $http, UserServices){

  //highlights active navbar tab
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  //checks if user is authenticated
  $scope.isLoggedIn= function(){
    $scope.showUser = UserServices.getUser();
    return $auth.isAuthenticated();
   };

  //logs out user
  $scope.logout = function() {
    $auth.logout();
    delete $window.localStorage.currentUser;
  };

  //logout on page reload
  $scope.logout();
}]);


//--------------LOGIN CONTROLLER-------------------//

app.controller('loginCtrl', ['$scope', '$auth', '$rootScope', '$window', '$location', 'UserServices', function($scope, $auth, $rootScope, $window, $location, UserServices) {

  //login user
  $scope.login = function() {
    var user = {
      email: $scope.email,
      password: $scope.password,
    };
    $auth.login(user)
      .then(function(response) {
        console.log(response);
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        UserServices.storeUser($rootScope.currentUser);
        console.log('atLogin ', $rootScope.currentUser);
        $location.path('/user');
      })
      .catch(function(response) {
        console.log(response);
      });
  };

}]);


//--------------REGISTER CONTROLLER-------------------//
app.controller('registerCtrl', ['$scope', '$http', '$auth', '$location', function($scope, $http, $auth, $location) {

  //register user- NOT SAVING NAME
  $scope.signup = function() {
    var user = {
      email: $scope.email,
      password: $scope.password,
      callMe: $scope.userName
    };
    $auth.signup(user)
      .then(function(response){
        $location.path('/login');
      })
      .catch(function(response) {
        console.log(response.data);
      });

  };

}]);

//--------------CHAT CONTROLLER-------------------//

app.controller('chatCtrl', ['$scope', 'UserServices', 'ChatServices', function($scope, UserServices, ChatServices) {

  $scope.MyData= ChatServices;


  }]);
