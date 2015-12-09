app.controller("resourceCtrl",["$scope","$http","$location","$timeout","UserServices",function(e,t,r,o,c){function s(){t.get("/studentUsers/students/"+n).then(function(t){e.showUser=t.data,e.doneLoading=!0})}var n=(c.getUser(),c.checkforTeacher());e.doneLoading=!1,e.storeResource=function(e){c.storeResource(e)},e.isTeacher=function(){return c.isTeacher()},s()}]),app.controller("createResourceCtrl",["$scope","$http","$location","$timeout","UserServices",function(e,t,r,o,c){e.resource={};var s=c.getUser();e.createResource=function(){t.post("/resources/"+s._id,e.resource).then(function(e){r.path("/resources")})}}]),app.controller("editResourceCtrl",["$scope","$http","$location","$timeout","UserServices",function(e,t,r,o,c){function s(){t.get("/resources/"+n).then(function(t){e.resource=t.data})}var n=(c.getUser(),c.checkforTeacher(),c.getResource());e.updateResource=function(r){var o=e.resource,c={title:o.title,url:o.url,description:o.description};t.put("/resources/"+r,c).then(function(e){})},e.deleteResource=function(e){t["delete"]("/resources/"+e).then(function(e){r.path("/resources")})},s()}]);

// app.controller('resourceCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {

//     //non-populated user
//     var user = UserServices.getUser();
//     var teacherID = UserServices.checkforTeacher();
//     $scope.doneLoading = false;

//     function allInfo(){
//       $http.get('/studentUsers/students/'+ teacherID)
//       .then(function(data){
//         $scope.showUser = data.data;
//         $scope.doneLoading = true;
//       });
//     }

//     //store resource for editing
//     $scope.storeResource = function(id) {
//       UserServices.storeResource(id);
//     };

//     //checks if teacher
//     $scope.isTeacher = function () {
//       return UserServices.isTeacher();
//     };

//     //populate on load
//     allInfo();

// }]);

// app.controller('createResourceCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
//     $scope.resource = {};
//     //non-populated user
//     var user = UserServices.getUser();

//     //checks if teacher
//     $scope.createResource = function () {
//       $http.post('/resources/' +user._id, $scope.resource)
//       .then(function(data){
//         $location.path('/resources');
//       });
//     };

// }]);

// app.controller('editResourceCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {

//     var user = UserServices.getUser();
//     var teacherID = UserServices.checkforTeacher();
//     var resource = UserServices.getResource();

//     function getResource(){
//       $http.get('/resources/'+ resource)
//       .then(function(data){
//         $scope.resource = data.data;
//       });
//     }

//     //updates
//     $scope.updateResource = function(id){
//       var site = $scope.resource;
//       var payload = {title: site.title, url: site.url, description: site.description};
//       $http.put('/resources/' + id, payload)
//       .then(function(data){
//       });
//     };

//     //deletes
//     $scope.deleteResource = function(id){
//       $http.delete('/resources/' + id)
//       .then(function(data){
//         $location.path('/resources');
//         });
//     };

//     //gets resource on load
//     getResource();
// }]);
















