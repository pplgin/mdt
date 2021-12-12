import { hosts, get, post } from '../core/network';

/**
 * 获取上传token
 */
export const getUploadToken = () => {
  return get({
    url: `https://kids-app-gateway.zmlearn.com/kids/publish/api/oss/getToken`,
  });
};

/**
 * 获取上传课件token
 * @param slideHash 文件名称
 * @returns
 */
export const getCoureseImageToken = (slideHash: string) => {
  return get({
    url: `${hosts.appGateWay}/kids/resources/api/sts/lesson-pic?slideHash=${slideHash}`,
  });
};

/**
 * PPT、DOC、PDF 课件Token
 * @param slideHash
 * @returns
 */
export const getCoureseTmplToken = (slideHash: string) => {
  return post({
    url: `${hosts.airGateway}/air-tr-api/api/tr/oss`,
    data: {
      fileName: slideHash,
    },
  });
};
