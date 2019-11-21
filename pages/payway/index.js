// pages/payway/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewProducts:[],
    publishProducts:[],
    proIndex:2
  },
  //获取产品
  getProduct(e){ 
    let proIndex = e.currentTarget.dataset.index;
    this.setData({
      proIndex: proIndex
    })
  },
  //去支付
    payment(){
      let proIndex = this.data.proIndex;
      let productList = this.data.viewProducts;
        wx.login({
            success(e){ 
                if(e.code){
                    let parms = {
                        code:e.code,
                        totalAmount: productList[proIndex].fee,
                        out_trade_no: productList[proIndex].productNo,
                        'Type': productList[proIndex].productType
                    }
                    app.Formdata.post('/api/wx/pay',parms,(res) => {
                        console.log(res)
                        if(res.code == '0000') {
                            //跳转支付成功页面
                        }
                    })
                }
            }
        })
    },
    //获取产品充值
    getProductList(){
        let parms = {
            productType:'1'
        }
        app.Formdata.post('/api/product/list', parms, (res)=>{ 
            if(res.code == '0000'){
              this.setData({
                viewProducts: res.data.viewProducts
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