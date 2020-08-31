import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.根据月份获取自己门店的kpi考核内容
export const getSelfRoomKpiAssessByMonth = function (params) {
  return GET(`${data.BaseUrl}/firmKpiMonthStatistics/getSelfRoomKpiAssessByMonth/${params.year}/${params.month}/${params.currPage}/${params.pageSize}`, {})
}

// 2.根据季度获取自己门店的kpi考核内容
export const getSelfRoomKpiAssessByQuarter = function (params) {
  return GET(`${data.BaseUrl}/firmKpiMonthStatistics/getSelfRoomKpiAssessByQuarter/${params.quarter}/${params.currPage}/${params.pageSize}`, {})
}

// 3.获取自己公司的kpi价值观奖罚规则
export const getSelfFirmKpiValueRegulation = function (params) {
  return GET(`${data.BaseUrl}/firmKpiValueRegulation/getSelfFirmKpiValueRegulation`, {})
}

// 4.获取员工kpi价值观考核信息 month rsbId year
export const getStaffKpiValuesAssess = function (params) {
  return GET(`${data.BaseUrl}/firmKpiValueRwdPntRcd/getStaffKpiValuesAssess/${params.rsbId}/${params.year}/${params.month}`, {})
}

// 5.设置员工kpi价值观考核内容 cause 原因内容 kpiValueAssessRcdId kpi价值观考核记录id   status状态: 0扣分 1给分 2提升(默认不扣不给)
export const setStaffKpiValuesAssess = function (params) {
  return POST(`${data.BaseUrl}/firmKpiValueRwdPntRcd/setStaffKpiValuesAssess`, params)
}

// 6.获取考核人
export const selfFirmAssessUser = function (params) {
  return GET(`${data.BaseUrl}/firmKpiValueRwdPntRcd/selfFirmAssessUser`, {})
}
