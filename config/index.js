'use strict';
let app = getApp();
let DEV_CONFIG = {
    HTTPOPENAPIURL: 'http://test.360daoliu.com'//
};
let SIT_CONFIG = {
    HTTPOPENAPIURL: 'https://dev.api.songchejr.com' // 请求OPENAPI的接口
};
let PRE_CONFIG = {
    HTTPOPENAPIURL: 'https://pre.openapi.songchewang.com' // 请求OPENAPI的接口
};
let PROD_CONFIG = {
  HTTPOPENAPIURL: 'https://www.360daoliu.com' // 请求OPENAPI的接口
};
let OPEN_API = {
  HTTPOPENAPIURL: app.OPEN_API //切换域名
}
let CONFIG = OPEN_API; // 选取当前环境配置

module.exports = {
    HTTPOPENAPIURL: CONFIG.HTTPOPENAPIURL // 请求OPENAPI的接口
};
