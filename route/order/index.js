import data from '../api/baseUrl'
import {
  POST,
  GET
} from '../api/request' // 引入 get post 方法
// 1.订单请求接口(五种)
export const getSelfProjectOrder = function (params) {
  return GET(`${data.BaseUrl}/roomStaffProOd/getSelfProjectOrder/${params.orderStatus}/${params.currPage}/${params.pageSize}`, {})
}
// 2.订单请求详情(一般订单)
export const getUserProjectOrderDetail = function (params) {
  return GET(`${data.BaseUrl}/userProjectOrder/getUserProjectOrderDetail/${params.odId}`, {})
}
// 3.订单请求详情(砍价)
export const getHackPriceOrderDetail = function (params) {
  return GET(`${data.BaseUrl}/hackPriceOrder/getHackPriceOrderDetail/${params.odId}`, {})
}
// 4.订单请求详情(拼团)
export const getGroupBookingOrderDetail = function (params) {
  return GET(`${data.BaseUrl}/groupBookingOrderItem/getGroupBookingOrderDetail/${params.odId}`, {})
}
// 5.订单请求详情(亲密付)
export const getIntimacyPayOrderDetail = function (params) {
  return GET(`${data.BaseUrl}/intimacyPayOrder/getIntimacyPayOrderDetail/${params.odId}`, {})
}
// 6.订单请求详情(消费返还)
export const getConsumeReturnOrderDetail = function (params) {
  return GET(`${data.BaseUrl}/consumeReturnOrder/getConsumeReturnOrderDetail/${params.odId}`, {})
}
// 1 获取用户档案(总的)
export const getUserArchives = function (params) {
  return GET(`${data.BaseUrl}/roomStaffUserArchives/getUserArchives/${params.uid}`, {})
}