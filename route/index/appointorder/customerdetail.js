import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.用户信息
export const getSimpleUserInfo = function (params) {
  return GET(`${data.BaseUrl}/user/getSimpleUserInfo/${params.uid}`, {})
}

// 2.消费记录
export const getUserOrderConsumeRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getUserOrderConsumeRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 3.办次卡记录
export const getUserNumCardRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getUserNumCardRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 4.会员卡开卡记录
export const getUserCstmCardRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getUserCstmCardRcds/${params.uid}`, {})
}

// 5.设置置顶
export const userListTop = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserList/userListTop`, params)
}

// 6.取消置顶
export const cancelUserListTop = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserList/cancelUserListTop`, params)
}