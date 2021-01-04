let body = document.body;
let mainEl = document.createElement("main");

// * INFO ELEMENTS
let infoEl = document.createElement("div");
let highScoreEl = document.createElement("a");
let timerEl = document.createElement("p");
let timeLeftEl = document.createElement("span");

// * INTRO ELEMENTS
let introEl = document.createElement("section");
let h1El = document.createElement("h1");
let descriptionEl = document.createElement("div");
let p1El = document.createElement("p");
let p2El = document.createElement("p");
let buttonEl = document.createElement("button");

// * RESULT ELEMENTS
let resultEl = document.createElement("section");
let h2El = document.createElement("h2");
let pEl = document.createElement("p");
let scoreEl = document.createElement("span");
let formEl = document.createElement("form");
let labelEl = document.createElement("label");
let inputFieldEl = document.createElement("div");
let inputEl = document.createElement("input");
let submitEl = document.createElement("button");

// * ANSWER ELEMENTS
let answerEl = document.createElement("div");
let pElement = document.createElement("p");

// * HIGHSCORE ELEMENTS
let boardEl = document.createElement("section");
let h2Elmnt = document.createElement("h2");
let highScoreListEl = document.createElement("ol");
let buttonsEl = document.createElement("div");
let goBackBtn = document.createElement("button");
let clearBtn = document.createElement("button");

//for checking answers
let check;
let questionCounter = 0;

let isOnMainPage = false;
let isOnInitials = false;
let clickHighScore = false;

let quiz = [
    {
        "q": "Commonly used data types DO Not Include:",
        "choices": ["Strings", "Booleans", "Alerts", "Numbers"],
        "a": "Alerts"
    },
    {
        "q": "The condition in an if/else statement is enclosed with _____.",
        "choices": ["Quotes", "Curly Brackets", "Paranthesis", "Square Brackets"],
        "a": "Paranthesis"
    },
    {
        "q": "Arrays in JavaScript can be used to store _____.",
        "choices": ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
        "a": "All of the above"
    },
    {
        "q": "String values must be enclosed within _____ when being assigned to variables.",
        "choices": ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        "a": "Quotes"
    },
    {
        "q": "A very useful tool used during development and debugging for printing content to the debugger is:",
        "choices": ["JavaScript", "Terminal/Bash", "For loops", "console.log"],
        "a": "console.log"
    }
];

let initials = [];
let savedInitials = [];


// create info div which contains highScore and timer
let createInfoSection = function() {
    infoEl.className = "info";

    highScoreEl.setAttribute("id", "high-score");
    highScoreEl.textContent = "View High Score";

    timerEl.className = "timer";
    timerEl.textContent = "Time: ";
    timeLeftEl.className = "time-left";
    timeLeftEl.textContent = "0";

    timerEl.appendChild(timeLeftEl);

    infoEl.appendChild(highScoreEl);
    infoEl.appendChild(timerEl);

    body.appendChild(infoEl);
}


// create intro section
let createIntroSection = function() {
    introEl.className = "intro";

    h1El.textContent = "Coding Quiz Challenge";

    descriptionEl.className = "description";
    p1El.textContent = "Try to answer the following code-related questions within the time limit.";
    p2El.textContent = "Keep in mind that incorret answers will penalize your score/time by ten seconds!";
    descriptionEl.appendChild(p1El);
    descriptionEl.appendChild(p2El);

    buttonEl.className = "btn start-btn";
    buttonEl.innerText = "Start Quiz";

    introEl.appendChild(h1El);
    introEl.appendChild(descriptionEl);
    introEl.appendChild(buttonEl);

    mainEl.appendChild(introEl)

    body.appendChild(mainEl);
}



// create result section
let createResultSection = function(score) {
    mainEl.innerHTML = "";

    resultEl.className = "result";

    h2El.textContent = "All Done!";
    resultEl.appendChild(h2El);

    pEl.textContent = "Your final score is ";
    scoreEl.textContent = score + ".";
    pEl.appendChild(scoreEl);

    resultEl.appendChild(pEl);

    // create container div
    formEl.className = "container";

    labelEl.setAttribute("for", "name");

    formEl.appendChild(labelEl);

    inputFieldEl.className = "input-field";
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "name");
    submitEl.textContent = "Submit";
    submitEl.setAttribute("type", "submit");
    submitEl.className = "btn submit-btn";
    
    inputFieldEl.appendChild(inputEl);
    inputFieldEl.appendChild(submitEl);

    formEl.appendChild(inputFieldEl);


    resultEl.appendChild(formEl);

    mainEl.appendChild(resultEl);
    body.appendChild(mainEl);
}

// create query section
let createQuery = function(obj) {
    mainEl.innerHTML = "";
    let queryEl = document.createElement("section");
    queryEl.className = "query";

    let question = createQuestion(obj.q);
    let choices = createChoices(obj.choices);

    queryEl.appendChild(question);
    queryEl.appendChild(choices);

    return queryEl;
}

// create questions
let createQuestion = function(str) {
    let questionEl = document.createElement("h2");
    questionEl.className = "question";
    questionEl.textContent = str;

    return questionEl;
}

// create choices
let createChoices = function(obj) {
    let choicesEl = document.createElement("ol");
    choicesEl.className = "choices";
    questionCounter === 2 && (choicesEl.className = "choices large");

    for (let i = 0; i < obj.length; i++) {
        let optionEl = document.createElement("li");
        optionEl.textContent = obj[i];
        choicesEl.appendChild(optionEl);
    }

    return choicesEl;
}

let createAnswer = function(x) {
    answerEl.className = "query answer";
    pElement.textContent = x;
    answerEl.appendChild(pElement);
}

