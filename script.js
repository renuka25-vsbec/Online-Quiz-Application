const questions = [
    {
        question: "Which language is used to structure a web page?",
        answers: [
            { text: "HTML", correct: true },
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "C", correct: false }
        ]
    },
    {
        question: "Which language makes a web page interactive?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which one is a database?",
        answers: [
            { text: "MySQL", correct: true },
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: false }
        ]
    },
    {
        question: "What does CPU stand for?",
        answers: [
            { text: "Central Processing Unit", correct: true },
            { text: "Computer Personal Unit", correct: false },
            { text: "Central Program Unit", correct: false },
            { text: "Computer Processing Utility", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    quiz.classList.remove("hide");
    result.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quiz.classList.add("hide");
    result.classList.remove("hide");

    scoreElement.innerHTML =
        `Your Score: ${score} / ${questions.length}`;
}

function restartQuiz() {
    startQuiz();
}

startQuiz();
