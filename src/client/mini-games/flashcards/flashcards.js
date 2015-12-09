app.controller("flashcardCtrl",["$scope","$http","$location","$timeout","UserServices",function(t,e,n,a,o){var r,s,i=o.getUser(),d=o.checkforTeacher();t.flashcardForm={};var c=o.isStudent();t.doneLoading=!1,t.storeSetId=function(t){o.storeGame(t)},t.isStudent=function(){return o.isStudent()},t.getAllSets=function(){c&&e.get("/flashcards/sets/"+i._id).then(function(e){t.showUser=e.data,t.doneLoading=!0}),e.get("/flashcards/teachersets/"+d).then(function(e){c?t.showTeacher=e.data:c||(t.showUser=e.data),t.doneLoading=!0})},t.createSet=function(){c?e.post("/flashcards/set",{title:t.flashcardTitle.trim(),id:i._id}).then(function(e){r=e.data.setID,s=e.data.title,t.flashcardForm={},t.addingQuestions=!0}):e.post("/flashcards/teacherset",{title:t.flashcardTitle.trim(),id:i._id}).then(function(e){r=e.data.setID,s=e.data.title,t.flashcardForm={},t.addingQuestions=!0})},t.addMoreQuestions=function(){var n={question:t.flashcardForm.question,answer:t.flashcardForm.answer,setID:r};e.post("/flashcards/card",n).then(function(e){t.allFlashcards=e.data.flashcards,t.flashcardForm={}})},t.finishSet=function(){if(s!=t.flashcardTitle.trim()){var a={title:t.flashcardTitle.trim()};e.put("/flashcards/set/"+r,a)}t.flashcardTitle="",t.flashcardForm={},n.path("/flashcards")},t.addQuestion=function(){var n={question:t.questionForm.question,answer:t.questionForm.answer,id:gameId};e.post("/vocab/question",n).then(function(e){t.questionForm={}})["catch"](function(t){})},t.getAllSets()}]),app.controller("editFlashcardCtrl",["$scope","$http","$location","$timeout","UserServices",function(t,e,n,a,o){t.editGame={},t.editQuestionForm={},t.addQuestionForm={},t.getOneSet=function(){var n=o.getGame();e.get("/flashcards/set/"+n).then(function(e){t.editSet=e.data,t.doneLoading=!0})},t.getEditQuestion=function(n){t.editingQuestion=!0,e.get("/vocab/question/"+n).then(function(e){t.editQuestionForm=e.data})},t.updateSetTitle=function(n){var o="/flashcards/set/"+n;e.put(o,{title:t.editSet.title}).then(function(e){t.getOneSet(),t.showUpdateMessage=!0,a(function(){t.showUpdateMessage=!1},2500)})},t.updateCard=function(n,o,r){var s={question:o,answer:r};e.put("/flashcards/card/"+n,s).then(function(e){t.showCardUpdateMessage=!0,a(function(){t.showCardUpdateMessage=!1},2500)})},t.deleteSet=function(a){e["delete"]("/flashcards/set/"+a).then(function(e){t.getOneSet(),n.path("/flashcards")})},t.deleteCard=function(n){e["delete"]("/flashcards/card/"+n).then(function(e){t.getOneSet()})},t.cancel=function(){t.editingQuestion=!1,t.addingQuestion=!1,t.editQuestionForm={}},t.getOneSet()}]),app.controller("playFlashcardCtrl",["$scope","$http","$timeout","UserServices",function(t,e,n,a){t.cardFront="front";var o,r=0;t.nowLoading=!1,t.getOneSet=function(){t.nowLoading=!0;var n=a.getGame();e.get("/flashcards/set/"+n).then(function(e){t.title=e.data.title,o=e.data.flashcards,t.current=o[r],t.nowLoading=!1})},t.nextCard=function(){r+1>=o.length?t.noMore=!0:(r++,"front"!=t.cardFront?(t.cardFront="front",n(function(){t.current=o[r]},2e3)):t.current=o[r],t.noLess=!1)},t.previousCard=function(){0>r-1?t.noLess=!0:(r--,"front"!=t.cardFront?(t.cardFront="front",n(function(){t.current=o[r]},2e3)):t.current=o[r],t.noMore=!1)},t.shuffleCards=function(){t.nowLoading=!0,r=0,t.noMore=!1,t.noLess=!1;var n=[],s=a.getGame();e.get("/flashcards/set/"+s).then(function(e){for(var a=e.data.flashcards;a.length;){var s=Math.floor(Math.random()*a.length);n.push(a[s]),a.splice(s,1)}o=n,t.current=o[r],t.nowLoading=!1})},t.reverseSide=function(){},t.toggleCard=function(){"front"===t.cardFront?t.cardFront="back":t.cardFront="front"},t.getOneSet()}]);


