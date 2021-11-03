// miniprogram/pages/auth/auth.js

let app = new getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUseGetUserProfile: false
    },
    onLoad: function(options){
        if(wx.getUserProfile){
          this.setData({
            canIUseGetUserProfile : true
          })
        }
    },
    // 获取用户授权信息(2.10.4之后版本的授权)
    getUserProfile: function(e) {
        wx.getUserProfile({
            desc: '用于数据展示',
            success: res =>  this.onSaveUserInfo(res)
        })
    },
     //保存userInfo到DB
    onSaveUserInfo:function(res){
        //console.log("授权",res)
        let data = res.userInfo;
        if(!data) return
        app.globalData.userInfo = data;
        app.globalData.isAuth = true;
        wx.cloud.callFunction({
            // 云函数名称
            name: 'set_user',
            data, 
            success: res => {
               //console.log("成功",res)
            },
            fail: function(err) {
                //console.log(err)
                // app.globalData.isAuth = false;
            }
        })
        wx.navigateBack()
    },
    // 2.10.4之前的授权
    getuserInfo: function(e) {
        // 如果用户允许授权
        if (e.detail.userInfo) {
            app.globalData.isAuth = true;
            wx.navigateBack({
                delta: 1
            })
        }
    }
})