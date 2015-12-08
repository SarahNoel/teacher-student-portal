app.directive('teacherLogin', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/teacher-login/teacherLogin.html',
      controller: ['$scope', 'UserServices', '$http', '$location', '$window', '$rootScope', '$auth', function($scope, UserServices, $http, $location, $window, $rootScope, $auth) {
        var socket = io.connect();

        $scope.teacherLogin = {};
        //login user
        // $scope.teacherLogin.email = 'hi@gmail.com';
        // $scope.teacherLogin.password = '123';

        $scope.login = function() {
          $scope.errorMessage = '';
          $scope.secondErrorMessage = '';
          var user = {
            email: $scope.teacherLogin.email,
            password: $scope.teacherLogin.password,
          };
          $auth.login(user)
            .then(function(response) {
              socket.connect();
              $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
              UserServices.storeUser($rootScope.currentUser);
              $scope.teacherForm = {};
              $scope.showUser = UserServices.getUser();
              $location.path('/teacherinfo');
              UserServices.saveTeacher();
              var room = response.data.user._id;
              socket.emit('login', room);
            })
            .catch(function(response) {
              if(response.data.message.email){
              $scope.errorMessage = 'Sorry, that email is not registered.';
              }
              else{
              $scope.errorMessage = 'Sorry, incorrect password.';
              }
            });
        };
    }]
  };

});
