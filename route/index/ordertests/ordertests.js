import data from '../../api/baseUrl'
import {POST,GET} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径",data)
// 1.一般订单请求接口
export const getUserProjectOrder = function(params){
  return GET( `${data.BaseUrl}/userProjectOrder/getUserProjectOrder/${params.odId}`,{})
}
// 2.获取员工信息接口
export const getAllSimpleRoomStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/getAllSimpleRoomStaffInfo`,{})
}
// 3.一般订单提交
export const userProjectOrderAccepted = function(params){
  return POST( `${data.BaseUrl}/userProjectOrder/userProjectOrderAccepted`,params)
}
// 4.获取发型师接口
export const selfRoomMainStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/selfRoomMainStaffInfo`,params)
}