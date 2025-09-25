let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Biber",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Webseite in eine Webseite ein?",
        "answer_1": "Per Drag and Drop",
        "answer_2": "Mit iframe",
        "answer_3": "Mit Links",
        "answer_4": "Gar nicht!",
        "right_answer": 2
    },
    {
        "question": "Welche Programmiersprache läuft in fast jedem Browser?",
        "answer_1": "Java",
        "answer_2": "C++",
        "answer_3": "JavaScript",
        "answer_4": "Python",
        "right_answer": 3
    },
    {
        "question": "Welcher HTML-Tag wird für Überschriften verwendet?",
        "answer_1": "<p>",
        "answer_2": "<a>",
        "answer_3": "<div>",
        "answer_4": "<h1>",
        "right_answer": 4
    },
    {
        "question": "Was bedeutet CSS?",
        "answer_1": "Computer Style Sheets",
        "answer_2": "Creative Style System",
        "answer_3": "Cascading Style Sheets",
        "answer_4": "Colorful Style Sentences",
        "right_answer": 3
    }
]

let currentQuestion = 0;
let counterOfRightQuestions = 0;
let successAudio = new Audio('./assets/audio/success.mp3');
let failureAudio = new Audio('./assets/audio/failure.mp3');

function init(){
    let numQuestionsRef = document.getElementById('number_questions');
    numQuestionsRef.innerHTML = questions.length;
    showQuestion();
    renderProgressBar();
    setNumberOfCurrentQuestion();
    clearAllHighlightedCards()
}

function showQuestion(){
    let question = questions[currentQuestion];
    document.getElementById('questiontext').innerHTML = question.question;
    showAnswer(question);
}

function showAnswer(question){
    document.getElementById('answer_1').textContent = question.answer_1;
    document.getElementById('answer_2').textContent = question.answer_2;
    document.getElementById('answer_3').textContent = question.answer_3;
    document.getElementById('answer_4').textContent = question.answer_4;
}

function answer(selection){
    // let question = questions[currentQuestion];
    let questionObj = getCurrentQuestionObj();
    let num_answer = selection.replace("answer_", "");
    let idOfRightAnswer = getIdOfRightAnswer(questionObj);
    if (questionObj.right_answer == num_answer){
        questionSuccessful(selection);
        
    }
    else{
        questionNotSuccessful(selection, idOfRightAnswer);
    }
    enableNextButton();
}

function questionSuccessful(selection){
    document.getElementById(selection).parentNode.classList.add("bg-success");
    counterOfRightQuestions++;
    successAudio.play();
}

function questionNotSuccessful(selection, idOfRightAnswer){
     document.getElementById(selection).parentNode.classList.add("bg-danger");
    document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
    failureAudio.play();
}

function getCurrentQuestionObj(){
    let element;
    let currentQuestion = document.getElementById('questiontext').innerText;
    Object.keys(questions).forEach(function(key){
        if (questions[key].question == currentQuestion){
            element = questions[key];
        };
    })
    return element
}

function getIdOfRightAnswer(questionObj){
    let id = "answer_" + questionObj.right_answer;
    return id
}

function enableNextButton(){
    document.getElementById('next-button').disabled = false;
}

function nextQuestion(){
    if (checkMaxNumOfQuestions()){
        showEndScreen();
        hideQuestionBody();
        renderNumberOfCorrectQuestions();
    }
    else{
        incrementVarCurrentQuestion();
        showQuestion();
        disableNextButton();
        clearAllHighlightedCards();
        setNumberOfCurrentQuestion();
        renderProgressBar();
    }
}

function showEndScreen(){
    document.getElementById("end-screen").style=""
    document.getElementById("end-screen-img").style=""
}

function hideQuestionBody(){
    document.getElementById("question-body").style="display: none";
    document.getElementById('progress-container').style="display: none";   
    document.getElementById("quizapp_questionmark").style="display: none";
}

function renderNumberOfCorrectQuestions(){
  document.getElementById('number_correct_questions').innerHTML = counterOfRightQuestions;
}

function incrementVarCurrentQuestion(){
    currentQuestion++;
}

function disableNextButton(){
    document.getElementById('next-button').disabled = true;
}

function clearAllHighlightedCards(){
    document.getElementById('answer_1').parentElement.classList.remove("bg-success");
    document.getElementById('answer_1').parentElement.classList.remove("bg-danger");
    document.getElementById('answer_2').parentElement.classList.remove("bg-success");
    document.getElementById('answer_2').parentElement.classList.remove("bg-danger");
    document.getElementById('answer_3').parentElement.classList.remove("bg-success");
    document.getElementById('answer_3').parentElement.classList.remove("bg-danger");
    document.getElementById('answer_4').parentElement.classList.remove("bg-success");
    document.getElementById('answer_4').parentElement.classList.remove("bg-danger");
}

function checkMaxNumOfQuestions(){
    if (questions.length == currentQuestion+1){
        return true;
    }
    else{
        return false;
    }
}

function setNumberOfCurrentQuestion(){
    document.getElementById('num_current_question').innerHTML = currentQuestion+1;
}

function renderProgressBar(){
    document.getElementById('progress-bar').innerHTML = calcPercentage()+"%";
    document.getElementById('progress-bar').style.width = calcPercentage()+"%";
}

function calcPercentage(){
    let percentageOfCurrentQuestion = 100 * (currentQuestion + 1) / questions.length;
    return percentageOfCurrentQuestion
}

function restartQuiz(){
    currentQuestion = 0;
    counterOfRightQuestions = 0;
    document.getElementById("question-body").style="display: block";
    document.getElementById("end-screen").style="display: none";
    document.getElementById("end-screen-img").style="display: none"
    document.getElementById("quizapp_questionmark").style="display: block";
    document.getElementById('progress-container').style="display: block";   
    init();
}