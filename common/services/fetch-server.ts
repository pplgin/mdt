/**
 * 获取socket地址，分一对一、小班课、AI模拟课
 */
import { post, hosts } from '../core/network';
/**
 * 获取小班课socket地址
 * @param {string} lessonUID
 */
export const fetchSmallClassServer = (lessonUID: string) =>
  post({
    url: `${hosts.appGateWay}/kids/api/inClass/api/smallClass/fetchMutilServer`,
    data: {
      lessonUID,
    },
  });

/**
 * 获取1对1socket地址
 * @param {string} lessonUID
 */
export const fetchOneToOneServer = (lessonUID: string) =>
  post({
    url: `${hosts.airGateway}/air-teacher-api/api/load-balancing/fetch-server`,
    data: {
      lessonUID,
    },
  });

/**
 * 获取音视频tokne
 */
export const fetchAvsConfig = ({ channel, lessonUid }: { channel: 'agora' | 'zego'; lessonUid: string }) => {
  return post({
    url: `${hosts.airGateway}/air-teacher-api/api/token/getToken`,
    timeout: 800, // 500ms 超时
    data: {
      channel,
      lessonType: 2,
      lessonUid,
      type: 0,
    },
  });
};
