import { EXAM_DATE } from './config.js';

// DOM elements
const wallpaperBtn = document.getElementById('wallpaper-btn');
const wallpaperModal = document.getElementById('wallpaper-modal');
const modalOverlay = document.getElementById('modal-overlay');
const wallpaperType = document.getElementById('wallpaper-type');
const wallpaperStyle = document.getElementById('wallpaper-style');
const countdownStyle = document.getElementById('countdown-style');
const customText = document.getElementById('custom-text');
const wallpaperPreview = document.getElementById('wallpaper-preview');
const generateBtn = document.getElementById('generate-wallpaper');
const downloadBtn = document.getElementById('download-wallpaper');

// Canvas for generating the downloadable image
let canvas;
let generatedImageURL = null;

// Initialize wallpaper functionality
document.addEventListener('DOMContentLoaded', () => {
  initWallpaperGenerator();
  
  // Reset any previously generated image when modal is opened
  wallpaperBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(wallpaperModal);
    updatePreview(); // Show initial preview
  });
  
  // Update preview when options change
  wallpaperType.addEventListener('change', updatePreview);
  wallpaperStyle.addEventListener('change', updatePreview);
  countdownStyle.addEventListener('change', updatePreview);
  customText.addEventListener('input', updatePreview);
  
  // Generate high-quality wallpaper
  generateBtn.addEventListener('click', generateWallpaper);
  
  // Download the generated wallpaper
  downloadBtn.addEventListener('click', downloadWallpaper);
});

function initWallpaperGenerator() {
  // Create a hidden canvas for generating the wallpaper
  canvas = document.createElement('canvas');
  canvas.style.display = 'none';
  document.body.appendChild(canvas);
  
  // Update wallpaper style options
  updateWallpaperStyleOptions();
}

// Add new function to update style options
function updateWallpaperStyleOptions() {
  // Clear existing options
  while (wallpaperStyle.options.length > 0) {
    wallpaperStyle.remove(0);
  }
  
  // Add enhanced style options
  const styles = [
    { value: 'gradient', text: '經典漸層' },
    { value: 'gradient1', text: '藍紫漸層' },
    { value: 'gradient2', text: '粉紅漸層' },
    { value: 'gradient3', text: '青綠漸層' },
    { value: 'minimal', text: '簡約黑' },
    { value: 'pattern1', text: '點點圖案' },
    { value: 'pattern2', text: '網格圖案' },
    { value: 'dark', text: '深色' },
    { value: 'light', text: '淺色' }
  ];
  
  styles.forEach(style => {
    const option = document.createElement('option');
    option.value = style.value;
    option.textContent = style.text;
    wallpaperStyle.appendChild(option);
  });
  
  // Update countdown style options
  while (countdownStyle.options.length > 0) {
    countdownStyle.remove(0);
  }
  
  const countdownStyles = [
    { value: 'large', text: '大數字' },
    { value: 'modern', text: '現代風' },
    { value: 'neon', text: '霓虹風' },
    { value: 'minimal', text: '簡約風' },
    { value: 'small', text: '小數字' },
    { value: 'circle', text: '基本圓形' },
    { value: 'circle-modern', text: '玻璃圓形' },
    { value: 'circle-accent', text: '強調圓形' }
  ];
  
  countdownStyles.forEach(style => {
    const option = document.createElement('option');
    option.value = style.value;
    option.textContent = style.text;
    countdownStyle.appendChild(option);
  });
}

function openModal(modal) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(m => m.classList.remove('active'));
  
  modalOverlay.classList.add('active');
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function updatePreview() {
  // Clear previous preview
  wallpaperPreview.innerHTML = '';
  
  // Apply wallpaper type (aspect ratio)
  if (wallpaperType.value === 'mobile') {
    wallpaperPreview.classList.add('preview-mobile');
  } else {
    wallpaperPreview.classList.remove('preview-mobile');
  }
  
  // Apply wallpaper style (background)
  applyWallpaperStyle();
  
  // Calculate days remaining
  const daysRemaining = calculateDaysRemaining();
  
  // Create countdown display based on selected style
  if (countdownStyle.value === 'circle') {
    createCircleCountdown(daysRemaining);
  } else {
    createStandardCountdown(daysRemaining);
  }
  
  // Add custom text if provided
  if (customText.value.trim()) {
    const textElement = document.createElement('div');
    textElement.className = 'preview-text';
    textElement.textContent = customText.value.trim();
    wallpaperPreview.appendChild(textElement);
  }
  
  // Reset download button
  downloadBtn.disabled = true;
  generatedImageURL = null;
}

