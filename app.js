//app.js
App({
  onLaunch: function () {
    var _this = this;
    wx.request({
      url: 'http://test.360daoliu.com/api/wx/version/url?version=101',
      method: 'POST',
      success (res) {
        if(res.data.code == '0000') {
          _this.OPEN_API = res.data.data.versionUrl
          _this.Config = require('/config/index.js');
          _this.UserLogin = require('/utils/UserLogin.js');
          _this.Formdata = require('/utils/Formdata.js');
          _this.Utils = require('/utils/util.js');
          _this.Bezier = require('/utils/Bezier.js');
          _this.Tools = require('/utils/Tools.js');
          _this.Date = require('/utils/Date.js');
          _this.Md5 = require('/utils/md5.js');
           let userInfo = _this.UserLogin.get('userInfo');
          _this.getMsgType();
        }
      }
    })
    
    // _this.Config = require('/config/index.js');
    // _this.UserLogin = require('/utils/UserLogin.js');
    // _this.Formdata = require('/utils/Formdata.js');
    // _this.Utils = require('/utils/util.js');
    // _this.Bezier = require('/utils/Bezier.js');
    // _this.Tools = require('/utils/Tools.js');
    // _this.Date = require('/utils/Date.js');
    // _this.Md5 = require('/utils/md5.js');
    // let userInfo = _this.UserLogin.get('userInfo');
    // _this.getMsgType();
    //   if (!userInfo){
    //       setTimeout(()=>{
    //           wx.navigateTo({
    //               url: '/pages/login/index',
    //           })
    //       },3000)
    //   }else{ 
    //   }
  },
  getMsgType(){
    this.Formdata.post('/api/msg/all/type',{},(res)=>{
      if(res.code == '0000'){
        this.UserLogin.set('arrType', res.data.arrType)
        // arrTypeAll.splice(0,0,{ lable: "全部", id: "0" }); 
      } 
    });
  },
  globalData: {
    msgId:null,
    arrType:null,
    showType:null
  }
})