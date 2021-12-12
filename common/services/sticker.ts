/** 贴纸相关 */
import { post, hosts } from '../core/network';

/**
 * 获取贴纸列表
 * @param param0
 */
export const getStickerList = ({ currentPage = 1, pageSize = 200, role = 'teacher' }) =>
  post({
    url: `${hosts.appGateWay}/kids/resources/kids/resources/pc/paster`,
    data: {
      currentPage,
      pageSize,
      role
    }
  });
