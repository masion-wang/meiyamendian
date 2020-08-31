import data from '../api/baseUrl'
import {
  POST,
  GET
} from '../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取自己权限状况
export const selfPermissions = function (params) {
  return GET(`${data.BaseUrl}/sysUser/selfPermissions`, {})
}

// 2.余额 奖励金 提现 权限控制
export const getSelfRoomStaffBaseInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfRoomStaffBaseInfo`, {})
}

// 3.设置员工微信头像 code encryptedData iv
export const setStaffWxInfo = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/setStaffWxInfo`, params)
}

// 4.设置小区微信头像 code encryptedData iv
export const setSmallAreaWxInfo = function (params) {
  return POST(`${data.BaseUrl}/smallArea/setSmallAreaWxInfo`, params)
}

// 5.设置大区微信头像 code encryptedData iv
export const setBigAreaWxInfo = function (params) {
  return POST(`${data.BaseUrl}/bigArea/setBigAreaWxInfo`, params)
}

// 6.设置股东微信头像 code encryptedData iv
export const setShareHolderWxInfo = function (params) {
  return POST(`${data.BaseUrl}/shareHolder/setShareHolderWxInfo`, params)
}