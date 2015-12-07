app.directive('teacherRegister', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/teacher-register/teacherRegister.html',
      controller: ['$scope', 'UserServices', '$http', '$location', '$auth', 'SeedServices', function($scope, UserServices, $http, $location, $auth, SeedServices) {

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
            .then(function(data){
              $auth.login(user);
              UserServices.storeUser(data.data.user);
              UserServices.saveTeacher();
              var room = data.data.user._id;
              var socket = io.connect();
              socket.connect();
              socket.emit('login', room);
              $scope.teacherForm = {};
              SeedServices.seedResources(data.data.user);
              $location.path('/teacherinfo');
            })
            .catch(function(data) {
              $scope.errorMessage = data.data.message;
            });
        };
    }]
  };

});
