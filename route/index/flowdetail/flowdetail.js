import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.获取员工分享信息  timeWay 0 dayRange    1 endTime startTime
export const getStaffShareInfo = function (params) {
  return POST(`${data.BaseUrl}/roomStaffBase/getStaffShareInfo`, params)
}