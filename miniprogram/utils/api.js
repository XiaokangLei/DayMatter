const app = getApp()
const {
  envList
} = require('envList.js')
const db = wx.cloud.database({
  env: envList[1].envId
})
const _ = db.command

/**
 * 倒数日数据
 * @param {*} page 
 * @param {*} openId 
 */
function getEventDetailList(page, openId) {
  return db.collection('daymatter')
    .where({
      openId: openId
    })
    .orderBy('_createTime', 'asc')
    .skip((page - 1) * 20)
    .limit(20)
    .get()
}


/**
 * 用户数据
 * @param {*} openId 
 */
function getUserDetail(openId) {
  return db.collection('user_info')
    .where({
      openId: openId
    })
    .get()
}

module.exports = {
  getEventDetailList: getEventDetailList,
  getUserDetail: getUserDetail
}