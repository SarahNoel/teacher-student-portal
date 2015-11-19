//--------------NAVBAR/ETC CONTROLLER---------------//

app.controller('MainController', ['$scope', '$location', '$window', '$auth', '$http', 'UserServices', function($scope, $location, $window, $auth, $http, UserServices){

  //highlights active navbar tab
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  //checks if user is authenticated
  $scope.isLoggedIn= function(){
    $scope.showUser = UserServices.getUser();
    if($auth.isAuthenticated() || UserServices.getUser()){
      return true;
    }
    return false;
  };

  //logs out user
  $scope.logout = function() {
    console.log('gone!');
    $auth.logout();
    delete $window.localStorage.currentUser;
    UserServices.logout();
    $location.path('/');
  };

  $scope.getUser = function(){
    $scope.showUser = UserServices.getUser();
  };

  //get user
  $scope.getUser();

}]);


//----------TEACHER REGISTER CONTROLLER--------------//
app.controller('registerCtrl', ['$scope', '$http', '$auth', '$location', 'UserServices', function($scope, $http, $auth, $location, UserServices) {

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
        $scope.teacherForm = {};
        $location.path('/login');
      })
      .catch(function(response) {
        console.log(response.data);
      });

  };

}]);


//------------TEACHER LOGIN CONTROLLER---------------//

app.controller('loginCtrl', ['$scope', '$auth', '$rootScope', '$window', '$location', 'UserServices', function($scope, $auth, $rootScope, $window, $location, UserServices) {

  $scope.teacherLogin = {};
  //login user
  $scope.login = function() {
    var user = {
      email: $scope.teacherLogin.email,
      password: $scope.teacherLogin.password,
    };
    $auth.login(user)
      .then(function(response) {
        console.log(response);
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        UserServices.storeUser($rootScope.currentUser);
        $scope.teacherForm = {};
        console.log('atLogin ', $rootScope.currentUser);
        $location.path('/teacherinfo');
      })
      .catch(function(response) {
        console.log(response);
      });
  };

}]);

//------------STUDENT LOGIN CONTROLLER---------------//

app.controller('studentLoginCtrl', ['$scope', '$http', '$location', 'UserServices', function($scope, $http, $location, UserServices) {

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
      $location.path('/studentinfo');

    })
    .catch(function(data){
      console.log('catch ', data);

    });
  };

}]);


//----------STUDENT REGISTER CONTROLLER--------------//
app.controller('studentRegisterCtrl', ['$scope', '$http', '$location', 'UserServices', function($scope, $http, $location, UserServices) {

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
      $location.path('/studentinfo');
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
