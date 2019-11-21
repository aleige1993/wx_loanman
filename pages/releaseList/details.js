// pages/releaseList/details.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      msgItem:null,
      layer:false
    },
    //刷新
  msgRefresh(){
    let parms = {
      msgId: this.data.msgItem.msgId
    }
    app.Formdata.post('/api/msg/fresh',parms,(res)=>{
      if(res.code == '0000'){
        wx.showToast({
          title: '刷新成功！',
        })
      }
    })
  },
  
  //显示
  showlayer () {
    this.setData({
      layer:true
    })
  },
  //隐藏
  closelayer () {
    this.setData({
      layer:false
    })
  },
  //下架
  msgDown(){
    let parms = {
      msgId: this.data.msgItem.msgId
    }
    app.Formdata.post('/api/msg/down',parms,(res)=>{
      if (res.code == '0000') {
        this.setData({
            'msgItem.status':2
        },()=>{
          this.closelayer();
        })
        wx.showToast({
          title: '下架成功！',
        })
      }
    })
  },
  //再次编辑
  gotoBack(){
    let _this = this;
    wx.navigateTo({
      url: '/pages/releaseList/edit/index?msgItem=' + JSON.stringify(_this.data.msgItem), 
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { 
      let infoItem = JSON.parse(options.infoItem); 
      infoItem.newContent = infoItem.content.split('\n');
      if (infoItem){
        this.setData({
          msgItem: infoItem
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