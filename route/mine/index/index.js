import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)


// 1 获取自己的系统用户信息
export const getSelfMySysUserInfo = function (params) {
  return GET(`${data.BaseUrl}/sysUser/getSelfMySysUserInfo`, {})
}

// 2.获取我的员工信息
export const getSelfRoomStaffBaseInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfRoomStaffBaseInfo`, {})
}
// 3.获取小区的信息
export const selfSmallAreaUserInfo = function (params) {
  return GET(`${data.BaseUrl}/smallArea/selfSmallAreaUserInfo`, {})
}
// 4.获取小区的信息
export const selfBigAreaUserInfo = function (params) {
  return GET(`${data.BaseUrl}/bigArea/selfBigAreaUserInfo`, {})
}
// 5.获取股东的信息 认证
export const selfShareHolderInfo = function (params) {
  return GET(`${data.BaseUrl}/shareHolder/selfShareHolderInfo`, {})
}
// 1.设置员工头像
export const setRoomStaffHeadImg = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/setRoomStaffHeadImg`, params)
}
// 2.设置大区的头像
export const setBigAreaIdentityImg = function (params) {
  return POST(`${data.BaseUrl}/bigArea/setBigAreaIdentityImg`, params)
}
// 3.设置小区的头像
export const setSmallAreaIdentityImg = function (params) {
  return POST(`${data.BaseUrl}/smallArea/setSmallAreaIdentityImg`, params)
}
// 4.设置股东的头像
export const setShareHolderIdentityImg = function (params) {
  return POST(`${data.BaseUrl}/shareHolder/setShareHolderIdentityImg`, params)
}
// 5.
// 获取自己的门店信息 代码六位
export const getSelfBasicsData = function (params) {
  return GET(`${data.BaseUrl}/roomBasicsData/getSelfBasicsData`, {})
}