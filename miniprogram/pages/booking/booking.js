// miniprogram/pages/booking/booking.js

import {
    utils
} from '../../js/utils.js'

// 获取小程序实例
let app = getApp()

Page({
    data: {
        // 收入支出
        payOrIncome: [{
                text: "支出",
                type: "pay",
            },
            {
                text: "收入",
                type: "income",
            }
        ],

        // 消费种类数据
        typeData: [],

        // 消费路径
        pathData: [

            {
                text: "微信",
                type: "wechat",
                icon: "weixin"
            },
            {
                text: "支付宝",
                type: "alipay",
                icon: "coin"
            },
            {
                text: "信用卡",
                type: "creditCard",
                icon: "newsfill"
            },
            {
                text: "储蓄卡",
                type: "desopsitCard",
                icon: "card"
            },
            {
                text: "现金",
                type: "cash",
                icon: "moneybagfill"
            },
        ],

        // 记账信息
        detailData: {
            date: "",
            money: "",
            message: ""
        },

        // 选中的类型和index
        chooseType: '',
        payOrIncomeIndex: 0,
        typeDataIndex: -1,
        pathDataIndex: 0,

        // 是否引用切换动画
        IsRotate: false,

        // 最大可选时间
        lastDate: ''

    },

    // 获取类型数据
    getTypeData: function () {

        wx.showLoading({
            title: '加载中...',
            mask: true
        })

        let data = this.data.payOrIncomeIndex;
        console.log("data",data)

        // 普通函数需要存储this才可以用this.setData
        // let _this = this;
        wx.cloud.callFunction({
            // 云函数名称
            name: 'get_typeData',
            data: {
                data
            },
            // success: function(res) {
            //     _this.setData({
            //         typeData: res.result.data
            //     }, () => {
            //         
            //     })

            // },
            success: res => {
                // 箭头函数不存在this作用域问题,所以可以用this
                // 
                this.setData({
                    typeData: res.result.data
                }, (res) => {
                    wx.hideLoading();
                    // 读取 typeData 数据 需要加多个data ,this.data.typeData
                    // 
                })
            },

            fail: function (err) {

            }
        })
    },

    // 切换
    toggleTab: function (e) {

        let dataset = e.currentTarget.dataset;
        console.log("dataset",dataset)
        // 选择相同的选项拦截

        if (this.data.chooseType == dataset.type && dataset.index == this.data[dataset.type]) {
            return;
        }

        if (dataset.type == "payOrIncomeIndex" && this.data.payOrIncomeIndex != dataset.index) {
            console.log("payOrIncomeIndex",this.data.payOrIncomeIndex)
            this.setData({
                IsRotate: !this.data.IsRotate,
                typeDataIndex: -1
            });
            
        }
        this.setData({
            [dataset.type]: dataset.index,
            chooseType: dataset.type
        });

    },

    // 记账信息
    detailChange: function (e) {
        let detailData = this.data.detailData;
        detailData[e.currentTarget.dataset.key] = e.detail.value;
        this.setData({
            detailData
        })
    },

    // 保存按钮
    saveData: function () {
        // 判断用户是否授权
        if (!app.globalData.isAuth) {
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

        let deData = this.data.detailData;
        if (this.data.typeDataIndex == -1) {
            wx.showToast({
                title: '请选择记账类型',
                icon: 'none',
                duration: 1500
            })
            return;
        }
        if (deData.date == '') {
            wx.showToast({
                title: '请选择日期',
                icon: 'none',
                duration: 1500
            })
            return;
        }
        if (isNaN(deData.money) || deData.money == '') {
            wx.showToast({
                title: '请输入正确的金额',
                icon: 'none',
                duration: 1300
            })
            deData.money = ''
            this.setData({
                detailData: deData
            })
            return;
        }

        deData.money = parseFloat(deData.money)
        let moneyInt = parseInt(deData.money)
        let moneyFloat = deData.money - moneyInt
        if (moneyInt > 99999999) {
            wx.showToast({
                title: '你太有钱啦\n小破本已经写不下啦',
                icon: 'none',
                duration: 1600
            })
            return;
        }
        // 
        if (moneyFloat != 0 && deData.money.toString().split(".")[1].length > 3) {

            wx.showToast({
                title: '小数位太多,已自动处理',
                icon: 'none',
                duration: 1600
            })
            deData.money = parseFloat(deData.money).toFixed(3);
            this.setData({
                detailData: deData
            })

        }

        this.setData({
            detailData: deData
        })
        let daArr = ['payOrIncome', 'typeData', 'pathData'];
        let obj = {};
        daArr.forEach(v => {
            console.log("v",v)
            obj[v] = this.data[v][this.data[v + 'Index']];
            console.log("obj[v]",obj[v])
            obj[v + 'type'] = obj[v].type;
        })
        obj.detailData = Object.assign({}, this.data.detailData);
        // 
        // 数据写入数据库
        this.addBooking(obj)
    },

    // 写入数据库
    addBooking: function (data) {
        wx.showLoading({
            title: '记录中...',
            mask: true
        })
        wx.cloud.callFunction({
            // 云函数名称
            name: 'set_bookingData',
            data,
            success: res => {
                wx.hideLoading();
                wx.showToast({
                    title: '记录成功',
                    icon: 'none',
                    duration: 1600
                })
                this.emptyData()
            },

            fail: function (err) {

            }
        })
    },
    // 清空数据
    emptyData: function () {
        this.setData({
            chooseType: '',
            payOrIncomeIndex: 0,
            typeDataIndex: -1,
            pathDataIndex: 0,
            detailData: {
                date: "",
                money: "",
                message: ""
            }
        });
        wx.navigateBack()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTypeData();
        this.setData({
            lastDate: utils.theLastDate()
        })

    },

})