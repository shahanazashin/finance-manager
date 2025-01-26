// script.js
document.getElementById('startButton').addEventListener('click', function(event) {
    event.preventDefault(); // This would prevent the default redirect.
    // Your custom JS code here.
    window.location.href = "index.html";
  });
   // Prevent the default anchor behavior
    alert('Welcome to the Personal Finance Manager!'); // Display an alert
;

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Update footer with the current year
document.getElementById('currentYear').textContent = new Date().getFullYear();