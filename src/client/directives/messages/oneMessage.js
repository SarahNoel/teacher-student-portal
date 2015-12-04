app.directive('oneMessage', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/messages/oneMessage.html',
      controller: ['$scope', 'UserServices', '$http', function($scope, UserServices, $http) {
        //connect to socket
        var socket = io.connect();
        var user = UserServices.getUser();
        var convo;


        function getConvo(){
            convo = UserServices.getConvo();
            for (var i = 0; i < 100; i++) {
              //if message exists
              if(convo.messages[i]){
                chatUl.append('<li>&nbsp' + messages[i].user + ': ' + UserServices.languageFilter(messages[i].message) + '</li>');
                }
            }
            for (var j = 0; j < convo.users.length; j++) {
                if(convo.users[j] != user.username){
                    $scope.recipient =convo.users[j];
                }
            }
        }



        $scope.sendMessage = function(){
            console.log('woo');
        };


        //load convo on enter
        getConvo();
    }]
  };

});
