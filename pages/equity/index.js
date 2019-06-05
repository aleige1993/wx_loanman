// pages/equity/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      viewProducts:[],
      publishProducts:[]

    },
  //获取产品充值
  getProductList() {
    let parms = {
      productType: ''
    }
    app.Formdata.post('/api/product/list', parms, (res) => {
      if (res.code == '0000') {
        this.setData({
          viewProducts: res.data.viewProducts,
          publishProducts: res.data.publishProducts
        })
      }
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getProductList();
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