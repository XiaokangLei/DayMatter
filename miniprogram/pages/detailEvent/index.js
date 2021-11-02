// pages/detailEvent/index.js
const app = getApp()
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
    top_height: app.globalData.CustomBar,
    bg_color: '',
    title: '',
    date: '',
    emoji: '',
    type: 1,
    weather: '',
    _id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.top_height)
    try {
      this.setData({
        bg_color: wx.getStorageSync('bg_color'),
        title: wx.getStorageSync('title'),
        date: wx.getStorageSync('date'),
        emoji: wx.getStorageSync('emoji'),
        type: wx.getStorageSync('type'),
        weather: wx.getStorageSync('weather'),
        _id: wx.getStorageSync('_id')
      })
    } catch (e) {
      // Do something when catch error
    }
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
    wx.setStorageSync('isFrash', false)

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

  deleteTap(e) {
    wx.setStorageSync('isFrash', true)
    db.collection('daymatter').doc(this.data._id).remove({
      success: function (res) {
        console.log(res.data)
      }
    })
    wx.navigateBack()
  },
})