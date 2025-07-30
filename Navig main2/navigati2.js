/**
 * WINGO GAMING PORTAL - MAIN NAVIGATION SYSTEM
 * 
 * Features:
 * - Interactive navigation with animated indicator
 * - Accessible modal dialog system
 * - Game launcher with safety checks
 * - Content loading animations
 * - Responsive event handling
 */

// DOM Elements Cache
const DOM = {
  navItems: document.querySelectorAll('.nav-item'),
  navIndicator: document.querySelector('.nav-indicator'),
  modalTrigger: document.getElementById('modalBtn'),
  modal: document.getElementById('myModal'),
  modalClose: document.querySelector('.modal-close'),
  skeletonLoaders: document.querySelectorAll('.content-skeleton'),
  gameButtons: document.querySelectorAll('.btn[onclick]'),
  container: document.querySelector('.container')
};

// Application State
const state = {
  currentTab: 0,
  isModalOpen: false,
  contentLoaded: false
};

// Initialize the application
function init() {
  setupNavigation();
  setupModal();
  setupGameLaunchers();
  loadContent();
  setInitialActiveTab();
  setupAccessibility();
}

// ======================
// NAVIGATION SYSTEM
// ======================
function setupNavigation() {
  DOM.navItems.forEach((item, index) => {
    // Click event handler
    item.addEventListener('click', function(e) {
      if (this.querySelector('a')?.href === '#') {
        e.preventDefault();
      }
      setActiveTab(index);
    });

    // Keyboard accessibility
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}

function setActiveTab(index) {
  // Update visual state
  DOM.navItems.forEach(item => item.classList.remove('active'));
  DOM.navItems[index].classList.add('active');
  state.currentTab = index;

  // Update indicator position
  updateIndicatorPosition(index);
}

function updateIndicatorPosition(index) {
  const item = DOM.navItems[index];
  if (!item) return;

  const itemRect = item.getBoundingClientRect();
  const containerRect = item.parentElement.getBoundingClientRect();
  const position = itemRect.left - containerRect.left + (itemRect.width / 2) - (DOM.navIndicator.offsetWidth / 2);
  
  DOM.navIndicator.style.transform = `translateX(${position}px)`;
}

// ======================
// MODAL SYSTEM
// ======================
function setupModal() {
  if (!DOM.modal) return;

  // Open modal
  DOM.modalTrigger?.addEventListener('click', openModal);
  
  // Close modal
  DOM.modalClose?.addEventListener('click', closeModal);
  
  // Close when clicking outside
  DOM.modal?.addEventListener('click', (e) => {
    if (e.target === DOM.modal) closeModal();
  });
  
  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isModalOpen) {
      closeModal();
    }
  });
}

function openModal() {
  DOM.modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  state.isModalOpen = true;
  DOM.modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  DOM.modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  state.isModalOpen = false;
  DOM.modal.setAttribute('aria-hidden', 'true');
}

// ======================
// CONTENT LOADING SYSTEM
// ======================
function loadContent() {
  if (!DOM.container) return;

  // Simulate content loading
  setTimeout(() => {
    const contentData = [
      {
        title: 'Win 1 Min',
        descriptions: ['Neural Network Analysis', 'Advanced Prediction'],
        image: 'https://bharatimagess.com/Bharat/lotterycategory/lotterycategory_20240402150224lq5t.png',
        link: 'Wingo1.php',
        color: 'emerald'
      },
      // ... other content items
    ];

    DOM.container.innerHTML = contentData.map(item => generateContentBox(item)).join('');
    animateContentLoad();
    state.contentLoaded = true;
  }, 3000);
}

function generateContentBox({ title, descriptions, image, link, color }) {
  return `
    <a href="${link}" class="content-box group" aria-label="${title}">
      <div class="gradient-border p-1 rounded-xl transition-all duration-300 hover:scale-[1.02]">
        <div class="bg-slate-900 p-6 rounded-xl flex items-start gap-6 relative overflow-hidden">
          <div class="p-1 bg-${color}-500 rounded-xl flex-shrink-0">
            <img src="${image}" alt="${title}" class="w-20 h-20 object-contain drop-shadow-lg" loading="lazy">
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-2 bg-gradient-to-r from-${color}-500 to-cyan-400 bg-clip-text text-transparent">
              ${title}
            </h2>
            <div class="space-y-2">
              ${descriptions.map(desc => `
                <p class="text-sm text-slate-400 flex items-center">
                  <span class="w-2 h-2 bg-${color}-500 rounded-full mr-2"></span>
                  ${desc}
                </p>
              `).join('')}
            </div>
          </div>
          <div class="absolute right-6 bottom-6">
            <button class="bg-${color}-500 p-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg" aria-label="Go to ${title}">
              <i class="fas fa-arrow-right text-white"></i>
            </button>
          </div>
        </div>
      </div>
    </a>
  `;
}

function animateContentLoad() {
  const boxes = document.querySelectorAll('.content-box');
  boxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    box.style.transition = `all 0.5s ease ${index * 0.1}s`;
    
    setTimeout(() => {
      box.style.opacity = '1';
      box.style.transform = 'translateY(0)';
    }, 100);
  });
}

// ======================
// GAME LAUNCHER SYSTEM
// ======================
function setupGameLaunchers() {
  DOM.gameButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.hasAttribute('onclick')) return;
      
      e.preventDefault();
      this.classList.add('active');
      setTimeout(() => this.classList.remove('active'), 300);
    });
  });
}

function launchGame(url) {
  if (!url) {
    console.error('No URL provided for game launch');
    return;
  }

  try {
    const gameWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!gameWindow) {
      showAlert('Popup blocked! Please allow popups for this site.');
    }
  } catch (error) {
    console.error('Error launching game:', error);
    showAlert('Failed to launch game. Please try again.');
  }
}

// Specific game launchers
function launch82Lottery() { launchGame('1 MIN/82 lottery.html'); }
function launchTashanWin() { launchGame('1 MIN/Tashan win.html'); }
// ... other game launchers

// ======================
// UTILITY FUNCTIONS
// ======================
function setInitialActiveTab() {
  if (DOM.navItems.length > 0) {
    setActiveTab(0);
  }
}

function setupAccessibility() {
  // Add aria-labels where needed
  document.querySelectorAll('[aria-label]').forEach(el => {
    if (!el.getAttribute('aria-label')) {
      el.setAttribute('aria-label', el.textContent.trim());
    }
  });
}

function showAlert(message) {
  const alert = document.createElement('div');
  alert.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg';
  alert.textContent = message;
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

// ======================
// INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', () => {
  // Check if required elements exist
  if (!document.querySelector('.nav-item')) {
    console.error('Navigation system not found!');
    return;
  }
  
  init();
  
  // Add loaded class when ready
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// Make game launchers available globally
window.launchGame = launchGame;
window.launch82Lottery = launch82Lottery;
window.launchTashanWin = launchTashanWin;
// ... other global exports
