import data from '../../api/baseUrl'
import {POST,GET} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径",data)
// 1.拼团请求
export const getGroupBookingOrderItem = function(params){
  return GET( `${data.BaseUrl}/groupBookingOrderItem/getGroupBookingOrderItem/${params.odItemId}`,{})
}
// 2.获取员工信息接口
export const getAllSimpleRoomStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/getAllSimpleRoomStaffInfo`,{})
}
// 3.拼团提交
export const groupBookingOrderAccepted = function(params){
  return POST( `${data.BaseUrl}/groupBookingOrder/groupBookingOrderAccepted`,params)
}

// 4.获取发型师接口
export const selfRoomMainStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/selfRoomMainStaffInfo`,params)
}