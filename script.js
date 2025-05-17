
function startQuiz(topic) {
  alert(`Starting ${topic} quiz!`);
  // Redirect to quiz page or load questions dynamically
}

// Load progress from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const subjects = ['french', 'english', 'math', 'science','geo'];
  subjects.forEach(subject => {
    const progress = localStorage.getItem(`progress-${subject}`) || 0;
    updateProgressBar(subject, progress);
  });
});

function startQuiz(subject) {
  // Simulate completing more of the quiz
  let currentProgress = parseInt(localStorage.getItem(`progress-${subject}`) || 0);
  let newProgress = Math.min(currentProgress + 10, 100); // Increase by 10%

  localStorage.setItem(`progress-${subject}`, newProgress);
  updateProgressBar(subject, newProgress);

  window.location.href = `${subject}.html`;
}

function updateProgressBar(subject, value) {
  const progressElement = document.getElementById(`progress-${subject}`);
  if (progressElement) {
    progressElement.style.width = `${value}%`;
  }
}
