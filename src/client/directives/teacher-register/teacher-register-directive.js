app.directive('teacherRegister', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/teacher-register/teacherRegister.html',
      controller: ['$scope', 'UserServices', '$http', '$location', '$auth', function($scope, UserServices, $http, $location, $auth) {

        $scope.teacherForm = {};

        //register teacher
        $scope.signup = function() {
          var user = {
            email: $scope.teacherForm.email,
            password: $scope.teacherForm.password,
            keyword: $scope.teacherForm.keyword,
            username: $scope.teacherForm.username
          };
          $auth.signup(user)
            .then(function(response){
              $auth.login(user);
              UserServices.storeUser(user);
              UserServices.saveTeacher();
              $scope.teacherForm = {};
              $location.path('/login');
            })
            .catch(function(response) {
              console.log(response.data);
            });

        };

    }]
  };

});
