// DYNAMIC CLOCK & GREETING
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const mins = now.getMinutes();
  
  // Time formatting
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMins = mins < 10 ? '0' + mins : mins;
  const clockEl = document.getElementById('realtime-clock');
  if(clockEl) clockEl.textContent = `${displayHours}:${displayMins} ${ampm}`;
  
  // Greeting logic
  let greeting = 'Good Evening';
  if (hours >= 5 && hours < 12) greeting = 'Good Morning';
  else if (hours >= 12 && hours < 17) greeting = 'Good Afternoon';
  
  const greetingEl = document.getElementById('dynamic-greeting');
  if(greetingEl && greetingEl.textContent !== greeting) {
    greetingEl.textContent = greeting;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);
});
