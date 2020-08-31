import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取我的员工信息
export const getSelfRoomStaffBaseInfo = function (params) {
  return GET(`${data.BaseUrl}/roomStaffBase/getSelfRoomStaffBaseInfo`, {})
}

// 2.获取时间模板(1-7) 8自己写
export const getRsvTmp = function (params) {
  return GET(`${data.BaseUrl}/reserveTemplate/getRsvTmp/${params.start}/${params.days}`, {})
}

// 3.获取三个月模板(by8) 根据下标判断吧 
export const getRsvTmpByMonth = function (params) {
  return GET(`${data.BaseUrl}/reserveTemplate/getRsvTmpByMonth/${params.start}/${params.months}`, )
}

// 4.获取营业时间段 by(1-7) roleType 
export const getMyReserveTemplate = function (params) {
  return GET(`${data.BaseUrl}/reserveTemplate/getMyReserveTemplate/${params.time}`, {})
}

// 5.获取营业时间段 by(8) 新增接口
export const getMyFirmReserveTemplate = function (params) {
  return GET(`${data.BaseUrl}/reserveTemplate/getMyFirmReserveTemplate`, {})
}

// 6.关闭预约时间 {closeInfos[{year,month,day,hour}] ,type} (1-7)
export const staffCloseReserveTime = function (params) {
  return POST(`${data.BaseUrl}/reserveTemplate/staffCloseReserveTime`, params)
}

// 7.关闭月预约时间 三个月的关闭接口  新增接口
// 多天 全天       [closeInfos:[{year,month,day}...],type:1] (8)
// 多天 多时间段   [singleCloseInfo:{closeInfos:[{year,month,day}...],hours:['09:00','10:00']},type:1]
export const staffMonthCloseReserveTime = function (params) {
  return POST(`${data.BaseUrl}/reserveTemplate/staffMonthCloseReserveTime`, params)
}

// 8.获取关闭记录的数据  roleType + 一个获取自己权限的接口 
export const getMyRsvTimeCloseRcd = function (params) {
  return GET(`${data.BaseUrl}/staffRsvTimeCloseRcd/getMyRsvTimeCloseRcd/${params.currPage}/${params.pageSize}`, {})
}

// 9.打开关闭预约时间   closeRcdId 关闭记录id
export const openRsvTimeRcd = function (params) {
  return POST(`${data.BaseUrl}/reserveTemplate/openRsvTimeRcd`, params)
}