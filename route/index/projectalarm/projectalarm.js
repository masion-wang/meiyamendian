import data from '../../api/baseUrl'
import {POST,GET} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径",data)
// 1.设置项目(剪发 头皮)次卡的相关数据 发送短信提醒 0次不提醒
export const getHackPriceOrder = function(params){
  return POST( `${data.BaseUrl}/hackPriceOrder/getHackPriceOrder/${params.odId}`,{})
}