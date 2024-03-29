
let FormdataConfig = require('../config/index.js');
let UserLogin = require('../utils/UserLogin.js');
let HTTPOPENAPIURL = FormdataConfig.HTTPOPENAPIURL;

let app = getApp();
if (!app) {
  setTimeout(function () {
    app = getApp();
  })
}

let post = (url, data, callback) => {
  wx.request({
    method: 'POST',
    url: HTTPOPENAPIURL + url,
    data: {
      'message':JSON.stringify(data)
    },
    header: {
        'content-type': 'application/x-www-form-urlencoded',
      'token': UserLogin.get('userInfo') ? UserLogin.get('userInfo').token : '',
      'userPhone': UserLogin.get('userInfo') ? UserLogin.get('userInfo').mobile : ''
    },
    success(res) {
      let data = res.data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      if (data.code === '0004') {
          app.Tools.showToast(data.message);
        setTimeout(function () {
            wx.redirectTo({
                url: '/pages/login/index',
          })
        }, 2000);
        return false;
      }
      if (typeof data.success === 'boolean') {
        data.success = data.success ? 'true' : 'false';
      }
      if (data.success && data.success === 'false') {
        app.Tools.showToast(data.message);
      }
      callback(data);
    },
    fail(e) {
      app.Tools.showToast('网络异常, 请稍后再试');
    } 
  });
}

let get = (url, data, callback) => {
  wx.request({
    method: 'GET',
    url: HTTPOPENAPIURL + url,
    data: {
      'message': JSON.stringify(data)
    },
    header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': UserLogin.get('userInfo') ? UserLogin.get('userInfo').token : '',
        'userPhone': UserLogin.get('userInfo') ? UserLogin.get('userInfo').mobile : ''
    },
    success(res) {
      let data = res.data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      if (data.code === '0004') {
          app.Tools.showToast(data.message);
        setTimeout(function () {
            wx.redirectTo({
                url: '/pages/login/index',
            })
        }, 2000);
        return false;
      }
      if (typeof data.success === 'boolean') {
        data.success = data.success ? 'true' : 'false';
      }
      if (data.success && data.success === 'false') {
          if (data.message == ''){

          }else{
              app.Tools.showToast(data.message);
          }
      }
      callback(data);
    },
    fail(e) {
      app.Tools.showToast('网络异常, 请稍后再试');
    } 
  });
}

let uploadFile = (files, callback) => {
  let uploadFilePath = [];
  let uploadSuccessCount = 0;
  wx.showLoading({
    title: '上传中, 请稍后',
  });
  files.tempFilePaths.map((item, index) => {
    wx.uploadFile({
      url: HTTPOPENAPIURL + '/openapi/common/file/upload',
      filePath: item,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded',
        // 'appId': HTTPHEADER_APPID,
        // 'version': HTTPHEADER_APPVERSION,
        // 'sign': HTTPHEADER_APPSIGN
      },
      name: 'files',
      formData: {
        'message': '{}'
      },
      success: function (res) { 
        wx.hideLoading(); 
        let data = res.data;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        if (data.success && data.success === 'false') {
          app.Tools.showToast(data.message);
          return false;
        }
        uploadFilePath[index] = JSON.parse(res.data).data[0];
        uploadSuccessCount++;
        // 回调
        if (files.tempFilePaths.length === uploadSuccessCount) {
          callback(uploadFilePath);
        }
      },
      fail: function () {
        wx.hideLoading();
        app.Tools.showToast('上传失败, 请重新上传');
      }
    })
  });
}

module.exports = {
  post: post,
  get: get,
  uploadFile: uploadFile
} 