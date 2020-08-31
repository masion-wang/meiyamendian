import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取请假信息
export const getSelfLeavePenaltyStatistics = function (params) {
  return GET(`${data.BaseUrl}/firmLeaveData/getSelfLeavePenaltyStatistics`, {})
}

// 2.获取请假记录分页
export const getFirmLeaveData = function (params) {
  return GET(`${data.BaseUrl}/firmLeaveData/getFirmLeaveData/${params.currPage}/${params.pageSize}`, {})
}

// 3.店长审核
export const roomManagerCheckLeaveData = function (params) {
  return POST(`${data.BaseUrl}/firmLeaveData/roomManagerCheckLeaveData`, params)
}

// 4.小区审核
export const smallAreaManagerCheckLeaveData = function (params) {
  return POST(`${data.BaseUrl}/firmLeaveData/smallAreaManagerCheckLeaveData`, params)
}

// 5.大区审核
export const bigAreaManagerCheck = function (params) {
  return POST(`${data.BaseUrl}/firmLeaveData/bigAreaManagerCheck`, params)
}

// 6.获取自己级别的接口
export const getSelfMySysUserInfo = function (params) {
  return GET(`${data.BaseUrl}/sysUser/getSelfMySysUserInfo`, {})
}