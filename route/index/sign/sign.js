import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.签到情况
export const getRoomStaffSignRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffSignRcd/getRoomStaffSignRcds/${params.year}/${params.month}`, {})
}
// 2.今天签到
export const signIn = function (params) {
  return POST(`${data.BaseUrl}/roomStaffSignRcd/signIn`, params)
}
// 3.今天签退
export const signOut = function (params) {
  return POST(`${data.BaseUrl}/roomStaffSignRcd/signOut`, params)
}