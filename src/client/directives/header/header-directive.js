app.directive('headerInfo', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/header/header.html',
      controller: ['$scope', 'UserServices', '$http', '$location', '$auth', '$window', function($scope, UserServices, $http, $location, $auth, $window) {

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
          $scope.showUser = UserServices.getUser();
          if($auth.isAuthenticated() || UserServices.getUser()){
            return true;
          }
          return false;
        };

        //logs out user
        $scope.logout = function() {
          console.log('gone!');
          $auth.logout();
          delete $window.localStorage.currentUser;
          UserServices.logout();
          $location.path('/');
        };

        $scope.getUser = function(){
          $scope.showUser = UserServices.getUser();
        };

        //get user
        $scope.getUser();
        //checks if teacher
        $scope.isTeacher();

    }]
  };

});
