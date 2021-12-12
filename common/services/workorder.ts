import Axios, { Canceler } from 'axios';
import { post, hosts } from '../core/network';

/**
 * 在线帮助
 * @param {object} data
 */
export const fetchLessonApplyMultiAssist = (data: any) =>
  post({
    url: `${hosts.airGateway}/air-teacher-api/api/work/order/updateDeviceResult`,
    data,
  });

/**
 * 获取工单详情
 * @param {*} les_uid
 */
export const getWorkorder = (lessonUid: string) =>
  post({
    url: `${hosts.airGateway}/air-teacher-api/api/work/order/getTicketDetailByLesUid?lessonUid=${lessonUid}`,
  })
    .then((data) => {
      return data || { state: 0 };
    })
    .catch(() => {
      return { state: 0 };
    });

/**
 *
 * @param lesUid 关闭工单
 * @param account
 */
export const cancelWorkorder = (lesUid: string, account: string) => {
  return post({
    url: `${hosts.airGateway}/air-teacher-api/api/work/order/cancelAssistByLesUid?lesUid=${lesUid}&account=${account}`,
  }).then((response) => {
    return true;
  });
};

/**
 * 根据les_uid查询本堂课已报工单的用户
 * @param lesUid
 */
export const getAppliedUsersByLesUid = (lesUid: any) => {
  return post({
    url: `${hosts.appGateWay}/kids/api/inClass/api/feedback/getAppliedUsersByLesUid?lesUid=` + lesUid,
  });
};

/**
 * 技术支持待处理
 * @param {object} data
 */
export const getTechnologySupportMsg = (data: any) =>
  post({
    url: `${hosts.appGateWay}/kids/api/inClass/api/feedback/getUnconfirmedTicketsByLessonUid`,
    data,
  });

/**
 * 在线帮助
 * {code: 0} 成功
 * {code: 2} 重复提交
 * */
export const fetchLessonUpdataApi = (json: any) => {
  const params = {};
  return post(
    {
      url: `${hosts.appGateWay}/kids/api/inClass/api/lesson/update_device_result`,
      data: Object.assign(params, json),
    },
    { code: 0 }
  );
};
