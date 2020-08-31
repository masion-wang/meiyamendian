import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.消费返还订单请求接口
export const getConsumeReturnOrder = function (params) {
  return GET(`${data.BaseUrl}/consumeReturnOrder/getConsumeReturnOrder/${params.odId}`, {})
}

// 2.获取员工信息接口
export const getAllSimpleRoomStaffInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getAllSimpleRoomStaffInfo`, {})
}

// 3 获取版本号 提交之前
export const getSimpleConsumeReturnShare = function (params) {
  return GET(`${data.BaseUrl}/consumeReturnShare/getSimpleConsumeReturnShare/${params.crsId}`, {})
}

// 4.消费返还订单提交
export const consumeReturnOrderAccepted = function (params) {
  return POST(`${data.BaseUrl}/consumeReturnOrder/consumeReturnOrderAccepted`, params)
}

// 5.获取发型师接口
export const selfRoomMainStaffInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/selfRoomMainStaffInfo`, params)
}