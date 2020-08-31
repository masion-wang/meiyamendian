import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
// console.log("接口路径和静态资源路径", data)
// 1.获取统计信息
export const getSelfWorksStatistic = function (params) {
  return GET(`${data.BaseUrl}/roomStaffWorks/getSelfWorksStatistic`, {})
}

// 2.获取自己的所有作品信息
export const getCustomerShareRank = function (params) {
  return GET(`${data.BaseUrl}/roomStaffWorks/getSelfWorks/${params.currPage}/${params.pageSize}`)
}

// 3.上传图片
export const uploadWorksImg = function (params) {
  return POST(`${data.BaseUrl}/roomStaffWorks/uploadWorksImg`, params)
}

// 4.上传作品
export const uploadWorks = function (params) {
  return POST(`${data.BaseUrl}/roomStaffWorks/uploadWorks`, params)
}

// 5.作品转发
export const worksForward = function (params) {
  return POST(`${data.BaseUrl}/roomStaffWorks/worksForward`, params)
}

// 6.作品点赞
export const worksLike = function (params) {
  return POST(`${data.BaseUrl}/roomStaffWorks/worksLike`, params)
}

// 7.删除作品
export const deleteStaffWorks = function (params) {
  return POST(`${data.BaseUrl}/roomStaffWorks/deleteStaffWorks`, params)
}

// 8.获取脸型
export const getFaceTypes = function (params) {
  return GET(`${data.BaseUrl}/faceType/getFaceTypes`, params)
}

// 9.获取发长
export const getHairLenTypes = function (params) {
  return GET(`${data.BaseUrl}/hairLenType/getHairLenTypes`, params)
}

// 10.获取发型
export const getHairTypes = function (params) {
  return GET(`${data.BaseUrl}/hairType/getHairTypes`, params)
}
// 11.作品详情
export const getStaffWorksDetail = function (params) {
  return GET(`${data.BaseUrl}/roomStaffWorks/getStaffWorksDetail/${params.worksId}`, {})
}

// 12.获取评论信息  worksId currPage pageSize
export const getRoomStaffWorksCmt = function (params) {
  return GET(`${data.BaseUrl}/roomStaffWorksCmt/getRoomStaffWorksCmt/${params.worksId}/${params.currPage}/${params.pageSize}`, {})
}

// 13.评价   worksId  ctn
export const roomStaffWorksCmt = function (params) {
  return POST(`${data.BaseUrl}/roomStaffWorksCmt/roomStaffWorksCmt`, params)
}

// 14.回复 (子评论)  cmtCtn	parentCmtId
export const addRoomStaffWorksCmtSub = function (params) {
  return POST(`${data.BaseUrl}/roomStaffWorksCmtSub/addRoomStaffWorksCmtSub`, params)
}

// 15.置顶图片
export const worksImgTop = function (params) {
  return POST(`${data.BaseUrl}/roomStaffWorks/worksImgTop`, params)
}
