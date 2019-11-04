'use strict';
let app = getApp();
let DEV_CONFIG = {
<<<<<<< HEAD
  HTTPOPENAPIURL: 'http://2ejprm.natappfree.cc'//
=======
    HTTPOPENAPIURL: 'http://test.360daoliu.com'//
>>>>>>> 3d7119a465e3671ab53cb5ebd184bead84335d0d
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
let CONFIG = DEV_CONFIG; // 选取当前环境配置

module.exports = {
    HTTPOPENAPIURL: CONFIG.HTTPOPENAPIURL // 请求OPENAPI的接口
};
