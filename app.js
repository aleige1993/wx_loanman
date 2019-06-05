//app.js
App({
  onLaunch: function () {
      this.Config = require('/config/index.js');
      this.UserLogin = require('/utils/UserLogin.js');
      this.Formdata = require('/utils/Formdata.js');
      this.Utils = require('/utils/util.js');
      this.Bezier = require('/utils/Bezier.js');
      this.Tools = require('/utils/Tools.js');
      this.Date = require('/utils/Date.js');
      this.Md5 = require('/utils/md5.js'); 
      let userInfo =  this.UserLogin.get('userInfo'); 
      console.log(userInfo)
      if (!userInfo){
          setTimeout(()=>{
              wx.navigateTo({
                  url: '/pages/login/index',
              })
          },3000)
      }else{
          console.log(2)
      }
  },
  globalData: {
  }
})