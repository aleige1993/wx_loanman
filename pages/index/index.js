//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // swiperList: [{
    //   id: 0,
    //   type: 'image',
    //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    // }, {
    //   id: 1,
    //   type: 'image',
    //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    // }, {
    //   id: 2,
    //   type: 'image',
    //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    // }, {
    //   id: 3,
    //   type: 'image',
    //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    // }],
    swiperList:[],
    arrUser:[
        {
            lable:'全部',
            id:0
        },
        {
            lable: '服务需求方',
            id: 1
        },
        {
            lable: '服务提供方',
            id: 2
        }],
    arrType: [
        {
            lable:'全部',
            id:0
        },
        {
            lable: '通道挂靠',
            id: 1
        },
        {
            lable: '电子签章',
            id: 2
        },
        {
            lable: '其他',
            id: 3
        }],
    arrPaixu: [
        {
            lable: '最新发布',
            id: 1
        },
        {
            lable: '历史发布',
            id: 2
        }],
    indUser:null,
    indType:null,
    indPaixu: null,
    userInfo: app.UserLogin.get('userInfo') || null,
    pageSize: 10,
    pageNum: 1,
    msgList:[]
  },
  //筛选类型
  onPickerUser(e){
    this.setData({
      indUser: e.detail.value
    },()=>{
      this.getMsgList();
    })
  },
  onPickerType(e){
    this.setData({
      indType: e.detail.value
    }, () => {
      this.getMsgList();
    })
  },
  onPickerPaixu(e) {
    this.setData({
      indPaixu: e.detail.value
    }, () => {
      this.getMsgList();
    })
  },
    //banner 列表
    getBannerLIst() {
        let parms = {}
        app.Formdata.post('/api/banner/list', parms, (res) => {
            console.log(res);
            this.setData({
                swiperList: res.data  
            })
        })
    },
    //信息查询列表
    getMsgList(){
        let parms = {
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            publishOrder: this.data.arrPaixu[this.data.indPaixu] ? this.data.arrPaixu[this.data.indPaixu].id:'1',//排序
          msgType: this.data.arrType[this.data.indType] ? this.data.arrType[this.data.indType].id:'0',//消息类型
          publishRole: this.data.arrUser[this.data.indUser] ? this.data.arrUser[this.data.indUser].id:'0'//发布角色
        }
        app.Formdata.post('/api/msg/page', parms,(res)=>{ 
            if(res.code == '0000'){
                this.setData({
                  msgList: res.data.data
                })
            }
        })
    },
    //跳转h5
    gotoBack(e){
        let links = e.currentTarget.dataset.links;
        wx.navigateTo({
            url: '/pages/webView/index?links=' + links,
        })
    },
    //跳转详情
  gotoBackInfo(e){
    let infoItme = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/info/index?infoItme=' + JSON.stringify(infoItme),
    })
  },
  onLoad: function () {
      this.getBannerLIst();
      this.getMsgList();

    wx.showShareMenu({
      withShareTicket: true
    })
  },
})
