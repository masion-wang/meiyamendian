import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)
// 1.公告的分页
export const getRoomCarouselBoard = function (params) {
  return GET(`${data.BaseUrl}/roomCarouselBoard/getRoomCarouselBoard/${params.currPage}/${params.pageSize}`, {})
}
// 2.公告的详情
export const getCarouselBoardDetail = function (params) {
  return GET(`${data.BaseUrl}/roomCarouselBoard/getCarouselBoardDetail/${params.rcbId}`, {})
}