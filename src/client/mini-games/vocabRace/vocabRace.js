app.controller('vocabCtrl', ['$scope', '$http', '$location', 'UserServices', function($scope, $http, $location, UserServices) {
    var gameId;
    var gameName;
    //sets current user
    var user = UserServices.getUser();
    //sets teacherID
    var teacherID =  UserServices.checkforTeacher();
    //blank objects for forms
    $scope.gameForm = {};
    $scope.questionForm = {};
    //displays user
    $scope.showUser = user;

    //get all vocab games from teacher
    $scope.getAllGames = function(){
      $http.get('/vocab/games/' + teacherID)
      .then(function(data){
        $scope.vocabGames = data.data.vocabGames;
      });
    };

    //get one game by id
    $scope.getOneGame = function(id){
      $http.get('/vocab/game/' + id)
      .then(function(data){
        console.log(data);
      });
    };

    //save a new game to a user-no questions
    $scope.createGame = function(){
      gameName = $scope.gameForm.gameName;
      $http.post('/vocab/game', {title:gameName, teacherID: teacherID})
      .then(function(data){
        $scope.gameName = data.data.game.title;
        gameId = data.data.gameID;
        $scope.gameForm ={};
        $scope.addQuestions = true;
      })
      .catch(function(err){
      });
    };

    //add question to game
    $scope.addQuestion = function(){
      var payload = {question: $scope.questionForm.question, answer: $scope.questionForm.answer, id:gameId};
      $http.post('/vocab/question', payload)
      .then(function(data){
        $scope.questionForm = {};
        // $scope.questionNumber = 0;
      }).catch(function(err){
        console.log('err ' ,err);
      });
    };


// <-----------------------  GAME PLAY  ----------------->

    //gameplay variables
    var guess;
    var index = 0;
    var currentQuestion;
    var game = UserServices.getGame();
    var counter = 10;
    var currentGameId;

    //countdown function
    var countDowner, countDown = 10;
    countDowner = function() {
      if (countDown <= 0){
        countDown = 0;
        $scope.showWrong = false;
        $scope.timer = countDown;
        $scope.timesUp = true;
        if(!$scope.showCorrect && !$scope.endVocabGame){
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

    //get game id to play current game
    $scope.getPlayGame = function(id){
      currentGameId = id;
    };

    //start game
    $scope.startGame = function(){
      $scope.questionsWrong = 0;
      $scope.questionsRight = 0;
      $scope.timesUp = false;
      $scope.playing = true;
      $http.get('/vocab/game/' + currentGameId)
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

    //user guess
    $scope.guessVocab = function(){
      $scope.showWrong = false;
      guess = $scope.vocabGameInput;
      $scope.vocabGameInput = '';
      //if matches
      if(guess.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()){
        //end question, show correct. update score
        $scope.timesUp = true;
        $scope.showCorrect = true;
        $scope.questionsRight++;
      }
      //if wrong, show wrong error
      else{
        $scope.showWrong = true;
      }
    };

    //move on to next question
    $scope.nextQuestion = function(){
      //reset all messages
      $scope.timesUp = false;
      $scope.showCorrect = false;
      $scope.showWrongNext = false;
      $scope.showWrong = false;

      //if last question, show end game message
      if(index+1 >= $scope.currentGame.questions.length){
        $scope.endVocabGame = true;
      }
      //goes to next question
      else{
        index +=1;
        //decreases time DO I WANT THIS???  FIX MEEEEE
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

    //ends game
    $scope.endGame = function(){
      console.log('GAME OVER');
    };

    //gets all games on page load
    $scope.getAllGames();

}]);













