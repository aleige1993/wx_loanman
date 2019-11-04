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
    shareImage:null,
    token:null,
    fenxHome:false,
    islayer:true,
    debugOpen: false,
    wxUserInfo: null,
    userInfo: null
  },
  getUrldeug() {
    app.Formdata.post('/api/wx/debug/open', {}, (res) => {
      if (res.code == '0000') {
        this.setData({
          debugOpen: res.data.debugOpen
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //保存图片
    setImage(){
      let imgSrc = this.data.shareImage;
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
      let _this = this;
      wx.showLoading({
        title: '绘制分享图片中',
        mask: true
      })
      this.setData({
        painting: {
          width: 375,
          height: 555,
          clear: true,
          views: [
            {
              type: 'image',
              url: '/static/images/bgfx.png',
              top: 0,
              left: 0,
              width: 375,
              height: 555
            },
            {
              type: 'image',
              url: _this.data.wxUserInfo.avatarUrl,
              top: 27.5,
              left: 29,
              width: 55,
              height: 55
            }, 
            {
              type: 'text',
              content: `您的好友【${_this.data.wxUserInfo.nickName}】`,
              fontSize: 16,
              color: '#402D16',
              textAlign: 'left',
              top: 33,
              left: 96,
              bolder: true
            },
            {
              type: 'text',
              content: '发现薅羊毛好工具，邀您免费看商机！', 
              fontSize: 15,
              color: '#563D20',
              textAlign: 'left',
              top: 59.5,
              left: 96
            },
            {
              type: 'image',
              url: '/static/images/fxtu.png',
              top: 136,
              left: 42.5,
              width: 290,
              height: 186
            },
            {
              type: 'image',
              url: '/static/images/erwei.png',
              top: 443,
              left: 85,
              width: 68,
              height: 68
            },
            {
              type: 'text',
              content: `【${_this.data.infoItme.msgTypeName}】${_this.data.infoItme.msgTitle}`,
              fontSize: 16,
              lineHeight: 21,
              color: '#383549',
              textAlign: 'left',
              top: 336,
              left: 44,
              width: 287,
              MaxLineNumber: 2,
              breakWord: true,
              bolder: true
            },
            // {
            //   type: 'text',
            //   content: '￥0.00',
            //   fontSize: 19,
            //   color: '#E62004',
            //   textAlign: 'left',
            //   top: 387,
            //   left: 44.5,
            //   bolder: true
            // },
            {
              type: 'text',
              content: `发布时间：${_this.data.infoItme.firstPublishTime}`,
              fontSize: 13,
              color: '#7E7E8B',
              textAlign: 'left',
              top: 387,
              left: 44.5,
              // textDecoration: 'line-through'
            },
            {
              type: 'text',
              content: '长按识别图中二维码',
              fontSize: 14,
              color: '#383549',
              textAlign: 'left',
              top: 470,
              left: 165.5,
              lineHeight: 20,
              MaxLineNumber: 2,
              breakWord: true,
              width: 125
            }
          ]
        }
      })


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
    //制作完成
    eventGetImage(event) {
      console.log(event)
      wx.hideLoading()
      const { tempFilePath, errMsg } = event.detail
      if (errMsg === 'canvasdrawer:ok') {
        this.setData({
          shareImage: tempFilePath
        })
      }
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
              res.data.content = res.data.content.split('\n');
                _this.setData({
                    infoItme: res.data
                },()=>{
                  
                    if (_this.data.token){
                        _this.getCount();
                        _this.getImges();
                    }else{
                        app.globalData.msgId = _this.data.msgId; 
                    } 
                })
            }else{
              _this.setData({
                isshow:false
              })
            }
        })
  },
  onLoad: function (options) {
    let _this = this;
      _this.setData({
        wxUserInfo: app.UserLogin? app.UserLogin.get('wxUserInfo') : null,
        userInfo: app.UserLogin? app.UserLogin.get('userInfo') : null
      })
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
      },800)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // /static/images/logo.png
  onShow: function () {
    this.getUrldeug()
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