let current = 0;
let score = 0;
let questions = [];

//Decode the special caracters
function decodeHTML(html) {
  const txt = document.createElement("textarea"); // Create a txt space in memeory
  txt.innerHTML = html; //Get the html content
  return txt.value; //Browser automatically decodes html into text 
}

// Fetch questions from the API
function fetchQuestions() {
  current = 0;
  score = 0;

  fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple')
    .then(response => response.json())
    .then(data => {
      questions = data.results.map(q => {
        const options = [...q.incorrect_answers, q.correct_answer];
        
        // Shuffle the answers to randomize the options

        const shuffledOptions = options.sort(() => Math.random() - 0.5);
        
        // Get the index of the correct answer in the shuffled options
        const correctIndex = shuffledOptions.indexOf(q.correct_answer);

        return {
          question: q.question,
          options: shuffledOptions,
          answer: correctIndex
        };
      });
      loadQuestion(); //Load questions after fetched
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}

function loadQuestion() {
  if (questions.length === 0) return;

  const q = questions[current];
  document.getElementById("question-text").textContent = decodeHTML(q.question);

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = decodeHTML(option);
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

  if (index === correct) {
    score++;
    new Audio("/audio/correct.mp3").play();
    

  } else {
    new Audio("/audio/wrong.mp3").play();
    const questionText = questions[current].question;

    // Build a Google search link using the correct answer or question
    const searchText = encodeURIComponent(`${questionText}`);
    const searchURL = `https://www.google.com/search?q=${searchText}`;

    // Create the link element
    const link = document.createElement("a");
    link.href = searchURL;
    link.textContent = "Checkout the answer";
    link.target = "_blank"; // opens in new tab
    link.style.display = "block";
    link.style.color = "turquoise";

    // Append it to the page
    document.getElementById("answers").appendChild(link);

  }

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
  localStorage.setItem("progress-computer-science", progress);
}

function goHome() {
  window.location.href = "index.html";
}

window.onload = fetchQuestions;
