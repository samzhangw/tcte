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

// Initialize
createFloatingShapes();
updateCountdown();
updateCopyright();

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