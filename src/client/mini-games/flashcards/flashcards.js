app.controller('flashcardCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    //sets current user
    var user = UserServices.getUser();
    //sets teacherID
    var teacherID =  UserServices.checkforTeacher();
    //blank objects for forms
    var setID;
    var setTitle;
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
        $scope.showUser = data.data;
      });
    };

    //create a set- title only
    $scope.createSet = function(){
      $http.post('/flashcards/set', {title:$scope.flashcardTitle.trim(), id:user._id})
      .then(function(data){
        setID = data.data.setID;
        setTitle = data.data.title;
        $scope.flashcardForm ={};
        $scope.addingQuestions = true;
      })
      .catch(function(err){
      });
    };


    //store questions pre-save
    $scope.addMoreQuestions = function(){
      var payload = {question: $scope.flashcardForm.question, answer:$scope.flashcardForm.answer, setID:setID};
      $http.post('/flashcards/card', payload)
      .then(function(data){
        $scope.allFlashcards = data.data.flashcards;
        $scope.flashcardForm = {};
      });
    };

    //save a new set to a user
    $scope.finishSet = function(){
      if(setTitle != $scope.flashcardTitle.trim()){
        var payload = {title:$scope.flashcardTitle.trim()};
        $http.put('/flashcards/set/' + setID, payload);
      }
      $scope.flashcardTitle = '';
      $scope.flashcardForm = {};
      $location.path('/flashcards');


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
      });
    };

    //edit questions
    $scope.getEditQuestion = function(questionID){
      $scope.editingQuestion = true;
      $http.get('/vocab/question/' + questionID)
      .then(function(data){
        $scope.editQuestionForm = data.data;
      });
    };

    $scope.updateSetTitle = function(gameID){
      var getUrl = '/flashcards/set/'+ gameID;
      $http.put(getUrl, {title:$scope.editSet.title})
      .then(function(data){
        $scope.getOneSet();
        $scope.showUpdateMessage = true;
        $timeout(function () { $scope.showUpdateMessage = false; }, 2500);
      });
    };

    //update question
    $scope.updateCard = function(question, answer,cardID){
      var payload = {question: question, answer:answer};
      $http.put('/flashcards/card/' + cardID, payload)
      .then(function(data){
        $scope.showCardUpdateMessage = true;
        $timeout(function () { $scope.showCardUpdateMessage = false; }, 2500);
      });
    };

    //delete set
    $scope.deleteSet = function(setID){
      $http.delete('/flashcards/set/' + setID)
      .then(function(data){
        $scope.getOneSet();
        $location.path('/flashcards');
      });
    };

    //delete card
    $scope.deleteCard = function(cardID){
      $http.delete('/flashcards/card/' + cardID)
      .then(function(data){
        $scope.getOneSet();

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



// <------------------  EDIT SET  ----------------->
app.controller('playFlashcardCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
    //blank objects for forms
    $scope.editGame = {};
    $scope.editQuestionForm = {};
    $scope.addQuestionForm = {};
    var index = 0;


    //get one set by id
    $scope.getOneSet = function(){
      var id = UserServices.getGame();
      $http.get('/flashcards/set/' + id)
      .then(function(data){
        $scope.editSet = data.data;
        $scope.current = data.data.flashcards[index];
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





