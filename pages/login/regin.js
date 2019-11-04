// pages/login/regin.js
 
 let app = getApp();
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

  },
  formSubmit(e){
    console.log(e);
    let val = e.detail.value;
    if (val.ipone==''){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none' 
      })
      return false
    }
    if (val.password == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none' 
      })
      return false
    }
    app.Formdata.post('/api/wx/common/login',{
      'mobile': val.ipone,
      'password': val.password
    },(res)=>{
      if(res.code == '0000'){
        app.UserLogin.set('userInfo', res.data);
        wx.showToast({
          title: '登录成功！',
          success(){
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
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