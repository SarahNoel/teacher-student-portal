
app.directive('chatRoom', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/chat-room/chat-room.html',
      controller: ['$scope', 'UserServices', '$http', function($scope, UserServices, $http) {
        //connect to socket
        var socket = io.connect();
        var user = UserServices.getUser();
        var teacherID = UserServices.checkforTeacher();
        var student = UserServices.isStudent();
        var teacherName;
        var teacher;
        var teacherPhone;
        var teacherDisableStatus;
        $scope.doneLoading = false;
        //wrap elements in angular
        var chatUl = angular.element(document.querySelector('#chat-ul'));
        var onlineUsers = angular.element(document.querySelector('#user-ul'));

        //populate 100 chat messages
        function populateChat(){
          chatUl.empty();
          $http.get('/chat/messages/' + teacherID)
          .then(function(data){
            teacherName = data.data.username;
            teacher = '@' + teacherName;
            teacherPhone = data.data.phone;
            teacherDisableStatus = data.data.disabledAlerts;
            $scope.teacherName = teacher;
            var messages = data.data.chatMessages;
            //show up to 100 messages
            for (var i = 0; i < 100; i++) {
              //if message exists
              if(messages[i]){
                var append;
                if(student){
                  //returns filtered chat
                  append = UserServices.languageFilter(messages[i].message);
                  chatUl.append('<li>&nbsp' + messages[i].user + ': ' + append + '</li>');
                }
                else{
                  //returns strikethrough for teacher
                  append = UserServices.languageFilter(messages[i].message, 'teacher');
                  chatUl.append('<li>&nbsp' + messages[i].user + ': ' + append + '</li>');
                }
              }
            }
            $scope.doneLoading = true;
          });
        }

        //get user, add to online users
        function userEntered(){
          socket.emit('entered', user);
          populateChat();
        }

        //checks for disabled alerts
        $scope.isDisabled = function(){
          if(teacherDisableStatus){
            return true;
          }
          if(user.disabledAlerts){
            return true;
          }
          else{
            return false;
          }
        };

        //displays filter message to teachers
        $scope.isTeacher = function(){
          return UserServices.isTeacher();
        };

        //send message to whole room
        $scope.sendMessage = function(){
          var newMessage = $scope.chatInput;
          //checks if teacher and user are disabled
          if(!teacherDisableStatus && !user.disabledAlerts){
            //if clear and @teacher, send twilio
            if(newMessage.indexOf(teacher) != -1){
              var sendMe = user.username + ': ' + newMessage;
              $http.post('/chat/twilio', {phone: teacherPhone, message: sendMe, id:teacherID, name:teacherName})
              .then(function(data){
                socket.emit('message-sent', newMessage);
                $http.post('/chat/message', {user:user.username, message:newMessage, id:teacherID, name:teacherName})
                .then(function(data){
                  populateChat();
                });
              });
            }
            //if no @teacher, send normal message
            else{
            socket.emit('message-sent', newMessage);
            $http.post('/chat/message', {user:user.username, message:newMessage, id:teacherID});
            }
          }
          //if disabled, send normal message
          else{
            socket.emit('message-sent', newMessage);
            $http.post('/chat/message', {user:user.username, message:newMessage, id:teacherID});
          }
          //clear chat box
          $scope.chatInput = '';
        };

        //append message after hitting socket
        socket.on('message-received', function(message){
          var newMessage;
          //filter for student
          if(student){
            newMessage = UserServices.languageFilter(message.message);
            chatUl.append('<li>&nbsp' + message.user + ': ' + newMessage + '</li>');
          }
          //filter with strikethrough for teacher
          else{
            newMessage = UserServices.languageFilter(message.message, 'teacher');
            chatUl.append('<li>&nbsp' + message.user + ': ' + newMessage + '</li>');
          }

        });

        //updates Users Online box when people enter
        socket.on('online-users', function(users){
          onlineUsers.empty();
          for (var i = 0; i < users.length; i++) {
            onlineUsers.append('<li>' + users[i]+'</li>');
          }
        });

        //updates Users Online box when one leaves
        socket.on('user left', function(obj){
          onlineUsers.empty();
          for (var i = 0; i < obj.users.length; i++) {
            onlineUsers.append('<li>' + obj.users[i]+'</li>');
          }
        });

        //re-gets chat info when alert status changed
        socket.on('alert-change', function(){
          console.log('changed!');
          populateChat();
        });

        //add user to chat room
        userEntered();
    }]
  };

});
