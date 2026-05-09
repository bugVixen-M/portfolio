const roles = ["Backend Developer", "Problem Solver", "ML Explorer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typingStatus = document.getElementById('typing-status');
  if(!typingStatus) return;

  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingStatus.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingStatus.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 40 : 100;
  
  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }
  setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 1500);
});
