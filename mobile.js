// Mobile-specific functionality
import { EXAM_DATE, START_DATE } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileDetection();
  addTouchSwipeSupport();
  adjustForMobileKeyboard();
  optimizeFloatingEffectsForMobile();
});

// Detect if user is on mobile device and adjust UI accordingly
function initMobileDetection() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Adjust floating shapes count for better performance
    const floatingShapes = document.querySelectorAll('.shape');
    if (floatingShapes.length > 8) {
      for (let i = 8; i < floatingShapes.length; i++) {
        if (floatingShapes[i]) {
          floatingShapes[i].remove();
        }
      }
    }
    
    // Adjust particles for mobile
    const particles = document.querySelectorAll('.particle');
    if (particles.length > 40) {
      for (let i = 40; i < particles.length; i++) {
        if (particles[i]) {
          particles[i].remove();
        }
      }
    }
    
    // Add class to body for mobile-specific styles
    document.body.classList.add('mobile-view');
  }
  
  // Handle orientation changes
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      updateCountdownItemsSize();
      repositionMenuToggle();
    }, 300);
  });
}

// Dynamically adjust countdown items size based on screen width
function updateCountdownItemsSize() {
  const countdownContainer = document.querySelector('.countdown-container');
  const countdownItems = document.querySelectorAll('.countdown-item');
  
  if (window.innerWidth <= 400) {
    countdownContainer.style.gap = '5px';
    countdownItems.forEach(item => {
      item.style.minWidth = '60px';
      item.style.padding = '0.6rem';
    });
  }
}

// Reposition menu toggle button when keyboard opens
function repositionMenuToggle() {
  const menuToggle = document.getElementById('menu-toggle');
  const viewportHeight = window.innerHeight;
  
  if (viewportHeight < 500) {
    menuToggle.style.top = '5px';
    menuToggle.style.right = '5px';
  } else {
    menuToggle.style.top = '20px';
    menuToggle.style.right = '20px';
  }
}

// Add touch swipe support for closing modals and menus
function addTouchSwipeSupport() {
  let startX, startY;
  
  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, false);
  
  document.addEventListener('touchend', (e) => {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // If horizontal swipe is greater than vertical and significant enough
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      // Right to left swipe
      if (diffX > 0) {
        // Check if the menu is open
        const siteHeader = document.getElementById('site-header');
        if (siteHeader.classList.contains('open')) {
          // Find and trigger menu toggle click
          const menuToggle = document.getElementById('menu-toggle');
          if (menuToggle) menuToggle.click();
        }
      }
      
      // Left to right swipe (near right edge of screen)
      if (diffX < 0 && startX > window.innerWidth * 0.8) {
        // If menu is closed, open it
        const siteHeader = document.getElementById('site-header');
        if (!siteHeader.classList.contains('open')) {
          const menuToggle = document.getElementById('menu-toggle');
          if (menuToggle) menuToggle.click();
        }
      }
    }
    
    // Handle swipe down on top of modal to close it
    if (diffY < -50 && startY < window.innerHeight * 0.3) {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        const closeButton = activeModal.querySelector('.close-modal');
        if (closeButton) closeButton.click();
      }
    }
    
    startX = null;
    startY = null;
  }, false);
}

// Adjust keyboard behavior for mobile inputs
function adjustForMobileKeyboard() {
  const inputs = document.querySelectorAll('input[type="text"]');
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      // Slight delay to make sure the keyboard is fully opened
      setTimeout(() => {
        // Scroll the input into view
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // If in a modal, adjust the modal position
        const modal = input.closest('.modal');
        if (modal) {
          modal.style.top = '40%';
        }
      }, 300);
    });
    
    input.addEventListener('blur', () => {
      // Reset modal position
      const modal = input.closest('.modal');
      if (modal) {
        modal.style.top = '50%';
      }
    });
  });
}

// Optimize animations and visual effects for mobile devices
function optimizeFloatingEffectsForMobile() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Reduce animation complexity for better performance
    document.querySelectorAll('.shape, .particle').forEach(el => {
      // Slow down animations to improve performance
      const currentDuration = parseFloat(el.style.animationDuration || '15s');
      el.style.animationDuration = `${currentDuration * 1.5}s`;
    });
  }
}

// Update progress bar with smooth animation for better visual on mobile
export function updateMobileProgressBar() {
  const currentTime = new Date();
  const timeDifference = EXAM_DATE - currentTime;
  
  // Calculate progress percentage
  const totalPreparationTime = EXAM_DATE - START_DATE;
  const elapsedPreparationTime = currentTime - START_DATE;
  const progressPercentage = Math.min(100, Math.max(0, Math.floor((elapsedPreparationTime / totalPreparationTime) * 100)));
  
  // Get the progress bar element
  const progressBar = document.getElementById('progress-bar');
  
  // Apply a smoother transition for mobile
  progressBar.style.transition = 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
  
  // Update progress bar with a slight delay for better visual effect
  setTimeout(() => {
    progressBar.style.width = `${progressPercentage}%`;
  }, 300);
}