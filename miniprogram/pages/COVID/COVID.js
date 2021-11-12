// miniprogram/pages/COVID/COVID.js
import {
    utils
} from '../../js/utils.js'
Page({

    data: {
        COVIDData: [{
                value: [{
                        name: '现存确诊',
                        count: '759',
                        new: 0,
                        color: '#ec4448',
                        type: 'currentConfirmedCount',
                        newType: 'currentConfirmedIncr'
                    },
                    {
                        name: '累计确诊',
                        count: 0,
                        new: 0,
                        color: '#9d0007',
                        type: 'confirmedCount',
                        newType: 'confirmedIncr'
                    },
                    {
                        name: '现存疑似',
                        count: 0,
                        new: 0,
                        color: '#a669fb',
                        type: 'suspectedCount',
                        newType: 'suspectedIncr'
                    },
                    {
                        name: '累计治愈',
                        count: 0,
                        new: 0,
                        color: '#0caf8e',
                        type: 'curedCount',
                        newType: 'curedIncr'
                    },
                    {
                        name: '累计死亡',
                        count: 0,
                        new: 0,
                        color: '#424242',
                        type: 'deadCount',
                        newType: 'deadIncr'
                    },
                    {
                        name: '现存重症',
                        count: 0,
                        new: 0,
                        color: '#7b1426',
                        type: 'seriousCount',
                        newType: 'seriousIncr'
                    }

                ],
                title: '全国(含港澳台)'
            },
            {
                value: [{
                        name: '现存确诊',
                        count: '759',
                        new: 0,
                        color: '#ec4448',
                        type: 'currentConfirmedCount',
                        newType: 'currentConfirmedIncr'
                    },
                    {
                        name: '累计确诊',
                        count: 0,
                        new: 0,
                        color: '#9d0007',
                        type: 'confirmedCount',
                        newType: 'confirmedIncr'
                    },
                    {
                        name: '现存疑似',
                        count: 0,
                        new: 0,
                        color: '#a669fb',
                        type: 'suspectedCount',
                        newType: 'suspectedIncr'
                    },
                    {
                        name: '累计治愈',
                        count: 0,
                        new: 0,
                        color: '#0caf8e',
                        type: 'curedCount',
                        newType: 'curedIncr'
                    },
                    {
                        name: '累计死亡',
                        count: 0,
                        new: 0,
                        color: '#424242',
                        type: 'deadCount',
                        newType: 'deadIncr'
                    },
                    {
                        name: '现存重症',
                        count: 0,
                        new: 0,
                        color: '#7b1426',
                        type: 'seriousCount',
                        newType: 'seriousIncr'
                    }

                ],
                title: '海外疫情'
            }
        ],
        freshTime: '2020-01-01'
    },

    onLoad: function () {
        wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
        this.setData({
            freshTime: utils.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        })
        this.getCOVID()
    },
    //下拉刷新
    onPullDownRefresh: function () {
        this.onLoad()
    },
    getCOVID: function () {
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        wx.request({
            url: 'https://api.tianapi.com/txapi/ncov/index',
            data: {
                key: 'da3860c2d08b26c9856d2650693b3ed2'
            },
            method: 'GET',
            success: res => {
                // success
                wx.hideLoading();

                // //console.log(res)
                if (res.data.code === 200) {
                    // //console.log(res.data.newslist[0].desc);
                    let country = this.data.COVIDData[0].value;
                    let global = this.data.COVIDData[1].value;
                    for (let key in country) {
                        country[key].count = res.data.newslist[0].desc[country[key].type] != undefined ? res.data.newslist[0].desc[country[key].type] : '暂无数据'
                        country[key].new = res.data.newslist[0].desc[country[key].newType] != undefined ? res.data.newslist[0].desc[country[key].newType] : 0
                    }
                    for (let key in global) {
                        global[key].count = res.data.newslist[0].desc.globalStatistics[global[key].type] != undefined ? res.data.newslist[0].desc.globalStatistics[global[key].type] : '暂无数据'
                        global[key].new = res.data.newslist[0].desc.globalStatistics[global[key].newType] != undefined ? res.data.newslist[0].desc.globalStatistics[global[key].newType] : 0
                    }
                    this.setData({
                        COVIDData: this.data.COVIDData
                    })

                }
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }
})