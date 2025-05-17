

let currentQuestion = 0;
let score = 0;
let participantName = "";

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

function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    nextBtn.classList.add("hidden");

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.className = "block w-full text-left px-4 py-2 bg-gray-200 rounded hover:bg-gray-300";
        btn.onclick = () => selectAnswer(option, btn);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(selected, btn) {
    const correct = questions[currentQuestion].answer;
    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.remove("bg-gray-200");
        btn.classList.add("bg-green-300");
        score++;
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
}

retryBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add("hidden");
    quizEl.classList.remove("hidden");
    showQuestion();
};

nextBtn.onclick = nextQuestion;

// Handle Start Quiz button click
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

// Show the name input modal on page load
window.onload = () => {
    nameModal.classList.remove("hidden");
};
