app.controller('flashcardCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {

    var user = UserServices.getUser();
    var teacherID =  UserServices.checkforTeacher();
    var setID;
    var setTitle;
    $scope.flashcardForm = {};
    var isStudent = UserServices.isStudent();
    $scope.doneLoading = false;

// <--------------- ADD SETS/ETC  --------------->
    //store current set id
    $scope.storeSetId = function(id){
      UserServices.storeGame(id);
    };

    //check if student (to hide teacher sets)
    $scope.isStudent = function() {
      return UserServices.isStudent();
    };

    //get all sets from user
    $scope.getAllSets = function(){
    if(isStudent){
      $http.get('/flashcards/sets/' + user._id)
      .then(function(data){
        $scope.showUser = data.data;
        $scope.doneLoading = true;
      });
    }
    $http.get('/flashcards/teachersets/' + teacherID)
      .then(function(data) {
        if(isStudent){
            $scope.showTeacher = data.data;
          }
        else if(!isStudent){
          $scope.showUser = data.data;
        }
        $scope.doneLoading = true;
      });
    };

    //create a set- title only
    $scope.createSet = function(){
      if(!isStudent){
          $http.post('/flashcards/teacherset', {title:$scope.flashcardTitle.trim(), id:user._id})
        .then(function(data){
          setID = data.data.setID;
          setTitle = data.data.title;
          $scope.flashcardForm ={};
          $scope.addingQuestions = true;
        });
      }
      else{
        $http.post('/flashcards/set', {title:$scope.flashcardTitle.trim(), id:user._id})
        .then(function(data){
          setID = data.data.setID;
          setTitle = data.data.title;
          $scope.flashcardForm ={};
          $scope.addingQuestions = true;
        });
      }
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

    //gets all sets on page load
    $scope.getAllSets();

}]);

// <---------------  EDIT SET  ----------------->
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
        $scope.doneLoading = true;
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

    //update title
    $scope.updateSetTitle = function(gameID){
      var getUrl = '/flashcards/set/'+ gameID;
      $http.put(getUrl, {title:$scope.editSet.title})
      .then(function(data){
        $scope.getOneSet();
        $scope.showUpdateMessage = true;
        $timeout(function () { $scope.showUpdateMessage = false; }, 2500);
      });
    };

    //update single question
    $scope.updateCard = function(cardID, question, answer){
      var payload = {question: question, answer:answer};
      $http.put('/flashcards/card/' + cardID, payload)
      .then(function(data){
        $scope.showCardUpdateMessage = true;
        $timeout(function () {
          $scope.showCardUpdateMessage = false;
        }, 2500);
      });
    };

    //delete whole set
    $scope.deleteSet = function(setID){
      $http.delete('/flashcards/set/' + setID)
      .then(function(data){
        $scope.getOneSet();
        $location.path('/flashcards');
      });
    };

    //delete one card
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



// <---------------  PLAY SET  ----------------->
app.controller('playFlashcardCtrl', ['$scope', '$http', '$timeout' , 'UserServices', function($scope, $http, $timeout, UserServices) {
    //set card to front
    $scope.cardFront = "front";
    var index = 0;
    var current;
    $scope.nowLoading = false;

    //get one set by id
    $scope.getOneSet = function(){
      $scope.nowLoading = true;
      var id = UserServices.getGame();
      $http.get('/flashcards/set/' + id)
      .then(function(data){
        $scope.title = data.data.title;
        current = data.data.flashcards;
        $scope.current = current[index];
        $scope.nowLoading = false;
      });
    };

    //move to next card
    $scope.nextCard = function(){
      if(index+1 >= current.length){
        $scope.noMore = true;
      }
      else{
        index++;
        if($scope.cardFront != 'front'){
          $scope.cardFront = 'front';
          $timeout(function () {
            $scope.current = current[index];
          }, 2000);
        }
        else{
          $scope.current = current[index];
        }
        $scope.noLess = false;
      }
    };

    //move to previous card
    $scope.previousCard = function(){
      if(index-1 < 0){
        $scope.noLess = true;
      }
      else{
        index--;
        if($scope.cardFront != 'front'){
          $scope.cardFront = 'front';
          $timeout(function () {
            $scope.current = current[index];
          }, 2000);
        }
        else{
          $scope.current = current[index];
        }
        $scope.noMore = false;
      }
    };

    //shuffles cards
    $scope.shuffleCards = function(){
      $scope.nowLoading = true;
      index = 0;
      $scope.noMore = false;
      $scope.noLess = false;
      var shuffled = [];
      var id = UserServices.getGame();
      $http.get('/flashcards/set/' + id)
      .then(function(data){
        var cards = data.data.flashcards;
        while(cards.length) {
          var newIndex = Math.floor(Math.random() * cards.length);
          shuffled.push(cards[newIndex]);
          cards.splice(newIndex, 1);
        }
        current = shuffled;
        $scope.current = current[index];
        $scope.nowLoading = false;
      });
    };


    //reverses side to study from
    $scope.reverseSide = function(){

    };


    //flip card
    $scope.toggleCard = function(){
      if($scope.cardFront === "front"){
        $scope.cardFront = "back";
      }
      else {
        $scope.cardFront = "front";
      }
    };

    //get current set on load
    $scope.getOneSet();

}]);





