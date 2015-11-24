app.controller('flashcardCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    //sets current user
    var user = UserServices.getUser();

    //sets teacherID
    var teacherID =  UserServices.checkforTeacher();
    //blank objects for forms
    $scope.flashcardForm = {};
    //blank object for new set
    $scope.newSetObject = {words:{}};

// <--------------- ADD SETS/ETC  --------------->
    //store current set id
    $scope.storeSetId = function(id){
      UserServices.storeGame(id);
    };

    //get all sets from user
    $scope.getAllSets = function(){
      $http.get('/flashcards/sets/' + user._id)
      .then(function(data){
        console.log('all ', data.data);
        $scope.showUser = data.data;
      });
    };

    //save a new set to a user
    $scope.finishSet = function(){
      $scope.newSetObject.title = $scope.flashcardTitle;
      console.log($scope.newSetObject);
      var payload = {set:$scope.newSetObject, id:user._id};
      $http.post('/flashcards/set', payload)
      .then(function(data){
        console.log(data);
        $scope.flashcardTitle = '';
        $scope.flashcardForm = {};
        $scope.newSetObject = {words:{}};
      })
      .catch(function(data){
        console.log(data);
      });
    };

    //store questions pre-save
    $scope.addMoreQuestions = function(){
      $scope.newSetObject.words[$scope.flashcardForm.question] = $scope.flashcardForm.answer;
      $scope.flashcardForm = {};
      console.log($scope.newSetObject);
    };

    $scope.createGame = function(){
      gameName = $scope.gameForm.gameName;
      $http.post('/vocab/game', {title:gameName, teacherID: teacherID})
      .then(function(data){
        $scope.gameName = data.data.title;
        gameId = data.data.gameID;
        $scope.gameForm ={};
        $scope.addQuestions = true;
        $location.path('/#/flashcards');
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
      });
    };



// <---------------------  CARD USE  ----------------->

    //gets all sets on page load
    $scope.getAllSets();

}]);

// <------------------  EDIT SET  ----------------->
app.controller('editFlashcardCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    //blank objects for forms
    $scope.editGame = {};
    $scope.editQuestionForm = {};
    $scope.addQuestionForm = {};


    //get one set by id
    $scope.getOneSet = function(){
      var id = UserServices.getGame();
      $http.get('/flashcards/set/' + id)
      .then(function(data){
        $scope.editSet = data.data;
        console.log(data.data);
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
    $scope.updateQuestion = function(question, answer){
      console.log(question, answer);
      console.log(this);
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

    $scope.getOneSet();

}]);








