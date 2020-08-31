import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.获取备忘录数据
export const getOdRemark = function (params) {
  return GET(`${data.BaseUrl}/roomStaffProOd/getOdRemark/${params.proOdId}`, {})
}
// 2.备忘录内容提交接口
export const setRoomStaffProOdRemark = function (params) {
  return POST(`${data.BaseUrl}/roomStaffProOd/setRoomStaffProOdRemark`, params)
}