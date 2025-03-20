import { EXAM_DATE, START_DATE, MESSAGES, TIMER_SETTINGS, DEFAULT_SUBJECTS, UI_SETTINGS } from './config.js';
import { initNotifications, checkNotificationPermission } from './notifications.js';

// DOM 元素
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const messageElement = document.getElementById('message');
const progressBarElement = document.getElementById('progress-bar');
const progressPercentageElement = document.getElementById('progress-percentage');
const floatingShapesElement = document.getElementById('floating-shapes');
const copyrightYearElement = document.getElementById('copyright-year');
const menuToggle = document.getElementById('menu-toggle');
const siteHeader = document.getElementById('site-header');
const menuOverlay = document.getElementById('menu-overlay');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// 模態窗口相關元素
const timerModal = document.getElementById('timer-modal');
const todoModal = document.getElementById('todo-modal');
const subjectModal = document.getElementById('subject-modal');
const notificationModal = document.getElementById('notification-modal');
const modalOverlay = document.getElementById('modal-overlay');
const timerBtn = document.getElementById('timer-btn');
const todoBtn = document.getElementById('todo-btn');
const subjectBtn = document.getElementById('subject-btn');
const notificationBtn = document.getElementById('notification-settings-btn');
const closeButtons = document.querySelectorAll('.close-modal');

// 更新版權年份
function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  copyrightYearElement.textContent = currentYear;
}

