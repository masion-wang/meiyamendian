import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.根据 关键词 时间 项目 状态 卡类型 请求页数 每次请求数量

// 所做的分页
export const getUserList = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserList/getUserList`, params)
}

// 2.获取次卡
export const getSelfFirmNumberCard = function (params) {
  return GET(`${data.BaseUrl}/firmNumberCard/getSelfFirmNumberCard`, {})
}

// 3.获取会员卡
export const getSelfFirmCustomerCard = function (params) {
  return GET(`${data.BaseUrl}/firmCustomerCard/getSelfFirmCustomerCard`, {})
}

// 4.获取项目接口
export const getSelfFirmProjects2 = function (params) {
  return GET(`${data.BaseUrl}/firmProject/getSelfFirmProjects2`, {})
}

// 5.获取兑换人数分页接口
export const getUserShareOrderRcd = function (params) {
  return GET(`${data.BaseUrl}/userShareOrderRcd/getUserShareOrderRcd/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}

// 6.获取兑换人数的总体统计数据
export const getUserShareOrderStatistics = function (params) {
  return GET(`${data.BaseUrl}/userShareOrderRcd/getUserShareOrderStatistics/${params.uid}`, {})
}

// 7.置顶按钮
export const userListTop = function (params) {
  return POST(`${data.BaseUrl}/roomStaffUserList/userListTop`, params)
}