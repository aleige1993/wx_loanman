// pages/login/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isDisabled:false,
        userCode:null,
        bannerList:[],
        isLogin:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    //获取用户信息
    onGotUserInfo(e){ 
        let _this = this;
      wx.getUserInfo({
        success: function (res) { 
          console.log(res);
          let wxUserInfo = res.userInfo
          if (wxUserInfo) {
            app.UserLogin.set('wxUserInfo', wxUserInfo);
              _this.wxLogin()
          }
        }
      })  
    }, 
    //一键登录
    // getPhoneNumber(e){
    //     wx.showLoading({
    //         title: '登录中...',
    //     })
    //     this.setData({
    //         isDisabled:true
    //     })
    //     let parms = {
    //         code: this.data.userCode,
    //         encData: e.detail.encryptedData,
    //         iv: e.detail.iv,
    //         sex: app.UserLogin.get('wxUserInfo') ? app.UserLogin.get('wxUserInfo').gender : '',
    //         avatarUri: app.UserLogin.get('wxUserInfo') ? app.UserLogin.get('wxUserInfo').avatarUrl : ''
    //     }
    //     app.Formdata.post('/api/wx/auth', parms,(res) => {
    //         if(res.code == '0000') {
    //             app.UserLogin.set('userInfo',res.data);
    //             this.wxLogin(res.data.mobile)
    //         } 
    //     });

    // },
      wxLogin(e){
        console.log(e);
        let  _this  = this;
        let wxUserInfo = e.detail.userInfo
        if (wxUserInfo) {
          app.UserLogin.set('wxUserInfo', wxUserInfo);
        }
        wx.showLoading({
            title: '登录中...',
        })
          _this.setData({
            isDisabled:true
        })
        wx.login({
          success(log) {
            if (log.code) {
              console.log(log);
              let parms = {
                code: log.code,
                sex: app.UserLogin.get('wxUserInfo') ? app.UserLogin.get('wxUserInfo').gender : '',
                avatarUri: app.UserLogin.get('wxUserInfo') ? app.UserLogin.get('wxUserInfo').avatarUrl : '',
                nickName: app.UserLogin.get('wxUserInfo') ? app.UserLogin.get('wxUserInfo').nickName : ''
              }
              app.Formdata.post('/api/wx/login', parms, (res) => {
                wx.hideLoading();
                if (res.code == '0000') {
                  app.UserLogin.set('userInfo', res.data);
                  wx.showToast({
                    title: '成功登录！',
                    success() {
                      setTimeout(() => {
                        if (app.globalData.msgId){
                          wx.redirectTo({
                              url: '/pages/info/index?fenx=1&msgId=' + app.globalData.msgId,
                          })
                        }else{
                          wx.switchTab({
                            url: '/pages/index/index',
                          })
                        }
                      }, 2000)
                    }
                  })
                } else {
                    _this.setData({
                    isDisabled: false
                  })
                }
              })
              wx.hideLoading();
            }
          }
        })
    },
    onLoad: function (options) {
        let _this = this;
      // _this.onGotUserInfo();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // let wxUserInfo =  app.UserLogin.get('wxUserInfo');
        // if (!wxUserInfo){
        //     this.setData({
        //         isLogin:true
        //     })
        // }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})