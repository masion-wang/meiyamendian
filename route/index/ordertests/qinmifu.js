import data from '../../api/baseUrl'
import {POST,GET} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径",data)
// 1.亲密付请求
export const getIntimacyPayOrder = function(params){
  return GET( `${data.BaseUrl}/intimacyPayOrder/getIntimacyPayOrder/${params.odId}`,{})
}
// 2.获取员工信息接口
export const getAllSimpleRoomStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/getAllSimpleRoomStaffInfo`,{})
}
// 3.亲密付提交
export const intimacyPayOrderAccepted = function(params){
  return POST( `${data.BaseUrl}/intimacyPayOrder/intimacyPayOrderAccepted`,params)
}

// 4.获取发型师接口
export const selfRoomMainStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/selfRoomMainStaffInfo`,params)
}