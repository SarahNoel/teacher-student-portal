app.directive('studentRegister', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/student-register/studentRegister.html',
      controller: ['$scope', 'UserServices', '$http', '$location', function($scope, UserServices, $http, $location) {
        $scope.studentRegister = {};

        //register student
        $scope.studentSignup = function() {
          var room;
          $scope.errorMessage = '';
          var payload= {
            username: $scope.studentRegister.username,
            email: $scope.studentRegister.email,
            password: $scope.studentRegister.password,
            keyword: $scope.studentRegister.keyword
          };
          $http.post('/studentUsers/register', payload)
          .then(function(data){
            if(data.data.err){
              $scope.errorMessage = data.data.err;
            }
            else{
              $scope.studentRegister = {};
              UserServices.storeUser(data.data);
              var room = data.data.teacherID;
              var socket = io.connect();
              scoket.connect();
              socket.emit('login', room);
              UserServices.saveStudent();
              $location.path('/chat');
            }
          });
        };
    }]
  };

});
