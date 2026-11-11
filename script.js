const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressFill = document.getElementById("progress-fill");

// questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentIndex = 0;
let score = 0;
let locked = false;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(function (el) {
    el.classList.toggle("active", el === screen);
  });
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  locked = false;
  scoreSpan.textContent = "0";
  totalQuestionsSpan.textContent = quizQuestions.length;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const question = quizQuestions[currentIndex];
  locked = false;

  currentQuestionSpan.textContent = currentIndex + 1;
  questionText.textContent = question.question;
  progressFill.style.width = ((currentIndex / quizQuestions.length) * 100) + "%";

  answersContainer.innerHTML = "";
  question.answers.forEach(function (answer) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer.text;
    button.addEventListener("click", function () {
      selectAnswer(button, answer.correct);
    });
    answersContainer.appendChild(button);
  });
}

function selectAnswer(button, correct) {
  if (locked) return;
  locked = true;

  const buttons = answersContainer.querySelectorAll(".answer-btn");
  buttons.forEach(function (btn) {
    btn.disabled = true;
  });

  if (correct) {
    button.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  } else {
    button.classList.add("incorrect");
    const correctIndex = quizQuestions[currentIndex].answers.findIndex(function (a) {
      return a.correct;
    });
    if (buttons[correctIndex]) buttons[correctIndex].classList.add("correct");
  }

  progressFill.style.width = (((currentIndex + 1) / quizQuestions.length) * 100) + "%";

  window.setTimeout(function () {
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 900);
}

function finishQuiz() {
  const total = quizQuestions.length;
  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = total;

  const ratio = score / total;
  let message;
  if (ratio === 1) {
    message = "Perfect score! You're a quiz champion.";
  } else if (ratio >= 0.8) {
    message = "Excellent work — you really know your stuff!";
  } else if (ratio >= 0.5) {
    message = "Not bad! A little practice and you'll ace it.";
  } else {
    message = "Good effort — give it another shot!";
  }

  resultMessage.textContent = message;
  showScreen(resultScreen);
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;
