const questions = [
  {
    question: "Comment dit-on 'apple' en français ?",
    options: ["Pomme", "Banane", "Orange", "Raisin"],
    answer: 0
  },
  {
    question: "Quelle est la couleur du ciel ?",
    options: ["Vert", "Bleu", "Rouge", "Jaune"],
    answer: 1
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question-text").textContent = q.question;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index);
    answers.appendChild(btn);
  });

  document.getElementById("next-btn").style.display = "none";
}

function selectAnswer(index) {
  const correct = questions[current].answer;
  const buttons = document.getElementById("answers").children;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
    buttons[i].style.backgroundColor = i === correct ? "#2ecc71" : (i === index ? "#e74c3c" : "");
  }

  if (index === correct) score++;
  document.getElementById("next-btn").style.display = "inline";
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  const result = document.getElementById("result");
  result.style.display = "block";
  result.innerHTML = `<h2>You got ${score} out of ${questions.length} correct!</h2>`;

  const progress = Math.round((score / questions.length) * 100);
  localStorage.setItem("progress-french", progress);
}

function goHome() {
  window.location.href = "index.html";
}

window.onload = loadQuestion;
