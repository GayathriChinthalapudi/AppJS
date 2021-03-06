(
    function() {

        var data = {
            quizContent: [{
                    question: "The 'function' and 'var' are known as:",
                    answer1: "Keywords",
                    answer2: "Data types",

                    answer3: "Declaration statements",
                    correctAnswer: 3
                },
                {
                    question: "When interpreter encounters an empty statements, what it will do:",
                    answer1: "shows a warning",
                    answer2: "Throws an error",
                    answer3: "Ignores the statements",
                    correctAnswer: 3
                },
                {
                    question: "What is the name of the Southampton F.C.'s stadium?",
                    answer1: "block that contains a single statement",
                    answer2: "Conditional block",
                    answer3: "block that combines a number of statements into a single compound statement",
                    correctAnswer: 3
                },
                {
                    question: "Which one of the following also known as Conditional Expression:",
                    answer1: "immediate if",
                    answer2: "If-then-else statement",
                    answer3: "switch statement",
                    correctAnswer: 1
                },
                {
                    question: "Which type of JavaScript language is ______",
                    answer1: "Assembly-language",
                    answer2: "Object-Based",
                    answer3: "High-level",
                    correctAnswer: 2
                },
            ],
            points: 0
        };

        var display = {
            getApp: document.getElementById('app'),

            // Updates DOM on start/restart of the quiz
            mainPage: function() {
                var newEl = '<div class="quest-number"><p id="questNumber"></p></div><h1 id="questionDisplay" class="h3"></h1>';
                newEl += '<ul><li><label><input type="radio" name="answers" id="input1" value="1"><span class="outer"><span class="inner"></span></span><div id="answerDisplay1"></div></label></li>';
                newEl += '<li><label><input type="radio" name="answers" id="input2" value="2"><span class="outer"><span class="inner"></span></span><div id="answerDisplay2"></div></label></li>';
                newEl += '<li><label><input type="radio" name="answers" id="input3" value="3"><span class="outer"><span class="inner"></span></span><div id="answerDisplay3"></div></label></li></ul>';
                newEl += '<div class="points-wrap"><p id="currentPoints"></p></div>';

                this.getApp.innerHTML = newEl;
            },

            // Updates DOM with each question
            updateMainPage: function() {
                var getQuestNumber = document.getElementById('questNumber'),
                    getQuestion = document.getElementById('questionDisplay'),
                    getAnswer1 = document.getElementById('answerDisplay1'),
                    getAnswer2 = document.getElementById('answerDisplay2'),
                    getAnswer3 = document.getElementById('answerDisplay3'),
                    getCurrentPoints = document.getElementById('currentPoints'),
                    sumOfQuestions = data.quizContent.length;

                getQuestNumber.innerHTML = control.count + 1 + '/' + sumOfQuestions;
                getQuestion.innerHTML = data.quizContent[control.count].question;
                getAnswer1.innerHTML = data.quizContent[control.count].answer1;
                getAnswer2.innerHTML = data.quizContent[control.count].answer2;
                getAnswer3.innerHTML = data.quizContent[control.count].answer3;
                getCurrentPoints.innerHTML = 'Points:' + ' ' + data.points;
                this.newElement('button', 'submit', 'Submit Answer');
            },
            addAnswer: function(showMessage) {
                var sumOfQuestions = data.quizContent.length;

                if (showMessage === 'correct') {
                    this.newElement('p', 'showAnswer', 'Correct Answer!');
                } else {
                    this.newElement('p', 'showAnswer', 'Incorrect Answer!');
                }

                if (control.count < sumOfQuestions - 1) {
                    this.newElement('button', 'nextQuest', 'Next question');
                } else {
                    this.newElement('button', 'result', 'submit');
                }
            },
            removeAnswer: function(event) {
                var getShowAnswer = document.getElementById('showAnswer');
                var getShowAnswerParent = getShowAnswer.parentNode;
                getShowAnswerParent.removeChild(getShowAnswer);
                var clickedEl = event.target;
                var clickedElParent = clickedEl.parentNode;
                clickedElParent.removeChild(clickedEl);
                var radioButtons = document.getElementsByName('answers');
                var allRadioButtons = radioButtons.length;
                var i;

                for (i = 0; i < allRadioButtons; i++) {
                    radioButtons[i].checked = false;
                }
            },

            // Displays final page of the quiz
            resultPage: function() {
                this.getApp.innerHTML = '<h1 class="h3">You scored ' + data.points + '/' + data.points + ' points</h1>';
                this.newElement('button', 'restart', 'Restart Quiz');
            },
            newElement: function(elem, elemId, elemText) {
                var newElem = document.createElement(elem);
                var newElemText = document.createTextNode(elemText);
                newElem.appendChild(newElemText);
                newElem.id = elemId;
                this.getApp.appendChild(newElem);
            }
        };

        var control = {
            init: function() {
                var start = document.getElementById('start') || document.getElementById('restart');
                start.addEventListener('click', function() {
                    display.mainPage();
                    control.update();
                }, false);
            },
            update: function() {
                display.updateMainPage();
                var submit = document.getElementById('submit');
                submit.addEventListener('click', this.checkAnswer, false);
            },

            /**
             * Alerts if none of the radios is checked on submit 
             * Verifies correct/incorrect answer
             * Directs quiz to the next question or to the final page
             */
            checkAnswer: function(event) {
                var radioButtons = document.getElementsByName('answers'),
                    allRadioButtons = radioButtons.length,
                    isChecked = false,
                    checkedRadio,
                    clickedEl = event.target,
                    clickedElParent = clickedEl.parentNode,
                    i;

                for (i = 0; i < allRadioButtons; i++) {
                    if (radioButtons[i].checked) {
                        isChecked = true;
                        checkedRadio = +radioButtons[i].value;
                    }
                }

                if (isChecked === false) {
                    alert('Please choose the answer!');
                } else {
                    clickedElParent.removeChild(clickedEl);
                    if (checkedRadio === data.quizContent[control.count].correctAnswer) {
                        display.addAnswer('correct');
                        data.points++;
                    } else {
                        display.addAnswer();
                    }

                    var nextQuestion = document.getElementById('nextQuest'),
                        result = document.getElementById('result');

                    if (nextQuestion) {
                        nextQuestion.addEventListener('click', function(event) {
                            control.count++;
                            display.removeAnswer(event);
                            control.update();
                        }, false);
                    } else {
                        result.addEventListener('click', function() {
                            display.resultPage();
                            control.init();
                            control.count = 0;
                            data.points = 0;
                        }, false);
                    }
                }
            },

            // Used for incrementing/looping through the quiz questions and answers
            count: 0
        };

        control.init();

    })();