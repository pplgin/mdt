import { post, hosts } from '../core/network';

/**
 * @param courseType number 课程类型：1 一对一，3 小班课 ,
 * @param lessonId number 课程id
 */
export const selectAfterClassEvaluations = (courseType: number, lessonId: number) =>
  post({
    url: `${hosts.appGateWay}/kids/teacher/outclass/student/selectAfterClassEvaluations`,
    data: { courseType, lessonId },
  });

/**
 *
 * @param data any
 */
export const saveAfterClassEvaluations = (data: any) =>
  post({
    url: `${hosts.appGateWay}/kids/teacher/outclass/student/saveAfterClassEvaluations`,
    data,
  });

