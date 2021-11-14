// pages/choiseEmoji/index.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emojiNum: 1,
    iconList: [{
        emoji: '❤️'
      }, {
        emoji: '✨'
      }, {
        emoji: '😗'
      },
      {
        emoji: '😀'
      }, {
        emoji: '😄'
      }, {
        emoji: '😆'
      }, {
        emoji: '🤣'
      }, {
        emoji: '🙃'
      }, {
        emoji: '🥰'
      }, {
        emoji: '😍'
      }, {
        emoji: '🤩'
      }, {
        emoji: '😘'
      }, {
        emoji: '😙'
      }, {
        emoji: '😋'
      }, {
        emoji: '😛'
      }, {
        emoji: '😜'
      }, {
        emoji: '😝'
      }, {
        emoji: '🤫'
      }, {
        emoji: '😑'
      }, {
        emoji: '🙄'
      }, {
        emoji: '😔'
      }, {
        emoji: '😪'
      }, {
        emoji: '😕'
      }, {
        emoji: '☹️'
      }, {
        emoji: '😮'
      }, {
        emoji: '😰'
      }, {
        emoji: '😓'
      }, {
        emoji: '😩'
      }, {
        emoji: '😤'
      }, {
        emoji: '😡'
      }, {
        emoji: '😈'
      }, {
        emoji: '💀'
      }, {
        emoji: '🤡'
      }, {
        emoji: '👻'
      }, {
        emoji: '👋'
      }, {
        emoji: '🖐️'
      }, {
        emoji: '👌'
      }, {
        emoji: '👈'
      }, {
        emoji: '👉'
      }, {
        emoji: '🤙'
      }, {
        emoji: '🙏'
      }, {
        emoji: '🤳'
      }, {
        emoji: '💅'
      }, {
        emoji: '👃'
      }, {
        emoji: '👂'
      }, {
        emoji: '👀'
      }, {
        emoji: '👁️'
      }, {
        emoji: '👶'
      }, {
        emoji: '👧'
      }, {
        emoji: '👨‍🦳'
      }, {
        emoji: '🙍'
      }, {
        emoji: '🙅'
      }, {
        emoji: '💁'
      }, {
        emoji: '🙇'
      }, {
        emoji: '👩‍🍳'
      }, {
        emoji: '🧙'
      }, {
        emoji: '🚶'
      }, {
        emoji: '🧑‍🤝‍🧑'
      }, {
        emoji: '👫'
      }, {
        emoji: '💏'
      }, {
        emoji: '👪'
      }, {
        emoji: '👨‍👩‍👧‍👦'
      }, {
        emoji: '🌂'
      }, {
        emoji: '🎃'
      }
    ],
    gridCol: 5,
    emoji: '😍'
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
        wx.navigateBack(); //返回上一个页面
      }
    })
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
      emoji: e.currentTarget.dataset.value
    })
  },
})