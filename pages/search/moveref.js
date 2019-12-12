// pages/search/moveref.js
let  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.iteminfo){
      let iteminfo = JSON.parse(options.iteminfo)
      this.setData({
        iteminfo: iteminfo
      },()=>{
        wx.setNavigationBarTitle({
          title: iteminfo.tpdata[0].msgTypeName,
        })
      })
    }

  },
  gotoBackInfo(e) {
    let infoItme = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/info/index?msgId=' + infoItme.msgId,
      success: () => {
        app.globalData.showViews = infoItme.msgId
      }
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
    let _this = this;
    if (this.data.iteminfo.tpdata.length > 0) {
      if (app.globalData.showViews) {
        let viewID = app.globalData.showViews;
        let viewCout = null;
        let viewInd = null;
        app.Formdata.post('/api/msg/query/count', {
          "msgId": viewID
        }, (res) => {
          if (res.code == "0000") {
            viewCout = res.data.viewCount
            this.data.iteminfo.tpdata.map((item, index) => {
              if (item.msgId == viewID) {
                viewInd = index
                let key = "iteminfo.tpdata[" + viewInd + "].viewCount"
                _this.setData({
                  [key]: viewCout
                }, () => {
                  app.globalData.showViews = null
                })
              }
            })
          } else {
            app.globalData.showViews = null
          }
        })
      }
    }
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