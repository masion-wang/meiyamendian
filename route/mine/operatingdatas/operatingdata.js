import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.报销系
// 1.1 上传报销图片接口
export const uploadCertificate = function (params) {
  return POST(`${data.BaseUrl}/roomReimbursement/uploadCertificate`, params)
}

// 1.2 提交店长报销信息 报销金额 凭证 理由 
export const addRoomReimbursement = function (params) {
  return POST(`${data.BaseUrl}/roomReimbursement/addRoomReimbursement`, params)
}

// 1.3 获取店长报销信息分页
export const getRoomReimbursements = function (params) {
  return GET(`${data.BaseUrl}/roomReimbursement/getRoomReimbursements/${params.startTime}/${params.endTime}/${params.currPage}/${params.pageSize}`, {})
}

// 1.4 店长审核报销
export const roomReimbursementCheck = function (params) {
  return POST(`${data.BaseUrl}/roomReimbursement/roomReimbursementCheck`, params)
}

// 1.5 小区经理审核报销
export const smallAreaReimbursementCheck = function (params) {
  return POST(`${data.BaseUrl}/roomReimbursement/smallAreaReimbursementCheck`, params)
}

// 1.6 大区经理审核报销
export const bigAreaReimbursementCheck = function (params) {
  return POST(`${data.BaseUrl}/roomReimbursement/bigAreaReimbursementCheck`, params)
}

// 1.7 获取店长报销详情
export const getRoomReimbursementDetail = function (params) {
  return GET(`${data.BaseUrl}/roomReimbursement/getRoomReimbursementDetail/${params.id}`, {})
}