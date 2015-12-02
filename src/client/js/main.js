var app = angular.module('studentApp', ['ngRoute', 'satellizer', 'luegg.directives']);

// // restrict pages to logged in users
// app.run(['$rootScope', '$location', '$route', 'UserServices', function ($rootScope, $location, $route, UserServices) {
//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
//     if (next.access.restricted && UserServices.isLoggedIn() === false) {
//       $route.reload();
//       $location.path('/');
//     }
//   });
// }]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      access: {restricted: false}
    })
    .when('/studentLogin', {
      templateUrl: '/partials/studentLogin.html',
      access: {restricted: false}

    })
    .when('/studentRegister', {
      templateUrl: '/partials/studentRegister.html',
      access: {restricted: false}

    })
    .when('/teacherLogin', {
      templateUrl: '/partials/teacherLogin.html',
      access: {restricted: false}

    })
    .when('/teacherRegister', {
      templateUrl: '/partials/teacherRegister.html',
      access: {restricted: false}

    })
    .when('/chat', {
      templateUrl: '/partials/chat.html',
      access: {restricted: true}

    })
    .when('/vocab', {
      templateUrl: '/partials/games.html',
      access: {restricted: true}

    })
    .when('/studentinfo', {
      templateUrl: '/partials/studentinfo.html',
      access: {restricted: true}

    })
    .when('/teacherinfo', {
      templateUrl: '/partials/teacherinfo.html',
      access: {restricted: true}

    })
    .when('/vocabRace', {
      templateUrl: '/mini-games/vocabRace/vocabRace.html',
      access: {restricted: true}

    })
    .when('/editVocabRace', {
      templateUrl: '/mini-games/vocabRace/vocabRaceEdit.html',
      access: {restricted: true}

    })
    .when('/createVocabRace', {
      templateUrl: '/mini-games/vocabRace/vocabRaceCreate.html',
      access: {restricted: true}

    })
    .when('/createHangman', {
      templateUrl: '/mini-games/hangman/hangmanCreate.html',
      access: {restricted: true}

    })
    .when('/hangman', {
      templateUrl: '/mini-games/hangman/hangman.html',
      access: {restricted: true}

    })
    .when('/editHangman', {
      templateUrl: '/mini-games/hangman/hangmanEdit.html',
      access: {restricted: true}

    })
    .when('/flashcards', {
      templateUrl: '/mini-games/flashcards/flashcards.html',
      access: {restricted: true}

    })
    .when('/editflashcards', {
      templateUrl: '/mini-games/flashcards/flashcardsEdit.html',
      access: {restricted: true}

    })
    .when('/createflashcards', {
      templateUrl: '/mini-games/flashcards/flashcardsCreate.html',
      access: {restricted: true}

    })
    .when('/playflashcards', {
      templateUrl: '/mini-games/flashcards/flashcardsPlay.html',
      access: {restricted: true}

    })
    .otherwise({redirectTo: '/'});
}]);