// 添加浮動形狀
function createFloatingShapes() {
  for (let i = 0; i < 15; i++) {
    const shape = document.createElement('div');
    shape.classList.add('shape');
    
    // 隨機大小, 位置和延遲
    const size = Math.random() * 80 + 20;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${Math.random() * 100 + 100}%`;
    shape.style.animationDelay = `${Math.random() * 15}s`;
    shape.style.animationDuration = `${Math.random() * 15 + 15}s`;
    
    floatingShapesElement.appendChild(shape);
  }
}

// 添加粒子效果
function createParticles() {
  const particlesContainer = document.getElementById('floating-shapes');
  const numberOfParticles = 100;
  
  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const opacity = Math.random() * 0.5 + 0.1;
    const animDuration = Math.random() * 20 + 10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.opacity = opacity;
    
    particlesContainer.appendChild(particle);
    
    animateParticle(particle);
  }
}

function animateParticle(particle) {
  const startPosX = parseFloat(particle.style.left);
  const startPosY = parseFloat(particle.style.top);
  const speed = Math.random() * 1 + 0.5;
  
  function update() {
    const time = Date.now() * 0.001;
    const newX = startPosX + Math.sin(time * speed) * 50;
    const newY = startPosY + Math.cos(time * speed) * 30;
    
    particle.style.left = `${newX}px`;
    particle.style.top = `${newY}px`;
    
    requestAnimationFrame(update);
  }
  
  update();
}

// 更新倒數計時器
function updateCountdown() {
  const currentTime = new Date();
  const timeDifference = EXAM_DATE - currentTime;
  
  // 如果已經過了考試日期
  if (timeDifference <= 0) {
    daysElement.textContent = '0';
    hoursElement.textContent = '0';
    minutesElement.textContent = '0';
    secondsElement.textContent = '0';
    messageElement.textContent = '統測已經結束！';
    progressBarElement.style.width = '100%';
    progressPercentageElement.textContent = '100%';
    return;
  }
  
  // 計算剩餘時間
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
  // 更新UI
  daysElement.textContent = days;
  hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
  minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
  
  // 計算進度百分比
  const totalPreparationTime = EXAM_DATE - START_DATE;
  const elapsedPreparationTime = currentTime - START_DATE;
  const progressPercentage = Math.min(100, Math.max(0, Math.floor((elapsedPreparationTime / totalPreparationTime) * 100)));
  
  progressBarElement.style.width = `${progressPercentage}%`;
  progressPercentageElement.textContent = `${progressPercentage}%`;
  
  // 顯示隨機鼓勵訊息
  if (!messageElement.textContent) {
    updateMotivationalMessage();
  }
}

// 更新鼓勵訊息
function updateMotivationalMessage() {
  messageElement.style.opacity = '0';
  
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    messageElement.textContent = MESSAGES[randomIndex];
    messageElement.style.opacity = '1';
  }, 500);
}

// 菜單切換
function toggleMenu() {
  menuToggle.classList.toggle('open');
  siteHeader.classList.toggle('open');
  menuOverlay.classList.toggle('open');
  document.body.classList.toggle('menu-open');
}

// 初始化菜單
function initMenu() {
  menuToggle.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);
  
  // 點擊連結後關閉菜單
  document.querySelectorAll('#site-header a').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });
}

// 每30秒更換一次鼓勵訊息
setInterval(updateMotivationalMessage, 30000);

// 每秒更新一次倒數計時
setInterval(updateCountdown, 1000);

// 頁面載入時立即更新
updateCountdown();
createFloatingShapes();
createParticles();
updateCopyrightYear();
initMenu();
checkNotificationPermission();

// 添加倒數數字動畫效果
document.querySelectorAll('.countdown-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-10px) scale(1.05)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(-5px)';
  });
});

// 添加消息淡入淡出效果
messageElement.style.transition = 'opacity 0.5s ease';

// 深色模式切換
function initDarkMode() {
  // 檢查本地存儲
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
  
  darkModeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
}

// ----- 計時器功能 -----
let timerInterval;
let timerMinutes = TIMER_SETTINGS.pomodoro;
let timerSeconds = 0;
let timerRunning = false;

const timerMinutesElement = document.getElementById('timer-minutes');
const timerSecondsElement = document.getElementById('timer-seconds');
const startTimerButton = document.getElementById('start-timer');
const pauseTimerButton = document.getElementById('pause-timer');
const resetTimerButton = document.getElementById('reset-timer');
const pomodoroButton = document.getElementById('pomodoro-btn');
const shortBreakButton = document.getElementById('short-break-btn');
const longBreakButton = document.getElementById('long-break-btn');

function initTimer() {
  updateTimerDisplay();
  
  startTimerButton.addEventListener('click', startTimer);
  pauseTimerButton.addEventListener('click', pauseTimer);
  resetTimerButton.addEventListener('click', resetTimer);
  
  pomodoroButton.addEventListener('click', () => setTimerMode('pomodoro'));
  shortBreakButton.addEventListener('click', () => setTimerMode('shortBreak'));
  longBreakButton.addEventListener('click', () => setTimerMode('longBreak'));
}

function updateTimerDisplay() {
  timerMinutesElement.textContent = timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes;
  timerSecondsElement.textContent = timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds;
}

function startTimer() {
  if (timerRunning) return;
  
  timerRunning = true;
  startTimerButton.disabled = true;
  pauseTimerButton.disabled = false;
  
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
    } else if (timerMinutes > 0) {
      timerMinutes--;
      timerSeconds = 59;
    } else {
      // 計時器結束
      clearInterval(timerInterval);
      timerRunning = false;
      notifyTimerEnd();
      return;
    }
    
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  startTimerButton.disabled = false;
  pauseTimerButton.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  setTimerMode(document.querySelector('.mode-btn.active').id.replace('-btn', ''));
  startTimerButton.disabled = false;
  pauseTimerButton.disabled = true;
}

function setTimerMode(mode) {
  // 重置所有按鈕樣式
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  
  // 設置新的計時器模式
  switch (mode) {
    case 'pomodoro':
      timerMinutes = TIMER_SETTINGS.pomodoro;
      pomodoroButton.classList.add('active');
      break;
    case 'shortBreak':
      timerMinutes = TIMER_SETTINGS.shortBreak;
      shortBreakButton.classList.add('active');
      break;
    case 'longBreak':
      timerMinutes = TIMER_SETTINGS.longBreak;
      longBreakButton.classList.add('active');
      break;
  }
  
  timerSeconds = 0;
  updateTimerDisplay();
  
  // 如果計時器正在運行，則停止它
  if (timerRunning) {
    pauseTimer();
  }
}

function notifyTimerEnd() {
  // 如果瀏覽器支持通知
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification('計時器結束', {
        body: '休息一下或繼續下一個番茄鐘！',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="%23ffcc00"/></svg>'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('計時器結束', {
            body: '休息一下或繼續下一個番茄鐘！',
            icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="%23ffcc00"/></svg>'
          });
        }
      });
    }
  }
  
  // 播放音效
  const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLHPM7tiJNwgZXrfq4aFJEA1QqOjjt14dCkSc5OXLdSsGOI/h6dd8MwU2iuD1324hBj2S5fXTdSsJPJXk5bTskWq80eKnYCgPK2281vjtqW0lCjqR1uj2mVscDUSW0+P4w4AuDEONy9/n7q9pKA4VRrbZ+faXXBsbK3S92/zdkFsVChpKqN/4s2sgFiU2gtfzxapkLBMbM5nW6ed8VCMVJjqL0fPgqXAjExgtis/qj9n6v3gsExl2hs/0nN34nVsXFAIWgsrtntvzolwJDBkyfsTmxt/tvl8NDyUlbK3QxuDYgmEbCW0XUrTZztZNN2VxYRlViNffmUU6UFNRS2KOsph4XmD/sGYkFUhQh7OUbGJxalA5RHaMRU1sisSEWEqmmH5rYYGQi25XUqK2mHKFc4OIgmZee6ewfGJ5mIt6a2mAlYlweHiJioFycG97jId7dnR9kJOEcGx1iZOIbWBpeoJ6bXJ1d4aHfHh0eYOEf3l3dn2CgXt3dHp/gIB6dnV4foB/eXZ1eX9/fHh2dn6AfXh2d3l+f316eXh8f4B8enh5fH5+e3p4e31+fnx8e3x9fn58fHx8fX5+fHx7fH1+fn18e3x9fn5+fXx8fX1+fn19fH19fn5+fX19fX1+fn58LTA0OWyHmH1IHjxcf5uRTBsuT3SOjFwVKkt0kpBNFyxPcH+JhXBfbnqCf3ToW+tcN2lthxDTj4whIY2CGidTdkguXp5nvVdphUk0cZFxtlZyiDcpZId1pkx3kz0mYYZ5oUV5k0AkQlJ1jFJJfyUbMFJ6e00jN5E+HDFXjnt3Mk2BQhskPW2Hg4BuPUVaTkRQgH9xd3dQRFJPfIB6c3yBS0xLTHd4enZ/fVVMDEQqZJyESkqpbRxDj5ewl1AdRHZpYnGbXSJalZlWG0ipi4csIIiidhlZoYt9Y1x6p6qXYkd8g3p3gYd1bBE4cZtwb3aDgnBpCzFvlmJwf46Hd2sgVZyFa3ZveYWKf3UhR4KHY3R5cnd9gX11JUuFi3R2gHJxcG9+gHIRcZNrdH58dm8jQWx0eHFycIKFgXQdN3aOdGt0fYiBfXclV3+Demxue3p+fXgWRIF6aG94enF9gH0Tb5dye3CEd25pc4OBeBs+aHx8eHx+eXh2fH93FUt/enFucYB9dnR5f38aSX99c3R4Pnx69HR7fH4cSH16cXN1eHl6Nnh8fhs2fYBwY3N89W12fHt2G0p+fG9vcHHwcXp7fHchXX6Ab25vPnp4cXJ5fX0iQX+Bb2xveHx5n25zfH0hQH9+cHBwcvZ2eXt4dR5HfoJycHJzYHV8e3nvI0iIdnBvcHELdHl7en0aR3x9cnFzdRt1e3t4eR1JfXtvbnB1Cnd7e3p4HEd8e4BudXYHdXx7e30aRH19c3JzdxR2e3x3eCFKfHxycXN0CHh7e3h4I058fHNxcngHdnx7xngeSnv9cXFzdgV4e3sveCFMfH1zcXJ3AvZ7e754HUl7/XFwcncB+Ht7InoiTXt+c3FxeP/3e3sweSRNe/9zcHF5//d7eyx6FUp8/3NwcXn/93x7HHkfTXugcXByev/3PG8Ieh9Le/9yb3F6//d8ewp6Gk1, //iAPAGIgOwGQkBxQG4gMAGYkA2AGQBZQU4gBFAC4ABQUABYQhYCVkAA');
  audio.play();
}

// ----- 待辦事項功能 -----
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function initTodoList() {
  addTodoButton.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });
  
  renderTodos();
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === '') return;
  
  todos.push({
    id: Date.now().toString(),
    text: todoText,
    completed: false
  });
  
  saveTodos();
  todoInput.value = '';
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';
  
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    if (todo.completed) {
      todoItem.classList.add('completed');
    }
    
    todoItem.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-todo">×</button>
    `;
    
    const checkbox = todoItem.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    
    const deleteButton = todoItem.querySelector('.delete-todo');
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));
    
    todoList.appendChild(todoItem);
  });
}

