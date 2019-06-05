// pages/releaseList/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      pageSize:10,
      pageNum:1,
      msgList:[]
    },
    //跳转详情
  gotoBackDetail(e){
    let infoItem = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/releaseList/details?infoItem=' + JSON.stringify(infoItem),
    })
  },
    //获取个人发布
    getMagList(){
      let parms = {
        pageSize: this.data.pageSize,
        pageNum: this.data.pageNum,
        publishOrder:'1',//排序
        msgType: '0',//消息类型
        publishRole: '0'//发布角色
      }
      app.Formdata.post('/api/msg/page', parms, (res) => {
        if (res.code == '0000') {
          this.setData({
            msgList: res.data.data
          })
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getMagList();
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