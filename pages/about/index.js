// pages/about/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    //点击图片
  previewImage(){
    wx.previewImage({
      current: '/static/images/erweima.png', // 当前显示图片的http链接
      urls: ['/static/images/erweima.png'] // 需要预览的图片http链接列表
    })
  },
  //复制邮箱
  copeEmail(){
    this.cope('daisutong@tom.com');
  },
  //复制公众号
  copeWxNo(){
    this.cope('BTHaoShengHuo');
  },
  cope(text){
      wx.setClipboardData({
          data: text,
          success(res) {
              wx.getClipboardData({
                  success(res) {
                      console.log(res.data)
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