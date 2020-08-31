import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.预约订单请求接口
export const getMyReservedOrder = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getMyReservedOrder/${params.currPage}/${params.pageSize}`, {})
}