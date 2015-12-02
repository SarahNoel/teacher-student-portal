app.directive('chatRoom', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/chat-room/chat-room.html',
      controller: ['$scope', 'UserServices', '$http', function($scope, UserServices, $http) {
        //connect to socket
        var socket = io.connect();
        var user = UserServices.getUser();
        var teacherID = UserServices.checkforTeacher();

        //get user, add to online users
        function userEntered(){
          socket.emit('entered', user);
          $http.get('/chat/messages/' + teacherID)
          .then(function(data){
            var messages = data.data.chatMessages;
            for (var i = 0; i < 100; i++) {
              if(messages[i]){
                chatUl.append('<li>&nbsp' + messages[i].user + ': ' + UserServices.languageFilter(messages[i].message) + '</li>');
              }
            }
          });
        }

        //wrap elements in angular
        var chatUl = angular.element(document.querySelector('#chat-ul'));
        var onlineUsers = angular.element(document.querySelector('#user-ul'));

        //send message
        $scope.sendMessage = function(){
          socket.emit('message-sent', $scope.chatInput);
          $http.post('/chat/message', {user:user.username, message:$scope.chatInput, id:teacherID});
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

        userEntered();
    }]
  };

});
