import { DaySchedule, ResourceLink, ResourceType } from './types';

// 115 ROC Year = 2026 AD
// Exam Date: April 25, 2026
export const EXAM_DATE = new Date('2026-04-25T10:20:00'); 

export const EXAM_SCHEDULE: DaySchedule[] = [
  {
    date: '4月25日',
    weekday: '星期六',
    events: [
      { period: '預備', time: '10:15', subject: '預備鈴響', category: '持准考證入場', isPrep: true },
      { period: '上午第1節', time: '10:20 - 12:00', subject: '專業科目（二）', category: '03、07、12、15、51～53、55～56' },
      { period: '預備', time: '13:25', subject: '預備鈴響', category: '持准考證入場', isPrep: true },
      { period: '下午第2節', time: '13:30 - 15:10', subject: '國文', category: '全體考生 (01～20、51～56)' },
      { period: '預備', time: '15:55', subject: '預備鈴響', category: '持准考證入場', isPrep: true },
      { period: '下午第3節', time: '16:00 - 17:40', subject: '英文', category: '全體考生 (01～20、51～56)' },
    ]
  },
  {
    date: '4月26日',
    weekday: '星期日',
    events: [
      { period: '預備', time: '08:25', subject: '預備鈴響', category: '持准考證入場', isPrep: true },
      { period: '上午第1節', time: '08:30 - 10:10', subject: '專業科目（二）', category: '01～02、04～06、08～11、13～14、17～20、51～54、56' },
      { period: '預備', time: '10:55', subject: '預備鈴響', category: '持准考證入場', isPrep: true },
      { period: '上午第2節', time: '11:00 - 12:20', subject: '數學', category: '全體考生 (01～20、51～56)' },
      { period: '預備', time: '13:25', subject: '預備鈴響', category: '持准考證入場', isPrep: true },
      { period: '下午第3節', time: '13:30 - 15:10', subject: '專業科目（一）', category: '全體考生 (01～20、51～56)' },
      { period: '預備', time: '15:55', subject: '預備鈴響', category: '持准考證入場', isPrep: true },
      { period: '下午第4節', time: '16:00 - 17:40', subject: '專業科目（二）', category: '16、54～56' },
    ]
  }
];

export const RESOURCES: ResourceLink[] = [
  {
    title: '基礎',
    type: ResourceType.MATH_B,
    tags: ['打底', '必修'],
    url: 'https://oldsumathpass.com/'
  },
  {
    title: '精選',
    type: ResourceType.MATH_B,
    tags: ['進階', '題庫'],
    url: 'https://oldsumathpass.com/'
  },
  {
    title: '重點',
    type: ResourceType.MATH_B,
    tags: ['複習', '筆記'],
    url: 'https://oldsumathpass.com/'
  },
  {
    title: '考前猜題',
    type: ResourceType.MATH_B,
    tags: ['衝刺', '預測'],
    url: 'https://oldsumathpass.com/'
  },
  {
    title: '基礎',
    type: ResourceType.MATH_C,
    tags: ['打底', '必修'],
    url: 'https://oldsumathpass.com/'
  },
  {
    title: '精選',
    type: ResourceType.MATH_C,
    tags: ['進階', '題庫'],
    url: 'https://oldsumathpass.com/'
  },
  {
    title: '重點',
    type: ResourceType.MATH_C,
    tags: ['複習', '筆記'],
    url: 'https://oldsumathpass.com/'
  },
  {
    title: '考前猜題',
    type: ResourceType.MATH_C,
    tags: ['衝刺', '預測'],
    url: 'https://oldsumathpass.com/'
  },
];

export const EXTERNAL_LINKS = [
  { title: '會考倒數', url: 'https://tyctw.github.io/115clock/' },
  { title: '分科倒數', url: 'https://ceeecc.vercel.app/' },
  { title: '統測重要日程', url: 'https://tctee.vercel.app/' },
];

export const MOTIVATIONAL_QUOTES = [
  "每一份努力，都是未來的幸運伏筆。",
  "夢想不會逃跑，逃跑的永遠是自己。",
  "現在的你也許很累，但未來的你會感謝現在的自己。",
  "不要等待機會，而要創造機會。",
  "成功的路上並不擁擠，因為堅持的人不多。",
  "努力不一定會成功，但不努力一定很輕鬆——但也只是輕鬆一陣子，後悔一輩子。",
  "將來的你，一定會感謝現在拚命的自己。",
  "失敗只有一種，那就是半途而廢。",
  "沒有奇蹟，只有累積。",
  "你的負擔將變成禮物，你受的苦將照亮你的路。",
  "為了最好的結果，讓我們把瘋狂進行到底。",
  "不為模糊的未來擔憂，只為清楚的現在努力。",
  "堅持不是因為看到了希望，而是因為堅持了才有希望。",
  "只要路是對的，就不怕路遠。",
  "每天進步一點點，是卓越的開始。",
  "學習是為了讓自己有更多的選擇權。",
  "你想過什麼樣的生活，就得先付出什麼樣的代價。",
  "與其抱怨環境，不如改變自己。",
  "專注當下，這就是最好的準備。",
  "可以哭，可以累，但絕不可以放棄。",
  "只有極致的自律，才能帶來極致的自由。",
  "用實力讓情懷落地。",
  "既然選擇了遠方，便只顧風雨兼程。",
  "比你優秀的人還在努力，你憑什麼休息？",
  "每一次跌倒，都是為了更高地飛翔。",
  "看似不起眼的日復一日，會在將來的某一天，讓你看到堅持的意義。",
  "別讓配不上你的野心，也辜負了所受的苦難。",
  "沒有白走的路，每一步都算數。",
  "星光不問趕路人，時光不負有心人。",
  "乾坤未定，你我皆是黑馬。",
  "所謂光輝歲月，並不是以後閃耀的日子，而是無人問津時，你對夢想的偏執。",
  "這世界很公平，你想要最好，就一定會給你最痛。",
  "不要假裝努力，結果不會陪你演戲。",
  "現在偷的懶，都是未來流的淚。",
  "擁有夢想只是一種智力，實現夢想才是一種能力。",
  "耐得住寂寞，才守得住繁華。",
  "種一棵樹最好的時間是十年前，其次是現在。",
  "你必須非常努力，才能看起來毫不費力。",
  "人生沒有彩排，每一天都是現場直播。",
  "努力成為自己喜歡的樣子。",
  "生活從來都不容易，當你覺得容易的時候，肯定是有人在替你承擔屬於你的那份不容易。",
  "不要讓未來的你，討厭現在的自己。",
  "成功的反義詞不是失敗，而是什麼都不做。",
  "最可怕的敵人，是沒有堅強信念的自己。",
  "越努力，越幸運。",
  "不要因為走得太遠，而忘記為什麼出發。",
  "行動是治癒恐懼的良藥，而猶豫、拖延將不斷滋養恐懼。",
  "只要心中有光，黑暗就無法將你吞噬。",
  "這一秒不放棄，下一秒就有希望。",
  "含淚播種的人，一定能含笑收穫。"
];