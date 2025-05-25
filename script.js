// Load progress from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const subjects = ['computer-science', 'english', 'math', 'science', 'geo'];
  subjects.forEach(subject => {
    const progress = localStorage.getItem(`progress-${subject}`) || 0;
    updateProgressBar(subject, progress);
  });
});

// Function to start the quiz and update progress
function startQuiz(subject) {
  // Simulate completing more of the quiz
  let currentProgress = parseInt(localStorage.getItem(`progress-${subject}`) || 0);
  let newProgress = Math.min(currentProgress + 10, 100); // Increase by 10%, capped at 100%

  // Store the updated progress in localStorage
  localStorage.setItem(`progress-${subject}`, newProgress);

  // Update the progress bar visually
  updateProgressBar(subject, newProgress);

  // Redirect to the quiz page
  window.location.href = `${subject}.html`;
}

// Function to update the progress bar
function updateProgressBar(subject, value) {
  const progressElement = document.getElementById(`progress-${subject}`);
  if (progressElement) {
    progressElement.style.width = `${value}%`; // Update the width of the progress bar
  }
}

// Function to toggle the side menu on and off
function toggleMenu() {
  const sideMenu = document.getElementById('sideMenu');
  sideMenu.classList.toggle('open'); // Add or remove the 'open' class to toggle the side menu
}

// Function to toggle the side menu on and off
function toggleMenu() {
  const sideMenu = document.getElementById('sideMenu');
  sideMenu.classList.toggle('open'); // Toggle the 'open' class to show/hide the menu
}

// Example function to handle quiz starting
function startQuiz(subject) {
  alert(`Starting ${subject} quiz!`);
}

// Close the menu when clicking outside of it
window.addEventListener('click', function(e) {
  const sideMenu = document.getElementById('sideMenu');
  const hamburger = document.querySelector('.hamburger');
  if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
    sideMenu.classList.remove('open'); // Close the menu if the user clicks outside
  }
});
