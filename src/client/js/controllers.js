app.controller('MainController', ['$scope', '$location', '$window', '$auth', '$http', function($scope, $location, $window, $auth, $http){
  $scope.showUser = '';

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.isLoggedIn= function(){
    return $auth.isAuthenticated();
   };

  $scope.logout = function() {
    $auth.logout();
    delete $window.localStorage.currentUser;
  };

  console.log($auth.getPayload());
  $scope.showUser = '';


}]);

app.controller('loginCtrl', ['$scope', '$auth', '$rootScope', '$window', '$location', function($scope, $auth, $rootScope, $window, $location) {

  $scope.login = function() {

    var user = {
      email: $scope.email,
      password: $scope.password
    };

    $auth.login(user)
      .then(function(response) {
        console.log(response);
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        $scope.showUser = $rootScope.currentUser;
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
      password: $scope.password
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
