/**
 * 获取zml或zmg课件信息的相关接口
 */
import { post, hosts } from '../core/network';

/**
 * 根据历史 id+bu 获取课程使用课件详情
 * @param { String } bu         课程bu bu = ['ZM_CHILD', 'ZM_1_2_1']stringEnum:"ZM_CHILD", "ZM_1_2_1"
 * @param { Number } historyId  历史 id socket返回的课件ID
 * @param { Number } coursewareType  课件类型 1000502:zml 1000503:订制zmg 1000504:编辑器zmg
 */
export const fetchChildZmxDetail = ({ bu, historyId, coursewareType }: { bu: string; historyId: string; coursewareType: number }) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/lessonCourseware/getByIdAndBu`,
    data: { bu, historyId, coursewareType },
  });
};

/**
 * 根据历史 id 获取课程使用课件详情
 * @param { Number } historyId  历史 id socket返回的课件ID
 */
export const fetchCSWHistoryBatch = (list: Array<{ historyId: string }>) => {
  const lesHistoryIdReqList = list.map((item) => {
    return {
      historyId: item.historyId,
      zmgDetailReq: {
        coursewareLevel: 0,
        zmgKey: hosts.zmgKey,
        params: [],
      },
    };
  });
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/lesCsware/getByHistoryId`,
    data: {
      lesHistoryIdReqList,
    },
  });
};

/**
 * 根据历史 id+bu 获取课程使用课件详情
 * @param { String } bu         课程bu bu = ['ZM_CHILD', 'ZM_1_2_1']stringEnum:"ZM_CHILD", "ZM_1_2_1"
 * @param { Number } historyId  历史 id socket返回的课件ID
 * @param { Number } coursewareType  课件类型 1000502:zml 1000503:订制zmg 1000504:编辑器zmg
 */
export const fetchChildZmxDetailBatch = (list: Array<{ bu: string; historyId: string; coursewareType: number }>) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/lessonCourseware/getByIdAndBuBatch`,
    data: {
      list,
    },
  });
};

/**
 *获取ZMlhost
 */
export function getZmlContentUrl() {
  const pingUris = hosts.zmlHosts.map((url) => {
    // 使用fetch判断域名是否通
    return fetch(url, { mode: 'no-cors' }).then(() => url);
  });
  return Promise.race(pingUris).then((res) => {
    return res;
  });
}

/**
 * 1vn 获取自动带入课件
 * @param data
 */
/**
 * 1vn 获取自动带入课件
 * @param data
 */
export const getDefaultCourseware1vn = (data: Record<string, any>) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/enterClassroom/getAutoCswares`,
    data,
  });
};

/**
 * 获取自动带入课件
 */
export const getDefaultCourseware1vnNew = ({
  lessonId,
  lessonType,
  lessonUid,
}: {
  lessonId: number;
  lessonType: number;
  lessonUid: string;
}) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/autoCsware/fetch`,
    data: {
      lessonId,
      lessonType,
      lessonUid,
      zmgDetailReq: {
        coursewareLevel: 0,
        zmgKey: hosts.zmgKey,
      },
    },
  }).then((res) => {
    return res.map((val) => {
      const { zmgDetail, ...rest } = val;
      return {
        ...rest,
        ...zmgDetail,
      };
    });
  });
};
