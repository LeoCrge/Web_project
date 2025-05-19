let current = 0;
let score = 0;
let questions = [];

// Fetch questions from the API
function fetchQuestions() {
  fetch('https://opentdb.com/api.php?amount=10&category=22&difficulty=easy')
    .then(response => response.json())
    .then(data => {
      questions = data.results.map(q => {
        // Shuffle the answers to randomize the options
        const options = [...q.incorrect_answers, q.correct_answer];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        // Get the index of the correct answer in the shuffled options
        const correctIndex = shuffledOptions.indexOf(q.correct_answer);

        return {
          question: q.question,
          options: shuffledOptions,
          answer: correctIndex
        };
      });
      loadQuestion(); // Call loadQuestion once the questions are fetched
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}

function loadQuestion() {
  if (questions.length === 0) return;

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
  result.innerHTML = <h2>You got ${score} out of ${questions.length} correct!</h2>;

  const progress = Math.round((score / questions.length) * 100);
  localStorage.setItem("progress-geo", progress);
}

function goHome() {
  window.location.href = "index.html";
}

window.onload = fetchQuestions;