function applyWallpaperStyle() {
  // Reset any previous classes
  wallpaperPreview.className = '';
  
  switch (wallpaperStyle.value) {
    case 'gradient1':
      wallpaperPreview.classList.add('wallpaper-style-gradient1');
      break;
    case 'gradient2':
      wallpaperPreview.classList.add('wallpaper-style-gradient2');
      break;
    case 'gradient3':
      wallpaperPreview.classList.add('wallpaper-style-gradient3');
      break;
    case 'pattern1':
      wallpaperPreview.classList.add('wallpaper-style-pattern1');
      break;
    case 'pattern2':
      wallpaperPreview.classList.add('wallpaper-style-pattern2');
      break;
    case 'minimal':
      wallpaperPreview.style.background = '#1a1a1a';
      break;
    case 'dark':
      wallpaperPreview.style.background = 'linear-gradient(to right, #000000, #434343)';
      break;
    case 'light':
      wallpaperPreview.style.background = 'linear-gradient(to right, #f5f7fa, #c3cfe2)';
      wallpaperPreview.style.color = '#333';
      break;
    case 'gradient':
    default:
      wallpaperPreview.style.background = 'linear-gradient(135deg, #24243e, #302b63, #0f0c29)';
      break;
  }
  
  // Add type class back if needed
  if (wallpaperType.value === 'mobile') {
    wallpaperPreview.classList.add('preview-mobile');
  }
}

function calculateDaysRemaining() {
  const currentTime = new Date();
  const timeDifference = EXAM_DATE - currentTime;
  
  // Calculate days remaining
  return Math.max(0, Math.ceil(timeDifference / (1000 * 60 * 60 * 24)));
}

function createStandardCountdown(daysRemaining) {
  const countdownElement = document.createElement('div');
  countdownElement.className = 'preview-countdown';
  
  // Apply specific countdown styles
  switch (countdownStyle.value) {
    case 'modern':
      countdownElement.classList.add('countdown-modern');
      break;
    case 'neon':
      countdownElement.classList.add('countdown-neon');
      break;
    case 'minimal':
      countdownElement.classList.add('countdown-minimal');
      break;
    case 'large':
      countdownElement.style.fontSize = '4rem';
      break;
    case 'small':
    default:
      countdownElement.style.fontSize = '2.5rem';
      break;
  }
  
  countdownElement.textContent = `${daysRemaining}天`;
  wallpaperPreview.appendChild(countdownElement);
  
  const dateElement = document.createElement('div');
  dateElement.className = 'preview-date';
  dateElement.textContent = '統測日期: 2025/4/26 - 2025/4/27';
  wallpaperPreview.appendChild(dateElement);
}

function createCircleCountdown(daysRemaining) {
  const circleElement = document.createElement('div');
  circleElement.className = 'countdown-circle';
  
  // Apply specific circle styles
  if (countdownStyle.value === 'circle-modern') {
    circleElement.classList.add('countdown-circle-modern');
  } else if (countdownStyle.value === 'circle-accent') {
    circleElement.classList.add('countdown-circle-accent');
  }
  
  const countdownElement = document.createElement('div');
  countdownElement.className = 'preview-countdown';
  countdownElement.textContent = daysRemaining;
  
  const dayLabel = document.createElement('div');
  dayLabel.className = 'preview-date';
  dayLabel.textContent = '天';
  
  circleElement.appendChild(countdownElement);
  circleElement.appendChild(dayLabel);
  wallpaperPreview.appendChild(circleElement);
  
  const dateElement = document.createElement('div');
  dateElement.className = 'preview-date';
  dateElement.style.marginTop = '15px';
  dateElement.textContent = '2025年統測倒數';
  wallpaperPreview.appendChild(dateElement);
}

function generateWallpaper() {
  // Set canvas dimensions based on wallpaper type
  const isMobile = wallpaperType.value === 'mobile';
  canvas.width = isMobile ? 1080 : 1920;  
  canvas.height = isMobile ? 1920 : 1080;
  
  const ctx = canvas.getContext('2d');
  
  // Draw background
  drawBackground(ctx, canvas.width, canvas.height);
  
  // Draw countdown
  const daysRemaining = calculateDaysRemaining();
  if (countdownStyle.value === 'circle') {
    drawCircleCountdown(ctx, daysRemaining, canvas.width, canvas.height);
  } else {
    drawStandardCountdown(ctx, daysRemaining, canvas.width, canvas.height);
  }
  
  // Convert canvas to image URL
  generatedImageURL = canvas.toDataURL('image/png');
  
  // Enable download button
  downloadBtn.disabled = false;
}

function drawBackground(ctx, width, height) {
  // Create gradient background based on selected style
  let gradient;
  let pattern;
  
  switch (wallpaperStyle.value) {
    case 'gradient1':
      gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#4e54c8');
      gradient.addColorStop(1, '#8f94fb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      break;
    case 'gradient2':
      gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f953c6');
      gradient.addColorStop(1, '#b91d73');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      break;
    case 'gradient3':
      gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#2c3e50');
      gradient.addColorStop(1, '#4ca1af');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      break;
    case 'pattern1':
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, width, height);
      
      // Draw dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      for (let x = 0; x < width; x += 20) {
        for (let y = 0; y < height; y += 20) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    case 'pattern2':
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 2;
      
      // Vertical lines
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      break;
    case 'minimal':
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, width, height);
      break;
    case 'dark':
      gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(1, '#434343');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      break;
    case 'light':
      gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f5f7fa');
      gradient.addColorStop(1, '#c3cfe2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      break;
    case 'gradient':
    default:
      gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#24243e');
      gradient.addColorStop(0.5, '#302b63');
      gradient.addColorStop(1, '#0f0c29');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      break;
  }
}

