app.controller('resourceCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {

    //non-populated user
    var user = UserServices.getUser();
    var teacherID = UserServices.checkforTeacher();

    function allInfo(){
      $http.get('/studentUsers/students/'+ teacherID)
      .then(function(data){
        $scope.showUser = data.data;
      });
    }

    //store resource for editing
    $scope.storeResource = function(id) {
      UserServices.storeResource(id);
    };

    //checks if teacher
    $scope.isTeacher = function () {
      return UserServices.isTeacher();
    };

    //populate on load
    allInfo();

}]);

app.controller('createResourceCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    $scope.resource = {};
    //non-populated user
    var user = UserServices.getUser();

    //checks if teacher
    $scope.createResource = function () {
      $http.post('/resources/' +user._id, $scope.resource)
      .then(function(data){
        $location.path('/resources');
      });
    };

}]);

app.controller('editResourceCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {

    var user = UserServices.getUser();
    var teacherID = UserServices.checkforTeacher();
    var resource = UserServices.getResource();

    function getResource(){
      $http.get('/resources/'+ resource)
      .then(function(data){
        $scope.resource = data.data;
      });
    }

    //updates
    $scope.updateResource = function(id){
      var site = $scope.resource;
      var payload = {title: site.title, url: site.url, description: site.description};
      $http.put('/resources/' + id, payload)
      .then(function(data){
      });
    };

    //deletes
    $scope.deleteResource = function(id){
      $http.delete('/resources/' + id)
      .then(function(data){
        $location.path('/resources');
        });
    };

    //gets resource on load
    getResource();
}]);
















