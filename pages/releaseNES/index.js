// pages/releaseNES/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrUser: [
      {
        lable: '服务需求方',
        id: 1
      },
      {
        lable: '服务提供方',
        id: 2
      }],
    arrType: [],
    indUser: null,
    indType: null,
    tNum:0,
    freeCount:0,
    maxPublishCount:0,
    showFree:true,
    cunt:true,
    isDisabled:false,
    mobile: app.UserLogin ? app.UserLogin.get('userInfo').mobile:null,
      msgTitle: '',
      msgConent: '',
      msgName: '',
      layer:false
  },
  getPhoneNumber(e){
      let _this = this;
    wx.login({
      success(log) {
        if (log.code) {
          let parms = {
            code: log.code,
            encData: e.detail.encryptedData,
            iv: e.detail.iv, 
          }
          app.Formdata.post('/api/wx/auth', parms, (res) => {
            if (res.code == '0000') {
                let userInfo = app.UserLogin.get('userInfo');
                userInfo.mobile = res.data.mobile;
                app.UserLogin.set('userInfo', userInfo);
                _this.setData({
                    mobile: res.data.mobile
                })
                
            }
          });

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    }) 
    },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let _this = this;
    let _data = this.data;
    let valueItem = e.detail.value;
    if (_data.indUser == null){
      app.Tools.showToast('请选择发布人角色');
      return false
    }
    if (_data.indType == null) {
      app.Tools.showToast('请选择信息类型');
      return false
    }
    if (!valueItem.msgTitle) {
      app.Tools.showToast('请输入标题');
      return false
    }
    if (!valueItem.msgConent) {
      app.Tools.showToast('请输入详情');
      return false
    }
    if (!valueItem.msgName) {
      app.Tools.showToast('请输入您的姓名');
      return false
    }
    if (!(/^\d{11}$/).test(valueItem.msgIpone)){
      app.Tools.showToast('请输入有效手机号');
      return false
    }
    this.setData({
        isDisabled:true
    })
    console.log(this.data.arrType[this.data.indType]);
    let parms = {
      msgType: this.data.arrType[this.data.indType].id, 
      publishRole: Number(_data.indUser)+1, 
      msgTitle: valueItem.msgTitle,
      content: valueItem.msgConent, 
      publishName: valueItem.msgName,
      publishMobile: valueItem.msgIpone,
      publishComp: valueItem.msgComp
    }
    app.Formdata.post('/api/msg/publish', parms, (res) => {
      if (res.code == '0000') {
        wx.showToast({
          title: '发布成功!',
          success:()=>{
            setTimeout(() => {
                app.globalData.showType = 1;
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 1000)
          }
        })
          this.setData({
              isDisabled: false,
              indUser: null,
              indType: null,
              msgTitle:'',
              msgConent:''
          })
      } 
    })
  },
  //获取输入字数
  textChange(e) {
    let textNum = e.detail.cursor;
    this.setData({
      tNum: textNum
    })
  },
  //筛选类型
  onPickerUser(e) {
    this.setData({
      indUser: e.detail.value
    })
  },
  onPickerType(e) {
    console.log(e);
    this.setData({
      indType: e.detail.value
    })
  },
  //显示
  showlayer() {
    this.setData({
      layer:true
    })
  },
  //隐藏
  closelayer () {
    this.setData({
      layer:false,
      showFree: false
    })
  },
  //successfunc
  successfunc (){
    wx.navigateTo({
      url: '/pages/equity/index?types=2',
    }) 
  },
  //可发布次数
    publishCount(){
        let _this = this;
        app.Formdata.post('/api/msg/free/publish/count',{},(res)=>{
            if(res.code == '0000'){
                this.setData({
                    freeCount: res.data.freeCount,
                    maxPublishCount: res.data.maxPublishCount
                },()=>{
                    if (res.data.freeCount == 0){
                        _this.showlayer();
                        // wx.showModal({
                        //     title: '温馨提示',
                        //     content:  ' 为保证发布信息的质量，您每天可免费发布' + res.data.maxPublishCount+'条信息，剩余'+res.data.freeCount+'条',
                        //     cancelText:'我知道了',
                        //     confirmText:'去购买',
                        //     success(res) {
                        //         if (res.confirm) {
                        //             wx.navigateTo({
                        //               url: '/pages/equity/index?types=2',
                        //             }) 
                        //         } else if (res.cancel) {
                        //             _this.setData({
                        //                 showFree:false
                        //             }) 
                        //         }
                        //     } 
                        // })
                    }
                    // else{
                    //   wx.showModal({
                    //     title: '温馨提示',
                    //     content: ' 为保证发布信息的质量，您每天可免费发布' + res.data.maxPublishCount+'条信息，剩余'+res.data.freeCount+'条',
                    //     showCancel: false,
                    //     confirmText: '我知道了',
                    //     success(res) {
                           
                    //     }
                    //   })
                    // }
                })
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
onTabItemTap:function(){
    this.setData({
      indUser: null,
      indType: null,
      msgTitle: '',
      msgConent: ''
    })
    this.publishCount();
},
  onLoad: function (options) {
    this.setData({
      arrType: app.UserLogin.get('arrType')
    })
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

  }
})