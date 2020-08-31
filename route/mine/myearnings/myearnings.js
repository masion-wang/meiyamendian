import data from '../../api/baseUrl'
// import {
//   POST,
//   GET
// } from '../../api/request' // 引入 get post 方法
import {
  POST,
  GET
} from '../../api/request2' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取我的收益信息
export const getSelfIncome = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfIncome`, {})
}
// 2.获取全部待完成
export const selfUnSuccessAccountDetails = function (params) {
  return GET(`${data.BaseUrl}/staffAccountDetails/selfUnSuccessAccountDetails`, {})
}
// 3.自定义获取员工明细(默认三天) 用户自定义 startTime endTime
export const selfStaffAccountDetails = function (params) {
  return GET(`${data.BaseUrl}/staffAccountDetails/selfStaffAccountDetails/${params.startTime}/${params.endTime}`, {})
}

// 转账
// 获取公司员工
export const selfFirmRoomStaffInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/selfFirmRoomStaffInfo`, {})
}
// 获取门店员工
export const selfRoomStaffInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/selfRoomStaffInfo`, {})
}
// 获取手机号
export const getSelfMySysUserInfo = function (params) {
  return GET(`${data.BaseUrl}/sysUser/getSelfMySysUserInfo`, params)
}
// 获取手机验证码-转账
export const sendTransferPhoneCaptcha = function (params) {
  return POST(`${data.BaseUrl}/staffTransferData/sendTransferPhoneCaptcha`, params)
}

// 获取手机验证码-余额
export const sendBalanceWithdrawPhoneCaptcha = function (params) {
  return POST(`${data.BaseUrl}/firmWithdrawData/sendBalanceWithdrawPhoneCaptcha`, params)
}

// 获取手机验证码-奖励金
export const sendAwardWithdrawPhoneCaptcha = function (params) {
  return POST(`${data.BaseUrl}/firmWithdrawData/sendAwardWithdrawPhoneCaptcha`, params)
}

// 获取手机验证码-股东
export const sendShareHolderWithdPhoneCaptcha = function (params) {
  return POST(`${data.BaseUrl}/firmWithdrawData/sendShareHolderWithdPhoneCaptcha`, params)
}

// 提现-股东 amount 提现金额 phoneCaptcha 验证码
export const shareHolderAccountWithdraw = function (params) {
  return POST(`${data.BaseUrl}/firmWithdrawData/shareHolderAccountWithdraw`, params)
}

// 转账  amount  desc phoneCaptcha rsbId
export const staffTransfer = function (params) {
  return POST(`${data.BaseUrl}/staffTransferData/staffTransfer`, params)
}

// 获取门店 余额 奖励金 股东相关设置
export const selfRoomRollOut = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/selfRoomRollOut`, {})
}

// 获取可提现金-余额
export const staffCanWithdrawAmount = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/staffCanWithdrawAmount`, {})
}

// 提现-余额 amount phoneCaptcha
export const balanceAccountWithdraw = function (params) {
  return POST(`${data.BaseUrl}/firmWithdrawData/balanceAccountWithdraw`, params)
}

// 提现-奖励金  amount phoneCaptcha
export const awardAccountWithdraw = function (params) {
  return POST(`${data.BaseUrl}/firmWithdrawData/awardAccountWithdraw`, params)
}


// 提现前的传递code的接口
export const submitStaffCertification = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/submitStaffCertification`, params)
}

// 自己公司的股东提现设置
export const selfFirmShareWithdrawSet = function (params) {
  return GET(`${data.BaseUrl}/shareHolder/selfFirmShareWithdrawSet`, {})
}
