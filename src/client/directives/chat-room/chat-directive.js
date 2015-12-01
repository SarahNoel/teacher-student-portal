app.directive('chatRoom', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/chat-room/chat-room.html',
      controller: ['$scope', 'UserServices', '$http', function($scope, UserServices, $http) {
        //connect to socket
        var socket = io.connect();
        var user = UserServices.getUser();
        //get user, add to online users
        socket.emit('entered', user);


        //wrap elements in angular
        var chatUl = angular.element(document.querySelector('#chat-ul'));
        var onlineUsers = angular.element(document.querySelector('#user-ul'));

        //send message
        $scope.sendMessage = function(){
          socket.emit('message-sent', $scope.chatInput);
          $scope.chatInput = '';
        };

        //append message after hitting socket
        socket.on('message-received', function(message){
          var newMessage = UserServices.languageFilter(message.message);
          chatUl.append('<li>&nbsp' + message.user + ': ' + newMessage + '</li>');
        });

        socket.on('online-users', function(users){
          onlineUsers.empty();
          for (var i = 0; i < users.length; i++) {
            onlineUsers.append('<li>' + users[i]+'</li>');
          }
        });

        socket.on('user left', function(obj){
          onlineUsers.empty();
          for (var i = 0; i < obj.users.length; i++) {
            onlineUsers.append('<li>' + obj.users[i]+'</li>');
          }
        });


    }]
  };

});
