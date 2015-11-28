app.directive('chatRoom', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/chat-room/chat-room.html',
      controller: ['$scope', 'UserServices', '$http', '$location', '$auth', function($scope, UserServices, $http, $location, $auth) {

        $scope.message = "HEYYYY";


        // socket.emit('test');


        // socket.on('sup', function(){
        //   console.log("HIIIIII");
        // });
    }]
  };

});
