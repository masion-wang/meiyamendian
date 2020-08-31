import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取扣除信息
export const getSelfFirmLeaveSet = function (params) {
  return GET(`${data.BaseUrl}/firmLeaveSet/getSelfFirmLeaveSet`, {})
}

// 2.获取时间模板(1-7) 8自己写
export const getRsvTmp = function (params) {
  return GET(`${data.BaseUrl}/reserveTemplate/getRsvTmp/${params.start}/${params.days}`, {})
}

// 3.获取三个月模板(by8) 根据下标判断吧 
export const getRsvTmpByMonth = function (params) {
  return GET(`${data.BaseUrl}/reserveTemplate/getRsvTmpByMonth/${params.start}/${params.months}`, )
}

// 4.员工请假
export const addStaffLeaveData = function (params) {
  return POST(`${data.BaseUrl}/firmLeaveData/addStaffLeaveData`, params)
}