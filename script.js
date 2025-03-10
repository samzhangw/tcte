// 創建浮動形狀
function createFloatingShapes() {
  const shapes = document.querySelector('.floating-shapes');
  const shapeCount = 15;
  const shapeTypes = [
    `<circle r="5" fill="white"/>`,
    `<rect width="10" height="10" fill="white"/>`,
    `<polygon points="0,0 10,0 5,10" fill="white"/>`,
    `<rect width="8" height="8" transform="rotate(45)" fill="white"/>`
  ];

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    shape.setAttribute('class', 'shape');
    shape.setAttribute('viewBox', '0 0 10 10');
    shape.setAttribute('width', '20');
    shape.setAttribute('height', '20');
    
    // Random position
    shape.style.left = Math.random() * 100 + 'vw';
    shape.style.top = Math.random() * 100 + 'vh';
    
    // Random shape
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    shape.innerHTML = shapeType;
    
    shapes.appendChild(shape);
  }
}

function updateCountdown() {
  // 設定目標日期：民國114年4月26日
  const targetDate = new Date(2025, 3, 26, 0, 0, 0); // 月份是0-based，所以4月是3
  const now = new Date();
  
  const diff = targetDate - now;
  
  if (diff <= 0) {
    document.querySelector('.countdown').innerHTML = '<h2>考試已開始！</h2>';
    return;
  }
  
  // 計算天數、小時、分鐘和秒數
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  // 更新顯示
  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function updateCopyright() {
  const currentYear = new Date().getFullYear();
  document.getElementById('copyright-year').textContent = currentYear;
}

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuBtn = document.querySelector('.menu-btn');
  
  navLinks.classList.toggle('active');
  menuBtn.classList.toggle('active');
}

// Enhancement: Add smooth appear animation for time blocks
function initializeAnimations() {
  const timeBlocks = document.querySelectorAll('.time-block');
  timeBlocks.forEach((block, index) => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(20px)';
    setTimeout(() => {
      block.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      block.style.opacity = '1';
      block.style.transform = 'translateY(0)';
    }, 100 * index);
  });
  
  // Add staggered animation to container elements
  const animatedElements = document.querySelectorAll('.date-info, .reminder, .notification-section');
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    setTimeout(() => {
      element.style.transition = 'all 0.5s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 500 + (100 * index));
  });
  
  // Add title animation
  const title = document.querySelector('h1');
  title.style.opacity = '0';
  title.style.transform = 'scale(0.9)';
  setTimeout(() => {
    title.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    title.style.opacity = '1';
    title.style.transform = 'scale(1)';
  }, 200);
}

// Enhancement: Add sparkle effect to shapes
function addSparkleEffect() {
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach(shape => {
    setInterval(() => {
      shape.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))';
      setTimeout(() => {
        shape.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))';
      }, 200);
    }, Math.random() * 5000 + 3000);
  });
  
  // Add subtle hover effect to time-blocks
  const timeBlocks = document.querySelectorAll('.time-block');
  timeBlocks.forEach(block => {
    block.addEventListener('mouseover', () => {
      block.style.transform = 'translateY(-5px) rotateY(10deg)';
    });
    block.addEventListener('mouseout', () => {
      block.style.transform = 'translateY(0) rotateY(0)';
    });
  });
}

class OnPageNotificationManager {
  constructor() {
    this.button = document.getElementById('notification-btn');
    this.statusText = document.querySelector('.notification-status');
    this.isEnabled = false;
    this.testButton = document.getElementById('test-notification-btn');
    this.notificationContainer = null;
    this.createNotificationContainer();
    this.init();
    this.serviceWorkerRegistration = null;
  }

  createNotificationContainer() {
    // Create container if it doesn't exist
    if (!document.querySelector('.on-page-notification')) {
      this.notificationContainer = document.createElement('div');
      this.notificationContainer.className = 'on-page-notification';
      document.body.appendChild(this.notificationContainer);
    } else {
      this.notificationContainer = document.querySelector('.on-page-notification');
    }
  }

  init() {
    // Check if notifications are already enabled from localStorage
    this.isEnabled = localStorage.getItem('notificationsEnabled') === 'true';
    this.updateButtonState();

    this.button.addEventListener('click', () => this.toggleNotifications());
    this.testButton.addEventListener('click', () => this.sendTestNotification());
    
    // Check if it's time to show the daily notification
    if (this.isEnabled) {
      this.checkDailyNotification();
    }
    
    // Initialize service worker for push notifications
    this.initializeServiceWorker();
  }

