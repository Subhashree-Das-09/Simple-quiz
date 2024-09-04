const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');

const myQuestions = [
    {
        question: "1. What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris"
        },
        correctAnswer: "c"
    },
    {
        question: "2. Which language runs in a web browser?",
        answers: {
            a: "Java",
            b: "C",
            c: "JavaScript"
        },
        correctAnswer: "c"
    },
    {
        question: "3. What does CSS stand for?",
        answers: {
            a: "Central Style Sheets",
            b: "Cascading Style Sheets",
            c: "Cascading Simple Sheets"
        },
        correctAnswer: "b"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

function buildQuiz() {
    const currentQuestion = myQuestions[currentQuestionIndex];
    const answers = [];
    for (let letter in currentQuestion.answers) {
        answers.push(
            `<div>
                <label>
                    <input type="radio" name="question" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>
            </div>`
        );
    }
    let buttonHTML = '';
    if (currentQuestionIndex > 0) {
        buttonHTML += '<button id="previous">Previous</button>';
    }
    if (currentQuestionIndex < myQuestions.length - 1) {
        buttonHTML += '<button id="next">Next</button>';
    } else {
        buttonHTML += '<div class="button-group">';
        buttonHTML += '<button id="submit">Submit</button>';
        buttonHTML += '<button id="reset">Reset</button>';
        buttonHTML += '</div>';
    }
    quizContainer.innerHTML = `
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>
        ${buttonHTML}
    `;
}

function showNextQuestion() {
    const answerContainer = quizContainer.querySelector('.answers');
    const selector = `input[name="question"]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    userAnswers.push(userAnswer);
    currentQuestionIndex++;
    buildQuiz();
}

function showPreviousQuestion() {
    currentQuestionIndex--;
    buildQuiz();
}

function showResults() {
    let numCorrect = 0;
    for (let i = 0; i < myQuestions.length; i++) {
        if (userAnswers[i] === myQuestions[i].correctAnswer) {
            numCorrect++;
        }
    }
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    buildQuiz();
    resultsContainer.innerHTML = '';
}

buildQuiz();

quizContainer.addEventListener('click', (e) => {
    if (e.target.id === 'next') {
        showNextQuestion();
    } else if (e.target.id === 'previous') {
        showPreviousQuestion();
    } else if (e.target.id === 'submit') {
        const answerContainer = quizContainer.querySelector('.answers');
        const selector = `input[name="question"]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        userAnswers.push(userAnswer);
        showResults();
    } else if (e.target.id === 'reset') {
        resetQuiz();
    }
});