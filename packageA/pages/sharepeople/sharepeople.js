import {
  getUserShareOrderRcd, // 分页
  getUserShareOrderStatistics // 统计信息
} from '../../../route/index/userlist/userlist'
import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    data: {}, // 统计信息
    uid: '', // 用户id
    currPage: 1, // 第几页
    pageSize: 10, // 请求几条
    list: [], // 列表
    isend: false // 是否最后一页
  },
  onLoad: function (options) {
    console.log('获取的uid', options.uid)
    let uid = options.uid
    this.setData({
      uid: uid
    })
    // 获取统计数据
    this.getUserShareOrderStatistics()
    // 获取分页数据
    this.getUserShareOrderRcd()
  },
  // 获取统计信息
  getUserShareOrderStatistics: function () {
    let that = this
    let uid = this.data.uid
    let params = {
      uid: uid
    }
    getUserShareOrderStatistics(params).then(res => {
      console.log('统计信息', res)
      if (res.data.code = 200) {
        that.setData({
          data: res.data.data // 统计信息
        })
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })
  },
  // 获取可以兑换人数的分页接口
  getUserShareOrderRcd: function () {
    console.log('上拉')
    let that = this
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    let uid = this.data.uid
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      currPage: currPage,
      pageSize: pageSize,
      uid: uid
    }
    if (!isend) {
      console.log("加载更多")
      getUserShareOrderRcd(params).then(res => {
        console.log("默认请求", res)
        if (res.data.code == 200) {
          console.log("分页列表数据", res.data.data.contents)
          console.log("总页数", res.data.data.totalPages)
          if (res.data.data.contents.length < pageSize) {
            console.log("最后一页")
            that.setData({
              isend: true
            })
          } else {
            that.setData({
              isend: false
            })
          }
          let currPage = ++that.data.currPage
          let list = that.data.list.concat(res.data.data.contents)
          that.setData({
            list: list,
            currPage: currPage
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message+":"+ res.data.code,
duration:2000
          })
        }
      })
    } else {
      console.log("不请求")
      return
    }
  }
})