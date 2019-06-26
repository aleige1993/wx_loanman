// pages/releaseList/index.js
let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        limit: 10,
        page: 1,
      msgList:[],
        isNull: false
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
          memberNo: app.UserLogin.get('userInfo') ? app.UserLogin.get('userInfo').memberNo : '',
          limit: this.data.limit,
          page: this.data.page,
        publishOrder:'1',//排序
        msgType: '0',//消息类型
        publishRole: '0'//发布角色
      }
      app.Formdata.post('/api/msg/page', parms, (res) => {
        if (res.code == '0000') {
            if (res.data.data.length <= 0) {
                this.setData({
                    isNull: true
                })
            } else {
                this.setData({
                    isNull: false
                })
            }
          this.setData({
              msgList: this.data.msgList.concat(res.data.data)
          })
        }
      })
        wx.stopPullDownRefresh()
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
        this.setData({
            publishOrder: 1,
            page: 1,
            msgType: 0,
            publishRole: 0,
            msgList: []
        }, () => {
            this.getMagList();
        }) 
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            page: ++this.data.page
        }, () => {
            this.getMagList();
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})