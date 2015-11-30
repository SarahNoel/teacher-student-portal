var app = angular.module('studentApp', ['ngRoute', 'satellizer']).service(WebSocket.name, WebSocket);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html'
    })
    .when('/studentLogin', {
      templateUrl: '/partials/studentLogin.html'
    })
    .when('/studentRegister', {
      templateUrl: '/partials/studentRegister.html'
    })
    .when('/teacherLogin', {
      templateUrl: '/partials/teacherLogin.html'
    })
    .when('/teacherRegister', {
      templateUrl: '/partials/teacherRegister.html'
    })
    .when('/chat', {
      templateUrl: '/partials/chat.html'
    })
    .when('/vocab', {
      templateUrl: '/partials/games.html'
    })
    .when('/studentinfo', {
      templateUrl: '/partials/studentinfo.html'
    })
    .when('/teacherinfo', {
      templateUrl: '/partials/teacherinfo.html'
    })
    .when('/vocabRace', {
      templateUrl: '/mini-games/vocabRace/vocabRace.html'
    })
    .when('/editVocabRace', {
      templateUrl: '/mini-games/vocabRace/vocabRaceEdit.html'
    })
    .when('/createVocabRace', {
      templateUrl: '/mini-games/vocabRace/vocabRaceCreate.html'
    })
    .when('/createHangman', {
      templateUrl: '/mini-games/hangman/hangmanCreate.html'
    })
    .when('/hangman', {
      templateUrl: '/mini-games/hangman/hangman.html'
    })
    .when('/editHangman', {
      templateUrl: '/mini-games/hangman/hangmanEdit.html'
    })
    .when('/flashcards', {
      templateUrl: '/mini-games/flashcards/flashcards.html'
    })
    .when('/editflashcards', {
      templateUrl: '/mini-games/flashcards/flashcardsEdit.html'
    })
    .when('/createflashcards', {
      templateUrl: '/mini-games/flashcards/flashcardsCreate.html'
    })
    .when('/playflashcards', {
      templateUrl: '/mini-games/flashcards/flashcardsPlay.html'
    })
    .otherwise({redirectTo: '/'});
}]);


