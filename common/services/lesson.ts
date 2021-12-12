import { post, hosts } from '../core/network';

/**
 * 获取课程信息
 * @param {any} {lessonUid, mobile}
 * @param {string} {lessonUid, 课程lessonUid}
 * @param {string} {mobile, 手机号}
 */
export const fetchLessonInfo = ({ lessonUid }: { lessonUid: string }) => {
  return post({
    url: `${hosts.airGateway}/air-teacher-api/api/index/lesson/getLessonAndVideoUid`,
    data: {
      lessonUid,
    },
  });
};

/**
 *
 * @param params 获取后台配置，判断是否显示上传入口
 */
export const getUploadCoursewareConfig = (params: Record<string, any>) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/grayApi/toc/gray/findGrayEffectByCodeAndParam`,
    data: {
      grayCode: 'GRAY_TEACHER_UPLOAD',
      map: params,
    },
  });
};

/**
 * 获取下节课的所有学生标签 和课程简介
 * @param {object} data={ "lessonId": 7821241, "teacherId": 12}
 */
export const getNextLessonAndstuLabel = (data: { lessonId: string; teacherId: number }) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/teacher/api/teacherHomePage/findNextLessonsStudentLabel`,
    data,
  });
};
