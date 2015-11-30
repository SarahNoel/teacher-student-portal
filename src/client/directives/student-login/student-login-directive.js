app.directive('studentLogin', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/student-login/studentLogin.html',
      controller: ['$scope', 'UserServices', '$http', '$location', function($scope, UserServices, $http, $location) {
        $scope.studentForm = {};
        //login user
        $scope.studentLogin = function() {
          $scope.errorMessage = '';
          var payload= {
            email: $scope.studentForm.email,
            password: $scope.studentForm.password
          };
          $http.post('/studentUsers/login', payload)
          .then(function(data){
            if(data.data.err){
              $scope.errorMessage = data.data.err;
            }
            else{
            UserServices.storeUser(data.data);
            var room = data.data.teacherID;
            var socket = io.connect();
            socket.emit('login', room);
            UserServices.saveStudent();
            $location.path('/studentinfo');
            }
          });
        };
    }]
  };

});
