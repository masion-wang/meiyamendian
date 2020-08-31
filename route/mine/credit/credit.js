import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取请假设置情况
export const getSelfFirmLeaveSet = function (params) {
  return GET(`${data.BaseUrl}/firmLeaveSet/getSelfFirmLeaveSet`, {})
}

// 2.获取信用卡
export const getSelfCreditFraction = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfCreditFraction`, {})
}