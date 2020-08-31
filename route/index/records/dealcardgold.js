import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.一般次卡  1 2
export const getNumCardPrchOd = function (params) {
  return GET(`${data.BaseUrl}/firmNumCardPrchOd/getNumCardPrchOd/${params.odId}`, {})
}
// 2.会员卡 0
export const getCstmCardPrchOd = function (params) {
  return GET(`${data.BaseUrl}/firmCstmCardPrchOd/getCstmCardPrchOd/${params.odId}`, {})
}
// 3.充值卡 3
export const getUserCstmCardTopUpOd = function (params) {
  return GET(`${data.BaseUrl}/firmUserCstmCardTopUpOd/getUserCstmCardTopUpOd/${params.odId}`, {})
}
// 4.一般次卡提交
export const firmNumCardPrchOdAccepted = function (params) {
  return POST(`${data.BaseUrl}/firmNumCardPrchOd/firmNumCardPrchOdAccepted`, params)
}

// 5.会员卡卡提交
export const customerCardOrderAccepted = function (params) {
  return POST(`${data.BaseUrl}/firmCstmCardPrchOd/customerCardOrderAccepted`, params)
}

// 6.充值卡提交
export const userCstmCardTopUpOdAccepted = function (params) {
  return POST(`${data.BaseUrl}/firmUserCstmCardTopUpOd/userCstmCardTopUpOdAccepted`, params)
}

// 7.获取修改员工信息接口
export const getAllSimpleRoomStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/getAllSimpleRoomStaffInfo`,{})
}

// 8.获得发型师+助理 信息(添加)
export const getAllWrapperSimpleRoomStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/getAllWrapperSimpleRoomStaffInfo`,{})
}
// 8.2 获得发型师信息(添加)
export const getAllWrapperSimpleMainRoomStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/getAllWrapperSimpleMainRoomStaffInfo`,{})
}
// 9.获取发型师接口
export const selfRoomMainStaffInfo = function(params){
  return GET( `${data.BaseUrl}/roomStaffBase/selfRoomMainStaffInfo`,params)
}

