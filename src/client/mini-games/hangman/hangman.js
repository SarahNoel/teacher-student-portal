app.controller('hangmanCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    var gameId;
    var gameName;
    var currentGameId;
    //sets current user
    var user = UserServices.getUser();
    //sets teacherID
    var teacherID =  UserServices.checkforTeacher();
    //blank object for form
    $scope.gameForm = {};
    //displays user
    $scope.showUser = user;


// <------------------ ADD GAMES/ETC  ----------------->

    //get all hangman games from teacher
    $scope.getAllGames = function(){
      $http.get('/hangman/games/' + teacherID)
      .then(function(data){
        $scope.hangmanGames = data.data.hangmanGames;
      });
    };

    //save a new game to a user
    $scope.createGame = function(){
      var game = $scope.gameForm;
      $http.post('/hangman/game', {title:game.title, words:game.words, teacherID: teacherID})
      .then(function(data){
        $scope.gameForm ={};
        $location.path('/#/teacherinfo');
      })
      .catch(function(err){
        $scope.error = err;
      });
    };

// <-------------------  GAME PLAY  ----------------->

    //get game id to play current game
    $scope.getPlayGame = function(id){
      UserServices.storePlayGame(id);
    };

    //gameplay variables
    var words;
    var wordArr;
    var wordArray =[];
    var index = 0;
    var guessedRight = 0;
    var currentWord;
    var game = UserServices.getGame();
    var counter = 10;
    var gallowCount = 1;
    var picked = [];
    var pickedWrong = 0;
    $scope.questionsWrong = 0;
    $scope.questionsRight = 0;
    $scope.wordSpot = wordArray;

    $scope.hangmanGallows = '../../public/images/gallows' + gallowCount + '.gif';

    //start game
    $scope.playGame = function(){
      var gameId = UserServices.getPlayGame();
      $scope.questionsWrong = 0;
      $scope.questionsRight = 0;
      // $http.get('/hangman/game/' + gameID)
      $http.get('/hangman/game/5653e9e8017f3449b48b09ee')
      .then(function(data){
        words = data.data.words;
        words = words.join(',').split(',');
        //sets current game
        $scope.currentGame = data.data;
        //displays first word
        currentWord = words[index].trim().toLowerCase();
        wordArr = currentWord.split('');
        //starts countdown
        for (var i = 0; i < currentWord.length; i++) {
          wordArray.push('_');
         }
      })
      .catch(function(data){
        $scope.error = data.data;
      });
    };

    $scope.nextQuestion = function(){

    };

    $scope.guessLetter = function(letter){
      if(wordArr.indexOf(letter) === -1){
        pickedWrong++;
        gallowCount++;
        $scope.hangmanGallows = '../../public/images/gallows' + gallowCount + '.gif';
      }
      else{
        for (var i = 0; i < wordArr.length; i++) {
          if(wordArr[i]===letter){
            guessedRight++;
            $scope.wordSpot.splice(i, 1, letter);
            console.log('wooo');
          }
        }
      }
      if(guessedRight === wordArr.length){
        $scope.rightWord = true;
        console.log('its overr');
      }
      else if(pickedWrong >=6){
        console.log("game overrr");
        gallowCount++;
        $scope.wordOver = true;
        $scope.questionsWrong++;
        if(index + 1 === words.length -1){
          console.log('end of everythibnnngggg');
          $scope.gameOver = true;
        }
        else{
          console.log("Next question!");
          index++;
          $scope.moveToNext = true;
        }
      }

    };


    //ends game
    $scope.endGame = function(){
      console.log('GAME OVER');
    };

    //start game on page load
    $scope.playGame();

}]);

// <--------------------  EDIT GAME  ----------------->
app.controller('editHangmanCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    //blank objects for forms
    $scope.editGameForm = {};


    //get one game by id
    $scope.getOneGame = function(){
      var id = UserServices.getGame();
      console.log(id);
      $http.get('/hangman/game/' + id)
      .then(function(data){
        console.log(data);
        $scope.editGameForm = data.data;
      });
    };

    //edit questions
    $scope.getEditQuestion = function(questionID){
      $scope.editingQuestion = true;
      $http.get('/hangman/question/' + questionID)
      .then(function(data){
        $scope.editQuestionForm = data.data;
      })
      .catch(function(err){
        console.log('catch ', err);
      });
    };

    $scope.updateGame = function(gameID){
      console.log(gameID);
      var getUrl = '/hangman/game/'+ gameID;
      $http.put(getUrl, {title:$scope.editGameForm.title, words: $scope.editGameForm.words})
      .then(function(data){
        console.log(data);
        $location.path('/teacherinfo');
      })
      .catch(function(err){
        console.log(err);
      });
    };

    //update question
    $scope.updateQuestion = function(questionID){
      $http.put('/hangman/question/' + questionID, $scope.editQuestionForm)
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
      $http.delete('/hangman/question/' + questionID)
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
      $http.post('/hangman/question', payload)
      .then(function(data){
        console.log(data);
        $scope.editGame = data.data;
      })
      .catch(function(err){
        console.log('err ', err);
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








