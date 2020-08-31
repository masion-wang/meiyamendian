import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.根据好评 中评 差评 获取信息
export const getSelfComment = function (params) {
  return GET(`${data.BaseUrl}/roomStaffComment/getSelfComment/${params.cmtLevel}/${params.currPage}/${params.pageSize}`, {})
}