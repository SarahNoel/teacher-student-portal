
//--------------USER FACTORY-------------------//

app.factory('UserServices', [function($){
  var username = '';
  var game = '';
  var teacher = false;

  return{
          storeUser: storeUser,
          getUser: getUser,
          logout: logout,
          storeGame: storeGame,
          getGame: getGame,
          isTeacher: isTeacher,
          saveTeacher: saveTeacher
        };

  //stores user to access from all controllers
  function storeUser(inputusername){
    username = inputusername;
  }

  //gets user
  function getUser(){
    if(username === ''){
      return false;
    }
    return username;
  }

  //logout
  function logout(){
    username = '';
    game = '';
    teacher = false;
  }

  //stores current game
  function storeGame(game){
    game = game;
  }

   //gets game
  function getGame(){
    if(game === ''){
      return false;
    }
    return game;
  }

  function saveTeacher(){
    teacher = true;
  }

  //checks if teacher
  function isTeacher(){
    if(!teacher){
      return false;
    }
    return true;
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
