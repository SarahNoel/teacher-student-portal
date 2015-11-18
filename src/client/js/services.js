
//--------------USER FACTORY-------------------//

app.factory('UserServices', ['$http', '$q', function($http, $q){
  var username;
  return{
          storeUser: storeUser,
          getUser: getUser
        };

  //stores user to access from all controllers
  function storeUser(inputusername){
    username = inputusername;
  }

  //gets user
  function getUser(){
    return username;
  }
}]);

//--------------CHAT FACTORY-------------------//

app.factory('ChatServices', ['$websocket', function($websocket) {
    // Open a WebSocket connection
    // var dataStream = $websocket('ws://localhost:8080');

    // var collection = [];

    // dataStream.onMessage(function(message) {
    //   collection.push(JSON.parse(message.data));
    // });

    var methods = {
    //   collection: collection,
    //   get: function() {
    //     dataStream.send(JSON.stringify({ action: 'get' }));
    //   }
    };

    return methods;
}]);
