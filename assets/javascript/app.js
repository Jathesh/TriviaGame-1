$(document).ready(function() {
    
    var introMusic = new Audio("");
    var triviaGame = {
        correct: 0,
        incorrect: 0,
        numQues: 0,
        skipped: 0,
        timer: 0,
        currentQues: -1,

        // object array of questions, answers, and pics
        questions: [
            {
                question: "Who is the best drummer Metallica has ever had?",
                choices: ["Pete Best", "Lars Ulrich", "Dave Grohl", "Jose Altuve"],
                ans: 1,
                img: "assets/images/lars.jpeg"
            },
            {
                question: "How many bassists have Metallica had in their career?",
                choices: ["4", "3", "5", "2"],
                ans: 2,
                img: "assets/images/metbassists.jpg"
            },
            {
                question: "What is the name of the guitarist that Kirk Hammet replaced?",
                choices: ["Jimmy Page", "Dave Mustaine", "Dimebag Darrell", "The Edge"],
                ans: 1,
                img: "assets/images/mustaine.jpg"
            },
            {
                question: "How many full length albums has Metallica released?",
                choices: ["8", "7", "5", "10"],
                ans: 3,
                img: "assets/images/covers.jpg"
            },
            {
                question: "What was the name of Metallicas first full length album?",
                choices: ["Kill em All", "The Black Album", "Abbey Road", "Nevermind"],
                ans: 0,
                img: "assets/images/killem.jpeg"
            },
            {
                question: "What song was Metallicas first Grammy award for?",
                choices: ["Dust in the Wind", "One", "Enter Sandman", "Whole Lotta Love"],
                ans: 1,
                img: "assets/images/grammys.jpeg"

            },
            {
                question: "How many members are in Metallicas current line up?",
                choices: ["4", "5", "3", "6"],
                ans: 0,
                img: "assets/images/metallicacurrent.jpg"
            }
        ]
    };

    //starts game
    var startGame =  function() {
        $("#startButton").hide(); 
        gameCheck();
    };

//shows the question from the array
    var showQuestion = function() {
            var currentQues = triviaGame.questions[triviaGame.currentQues].question;
            begin(); 
            $(".question").html(currentQues); 
            for (var i = 0; i < triviaGame.questions[triviaGame.currentQues].choices.length; i++){
                var addBtn = $("<div>")
                addBtn.addClass("btn options"); 
                addBtn.data("num", i); 
                addBtn.on("click", compare); 
                addBtn.text(triviaGame.questions[triviaGame.currentQues].choices[i]); 
                $(".choices").append(addBtn); 
            }
            

        };

    var gameCheck = function() {
        
        if (triviaGame.currentQues < triviaGame.questions.length-1) {
            triviaGame.currentQues++; 
            showQuestion();
        } else {
           
            endScreen();
        }
    };

    //compares if the user selection is correct
    var compare = function() {
        
        if ($(this).data("num") === triviaGame.questions[triviaGame.currentQues].ans) {
            correctAns();
        } else {
            incorrectAns();
        }
    };

    //setting up the counter
    var begin = function() {
        triviaGame.timer = 20;
        triviaGame.counter = setInterval(countDown, 1000);
        updateTimer();
    };

    //Updating the timer on the page
    var updateTimer = function( time ) {
        $(".timer").html("Time Remaining: " + triviaGame.timer + " seconds");
    };

    //countdown
    var countDown = function() {
        
        triviaGame.timer--;
        updateTimer();
        if(triviaGame.timer === 0){
            
            stop();
            skippedAns();
        }
    };

    //clearInterval
    var stop = function() {
        clearInterval(triviaGame.counter);
    };

    //if the user answers the question correctly, increase the correct by 1 and show pic
    var correctAns = function() {
        var question = triviaGame.questions[triviaGame.currentQues];
        clear();
        triviaGame.correct++;
        $(".question").empty();
        setTimeout(function() {
            gameCheck();
        }, 4000);
        $(".question").append("You got it right!");
        $(".question").append("<br><img src=" + question.img + ">");
    };

    //If the user answer incorrectly, increasing the incorrect counter by 1, shows the answer and prints the gif
    var incorrectAns = function() {
        var question = triviaGame.questions[triviaGame.currentQues];
        clear();
        triviaGame.incorrect++;
        $(".question").empty();
        $(".question").append("Wrong! The answer is " +  "<br>" + question.choices[question.ans]);
        $(".question").append("<br> <img src='assets/images/wonka.jpg'>");
        setTimeout(function() {
            gameCheck();
        }, 4000);
    };

    //user timesout, increase the skipped 1 and show pic
    var skippedAns = function() {
        var question = triviaGame.questions[triviaGame.currentQues];
        clear();
        triviaGame.skipped++;
        $(".question").append("You ran out of time! The answer is " + "<br>" + question.choices[question.ans]);
        $(".question").append("<br> <img src='assets/images/wonka.jpg'>");
        setTimeout(function() {
            gameCheck();
        }, 4000);
    };

    //end game
    var endScreen = function() {
        clear();
        var questionDiv = $(".question");
        questionDiv.append("Number of Correct Answers: " + triviaGame.correct); 
        questionDiv.append("<br>Number of Incorrect Answers: " + triviaGame.incorrect); 
        questionDiv.append("<br>Number of Skipped Questions: " + triviaGame.skipped); 
        questionDiv.append("<br> <img src='assets/images/metallica.jpeg'>");
        questionDiv.append("<br><button id='playAgain'>Play Again?</button>"); 
        $("#playAgain").on("click", function() {
            $("#playAgain").hide();
            triviaGame.correct = 0;
            triviaGame.incorrect = 0;
            triviaGame.skipped = 0;
            triviaGame.currentQues = -1;
            clear();
            gameCheck();
        })
    };
    //clearing out divs and stopping the count down timer
    var clear = function() {
        stop();
        $(".question").empty();
        $(".timer").empty();
        $(".choices").empty();
    };

    //on click game start
    $("#startButton").on("click", function() {
        startGame();
        introMusic.play();

    })

});

