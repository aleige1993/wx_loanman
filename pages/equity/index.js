// pages/equity/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      viewProducts:[],
      publishProducts:[],
      types:0,
      ispay:false
    },
   //支付
    palyMoeny(e){
        console.log(e);
        let _this = this;
        this.setData({
            ispay:true
        })
        let productNo = e.currentTarget.dataset.productno;
        wx.login({
            success(data){
                if(data.code){
                    let pames = {
                        code:data.code,
                        productNo:productNo
                    }
                    app.Formdata.post('/api/wx/pay', pames,(res)=>{
                        console.log(res)
                        if (res.code == '0000') {
                            wx.requestPayment({
                                timeStamp: res.data.timeStamp,
                                nonceStr: res.data.nonceStr,
                                package: res.data.repay_id,
                                signType: res.data.signType,
                                paySign: res.data.paySign,
                                success(rult) {
                                   wx.navigateTo({
                                       url: '/pages/payway/result?isTrue=1',
                                   })
                                },
                                fail(err) {
                                    wx.navigateTo({
                                        url: '/pages/payway/result?isTrue=2&productNo=' + productNo,
                                    })
                                }
                            })
                        } else {
                            wx.showModal({
                                content: '支付失败',
                                showCancel: false,
                                confirmText: '我知道了',
                                success(res) {
                                    if (res.confirm) {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            },
            fail(err){
                wx.showToast({
                    title: '支付失败',
                    icon:'none'
                })
                _this.setData({
                    ispay: false
                })
            }
        })
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
      if (options.types){
        this.setData({
          types: options.types
        })
      }
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
        this.setData({
            ispay: false
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