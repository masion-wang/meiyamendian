import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取自己的级别信息
export const getSelfLevelInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfLevelInfo`, {})
}

// 2.获取自己系统用户信息
// 用户所属类型（1.总部(平台)，2公司，3.大区 经理，4.小区 经理，5.股东6.门店员工）
export const getSelfMySysUserInfo = function (params) {
  return GET(`${data.BaseUrl}/sysUser/getSelfMySysUserInfo`, {})
}

// 3.根据门店id获取员工信息  roomId
export const getStaffInfoByRoom = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getStaffInfoByRoom/${params.roomId}`, {})
}

// 4.根据小区id获取门店信息 smallAreaId
export const getRoomInfoBySmallArea = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getRoomInfoBySmallArea/${params.smallAreaId}`, {})
}

// 5.获取不带自己的门店员工
export const selfRoomStaffInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/selfRoomStaffInfo`, {})
}

// 5.根据大区id获取小区信息
export const getSelfManageSmallArea = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfManageSmallArea`, {})
}

// 6.获取惩罚规章制度(一级二级)
export const selfFirmKpiSystem = function (params) {
  return GET(`${data.BaseUrl}/firmKpiValue/selfFirmKpiSystem`, {})
}

// 7.奖励员工提交
// title主题 desc详情 rsbId员工id
// valueDataId价值观数据id	baseSalary底薪   
// withdrawalPoints提现分 creditScore信用分 deductAmount奖励金额
export const awardStaff = function (params) {
  return POST(`${data.BaseUrl}/roomAwardPunishment/awardStaff`, params)
}

// 8.惩罚员工提交
// title主题 desc详情 rsbId  员工id baseSalary底薪 
// withdrawalPoints提现分 creditScore信用分 deductAmount 扣除金额
export const punishmentStaff = function (params) {
  return POST(`${data.BaseUrl}/roomAwardPunishment/punishmentStaff`, params)
}

// 9.惩罚记录 分页
export const selfFirmPunishmentRecord = function (params) {
  return GET(`${data.BaseUrl}/roomAwardPunishment/selfFirmPunishmentRecord/${params.currPage}/${params.pageSize}`, {})
}

// 10.奖励记录 分页
export const selfFirmAwardRecord = function (params) {
  return GET(`${data.BaseUrl}/roomAwardPunishment/selfFirmAwardRecord/${params.currPage}/${params.pageSize}`, {})
}

// 11.店长惩罚是否接口  recordId state 审核状态（1审核通过2审核驳回）
export const roomManagerCheckPunishmentRecord = function (params) {
  return POST(`${data.BaseUrl}/roomAwardPunishment/roomManagerCheckPunishmentRecord`, params)
}
// 12.小区惩罚是否接口 recordId state 审核状态（1审核通过2审核驳回）
export const smallAreaManagerCheckPunishmentRecord = function (params) {
  return POST(`${data.BaseUrl}/roomAwardPunishment/smallAreaManagerCheckPunishmentRecord`, params)
}
// 13.大区惩罚是否接口 recordId state 审核状态（1审核通过2审核驳回）
export const bigAreaManagerCheckPunishmentRecord = function (params) {
  return POST(`${data.BaseUrl}/roomAwardPunishment/bigAreaManagerCheckPunishmentRecord`, params)
}
// 14.店长奖励是否接口  recordId state 审核状态（1审核通过2审核驳回）
export const roomManagerCheckAwardRecord = function (params) {
  return POST(`${data.BaseUrl}/roomAwardPunishment/roomManagerCheckAwardRecord`, params)
}
// 15.小区奖励是否接口 recordId state 审核状态（1审核通过2审核驳回）
export const smallAreaManagerCheckAwardRecord = function (params) {
  return POST(`${data.BaseUrl}/roomAwardPunishment/smallAreaManagerCheckAwardRecord`, params)
}

// 16.大区奖励是否接口 recordId state 审核状态（1审核通过2审核驳回）
export const bigAreaManagerCheckAwardRecord = function (params) {
  return POST(`${data.BaseUrl}/roomAwardPunishment/bigAreaManagerCheckAwardRecord`, params)
}

////////////////离职申请相关////////////////////////
// 获取员工信息
export const selfFirmRoomStaffInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/selfFirmRoomStaffInfo`, {})
}

// 17.离职申请  title标题  rsbId员工id(非必须填写) leaveCause离职原因
export const addLeaveOffice = function (params) {
  return POST(`${data.BaseUrl}/roomLeaveOfficeData/addLeaveOffice`, params)
}

// 18.离职审核记录分页 
export const getSelfFirmLeaveOffice = function (params) {
  return GET(`${data.BaseUrl}/roomLeaveOfficeData/getSelfFirmLeaveOffice/${params.currPage}/${params.pageSize}`, {})
}

// 19.门店经理审核  assess 0 通过 1 驳回 leaveId 离职申请id
export const roomManagerAssess = function (params) {
  return POST(`${data.BaseUrl}/roomLeaveOfficeData/roomManagerAssess`, params)
}

// 20.小区经理审核   assess 0 通过 1 驳回 leaveId 离职申请id
export const smallAreaManagerAssess = function (params) {
  return POST(`${data.BaseUrl}/roomLeaveOfficeData/smallAreaManagerAssess`, params)
}

// 21.大区经理审核  assess 0 通过 1 驳回 leaveId 离职申请id
export const bigAreaManagerAssess = function (params) {
  return POST(`${data.BaseUrl}/roomLeaveOfficeData/bigAreaManagerAssess`, params)
}