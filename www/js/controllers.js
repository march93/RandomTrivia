angular.module('starter.controllers', [])

.controller('StartCtrl', ['TriviaService', 'ScoresService', '$timeout', function(TriviaService, ScoresSerivce, $timeout) {
  var startctrl = this;

  // set initial variables
  startctrl.qnum = 0;
  startctrl.started = false;
  startctrl.over = false;
  startctrl.question = "";
  startctrl.choices = [];
  startctrl.answer = "";

  // start button
  this.start = function() {
    startctrl.qnum = 0;
    startctrl.started = true;
    startctrl.over = false;
    startctrl.current();
  };

  // get current question
  this.current = function() {
    var cur = TriviaService.getHistory(startctrl.qnum);

    if (cur != false) {
      startctrl.question = cur.question;
      startctrl.choices = cur.choices;
      startctrl.answer = cur.answer;
    } else {
      startctrl.over = true;
    }
  };

  // check answer
  this.check = function(clicked) {
    if (clicked == startctrl.answer) {
      // display CORRECT
      startctrl.correct = true;
      startctrl.buttonclicked = true;

      // get next question and hide CORRECT
      $timeout(function () {
        startctrl.buttonclicked = false;
        startctrl.next();
      }, 1000); 

    } else {
      // display WRONG
      startctrl.correct = false;
      startctrl.buttonclicked = true;

      // get next question and hide WRONG
      $timeout(function () {
        startctrl.buttonclicked = false;
        startctrl.next();
      }, 2000); 
    }
  };

  // next question
  this.next = function() {
    startctrl.qnum++;
    startctrl.current();
  };

  // restart trivia
  this.restart = function() {
    startctrl.started = false;
    startctrl.over = false;
    //startctrl.start();
  }
}])

.controller('ScoresCtrl', function($scope, ScoresService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.scores = ScoresService.all();
  $scope.remove = function(score) {
    ScoresService.remove(score);
  };
})

.controller('ScoreDetailCtrl', function($scope, $stateParams, ScoresService) {
  $scope.score = ScoresService.get($stateParams.scoreId);
})

.controller('CategoriesCtrl', function() {
  var catctrl = this;
  catctrl.enableHistory = true;
  catctrl.enableMovie = false;

});
