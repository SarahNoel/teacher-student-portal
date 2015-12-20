app.directive('oneMessage', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/messages/oneMessage.html',
      controller: ['$scope', 'UserServices', '$http', function($scope, UserServices, $http) {
        //connect to socket
        var socket = io.connect();
        var user = UserServices.getUser();
        var convo;

        //wrap elements in angular
        var chatUl = angular.element(document.querySelector('#dm-chat-ul'));

        //send direct message
        $scope.sendMessage = function(){
            var newMessage = $scope.chatInput;
            $scope.chatInput = '';
            socket.emit('dm-sent', convo.room, newMessage);
              $http.post('/chat/savetoconvo', {convoID:convo._id, user:user.username, message:newMessage})
              .then(function(data){
            });
        };

        //append message after hitting socket
        socket.on('dm-received', function(message){
            chatUl.append('<li>&nbsp' + message.user + ': ' + UserServices.languageFilter(message.message) + '</li>');
        });

        //gets conversation history
        function getConvo(){
            convo = UserServices.getConvo();
            for (var i = 0; i < 100; i++) {
              //if message exists
              if(convo.messages[i]){
                chatUl.append('<li>&nbsp' + convo.messages[i].user + ': ' + UserServices.languageFilter(convo.messages[i].message) + '</li>');
                }
            }
            for (var j = 0; j < convo.users.length; j++) {
                if(convo.users[j] != user.username){
                    $scope.recipient = convo.users[j];
                }
            }
        }

        //load convo on enter
        getConvo();
    }]
  };

});