// ----- 科目進度追蹤 -----
const subjectList = document.getElementById('subject-list');
const subjectInput = document.getElementById('subject-input');
const addSubjectButton = document.getElementById('add-subject');

let subjects = JSON.parse(localStorage.getItem('subjects')) || DEFAULT_SUBJECTS;

function initSubjectProgress() {
  addSubjectButton.addEventListener('click', addSubject);
  subjectInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      addSubject();
    }
  });
  
  renderSubjects();
}

function addSubject() {
  const subjectName = subjectInput.value.trim();
  if (subjectName === '') return;
  
  subjects.push({
    name: subjectName,
    progress: 0
  });
  
  saveSubjects();
  subjectInput.value = '';
  renderSubjects();
}

function deleteSubject(index) {
  subjects.splice(index, 1);
  saveSubjects();
  renderSubjects();
}

function updateSubjectProgress(index, change) {
  const newProgress = Math.max(0, Math.min(100, subjects[index].progress + change));
  subjects[index].progress = newProgress;
  saveSubjects();
  renderSubjects();
}

function saveSubjects() {
  localStorage.setItem('subjects', JSON.stringify(subjects));
}

function renderSubjects() {
  subjectList.innerHTML = '';
  
  subjects.forEach((subject, index) => {
    const subjectItem = document.createElement('div');
    subjectItem.classList.add('subject-item');
    
    subjectItem.innerHTML = `
      <div class="subject-name">
        <span>${subject.name}</span>
        <span>${subject.progress}%</span>
      </div>
      <div class="subject-progress-container">
        <div class="subject-progress-bar" style="width: ${subject.progress}%"></div>
      </div>
      <div class="subject-actions">
        <button class="subject-btn decrease">-5%</button>
        <button class="subject-btn increase">+5%</button>
        <button class="subject-btn increase-large">+10%</button>
        <button class="subject-btn delete">刪除</button>
      </div>
    `;
    
    const decreaseBtn = subjectItem.querySelector('.decrease');
    decreaseBtn.addEventListener('click', () => updateSubjectProgress(index, -5));
    
    const increaseBtn = subjectItem.querySelector('.increase');
    increaseBtn.addEventListener('click', () => updateSubjectProgress(index, 5));
    
    const increaseLargeBtn = subjectItem.querySelector('.increase-large');
    increaseLargeBtn.addEventListener('click', () => updateSubjectProgress(index, 10));
    
    const deleteBtn = subjectItem.querySelector('.delete');
    deleteBtn.addEventListener('click', () => deleteSubject(index));
    
    subjectList.appendChild(subjectItem);
  });
}

