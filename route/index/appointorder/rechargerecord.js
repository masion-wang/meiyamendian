import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.会员卡充值记录
export const getUserTopUpOdRcds = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getUserTopUpOdRcds/${params.uid}/${params.currPage}/${params.pageSize}`, {})
}