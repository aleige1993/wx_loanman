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
    msgItem:'',
    cunt:true,
    showFree:true,
    isDisabled: false
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let _this = this;
    let _data = this.data;
    let valueItem = e.detail.value;
    let indUser = Number(_data.indUser)+1;
    let indType = Number(_data.indType) + 1;
    console.log(indUser)
    if (indUser == '') {
      app.Tools.showToast('请选择发布人角色');
      return false
    }
    if (indType == '') {
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
    if (!(/^\d{11}$/).test(valueItem.msgIpone)) {
      app.Tools.showToast('请输入有效手机号');
      return false
    }
      this.setData({
          isDisabled: true
      })
    let parms = {
      msgId: _data.msgItem.msgId,
      msgTitle: valueItem.msgTitle,
      content: valueItem.msgConent,
      msgType: indType, 
      publishRole: indUser, 
      publishName: valueItem.msgName,
      publishMobile: valueItem.msgIpone
    }
      app.Formdata.post('/api/msg/republish',parms,(res)=>{
      if(res.code == '0000'){
        wx.showToast({
          title: '发布成功!',
            success: () => {
                setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                }, 1000)
            }
        })
      }else{
          this.setData({
              isDisabled: false
          })
      }
    })
   
  },
  //获取输入字数
  textChange(e){
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
  /**
   * 生命周期函数--监听页面加载
   */
    //可发布次数
    publishCount() {
        let _this = this;
        app.Formdata.post('/api/msg/free/publish/count', {}, (res) => {
            if (res.code == '0000') {
                this.setData({
                    freeCount: res.data.freeCount
                }, () => {
                    if (res.data.freeCount == 0) {
                        
                        wx.showModal({
                            title: '温馨提示',
                            content: '为保证发布信息的质量，您每天可免费发布' + res.data.maxPublishCount + '条信息，剩余' + res.data.freeCount + '条',
                            cancelText: '我知道了',
                            confirmText: '去购买',
                            success(res) {
                                if (res.confirm) {
                                    wx.navigateTo({
                                      url: '/pages/equity/index?types=2',
                                    })
                                } else if (res.cancel) {
                                    _this.setData({
                                        showFree: false
                                    })
                                }
                            }
                        })
                    }
                    //  else {
                    //   wx.showModal({
                    //     title: '温馨提示',
                    //     content: '为保证发布信息的质量，您每天可免费发布' + res.data.maxPublishCount + '条信息，剩余' + res.data.freeCount + '条',
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
  onLoad: function (options) {
    let msgItem = JSON.parse(options.msgItem);
    if (msgItem){
      this.setData({
        msgItem: msgItem,
        indUser: Number(msgItem.publishRole) - 1,
        indType: Number(msgItem.msgType) - 1,
        tNum: msgItem.content.length
      })
    } 
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