var app = angular.module('studentApp', ['ngRoute', 'satellizer']);

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
      templateUrl: '/partials/vocabGame.html'
    })
    .when('/user', {
      templateUrl: '/partials/userinfo.html'
    })
    .otherwise({redirectTo: '/'});
}]);
