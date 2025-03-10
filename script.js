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

// Notification functionality
class NotificationManager {
  constructor() {
    this.button = document.getElementById('notification-btn');
    this.statusText = document.querySelector('.notification-status');
    this.isEnabled = false;
    this.init();
  }

  init() {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      this.updateStatus('您的瀏覽器不支援通知功能');
      this.button.disabled = true;
      return;
    }

    // Check if notifications are already enabled
    if (Notification.permission === 'granted') {
      this.isEnabled = localStorage.getItem('notificationsEnabled') === 'true';
      this.updateButtonState();
    }

    this.button.addEventListener('click', () => this.toggleNotifications());
  }

  async toggleNotifications() {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        this.updateStatus('通知權限已被拒絕');
        return;
      }
    }

    this.isEnabled = !this.isEnabled;
    localStorage.setItem('notificationsEnabled', this.isEnabled);
    this.updateButtonState();

    if (this.isEnabled) {
      this.scheduleNotification();
      this.updateStatus('每日通知已開啟');
    } else {
      this.updateStatus('通知已關閉');
    }
  }

  updateButtonState() {
    this.button.textContent = this.isEnabled ? '關閉每日通知' : '開啟每日通知';
    this.button.classList.toggle('enabled', this.isEnabled);
  }

  updateStatus(message) {
    this.statusText.textContent = message;
  }

  scheduleNotification() {
    if (!this.isEnabled) return;

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // 設定為每天早上9點

    const timeUntilNotification = tomorrow - now;

    setTimeout(() => {
      this.showNotification();
      this.scheduleNotification(); // 設定下一天的通知
    }, timeUntilNotification);
  }

  showNotification() {
    if (!this.isEnabled) return;

    const targetDate = new Date(2025, 3, 26);
    const now = new Date();
    const daysLeft = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));

    new Notification('統測倒數提醒', {
      body: `距離2025年統測還有 ${daysLeft} 天！加油！`,
      icon: 'data:image/svg+xml;base64,' + btoa(`
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="#1e3c72"/>
          <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="white"/>
          <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="white"/>
        </svg>
      `)
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createFloatingShapes();
  updateCountdown();
  updateCopyright();
  initializeAnimations();
  addSparkleEffect();
  new NotificationManager();
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