// pages/search/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrType:[], //枚举
    seaText:'',
    bulr: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      arrType: app.UserLogin.get('arrType')
    })
  },
  getSearch(e){
    let lablelist = e.currentTarget.dataset.lable
    // console.log(e)
    wx.navigateTo({
      url: '/pages/search/defsearch?lablelist=' + JSON.stringify(lablelist),
    })
  },
  setdatacof(e){
    let val = e.detail.value; 
    this.setData({
      seaText:val
    })
  },
  bindCof(){
    let coftext = this.data.seaText;
    if (coftext == '') {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: "/pages/search/result?cofid=&coftext=" + coftext,
      })
    }
  },
  updataCof(e){
    let coftext = e.detail.value
    // let coftext = this.data.seaText;
    if (coftext == ''){
      wx.showToast({
        title: '请输入搜索内容',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: "/pages/search/result?cofid=&coftext=" + coftext,
      })
    }
  },
  focusBind(e){
    this.setData({
      bulr: false
    })
  },
  bllurBind (e) {
   let val = e.detail.value;
    if(val){
      this.setData({
        bulr: false,
        // seaText:val
      })
    }else{
      this.setData({
        bulr: true
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
    this.setData({
      seaText:'',
      bulr:true
    })
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