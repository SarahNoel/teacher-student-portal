app.controller('MainController', ['$scope', '$location', '$window', '$auth', '$http', 'UserServices', function($scope, $location, $window, $auth, $http, UserServices){


  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.isLoggedIn= function(){
    $scope.showUser = UserServices.getUser();
    return $auth.isAuthenticated();
   };

  $scope.logout = function() {
    $auth.logout();
    delete $window.localStorage.currentUser;
  };

  //logout on page reload
  $scope.logout();
}]);

app.controller('loginCtrl', ['$scope', '$auth', '$rootScope', '$window', '$location', 'UserServices', function($scope, $auth, $rootScope, $window, $location, UserServices) {

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

app.controller('registerCtrl', ['$scope', '$http', '$auth', '$location', function($scope, $http, $auth, $location) {

  $scope.signup = function() {

    var user = {
      email: $scope.email,
      password: $scope.password,
      callMe: $scope.userName
    };

    console.log(user);
    $auth.signup(user)
      .then(function(response){
        $location.path('/login');
      })
      .catch(function(response) {
        console.log(response.data);
      });

  };

}]);
