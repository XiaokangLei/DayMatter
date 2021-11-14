// miniprogram/pages/home/home.js
import { utils } from '../../js/utils.js'
// 获取小程序实例
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 根据日期查询
        dateBooking: [],
        // 当前选择时间
        searchDate: '',
        // 最大可选时间
        lastDate: '',
        // 日账单
        dayTotal: {
            pay: 0,
            income: 0
        },
        // 月账单
        monthTotal: {
            pay: 0,
            income: 0
        },
        isAuth:''

    },

    jumpPageAdd(e) {
        console.log("e",e)
        wx.navigateTo({
          url: `/pages/${e.currentTarget.dataset.page}/${e.currentTarget.dataset.page}`,
        })
      },

    // 根据日期获取记账数据
    getBooking: function() {
        // 判断用户是否授权
        if (!this.data.isAuth) {
            return;
        }
        
        let date = this.data.searchDate;
        wx.showLoading({
            title: '加载中...',
            mask: true
        })

        wx.cloud.callFunction({
            // 云函数名称
            name: 'get_booking',
            data: {
                date
            },
            success: res => {
                console.log("res",res)
                this.setData({
                    dateBooking: res.result.data
                }, (res) => {
                    wx.hideLoading();
                    // 
                    // 统计收入支出
                    this.countTotal(this.data.dateBooking, 'dayTotal')

                })

            },
            fail: function(err) {
                wx.hideLoading();
                //console.log("err",err)
            }
        })

    },
    // 统计收入支出
    countTotal: function(data, str) {
    //    //console.log("data",data)

        // data: 需要遍历的数据  array类型

        // str 要统计账单的对象名 string类型
        let pay = 0;
        let income = 0;
        data.forEach(v => {
            if (v.payOrIncometype == "pay") {
                pay += Number(v.detailData.money);
            } else {
                income += Number(v.detailData.money)
            }
        })

        pay = pay.toFixed(2);
        income = income.toFixed(2);
        if (pay >= 999999999.99) {
            pay = 999999999.99
        }
        if (pay <= -999999999.99) {
            pay = -999999999.99
        }
        if (income >= 999999999.99) {
            income = 999999999.999
        }
        if (income <= -999999999.99) {
            income = -999999999.99
        }

        let total = Object.assign({}, this.data[str]);

        total.pay = pay;
        total.income = income;
        this.setData({
                [str]: total
        })
            // 
    },
    // 改变时间
    changeDate: function(e) {
        // 判断用户是否授权
        // //console.log(this.data.isAuth)
        if (!this.data.isAuth) {
            return;
        }
        this.setData({
            searchDate: e.detail.value
        })

        this.getBooking()
            // this.thousand()
        this.getMonthBooking()
    },

    // 查询月份账单
    getMonthBooking: function() {
        // 判断用户是否授权
        if (!this.data.isAuth) {
            return;
        }
        // get_booking_byDate
        let date = this.data.searchDate.slice(0, '2020-01'.length)
        let monthData = []
        wx.showLoading({
            title: '加载中...',
            mask: true
        })

        wx.cloud.callFunction({
            // 云函数名称
            name: 'get_booking_byDate',
            data: {
                date
            },
            success: res => {
                wx.hideLoading();
                monthData = res.result;
                // 
                // 统计月账单
                this.countTotal(monthData, 'monthTotal')
            },
            fail: function(err) {
                wx.hideLoading();
            }
        })
    },
    onLoad:function(){
        
        // //console.log(this.data.isAuth)
        // 在回调函数中获取app.globalData.isAuth，不然首次加载会是undefined
        app.isAuthCB = ()=>{
            // //console.log("14",app.globalData.isAuth)
            this.setData({
                isAuth: app.globalData.isAuth
            })

            this.setData({
                lastDate: utils.theLastDate(),
                searchDate: utils.theLastDate(),
                // isAuth: app.globalData.isAuth
            })
            // 获取绑定数据
            this.getBooking()
            this.getMonthBooking()
        }
    },
    onShow: function() {
        this.setData({
            lastDate: utils.theLastDate(),
            searchDate: utils.theLastDate(),
            isAuth: app.globalData.isAuth
        })
        this.getBooking()
        this.getMonthBooking()

    },


})