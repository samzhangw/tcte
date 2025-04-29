document.addEventListener('DOMContentLoaded', () => {
   // 設定115年統測的日期 (2026年4月25日)
const examDate = new Date('April 25, 2026 00:00:00').getTime();

    // 更新版權年份
    updateCopyrightYear();
    
    // 獲取要顯示倒數的元素
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // 更新倒數計時的函數
    function updateCountdown() {
        // 獲取當前時間
        const now = new Date().getTime();
        
        // 計算剩餘時間
        const timeLeft = examDate - now;
        
        // 如果已經到考試日期
        if (timeLeft < 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }
        
        // 計算天、時、分、秒
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // 更新顯示
        daysElement.textContent = days < 10 ? `0${days}` : days;
        hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
        minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }
    
    // 初次載入時立即更新一次
    updateCountdown();
    
    // 每秒更新一次
    setInterval(updateCountdown, 1000);
    
    // 簡化倒數計時盒子的加載效果
    const countdownBoxes = document.querySelectorAll('.countdown-box');
    countdownBoxes.forEach(box => {
        box.style.opacity = '1';
    });
    
    // 禁用粒子效果
    // createParticles();
    
    // 簡化版權宣告加載效果
    document.querySelector('.copyright-banner').style.opacity = '1';
    
    // 頁首導航效果
    initHeaderNav();
    
    // 初始化新功能
    initTabs();
    initQuotes();
    initModals();
    
    // 初始化滾動相關功能
    initScrollFeatures();
    
    // 初始化資源詳情功能
    initResourceDetails();
});

// 粒子效果函數 - 已禁用，保留函數定義但不實際使用
function createParticles() {
    // 函數內容保留但不執行，避免可能的程式碼引用問題
    console.log("粒子效果已禁用");
}

// 更新版權年份的函數
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.copyright-content, .copyright-footer, .side-menu-footer p');
    
    copyrightElements.forEach(element => {
        if (element) {
            // 替換所有數字年份為當前年份
            element.innerHTML = element.innerHTML.replace(/\d{4}/g, currentYear);
        }
    });
}

// 添加互動效果 - 點擊效果（簡化版本）
document.querySelector('.container').addEventListener('click', function(e) {
    // 簡化或禁用點擊效果以避免性能問題
    // 目前版本不產生視覺效果，節省資源
});

// 頁首導航功能
function initHeaderNav() {
    // 菜單切換按鈕
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const closeSideMenu = document.querySelector('.close-side-menu');
    
    // 點擊菜單按鈕打開側邊欄
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滾動
        });
    }
    
    // 點擊關閉按鈕關閉側邊欄
    if (closeSideMenu) {
        closeSideMenu.addEventListener('click', closeSideMenuFunc);
    }
    
    // 點擊遮罩層關閉側邊欄
    if (overlay) {
        overlay.addEventListener('click', closeSideMenuFunc);
    }
    
    // 點擊側邊欄選項關閉側邊欄
    const sideNavItems = document.querySelectorAll('.side-nav li a');
    sideNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有項目的 active 類別
            document.querySelectorAll('.side-nav li').forEach(li => {
                li.classList.remove('active');
            });
            
            // 為被點擊的項目添加 active 類別
            item.closest('li').classList.add('active');
            
            // 關閉側邊欄（如果不是跳轉到其他頁面的連結）
            if (!item.getAttribute('href').startsWith('http')) {
                setTimeout(closeSideMenuFunc, 300);
            }
        });
    });
    
    // 關閉側邊欄函數
    function closeSideMenuFunc() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // 恢復背景滾動
    }
    
    // 初始化快速導航欄的點擊事件
    const quickNavItems = document.querySelectorAll('.quick-nav-item');
    quickNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // 如果點擊的是側邊欄相關的項目，則打開側邊欄
            if (item.id.includes('quick-open')) {
                e.preventDefault();
                const targetId = item.id.replace('quick-', '');
                
                // 點擊對應的側邊欄按鈕
                const targetMenuItem = document.getElementById(targetId);
                if (targetMenuItem) {
                    // 首先開啟側邊欄
                    sideMenu.classList.add('active');
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // 模擬點擊對應的側邊欄項目
                    setTimeout(() => {
                        targetMenuItem.click();
                    }, 300);
                }
            }
            
            // 更新活動項目
            document.querySelectorAll('.quick-nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            item.classList.add('active');
        });
    });
}

