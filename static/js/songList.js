angular.module('jukeboxApp')
  .controller('songListCtrl', function ($scope) {
      
      $scope.lol = 'hejsan';
      $scope.playlist = [
             {"name" : "Call me maybe", 
              "artist" : "Carly Rae Jepson", 
              "album" : "no clue",
              "rating" : "2"
              }, 

            {"name" : "Eye of the tiger", 
              "artist" : "survivor", 
              "album" : "no clue",
              "rating" : "4"
              }, 

            {"name" : "Call me maybe", 
              "artist" : "Carly Rae Jepson", 
              "album" : "no clue",
              "rating" : "0"
              }, 

            {"name" : "Eye of the tiger", 
              "artist" : "survivor", 
              "album" : "no clue",
              "rating" : "-10"
              }
              ,
            {"name" : "Call me maybe", 
              "artist" : "Carly Rae Jepson", 
              "album" : "no clue",
              "rating" : "-1"
              }, 

            {"name" : "Eye of the tiger", 
              "artist" : "survivor", 
              "album" : "no clue",
              "rating" : "3"
              }
          ]
  });
