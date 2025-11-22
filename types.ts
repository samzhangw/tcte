export interface ScheduleItem {
  period: string;
  time: string;
  subject: string;
  category: string;
  isPrep?: boolean;
}

export interface DaySchedule {
  date: string;
  weekday: string;
  events: ScheduleItem[];
}

export enum ResourceType {
  MATH_B = 'Math B (高職數學B)',
  MATH_C = 'Math C (高職數學C)'
}

export interface ResourceLink {
  title: string;
  type: ResourceType;
  tags: string[];
  url: string;
}