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
    // 365個激勵語錄集合
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
        "每天進步一點點，一年後就是質的飛躍。",
        "學習是一輩子的事，永遠保持好奇心。",
        "一分耕耘，一分收穫，付出必有回報。",
        "遠大的目標需要腳踏實地的努力。",
        "與其羨慕別人的成功，不如專注自己的努力。",
        "千里之行，始於足下，一步步踏實前進。",
        "過程比結果更重要，享受學習的樂趣。",
        "態度決定高度，心態決定成敗。",
        "寶劍鋒從磨礪出，梅花香自苦寒來。",
        "不經一番寒徹骨，怎得梅花撲鼻香。",
        "挫折是通往成功的墊腳石。",
        "不怕慢，就怕停；不怕做不到，就怕想不到。",
        "付出不一定有收穫，但不付出一定沒有收穫。",
        "堅持到最後的人，才能笑到最後。",
        "沒有人能隨隨便便成功，每個閃光點背後都有無數的汗水。",
        "行動是治癒恐懼的良藥，而猶豫、拖延將不斷滋養恐懼。",
        "當你感到疲憊時，請記住為什麼開始。",
        "沒有人陪你走一輩子，所以你要適應孤獨；沒有人會帶你走一輩子，所以你要適應堅強。",
        "命運掌握在自己手中，只有努力才能改變一切。",
        "夢想不會逃跑，會逃跑的是追夢的人。",
        "前方無絕路，希望在轉角。",
        "現在的努力，是為了小時候吹過的牛逼！",
        "將來的你，一定會感謝現在拼命的自己。",
        "努力造就實力，態度決定高度。",
        "只要路是對的，就不怕路遙遠。",
        "人生沒有彩排，每一天都是現場直播。",
        "努力不一定會成功，但不努力一定不會成功。",
        "成功的秘訣在於不斷努力，堅持不懈。",
        "沒有人能隨隨便便成功，每個閃光的背後都是汗水。",
        "人生如同攀登高山，只有不斷向上，才能看到更美的風景。",
        "即使是緩慢的腳步，也能走得很遠，只要你不停下來。",
        "不經歷風雨，怎能見彩虹。",
        "與其臨淵羨魚，不如退而結網。",
        "不經一番寒徹骨，怎得梅花撲鼻香。",
        "世上最遙遠的距離不是生與死，而是我站在你面前，你卻不知道我愛你。",
        "人生就像騎單車，想保持平衡就得往前走。",
        "生活不是等待風暴過去，而是學會在雨中跳舞。",
        "機會不會從天而降，機會是留給有準備的人。",
        "沒有天生的信心，只有不斷培養的信心。",
        "人生就像鏡子，你笑它也笑，你哭它也哭。",
        "不要等待機會，而要創造機會。",
        "夢想的路上，只有奮斗才能獲得真正的成功。",
        "凡事豫則立，不豫則廢。",
        "一個人的成功不取決於他的智慧，而在於他堅韌的意志。",
        "只有不斷嘗試，才能不斷進步。",
        "不要用借口搪塞自己，這樣只會讓自己越來越弱。",
        "學習需要沉澱，思考需要發酵，等待需要耐心。",
        "低頭是一種能力，它不是自卑，也不是怯懦，它是清醒中的嬗變。",
        "有志者，事竟成，破釜沉舟，百二秦關終屬楚；苦心人，天不負，臥薪嚐膽，三千越甲可吞吳。",
        "抱最大的希望，為最大的努力，做最壞的打算。",
        "在真實的生命里，每樁偉業都由信心開始，並由信心跨出第一步。",
        "當你感到悲哀痛苦時，最好是去學些什麼東西。學習會使你永遠立於不敗之地。",
        "學習是勞動，是充滿思想的勞動。",
        "知識是珍貴寶石的結晶，文化是寶石放出的光澤。",
        "求學的三個條件是：多觀察、多吃苦、多研究。",
        "好問的人，只做了五分鐘的愚人；而害羞的人，終身都是愚人。",
        "學到很多東西的訣竅，就是一下子不要學很多。",
        "知識給人重量，成就給人光彩，大多數人只是看到了光彩，而不去稱量重量。",
        "不積跬步，無以至千里；不積小流，無以成江海。",
        "立志是事業的大門，工作是登門入室的的旅程。",
        "我們若已接受最壞的，就再沒有什麼損失。",
        "莫找借口失敗，只找理由成功。",
        "嘲諷是一種力量，消極的力量。贊美也是一種力量，但卻是積極的力量。",
        "活著就是為了改變世界。",
        "世界上那些最容易的事情中，拖延時間最不費力。",
        "人之所以能，是相信能。",
        "人生的價值，即以其人對於當代所做的工作為尺度。",
        "世界會向那些有目標和遠見的人讓路。",
        "不要等待機會，而要創造機會。",
        "人的一生可能燃燒也可能腐朽，我不能腐朽，我願意燃燒起來！",
        "生活若剝去理想、夢想、幻想，那生命便只是一堆空架子。",
        "希望是人生的乳母。",
        "生命不等於是呼吸，生命是活動。",
        "理想的人物不僅要在物質需要的滿足上，還要在精神旨趣的滿足上得到表現。",
        "沒有一種不通過蔑視、忍受和奮鬥就可以征服的命運。",
        "當一個人用工作去迎接光明，光明很快就會來照耀著他。",
        "行動是治癒恐懼的良藥，而猶豫、拖延將不斷滋養恐懼。",
        "人的才華就如海綿的水，沒有外力的擠壓，它是絕對流不出來的。",
        "業精於勤，荒於嬉；行成於思，毀於隨。",
        "一滴蜂蜜比一加侖醋能夠抓到更多的蒼蠅。",
        "自我控制是最強者的本能。",
        "最可怕的敵人，就是沒有堅強的信念。",
        "最大的挑戰和突破在於用人，而用人最大的突破在於信任人。",
        "世界上能夠薄海淡水的公司是因為他們不斷的傾聽消費者的需求。",
        "貧窮是不需要計劃的，致富才需要一個周密的計劃——並去實踐它。",
        "世上沒有絕望的處境，只有對處境絕望的人。",
        "亡羊補牢，猶未遲也。",
        "盛年不再來，一日難再晨，及時當勉勵，歲月不待人。",
        "驕傲是失敗的開始。",
        "謙虛是穩操勝券的保證。",
        "井底之蛙,大海才是廣闊的世界。",
        "不要這山望著那山高，自己實力才是真實可靠。",
        "夢想不拋棄苦心追求的人，只要不停止追求，你們會沐浴在夢想的光輝之中。",
        "在今天的決賽，有的同學會成功，有的同學會失敗，失敗並不可怕，只要你真的努力了。",
        "不管這次考試會打擊你多深，下一把武器準備好沒。",
        "永不言敗，是成功者的最佳品格。",
        "成功的人是跟別人學習經驗，失敗的人只跟自己學習經驗。",
        "生命對某些人來說是美麗的，這些人的一生都為某個目標而奮鬥。",
        "環境不會改變，解決之道在於改變自己。",
        "當你感到痛苦時，就去學習點什麼吧，學習可以使我們減緩痛苦。",
        "要冒一險！整個生命就是一場冒險，走得最遠的人常是願意去做、願意去冒險的人。",
        "人生最大的喜悅是每個人都說你做不到，你卻完成它了！",
        "人生最大的喜悅是每個人都說你做不到，你卻完成它了！",
        "有時可能別人不在乎你，但你不能不在乎自己。",
        "若不給自己設限，則人生中就沒有限制你發揮的藩籬。",
        "再長的路，一步步也能走完，再短的路，不邁開雙腳也無法到達。",
        "成功不是將來才有的，而是從決定去做的那一刻起，持續累積而成。",
        "當你最認為困難的時候，就是你最接近成功的時候。",
        "有志始知蓄積工，讀書都到耄耋中，詩詞自有驚人句，天地終無過已心。",
        "竭誠地將自己獻給工作、學習和責任吧。記住，你們要用一顆純潔的心和善良，一塊塊堆砌自己塔的高度。",
        "快樂不在於擁有許多，而是在於少需要。",
        "讓生活的句號圈住的人，是無法前時半步的。",
        "別想一下造出大海，必須先由小河川開始。",
        "再冷的石頭，坐上三年也會暖。",
        "生氣是拿別人做錯的事來懲罰自己。",
        "哪怕是最沒有希望的事情，只要有一個勇敢者去堅持做，到最後就會擁有希望。",
        "不要等待機會，而要創造機會。",
        "不要做只有思想而沒有行動的人。",
        "成功需要成本，時間也是一種成本，對時間的珍惜就是對成本的節約。",
        "不要自卑，你不比別人笨。不要自滿，別人不比你笨。",
        "為明天做準備的最好方法就是集中你所有智慧，所有的熱忱，把今天的工作做得盡善盡美，這就是你能應付未來的唯一方法。",
        "積極思考造成積極人生，消極思考造成消極人生。",
        "相信自己，你能行。",
        "你要做多大的事情，就該承受多大的壓力。",
        "天才就是無止境刻苦勤奮的能力。",
        "等待機會，是一種十分笨拙的行為。",
        "想像力比知識更重要，因為知識是有限的，而想像力概括著世界的一切、推動著進步，並且是知識進化的源泉。",
        "每一個成功者都有一個開始。勇於開始，才能找到成功的路。",
        "每天告訴自己一次：我真的很不錯。",
        "運氣永遠不可能持續一輩子，能幫助你持續一輩子的東西只有你個人的能力。",
        "成功是一個過程，並不是一個結果。",
        "實力加自信，你就會大獲全勝。",
        "不要因為自己還年輕，用健康去換取經歷。",
        "無志者常立志，有志者立長志。",
        "沒有激流就稱不上勇進，沒有山峰則談不上攀登。",
        "高山仰止，景行行止。雖不能至，心向往之。",
        "天下沒有不可能的事，只要你有這個信念，努力去做，一定會成功。",
        "如果不想被打倒，只有增加自身的重量。",
        "積極向上的心態，是成功者的最基本要素。",
        "我的心中始終保持著一種信念，那就是有志者事竟成。",
        "命運把人抛入最低谷時，往往是人生轉折的最佳期。",
        "忘記失敗，不過要牢記失敗中的教訓。",
        "天才之所以為天才，就在於他的毅力與勤奮足以彌補不是天才的缺陷。",
        "沒有退路時，潛能就發揮出來了。",
        "任何的限制，都是從自己的內心開始的。",
        "接受挑戰，就可以享受勝利的喜悅。",
        "夢想一旦被付諸行動，就會變得神聖。",
        "含淚播種的人一定能含笑收穫。",
        "對於每一次失敗，你都應該感到慶幸。因為它使你離成功更近了一步。",
        "贏家永遠不會放棄，放棄者永遠不會贏。",
        "在真實的生命里，每樁偉業都由信心開始，並由信心跨出第一步。",
        "成功永遠屬於馬上行動的人。",
        "改變你的想法，你就改變了自己的世界。",
        "珍惜每一次失敗的機會，這是老天在培養你成功前的心理建設。",
        "做對的事情比把事情做對重要。",
        "當你感到痛苦時，就去學習點什麼吧，學習可以使我們減緩痛苦。",
        "聽從命運安排的是凡人；主宰自己命運的才是強者；沒有主見的是盲從，三思後行的是智者。",
        "成功者決不放棄，放棄者決不成功。",
        "人人都可以成為自己的貴人，只要不放棄努力和追求。",
        "信心、毅力、勇氣三者具備，則天下沒有做不成的事。",
        "世上沒有絕望的處境，只有對處境絕望的人。",
        "凡真心嚮往目標者，必獲全力以赴之神奇力量。",
        "沙漠里的駱駝要比綠洲中的獅子走得更遠。",
        "凡事要三思，但比三思更重要的是三思而行。",
        "成功的關鍵在於相信自己有成功的能力。",
        "每一個不曾起舞的日子，都是對生命的辜負。",
        "一個人至少擁有一個夢想，有一個理由去堅強。",
        "凡事不要說不可能，要說：我試試看。",
        "一個能從別人的觀念來看事情，能了解別人心靈活動的人，永遠不必為自己的前途擔心。",
        "世上沒有絕望的處境，只有對處境絕望的人。",
        "一個人最大的破產是絕望，最大的資產是希望。",
        "你不能左右天氣，但你能轉變你的心情。",
        "夢想再大，也要一步步去實現。",
        "世界上沒有不可能的事，只要你有信心，只要你肯付出努力和行動。",
        "漫無目的的生活就像出海航行而沒有指南針。",
        "世界上最遙遠的距離不是生與死，而是我站在你面前，你卻不知道我愛你。",
        "人生就像騎單車，想保持平衡就得往前走。",
        "生活不是等待風暴過去，而是學會在雨中跳舞。",
        "機會不會從天而降，機會是留給有準備的人。",
        "沒有天生的信心，只有不斷培養的信心。",
        "人生就像鏡子，你笑它也笑，你哭它也哭。",
        "不要等待機會，而要創造機會。",
        "夢想的路上，只有奮斗才能獲得真正的成功。",
        "凡事豫則立，不豫則廢。",
        "一個人的成功不取決於他的智慧，而在於他堅韌的意志。",
        "只有不斷嘗試，才能不斷進步。",
        "不要用借口搪塞自己，這樣只會讓自己越來越弱。",
        "學習需要沉澱，思考需要發酵，等待需要耐心。",
        "低頭是一種能力，它不是自卑，也不是怯懦，它是清醒中的嬗變。",
        "有志者，事竟成，破釜沉舟，百二秦關終屬楚；苦心人，天不負，臥薪嚐膽，三千越甲可吞吳。",
        "抱最大的希望，為最大的努力，做最壞的打算。",
        "經驗不是發生在一個人身上的事情，而是一個人如何看待發生在他身上的事情。",
        "真正的失敗不是你跌倒了，而是你不敢再站起來。",
        "當你真心想做一件事，全宇宙都會來幫你。",
        "寧願辛苦一陣子，不要苦一輩子。",
        "生命不在於長短，而在於如何活得精彩豐富。",
        "腳下的路，就是自己的方向；心中的夢，就是前行的動力。",
        "態度決定高度，習慣決定命運。",
        "不做最好的，但要做最努力的自己。",
        "生活中沒有退路，才能尋得出路。",
        "今天的汗水，是明天的動力；今天的努力，是明天的成就。",
        "努力就是光，照亮前進的每一個腳步。",
        "勇氣不是沒有恐懼，而是克服恐懼。",
        "臉上的自信，來自心中的堅持和苦練。",
        "天道酬勤，日進有功。",
        "為夢想而活，因拼搏而精彩。",
        "閱讀使人充實，思考使人深邃，交流使人清醒。",
        "不經歷風雨，怎能見彩虹。",
        "人生短暫，珍惜當下。",
        "知識改變命運，學習成就未來。",
        "只要還有明天，今天就永遠是起跑線。",
        "用知識武裝自己，不要讓未來的你，嘲笑現在的你。",
        "成長就是逼自己一把，哭著也要堅持下去。",
        "人生的痛苦，不是努力的痛苦，而是徘徊不前的煎熬。",
        "明日復明日，明日何其多，日日待明日，萬事成蹉跎。",
        "人若軟弱就是自己最大的敵人，人若勇敢就是自己最好的朋友。",
        "眼淚不是答案，拼搏才是選擇。",
        "每一次努力，都是一種積累；每一次拼搏，都是一種成長。",
        "願你不負所學，前程似錦；也願歲月不負你，未來可期。",
        "再小的努力，乘以365都很明顯。"
    ];
    
    const quoteElement = document.getElementById('random-quote');
    const motivationElement = document.querySelector('.motivation p');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    
    // 根據日期選擇激勵語錄
    function getTodayQuote() {
        const today = new Date();
        // 計算今天是一年中的第幾天 (0-364)
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const diff = today - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay) - 1;
        
        // 確保索引在有效範圍內
        const index = dayOfYear % quotes.length;
        return quotes[index];
    }
    
    // 顯示今日激勵語錄在首頁
    if (motivationElement) {
        const todayQuote = getTodayQuote();
        motivationElement.innerHTML = `<span class="quote-mark">"</span>${todayQuote}<span class="quote-mark">"</span>`;
    }
    
    if (quoteElement && newQuoteBtn) {
        // 初始顯示今日激勵語錄
        quoteElement.textContent = getTodayQuote();
        
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
                { title: '國文：', link: '#', description: '歡迎合作' },
                { title: '英文：', link: '#', description: '歡迎合作' },
                { title: '數學：', link: '#', description: '歡迎合作' },
                { title: '專一：', link: '#', description: '歡迎合作' },
                { title: '專二：', link: '#', description: '歡迎合作' }
            ]
        },
        'paper': {
            title: '考古題庫',
            icon: 'file-alt',
            items: [
                { title: '110年統測歷屆試題', link: 'https://web1.tcte.edu.tw/EXAM/110_4y/', description: '完整試題與答案' },
                { title: '111年統測歷屆試題', link: 'https://web1.tcte.edu.tw/EXAM/111_4y/', description: '完整試題與答案' },
                { title: '112年統測歷屆試題', link: 'https://web1.tcte.edu.tw/EXAM/112_4y/', description: '完整試題與答案' },
                { title: '113年統測歷屆試題', link: 'https://web1.tcte.edu.tw/EXAM/113_4y/', description: '完整試題與答案' },
                { title: '114年統測歷屆試題', link: 'https://web1.tcte.edu.tw/EXAM/114_4y/', description: '完整試題與答案' }
            ]
        },
        'note': {
            title: '歡迎合作',
            icon: 'clipboard-list',
            items: [
                { title: '國文：', link: '#', description: '歡迎合作' },
                { title: '英文：', link: '#', description: '歡迎合作' },
                { title: '數學：', link: '#', description: '歡迎合作' },
                { title: '專一:', link: '#', description: '歡迎合作' },
                { title: '專二:', link: '#', description: '歡迎合作' }
            ]
        },
        'group': {
            title: '歡迎合作',
            icon: 'users',
            items: [
                { title: '線上英文', link: '#', description: '歡迎合作' },
                { title: '數學', link: '#', description: '歡迎合作' },
                { title: '國文', link: '#', description: '歡迎合作' },
                { title: '專一:', link: '#', description: '歡迎合作' },
                { title: '專二:', link: '#', description: '歡迎合作' }
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