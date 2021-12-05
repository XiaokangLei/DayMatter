// pages/indexTest/index.js
const app = getApp();
import api from '../../utils/api.js'
import {
  envList
} from '../../envList.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据库中是否存在事件信息 标志变量
    event_length: 0,
    showUploadTip: false,
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42',
        emoji: '🎃',
        time: '2021-11-30'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d',
        emoji: '😜',
        time: '2021-9-31'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08',
        emoji: '💦'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f',
        emoji: '🍎'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a',
        emoji: '🍇'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4',
        emoji: '💕'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false,
    openId: "",
    eventList: [],
    page: 1,
    isFrash: true,
    CustomBar: app.globalData.CustomBar,
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.setStorageSync('isFrash', this.data.isFrash)
    this.setData({
      openId: app.globalData.openid,
    })
    // this.checkUser()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    console.log(wx.getStorageSync('isFrash'))
    if (wx.getStorageSync('isFrash')) {
      this.setData({
        eventList: [],
        page: 1
      })
      this.checkUser()
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
  onReachBottom: async function () {
    // 存在数据会触发更新函数
    if (!this.data.noData) {
      this.checkUser()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  add_event(e) {
    console.log("../pages/" + e.currentTarget.dataset.url)
    wx.navigateTo({
      url: "../pages/" + e.currentTarget.dataset.url
    })
  },
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?openId=${app.globalData.openid}`,
      // url: `/pages/${e.currentTarget.dataset.page}/index`,
    })
  },

  jumpPageDetail(e) {
    try {
      wx.setStorageSync('bg_color', e.currentTarget.dataset.bg_color)
      wx.setStorageSync('title', e.currentTarget.dataset.title)
      wx.setStorageSync('date', e.currentTarget.dataset.date)
      wx.setStorageSync('emoji', e.currentTarget.dataset.emoji)
      wx.setStorageSync('type', e.currentTarget.dataset.type)
      wx.setStorageSync('weather', e.currentTarget.dataset.weather)
      wx.setStorageSync('_id', e.currentTarget.dataset._id)
    } catch (e) {

    }
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?openId=${app.globalData.openid}`,
      // url: `/pages/${e.currentTarget.dataset.page}/index`,
    })
  },

  checkUser: async function () {
    if (this.data.openId != "") {
      wx.showLoading({
        title: '加载中...',
      })
      let that = this
      let page = this.data.page
      // 查找用户是否已使用过小程序
      let userInfo = await api.getUserDetail(this.data.openId)
      console.log(userInfo.data)
      if (userInfo.data.length > 0) {
        let result = await api.getEventDetailList(page, this.data.openId)
        console.log(result)
        if (result.data.length === 0 && page === 1) {
          that.setData({
            event_length: 1,
            noData: true
          })
        } else if (result.data.length > 0) {
          that.setData({
            page: page + 1,
            eventList: that.data.eventList.concat(result.data),
            event_length: 0,
            noData: false
          })
        } else if (result.data.length == 0) {
          console.log("noData!")
          that.setData({
            noData: true
          })
        }
      }
      wx.hideLoading()
    } else {
      console.log("第一次打开小程序，未获取到openId")
    }
  }
})