// 初始化頁籤功能
function initTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // 移除所有頁籤的活動狀態
            document.querySelectorAll('.tab-header').forEach(th => {
                th.classList.remove('active');
            });
            
            // 隱藏所有頁籤內容
            document.querySelectorAll('.tab-pane').forEach(tp => {
                tp.classList.remove('active');
            });
            
            // 設置當前頁籤為活動狀態
            header.classList.add('active');
            
            // 顯示對應的頁籤內容
            const tabId = header.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 初始化鼓勵語錄功能
function initQuotes() {
    const quotes = [
        "成功不是偶然的，而是日積月累的結果。",
        "今天付出的每一分努力，都是為了明天的成功。",
        "不要因為一時的困難而放棄，堅持下去就會看到希望。",
        "學習的道路上沒有捷徑，唯有踏實前進。",
        "每個人都有自己的步調，不要與他人比較，只要向前走就好。",
        "失敗是成功之母，從錯誤中學習並成長。",
        "目標要明確，計劃要細緻，行動要堅決。",
        "知識是無價的財富，永遠不會貶值。",
        "心態決定一切，保持樂觀積極的心情。",
        "相信自己，你比想像中的更強大。",
        "機會總是留給有準備的人。",
        "每天進步一點點，一年後就是質的飛躍。"
    ];
    
    const quoteElement = document.getElementById('random-quote');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    
    if (quoteElement && newQuoteBtn) {
        // 顯示一句隨機鼓勵語錄
        showRandomQuote();
        
        // 換一句按鈕
        newQuoteBtn.addEventListener('click', showRandomQuote);
    }
    
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
        
        // 添加淡入效果
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.style.transition = 'opacity 0.5s ease';
            quoteElement.style.opacity = '1';
        }, 100);
    }
}

// 初始化模態框功能
function initModals() {
    // 關閉按鈕
    const closeButtons = document.querySelectorAll('.close-modal, .cancel-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // 點擊模態框外的區域關閉
    document.addEventListener('click', event => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            // 確保點擊的是模態框本身，而不是模態框內容
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // 添加鍵盤ESC鍵關閉功能
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            // 關閉所有可見的模態框
            const visibleModals = document.querySelectorAll('.modal[style*="display: flex"]');
            visibleModals.forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
    
    // 設置打開彈窗的事件
    // 主導航按鈕
    const openScheduleBtn = document.getElementById('open-schedule-section');
    const openResourcesBtn = document.getElementById('open-resources-section');
    
    if (openScheduleBtn) {
        openScheduleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('schedule-section-modal');
        });
    }
    
    if (openResourcesBtn) {
        openResourcesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('resources-section-modal');
        });
    }
    
    // 底部快速導航按鈕
    const quickScheduleBtn = document.getElementById('quick-open-schedule');
    const quickResourcesBtn = document.getElementById('quick-open-resources');
    
    if (quickScheduleBtn) {
        quickScheduleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('schedule-section-modal');
        });
    }
    
    if (quickResourcesBtn) {
        quickResourcesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('resources-section-modal');
        });
    }
    
    // 首頁按鈕
    const showQuoteBtn = document.getElementById('show-quote-btn');
    const showExamInfoBtn = document.getElementById('show-exam-info-btn');
    
    if (showQuoteBtn) {
        showQuoteBtn.addEventListener('click', () => {
            openModal('quote-modal');
        });
    }
    
    if (showExamInfoBtn) {
        showExamInfoBtn.addEventListener('click', () => {
            openModal('exam-info-modal');
        });
    }
    
    // 查看完整考試時間表按鈕
    const openFullExamInfoBtn = document.getElementById('open-full-exam-info');
    if (openFullExamInfoBtn) {
        openFullExamInfoBtn.addEventListener('click', () => {
            closeModal('exam-info-modal');
            openModal('schedule-section-modal');
        });
    }
    
    // 添加特定的取消按鈕事件
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // 防止表單提交
            const modal = btn.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
}

