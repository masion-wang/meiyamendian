import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取自己的公司职务
export const getSelfDutyList = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfDutyList`, {})
}

// 2.职务晋升列表数据
export const getSelfDutyUpgradeList = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfDutyUpgradeList`, {})
}

// 3.上传职务晋升时的图片
export const uploadDutyUpgradePicture = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/uploadDutyUpgradePicture`, {})
}

// 4.上传职务晋升时的视频
export const uploadDutyUpgradeVideo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/uploadDutyUpgradeVideo`, {})
}

// 5.员工职务审核  dutyId 职务id picture 图片 video 视频
export const staffDutyUpgradeAssessment = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/staffDutyUpgradeAssessment`, params)
}

// 6.员工职务晋升记录  dutyId 职务id picture 图片 video 视频
export const selfDutyUpgradeRecords = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/selfDutyUpgradeRecords/${params.currPage}/${params.pageSize}`, {})
}