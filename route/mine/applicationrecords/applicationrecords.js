import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.大区经理审核职务考核
export const bigAreaCheckDutyUpgradeAssessment = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/bigAreaCheckDutyUpgradeAssessment`, params)
}
// 2.小区经理审核职务考核
export const smallAreaCheckDutyUpgradeAssessment = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/smallAreaCheckDutyUpgradeAssessment`, params)
}
// 3.店长审核职务考核
export const roomCheckDutyUpgradeAssessment = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/roomCheckDutyUpgradeAssessment`, params)
}
// 4.获取职务考核信息(审核人)
export const dutyUpgradeAssessments = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/dutyUpgradeAssessments/${params.currPage}/${params.pageSize}`, {})
}

// 5.员工职务晋升记录  dutyId 职务id picture 图片 video 视频
export const selfDutyUpgradeRecords = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/selfDutyUpgradeRecords/${params.currPage}/${params.pageSize}`, {})
}