// 模態窗口控制
function initModals() {
  // Apply custom modal styling from config
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.backgroundColor = `rgba(48, 43, 99, ${UI_SETTINGS.modalOpacity})`;
  });
  
  // 打開模態窗口
  timerBtn.addEventListener('click', () => {
    openModal(timerModal);
  });
  
  todoBtn.addEventListener('click', () => {
    openModal(todoModal);
  });
  
  subjectBtn.addEventListener('click', () => {
    openModal(subjectModal);
  });
  
  notificationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(notificationModal);
  });
  
  // 關閉模態窗口
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      closeAllModals();
    });
  });
  
  modalOverlay.addEventListener('click', () => {
    closeAllModals();
  });
  
  // 按Esc鍵關閉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function openModal(modal) {
  closeAllModals(); // 確保其他模態窗口已關閉
  modalOverlay.classList.add('active');
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.remove('active');
  });
  modalOverlay.classList.remove('active');
  document.body.classList.remove('modal-open');
}

// 初始化所有功能
initDarkMode();
initTimer();
initTodoList();
initSubjectProgress();
initModals();
initNotifications();

// 每秒更新一次倒數計時
setInterval(updateCountdown, 1000);

updateCountdown();
createFloatingShapes();
createParticles();
updateCopyrightYear();
initMenu();
checkNotificationPermission();