//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperList: [],
    arrUser: [{
        lable: '全部',
        id: 0
      },
      {
        lable: '服务需求方',
        id: 1
      },
      {
        lable: '服务提供方',
        id: 2
      }
    ],
    arrType: null,
    arrPaixu: [{
        lable: '最新发布',
        id: 1
      },
      {
        lable: '最早发布',
        id: 2
      }
    ],
    indUser: null,
    indType: null,
    indPaixu: null,
    userInfo: app.UserLogin ? app.UserLogin.get('userInfo') : null,
    limit: 10,
    page: 1,
    msgList: [],
    isNull: false,
    biTop: false
  },
  //筛选类型
  onPickerUser(e) {
    this.setData({
      indUser: e.detail.value,
      page: 1,
      msgList: []
    }, () => {
      this.getMsgList();
    })
  },
  onPickerType(e) {
    this.setData({
      indType: e.detail.value,
      page: 1,
      msgList: []
    }, () => {
      this.getMsgList();
    })
  },
  onPickerPaixu(e) {
    this.setData({
      indPaixu: e.detail.value,
      page: 1,
      msgList: []
    }, () => {
      this.getMsgList();
    })
  },
  //banner 列表
  getBannerLIst() {
    let parms = {}
    app.Formdata.post('/api/banner/list', parms, (res) => {
      this.setData({
        swiperList: res.data
      })
    })
  },
  //信息查询列表
  getMsgList() {
    let parms = {
      page: this.data.page,
      limit: this.data.limit,
      publishOrder: this.data.arrPaixu[this.data.indPaixu] ? this.data.arrPaixu[this.data.indPaixu].id : '1', //排序
      msgType: this.data.arrType[this.data.indType] ? this.data.arrType[this.data.indType].id : '0', //消息类型
      publishRole: this.data.arrUser[this.data.indUser] ? this.data.arrUser[this.data.indUser].id : '0' //发布角色
    }
    app.Formdata.post('/api/msg/page', parms, (res) => {
      if (res.code == '0000') {
        if (res.data.data.length <= 0) {
          this.setData({
            isNull: true
          })
        } else {
          this.setData({
            isNull: false
          })
        }
        this.setData({
          msgList: this.data.msgList.concat(res.data.data)
        })
        app.globalData.showType = null;
      }
    })
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  //跳转h5
  gotoBack(e) {
    let links = e.currentTarget.dataset.links;
    wx.navigateTo({
      url: '/pages/webView/index?links=' + links,
    })
  },
  //跳转详情
  gotoBackInfo(e) {
    let infoItme = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/info/index?msgId=' + infoItme.msgId
    })
  },
  getMsgType() {
    app.Formdata.post('/api/msg/all/type', {}, (res) => {
      if (res.code == '0000') {
        app.UserLogin.set('arrType', res.data.arrType)
      }
    });
  },
  onLoad: function(query) {
    console.log('query', query)
    if (query.scene) {
      wx.navigateTo({
        url: '/pages/info/index?msgId=' + query.scene
      })
    }
    wx.showLoading({
      title: '初始化中',
    })
    setTimeout(() => {
      if (!app.UserLogin.get('arrType')) {
        this.getMsgType();
      }
      this.getBannerLIst();
      if (this.data.arrType) {
        this.setData({
          publishOrder: 1,
          page: 1,
          msgType: 0,
          publishRole: 0,
          msgList: []
        }, () => {
          this.getMsgList();
        })
      } else {
        let arrType = app.UserLogin.get('arrType');
        arrType.unshift({
          lable: "全部",
          id: "0"
        });
        this.setData({
          arrType: arrType,
          publishOrder: 1,
          page: 1,
          msgType: 0,
          publishRole: 0,
          msgList: []
        }, () => {
          this.getMsgList();
        })
      }
      wx.hideLoading();
    }, 3000)

    // this.setData({
    //   arrType: app.UserLogin.get('arrType')
    // });
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onTabItemTap() {

  },
  onShow: function() {
    if (app.globalData.refresh == 2) {
      setTimeout(() => {
        if (app.globalData.showType) {
          this.setData({
            indUser: null,
            indType: null,
            indPaixu: null
          })
        }
        if (this.data.arrType) {
          this.setData({
            publishOrder: 1,
            page: 1,
            msgType: 0,
            publishRole: 0,
            msgList: []
          }, () => {
            this.getMsgList();
            app.globalData.refresh = 1
          })
        } else {
          let arrType = app.UserLogin.get('arrType');
          arrType.unshift({
            lable: "全部",
            id: "0"
          });
          this.setData({
            arrType: arrType,
            publishOrder: 1,
            page: 1,
            msgType: 0,
            publishRole: 0,
            msgList: []
          }, () => {
            this.getMsgList();
            app.globalData.refresh = 1
          })
        }
      }, 300)
    }
  },
  onPullDownRefresh: function() {
    this.setData({
      publishOrder: 1,
      page: 1,
      msgType: 0,
      publishRole: 0,
      msgList: []
    }, () => {
      this.getMsgList();
    })
  },
  onReachBottom: function(e) {
    this.setData({
      page: ++this.data.page
    }, () => {
      this.getMsgList();
    })
  },
  onPageScroll: function(e) {
    if (e.scrollTop > 200) {
      this.setData({
        biTop: true
      });
    } else {
      this.setData({
        biTop: false
      });
    }
  },
  sorllToping() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  }
})