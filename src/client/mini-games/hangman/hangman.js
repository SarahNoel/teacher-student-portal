app.controller("createHangmanCtrl",["$scope","$http","$location","$timeout","UserServices",function(e,t,n,a,o){var r=o.getUser(),i=o.checkforTeacher();e.gameForm={},e.showUser=r,e.createGame=function(){var a=e.gameForm;t.post("/hangman/game",{title:a.title,words:a.words,teacherID:i}).then(function(t){e.gameForm={},n.path("/teacherinfo")})["catch"](function(t){e.error=t})}}]),app.controller("hangmanCtrl",["$scope","$http","$location","$timeout","UserServices",function(e,t,n,a,o){var r=o.getUser();o.checkforTeacher();e.showUser=r,e.getPlayGame=function(e){o.storePlayGame(e)};var i,g,m,l=0,s=[],c=[],d=1,u=0,h=0,f=!1;o.getGame();e.letterRow1=["a","b","c","d","e","f","g"],e.letterRow2=["h","i","j","k","l","m","n"],e.letterRow3=["o","p","q","r","s","t"],e.letterRow4=["u","v","w","x","y","z"],e.playGame=function(){e.gameOver=!1,e.hangmanGallows="../../public/images/gallows"+d+".gif",e.wordSpot=c;var n=o.getPlayGame();e.questionsWrong=0,e.questionsRight=0,t.get("/hangman/game/"+n).then(function(t){i=t.data.words,i=i.join(",").split(","),e.currentGame=t.data,m=i[l].trim().toLowerCase(),g=m.split("");for(var n=0;n<m.length;n++)c.push("_")})["catch"](function(t){e.error=t.data})},e.nextWord=function(){e.moveToNext=!1,f=!1,u=0,h=0,o.enableAll(s),s=[],d=1,e.hangmanGallows="../../public/images/gallows"+d+".gif",c=[],m=i[l].trim().toLowerCase(),g=m.split("");for(var t=0;t<m.length;t++)c.push("_");e.wordSpot=c,e.wrongWord=!1,e.rightWord=!1},e.guessLetter=function(t){e.guessWord=m;var n=!1;if(-1===s.indexOf(t)&&!f){s.push(t);var a=document.getElementById(t),o=angular.element(a);if(o.addClass("picked"),-1===g.indexOf(t))u++,d++,e.hangmanGallows="../../public/images/gallows"+d+".gif";else for(var r=0;r<g.length;r++)g[r]===t&&(h++,e.wordSpot.splice(r,1,t));h===g.length&&(n=!0,f=!0,e.questionsRight++),u>=6&&(f=!0,d++,e.questionsWrong++),f&&(l+1===i.length?(e.gameOver=!0,n?e.rightWord=!0:e.wrongWord=!0):(l++,n?e.rightWord=!0:e.wrongWord=!0))}},e.endGame=function(){e.endHangman=!0,e.wrongWord=!1,e.rightWord=!1,e.gameOver=!1},e.playGame()}]),app.controller("editHangmanCtrl",["$scope","$http","$location","$timeout","UserServices",function(e,t,n,a,o){e.editGameForm={},e.getOneGame=function(){var n=o.getGame();t.get("/hangman/game/"+n).then(function(t){e.editGameForm=t.data})},e.updateGame=function(a){var o="/hangman/game/"+a;t.put(o,{title:e.editGameForm.title,words:e.editGameForm.words}).then(function(e){n.path("/teacherinfo")})},e.addQuestionsEditGame=function(){e.addingQuestion=!0},e.deleteGame=function(n){t["delete"]("/hangman/game/"+n).then(function(t){e.getOneGame()})["catch"](function(e){console.log(e)})},e.cancel=function(){e.editingQuestion=!1,e.addingQuestion=!1,e.editQuestionForm={}},e.getOneGame()}]);

// app.controller('createHangmanCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
// // <------------------ ADD GAMES/ETC  ----------------->
//     //sets current user
//     var user = UserServices.getUser();
//     //sets teacherID
//     var teacherID =  UserServices.checkforTeacher();
//     //blank object for form
//     $scope.gameForm = {};
//     //displays user
//     $scope.showUser = user;

//     //save a new game to a user
//     $scope.createGame = function(){
//       var game = $scope.gameForm;
//       $http.post('/hangman/game', {title:game.title, words:game.words, teacherID: teacherID})
//       .then(function(data){
//         $scope.gameForm ={};
//         $location.path('/teacherinfo');
//       })
//       .catch(function(err){
//         $scope.error = err;
//       });
//     };
// }]);

// app.controller('hangmanCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
//     var gameId;
//     var gameName;
//     var currentGameId;
//     //sets current user
//     var user = UserServices.getUser();
//     //sets teacherID
//     var teacherID =  UserServices.checkforTeacher();
//     //displays user
//     $scope.showUser = user;



// // <-------------------  GAME PLAY  ----------------->

//     //get game id to play current game
//     $scope.getPlayGame = function(id){
//       UserServices.storePlayGame(id);
//     };

//     //gameplay variables
//     var words;
//     var wordArr;
//     var currentWord;
//     var index = 0;
//     var picked = [];
//     var wordArray =[];
//     var gallowCount = 1;
//     var pickedWrong = 0;
//     var guessedRight = 0;
//     var roundOver = false;
//     var game = UserServices.getGame();

