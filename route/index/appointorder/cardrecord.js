import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.办次卡记录
export const getUserNumCardRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getUserNumCardRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}