  async initializeServiceWorker() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    } else {
      console.warn('Push notifications not supported by the browser');
      this.statusText.textContent = '您的瀏覽器不支援推送通知';
    }
  }

  async toggleNotifications() {
    if (!this.isEnabled) {
      // Request notification permission
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          this.statusText.textContent = '需要開啟通知權限才能收到提醒';
          return;
        }
        
        // Subscribe to push notifications
        if (this.serviceWorkerRegistration) {
          try {
            const applicationServerKey = this.urlB64ToUint8Array('BNbxGYNMhEIi9zrw5qiavYItzBxqns2CK-D-KIh0aqc4omKn0BnJ_Jul6or4a5iRqgBL3_q33TJCZdDXe6Tsnl4');
            const subscription = await this.serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: applicationServerKey
            });
            
            console.log('User is subscribed:', subscription);
            // Here you would send the subscription to your server
            // sendSubscriptionToServer(subscription);
          } catch (err) {
            console.error('Failed to subscribe user:', err);
            this.statusText.textContent = '訂閱推送通知失敗';
            return;
          }
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        this.statusText.textContent = '請求通知權限時發生錯誤';
        return;
      }
    } else {
      // Unsubscribe from push notifications
      if (this.serviceWorkerRegistration) {
        const subscription = await this.serviceWorkerRegistration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
          // Here you would remove the subscription from your server
          // removeSubscriptionFromServer(subscription);
        }
      }
    }
    
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('notificationsEnabled', this.isEnabled);
    this.updateButtonState();

    if (this.isEnabled) {
      // Show a notification immediately when enabled
      this.showNotification();
      // Store the last notification date
      localStorage.setItem('lastNotificationDate', new Date().toDateString());
      this.updateStatus('每日通知已開啟');
    } else {
      this.updateStatus('通知已關閉');
    }
  }

  // Helper function to convert base64 to Uint8Array for VAPID key
  urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
  updateButtonState() {
    this.button.textContent = this.isEnabled ? '關閉每日通知' : '開啟每日通知';
    this.button.classList.toggle('enabled', this.isEnabled);
  }

  updateStatus(message) {
    this.statusText.textContent = message;
  }

  checkDailyNotification() {
    if (!this.isEnabled) return;
    
    const lastNotificationDate = localStorage.getItem('lastNotificationDate');
    const today = new Date().toDateString();
    
    // If we haven't shown a notification today, show one
    if (lastNotificationDate !== today) {
      this.showNotification();
      localStorage.setItem('lastNotificationDate', today);
    }
    
    // Schedule next check - check every hour if notification needs to be shown
    setTimeout(() => this.checkDailyNotification(), 60 * 60 * 1000);
  }

  showNotification() {
    if (!this.isEnabled) return;

    const targetDate = new Date(2025, 3, 26);
    const now = new Date();
    const diffTime = Math.abs(targetDate - now);
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Get hours of study per day recommendation
    const hoursPerDay = Math.min(8, Math.max(2, Math.round(300 / daysLeft)));
    
    const title = '統測倒數提醒';
    const message = `距離2025年統測還有 ${daysLeft} 天！建議每日至少讀書 ${hoursPerDay} 小時，加油！`;
    
    this.displayOnPageNotification(title, message);
    
    // Also send a push notification if enabled
    if (this.isEnabled && 'serviceWorker' in navigator) {
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, {
            body: message,
            icon: '/favicon.ico'
          });
        });
      }
    }
  }

  sendTestNotification() {
    const targetDate = new Date(2025, 3, 26);
    const now = new Date();
    const diffTime = Math.abs(targetDate - now);
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    this.displayOnPageNotification(
      '測試通知', 
      `這是一則測試通知，距離2025年統測還有 ${daysLeft} 天！`
    );
    
    // Also send a push notification if enabled
    if (this.isEnabled && 'serviceWorker' in navigator) {
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('測試通知', {
            body: `這是一則測試通知，距離2025年統測還有 ${daysLeft} 天！`,
            icon: '/favicon.ico'
          });
        });
      }
    }
    
    this.updateStatus('測試通知已發送！');
    setTimeout(() => {
      if (this.isEnabled) {
        this.updateStatus('每日通知已開啟');
      } else {
        this.updateStatus('');
      }
    }, 3000);
  }

  displayOnPageNotification(title, message) {
    // Clear any existing notification
    this.notificationContainer.classList.remove('show');
    
    // Set up the new notification
    const closeButton = document.createElement('button');
    closeButton.className = 'on-page-notification-close';
    closeButton.innerHTML = '×';
    closeButton.addEventListener('click', () => {
      this.notificationContainer.classList.remove('show');
    });
    
    const titleElement = document.createElement('div');
    titleElement.className = 'on-page-notification-title';
    titleElement.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#1e3c72"/>
      </svg>
      ${title}
    `;
    
    const bodyElement = document.createElement('div');
    bodyElement.className = 'on-page-notification-body';
    bodyElement.textContent = message;
    
    // Clear and add new content
    this.notificationContainer.innerHTML = '';
    this.notificationContainer.appendChild(closeButton);
    this.notificationContainer.appendChild(titleElement);
    this.notificationContainer.appendChild(bodyElement);
    
    // Show and auto-hide after 10 seconds
    setTimeout(() => {
      this.notificationContainer.classList.add('show');
    }, 100);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      this.notificationContainer.classList.remove('show');
    }, 10000);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createFloatingShapes();
  updateCountdown();
  updateCopyright();
  initializeAnimations();
  addSparkleEffect();
  new OnPageNotificationManager();
});

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add menu button click event listener
document.querySelector('.menu-btn').addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const navLinks = document.querySelector('.nav-links');
  const menuBtn = document.querySelector('.menu-btn');
  
  if (!e.target.closest('.nav-links') && 
      !e.target.closest('.menu-btn') && 
      navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
  }
});