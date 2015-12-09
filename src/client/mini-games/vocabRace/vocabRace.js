app.controller("vocabCtrl",["$scope","$http","$location","$timeout","UserServices",function(e,t,n,o,i){var a,s,c=(io.connect(),i.getUser()),u=i.checkforTeacher();e.gameForm={},e.questionForm={},e.showUser=c,e.getAllGames=function(){t.get("/vocab/games/"+u).then(function(t){e.games=t.data})},e.createGame=function(){s=e.gameForm.gameName,t.post("/vocab/game",{title:s,teacherID:u}).then(function(t){e.gameName=t.data.game.title,a=t.data.gameID,e.gameForm={},e.addQuestions=!0})},e.addQuestion=function(){var n={question:e.questionForm.question,answer:e.questionForm.answer,id:a};t.post("/vocab/question",n).then(function(t){e.allQuestions=t.data.questions,e.questionForm={}})};var r,m,g,d=0,h=(i.getGame(),10),l=10;g=function(){return 0>=l?(l=0,e.showWrong=!1,e.timer=l,e.timesUp=!0,void(e.showCorrect||e.endVocabGame||(e.showWrongNext=!0,e.questionsWrong++))):(e.timer=l,l--,o(g,1e3),void 0)},e.timer=l,e.startGame=function(){var n=i.getPlayGame();e.questionsWrong=0,e.questionsRight=0,e.timesUp=!1,e.playing=!0,t.get("/vocab/game/"+n).then(function(t){e.currentGame=t.data,m=t.data.questions[d],e.hint=m.question,e.currentAnswer=m.answer,g()})["catch"](function(t){e.error=t.data})},e.guessVocab=function(){e.showWrong=!1,r=e.vocabGameInput.trim(),e.vocabGameInput="",""===r?e.showWrong=!0:r.toLowerCase()===m.answer.trim().toLowerCase()?(e.timesUp=!0,e.showCorrect=!0,e.questionsRight++):e.showWrong=!0},e.nextQuestion=function(){e.timesUp=!1,e.showCorrect=!1,e.showWrongNext=!1,e.showWrong=!1,d+1>=e.currentGame.questions.length?e.endVocabGame=!0:(d+=1,m=e.currentGame.questions[d],e.hint=m.question,e.currentAnswer=m.answer,l=h,g())},e.endGame=function(){console.log("GAME OVER")},e.getAllGames()}]),app.controller("editVocabCtrl",["$scope","$http","$location","$timeout","UserServices",function(e,t,n,o,i){e.editGame={},e.editQuestionForm={},e.addQuestionForm={},e.getOneGame=function(){var n=i.getGame();t.get("/vocab/game/"+n).then(function(t){e.editGame=t.data})},e.getEditQuestion=function(n){e.editingQuestion=!0,t.get("/vocab/question/"+n).then(function(t){e.editQuestionForm=t.data})["catch"](function(e){console.log("catch ",e)})},e.updateGameTitle=function(n){var i="/vocab/game/"+n;t.put(i,{title:e.editGame.title}).then(function(t){console.log(t),e.getOneGame(),e.showUpdateMessage=!0,o(function(){e.showUpdateMessage=!1},3e3)})["catch"](function(e){console.log(e)})},e.updateQuestion=function(n){t.put("/vocab/question/"+n,e.editQuestionForm).then(function(t){e.editQuestionForm={},e.getOneGame(),e.editingQuestion=!1})},e.addQuestionsEditGame=function(){e.addingQuestion=!0},e.deleteQuestion=function(n){t["delete"]("/vocab/question/"+n).then(function(t){e.getOneGame()})["catch"](function(e){console.log(e)})},e.saveQuestion=function(){var n=i.getGame(),o=e.addQuestionForm,a={id:n,question:o.question,answer:o.answer};t.post("/vocab/question",a).then(function(t){console.log(t),e.editGame=t.data,e.addQuestionForm={}})["catch"](function(e){console.log("err ",e)})},e.deleteGame=function(o){t["delete"]("/vocab/game/"+o).then(function(){e.editingQuestion=!1,e.addingQuestion=!1,n.path("/teacherinfo")})},e.cancel=function(){e.editingQuestion=!1,e.addingQuestion=!1,e.editQuestionForm={}},e.getOneGame()}]);

