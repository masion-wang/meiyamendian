import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
// console.log("接口路径和静态资源路径", data)

// 1.客量排行
export const getCustomerVisitsNumsRank = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/getCustomerVisitsNumsRank`, params)
}

// 2.裂变引流
export const getCustomerShareRank = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/getCustomerShareRank`, params)
}
// 3.资源价值
export const getCustomerNumsRank = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/getCustomerNumsRank`, params)
}