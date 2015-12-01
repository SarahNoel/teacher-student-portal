//--------------NAVBAR/ETC CONTROLLER---------------//

app.controller('MainController', ['$scope', '$location', '$window', '$auth', '$http', 'UserServices', function($scope, $location, $window, $auth, $http, UserServices){

}]);

//--------------TEACHER CONTROLLER-------------------//

app.controller('TeacherCtrl', ['$scope', '$http', 'UserServices',function($scope, $http, UserServices) {

  //non-populated user
  var user = UserServices.getUser();

  $scope.getVocabGame = function(id){
    UserServices.storeGame(id);
  };

  $scope.getHangmanGame = function(id){
    UserServices.storeGame(id);
  };

  $scope.allInfo = function(){
    $http.get('/studentUsers/students/'+ user._id)
    .then(function(data){
      $scope.showUser = data.data;
    });
  };

  $scope.getOneStudent = function(id){
    console.log(id);
  };

  //delete game
  $scope.deleteVocabGame = function(gameID){
    $http.delete('/vocab/game/' + gameID)
    .then(function(){
      $scope.allInfo();
    });
  };

  $scope.allInfo();

}]);





app.controller('GameCtrl', ['$scope', '$http', 'UserServices',function($scope, $http, UserServices) {
  var user = UserServices.getUser();
  var teacherID = UserServices.checkforTeacher();

  //get all game info for playing
  $scope.allInfo = function(){
      $http.get('/studentUsers/students/'+ teacherID)
      .then(function(data){
        $scope.games = data.data;
      })
      .catch(function(data){
        console.log('catch ', data);
      });
    };


  //store game id to play current game
  $scope.getPlayGame = function(id){
    UserServices.storePlayGame(id);
  };

  //get all games on load
  $scope.allInfo();


}]);

