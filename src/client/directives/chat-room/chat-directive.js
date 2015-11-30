app.directive('chatRoom', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/chat-room/chat-room.html',
      controller: ['$scope', 'UserServices', '$http', function($scope, UserServices, $http) {

        $scope.message = "HEYYYY";

        var socket = io.connect();
        console.log('whatttt');

        socket.emit('test');


        socket.on('sup', function(){
          console.log("HIIIIII");
        });








    }]
  };

});
