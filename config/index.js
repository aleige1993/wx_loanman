'use strict';
let app = getApp();
let DEV_CONFIG = {
    HTTPOPENAPIURL: 'http://pgfv43.natappfree.cc'//
};
let SIT_CONFIG = {
    HTTPOPENAPIURL: 'https://dev.api.songchejr.com' // 请求OPENAPI的接口
};
let PRE_CONFIG = {
    HTTPOPENAPIURL: 'https://pre.openapi.songchewang.com' // 请求OPENAPI的接口
};
let PROD_CONFIG = {
    HTTPOPENAPIURL: 'https://openapi.songchewang.com' // 请求OPENAPI的接口
};
let CONFIG = DEV_CONFIG; // 选取当前环境配置

module.exports = {
    HTTPOPENAPIURL: CONFIG.HTTPOPENAPIURL // 请求OPENAPI的接口
};
