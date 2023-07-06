// Declare global variables 
const startBtn = document.querySelector("#startBtn");
let time = 75;
let timeRemaining = true;
let timeStart = false;
const countdownTimer = document.querySelector("#countdownTimer");
const homeContainer = document.querySelector("#homeContainer");
const quizContainer = document.querySelector("#quizContainer");
const questionHeading = document.querySelector("#questionHeading");
const answerChoices = document.querySelectorAll(".answerChoice");
const correctAnswer = document.querySelector("#correctAnswer");
const scoreElement = document.querySelector("#score");

// Set score = 0 at the start of the game 
let score = 0;
// question index
let i = 0;

// QUESTIONS ARRAY:
const questionsArray = [
  // questions data...
];

// Countdown Timer
const countdownTimerInterval = setInterval(setCountdownTimer, 1000);

function setCountdownTimer() {
  if (timeStart) {
    time--;
  }
  if (time <= 0) {
    endQuiz();
    time = 0;
  }
  document.getElementById("timer").innerHTML = time;
}

// Start Event Listener
startBtn.addEventListener("click", function() {
  quizContainer.style.display = "block";
  homeContainer.style.display = "none";
  countdownTimer.style.display = "block";
  document.getElementById("score_keeper").style.display = "block";
  scoreElement.innerHTML = score;
  setCountdownTimer();
  setQuizQuestions();
  timeStart = true;
});

// Questions Function
function setQuizQuestions() {
  const currentQuestion = questionsArray[i];
  questionHeading.textContent = currentQuestion.question;
  for (let j = 0; j < answerChoices.length; j++) {
    answerChoices[j].textContent = currentQuestion.answerChoice[j];
  }
}

// Handle Answer Choice Clicks
quizContainer.addEventListener('click', function(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswerIndex = questionsArray[i].correctAnswer;
  if (selectedAnswer === questionsArray[i].answerChoice[correctAnswerIndex]) {
    document.getElementById("AnswerResponse").innerHTML = "Correct! Nailed it!";
    score++;
  } else {
    timeRemaining -= 5;
    document.getElementById("AnswerResponse").innerHTML = "Incorrect! Better luck in the next one!";
  }
  setTimeout(function() {
    document.getElementById("AnswerResponse").innerHTML = "";
    if (i >= questionsArray.length - 1) {
      endQuiz();
    } else {
      i++;
      setQuizQuestions();
    }
  }, 1000);
  scoreElement.innerHTML = score;
});

// End Quiz
function endQuiz() {
  document.getElementById("game_over").style.display = "block";
  quizContainer.style.display = "none";
  countdownTimer.style.display = "none";
  document.getElementById("score_keeper").style.display = "none";
  document.getElementById("AnswerResponse").innerHTML = "";
  document.getElementById("end_score").innerHTML = score;
}

// Submit Score
function submitScore() {
  const initials = document.getElementById("initials").value;
  high_scores.push(`${initials} ${score}`);
  viewHighScores();
}

// View High Scores
function viewHighScores() {
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("game_over").style.display = "none";
  document.getElementById("high_scores_page").style.display = "block";
  let output = "";
  for (let k = 0; k < high_scores.length; k++) {
    output += ` ${high_scores[k]}`;
  }
  document.getElementById("high_scores").innerHTML = output;
  clearUp();
}

// Go Home
function goHome() {
  document.getElementById("high_scores_page").style.display = "none";
  document.getElementById("homeContainer").style.display = "block";
  clearUp();
}

// Clear High Scores
function clearHighScores() {
  high_scores = [];
}

// Clear Up
function clearUp() {
  time = 75;
  timeRemaining = true;
  timeStart = false;
  i = 0;
  score = 0;
}