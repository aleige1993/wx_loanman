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
      this.getMsgType();
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
      console.log('getMsgType',res);
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