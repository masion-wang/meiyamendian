import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
// 1 获取用户档案(总的)
export const getUserArchives = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchives/getUserArchives/${params.uid}`, {})
}

// 3 历史系
// 3-1 单位名称档案历史记录 ok
export const getCompanyNameRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getCompanyNameRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-2 消费档次档案历史记录 ok
export const getConsumeGradeLabelRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getConsumeGradeLabelRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-3 会员卡意愿档案历史记录
export const getCstmCardWishRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getCstmCardWishRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-4 关于染发档案历史记录
export const getDyeHairRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getDyeHairRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-5 其他内容档案历史记录
export const getElseContentRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getElseContentRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-6 家庭地址档案历史记录 ok
export const getFamilyAddrRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getFamilyAddrRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-7 家庭成员档案历史记录 ok
export const getFamilyMemberLabelRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getFamilyMemberLabelRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-8 关于护发档案历史记录
export const getHairCareRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getHairCareRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-9 关于剪发档案历史记录
export const getHairCutRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getHairCutRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-10 发型需求档案历史记录
export const getHairRequireRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getHairRequireRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-11 次卡意愿档案历史记录
export const getNumCardWishRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getNumCardWishRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-12 用户意见或建议档案历史记录
export const getOpinionRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getOpinionRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-13 关于烫发档案历史记录
export const getPermRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getPermRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-14 用户偏好档案历史记录
export const getPreferencesRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getPreferencesRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-15 用户备注名档案历史记录 ok
export const getRemarkNameRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getRemarkNameRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-16 薪资标准档档案历史记录
export const getSalaryStandardLabelRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getSalaryStandardLabelRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-17 关于头皮档案历史记录
export const getScalpRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getScalpRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-18 用户服务需求档案历史记录
export const getServiceRequireRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getServiceRequireRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-19 用户性别档案历史记录
export const getSexLabelRcd = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getSexLabelRcd/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-20 用户照片档案历史记录 ok
export const getUserPictureRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getUserPictureRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3-21 获取用户年龄记录历史
export const getAgeRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchivesRcd/getAgeRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}









// 2 提交系
// 2.1 单位名称
export const setCompanyName = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setCompanyName`, params)
}

// 2.2 用户消费档次
export const setConsumeGrade = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setConsumeGrade`, params)
}

// 设置用户年龄
export const setAge = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setAge`, params)
}


// 2.3 关于会员卡
export const setCstmCardWish = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setCstmCardWish`, params)
}
// 2.4 关于染发
export const setDyeHair = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setDyeHair`, params)
}
// 2.5 其他内容
export const setElseContent = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setElseContent`, params)
}
// 2.6 家庭地址
export const setFamilyAddr = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setFamilyAddr`, params)
}
// 2.7 家庭成员
export const setFamilyMember = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setFamilyMember`, params)
}
// 2.8 关于护发
export const setHairCare = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setHairCare`, params)
}
// 2.9 关于剪发
export const setHairCut = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setHairCut`, params)
}
// 2.9.1 发型需求
export const setHairRequest = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setHairRequest`, params)
}

// 2.9.2 关于次卡
export const setNumCardWish = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setNumCardWish`, params)
}

// 2.9.3 意见或者建议
export const setOpinion = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setOpinion`, params)
}

// 2.9.4 关于烫发
export const setPerm = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setPerm`, params)
}
// 2.9.5 设置偏好
export const setPreferences = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setPreferences`, params)
}
// 2.9.6 用户备注名
export const setRemarkName = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setRemarkName`, params)
}
// 2.9.7 设置薪资标准标签
export const setSalaryStandardLabel = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setSalaryStandardLabel`, params)
}
// 2.9.8 关于头皮
export const setScalp = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setScalp`, params)
}
// 2.9.9 服务需求
export const setServiceRequest = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setServiceRequest`, params)
}
// 2.9.9.1 用户性别
export const setSexLabel = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setSexLabel`, params)
}
// 2.9.9.1 设置用户照片
export const setUserPicture = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/setUserPicture`, params)
}
// 2.9.9.2 上传用户图片
export const uploadUserPicture = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserArchives/uploadUserPicture`, params)
}


// 4 获取系

// 4.1 获取消费档次标签
export const getConsumeGradeLabel = function (params) {
  return GET(`${data.BaseUrl}/firmLabel/getConsumeGradeLabel`, {})
}

// 4.2 获取家庭成员标签
export const getFamilyMemberLabel = function (params) {
  return GET(`${data.BaseUrl}/firmLabel/getFamilyMemberLabel`, {})
}

// 4.3 获取薪资标准标签
export const getSalaryStandardLabel = function (params) {
  return GET(`${data.BaseUrl}/firmLabel/getSalaryStandardLabel`, {})
}

// 4.4 获取性别标签
export const getSexLabel = function (params) {
  return GET(`${data.BaseUrl}/firmLabel/getSexLabel`, {})
}