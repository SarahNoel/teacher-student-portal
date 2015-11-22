app.directive('studentLogin', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/student-login/studentLogin.html',
      controller: ['$scope', 'UserServices', '$http', '$location', function($scope, UserServices, $http, $location) {
        $scope.studentForm = {};
        //login user
        $scope.studentLogin = function() {
          var payload= {
            email: $scope.studentForm.email,
            password: $scope.studentForm.password
          };
          console.log(payload);
          $http.post('/studentUsers/login', payload)
          .then(function(data){
            console.log('then', data);
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
