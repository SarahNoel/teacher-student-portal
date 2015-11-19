var app = angular.module('studentApp', ['ngRoute', 'satellizer', 'ngWebSocket']);

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
    .otherwise({redirectTo: '/'});
}]);


