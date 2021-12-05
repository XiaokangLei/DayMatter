// miniprogram/pages/my/my.js
// 获取小程序实例
let app = getApp();

Page({

    /**
     * 页面的初始数据
     */

    data: {
        userInfo: {
            avatarUrl: "",
            language: "zh_CN",
            nickName: "未授权",
            province: "",
        }
    },

    jumpAboutPage(e) {
        wx.navigateTo({
            url: `/pages/${e.currentTarget.dataset.page}/index?openId=${app.globalData.openid}`,
        })
    },

    onShow: function () {
        wx.setStorageSync('isFrash', false)
        //console.log("app.globalData.isAuth",app.globalData.isAuth)
        // 如果已经授权,获取用户信息
        if (app.globalData.isAuth) {
            wx.showLoading({
                title: '加载中...',
                mask: true
            })

            if (wx.getUserProfile) {
                let userInfo = app.globalData.userInfo
                this.setData({
                    userInfo
                })
                wx.hideLoading();
            } else {
                wx.getUserInfo({
                    success: (res) => {
                        let userInfo = {
                            nickName: res.userInfo.nickName,
                            avatarUrl: res.userInfo.avatarUrl,
                            language: res.userInfo.language || "",
                            province: res.userInfo.province || "",
                        }
                        this.setData({
                            userInfo
                        })
                        wx.hideLoading();
                    },
                    fail: function (err) {

                    },
                })
            }
        }
        // 判断用户是否授权
        else {
            wx.showModal({
                title: '提示',
                content: '你还没有授权喔~',
                success(res) {
                    if (res.confirm) {
                        wx.getUserProfile({
                            desc: '用于数据展示',
                            success(res){
                                console.log("授权",res)
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
                            } 
                        })
                    } else if (res.cancel) {

                    }
                }
            })
            return;
        }
    },


    gopage: function (e) {
        wx.navigateTo({
            url: '../' + e.currentTarget.dataset.url + '/' + e.currentTarget.dataset.url,
        })
    },
    gopageabout: function (e) {
        wx.navigateTo({
            url: '../' + e.currentTarget.dataset.url + '/index'
        })
    }
})