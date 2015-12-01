
//--------------USER FACTORY-------------------//

app.factory('UserServices', ['$http', function($http){
  var username = '';
  var game = '';
  var teacher = false;
  var student = false;
  var studentTeacher;
  var playGameId;

  return{
          storeUser: storeUser,
          getUser: getUser,
          logout: logout,
          storeGame: storeGame,
          getGame: getGame,
          isTeacher: isTeacher,
          saveTeacher: saveTeacher,
          isStudent: isStudent,
          saveStudent: saveStudent,
          checkforTeacher: checkforTeacher,
          storePlayGame: storePlayGame,
          getPlayGame: getPlayGame,
          enableAll: enableAll,
          languageFilter: languageFilter
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
  function storeGame(saveGame){
    game = saveGame;
  }

   //gets game
  function getGame(){
    if(game === ''){
      return false;
    }
    return game;
  }

  //saves user as teacher
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

  //saves user as student
  function saveStudent(){
    student = true;
  }

  //checks if student
  function isStudent(){
    if(!student){
      return false;
    }
    return true;
  }

  //if student, return teacher
  //if teacher, return teacher
  function checkforTeacher(){
    if(student){
      return username.teacherID;
    }
    if(teacher){
      return username._id;
    }
  }

  function storePlayGame(id){
    playGameId = id;
  }

  function getPlayGame(){
    return playGameId;
  }

  //enables all hangman letters
  function enableAll(picked){
    for (var i = 0; i < picked.length; i++) {
      var element = document.getElementById(picked[i]);
      var angElement = angular.element(element);
      angElement.removeClass('picked');
    }
    picked = [];
  }



  function languageFilter(str){
    var profanities = ['shit', 'fuck', 'ass', 'bastard', 'bitch', 'cock', 'cunt', 'dick', 'dyke', 'fag', 'faggit', 'faggot', 'damn', 'dammit', 'asshole', 'homo', 'nigga', 'nigger', 'pussy', 'queer', 'slut', 'whore', 'tit', 'twat', 'fucka', 'retard', 'scrote', 'scrotum', 'titties' ];

    for (var i = 0; i < profanities.length; i++) {
      var lower = str.toLowerCase();
      var word = profanities[i];
      if(lower.indexOf(word) >= 0){
        var asterisks = '';
        for (var j = 0; j <= word.length; j++) {
          asterisks += "*";
          j++;
        }
        str = lower.replace(word, asterisks);
      }
    }
    return str;
  }
}]);

