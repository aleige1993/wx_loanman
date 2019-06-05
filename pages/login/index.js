// pages/login/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disabled:false,
        userCode:null,
        bannerList:[],
        isLogin:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    //获取用户信息
    onGotUserInfo(e){
        let wxUserInfo = e.detail.userInfo;
        if (wxUserInfo){
            app.UserLogin.set('wxUserInfo', wxUserInfo);
            this.setData({
                isLogin:false
            })
        }
    }, 
    //一键登录
    getPhoneNumber(e){
        console.log(e)
        this.wxLogin();
        // let parms = {
        //     code: this.data.userCode,
        //     encData: e.detail.encData,
        //     iv: e.detail.iv
        // }
        // app.Formdata.post('/api/wx/auth', parms,(res) => {
        //     if(res.code == '0000') {
        //         app.UserLogin.set('userInfo',res.data);
        //         this.wxLogin(res.data.miobile)
        //     }
        // });
    },
    wxLogin(mobile){
        let parms = {
            mobile: '15683098850',
            password: app.Md5.hexMD5('123456')
        }
        app.Formdata.post('/api/wx/login',parms,(res) => {
            if(res.code == '0000'){
                app.UserLogin.set('userInfo', res.data);
                wx.showToast({
                    title: '成功登录！',
                    success(){
                       setTimeout(()=>{
                           wx.switchTab({
                               url: '/pages/index/index',
                           })
                       },2000)
                    }
                })
            }
        })
    },
    onLoad: function (options) {
        let _this = this;
        wx.login({
            success(log) {
                if (log.code) {
                    _this.setData({
                        userCode: log.code
                    })
                }
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
        let wxUserInfo =  app.UserLogin.get('wxUserInfo');
        if (!wxUserInfo){
            this.setData({
                isLogin:true
            })
        }
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