app.controller('vocabCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    var gameId;
    var gameName;
    var currentGameId;
    //connect to socket
    var socket = io.connect();
    //sets current user
    var user = UserServices.getUser();
    //sets teacherID
    var teacherID =  UserServices.checkforTeacher();
    //blank objects for forms
    $scope.gameForm = {};
    $scope.questionForm = {};
    //displays user
    $scope.showUser = user;


// <----------------- ADD GAMES/ETC  -------------->

    //get all vocab games from teacher
    $scope.getAllGames = function(){
      $http.get('/vocab/games/' + teacherID)
      .then(function(data){
        $scope.games = data.data;
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
      });
    };

    //add question to game
    $scope.addQuestion = function(){
      var payload = {question: $scope.questionForm.question, answer: $scope.questionForm.answer, id:gameId};
      $http.post('/vocab/question', payload)
      .then(function(data){
        $scope.allQuestions = data.data.questions;
        $scope.questionForm = {};
      });
    };


// // <--------------  LIVE GAME PLAY  ------------->
//     $scope.challengeGame = function(roomID){
//       socket.emit('game-challenge', roomID);
//     };


//     //socket listeners
//     socket.on('game-challenge-received', function(roomID){
//       console.log(roomID);
//     });






// <----------------  SOLO GAME PLAY  --------------->
// UserServices.storeGame('56620a1a6cf8de1300a6ffb1');

    //gameplay variables
    var guess;
    var index = 0;
    var currentQuestion;
    var game = UserServices.getGame();
    var counter = 10;




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


    //start game
    $scope.startGame = function(){
      var gameId = UserServices.getPlayGame();
      $scope.questionsWrong = 0;
      $scope.questionsRight = 0;
      $scope.timesUp = false;
      $scope.playing = true;
      $http.get('/vocab/game/' + gameId)
      .then(function(data){
        //sets current game
        $scope.currentGame = data.data;
        //displays first hint
        currentQuestion = data.data.questions[index];
        $scope.hint = currentQuestion.question;
        $scope.currentAnswer = currentQuestion.answer;
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
      guess = $scope.vocabGameInput.trim();
      $scope.vocabGameInput = '';
      //if blank
      if(guess === ''){
        $scope.showWrong = true;
      }
      //if matches
      else if(guess.toLowerCase() === currentQuestion.answer.trim().toLowerCase()){
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
        $scope.currentAnswer = currentQuestion.answer;
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






// <-----------------------  EDIT GAME  ----------------->
app.controller('editVocabCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    //blank objects for forms
    $scope.editGame = {};
    $scope.editQuestionForm = {};
    $scope.addQuestionForm = {};


    //get one game by id
    $scope.getOneGame = function(){
      var id = UserServices.getGame();
      $http.get('/vocab/game/' + id)
      .then(function(data){
        $scope.editGame = data.data;
      });
    };

    //edit questions
    $scope.getEditQuestion = function(questionID){
      $scope.editingQuestion = true;
      $http.get('/vocab/question/' + questionID)
      .then(function(data){
        $scope.editQuestionForm = data.data;
      })
      .catch(function(err){
        console.log('catch ', err);
      });
    };

    $scope.updateGameTitle = function(gameID){
      var getUrl = '/vocab/game/'+ gameID;
      $http.put(getUrl, {title:$scope.editGame.title})
      .then(function(data){
        console.log(data);
        $scope.getOneGame();
        $scope.showUpdateMessage = true;
        $timeout(function () { $scope.showUpdateMessage = false; }, 3000);

      })
      .catch(function(err){
        console.log(err);
      });
    };

    //update question
    $scope.updateQuestion = function(questionID){
      $http.put('/vocab/question/' + questionID, $scope.editQuestionForm)
      .then(function(data){
        $scope.editQuestionForm = {};
        $scope.getOneGame();
        $scope.editingQuestion = false;
      });
    };

    //adds questions to existing game
    $scope.addQuestionsEditGame = function(){
      $scope.addingQuestion = true;
    };

    //delete question
    $scope.deleteQuestion = function(questionID){
      $http.delete('/vocab/question/' + questionID)
      .then(function(data){
        $scope.getOneGame();
      })
      .catch(function(err){
        console.log(err);
      });
    };

    //save question to game
    $scope.saveQuestion = function(){
      var id = UserServices.getGame();
      var hint = $scope.addQuestionForm;
      var payload = {id:id, question: hint.question, answer: hint.answer};
      $http.post('/vocab/question', payload)
      .then(function(data){
        console.log(data);
        $scope.editGame = data.data;
        $scope.addQuestionForm = {};

      })
      .catch(function(err){
        console.log('err ', err);
      });
    };

    //delete game
    $scope.deleteGame = function(gameID){
      $http.delete('/vocab/game/' + gameID)
      .then(function(){
        $scope.editingQuestion = false;
        $scope.addingQuestion = false;
        $location.path('/teacherinfo');
      });
    };

    //cancels, resets to see questions
    $scope.cancel = function(){
      $scope.editingQuestion = false;
      $scope.addingQuestion = false;
      $scope.editQuestionForm = {};
    };

    $scope.getOneGame();

}]);








