// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 获取数据库引用
const db = cloud.database();

// 云函数入口函数 async当前函数可以进行异步
exports.main = async(event, context) => {
    try {
        // await 等待所有异步完成
        // 分布获取所有数据，否则上限只为100
        let count = await getCount(event);
        // //console.log("count",count)
        count = count.total;
        let list = [];
        for(let i = 0; i < count; i+=100){
          list = list.concat(await getList(event,i));
        }
        return list
    } catch (err) {
        //console.log("云函数出错 err=> ", err)
    }
}
//获取数据总数
async function getCount(event){
    let count = await db.collection('bookingData').where({
      detailData:{
        date:{
          $regex:event.date
        }
      },
      userInfo: event.userInfo
  }).count()
  return count;
}
async function getList(event,skip){
    let list = await db.collection('bookingData').where({
      detailData:{
        date:{
          $regex:event.date
        }
      },
      userInfo: event.userInfo
  }).skip(skip).get()
  return list.data
}