angular
.module('myApp')
.filter('excludeSame',function(){
  return function(input,collection){
    if(!input||!angular.isArray(input)){
      return;
    }
    if(!collection||!angular.isArray(collection)){
      return input;
    }
    return input.filter(function(item){
      return !collection.some(function(coll){
        return item.id===coll.id;
      });
    });
  };
});