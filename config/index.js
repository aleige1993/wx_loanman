'use strict';
let app = getApp();
let DEV_CONFIG = {
    HTTPOPENAPIURL: 'http://test.360daoliu.com'//
};
let PROD_CONFIG = {
  HTTPOPENAPIURL: 'https://www.360daoliu.com' // 请求OPENAPI的接口
};
// let OPEN_API = {
//  HTTPOPENAPIURL: app.OPEN_API //切换域名
// }
let CONFIG = DEV_CONFIG; // 选取当前环境配置

module.exports = {
    HTTPOPENAPIURL: CONFIG.HTTPOPENAPIURL // 请求OPENAPI的接口
};
