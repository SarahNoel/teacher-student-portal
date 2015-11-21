app.directive('teacherLogin', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/teacher-login/teacherLogin.html',
      controller: ['$scope', 'UserServices', '$http', '$location', '$window', '$rootScope', '$auth', function($scope, UserServices, $http, $location, $window, $rootScope, $auth) {

        $scope.teacherLogin = {};
        //login user
        $scope.login = function() {
          var user = {
            email: $scope.teacherLogin.email,
            password: $scope.teacherLogin.password,
          };
          $auth.login(user)
            .then(function(response) {
              $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
              UserServices.storeUser($rootScope.currentUser);
              $scope.teacherForm = {};
              $scope.showUser = UserServices.getUser();
              $location.path('/teacherinfo');
              UserServices.saveTeacher();

            })
            .catch(function(response) {
              console.log(response);
            });
        };
    }]
  };

});
