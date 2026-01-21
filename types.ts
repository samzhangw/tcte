export interface ScheduleItem {
  id: string;
  category: string;
  title: string;
  startDate: string; // ISO 8601 format
  endDate?: string;  // ISO 8601 format
  description?: string;
  isExamDay?: boolean; // Flag for the main event
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export interface ExamSession {
  id: string;
  title: string;
  startTime: string; // ISO 8601 for the specific exam time
  endTime: string;   // ISO 8601 for the specific exam time
  day: 1 | 2;
}