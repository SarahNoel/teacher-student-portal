app.factory('UserServices', ['$http', '$q', function($http, $q){
  var username;

  return{
          storeUser: storeUser,
          getUser: getUser
        };

  function storeUser(inputusername){
    username = inputusername;
  }

  function getUser(){
    return username;
  }

}]);
