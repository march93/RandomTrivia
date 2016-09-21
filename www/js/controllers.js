angular.module('starter.controllers', [])

    .controller('StartCtrl', ['TriviaService', 'ScoresService', 'CategoryService', '$timeout', '$document', function (TriviaService, ScoresService, CategoryService, $timeout, $document) {
        var startctrl = this;

        // set initial variables
        startctrl.qnum = 0;
        startctrl.started = false;
        startctrl.over = false;
        startctrl.question = "";
        startctrl.choices = [];
        startctrl.answer = "";
        startctrl.options = null;

        var initialize = function () {
            CategoryService.getOptions().then(
                function (result) {
                    startctrl.options = result;
                }
            )
        };
        (function () {
            $document.ready(function () {
                initialize();
            })
        })();

        // start button
        startctrl.start = function () {
            startctrl.qnum = 0;
            startctrl.started = true;
            startctrl.over = false;
            startctrl.current();
        };

        // get current question
        startctrl.current = function () {
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
        startctrl.check = function (clicked) {
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
                }, 1000);
            }
        };

        // next question
        startctrl.next = function () {
            startctrl.qnum++;
            startctrl.current();
        };

        // restart trivia
        startctrl.restart = function () {
            startctrl.started = false;
            startctrl.over = false;
        }
    }])

    .controller('CategoriesCtrl', ['CategoryService', '$document', function (CategoryService, $document) {
        var catctrl = this;
        catctrl.enableHistory = null;
        catctrl.enableMovie = null;

        catctrl.onChange = function () {
            console.log(catctrl.enableHistory);
            CategoryService.saveOptions({
                history: catctrl.enableHistory,
                movie: catctrl.enableMovie
            });
        }

        var initialize = function () {
            CategoryService.getOptions().then(
                function (result) {
                    catctrl.enableHistory = result.history;
                    catctrl.enableMovie = result.movie;
                }
            )
        };
        (function () {
            $document.ready(function () {
                initialize();
            })
        })();
    }])

    .controller('ScoresCtrl', function ($scope, ScoresService) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.scores = ScoresService.all();
        $scope.remove = function (score) {
            ScoresService.remove(score);
        };
    })

    .controller('ScoreDetailCtrl', function ($scope, $stateParams, ScoresService) {
        $scope.score = ScoresService.get($stateParams.scoreId);
    });
