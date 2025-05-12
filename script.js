const questions = [
  {
    question: "Quelle est la capitale de la France ?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Lyon", correct: false },
      { text: "Marseille", correct: false }
    ]
  },
  {
    question: "Combien y a-t-il de continents ?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionElement = document.createElement("h2");
  questionElement.innerText = currentQuestion.question;
  questionContainer.appendChild(questionElement);

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    questionContainer.appendChild(button);
  });
}

function resetState() {
  questionContainer.innerHTML = "";
  nextButton.style.display = "none";
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  setStatusClass(selectedButton, correct);

  Array.from(document.getElementsByClassName("answer")).forEach(button => {
    button.removeEventListener("click", selectAnswer);
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });

  nextButton.style.display = "inline";
}

function setStatusClass(element, correct) {
  element.classList.add(correct ? "correct" : "wrong");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    questionContainer.innerHTML = "<h2>Quiz terminé !</h2>";
    nextButton.style.display = "none";
  }
});

showQuestion();
