import { ScheduleItem, ExamSession } from './types';

// ROC Year 114 = 2025
// ROC Year 115 = 2026

export const SCHEDULE_DATA: ScheduleItem[] = [
  // Mock Exams
  {
    id: 'mock-1',
    category: '模擬考',
    title: '第一次模擬考',
    startDate: '2025-10-02T00:00:00',
    endDate: '2025-10-03T23:59:59',
  },
  {
    id: 'mock-2',
    category: '模擬考',
    title: '第二次模擬考',
    startDate: '2025-11-10T00:00:00',
    endDate: '2025-11-11T23:59:59',
  },
  {
    id: 'pay-school',
    category: '報名費繳費',
    title: '學校集體報名繳費',
    startDate: '2025-11-27T00:00:00',
    endDate: '2025-12-17T23:59:59',
  },
  {
    id: 'pay-individual',
    category: '報名費繳費',
    title: '個別網路報名繳費',
    startDate: '2025-12-05T00:00:00',
    endDate: '2025-12-17T23:59:59',
  },
  {
    id: 'registration',
    category: '報名',
    title: '報名 (集體/個別)',
    startDate: '2025-12-05T09:00:00',
    endDate: '2025-12-17T17:00:00',
  },
  {
    id: 'mock-3',
    category: '模擬考',
    title: '第三次模擬考',
    startDate: '2025-12-23T00:00:00',
    endDate: '2025-12-24T23:59:59',
  },
  {
    id: 'check-status',
    category: '報名結果',
    title: '報名結果網路查詢及確認',
    startDate: '2026-01-02T12:00:00',
    endDate: '2026-01-09T23:59:59',
  },
  {
    id: 'correction',
    category: '報名結果',
    title: '報名資料錯誤更正截止',
    startDate: '2026-01-09T23:59:59', // Assuming end of day if only date provided
  },
  {
    id: 'disability-notice',
    category: '寄發通知',
    title: '寄發身心障礙及重大傷病考生應考服務審查結果通知書',
    startDate: '2026-02-03T23:59:59', // "Before" this date
  },
  {
    id: 'mock-4',
    category: '模擬考',
    title: '第四次模擬考',
    startDate: '2026-03-03T00:00:00',
    endDate: '2026-03-04T23:59:59',
  },
  {
    id: 'admit-card',
    category: '寄發通知',
    title: '寄發准考證',
    startDate: '2026-03-18T00:00:00',
  },
  {
    id: 'mock-5',
    category: '模擬考',
    title: '第五次模擬考',
    startDate: '2026-03-30T00:00:00',
    endDate: '2026-03-31T23:59:59',
  },
  {
    id: 'location',
    category: '公告',
    title: '公布考試地點',
    startDate: '2026-04-15T09:00:00',
  },
  {
    id: 'exam-day',
    category: '考試',
    title: '統一入學測驗考試',
    startDate: '2026-04-25T00:00:00',
    endDate: '2026-04-26T23:59:59',
    isExamDay: true,
  },
  {
    id: 'questions',
    category: '公告',
    title: '公布試題',
    startDate: '2026-04-25T00:00:00',
    endDate: '2026-04-26T23:59:59',
  },
  {
    id: 'answers',
    category: '公告',
    title: '公布參考答案',
    startDate: '2026-04-27T09:00:00',
  },
  {
    id: 'objection',
    category: '疑義',
    title: '答案疑義質疑申請截止',
    startDate: '2026-04-30T17:00:00',
  },
  {
    id: 'objection-reply',
    category: '疑義',
    title: '公布疑義說明',
    startDate: '2026-05-13T17:00:00',
  },
  {
    id: 'score-sent',
    category: '成績',
    title: '成績單寄發',
    startDate: '2026-05-14T00:00:00',
  },
  {
    id: 'score-query',
    category: '成績',
    title: '成績查詢',
    startDate: '2026-05-14T14:00:00',
  },
  {
    id: 'stats-announce',
    category: '公告',
    title: '統計資料公告',
    startDate: '2026-05-14T14:00:00',
  },
  {
    id: 'score-review',
    category: '成績',
    title: '申請成績複查',
    startDate: '2026-05-14T14:00:00',
    endDate: '2026-05-18T17:00:00',
  },
  {
    id: 'review-result',
    category: '成績',
    title: '成績複查結果查詢',
    startDate: '2026-05-22T17:00:00',
  },
];

export const EXAM_SESSIONS: ExamSession[] = [
  // Day 1: 2026-04-25
  {
    id: 'd1-1',
    title: '專業科目(二)',
    startTime: '2026-04-25T10:20:00',
    endTime: '2026-04-25T12:00:00',
    day: 1
  },
  {
    id: 'd1-2',
    title: '國文',
    startTime: '2026-04-25T13:30:00',
    endTime: '2026-04-25T15:10:00',
    day: 1
  },
  {
    id: 'd1-3',
    title: '英文',
    startTime: '2026-04-25T16:00:00',
    endTime: '2026-04-25T17:40:00',
    day: 1
  },
  // Day 2: 2026-04-26
  {
    id: 'd2-1',
    title: '專業科目(二)',
    startTime: '2026-04-26T08:30:00',
    endTime: '2026-04-26T10:10:00',
    day: 2
  },
  {
    id: 'd2-2',
    title: '數學',
    startTime: '2026-04-26T11:00:00',
    endTime: '2026-04-26T12:20:00',
    day: 2
  },
  {
    id: 'd2-3',
    title: '專業科目(一)',
    startTime: '2026-04-26T13:30:00',
    endTime: '2026-04-26T15:10:00',
    day: 2
  },
  {
    id: 'd2-4',
    title: '專業科目(二)',
    startTime: '2026-04-26T16:00:00',
    endTime: '2026-04-26T17:40:00',
    day: 2
  }
];