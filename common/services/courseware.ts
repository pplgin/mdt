import { getClientVersion } from '../utils/native-helper';
import { post, hosts } from '../core/network';

/**
 * 根据父节点，获取个人课件库某个节点数据列表
 * @param {number} parentId parentId
 */
export const getMyCoursewareList = ({ size = 20, page = 0 }) => {
  return post({
    url: `${hosts.airGateway}/air-tr-api/api/tr/personal/resource`,
    data: {
      data: {
        convertState: 1,
        onlineState: 1,
      },
      page,
      size,
    },
  });
};

/**
 * 获取少儿课程体系， 课程内容
 * @param { editionId }               版本ID      1
 * @param { gradeDictCode }           年纪code    PRIMARY_SCHOOL_1
 * @param { subjectChineseName }      学科中文名   语文
 *
 */
export const getZmCoursewareSystem = (data: {
  editionId: number;
  gradeDictCode: string;
  subjectChineseName?: string;
  subjectDictCode?: string;
  type?: number;
}) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/api/ZmChildCourseSystem/findCourseSystemByType`,
    data,
  }).then((response) => {
    return Array.isArray(response) ? response : [];
  });
};

/** 根据课程内容+目录层级获取掌门课件库某个节点数据列表
 * @param { courseSystemId }    Number  课程体系接口返回的ID
 * @param { level }             Number  目录层级
 */
export const getZmCoursewareList = (data: { courseSystemId: number; level?: number; isTestLesson?: boolean; lessonMode?: number }) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/zmCourseware/getListByConditon`,
    data: {
      digitVersion: getClientVersion(),
      ...data,
    },
  }).then((data) => {
    return Array.isArray(data) ? data : [];
  });
};

/**
 * 获取少儿年级列表
 * @param {} subjectChineseName
 */
export const getChildGradeBySubject = (subjectChineseName: string) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/api/grade/findGradeBySubjectChineseName`,
    data: { subjectChineseName },
  }).then((data) => {
    return Array.isArray(data) ? data : [];
  });
};

/**
 * 获取少儿版本
 * @param { string }    gradeDictCode  年级code    PRIMAY_SCHOOL_1
 * @param { string }    subjectChineseName  学科中文名   数学
 * @param { string }    subjectDictCode  ???
 */
export const getChildEditionBySubject = (data: { gradeDictCode: string; subjectChineseName: string; subjectDictCode?: string }) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/api/zmChildEdition/findAllOnline`,
    data,
  }).then((res) => {
    return Array.isArray(res) ? res : [];
  });
};

/**
 * 课件资料存储
 * @param params
 */
export const postUploadCourseWare = ({ name, ossUrl, size }: { name: string; ossUrl: string; size: number }) => {
  return post({
    url: `${hosts.airGateway}/air-tr-api/api/tr/personal/upload`,
    data: {
      name,
      ossUrl,
      size,
    },
  });
};

/**
 * 获取课件转换进度
 * @param param0
 * @returns
 */
export const getUploadCourseWareState = (id: number) => {
  return post({
    url: `${hosts.airGateway}/air-tr-api/api/tr/personal/converterProcessing`,
    data: {
      id,
    },
  });
};

/**
 * 获取课件的详细信息
 */
export const getDocsApi = (ids: []) => {
  return post({
    url: `${hosts.airGateway}/air-tr-api/api/tr/personal/batchPreview`,
    data: {
      ids,
    },
  });
};

/**
 * 获取自动带入课件
 * @returns
 */
export const getAutoDoc = ({ lessonId, lessonType }: { lessonId: number; lessonType: number }) => {
  return post({
    url: `${hosts.airGateway}/air-teacher-api/api/prepare/lesson/getPrepareLessonDetail`,
    data: {
      lessonId,
      lessonType,
    },
  });
};
