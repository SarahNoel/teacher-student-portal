//--------------NAVBAR/ETC CONTROLLER---------------//

app.controller('MainController', ['$scope', '$location', '$window', '$auth', '$http', 'UserServices', function($scope, $location, $window, $auth, $http, UserServices){

}]);

//--------------TEACHER CONTROLLER-------------------//

app.controller('TeacherCtrl', ['$scope', '$http', 'UserServices',function($scope, $http, UserServices) {

  $scope.processing = false;
  $scope.doneLoading = false;
  var socket = io.connect();
  //non-populated user
  var user = UserServices.getUser();


  //add word to filter
  $scope.addWord = function(){
    $http.put('/chat/addword/' + user._id, {word:$scope.addWordForm})
    .then(function(data){
      user = data.data;
      UserServices.storeUser(data.data);
      $scope.showUser = data.data;
    });
    $scope.addWordForm = '';
  };

  //remove word to filter
  $scope.removeWord = function(word){
    $http.put('/chat/removeword/' + user._id, {word:word})
    .then(function(data){
      user = data.data;
      UserServices.storeUser(data.data);
      $scope.showUser = data.data;
    });
    $scope.addWordForm = '';
  };

  //save one vocab game
  $scope.getVocabGame = function(id){
    UserServices.storeGame(id);
  };

  //save one hangman game
  $scope.getHangmanGame = function(id){
    UserServices.storeGame(id);
  };

  //get all info from teacher
  $scope.allInfo = function(){
    $http.get('/studentUsers/students/'+ user._id)
    .then(function(data){
      $scope.showUser = data.data;
      $scope.doneLoading = true;
    });
  };

  //delete one vocab game
  $scope.deleteVocabGame = function(gameID){
    $http.delete('/vocab/game/' + gameID)
    .then(function(){
      $scope.allInfo();
    });
  };

  //delete one hangman game
  $scope.deleteHangmanGame = function(gameID){
    $http.delete('/hangman/game/' + gameID)
    .then(function(){
      $scope.allInfo();
    });
  };

  //disable one student
  $scope.disableStudent = function(id){
    $scope.processing = true;
    $http.put('/chat/disable/' + id)
    .then(function(data){
      $scope.allInfo();
      socket.emit('alert-change');
      $scope.processing = false;
    });
  };

  //enable one student
  $scope.enableStudent = function(id){
    $scope.processing = true;
    $http.put('/chat/enable/' + id)
    .then(function(data){
      $scope.allInfo();
      socket.emit('alert-change');
      $scope.processing = false;
    });
  };

  //disable all alerts
  $scope.disableAll = function(){
    $scope.processing = true;
    $http.put('/chat/disableAll/' + user._id)
    .then(function(data){
      $scope.allInfo();
      socket.emit('alert-change');
      $scope.processing = false;

    });
  };

  //enable all alerts
  $scope.enableAll = function(){
    $scope.processing = true;
    $http.put('/chat/enableAll/' + user._id)
    .then(function(data){
      $scope.allInfo();
      socket.emit('alert-change');
      $scope.processing = false;

    });
  };

  //get all info on load
  $scope.allInfo();

}]);


app.controller('GameCtrl', ['$scope', '$http', 'UserServices',function($scope, $http, UserServices) {
  var user = UserServices.getUser();
  var teacherID = UserServices.checkforTeacher();
  $scope.doneLoading = false;

  //get all game info for playing
  $scope.allInfo = function(){
      $http.get('/studentUsers/students/'+ teacherID)
      .then(function(data){
        $scope.games = data.data;
        $scope.doneLoading = true;

      })
      .catch(function(data){
        $scope.doneLoading = true;
      });
    };


  //store game id to play current game
  $scope.getPlayGame = function(id){
    UserServices.storePlayGame(id);
  };

  //get all games on load
  $scope.allInfo();


}]);

