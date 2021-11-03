// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 获取数据库引用
const db = cloud.database();
// 获取指令
const _ = db.command;

// 云函数入口函数 async当前函数可以进行异步
exports.main = async(event, context) => {
    try {
        // await 等待所有异步完成
        // 添加记账数据
        return await db.collection('bookingData').where({
            _id: _.in(event.ids),
            userInfo: event.userInfo
        }).get()
    } catch (err) {
        //console.log("云函数出错 err=> ", err)
    }
}