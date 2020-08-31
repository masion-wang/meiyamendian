import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.今日统计
export const getTodayStaffOrderStatistic = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getTodayStaffOrderStatistic`, {})
}

// 2.当月统计
export const getCurrMonthStaffOrderStatistic = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getCurrMonthStaffOrderStatistic`, {})
}

// 3.历史统计
export const loopIdle = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/getStaffOrderStatistic/${params.year}/${params.month}`, {})
}

// 4.单独时间 获取资源价值接口
export const getStaffDesignatedRate = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/getStaffDesignatedRate`, params)
}

// 5.历史统计 
export const getStaffOrderStatistic = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getStaffOrderStatistic/${params.year}/${params.month}/${params.size}`, {})
}