// 開啟模態框
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滾動
        
        // 添加動畫效果，僅使用透明度變化
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transition = 'opacity 0.3s ease';
                modalContent.style.opacity = '1';
            }, 50);
        }
    }
}

// 關閉模態框
function closeModal(modalId) {
    console.log('Closing modal:', modalId); // 調試用
    const modal = document.getElementById(modalId);
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        
        if (modalContent) {
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // 恢復背景滾動
            }, 300);
        } else {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢復背景滾動
        }
    }
}

// 初始化滾動相關功能
function initScrollFeatures() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    const quickNavItems = document.querySelectorAll('.quick-nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    // 監聽滾動事件
    window.addEventListener('scroll', () => {
        // 顯示/隱藏回到頂部按鈕
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // 更新快速導航高亮
        updateActiveNavItem();
    });
    
    // 回到頂部按鈕點擊事件
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            // 平滑滾動到頂部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 快速導航點擊事件
    quickNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 獲取目標部分的ID
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 平滑滾動到目標部分
                window.scrollTo({
                    top: targetSection.offsetTop - 140, // 減去頂部固定元素的高度
                    behavior: 'smooth'
                });
                
                // 更新活動狀態
                quickNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                item.classList.add('active');
            }
        });
    });
    
    // 更新活動導航項目
    function updateActiveNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // 檢查當前滾動位置是否在部分範圍內
            if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // 更新導航高亮
        quickNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // 平滑滾動所有錨點連結
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                window.scrollTo({
                    top: targetElement.offsetTop - 140,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 初始化資源詳情功能
function initResourceDetails() {
    // 創建返回按鈕
    const resourcesModal = document.getElementById('resources-section-modal');
    if (resourcesModal) {
        const backButton = document.createElement('button');
        backButton.id = 'resource-back-btn';
        backButton.className = 'btn back-btn';
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i> 返回';
        backButton.style.display = 'none';
        
        // 插入返回按鈕到模態框標題旁
        const modalHeader = resourcesModal.querySelector('.modal-header');
        if (modalHeader) {
            modalHeader.appendChild(backButton);
        }
        
        // 返回按鈕點擊事件
        backButton.addEventListener('click', () => {
            showMainResourceView();
        });
    }
    
    // 初始綁定資源卡片事件
    bindResourceCardEvents();
}

// 顯示主要資源視圖
function showMainResourceView() {
    const modal = document.getElementById('resources-section-modal');
    const mainContent = modal.querySelector('.resources-section');
    const backButton = document.getElementById('resource-back-btn');
    
    // 恢復原始內容
    if (modal.hasAttribute('data-original-content')) {
        mainContent.innerHTML = modal.getAttribute('data-original-content');
    }
    
    // 恢復原始標題
    const modalTitle = modal.querySelector('.modal-title');
    if (modalTitle) {
        modalTitle.innerHTML = '<i class="fas fa-book"></i> 學習資源';
    }
    
    // 隱藏返回按鈕
    if (backButton) {
        backButton.style.display = 'none';
    }
    
    // 重新綁定資源卡片事件，並使其能訪問到全局的資源數據
    bindResourceCardEvents();
}

// 綁定資源卡片事件的獨立函數
function bindResourceCardEvents() {
    // 資源詳情數據
    const resourceData = {
        'video': {
            title: '教學影片',
            icon: 'video',
            items: [
                { title: '國文：重要文法解析', link: '#', description: '針對統測常考文法進行詳細講解' },
                { title: '英文：考前單字速記', link: '#', description: '快速記憶統測常考單字的技巧' },
                { title: '數學：函數與極限', link: '#', description: '解析函數與極限概念，附有練習題' },
                { title: '物理：力學基礎講解', link: '#', description: '從基礎開始理解物理力學概念' },
                { title: '化學：有機化學入門', link: '#', description: '簡單易懂的有機化學概念講解' }
            ]
        },
        'paper': {
            title: '考古題庫',
            icon: 'file-alt',
            items: [
                { title: '110年統測國文科試題與解析', link: '#', description: '完整試題與詳解' },
                { title: '111年統測英文科試題與解析', link: '#', description: '完整試題與詳解' },
                { title: '112年統測數學科試題與解析', link: '#', description: '完整試題與詳解' },
                { title: '113年統測專業科目試題與解析', link: '#', description: '完整試題與詳解' },
                { title: '114年統測模擬試題', link: '#', description: '模擬試題與詳解' }
            ]
        },
        'note': {
            title: '學習筆記',
            icon: 'clipboard-list',
            items: [
                { title: '國文：古文30篇重點整理', link: '#', description: '統測常考古文的重點筆記' },
                { title: '英文：文法重點整理', link: '#', description: '英文文法系統性整理與例句' },
                { title: '數學：三角函數公式表', link: '#', description: '完整三角函數公式與應用' },
                { title: '物理：公式推導與應用', link: '#', description: '物理公式的來源與應用場景' },
                { title: '化學：元素週期表記憶法', link: '#', description: '快速記憶元素週期表的方法' }
            ]
        },
        'group': {
            title: '讀書會',
            icon: 'users',
            items: [
                { title: '線上英文讀書會 (每週三晚上)', link: '#', description: '透過視訊一起學習英文' },
                { title: '數學解題小組 (每週六下午)', link: '#', description: '一起解決數學難題' },
                { title: '國文寫作討論群 (不定期)', link: '#', description: '互相批改作文，提升寫作能力' },
                { title: '理科實驗小組 (每週日)', link: '#', description: '討論物理、化學實驗與概念' },
                { title: '考前衝刺群 (考前一個月)', link: '#', description: '臨考前互相督促與解惑' }
            ]
        }
    };

    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        // 首先移除所有現有的點擊事件處理器
        const linkClone = link.cloneNode(true);
        link.parentNode.replaceChild(linkClone, link);
        
        // 然後添加新的點擊事件
        linkClone.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 獲取資源類別
            const resourceCard = linkClone.closest('.resource-card');
            const icon = resourceCard.querySelector('.resource-icon i');
            let resourceType = '';
            
            if (icon.classList.contains('fa-video')) resourceType = 'video';
            else if (icon.classList.contains('fa-file-alt')) resourceType = 'paper';
            else if (icon.classList.contains('fa-clipboard-list')) resourceType = 'note';
            else if (icon.classList.contains('fa-users')) resourceType = 'group';
            
            // 顯示資源詳情在現有的資源模態框中
            displayResourceDetail(resourceType, resourceData);
        });
    });
}

