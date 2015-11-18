var app = angular.module('studentApp', ['ngRoute', 'satellizer', 'ngWebSocket']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html'
    })
    .when('/login', {
      templateUrl: '/partials/login.html'
    })
    .when('/register', {
      templateUrl: '/partials/register.html'
    })
    .when('/chat', {
      templateUrl: '/partials/chat.html'
    })
    .when('/vocab', {
      templateUrl: '/partials/games.html'
    })
    .when('/user', {
      templateUrl: '/partials/userinfo.html'
    })
    .when('/vocabRace', {
      templateUrl: '/mini-games/vocabRace/vocabRace.html'
    })
    .when('/editVocabRace', {
      templateUrl: '/mini-games/vocabRace/vocabRaceEdit.html'
    })
    .otherwise({redirectTo: '/'});
}]);


