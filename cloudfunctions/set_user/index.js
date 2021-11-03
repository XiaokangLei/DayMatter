// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 获取数据库引用
const db = cloud.database();

// 云函数入口函数 async当前函数可以进行异步
exports.main = async (event, context) => {
    try {
        //console.log(event)
        //如果有该用户则更新，否则添加记录
        let count = await db.collection('user').where({
            userInfo: event.userInfo
        }).count();
        count = count.total;
        //console.log("count",count)
        if (count > 0) {
            //update
            return await db.collection('user').where({
                userInfo: event.userInfo
            }).update({
                data: event
            })
        } else {
            //add
            return await db.collection('user').add({
                data: event
            })
        }
    } catch (err) {
        //console.log("云函数出错 err=> ", err)
    }
}