// app.controller('flashcardCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {

//     var user = UserServices.getUser();
//     var teacherID =  UserServices.checkforTeacher();
//     var setID;
//     var setTitle;
//     $scope.flashcardForm = {};
//     var isStudent = UserServices.isStudent();
//     $scope.doneLoading = false;

// // <--------------- ADD SETS/ETC  --------------->
//     //store current set id
//     $scope.storeSetId = function(id){
//       UserServices.storeGame(id);
//     };

//     //check if student (to hide teacher sets)
//     $scope.isStudent = function() {
//       return UserServices.isStudent();
//     };

//     //get all sets from user
//     $scope.getAllSets = function(){
//     if(isStudent){
//       $http.get('/flashcards/sets/' + user._id)
//       .then(function(data){
//         $scope.showUser = data.data;
//         $scope.doneLoading = true;
//       });
//     }
//     $http.get('/flashcards/teachersets/' + teacherID)
//       .then(function(data) {
//         if(isStudent){
//             $scope.showTeacher = data.data;
//           }
//         else if(!isStudent){
//           $scope.showUser = data.data;
//         }
//         $scope.doneLoading = true;
//       });
//     };

//     //create a set- title only
//     $scope.createSet = function(){
//       if(!isStudent){
//           $http.post('/flashcards/teacherset', {title:$scope.flashcardTitle.trim(), id:user._id})
//         .then(function(data){
//           setID = data.data.setID;
//           setTitle = data.data.title;
//           $scope.flashcardForm ={};
//           $scope.addingQuestions = true;
//         });
//       }
//       else{
//         $http.post('/flashcards/set', {title:$scope.flashcardTitle.trim(), id:user._id})
//         .then(function(data){
//           setID = data.data.setID;
//           setTitle = data.data.title;
//           $scope.flashcardForm ={};
//           $scope.addingQuestions = true;
//         });
//       }
//     };

//     //store questions pre-save
//     $scope.addMoreQuestions = function(){
//       var payload = {question: $scope.flashcardForm.question, answer:$scope.flashcardForm.answer, setID:setID};
//       $http.post('/flashcards/card', payload)
//       .then(function(data){
//         $scope.allFlashcards = data.data.flashcards;
//         $scope.flashcardForm = {};
//       });
//     };

//     //save a new set to a user
//     $scope.finishSet = function(){
//       if(setTitle != $scope.flashcardTitle.trim()){
//         var payload = {title:$scope.flashcardTitle.trim()};
//         $http.put('/flashcards/set/' + setID, payload);
//       }
//       $scope.flashcardTitle = '';
//       $scope.flashcardForm = {};
//       $location.path('/flashcards');
//     };

//     //add question to game
//     $scope.addQuestion = function(){
//       var payload = {question: $scope.questionForm.question, answer: $scope.questionForm.answer, id:gameId};
//       $http.post('/vocab/question', payload)
//       .then(function(data){
//         $scope.questionForm = {};
//         // $scope.questionNumber = 0;
//       }).catch(function(err){
//       });
//     };

//     //gets all sets on page load
//     $scope.getAllSets();

// }]);

// // <---------------  EDIT SET  ----------------->
// app.controller('editFlashcardCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
//     //blank objects for forms
//     $scope.editGame = {};
//     $scope.editQuestionForm = {};
//     $scope.addQuestionForm = {};

//     //get one set by id
//     $scope.getOneSet = function(){
//       var id = UserServices.getGame();
//       $http.get('/flashcards/set/' + id)
//       .then(function(data){
//         $scope.editSet = data.data;
//         $scope.doneLoading = true;
//       });
//     };

//     //edit questions
//     $scope.getEditQuestion = function(questionID){
//       $scope.editingQuestion = true;
//       $http.get('/vocab/question/' + questionID)
//       .then(function(data){
//         $scope.editQuestionForm = data.data;
//       });
//     };

