// pages/info/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxFreeCount:0,
    freeCount:false,
    infoItme:null,
    layer:false,
    imgdown:false,
    fenx:false,
    isbut:false,
    iphone:true,
    isIndex:false,
    imgUrl:null,
    token:null,
    fenxHome:false,
    islayer:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //保存图片
    setImage(){
        let imgSrc = this.data.imgUrl;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                          
                        }
                    })
                }
            }
        });
        wx.downloadFile({
            url: imgSrc,
            success: function (res) { 
                //图片保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (data) {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        },()=>{
                            this.hideImg();
                        })
                    },
                    fail: function (err) {
                        if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
                            wx.openSetting({
                                success(settingdata) {
                                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                    } else {
                                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                    }
                                }
                            })
                        }
                    },
                    complete(rult) {
                        if (rult.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                            wx.openSetting({
                                success(settingdata) {
                                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                    } else {
                                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    },
 //切换显示
    toggle(e){
        this.setData({
            layer:true,
            fenx:true
        })
    },
    hideTogg(e){
        this.setData({
            layer: false,
            fenx: false
        }) 
    },
    showBut(e){
        this.setData({
            imgdown:true,
            layer:true,
            fenx:false
        })
    },
    hideImg(e) {
        this.setData({
            layer: false,
            imgdown: false,
            fenx: false
        })
    },
    //获取图片
    getImges(){
        let msgId = this.data.infoItme.msgId;
        app.Formdata.post('/api/msg/share', { msgId: msgId }, (res) => { 
            if (res.code == '0000') {
                this.setData({
                    imgUrl: res.data.url
                })
            }
        })
    },
  //去充值
    gotoBack(){
        wx.navigateTo({
            url: '/pages/equity/index?types=1',
        })
    },
   // 查询信息详情次数
   getCount(){
       let parms = {
           msgId: this.data.infoItme.msgId
       }
       app.Formdata.post('/api/msg/free/view/count', parms,(res)=>{
           if(res.code == '0000'){
             if (res.data.freeCount == '0'){
               if(res.data.isRepeat == '1'){
                 this.setData({
                   freeCount: true
                 })
               }else{
                 this.setData({
                   freeCount: false,
                   isbut: true,
                   maxFreeCount: res.data.maxFreeCount
                 })
               }
             }else{
               this.setData({
                 freeCount:true
               })
             }
               if (res.data.freeCount == '-2'){
                   this.setData({
                       freeCount: true,
                       isbut:false,
                       iphone:false
                   })
               }
             if (res.data.freeCount == '-1') {
               this.setData({
                 freeCount: true,
                 isbut: false
               })
             }
           }
       })
   },
   //拨打手机号
  telIpone(){
    wx.makePhoneCall({
      phoneNumber: this.data.infoItme.publishMobile
    })
  },
  //点击去登录
  gotoLogin(){
    let msgId = this.data.msgId
    app.globalData.msgId = msgId;
    wx.redirectTo({
      url: '/pages/login/index',
    })
  },
  //获取详情
    getMsgInfo(msgId){
        let _this = this;
        app.Formdata.post('/api/msg/view',{msgId: msgId},(res)=>{
            if(res.code == '0000'){
                this.setData({
                    infoItme: res.data
                },()=>{
                    if (_this.data.token){
                        this.getCount();
                        this.getImges();
                    }else{
                        app.globalData.msgId = _this.data.msgId;
                        this.setData({

                        })
                    } 
                })
            }else{
              this.setData({
                isshow:false
              })
            }
        })
  },
  onLoad: function (options) {
    let _this = this;
      wx.showLoading({
        title: '加载中...',
        mask:true
      })
      if (options.fenx == 1){
          this.setData({
              fenxHome:true
          })
      }
      if (options.msgId){
        app.globalData.msgId = null;
        let token = app.UserLogin.get('userInfo') ? app.UserLogin.get('userInfo').token : false
        this.setData({
          msgId: options.msgId,
            token: token
        })
        this.getMsgInfo(options.msgId); 
      }
      setTimeout(function(){
        wx.hideLoading();
        _this.setData({
          islayer:false
        })
      },2000)
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
      let infoItme = this.data.infoItme;
      let magtype = infoItme.msgTypeName;
      let img = this.data.imgUrl
      let _this = this;
      return {
          title: '[' + magtype+']'+infoItme.msgTitle,
          path: '/pages/info/index?fenx=1&msgId=' + infoItme.msgId,
          imageUrl: img
      }
  }
})