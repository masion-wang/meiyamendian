import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取旧手机的验证码
export const sendModifyPhonePhoneCaptcha = function (params) {
  return POST(`${data.BaseUrl}/sysUser/sendModifyPhonePhoneCaptcha`, params)
}

// 2.校验旧手机号的验证码
export const validationModifyPhonePhoneCaptcha = function (params) {
  return POST(`${data.BaseUrl}/sysUser/validationModifyPhonePhoneCaptcha`, params)
}

// 3.获取新手机号的验证码
export const sendNewPhoneModifyCaptcha = function (params) {
  return POST(`${data.BaseUrl}/sysUser/sendNewPhoneModifyCaptcha`, params)
}

// 4.修改自己的手机号
export const modifySelfPhone = function (params) {
  return POST(`${data.BaseUrl}/sysUser/modifySelfPhone`, params)
}