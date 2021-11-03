// miniprogram/pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateBooking: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        let ids = options.ids;


        this.getBookingbyId(ids)
    },


    // 根据id获取详情
    getBookingbyId: function(ids) {
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        
        ids = JSON.parse(decodeURIComponent(ids));

        wx.cloud.callFunction({
            // 云函数名称
            name: 'get_bookingbyId',
            data: {
                ids
            },
            success: res => {
                wx.hideLoading();
                // resData = res.result.data;
                // //console.log("res",res)
                this.setData({
                        dateBooking: res.result.data
                    })
                    // 改变标题
                wx.setNavigationBarTitle({
                    title: res.result.data[0].payOrIncome.text + " · " + res.result.data[0].typeData.text + "记账详情"
                })

            },
            fail: function(err) {
                wx.hideLoading();
                //console.log(err)
            }
        })
    }

})