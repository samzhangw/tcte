// FAQ頁面的手風琴效果實現
document.addEventListener('DOMContentLoaded', function() {
    // 獲取所有FAQ項目
    const faqItems = document.querySelectorAll('.faq-item');
    
    // 為每個項目添加點擊事件
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 切換當前項目的active狀態
            item.classList.toggle('active');
            
            // 如果要實現只能展開一個項目，可以取消註釋以下代碼
            // faqItems.forEach(otherItem => {
            //     if(otherItem !== item) {
            //         otherItem.classList.remove('active');
            //     }
            // });
        });
    });
    
    // 默認展開第一個FAQ項目
    if(faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // 頁面加載時添加淡入效果
    document.querySelector('.page-content').classList.add('fade-in');
}); 