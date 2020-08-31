import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.根据id获取卡金分配情况 返回卡类型和分配情况
export const getAcceptedCardCommission = function (params) {
  return GET(`${data.BaseUrl}/roomStaffAcceptedRcd/getAcceptedCardCommission/${params.acceptedOdType}/${params.acceptedOdId}`, {})
}