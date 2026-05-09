const titles = {
  'home': 'Profile',
  'projects': 'Projects',
  'skills': 'Tech Stack',
  'journey': 'Experience',
  'about': 'About Me',
  'contact': 'AI Assistant'
};

function switchTab(tabId) {
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if(item.dataset.tab === tabId) item.classList.add('active');
  });

  // Animate Views
  const activeView = document.querySelector('.view.active');
  if (activeView && activeView.id !== 'view-' + tabId) {
    activeView.classList.remove('active');
  }
  const newView = document.getElementById('view-' + tabId);
  if(newView) newView.classList.add('active');

  // Update Header
  const dynamicGreeting = document.getElementById('dynamic-greeting');
  const realtimeClock = document.getElementById('realtime-clock');
  
  if(dynamicGreeting) dynamicGreeting.style.display = tabId === 'home' ? 'block' : 'none';
  if(realtimeClock) realtimeClock.style.display = tabId === 'home' ? 'block' : 'none';
  
  if (tabId !== 'home') {
    const headerTitle = document.createElement('div');
    headerTitle.className = 'greeting';
    headerTitle.id = 'temp-title';
    headerTitle.textContent = titles[tabId];
    
    const existingTemp = document.getElementById('temp-title');
    if (existingTemp) existingTemp.remove();
    
    const headerInfo = document.querySelector('.header-info');
    if(headerInfo) headerInfo.appendChild(headerTitle);
  } else {
    const existingTemp = document.getElementById('temp-title');
    if (existingTemp) existingTemp.remove();
  }

  // Trigger Skills Animation
  if(tabId === 'skills') {
    setTimeout(() => {
      document.querySelectorAll('.progress-fill').forEach(bar => {
        bar.style.width = bar.dataset.width || '0%';
      });
    }, 100);
  } else {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      bar.style.width = '0%';
    });
  }
  
  // Scroll to top smoothly
  const contentArea = document.getElementById('content-area');
  if(contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
}
