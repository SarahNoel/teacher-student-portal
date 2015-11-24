app.filter('addOne', function(){
  return function(input){
    return input + 1;
  };
});


app.filter('arrayToString', function(){
  return function(input){
    var array = input;
    array = array.join().replace(/,/g, ' ');
    return array;
  };
});
