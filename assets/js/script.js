let body = document.body;
let mainEl = document.createElement("main");

let questionCounter = 0;

let infoEl = document.createElement("div");
let highScoreEl = document.createElement("a");
let timerEl = document.createElement("p");
let timeLeftEl = document.createElement("span");

let introEl = document.createElement("section");
let h1El = document.createElement("h1");
let descriptionEl = document.createElement("div");
let p1El = document.createElement("p");
let p2El = document.createElement("p");
let buttonEl = document.createElement("button");

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

// create intro section
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

// add elements to page
mainEl.appendChild(introEl)

body.appendChild(infoEl);
body.appendChild(mainEl);




let createQuery = function(obj) {
    let queryEl = document.createElement("section");
    queryEl.className = "query";

    let question = createQuestion(obj.q);
    let choices = createChoices(obj.choices);

    queryEl.appendChild(question);
    queryEl.appendChild(choices);

    return queryEl;
}

let createQuestion = function(str) {
    let questionEl = document.createElement("h2");
    questionEl.className = "question";
    questionEl.textContent = str;

    return questionEl;
}

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



let getAnswer = function(event) {
    if (event.target.closest("li")) {
        let userAnswer = event.target.innerText;
        checkAnswer(userAnswer, quiz[questionCounter].a);
    } 
}

let checkAnswer = function(userAnswer, answer) {
    if (userAnswer === answer) {
        console.log("True");
    } else {
        console.log("False");
    }

    questionCounter++;
    mainFunction();
}


let mainFunction = function() {
    mainEl.innerHTML = "";
    if (questionCounter !== quiz.length) {
        mainEl.appendChild( createQuery(quiz[questionCounter]) );  
    }
};


buttonEl.addEventListener("click", mainFunction)
mainEl.addEventListener("click", getAnswer); 