//     //update title
//     $scope.updateSetTitle = function(gameID){
//       var getUrl = '/flashcards/set/'+ gameID;
//       $http.put(getUrl, {title:$scope.editSet.title})
//       .then(function(data){
//         $scope.getOneSet();
//         $scope.showUpdateMessage = true;
//         $timeout(function () { $scope.showUpdateMessage = false; }, 2500);
//       });
//     };

//     //update single question
//     $scope.updateCard = function(cardID, question, answer){
//       var payload = {question: question, answer:answer};
//       $http.put('/flashcards/card/' + cardID, payload)
//       .then(function(data){
//         $scope.showCardUpdateMessage = true;
//         $timeout(function () {
//           $scope.showCardUpdateMessage = false;
//         }, 2500);
//       });
//     };

//     //delete whole set
//     $scope.deleteSet = function(setID){
//       $http.delete('/flashcards/set/' + setID)
//       .then(function(data){
//         $scope.getOneSet();
//         $location.path('/flashcards');
//       });
//     };

//     //delete one card
//     $scope.deleteCard = function(cardID){
//       $http.delete('/flashcards/card/' + cardID)
//       .then(function(data){
//         $scope.getOneSet();

//       });
//     };

//     //cancels, resets to see questions
//     $scope.cancel = function(){
//       $scope.editingQuestion = false;
//       $scope.addingQuestion = false;
//       $scope.editQuestionForm = {};
//     };

//     $scope.getOneSet();

// }]);



// // <---------------  PLAY SET  ----------------->
// app.controller('playFlashcardCtrl', ['$scope', '$http', '$timeout' , 'UserServices', function($scope, $http, $timeout, UserServices) {
//     //set card to front
//     $scope.cardFront = "front";
//     var index = 0;
//     var current;
//     $scope.nowLoading = false;

//     //get one set by id
//     $scope.getOneSet = function(){
//       $scope.nowLoading = true;
//       var id = UserServices.getGame();
//       $http.get('/flashcards/set/' + id)
//       .then(function(data){
//         $scope.title = data.data.title;
//         current = data.data.flashcards;
//         $scope.current = current[index];
//         $scope.nowLoading = false;
//       });
//     };

//     //move to next card
//     $scope.nextCard = function(){
//       if(index+1 >= current.length){
//         $scope.noMore = true;
//       }
//       else{
//         index++;
//         if($scope.cardFront != 'front'){
//           $scope.cardFront = 'front';
//           $timeout(function () {
//             $scope.current = current[index];
//           }, 2000);
//         }
//         else{
//           $scope.current = current[index];
//         }
//         $scope.noLess = false;
//       }
//     };

//     //move to previous card
//     $scope.previousCard = function(){
//       if(index-1 < 0){
//         $scope.noLess = true;
//       }
//       else{
//         index--;
//         if($scope.cardFront != 'front'){
//           $scope.cardFront = 'front';
//           $timeout(function () {
//             $scope.current = current[index];
//           }, 2000);
//         }
//         else{
//           $scope.current = current[index];
//         }
//         $scope.noMore = false;
//       }
//     };

//     //shuffles cards
//     $scope.shuffleCards = function(){
//       $scope.nowLoading = true;
//       index = 0;
//       $scope.noMore = false;
//       $scope.noLess = false;
//       var shuffled = [];
//       var id = UserServices.getGame();
//       $http.get('/flashcards/set/' + id)
//       .then(function(data){
//         var cards = data.data.flashcards;
//         while(cards.length) {
//           var newIndex = Math.floor(Math.random() * cards.length);
//           shuffled.push(cards[newIndex]);
//           cards.splice(newIndex, 1);
//         }
//         current = shuffled;
//         $scope.current = current[index];
//         $scope.nowLoading = false;
//       });
//     };


//     //reverses side to study from
//     $scope.reverseSide = function(){

//     };


//     //flip card
//     $scope.toggleCard = function(){
//       if($scope.cardFront === "front"){
//         $scope.cardFront = "back";
//       }
//       else {
//         $scope.cardFront = "front";
//       }
//     };

//     //get current set on load
//     $scope.getOneSet();

// }]);





