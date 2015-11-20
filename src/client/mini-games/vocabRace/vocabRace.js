app.controller('vocabCtrl', ['$scope', '$http', '$location', 'UserServices', function($scope, $http, $location, UserServices) {
    $scope.gameForm = {};
    $scope.questionForm = {};
    var gameId;
    var gameName;
    var user = UserServices.getUser();
    $scope.showUser = user;

    //get all vocab games from user
    $scope.getAllGames = function(){
      $http.get('/vocab/games/' + user._id)
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

    //save a new game to a user-no questions
    $scope.createGame = function(){
      gameName = $scope.gameForm.gameName;
      $http.post('/vocab/game', {title:gameName, teacherID: user._id})
      .then(function(data){
        $scope.gameName = data.data.game.title;
        console.log(data.data);
        gameId = data.data.gameID;
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
        console.log('then ', data);
        $scope.questionForm = {};
        // $scope.allQuestions = data.data.questions;
        $scope.questionNumber = 0;
      }).catch(function(err){
        console.log('err ' ,err);
      });
    };

    $scope.getAllGames();


}]);


app.controller('playVocabCtrl', ['$scope', '$http', '$location','$timeout', 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    var user = UserServices.getUser();
    $scope.showUser = user;

    var guess;
    var index = 0;
    var currentQuestion;
    var game = UserServices.getGame();
    var counter = 10;
    var id = '564e2514ef173b531bc1da34';

    //countdown function
    var countDowner, countDown = 10;
    countDowner = function() {
      if (countDown <= 0){
        countDown = 0;
        $scope.showWrong = false;
        $scope.timer = countDown;
        $scope.timesUp = true;
        if(!$scope.showCorrect){
          $scope.showWrongNext = true;
          $scope.questionsWrong++;
        }
        return; // quit
      } else {
        $scope.timer = countDown; // update scope
        countDown--; // -1
        $timeout(countDowner, 1000); // loop it again
      }
    };
    $scope.timer = countDown;

    //start game
    $scope.startGame = function(){
      $scope.questionsWrong = 0;
      $scope.questionsRight = 0;
      $scope.timesUp = false;
      $scope.playing = true;
      $http.get('/vocab/game/' + id)
      .then(function(data){
        //sets current game
        $scope.currentGame = data.data;
        //displays first hint
        currentQuestion = data.data.questions[index];
        $scope.hint = currentQuestion.question;
        //starts countdown
        countDowner();
      })
      .catch(function(data){
        $scope.error = data.data;
      });
    };



    $scope.guessVocab = function(){
      $scope.showWrong = false;
      guess = $scope.vocabGameInput;
      $scope.vocabGameInput = '';
      if(guess.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()){
        $scope.timesUp = true;
        $scope.showCorrect = true;
        $scope.questionsRight++;

      }
      else{
        console.log('wrong!');
        $scope.showWrong = true;


      }
    };


    $scope.nextQuestion = function(){
      $scope.timesUp = false;
      $scope.showCorrect = false;
      $scope.showWrongNext = false;
      $scope.showWrong = false;

      //goes to next question
      if(index+1 >= $scope.currentGame.questions.length){
        $scope.endVocabGame = true;
      }
      else{
        index +=1;
        //decreases time
        // counter --;
        // finds next question in array
        currentQuestion = $scope.currentGame.questions[index];
        //displays next hint
        $scope.hint = currentQuestion.question;
        countDown = counter;
        //starts countdown
        countDowner();
      }
    };

    $scope.endGame = function(){
      console.log('GAME OVER');
    };

}]);













