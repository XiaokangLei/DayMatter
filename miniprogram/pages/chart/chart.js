// miniprogram/pages/chart/chart.js
import { utils } from '../../js/utils.js'

let wxCharts = require('../../js/wxcharts.js')

// 获取小程序实例
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 年月日选择器
        term_Array: ['日', '月', '年'],
        term_index: 0,

        // 选择的日期
        searchDate: '',
        // date查询时截取的日期
        date: '',

        // 日期选择最大时间
        lastDate: '',

        // 收入支出统计
        payOrIncome: [{
                text: '收入',
                type: 'income',
            },
            {
                text: '支出',
                type: 'pay',
            }
        ],
        total: {
            pay: 0,
            income: 0
        },
        

        // 默认激活收入
        typeIndex: 1,

        // 查询到的数据
        resultData: [],

        //canvas宽度
        // canvasWidth: 300,

        // 禁止频繁切换
        cantClick: false
    },
    // 改变时间
    changeDate: function(e) {
        this.setData({
            searchDate: e.detail.value,
            date: e.detail.value,
            term_index: 0,
        })

        this.getBooking()
            // this.getMonthBooking()
    },
    // 选择年月日
    changeSearch: function(e) {
        let date = ''
            // 划分年月日
        if (e.detail.value == 0) {
            date = this.data.searchDate
        } else if (e.detail.value == 1) {
            date = this.data.searchDate.slice(0, "2020-07".length)
        } else {
            date = this.data.searchDate.slice(0, "2020".length)
        }
        // //console.log("date",date)
        this.setData({
            term_index: e.detail.value,
            date
        })


        this.getBooking()
    },

    // 切换收入支出
    toggleType: function(e) {
        if (this.data.cantClick) {

            return
        } else {
            if (this.data.typeIndex == e.currentTarget.dataset.index) {
                return
            }
            this.setData({
                typeIndex: e.currentTarget.dataset.index,
                cantClick: true
            })
            this.drawpie()
        }
    },

    // 根据日期获取记账数据
    getBooking: function() {
        // 判断用户是否授权
        if (!app.globalData.isAuth) {
            return;
        }
        // get_booking_byDate
        let date = this.data.date;
        let resData = []
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
                resData = res.result ? res.result : [];
                // 
                console.log("date",date)
                console.log("resData",res)
                // 统计账单
                this.countTotal(resData)
                this.manageData(resData)
                this.drawpie()

            },
            fail: function(err) {
                wx.hideLoading();
                //console.log("err",err)
            }
        })

    },
    // 处理数据
    manageData(data) {
        // 存放唯一类型
        let res = {
            pay: {
                type: [],
                detail: {},
            },
            income: {
                type: [],
                detail: {

                },
            }
        }
        console.log("data",data)
        data.forEach((v, i) => {
            let da = res[v.payOrIncometype]
            if (da.type.indexOf(v.typeDatatype) == -1) {
                // 保存类型
                da.type.push(v.typeDatatype);

                // 借助obj存储每个类型的总数,id以及数据

                let obj = {}
                let ty = obj[v.typeDatatype] = {
                    resultType: v.payOrIncometype,
                    total: 0,
                    ids: [],
                    data: []
                };

                // 总金额
                ty.total = v.detailData.money;
                // id
                ty.ids.push(v._id)
                    // 该类型的数据
                ty.data.push(v)

                // 把处理好的数据添加到datail
                da.detail[v.typeDatatype] = ty

            } else {
                // 如果键名存在,则往已有键名添加数据

                // 计算类型总金额
                da.detail[v.typeDatatype].total += v.detailData.money;
                // 存储id
                da.detail[v.typeDatatype].ids.push(v._id);
                // 存储同类型的记账信息
                da.detail[v.typeDatatype].data.push(v);

            }
        })
        this.setData({
            resultData: res
        })


    },
    // 统计收入支出
    countTotal: function(data) {
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

        let total = Object.assign({}, this.data.total);
        console.log("total",total)

        total.pay = pay;
        total.income = income;
        this.setData({
                total
            })
            // 
    },

    // 跳转至详情
    goDetail(e) {
        // return

        let ids = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.ids));
        // //console.log('ids',ids)
        wx.navigateTo({
            url: '../detail/detail?ids=' + ids
        })
    },

    // 绘制饼状图
    drawpie: function() {
        console.log(this.data.payOrIncome)
        console.log(this.data.total)
        let type = this.data.payOrIncome[this.data.typeIndex].type;
        let total = Number(this.data.total[type])
        if (total == 0) {
            this.setData({
                cantClick: false
            })
            return
        }
        console.log(this.data.resultData)
        let detail = Object.assign({}, this.data.resultData[type].detail)


        let series = [];
        for (let v in detail) {
            let item = {};
            console.log(v)
            // 根据wxCharts配置相关参数
            item.name = detail[v].data[0].typeData.text;
            item.data = Number(detail[v].total);
            item.color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
            // 关联对应记账类型的背景色
            this.data.resultData[type].detail[v].bgColor = item.color;
            this.setData({
                resultData: this.data.resultData
            })
            item.format = () => {
                return ' ' + item.name + ' ' + (item.data / total * 100).toFixed(2) + '% '
            }

            series.push(item)
        }
        // 
        let chart = new wxCharts({
            // canvas的id
            canvasId: 'pieCanvas',
            type: 'pie',
            series,
            width: wx.getSystemInfoSync().screenWidth,
            height: 340,
            dataLabel: true,
            // enableScroll
        });
        chart.addEventListener('renderComplete', () => {
            this.setData({
                cantClick: false
            })
        });
    },

    onLoad: function(){
         // 判断用户是否授权
         if (!app.globalData.isAuth) {
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
                        // 
                    }
                }
            })
            return;
        }
        //获取屏幕宽度

        this.setData({
            lastDate: utils.theLastDate(),
            searchDate: utils.theLastDate(),
            term_index: 0,
            date: utils.theLastDate()
        })
        this.getBooking()
    },
    onShow: function() {
        //获取屏幕宽度
        const res = wx.getSystemInfoSync();

        this.setData({
            canvasWidth: res.screenWidth
        })
        this.setData({
            lastDate: utils.theLastDate(),
            searchDate: utils.theLastDate(),
            term_index: 0,
            date: utils.theLastDate()
        })
        this.getBooking()
    },

})