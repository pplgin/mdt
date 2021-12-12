/**
 * 项目域名配置，默认配置正式环境域名，测试环境和uat环境更换配置
 */
const BUILD_TYPE = process.env.BUILD_TYPE;
let hostConfig = {
  uploaddoc: 'https://chat-doc.zmlearn.com',
  appGateWay: 'https://kids-app-gateway.zmlearn.com',
  airGateway: 'https://app-gateway.air-class.com',
  apiHost: 'https://chat.zmlearn.com',
  backupSocketHost: 'https://ws-kids.zhangmenlearn.com',
  zmlHosts: ['https://zml.zmlearn.com', 'https://zml-origin.zmlearn.com', 'https://chat.zmlearn.com/zmlplayer'],
  imageZmlearnHost: 'https://image.zmlearn.com/',
  zmgKey: '7ddbf362ea8446c7a2f1f31dc230d41d',
};
// 默认根据域名配置地址，可以通过 window.resetConfig 手动切换配置，用于打包后测试不同环境代码的执行结果
if (BUILD_TYPE === 'test') {
  hostConfig = {
    ...hostConfig,
    zmgKey: 'df486fcee253415c9fd669053aa490ba',
    uploaddoc: 'https://x-chat-doc-test.zmlearn.com',
    appGateWay: 'https://kids-app-gateway-test.zmlearn.com',
    airGateway: 'https://air-class-gateway-fat-alhz.inzm.com',
    apiHost: 'https://x-chat-test.zmlearn.com',
    backupSocketHost: 'https://ws-kids.zmaxis.com',
    zmlHosts: ['https://zml-test.zmlearn.com'],
  };
}

if (BUILD_TYPE === 'uat') {
  hostConfig = {
    ...hostConfig,
    zmgKey: '7dec187fc57b471680afb09bb6905539',
    uploaddoc: 'https://chat-doc.uat.zmops.cc',
    apiHost: 'https://chat.uat.zmops.cc',
    appGateWay: 'https://kids-app-gateway.uat.zmops.cc',
    airGateway: 'https://air-class-gateway-uat-alsh.inzm.com',
    backupSocketHost: 'https://ws-kids.uat.zmops.cc',
    zmlHosts: ['https://zml.uat.zmops.cc'],
  };
}
export default hostConfig;