//     $scope.letterRow1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
//     $scope.letterRow2 = ['h', 'i', 'j', 'k', 'l', 'm', 'n'];
//     $scope.letterRow3 = ['o', 'p', 'q', 'r', 's', 't'];
//     $scope.letterRow4 = ['u','v','w','x','y','z'];


//     //start game
//     $scope.playGame = function(){
//       $scope.gameOver= false;
//       $scope.hangmanGallows = '../../public/images/gallows' + gallowCount + '.gif';
//       $scope.wordSpot = wordArray;
//       var gameID = UserServices.getPlayGame();
//       $scope.questionsWrong = 0;
//       $scope.questionsRight = 0;
//       $http.get('/hangman/game/' + gameID)
//       .then(function(data){
//         words = data.data.words;
//         words = words.join(',').split(',');
//         //sets current game
//         $scope.currentGame = data.data;
//         //displays first word
//         currentWord = words[index].trim().toLowerCase();
//         wordArr = currentWord.split('');
//         for (var i = 0; i < currentWord.length; i++) {
//           wordArray.push('_');
//          }
//       })
//       .catch(function(data){
//         $scope.error = data.data;
//       });
//     };

//     //move to next word
//     $scope.nextWord = function(){
//       $scope.moveToNext = false;
//       roundOver = false;
//       pickedWrong = 0;
//       guessedRight = 0;
//       //enable all picked letters
//       UserServices.enableAll(picked);
//       picked = [];
//       //reset gallows image
//       gallowCount = 1;
//       $scope.hangmanGallows = '../../public/images/gallows' + gallowCount + '.gif';
//       //reset word to guess
//       wordArray = [];
//       currentWord = words[index].trim().toLowerCase();

//       wordArr = currentWord.split('');
//       //fills word spaces with blanks
//       for (var i = 0; i < currentWord.length; i++) {
//           wordArray.push('_');
//       }
//       //displays blanks
//       $scope.wordSpot = wordArray;
//       //hides next button
//       $scope.wrongWord = false;
//       $scope.rightWord = false;
//     };

//     //guess letter function
//     $scope.guessLetter = function(letter){
//       $scope.guessWord = currentWord;
//       var correct = false;
//       //if letter hasn't been picked
//       if(picked.indexOf(letter) === -1 && !roundOver){
//         //push letter to picked array
//         picked.push(letter);
//         //find element, wrap it in angular
//         var element = document.getElementById(letter);
//         var angElement = angular.element(element);
//         //add picked class
//         angElement.addClass('picked');
//         //if letter is not in word
//         if(wordArr.indexOf(letter) === -1){
//           //add body part
//           pickedWrong++;
//           gallowCount++;
//           //update image
//           $scope.hangmanGallows = '../../public/images/gallows' + gallowCount + '.gif';
//         }
//         //if letter is in word
//         else{
//           //checks for each instance of letter
//           for (var i = 0; i < wordArr.length; i++) {
//             if(wordArr[i]===letter){
//               //keeps track of letter guesses
//               guessedRight++;
//               //replaces blank with letter
//               $scope.wordSpot.splice(i, 1, letter);
//             }
//           }
//         }
//         //checks if word is completely guessed
//         if(guessedRight === wordArr.length){
//           correct = true;
//           //round ends
//           roundOver = true;
//           //adds score to right
//           $scope.questionsRight++;
//         }
//         //checks if man is dead
//         if(pickedWrong >=6){
//           //round ends
//           roundOver = true;
//           //adds final body part
//           gallowCount++;
//           //adds score to wrong
//           $scope.questionsWrong++;
//         }
//         if(roundOver){
//           //if last word
//           if(index + 1 === words.length){
//             $scope.gameOver = true;
//             if(correct){
//               $scope.rightWord = true;
//             }
//             else{
//               $scope.wrongWord = true;
//             }
//           }
//           //if still words left
//           else{
//             index++;
//             //displays proper message
//             if(correct){
//               $scope.rightWord = true;
//             }
//             else{
//               $scope.wrongWord = true;
//             }
//           }
//         }
//       }
//     };



//     //ends game
//     $scope.endGame = function(){
//       $scope.endHangman = true;
//       $scope.wrongWord = false;
//       $scope.rightWord = false;
//       $scope.gameOver = false;
//     };

//     //start game on page load
//     $scope.playGame();

// }]);

// // <--------------------  EDIT GAME  ----------------->
// app.controller('editHangmanCtrl', ['$scope', '$http', '$location', '$timeout' , 'UserServices', function($scope, $http, $location, $timeout, UserServices) {
//     //blank objects for forms
//     $scope.editGameForm = {};


//     //get one game by id
//     $scope.getOneGame = function(){
//       var id = UserServices.getGame();
//       $http.get('/hangman/game/' + id)
//       .then(function(data){
//         $scope.editGameForm = data.data;
//       });
//     };

//     //update game
//     $scope.updateGame = function(gameID){
//       var getUrl = '/hangman/game/'+ gameID;
//       $http.put(getUrl, {title:$scope.editGameForm.title, words: $scope.editGameForm.words})
//       .then(function(data){
//         $location.path('/teacherinfo');
//       });
//     };

//     //adds questions to existing game
//     $scope.addQuestionsEditGame = function(){
//       $scope.addingQuestion = true;
//     };

//     //delete question
//     $scope.deleteGame = function(questionID){
//       $http.delete('/hangman/game/' + questionID)
//       .then(function(data){
//         $scope.getOneGame();
//       })
//       .catch(function(err){
//         console.log(err);
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








