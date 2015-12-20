app.directive('messages', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/messages/messages.html',
      controller: ['$scope', 'UserServices', '$http', '$location', function($scope, UserServices, $http, $location) {
        //connect to socket
        var socket = io.connect();
        var user = UserServices.getUser();
        var teacherID = UserServices.checkforTeacher();
        var student = UserServices.isStudent();
        var teacherName;
        var teacher;
        var teacherPhone;
        $scope.doneLoading = false;
        //wrap elements in angular
        var chatUl = angular.element(document.querySelector('#chat-ul'));
        var onlineUsers = angular.element(document.querySelector('#user-ul'));

        //gets classmates for direct messages
        function getStudents(){
          $http.get('/chat/directmessages/' + teacherID)
          .then(function(data){
            var allStudents = data.data.students;
            var studentArr = [];
            var needRooms = [];
            var haveRooms = [];
            //removes user from student list
            for (var i = 0; i < allStudents.length; i++) {
              if(allStudents[i].username != user.username){
                studentArr.push(allStudents[i]);
              }
            }
            //looks for users that already have conversations
            for (var j = 0; j < studentArr.length; j++) {
              var started = false;
              var chatRoom;
              for (var k = 0; k < studentArr[j].conversations.length; k++){
                if(studentArr[j].conversations[k].users.indexOf(user.username) > -1){
                  chatRoom = studentArr[j].conversations[k]._id;
                  started = true;
                }
              }
              //sorts classmates based on chatroom history
              if(started){
                var student = {};
                student.username = studentArr[j].username;
                student.room = chatRoom;
                haveRooms.push(student);
              }
              else{
                needRooms.push(studentArr[j]);
              }
            }
            $scope.haveRooms = haveRooms;
            $scope.needRooms = needRooms;
            $scope.doneLoading = true;
          });
        }

        //start new conversation
        $scope.startConvo = function(recipient, repID){
          var users = [user.username, recipient];
          var room = user._id + repID;
          $http.post('/chat/convo', {users:users, room:room, id1:user._id, id2: repID })
          .then(function(data) {
            UserServices.saveConvo(data.data);
            $location.path('/onemessage');
          });
        };

        //get a conversation to continue
        $scope.getConvo = function(id){
          $http.get('/chat/convo/'+ id)
          .then(function(data) {
            UserServices.saveConvo(data.data);
            $location.path('/onemessage');
          });
        };

        //list classmates
        getStudents();
    }]
  };

});
