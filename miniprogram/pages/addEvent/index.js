// pages/addEvent/index.js
const app = getApp();
const {
  envList
} = require('../../envList.js')
const db = wx.cloud.database({
  env: envList[1].envId
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: "",
    bg_color: 'red',
    title: '2021年圣诞节',
    date: '2021-12-25',
    emoji: app.globalData.emoji,
    type: 1,
    weather: '',
    checkboxItems: [{
        name: 'red',
        value: 'red'
      },
      {
        name: 'yellow',
        value: 'yellow'
      },
      {
        name: 'olive',
        value: 'olive'
      },
      {
        name: 'blue',
        value: 'blue'
      },
      {
        name: 'cyan',
        value: 'cyan'
      },
      {
        name: 'purple',
        value: 'purple'
      },
      {
        name: 'mauve',
        value: 'mauve'
      },
      {
        name: 'pink',
        value: 'pink'
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      wx.setStorageSync('bg_color', this.data.bg_color)
      wx.setStorageSync('title', this.data.title)
      wx.setStorageSync('date', this.data.date)
      wx.setStorageSync('emoji', this.data.emoji)
      wx.setStorageSync('type', this.data.type)
      wx.setStorageSync('weather', this.data.weather)
    } catch (e) {

    }
    if (options.emoji) {
      this.setData({
        emoji: options.emoji
      })
    }
    this.setData({
      openId: options.openId
    })
    console.log(this.data.openId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      var value = wx.getStorageSync('emoji')
      if (value) {
        // Do something with return value
        this.setData({
          emoji: value
        })
      }
    } catch (e) {
      // Do something when catch error
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  checkboxChange: function (e) {
    var that = this;
    let checkboxValues = null;
    let checkboxItems = this.data.checkboxItems,
      values = e.detail.value
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].value == values[values.length - 1]) {
        checkboxItems[i].checked = true;
        checkboxValues = checkboxItems[i].value;
      } else {
        checkboxItems[i].checked = false;
      }
    }
    that.setData({
      checkboxItems,
      checkboxValues,
      bg_color: checkboxValues
    })
  },
  jumpPageChoise(e) {
    console.log(e.currentTarget.dataset.page)

    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?openId=${app.globalData.openid}`,
    })

  },
  jumpPageIndex(e) {
    console.log(e.currentTarget.dataset.page)

    console.log("9090900909009")
    this.add_data()
    try {
      wx.setStorageSync('emoji', this.data.emoji)
      wx.setStorageSync('date', this.data.date)
      wx.setStorageSync('title', this.data.title)
      wx.setStorageSync('bg_color', this.data.bg_color)
    } catch (e) {

    }

    wx.navigateBack()

  },

  add_data: async function () {
    await db.collection("user_info").where({
      openId: this.data.openId //进行筛选
    }).get({
      success: res => {
        console.log(res.data.length)
        if (res.data.length == 0) {
          //通过判断data数组长度是否为0来进行下一步的逻辑处理
          var userContent = {
            openId: app.globalData.openid
          }
          db.collection("user_info").add({
            data: userContent
          });
        }
      }
    })
    console.log("__________________________________")
    console.log(this.data.bg_color)
    var eventContent = {
      openId: app.globalData.openid,
      bg_color: this.data.bg_color,
      title: this.data.title,
      date: this.data.date,
      emoji: this.data.emoji,
      type: 1
    }
    await db.collection("daymatter").add({
      data: eventContent
    });
  }
})