import { post, hosts, get } from '../core/network';

/**
 * 获取页面全局配置
 * @param {any} param0
 * @param {Array} grayCodeList 配置开关(比如美颜，开启显卡白名单)
 */
export function getAppConfig({
  grayCodeList = [],
  map = {},
  planCodeList = [],
}: {
  grayCodeList: Array<string>;
  map?: object;
  planCodeList: Array<string>;
}) {
  return post({
    url: `${hosts.appGateWay}/kids/api/grayApi/toc/gray/findMany`,
    data: {
      grayCodeList,
      map,
      planCodeList,
    },
    timeout: 800,
  });
}
/**
 * 上报工单数据
 * @param data 上报工单数据
 */
export const joinMultiGroup = (data: Record<string, any>) =>
  post({
    url: `${hosts.appGateWay}/kids/api/inClass/api/userDevice/oneToManyJoinGroup`,
    data,
  });

/**
 * 在线帮助
 * @param {object} data
 */
export const fetchLessonApplyMultiAssist = (data: Record<string, any>) =>
  post(
    {
      url: `${hosts.appGateWay}/kids/api/inClass/api/lesson/applyMultiAssistWithResult`,
      data,
    },
    { code: '1' }
  );

/**
 * 在线帮助
 * @param {object} data
 */
export const fetchSellerApplyAssist = (data: Record<string, any>) =>
  post(
    {
      url: `${hosts.appGateWay}/kids/api/inClass/internal/api/1vn/applyAssist4CCCR`,
      data,
    },
    { code: '1' }
  );

/**
 * 检测网络延迟
 * @param  {[type]} checkNetStat [description]
 */
export const checkNetStat = () => {
  const sTime = Date.now();
  return post({
    url: `${hosts.appGateWay}/kids/lessons/load-balancing/ping`,
  }).then(() => Date.now() - sTime);
};

/**
 * 通过userId获取销售手机号
 * @param userId
 */
export function getMobileByUserId(userId: number) {
  return post({
    url: `${hosts.appGateWay}/kids/teacher/outclass/user/mobileByUserId`,
    data: { userId },
  });
}
