import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.最新的门店轮播公告
export const getLatestRoomCarouselBoard = function (params) {
  return GET(`${data.BaseUrl}/roomCarouselBoard/getLatestRoomCarouselBoard`, {})
}
// 2.门店轮排安排
export const getMyRoomStaffLoop = function (params) {
  return GET(`${data.BaseUrl}/roomStaffLoop/getMyRoomStaffLoop`, {})
}
// 2.1 空闲
export const loopIdle = function (params) {
  return POST(`${data.BaseUrl}/roomStaffLoop/loopIdle`, params)
}
// 2.2 过牌
export const loopPassed = function (params) {
  return POST(`${data.BaseUrl}/roomStaffLoop/loopPassed`, params)
}
// 2.3 有预约
export const loopReserved = function (params) {
  return POST(`${data.BaseUrl}/roomStaffLoop/loopReserved`, params)
}

// 2.4 获取自己的系统用户信息
export const getSelfMySysUserInfo = function (params) {
  return GET(`${data.BaseUrl}/sysUser/getSelfMySysUserInfo`, {})
}

// 2.5 获取自己的门店信息
export const getSelfBasicsData = function (params) {
  return GET(`${data.BaseUrl}/roomBasicsData/getSelfBasicsData`, {})
}

// 2.6 获取自己的公司信息
export const selfFirmData = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/selfFirmData`, {})
}
