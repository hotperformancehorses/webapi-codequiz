// Declare global variables 
const startBtn = document.getElementById("startBtn");
let time = 75;
let timeRemaining = true;
let timeStart = false;
const countdownTimer = document.getElementById("countdownTimer");
const homeContainer = document.getElementById("homeContainer");
const quizContainer = document.getElementById("quizContainer");
const questionHeading = document.getElementById("questionHeading");
const answerChoiceA = document.getElementById("answerChoiceA");
const answerChoiceB = document.getElementById("answerChoiceB");
const answerChoiceC = document.getElementById("answerChoiceC");
const answerChoiceD = document.getElementById("answerChoiceD");
const correctAnswer = document.getElementById("correctAnswer");
const highScores = [];
let output = "";
let score = 0;
let questionIndex = 0;

// QUESTIONS ARRAY:
const questionsArray = [
  {
    question: "Question: What is the HTML tag under which you can write the JavaScript code?",
    imageSrc: "",
    answerChoice: ["A) <javascript>", "B) <scripted>", "C) <script>", "D) <js>"],
    correctAnswer: 2
  },
  // ... rest of the questions ...
];

// Countdown timer function
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

// Start event listener
startBtn.addEventListener("click", function() {
  quizContainer.style.display = "block";
  homeContainer.style.display = "none";
  countdownTimer.style.display = "block";
  document.getElementById("score_keeper").style.display = "block";
  document.getElementById("score").innerHTML = score;
  setCountdownTimer();
  setQuizQuestions();
  timeStart = true;
});

// Set quiz questions
function setQuizQuestions() {
  questionHeading.textContent = questionsArray[questionIndex].question;
  answerChoiceA.textContent = questionsArray[questionIndex].answerChoice[0];
  answerChoiceB.textContent = questionsArray[questionIndex].answerChoice[1];
  answerChoiceC.textContent = questionsArray[questionIndex].answerChoice[2];
  answerChoiceD.textContent = questionsArray[questionIndex].answerChoice[3];
}

// Event listeners for answer choices
answerChoiceA.addEventListener('click', function(event) {
  event.stopPropagation();
  const correctAnswerIndex = questionsArray[questionIndex].correctAnswer;
  if (0 === correctAnswerIndex) {
    document.getElementById("AnswerResponse").innerHTML = "Correct! Nailed it!";
    setTimeout(function() {
      document.getElementById("AnswerResponse").innerHTML = "";
    }, 1000);
    score++;
    document.getElementById("score").innerHTML = score;
  } else {
    timeRemaining -= 5;
    document.getElementById("AnswerResponse").innerHTML = "Incorrect! Better luck in the next one!";
    setTimeout(function() {
      document.getElementById("AnswerResponse").innerHTML = "";
    }, 1000);
  }
  if (questionIndex >= questionsArray.length - 1) {
    endQuiz();
  } else {
    questionIndex++;
    setQuizQuestions();
  }
});

// ... repeat the above event listeners for answerChoiceB, answerChoiceC, and answerChoiceD ...

// End quiz function
function endQuiz() {
  document.getElementById("game_over").style.display = "block";
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("countdownTimer").style.display = "none";
  document.getElementById("score_keeper").style.display = "none";
  document.getElementById("AnswerResponse").innerHTML = "";
  document.getElementById("end_score").innerHTML = score;
}

// Submit score and initials
function submitScore() {
  highScores.push(document.getElementById("initials").value + " " + score);
  viewHighScores();
}

// View high scores
function viewHighScores() {
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("game_over").style.display = "none";
  document.getElementById("high_scores_page").style.display = "block";
  
  output = "";
  for (let k = 0; k < highScores.length; k++) {
    output += " " + highScores[k];
  }
  document.getElementById("high_scores").innerHTML = output;
  clearUp();
}

// Go back to home page
function goHome() {	
  document.getElementById("high_scores_page").style.display = "none";
  document.getElementById("homeContainer").style.display = "block";
  clearUp();
}

// Clear high scores
function clearHighScores() {
  highScores.splice(0, highScores.length);
}

// Clear up variables
function clearUp() {
  time = 75;
  timeRemaining = true;
  timeStart = false;
  questionIndex = 0;
  score = 0;
}
