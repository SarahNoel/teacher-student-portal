app.controller('vocabCtrl', ['$scope', '$http', '$location', 'UserServices', function($scope, $http, $location, UserServices) {
    $scope.gameForm = {};
    $scope.questionForm = {};
    var gameId;
    var gameName;
    var user = UserServices.getUser();
    $scope.showUser = user;

    //get all vocab games
    $scope.getAllGames = function(){
      $http.get('/vocab/games')
      .then(function(data){
        console.log(data);
      });
    };

    //get one game
    $scope.getOneGame = function(id){
      $http.get('/vocab/game/' + id)
      .then(function(data){
        console.log(data);
      });
    };


    //create a new game-no questions
    $scope.createGame = function(){
      gameName = $scope.gameForm.gameName;
      $http.post('/vocab/game', {title:gameName})
      .then(function(data){
        $scope.gameName = data.data.title;
        gameId = data.data._id;
        $scope.gameForm ={};
        $scope.addQuestions = true;
      })
      .catch(function(err){
        console.log(err);
      });
    };

    //add question to game
    $scope.addQuestion = function(){
      var payload = {question: $scope.questionForm.question, answer: $scope.questionForm.answer, id:gameId};
      $http.post('/vocab/question', payload)
      .then(function(data){
        $scope.questionForm = {};
        $scope.allQuestions = data.data.questions;
        $scope.questionNumber = 0;
      }).catch(function(err){
        console.log(err);
      });
    };

}]);
