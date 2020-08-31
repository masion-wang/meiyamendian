import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取自己公司已经开通的功能
export const selfFirmAccountFunction = function (params) {
  return GET(`${data.BaseUrl}/firmAccount/selfFirmAccountFunction`, {})
}

// 2.添加一个分享记录功能 awardAmt 金额 awardType 奖励类型 0 要钱 1 要功能 awardFun 0 亲密付,1 免费请客,2 合伙人,3 消费返还,-1 代表无
export const addShareRecord = function (params) {
  return POST(`${data.BaseUrl}/firmShareRecord/addShareRecord`, params)
}