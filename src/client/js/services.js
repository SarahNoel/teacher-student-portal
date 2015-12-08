app.factory('SeedServices', ['$http', function($http){

  //seed new teacher with resources
  function seedResources(user){
    for (var i = 0; i < resourceSeed.length; i++) {
      $http.post('/resources/' + user._id, resourceSeed[i])
      .then(function(data){
      });
    }
  }

  var resourceSeed = [
    {
    title: '100 Great Resources for Middleschool Students',
    url: 'http://www.middleschool.net/resources-middleschool-students.htm',
    description: 'Great resource to help in all subjects'
    },
    {
    title: 'Quizlet',
    url: 'https://quizlet.com/',
    description: 'Simple tools that let you study anything, for free.'
    },
    {
    title: 'Vocabulary Spelling City',
    url: 'http://www.spellingcity.com/word-study-games.html',
    description: 'Learning to read and write fluently requires mastery of a distinct skill set.'
    },
    {
    title: '60 Education Games',
    url: 'http://edtechideas.com/2009/12/21/60-educational-game-sites-that-you%E2%80%99ve-probably-never-seen/',
    description: '60 games for all subjects'
    }
  ];

    return {
    seedResources:seedResources
  };

}]);
//--------------USER FACTORY-------------------//

app.factory('UserServices', ['$http', function($http){
  var username = '';
  var game = '';
  var teacher = false;
  var student = false;
  var studentTeacher;
  var playGameId;
  var conversation;
  var resourceID;

  //checks for logged in user
  function isLoggedIn(){
    if(username === ''){
      return false;
    }
    else{
      return true;
    }
  }

  //stores user to access from all controllers
  function storeUser(user){
    console.log(user);
    username = user;
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
    student = false;
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

  //get teacher id
  function checkforTeacher(){
    if(student){
      return username.teacherID;
    }
    if(teacher){
      return username._id;
    }
  }

  //store current game
  function storePlayGame(id){
    playGameId = id;
  }

  //get current game
  function getPlayGame(){
    return playGameId;
  }

  //store resource
  function storeResource(id){
    resourceID = id;
  }

  //retrieve resource
  function getResource(){
    return resourceID;
  }

  //saves conversation
  function saveConvo(convo){
    conversation = convo;
  }

  //gets conversation
  function getConvo(){
    return conversation;
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


  //filters out vulgar language
  function languageFilter(str, teacher){
    var profanities = ['shit', 'fuck', 'ass', 'bastard', 'bitch', 'cock', 'cunt', 'kunt', 'dick', 'dyke', 'dike', 'fag', 'faggit', 'faggot', 'fagit', 'fagot', 'damn', 'dammit', 'asshole', 'whore', 'homo', 'nigga', 'nigger', 'pussy', 'queer', 'slut', 'whore', 'tit', 'titty', 'twat', 'fucka', 'retard', 'scrote', 'scrotum', 'titties', 'fucker', 'penis', 'vagina', 'shithead', 'blowjob', 'cum', 'buttplug', 'buttplugs', 'dipshit', 'queef', 'bitches', 'bitchy', 'jizz', 'cocksucker', 'cocksuckers', 'jackass', 'jackasses', 'bumface'];

    var symbols = '!@#$%^&*©æ®√∞Ω∫∆¥ƒ∂ß';
    var arr = str.split(' ');
    for (var i = 0; i < arr.length; i++) {
      var word = arr[i].toLowerCase();
      if(profanities.indexOf(word) != -1){
        var replace = '';
        if(teacher){
          replace = word.strike();
        }
        else{
          for (var j = 0; j <= word.length+2; j++) {
            var index = Math.floor(Math.random() * symbols.length);
            replace += symbols[index];
            j++;
          }
        }
        arr.splice(i, 1, replace);
      }
    }
    return arr.join(' ');
  }

  return{
          isLoggedIn: isLoggedIn,
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
          languageFilter: languageFilter,
          saveConvo: saveConvo,
          getConvo: getConvo,
          storeResource: storeResource,
          getResource: getResource
        };
}]);

























