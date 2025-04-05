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
  switch (wallpaperStyle.value) {
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
}

function calculateDaysRemaining() {
  const currentTime = new Date();
  const timeDifference = EXAM_DATE - currentTime;
  
  // Calculate days remaining
  return Math.max(0, Math.ceil(timeDifference / (1000 * 60 * 60 * 24)));
}

function createStandardCountdown(daysRemaining) {
  const isLarge = countdownStyle.value === 'large';
  
  const countdownElement = document.createElement('div');
  countdownElement.className = 'preview-countdown';
  countdownElement.style.fontSize = isLarge ? '4rem' : '2.5rem';
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
  
  switch (wallpaperStyle.value) {
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
  const isLarge = countdownStyle.value === 'large';
  const isLight = wallpaperStyle.value === 'light';
  
  // Set text color based on background
  ctx.fillStyle = isLight ? '#333333' : '#ffffff';
  
  // Draw countdown number
  ctx.font = `bold ${isLarge ? 180 : 120}px Roboto, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${daysRemaining}天`, width / 2, height / 2 - 50);
  
  // Draw date text
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
  
  // Draw circle
  ctx.beginPath();
  ctx.arc(centerX, centerY - 30, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fill();
  
  // Draw circle border
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'rgba(255, 204, 0, 0.8)';
  ctx.stroke();
  
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