//--------------NAVBAR/ETC CONTROLLER---------------//

app.controller('MainController', ['$scope', '$location', '$window', '$auth', '$http', 'UserServices', function($scope, $location, $window, $auth, $http, UserServices){

  //highlights active navbar tab
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  //checks if user is authenticated
  $scope.isLoggedIn= function(){
    $scope.showUser = UserServices.getUser();
    return $auth.isAuthenticated();
   };

  //logs out user
  $scope.logout = function() {
    $auth.logout();
    delete $window.localStorage.currentUser;
  };

  //logout on page reload
  $scope.logout();
}]);


//----------TEACHER REGISTER CONTROLLER--------------//
app.controller('registerCtrl', ['$scope', '$http', '$auth', '$location', function($scope, $http, $auth, $location) {

  //register user- NOT SAVING NAME
  $scope.signup = function() {
    var user = {
      email: $scope.email,
      password: $scope.password,
      callMe: $scope.userName
    };
    $auth.signup(user)
      .then(function(response){
        $location.path('/login');
      })
      .catch(function(response) {
        console.log(response.data);
      });

  };

}]);


//------------TEACHER LOGIN CONTROLLER---------------//

app.controller('loginCtrl', ['$scope', '$auth', '$rootScope', '$window', '$location', 'UserServices', function($scope, $auth, $rootScope, $window, $location, UserServices) {

  //login user
  $scope.login = function() {
    var user = {
      email: $scope.email,
      password: $scope.password,
    };
    $auth.login(user)
      .then(function(response) {
        console.log(response);
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        UserServices.storeUser($rootScope.currentUser);
        console.log('atLogin ', $rootScope.currentUser);
        $location.path('/user');
      })
      .catch(function(response) {
        console.log(response);
      });
  };

}]);

//------------STUDENT LOGIN CONTROLLER---------------//

app.controller('studentLoginCtrl', ['$scope', '$http', '$location', 'UserServices', function($scope, $http, $location, UserServices) {

  //login user
  $scope.studentLogin = function() {
    var payload= {
      name: $scope.studentForm.name,
      email: $scope.studentForm.email,
      password: $scope.studentForm.password
    };
    $http.post('/studentUsers/login', payload)
    .then(function(data){
      console.log('then', data);
    })
    .catch(function(data){
      console.log('catch ', data);

    });
    console.log('herro');
  };

}]);


//----------STUDENT REGISTER CONTROLLER--------------//
app.controller('studentRegisterCtrl', ['$scope', '$http', 'UserServices', function($scope, $http, UserServices) {

  //register student
  $scope.studentSignup = function() {
    var payload= {
      name: $scope.studentForm.name,
      email: $scope.studentForm.email,
      password: $scope.studentForm.password
    };
    $http.post('/studentUsers/register', payload)
    .then(function(data){
      console.log('then', data);
    })
    .catch(function(data){
      console.log('catch ', data);

    });
  };


}]);

//--------------CHAT CONTROLLER-------------------//

app.controller('chatCtrl', ['$scope', 'UserServices', 'ChatServices', function($scope, UserServices, ChatServices) {

  $scope.MyData= ChatServices;


  }]);
