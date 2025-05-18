let currentQuestion = 0;
let score = 0;
let participantName = "";
let timer;
let timeLeft = 8;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const quizEl = document.getElementById("quiz");
const quizContainer = document.getElementById("quiz-container");
const scoreEl = document.getElementById("score");
const retryBtn = document.getElementById("retry-btn");
const participantNameInput = document.getElementById("participant-name");
const nameModal = document.getElementById("name-modal");
const startQuizBtn = document.getElementById("start-quiz-btn");
const participantDisplay = document.getElementById("participant-display");
const celebrationPopup = document.getElementById("celebration-popup");
const scoreChartCanvas = document.getElementById("scoreChart");
const timerEl = document.getElementById("timer");

function startTimer() {
  timeLeft = 8;
  timerEl.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      disableOptions();
      nextBtn.classList.remove("hidden");
    }
  }, 1000);
}

function disableOptions() {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  const correct = questions[currentQuestion].answer;
  buttons.forEach(b => {
    if (b.textContent === correct) {
      b.classList.add("bg-green-200");
    }
  });
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  timerEl.classList.remove("hidden");

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "block w-full text-left px-4 py-2 bg-gray-200 rounded hover:bg-gray-300";
    btn.onclick = () => selectAnswer(option, btn);
    optionsEl.appendChild(btn);
  });

  clearInterval(timer);
  startTimer();
}

function selectAnswer(selected, btn) {
  clearInterval(timer);

  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  if (selected === correct) {
    btn.classList.remove("bg-gray-200");
    btn.classList.add("bg-green-300");
    score++;
    celebrationPopup.classList.remove("hidden");
    setTimeout(() => {
      celebrationPopup.classList.add("hidden");
    }, 2100);
  } else {
    btn.classList.remove("bg-gray-200");
    btn.classList.add("bg-red-300");
    buttons.forEach(b => {
      if (b.textContent === correct) b.classList.add("bg-green-200");
    });
  }

  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
  participantDisplay.textContent = `Participant: ${participantName}`;
  timerEl.classList.add("hidden");

  new Chart(scoreChartCanvas, {
    type: 'doughnut',
    data: {
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        label: 'Score',
        data: [score, questions.length - score],
        backgroundColor: ['#4CAF50', '#F87171']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

retryBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  timerEl.classList.remove("hidden");
  showQuestion();
};

nextBtn.onclick = nextQuestion;

startQuizBtn.onclick = () => {
  participantName = participantNameInput.value.trim();
  if (!participantName) {
    alert("Please enter your name to start the quiz.");
    return;
  }
  nameModal.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  showQuestion();
};

window.onload = () => {
  nameModal.classList.remove("hidden");
};