// app.controller('vocabCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
//     var gameId;
//     var gameName;
//     var currentGameId;
//     //connect to socket
//     var socket = io.connect();
//     //sets current user
//     var user = UserServices.getUser();
//     //sets teacherID
//     var teacherID =  UserServices.checkforTeacher();
//     //blank objects for forms
//     $scope.gameForm = {};
//     $scope.questionForm = {};
//     //displays user
//     $scope.showUser = user;


// // <----------------- ADD GAMES/ETC  -------------->

//     //get all vocab games from teacher
//     $scope.getAllGames = function(){
//       $http.get('/vocab/games/' + teacherID)
//       .then(function(data){
//         $scope.games = data.data;
//       });
//     };

//     //save a new game to a user-no questions
//     $scope.createGame = function(){
//       gameName = $scope.gameForm.gameName;
//       $http.post('/vocab/game', {title:gameName, teacherID: teacherID})
//       .then(function(data){
//         $scope.gameName = data.data.game.title;
//         gameId = data.data.gameID;
//         $scope.gameForm ={};
//         $scope.addQuestions = true;
//       });
//     };

//     //add question to game
//     $scope.addQuestion = function(){
//       var payload = {question: $scope.questionForm.question, answer: $scope.questionForm.answer, id:gameId};
//       $http.post('/vocab/question', payload)
//       .then(function(data){
//         $scope.allQuestions = data.data.questions;
//         $scope.questionForm = {};
//       });
//     };


// // // <--------------  LIVE GAME PLAY  ------------->
// //     $scope.challengeGame = function(roomID){
// //       socket.emit('game-challenge', roomID);
// //     };


// //     //socket listeners
// //     socket.on('game-challenge-received', function(roomID){
// //       console.log(roomID);
// //     });






// // <----------------  SOLO GAME PLAY  --------------->
// // UserServices.storeGame('56620a1a6cf8de1300a6ffb1');

//     //gameplay variables
//     var guess;
//     var index = 0;
//     var currentQuestion;
//     var game = UserServices.getGame();
//     var counter = 10;




//     //countdown function
//     var countDowner, countDown = 10;
//     countDowner = function() {
//       if (countDown <= 0){
//         countDown = 0;
//         $scope.showWrong = false;
//         $scope.timer = countDown;
//         $scope.timesUp = true;
//         if(!$scope.showCorrect && !$scope.endVocabGame){
//           $scope.showWrongNext = true;
//           $scope.questionsWrong++;
//         }
//         return; // quit
//       } else {
//         $scope.timer = countDown; // update scope
//         countDown--; // -1
//         $timeout(countDowner, 1000); // loop it again
//       }
//     };
//     $scope.timer = countDown;


//     //start game
//     $scope.startGame = function(){
//       var gameId = UserServices.getPlayGame();
//       $scope.questionsWrong = 0;
//       $scope.questionsRight = 0;
//       $scope.timesUp = false;
//       $scope.playing = true;
//       $http.get('/vocab/game/' + gameId)
//       .then(function(data){
//         //sets current game
//         $scope.currentGame = data.data;
//         //displays first hint
//         currentQuestion = data.data.questions[index];
//         $scope.hint = currentQuestion.question;
//         $scope.currentAnswer = currentQuestion.answer;
//         //starts countdown
//         countDowner();
//       })
//       .catch(function(data){
//         $scope.error = data.data;
//       });
//     };

//     //user guess
//     $scope.guessVocab = function(){
//       $scope.showWrong = false;
//       guess = $scope.vocabGameInput.trim();
//       $scope.vocabGameInput = '';
//       //if blank
//       if(guess === ''){
//         $scope.showWrong = true;
//       }
//       //if matches
//       else if(guess.toLowerCase() === currentQuestion.answer.trim().toLowerCase()){
//         //end question, show correct. update score
//         $scope.timesUp = true;
//         $scope.showCorrect = true;
//         $scope.questionsRight++;
//       }
//       //if wrong, show wrong error
//       else{
//         $scope.showWrong = true;
//       }
//     };

