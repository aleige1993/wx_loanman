// pages/search/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrType: [], //枚举
    seaText: '',
    bulr: true,
    lablelist:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let option = JSON.parse(options.lablelist)
    this.setData({
      lablelist: option ? option: null
    },() => {
      wx.setNavigationBarTitle({
        title: option ? option.lable+'搜索' : '客企互联旺'
      })
    })
  },
  updataCof(e) {
    console.log(e)
    let coftext = e.detail.value
    // let coftext = this.data.seaText;
    if (coftext == '') {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: `/pages/search/result?cofid=${this.data.lablelist.id}&coftext=${coftext}`,
      })
    }
  },
  focusBind(e) {
    this.setData({
      bulr: false
    })
  },
  bllurBind(e) {
    let val = e.detail.value;
    console.log(val);
    if (val) {
      this.setData({
        bulr: false
      })
    } else {
      this.setData({
        bulr: true
      })
    }
  },
  setdatacof(e) {
    let val = e.detail.value;
    this.setData({
      seaText: val
    })
  },
  bindCof() {
    let coftext = this.data.seaText;
    console.log(coftext)
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
      seaText: '',
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