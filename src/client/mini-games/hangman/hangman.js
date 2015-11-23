app.controller('hangmanCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    var gameId;
    var gameName;
    var currentGameId;
    //sets current user
    var user = UserServices.getUser();
    //sets teacherID
    var teacherID =  UserServices.checkforTeacher();
    //blank objects for forms
    $scope.gameForm = {};
    $scope.questionForm = {};
    //displays user
    $scope.showUser = user;


// <------------------ ADD GAMES/ETC  ----------------->

    //get all hangman games from teacher
    $scope.getAllGames = function(){
      $http.get('/hangman/games/' + teacherID)
      .then(function(data){
        console.log(data);
        $scope.hangmanGames = data.data.hangmanGames;
      });
    };

    //save a new game to a user
    $scope.createGame = function(){
      var game = $scope.gameForm;
      $http.post('/hangman/game', {theme:game.theme, words:game.words, teacherID: teacherID})
      .then(function(data){
        console.log(data);
        $scope.gameForm ={};
      })
      .catch(function(err){
      });
    };

// <-------------------  GAME PLAY  ----------------->

    //get game id to play current game
    $scope.getPlayGame = function(id){
      UserServices.storePlayGame(id);
    };

   $scope.hangmanGallows = '../../public/images/gallows1.gif';
    //gameplay variables
    var guess;
    var index = 0;
    var currentWord;
    var game = UserServices.getGame();
    var counter = 10;
    var gallowCount = 1;
    var picked = [];

    $scope.letters = ['a', 'b', 'c'];

    $scope.guessLetter = function(letter){
      // var die = "$scope." + letter + 'Disable';
      // console.log(die);
      // die = true;
      picked.push(letter);
      console.log(letter);
    };


    $scope.killGuy = function(){
      gallowCount++;
      $scope.hangmanGallows = '../../public/images/gallows' + gallowCount +'.gif';
    };

    //start game
    $scope.startGame = function(){
      var gameId = UserServices.getPlayGame();
      $scope.questionsWrong = 0;
      $scope.questionsRight = 0;
      $scope.timesUp = false;
      $scope.playing = true;
      $http.get('/hangman/game/' + gameId)
      .then(function(data){
        console.log(data);
        //sets current game
        $scope.currentGame = data.data;
        //displays first word
        currentWord = data.data.words[index];
        $scope.hint = currentWord.question;
        //starts countdown
        countDowner();
      })
      .catch(function(data){
        $scope.error = data.data;
      });
    };

    //user guess
    $scope.guesshangman = function(){
      $scope.showWrong = false;
      guess = $scope.hangmanGameInput.trim();
      $scope.hangmanGameInput = '';
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
        $scope.endhangmanGame = true;
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
      $http.put(getUrl, {theme:$scope.editGameForm.theme, words: $scope.editGameForm.words})
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








