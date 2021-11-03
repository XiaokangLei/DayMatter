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
            city: "",
            country: "",
            gender: 0,
            language: "zh_CN",
            nickName: "未授权",
            province: "",
        }
    },

    onShow: function () {
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

                            city: res.userInfo.city || "",
                            country: res.userInfo.country || "",
                            gender: res.userInfo.gender || "",
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
                        wx.navigateTo({
                            url: '../auth/auth',
                        })
                    } else if (res.cancel) {
                        // 
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
        // 
    }
})