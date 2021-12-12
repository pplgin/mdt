/**
 * 黑板
 */
declare module 'zmSketchpad' {
  export const zmSketchPad: any;
  export const roboPenDataPush: any;
  export const hideRoboPen: any;
}

declare interface Window {
  process: any;
  NODE_ENV: any;
  userInfo: any;
  ZM_JSSDK: any;
  OSS: any;
  i18n: any;
}

declare module '*.scss' {
  const styles: any;
  export default styles;
}

/**
 *用户信息
 *
 * @interface UserProps
 */
declare interface IUserProps {
  userId: number;
  mobile: string;
  nickname?: string;
  videoUid: string | number;
  accessToken: string;
  muted: boolean;
  bgi: string;
  role?: string;
  realName?: string;
  name?: string;
}

/**
 *学生信息
 *
 * @interface StudentInfoProps
 */
declare interface StudentInfoProps {
  id: number;
  online: boolean | number;
  avatar: null;
  grade: string;
  mobile: string;
  name: string;
  sellerId: number;
  sellerMobile: string;
  sellerName: string;
  sellerUserId: number;
  state: string;
  videoUid: string | number;
  userId: number;
  socketId: string;
  clientVersion: string;
  bgi?: string;
  upstairCount?: number;
  isBackground?: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
  isRandomSelected: boolean;
  accountNumber?: string;
}

/**
 * 课程信息定义
 *
 * @interface LessonInfo
 */
declare interface LessonInfoConfig {
  classId: number;
  classMode: string;
  classRank: string | null;
  classRankStr: string | null;
  courseName: string | null;
  courseType: number;
  duration: number;
  endTime: number;
  gradeLevel: string;
  lessonGrade: string;
  lessonId: number;
  lessonType: 'regular-lesson' | 'test-lesson' | 'debug-lesson' | 'virtual-lesson';
  lessonUid: string;
  startTime: number;
  state: string;
  studentInfoList: Array<Record<string, any>>;
  subject: string;
  teaBu: string;
  teacherInfo: Record<string, any>;
  type: number;
}

declare interface ILessonInfo {
  lessonId: number;
  courseId: number;
  lessonUid: string;
  duration: number;
  lessonType: 1 | 2;
  subject: string;
  subjectCode: string;
  startTime: string;
  endTime: string;
}

/**
 *  音视频数据装换
 */
declare interface IChannelTranslateUid {
  userId: string; // 对应user内的id
  appCode: string; //	bu（必输）参考bu定义
  channel: string; // 频道
  mobile: string; // 用户手机号
  lessonUid: string; // 课程lessonUid
}

declare type IPageLayoutType = 0 | 1;