function drawStandardCountdown(ctx, daysRemaining, width, height) {
  const isLight = wallpaperStyle.value === 'light';
  const style = countdownStyle.value;
  
  // Draw countdown number with style
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  if (style === 'modern') {
    // Create gradient text
    const textGradient = ctx.createLinearGradient(width/2 - 150, height/2, width/2 + 150, height/2);
    textGradient.addColorStop(0, '#ffffff');
    textGradient.addColorStop(1, '#f0f0f0');
    ctx.fillStyle = textGradient;
    ctx.font = `bold 180px Roboto, Arial, sans-serif`;
  } else if (style === 'neon') {
    // Create neon glow effect
    ctx.shadowColor = '#0073e6';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 160px Roboto, Arial, sans-serif`;
  } else if (style === 'minimal') {
    ctx.fillStyle = isLight ? '#333333' : '#ffffff';
    ctx.font = `bold 150px Roboto, Arial, sans-serif`;
    
    // Draw underline
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 4;
  } else {
    // Default styles
    ctx.fillStyle = isLight ? '#333333' : '#ffffff';
    ctx.font = `bold ${style === 'large' ? 180 : 120}px Roboto, Arial, sans-serif`;
  }
  
  // Draw text
  ctx.fillText(`${daysRemaining}天`, width / 2, height / 2 - 50);
  
  // Draw underline for minimal style
  if (style === 'minimal') {
    ctx.beginPath();
    ctx.moveTo(width/2 - 150, height/2 + 20);
    ctx.lineTo(width/2 + 150, height/2 + 20);
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  }
  
  // Reset shadow for other styles
  ctx.shadowBlur = 0;
  
  // Draw date text
  ctx.fillStyle = isLight ? '#333333' : '#ffffff';
  ctx.font = '40px Noto Sans TC, sans-serif';
  ctx.fillText('統測日期: 2025/4/26 - 2025/4/27', width / 2, height / 2 + 70);
  
  // Draw custom text if provided
  if (customText.value.trim()) {
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 50px Noto Sans TC, sans-serif';
    ctx.fillText(customText.value.trim(), width / 2, height / 2 + 160);
  }
}

function drawCircleCountdown(ctx, daysRemaining, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.15;
  const style = countdownStyle.value;
  
  // Draw circle with style
  ctx.beginPath();
  ctx.arc(centerX, centerY - 30, radius, 0, Math.PI * 2);
  
  if (style === 'circle-modern') {
    // Create glass effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();
    
    // Add subtle gradient overlay
    const glassGradient = ctx.createRadialGradient(
      centerX, centerY - 50, 0,
      centerX, centerY - 30, radius
    );
    glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    glassGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glassGradient;
    ctx.fill();
  } else if (style === 'circle-accent') {
    // Create accent style with glow
    ctx.fillStyle = 'rgba(255, 204, 0, 0.15)';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 204, 0, 0.8)';
    ctx.stroke();
    
    // Add subtle glow
    ctx.shadowColor = 'rgba(255, 204, 0, 0.5)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.stroke();
    ctx.shadowBlur = 0;
  } else {
    // Default circle style
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(255, 204, 0, 0.8)';
    ctx.stroke();
  }
  
  // Draw countdown number
  ctx.font = `bold ${radius * 0.8}px Roboto, Arial, sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(daysRemaining, centerX, centerY - 50);
  
  // Draw "days" text
  ctx.font = `${radius * 0.3}px Noto Sans TC, sans-serif`;
  ctx.fillText('天', centerX, centerY + 20);
  
  // Draw date text
  ctx.font = '40px Noto Sans TC, sans-serif';
  ctx.fillText('2025年統測倒數', centerX, centerY + radius + 50);
  
  // Draw custom text if provided
  if (customText.value.trim()) {
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 50px Noto Sans TC, sans-serif';
    ctx.fillText(customText.value.trim(), centerX, centerY + radius + 130);
  }
}

function downloadWallpaper() {
  if (!generatedImageURL) return;
  
  // Create a temporary link element
  const downloadLink = document.createElement('a');
  downloadLink.href = generatedImageURL;
  
  // Set filename based on wallpaper type
  const isMobile = wallpaperType.value === 'mobile';
  downloadLink.download = `統測倒數_${isMobile ? '手機' : '電腦'}桌布.png`;
  
  // Trigger download
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}