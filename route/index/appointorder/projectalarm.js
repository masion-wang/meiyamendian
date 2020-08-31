import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.备忘录内容提交接口 intervalDays prevTim userNumberCardId
export const setUserNumberCardRemind = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/setUserNumberCardRemind`, params)
}

export const userNumberCardRemind = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/userNumberCardRemind/${params.userNumberCardId}`, {})
}