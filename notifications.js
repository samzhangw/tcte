// Notifications functionality
import { EXAM_DATE } from './config.js';

let notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
const NOTIFICATION_TIME = "09:00"; // Default notification time (9 AM)

export function initNotifications() {
  const notifyToggle = document.getElementById('notification-toggle');
  const notifyTimeInput = document.getElementById('notification-time');
  const notifyPermissionBtn = document.getElementById('request-permission-btn');
  const notifyStatus = document.getElementById('notification-status');

  // Initialize UI based on stored preferences
  if (notifyTimeInput) {
    notifyTimeInput.value = localStorage.getItem('notificationTime') || NOTIFICATION_TIME;
  }
  
  if (notifyToggle) {
    notifyToggle.checked = notificationsEnabled;
    updateNotificationStatus();
  }

  // Event listeners
  if (notifyToggle) {
    notifyToggle.addEventListener('change', toggleNotifications);
  }
  
  if (notifyTimeInput) {
    notifyTimeInput.addEventListener('change', (e) => {
      localStorage.setItem('notificationTime', e.target.value);
    });
  }
  
  if (notifyPermissionBtn) {
    notifyPermissionBtn.addEventListener('click', requestNotificationPermission);
  }
  
  // Check if we need to schedule notifications
  if (notificationsEnabled && Notification.permission === 'granted') {
    scheduleNotification();
  }
}

function toggleNotifications(e) {
  notificationsEnabled = e.target.checked;
  localStorage.setItem('notificationsEnabled', notificationsEnabled);
  
  if (notificationsEnabled && Notification.permission !== 'granted') {
    requestNotificationPermission();
  } else if (notificationsEnabled && Notification.permission === 'granted') {
    scheduleNotification();
  }
  
  updateNotificationStatus();
}

function updateNotificationStatus() {
  const notifyStatus = document.getElementById('notification-status');
  if (!notifyStatus) return;
  
  if (notificationsEnabled) {
    if (Notification.permission === 'granted') {
      notifyStatus.textContent = '通知已開啟';
      notifyStatus.className = 'status-enabled';
    } else {
      notifyStatus.textContent = '需要授權通知權限';
      notifyStatus.className = 'status-warning';
    }
  } else {
    notifyStatus.textContent = '通知已關閉';
    notifyStatus.className = 'status-disabled';
  }
}

export function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('您的瀏覽器不支援通知功能');
    return;
  }
  
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      // Send a test notification
      new Notification('統測倒數通知已開啟', {
        body: '您將每天收到統測倒數通知',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="%23ffcc00"/></svg>'
      });
      
      if (notificationsEnabled) {
        scheduleNotification();
      }
    }
    updateNotificationStatus();
  });
}

function scheduleNotification() {
  // Clear any existing notification timer
  if (window.notificationTimer) {
    clearTimeout(window.notificationTimer);
  }
  
  // Get the notification time
  const timeString = localStorage.getItem('notificationTime') || NOTIFICATION_TIME;
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Calculate when to send the notification
  const now = new Date();
  const notificationTime = new Date(now);
  notificationTime.setHours(hours, minutes, 0, 0);
  
  // If the time has already passed today, schedule for tomorrow
  if (notificationTime <= now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }
  
  // Calculate the delay until the notification time
  const delay = notificationTime.getTime() - now.getTime();
  
  // Schedule the notification
  window.notificationTimer = setTimeout(() => {
    sendDailyNotification();
  }, delay);
}

function sendDailyNotification() {
  if (!notificationsEnabled || Notification.permission !== 'granted') {
    return;
  }
  
  // Calculate days remaining
  const now = new Date();
  const timeDifference = EXAM_DATE - now;
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
  // Send the notification
  if (daysRemaining > 0) {
    new Notification('統測倒數', {
      body: `還剩 ${daysRemaining} 天！加油！`,
      icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="%23ffcc00"/></svg>'
    });
  }
  
  // Schedule the next notification for tomorrow
  scheduleNotification();
}

// Check for notification permission on page load
export function checkNotificationPermission() {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      updateNotificationStatus();
      if (notificationsEnabled) {
        scheduleNotification();
      }
    } else if (Notification.permission !== 'denied') {
      // We need explicit user action to request permission
      document.getElementById('notification-permission-info').style.display = 'block';
    }
  } else {
    // Browser doesn't support notifications
    const notifySection = document.getElementById('notification-section');
    if (notifySection) {
      notifySection.innerHTML = '<p>您的瀏覽器不支援通知功能</p>';
    }
  }
}