// show answer
let showAnswer = function(x) {
    createAnswer(x);
    mainEl.appendChild(answerEl);
    setTimeout( ()=> {
        answerEl.remove();
    }, 620);
}


// ***** Timer ***** 
let timeInterval;

let timer = function() {
    timeLeftEl.textContent--;
    checkTimeInterval();
}
let isOver = false;
let checkTimeInterval = function() {
    timeLeft = timeLeftEl.textContent;
    if (timeLeft <= 0 || isOver === true) {
        timeLeftEl.textContent = 0;
        clearInterval(timeInterval);
        isOver = true;
        mainFunction();
        return true;
    };
    return false;
}

let startTimer = function (stop) {
    timeLeftEl.textContent = 75;
    timeInterval = setInterval(timer, 1000)
}



let getAnswer = function(event) {
    if (event.target.closest("ol.choices li")) {
        let userAnswer = event.target.innerText;
        checkAnswer(userAnswer, quiz[questionCounter].a);
    } 
}

let checkAnswer = function(userAnswer, answer) {
    if (userAnswer === answer) {
        check = true;
    } else {
        check = false;
        timeLeftEl.innerText -= 10;
        if ( checkTimeInterval() ) return 0;
    }

    questionCounter++;
    mainFunction();
}

let answerChecker = function () {
    if (check === true) {
        showAnswer("Correct!");
        check = "";
    } else if (check === false) {
        showAnswer("Wrong!");
        check = "";
    }
}
let rankEl;
let createHighScoreBoard = function() {

    mainEl.innerHTML = "";
    infoEl.innerHTML = "";

    boardEl.className = "section";
    h2Elmnt.textContent = "High Scores";

    boardEl.appendChild(h2Elmnt);

    highScoreListEl.className = "highscore";
    
    // if (!isEmpty(initials)) {
    //     initials = JSON.parse(initials);
    // }

    for (let i = 0; i < initials.length; i++) {
        let listItem = document.createElement("li");
        listItem.className = "rank";
        listItem.textContent = initials[i].initial + " - " + initials[i].score;
        highScoreListEl.appendChild(listItem);
    }
    rankEl = document.getElementsByClassName("rank");
    boardEl.appendChild(highScoreListEl);

    buttonsEl.className = "buttons";
    goBackBtn.className = "btn go-back";
    clearBtn.className = "btn clear";
    goBackBtn.textContent = "Go Back";
    clearBtn.textContent ="Clear High Scores";

    buttonsEl.appendChild(goBackBtn);
    buttonsEl.appendChild(clearBtn);

    boardEl.appendChild(buttonsEl);

    mainEl.appendChild(boardEl);
};

let clearHighScoreBoard = function() {
    if (rankEl.length != 0) {
        for (let i = 0; i <= rankEl.length; ) {
            rankEl[i].remove();
            if (i == rankEl.length) break;
        };
    }
}

function isEmpty(arr) {
    for (key in arr) {
      return false;
    };
    return true;
};

let getInitialValue = function() {
    let inputValue = inputEl.value;
    return inputValue;
}

let getScoreValue = function() {
    let scoreValue = timeLeftEl.textContent;
    return scoreValue;
}


let saveInitialValues = function() {
    let initialValue = getInitialValue();
    let scoreValue = getScoreValue();
    let initialDataObj = {
        initial: initialValue,
        score: scoreValue,
    };
    sortInitials(initialDataObj);
    initials = JSON.stringify(initials);
    localStorage.setItem("initials", initials);
    initials = JSON.parse(initials);
}

let loadInitialValues = function() {
    savedInitials = localStorage.getItem("initials");
    if (!savedInitials) {
        savedInitials = [];
        return false;
    }
    savedInitials = JSON.parse(savedInitials);
    initials = savedInitials;
}

let sortInitials = function(obj) {
    let isAdded = false;
    for (let i = 0; i < initials.length; i++) {
        if (+obj.score > +initials[i].score) {
            initials.splice(i, 0, obj);
            isAdded = true;
            break;
        };
    };
    isAdded || initials.push(obj);
}



let showBoard = function() {
    isOnInitials = false;
    isOver = true;
    if (clickHighScore) {
        createHighScoreBoard();
    } else {
        saveInitialValues();
        createHighScoreBoard();
    }
}

let mainFunction = function() {
    isOnMainPage = false;
    if (questionCounter === quiz.length || isOver) {
        isOnInitials = true;
        clearInterval(timeInterval);
        createResultSection(timeLeftEl.innerText);
        answerChecker();
    } else {
        mainEl.appendChild( createQuery(quiz[questionCounter]) );
        answerChecker();
    }
};


let createMainPage = function () {
    isOver = false;
    isOnMainPage = true;
    questionCounter = 0;
    mainEl.innerHTML = "";
    createInfoSection();
    createIntroSection();
};


createMainPage();
let showHighScore = document.getElementById("high-score");
let clearScores = document.getElementsByClassName("clear");
loadInitialValues();

buttonEl.addEventListener("click", mainFunction);
buttonEl.addEventListener("click", startTimer);
mainEl.addEventListener("click", getAnswer); 
formEl.addEventListener("submit", showBoard);
goBackBtn.addEventListener("click", () => {
    clearHighScoreBoard();
    createMainPage();
});
showHighScore.addEventListener("click", () => {
    if (isOnMainPage) {
        clickHighScore = true;
        showBoard();
        clickHighScore = false;
    } else if (isOnInitials) {
        alert("First Enter the initials!");
    } else {
        alert("You have to finish the Quiz!")
    }
});
clearBtn.addEventListener("click", () => {
    localStorage.clear();
    initials = [];
    clearHighScoreBoard();
    createHighScoreBoard();
})
