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
    .skip((page - 1) * 5)
    .limit(5)
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

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTimeTwo(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const getWeekByDate = dates => {
  let show_day = new Array('7', '1', '2', '3', '4', '5', '6');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[day];
}


module.exports = {
  getEventDetailList: getEventDetailList,
  getUserDetail: getUserDetail,
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  getWeekByDate: getWeekByDate
}