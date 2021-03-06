angular.module('starter.services', [])

    .factory('TriviaService', function () {
        // Trivia Questions
        var history = [
            {
                question: "During the Black Death, or Bubonic Plague, in mid 1300's Europe (approx.), what percentage of the population perished?",
                choices: ["One Quarter", "One Third", "One Half", "Two Third"],
                answer: "One Third"
            },
            {
                question: "What group used the agricultural method of terracing in the Andes Mountains during the 15th century?",
                choices: ["Mayans", "Aztecs", "Incas", "Native Americans"],
                answer: "Incas"
            },
            {
                question: "What C was a Roman Emperor (AD 41 to AD 54) that was the first emperor chosen by the army?",
                choices: ["Cassius Clay", "Carsius III", "Claudius I", "Caesar Salad"],
                answer: "Claudius I"
            },
            {
                question: "Who was the first to translate the Bible from Latin to English?",
                choices: ["St. Patrick", "Martin Luther", "Pope Gregory XI", "John Wycliffe"],
                answer: "John Wycliffe"
            },
            {
                question: "The Hundred Years War was fought between which two European countries?",
                choices: ["England and Spain", "France and Germany", "France and Spain", "England and France"],
                answer: "England and France"
            }
        ];

        var movie = [
            {
                question: "Who is the most nominated actor in Academy history?",
                choices: ["Jack Nicholson", "Laurence Olivier", "Spencer Tracy", "Paul Newman"],
                answer: "Jack Nicholson"
            },
            {
                question: "Which of the following four individuals has not won an Oscar?",
                choices: ["Robert Duvall", "Eminem", "Cuba Gooding, Jr.", "Mickey Rourke"],
                answer: "Mickey Rourke"
            },
            {
                question: "Who was the first director to win the Best Director Oscar for a film in which he was also nominated as Best Actor?",
                choices: ["Woody Allen", "Warren Beatty", "Kevin Costner", "Clint Eastwood"],
                answer: "Woody Allen"
            },
            {
                question: "Which of the following film series franchises has had more than one of its films win the Best Picture Oscar?",
                choices: ["James Bond", "The Godfather", "The Lord of the Rings", "Star Wars"],
                answer: "The Godfather"
            },
            {
                question: "Which film had the tagline: 'Heaven and Earth are About to Collide'?",
                choices: ["Armageddon (1998)", "The Day After Tomorrow (2004)", "Deep Impact (1998)", "When Worlds Collide (1951)"],
                answer: "Deep Impact (1998)"
            }
        ]

        return {
            getHistory: function (qnum) {
                if (qnum < history.length) {
                    return history[qnum];
                } else {
                    return false;
                }
            },
            getMovie: function (qnum) {
                if (qnum < movie.length) {
                    return movie[qnum];
                } else {
                    return false;
                }
            }
        };
    })

    .factory('CategoryService', ['$q', function ($q) {
        var cat = {};

        cat.options = {
            history: true,
            movie: false 
        };

        cat.getOptions = function() {
            var q = $q.defer();
            q.resolve(cat.options);
            return q.promise;
        }
        cat.saveOptions = function(newOption) {
            angular.copy(newOption, cat.options);
            console.log(newOption);
            console.log(cat.options)
        }
        return cat;
    }])

    .factory('ScoresService', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var scores = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
                id: 1,
                name: 'Max Lynx',
                lastText: 'Hey, it\'s me',
                face: 'img/max.png'
            }, {
                id: 2,
                name: 'Adam Bradleyson',
                lastText: 'I should buy a boat',
                face: 'img/adam.jpg'
            }, {
                id: 3,
                name: 'Perry Governor',
                lastText: 'Look at my mukluks!',
                face: 'img/perry.png'
            }, {
                id: 4,
                name: 'Mike Harrington',
                lastText: 'This is wicked good ice cream.',
                face: 'img/mike.png'
            }];

        return {
            all: function () {
                return scores;
            },
            remove: function (score) {
                scores.splice(scores.indexOf(score), 1);
            },
            get: function (scoreId) {
                for (var i = 0; i < scores.length; i++) {
                    if (scores[i].id === parseInt(scoreId)) {
                        return scores[i];
                    }
                }
                return null;
            }
        };
    });