// 顯示資源詳情在現有的資源模態框中
function displayResourceDetail(type, data) {
    if (!data[type]) return;
    
    const modal = document.getElementById('resources-section-modal');
    const mainContent = modal.querySelector('.resources-section');
    const backButton = document.getElementById('resource-back-btn');
    
    // 儲存主要內容
    if (!modal.hasAttribute('data-original-content')) {
        modal.setAttribute('data-original-content', mainContent.innerHTML);
    }
    
    // 顯示返回按鈕
    if (backButton) {
        backButton.style.display = 'block';
    }
    
    // 更新模態框標題
    const modalTitle = modal.querySelector('.modal-title');
    if (modalTitle) {
        modalTitle.innerHTML = `<i class="fas fa-${data[type].icon}"></i> ${data[type].title}`;
    }
    
    // 清空並更新內容
    mainContent.innerHTML = '';
    
    // 創建資源列表
    const resourceList = document.createElement('div');
    resourceList.className = 'resource-detail-list';
    
    // 填充資源列表
    data[type].items.forEach(item => {
        const resourceItem = document.createElement('div');
        resourceItem.className = 'resource-item';
        
        const resourceTitle = document.createElement('h4');
        resourceTitle.className = 'resource-item-title';
        resourceTitle.textContent = item.title;
        
        const resourceDesc = document.createElement('p');
        resourceDesc.className = 'resource-item-desc';
        resourceDesc.textContent = item.description;
        
        const resourceLink = document.createElement('a');
        resourceLink.className = 'resource-item-link';
        resourceLink.href = item.link;
        resourceLink.textContent = '前往學習';
        resourceLink.target = '_blank';
        
        resourceItem.appendChild(resourceTitle);
        resourceItem.appendChild(resourceDesc);
        resourceItem.appendChild(resourceLink);
        
        resourceList.appendChild(resourceItem);
    });
    
    mainContent.appendChild(resourceList);
} 