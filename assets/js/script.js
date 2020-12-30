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
let containerEl = document.createElement("div");
let labelEl = document.createElement("label");
let inputFieldEl = document.createElement("div");
let inputEl = document.createElement("input");
let submitEl = document.createElement("button");

// * ANSWER ELEMENTS
let answerEl = document.createElement("div");
let pElement = document.createElement("p");

//for checking answers
let check;
let questionCounter = 0;


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


// create info div which contains highScore and timer
let createInfoSection = function() {
    infoEl.className = "info";

    highScoreEl.setAttribute("href", "#");
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
    resultEl.className = "result";

    h2El.textContent = "All Done!";
    resultEl.appendChild(h2El);

    pEl.textContent = "Your final score is ";
    scoreEl.textContent = score + ".";
    pEl.appendChild(scoreEl);

    resultEl.appendChild(pEl);

    // create container div
    containerEl.className = "container";

    labelEl.setAttribute("for", "name");
    labelEl.textContent = "Enter initials: ";

    containerEl.appendChild(labelEl);

    inputFieldEl.className = "input-field";
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "name");
    submitEl.textContent = "Submit";
    submitEl.setAttribute("type", "submit");
    submitEl.className = "btn submit-btn";
    
    inputFieldEl.appendChild(inputEl);
    inputFieldEl.appendChild(submitEl);

    containerEl.appendChild(inputFieldEl);


    resultEl.appendChild(containerEl);
    console.log(resultEl);

    mainEl.appendChild(resultEl);
    body.appendChild(mainEl);
}

// create query section
let createQuery = function(obj) {
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
    let counter = 0;
    let showInterval = setInterval( ()=> {
        counter++;

        if (counter === 2) {
            answerEl.remove();
            clearInterval(showInterval);
        }
    }, 450);
}


// ***** Timer ***** 
let timer = function() {
    timeLeftEl.innerText--;
}

let timeInterval;

let startTimer = function (stop) {
    timeLeftEl.innerText = 75;
    timeInterval = setInterval(timer, 1000)
}


let getAnswer = function(event) {
    if (event.target.closest("li")) {
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
    }

    questionCounter++;
    mainFunction();
}

let answerChecker = function () {
    if (check === true) {
        showAnswer("Correct!");
    } else if (check === false) {
        showAnswer("Wrong!");
    }
}



let mainFunction = function() {

    mainEl.innerHTML = "";
    if (questionCounter === quiz.length) {
        clearInterval(timeInterval);
        createResultSection(timeLeftEl.innerText);
        answerChecker();
    } else {
        mainEl.appendChild( createQuery(quiz[questionCounter]) );
        answerChecker();
    }
};


createInfoSection();
createIntroSection();

buttonEl.addEventListener("click", mainFunction);
buttonEl.addEventListener("click", startTimer);
mainEl.addEventListener("click", getAnswer); 

