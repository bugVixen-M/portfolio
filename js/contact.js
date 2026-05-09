function handleKeyPress(e) {
  if(e.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const chatContainer = document.getElementById('contact-chat');
  const typingIndicator = document.getElementById('typing-indicator');

  if(!chatInput || !chatContainer || !typingIndicator) return;

  const text = chatInput.value.trim();
  if(!text) return;

  appendMessage(text, 'chat-sent');
  chatInput.value = '';

  // Send email notification in the background
  sendEmailNotification(text);
  
  // Show typing
  chatContainer.appendChild(typingIndicator);
  typingIndicator.style.display = 'block';
  chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });

  // Bot reply
  setTimeout(() => {
    typingIndicator.style.display = 'none';
    appendMessage('Thanks for reaching out! Himanshu will get back to you soon. 🚀', 'chat-received');
  }, 1500 + Math.random() * 1000);
}

function appendMessage(text, type) {
  const chatContainer = document.getElementById('contact-chat');
  const typingIndicator = document.getElementById('typing-indicator');
  if(!chatContainer) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  
  const textDiv = document.createElement('div');
  textDiv.className = 'bubble-text';
  textDiv.textContent = text;
  
  const timeDiv = document.createElement('div');
  timeDiv.className = 'bubble-time';
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const mins = now.getMinutes().toString().padStart(2, '0');
  
  const readTicks = type === 'chat-sent' ? 
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent); margin-left:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>' : '';
    
  timeDiv.innerHTML = `${hours}:${mins} ${now.getHours() >= 12 ? 'PM' : 'AM'} ${readTicks}`;
  
  bubble.appendChild(textDiv);
  bubble.appendChild(timeDiv);
  
  chatContainer.insertBefore(bubble, typingIndicator);
  chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
  
  // Trigger charging effect
  triggerChargingEffect();
}

function triggerChargingEffect() {
  const indicator = document.getElementById('charging-indicator');
  if(!indicator) return;
  
  indicator.classList.add('active');
  
  // Vibrate if supported
  if (window.navigator.vibrate) {
    window.navigator.vibrate([20, 50, 20]);
  }
  
  setTimeout(() => {
    indicator.classList.remove('active');
  }, 2500);
}

async function sendEmailNotification(message) {
  try {
    await fetch("https://formsubmit.co/ajax/8bf32a86455aa2d6db0405e0a2b40915", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          name: "Portfolio Visitor",
          message: message,
          _subject: "New Message from Portfolio Bot"
      })
    });
    console.log("Email notification sent successfully.");
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
}
