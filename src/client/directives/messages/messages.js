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
        //wrap elements in angular
        var chatUl = angular.element(document.querySelector('#chat-ul'));
        var onlineUsers = angular.element(document.querySelector('#user-ul'));


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
          });
        }

        //start new conversation
        $scope.startConvo = function(){
          var users = ["Bobby", "Luke"];
          var room = '5661bae698909cf6dabc836f5661c546aecef816e14fc329';
          $http.post('/chat/convo', {users:users, room:room, id1:'5661bae698909cf6dabc836f', id2: '5661c546aecef816e14fc329' })
          .then(function(data) {
            console.log(data);
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
