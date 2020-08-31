import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)



// 1.获取我的简历信息
export const getSelfSimpleBaseInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfSimpleBaseInfo`, {})
}

// 2.设置我的简历 awardExperience 获奖 learnExperience 学习 workExperience 工作
export const setStaffSimpleBaseInfo = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/setStaffSimpleBaseInfo`, params)
}

// 3.获取我的认证信息
export const getSelfCertification = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfCertification`, {})
}

// 4.设置我的认证信息-员工
export const submitStaffCertification = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/submitStaffCertification`, params)
}

// 5.设置我的认证信息-股东
export const submitShareHolderCertification = function (params) {
  return POST(`${data.BaseUrl}/shareHolder/submitShareHolderCertification`, params)
}

// 6.给股东获取全部公司的编号
export const allBankCode = function (params) {
  return GET(`${data.BaseUrl}/bankCode/allBankCode`, {})
}