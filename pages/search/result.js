// pages/search/result.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    lable:null,
    page:1,
    limit:10,
    msgType:0,
    queryParam:'',
    publishRole:0,
    id:0,
    listData:[],
    datanull:false,
    ismove:null,
    listishow:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
    })
   
    if (options.cofid){
      this.setData({
        // lable: lablelist ? lablelist.lable : '',
        msgType: options.cofid ? options.cofid : 0,
        listData:[],
        page: 1,
        publishRole:0,
        index:0,
        queryParam: options.coftext ? options.coftext :''
      }, ()=>{
        this.getSearchList()
      }) 
    }else{
      this.setData({
        queryParam: options.coftext ? options.coftext : '',
        listData:[],
        page: 1,
        publishRole: 0,
        index: 0,
        msgType:0,
      }, ()=>{
        this.getSearchList()
      })
   }
  },
  getSearchList() {
    let parm = {
      limit: this.data.limit,
      page: this.data.page,
      msgType: this.data.msgType,//消息类型
      publishRole: this.data.index,//发布角色
      queryParam: this.data.queryParam
    }
      // / api / msg / page
    app.Formdata.post('/api/msg/page/global',parm,(res)=>{
      let _this = this;
      if(res.code == '0000') {
        this.setData({
          listData: this.data.listData.concat(res.data)
        })
        if (this.data.page >= 2 && Object.keys(res.data).length == 0){
          this.setData({
              datanull:true
          })
        } else {
          this.setData({
            datanull: false
          })
        }
      }
      wx.hideLoading();
    })
  },
  changeHader(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      index: index,
      page: 1,
      msgType: this.data.msgType,
      publishRole: index,
      listData: []
    },() => {
      this.getSearchList();
    })
  },
  //跳转详情
  gotoBackInfo(e) {
    let infoItme = e.currentTarget.dataset.item;
    console.log(infoItme)
    wx.navigateTo({
      url: '/pages/info/index?msgId=' + infoItme.msgId
    })
  },
  //展示更多
  addmoave(e){
    let ins = e.currentTarget.dataset.ins;
    let item = e.currentTarget.dataset.item; 
    wx.navigateTo({
      url: '/pages/search/moveref?iteminfo=' + JSON.stringify(item),
    })
    // let listData = 'listData['+ins+'].isShow'
    // this.setData({
    //   [listData]: !item.isShow
    // })
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
      page: 1,
      msgType: this.data.msgType,
      publishRole: this.data.publishRole,
      listData: [],
      datanull: false
    }, () => {
      this.getSearchList();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.setData({
    //   page: ++this.data.page
    // }, () => {
    //   this.getSearchList();
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})