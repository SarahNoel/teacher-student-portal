app.controller("MainController",["$scope","$location","$window","$auth","$http","UserServices",function(e,n,t,o,a,c){}]),app.controller("TeacherCtrl",["$scope","$http","UserServices",function(e,n,t){e.processing=!1,e.doneLoading=!1;var o=io.connect(),a=t.getUser();e.getVocabGame=function(e){t.storeGame(e)},e.getHangmanGame=function(e){t.storeGame(e)},e.allInfo=function(){n.get("/studentUsers/students/"+a._id).then(function(n){e.showUser=n.data,e.doneLoading=!0})},e.deleteVocabGame=function(t){n["delete"]("/vocab/game/"+t).then(function(){e.allInfo()})},e.deleteHangmanGame=function(t){n["delete"]("/hangman/game/"+t).then(function(){e.allInfo()})},e.disableStudent=function(t){e.processing=!0,n.put("/chat/disable/"+t).then(function(n){e.allInfo(),o.emit("alert-change"),e.processing=!1})},e.enableStudent=function(t){e.processing=!0,n.put("/chat/enable/"+t).then(function(n){e.allInfo(),o.emit("alert-change"),e.processing=!1})},e.disableAll=function(){e.processing=!0,n.put("/chat/disableAll/"+a._id).then(function(n){e.allInfo(),o.emit("alert-change"),e.processing=!1})},e.enableAll=function(){e.processing=!0,n.put("/chat/enableAll/"+a._id).then(function(n){e.allInfo(),o.emit("alert-change"),e.processing=!1})},e.allInfo()}]),app.controller("GameCtrl",["$scope","$http","UserServices",function(e,n,t){var o=(t.getUser(),t.checkforTeacher());e.doneLoading=!1,e.allInfo=function(){n.get("/studentUsers/students/"+o).then(function(n){e.games=n.data,e.doneLoading=!0})["catch"](function(n){console.log("catch ",n),e.doneLoading=!0})},e.getPlayGame=function(e){t.storePlayGame(e)},e.allInfo()}]);


// //--------------NAVBAR/ETC CONTROLLER---------------//

// app.controller('MainController', ['$scope', '$location', '$window', '$auth', '$http', 'UserServices', function($scope, $location, $window, $auth, $http, UserServices){

// }]);

// //--------------TEACHER CONTROLLER-------------------//

// app.controller('TeacherCtrl', ['$scope', '$http', 'UserServices',function($scope, $http, UserServices) {

//   $scope.processing = false;
//   $scope.doneLoading = false;
//   var socket = io.connect();
//   //non-populated user
//   var user = UserServices.getUser();

//   //save one vocab game
//   $scope.getVocabGame = function(id){
//     UserServices.storeGame(id);
//   };

//   //save one hangman game
//   $scope.getHangmanGame = function(id){
//     UserServices.storeGame(id);
//   };

//   //get all info from teacher
//   $scope.allInfo = function(){
//     $http.get('/studentUsers/students/'+ user._id)
//     .then(function(data){
//       $scope.showUser = data.data;
//       $scope.doneLoading = true;
//     });
//   };

//   //delete one vocab game
//   $scope.deleteVocabGame = function(gameID){
//     $http.delete('/vocab/game/' + gameID)
//     .then(function(){
//       $scope.allInfo();
//     });
//   };

//   //delete one hangman game
//   $scope.deleteHangmanGame = function(gameID){
//     $http.delete('/hangman/game/' + gameID)
//     .then(function(){
//       $scope.allInfo();
//     });
//   };

//   //disable one student
//   $scope.disableStudent = function(id){
//     $scope.processing = true;
//     $http.put('/chat/disable/' + id)
//     .then(function(data){
//       $scope.allInfo();
//       socket.emit('alert-change');
//       $scope.processing = false;
//     });
//   };

//   //enable one student
//   $scope.enableStudent = function(id){
//     $scope.processing = true;
//     $http.put('/chat/enable/' + id)
//     .then(function(data){
//       $scope.allInfo();
//       socket.emit('alert-change');
//       $scope.processing = false;
//     });
//   };

//   //disable all alerts
//   $scope.disableAll = function(){
//     $scope.processing = true;
//     $http.put('/chat/disableAll/' + user._id)
//     .then(function(data){
//       $scope.allInfo();
//       socket.emit('alert-change');
//       $scope.processing = false;

//     });
//   };

//   //enable all alerts
//   $scope.enableAll = function(){
//     $scope.processing = true;
//     $http.put('/chat/enableAll/' + user._id)
//     .then(function(data){
//       $scope.allInfo();
//       socket.emit('alert-change');
//       $scope.processing = false;

//     });
//   };

//   //get all info on load
//   $scope.allInfo();

// }]);


// app.controller('GameCtrl', ['$scope', '$http', 'UserServices',function($scope, $http, UserServices) {
//   var user = UserServices.getUser();
//   var teacherID = UserServices.checkforTeacher();
//   $scope.doneLoading = false;

//   //get all game info for playing
//   $scope.allInfo = function(){
//       $http.get('/studentUsers/students/'+ teacherID)
//       .then(function(data){
//         $scope.games = data.data;
//         $scope.doneLoading = true;

//       })
//       .catch(function(data){
//         console.log('catch ', data);
//         $scope.doneLoading = true;
//       });
//     };


//   //store game id to play current game
//   $scope.getPlayGame = function(id){
//     UserServices.storePlayGame(id);
//   };

//   //get all games on load
//   $scope.allInfo();


// }]);

