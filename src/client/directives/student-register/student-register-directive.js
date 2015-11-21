app.directive('studentRegister', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/student-register/studentRegister.html',
      controller: ['$scope', 'UserServices', '$http', '$location', function($scope, UserServices, $http, $location) {

        $scope.studentRegister = {};
        //register student
        $scope.studentSignup = function() {
          var payload= {
            username: $scope.studentRegister.username,
            email: $scope.studentRegister.email,
            password: $scope.studentRegister.password,
            keyword: $scope.studentRegister.keyword
          };
          $http.post('/studentUsers/register', payload)
          .then(function(data){
            console.log('then', data);
            $scope.studentRegister = {};
            UserServices.storeUser(data.data);
            UserServices.saveStudent();
            $location.path('/studentinfo');
          })
          .catch(function(data){
            console.log('catch ', data);
          });
        };
    }]
  };

});
