app.directive('teacherRegister', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/teacher-register/teacherRegister.html',
      controller: ['$scope', 'UserServices', '$http', '$location', '$auth', function($scope, UserServices, $http, $location, $auth) {

        $scope.teacherForm = {};

        //register teacher
        $scope.signup = function() {
          var user = {
            email: $scope.teacherForm.email.trim(),
            password: $scope.teacherForm.password.trim(),
            keyword: $scope.teacherForm.keyword.trim(),
            username: $scope.teacherForm.username.trim(),
            phone: $scope.teacherForm.phone.replace(/\D/g,'')
          };
          $auth.signup(user)
            .then(function(response){
              $auth.login(user);
              UserServices.storeUser(user);
              UserServices.saveTeacher();
              var room = user._id;
              var socket = io.connect();
              socket.emit('login', room);
              $scope.teacherForm = {};
              $location.path('/login');
            })
            .catch(function(response) {
              $scope.errorMessage = response.data.message;
            });
        };

    }]
  };

});
