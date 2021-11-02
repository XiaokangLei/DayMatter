// pages/choiseEmoji/index.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emojiNum: 1,
    iconList: [{
        icon: 'cardboardfill',
        color: 'red',
        badge: 120,
        name: 'VR',
        num: 1,
        emoji: '🏄‍♀️'
      }, {
        icon: 'recordfill',
        color: 'orange',
        badge: 1,
        name: '录像',
        num: 2,
        emoji: '🚴‍♀️'
      }, {
        icon: 'picfill',
        color: 'yellow',
        badge: 0,
        name: '图像',
        num: 3,
        emoji: '🚵'
      }, {
        icon: 'noticefill',
        color: 'olive',
        badge: 22,
        name: '通知',
        num: 4,
        emoji: '🏈'
      }, {
        icon: 'upstagefill',
        color: 'cyan',
        badge: 0,
        name: '排行榜',
        num: 5,
        emoji: '🏀'
      }, {
        icon: 'clothesfill',
        color: 'blue',
        badge: 0,
        name: '皮肤',
        num: 6,
        emoji: '🏓'
      }, {
        icon: 'discoverfill',
        color: 'purple',
        badge: 0,
        name: '发现',
        num: 7,
        emoji: '🥰'
      }, {
        icon: 'questionfill',
        color: 'mauve',
        badge: 0,
        name: '帮助',
        num: 8,
        emoji: '😘'
      }, {
        icon: 'commandfill',
        color: 'purple',
        badge: 0,
        name: '问答',
        num: 9,
        emoji: '😍'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        num: 10,
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        num: 11,
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        num: 12,
        emoji: '🏄‍♀️'
      },
      {
        icon: 'cardboardfill',
        color: 'red',
        badge: 120,
        name: 'VR',
        num: 13,
        emoji: '🏄‍♀️'
      }, {
        icon: 'recordfill',
        color: 'orange',
        badge: 1,
        name: '录像',
        num: 14,
        emoji: '🚴‍♀️'
      }, {
        icon: 'picfill',
        color: 'yellow',
        badge: 0,
        name: '图像',
        num: 15,
        emoji: '🚵'
      }, {
        icon: 'noticefill',
        color: 'olive',
        badge: 22,
        name: '通知',
        num: 16,
        emoji: '🏈'
      }, {
        icon: 'upstagefill',
        color: 'cyan',
        badge: 0,
        name: '排行榜',
        num: 17,
        emoji: '🏀'
      }, {
        icon: 'clothesfill',
        color: 'blue',
        badge: 0,
        name: '皮肤',
        num: 18,
        emoji: '🏓'
      }, {
        icon: 'discoverfill',
        color: 'purple',
        badge: 0,
        name: '发现',
        num: 19,
        emoji: '🥰'
      }, {
        icon: 'questionfill',
        color: 'mauve',
        badge: 0,
        name: '帮助',
        num: 20,
        emoji: '😘'
      }, {
        icon: 'commandfill',
        color: 'purple',
        badge: 0,
        name: '问答',
        emoji: '😍'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      },
      {
        icon: 'cardboardfill',
        color: 'red',
        badge: 120,
        name: 'VR',
        emoji: '🏄‍♀️'
      }, {
        icon: 'recordfill',
        color: 'orange',
        badge: 1,
        name: '录像',
        emoji: '🚴‍♀️'
      }, {
        icon: 'picfill',
        color: 'yellow',
        badge: 0,
        name: '图像',
        emoji: '🚵'
      }, {
        icon: 'noticefill',
        color: 'olive',
        badge: 22,
        name: '通知',
        emoji: '🏈'
      }, {
        icon: 'upstagefill',
        color: 'cyan',
        badge: 0,
        name: '排行榜',
        emoji: '🏀'
      }, {
        icon: 'clothesfill',
        color: 'blue',
        badge: 0,
        name: '皮肤',
        emoji: '🏓'
      }, {
        icon: 'discoverfill',
        color: 'purple',
        badge: 0,
        name: '发现',
        emoji: '🥰'
      }, {
        icon: 'questionfill',
        color: 'mauve',
        badge: 0,
        name: '帮助',
        emoji: '😘'
      }, {
        icon: 'commandfill',
        color: 'purple',
        badge: 0,
        name: '问答',
        emoji: '😍'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      },
      {
        icon: 'cardboardfill',
        color: 'red',
        badge: 120,
        name: 'VR',
        emoji: '🏄‍♀️'
      }, {
        icon: 'recordfill',
        color: 'orange',
        badge: 1,
        name: '录像',
        emoji: '🚴‍♀️'
      }, {
        icon: 'picfill',
        color: 'yellow',
        badge: 0,
        name: '图像',
        emoji: '🚵'
      }, {
        icon: 'noticefill',
        color: 'olive',
        badge: 22,
        name: '通知',
        emoji: '🏈'
      }, {
        icon: 'upstagefill',
        color: 'cyan',
        badge: 0,
        name: '排行榜',
        emoji: '🏀'
      }, {
        icon: 'clothesfill',
        color: 'blue',
        badge: 0,
        name: '皮肤',
        emoji: '🏓'
      }, {
        icon: 'discoverfill',
        color: 'purple',
        badge: 0,
        name: '发现',
        emoji: '🥰'
      }, {
        icon: 'questionfill',
        color: 'mauve',
        badge: 0,
        name: '帮助',
        emoji: '😘'
      }, {
        icon: 'commandfill',
        color: 'purple',
        badge: 0,
        name: '问答',
        emoji: '😍'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      },
      {
        icon: 'cardboardfill',
        color: 'red',
        badge: 120,
        name: 'VR',
        emoji: '🏄‍♀️'
      }, {
        icon: 'recordfill',
        color: 'orange',
        badge: 1,
        name: '录像',
        emoji: '🚴‍♀️'
      }, {
        icon: 'picfill',
        color: 'yellow',
        badge: 0,
        name: '图像',
        emoji: '🚵'
      }, {
        icon: 'noticefill',
        color: 'olive',
        badge: 22,
        name: '通知',
        emoji: '🏈'
      }, {
        icon: 'upstagefill',
        color: 'cyan',
        badge: 0,
        name: '排行榜',
        emoji: '🏀'
      }, {
        icon: 'clothesfill',
        color: 'blue',
        badge: 0,
        name: '皮肤',
        emoji: '🏓'
      }, {
        icon: 'discoverfill',
        color: 'purple',
        badge: 0,
        name: '发现',
        emoji: '🥰'
      }, {
        icon: 'questionfill',
        color: 'mauve',
        badge: 0,
        name: '帮助',
        emoji: '😘'
      }, {
        icon: 'commandfill',
        color: 'purple',
        badge: 0,
        name: '问答',
        emoji: '😍'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      }, {
        icon: 'brandfill',
        color: 'mauve',
        badge: 0,
        name: '版权',
        emoji: '🏄‍♀️'
      }

    ],
    gridCol: 5,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  jumpPage(e) {
    console.log(e.currentTarget.dataset.emoji)
    wx.setStorage({
      key: "emoji",
      data: e.currentTarget.dataset.emoji,
      success: function () {
        wx.navigateBack();   //返回上一个页面
      }
    })
    // app.globalData.emoji = e.currentTarget.dataset.emoji
    // wx.navigateBack()
    // wx.navigateTo({
      
    //   url: `/pages/${e.currentTarget.dataset.page}/index?emoji=${e.currentTarget.dataset.emoji}`,
    //   // url: `/pages/${e.currentTarget.dataset.page}/index`,
    // })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  emojiChange(e) {
    console.log(e.currentTarget.dataset.value)
    this.setData({
      emojiNum: e.currentTarget.dataset.value
    })
  },
})