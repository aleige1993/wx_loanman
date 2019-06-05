// pages/info/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freeCount:false,
    infoItme:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //去充值
    gotoBack(){
        wx.navigateTo({
            url: '/pages/payway/index',
        })
    },
   // 查询信息详情次数
   getCount(){
       let parms = {}
       app.Formdata.post('/api/msg/free/view/count', parms,(res)=>{
           if(res.code == '0000'){
             if (res.data.freeCount == '0'){
               this.setData({
                 freeCount:false
               })
             }else{
               this.setData({
                 freeCount:true
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
  onLoad: function (options) {
    let infoItme = JSON.parse(options.infoItme) 
    if (infoItme){
      this.setData({
        infoItme:infoItme
      })
    }
      this.getCount();
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