//     //move on to next question
//     $scope.nextQuestion = function(){
//       //reset all messages
//       $scope.timesUp = false;
//       $scope.showCorrect = false;
//       $scope.showWrongNext = false;
//       $scope.showWrong = false;

//       //if last question, show end game message
//       if(index+1 >= $scope.currentGame.questions.length){
//         $scope.endVocabGame = true;
//       }
//       //goes to next question
//       else{
//         index +=1;
//         //decreases time DO I WANT THIS???  FIX MEEEEE
//         // counter --;

//         // finds next question in array
//         currentQuestion = $scope.currentGame.questions[index];

//         //displays next hint
//         $scope.hint = currentQuestion.question;
//         $scope.currentAnswer = currentQuestion.answer;
//         countDown = counter;
//         //starts countdown
//         countDowner();
//       }
//     };

//     //ends game
//     $scope.endGame = function(){
//       console.log('GAME OVER');
//     };

//     //gets all games on page load
//     $scope.getAllGames();

// }]);






// // <-----------------------  EDIT GAME  ----------------->
// app.controller('editVocabCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
//     //blank objects for forms
//     $scope.editGame = {};
//     $scope.editQuestionForm = {};
//     $scope.addQuestionForm = {};


//     //get one game by id
//     $scope.getOneGame = function(){
//       var id = UserServices.getGame();
//       $http.get('/vocab/game/' + id)
//       .then(function(data){
//         $scope.editGame = data.data;
//       });
//     };

//     //edit questions
//     $scope.getEditQuestion = function(questionID){
//       $scope.editingQuestion = true;
//       $http.get('/vocab/question/' + questionID)
//       .then(function(data){
//         $scope.editQuestionForm = data.data;
//       })
//       .catch(function(err){
//         console.log('catch ', err);
//       });
//     };

//     $scope.updateGameTitle = function(gameID){
//       var getUrl = '/vocab/game/'+ gameID;
//       $http.put(getUrl, {title:$scope.editGame.title})
//       .then(function(data){
//         console.log(data);
//         $scope.getOneGame();
//         $scope.showUpdateMessage = true;
//         $timeout(function () { $scope.showUpdateMessage = false; }, 3000);

//       })
//       .catch(function(err){
//         console.log(err);
//       });
//     };

//     //update question
//     $scope.updateQuestion = function(questionID){
//       $http.put('/vocab/question/' + questionID, $scope.editQuestionForm)
//       .then(function(data){
//         $scope.editQuestionForm = {};
//         $scope.getOneGame();
//         $scope.editingQuestion = false;
//       });
//     };

//     //adds questions to existing game
//     $scope.addQuestionsEditGame = function(){
//       $scope.addingQuestion = true;
//     };

//     //delete question
//     $scope.deleteQuestion = function(questionID){
//       $http.delete('/vocab/question/' + questionID)
//       .then(function(data){
//         $scope.getOneGame();
//       })
//       .catch(function(err){
//         console.log(err);
//       });
//     };

//     //save question to game
//     $scope.saveQuestion = function(){
//       var id = UserServices.getGame();
//       var hint = $scope.addQuestionForm;
//       var payload = {id:id, question: hint.question, answer: hint.answer};
//       $http.post('/vocab/question', payload)
//       .then(function(data){
//         console.log(data);
//         $scope.editGame = data.data;
//         $scope.addQuestionForm = {};

//       })
//       .catch(function(err){
//         console.log('err ', err);
//       });
//     };

//     //delete game
//     $scope.deleteGame = function(gameID){
//       $http.delete('/vocab/game/' + gameID)
//       .then(function(){
//         $scope.editingQuestion = false;
//         $scope.addingQuestion = false;
//         $location.path('/teacherinfo');
//       });
//     };

//     //cancels, resets to see questions
//     $scope.cancel = function(){
//       $scope.editingQuestion = false;
//       $scope.addingQuestion = false;
//       $scope.editQuestionForm = {};
//     };

//     $scope.getOneGame();

// }]);








