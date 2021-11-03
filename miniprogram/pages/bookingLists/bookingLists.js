// miniprogram/pages/bookingLists/bookingLists.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookingData: [],
    },

    onLoad: function(options) {
        this.getBookingbyId()
    },

    // 根据id获取详情
    getBookingbyId: function() {
        if (!app.globalData.isAuth) {
            return;
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        })

        wx.cloud.callFunction({
            // 云函数名称
            name: 'get_booking_byUser',
            success: res => {
                wx.hideLoading();

                // 按日期降序排序
                // res.result.data.sort((a, b) => {
                //     return new Date(b.detailData.date).getTime() - new Date(a.detailData.date).getTime()
                // })


                this.setData({
                        bookingData: res.result.data
                    })
                    // //console.log(res.result.data)
                    // 改变标题
                wx.setNavigationBarTitle({
                    title: "朕的记账生涯(近" + this.data.bookingData.length + "条数据)"
                })
            },
            fail: function(err) {

            }
        })
    },
    removeById(e) {

        if (!app.globalData.isAuth) {
            return;
        } else {
            wx.showModal({
                title: '提示',
                content: '确定要删除\n辛苦记好的小本本吗?',
                success: res => {
                    if (res.confirm) {
                        let id = e.currentTarget.dataset.id;

                        wx.cloud.callFunction({
                            // 云函数名称
                            name: 'remove_booking_byId',
                            data: {
                                id
                            },
                            success: res => {

                                if (res.result.stats.removed == 1) {
                                    this.data.bookingData.splice(e.currentTarget.dataset.index, 1);

                                    this.setData({
                                        bookingData: this.data.bookingData
                                    })
                                    wx.showToast({
                                            title: '删除成功',
                                            icon: 'none',
                                            duration: 1600
                                        })
                                        // 改变标题
                                    wx.setNavigationBarTitle({
                                        title: "朕的记账生涯(近" + this.data.bookingData.length + "条数据)"
                                    })
                                }
                            },

                            fail: function(err) {

                            }
                        })
                    } else if (res.cancel) {
                        // 
                    }
                }
            })
        }
    }

})