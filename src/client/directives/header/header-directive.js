app.directive('headerInfo', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/header/header.html',
      controller: ['$scope', 'UserServices', '$http', '$location', '$auth', '$window', function($scope, UserServices, $http, $location, $auth, $window) {
        var socket = io.connect();
        //highlights active navbar tab
        $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
        };

        $scope.isTeacher = function(){
          return UserServices.isTeacher();
        };

        $scope.isStudent = function(){
          return UserServices.isStudent();
        };

        //checks if user is authenticated
        $scope.isLoggedIn= function(){
          if(UserServices.isLoggedIn()){
            $scope.showUser = UserServices.getUser();
            return true;
          }
          return false;
        };

        //logs out user
        $scope.logout = function() {
          $auth.logout();
          delete $window.localStorage.currentUser;
          UserServices.logout();
          $location.path('/');
          socket.emit('logout');
        };

        $scope.getUser = function(){
          $scope.showUser = UserServices.getUser();
        };

    }]
  };

});
