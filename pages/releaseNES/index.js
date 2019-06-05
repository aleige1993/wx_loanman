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
    arrType: [
      {
        lable: '通道挂靠',
        id: 1
      },
      {
        lable: '电子签章',
        id: 2
      },
      {
        lable: '其他',
        id: 3
      }],
    indUser: null,
    indType: null,
    tNum:0,
    freeCount:0,
    showFree:true
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
    let parms = {
      msgType: Number(_data.indType)+1, 
      publishRole: Number(_data.indUser)+1, 
      msgTitle: valueItem.msgTitle,
      content: valueItem.msgConent, 
      publishName: valueItem.msgName,
      publishMobile: valueItem.msgIpone
    }
    app.Formdata.post('/api/msg/publish', parms, (res) => {
      if (res.code == '0000') {
        wx.showToast({
          title: '发布成功!',
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
    this.setData({
      indType: e.detail.value
    })
  },
  //可发布次数
    publishCount(){
        let _this = this;
        app.Formdata.post('/api/msg/free/publish/count',{},(res)=>{
            if(res.code == '0000'){
                this.setData({
                    freeCount: res.data.freeCount
                },()=>{
                    if (res.data.freeCount == 0){
                        wx.showModal({
                            title: '温馨提示',
                            content: '您每个月的发布次数已使用完',
                            cancelText:'我知道了',
                            confirmText:'去购买',
                            success(res) {
                                if (res.confirm) {
                                    wx.navigateTo({
                                        url: '/pages/equity/index',
                                    }) 
                                } else if (res.cancel) {
                                    _this.setData({
                                        showFree:false
                                    }) 
                                }
                            } 
                        })
                    }
                })
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
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
      this.publishCount();
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