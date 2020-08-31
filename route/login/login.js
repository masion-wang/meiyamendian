import data from '../api/baseUrl' // 引入baseUrl
import {
   POST,
   GET
} from '../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.请求验证码接口
export const getCode = function (params) {
   return POST(`${data.BaseUrl}/sysUser/sendLoginPhoneCaptcha`, params)
}
// 2.请求登录接口
export const getLogin = function (params) {
   return POST(`${data.BaseUrl}/sysUser/login`, params)
}
// 3.微信获取加密手机号登录接口
export const weixinLogin = function (params) {
   return POST(`${data.BaseUrl}/sysUser/wxLogin`, params)
}
// 4.先获取uid
// 5.获取那张门店图片 有uid显示 没有uid不显示
export const roomInfo = function (params) {
   return GET(`${data.BaseUrl}/sysUser/roomInfo/${params.uid}`, {})
}