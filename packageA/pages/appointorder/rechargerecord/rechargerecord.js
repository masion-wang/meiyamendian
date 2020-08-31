import {
  getUserTopUpOdRcds
} from '../../../../route/index/appointorder/rechargerecord'
Page({
  data: {
    uid: '', // 用户id
    currPage: 1, // 当前页面
    pageSize: 10, // 每页请求数据
    totalPages: 0, // 总页面
    // type: 1, // type值 一共五种
    list: [], //列表数据
    isend: false, // 是否最后一页
    year: 0
  },
  onLoad: function (options) {
    this.setData({
      uid: options.uid
    })
    this.loadMore()
  },
  // 上拉加载
  loadMore() {
    console.log('上拉')
    let that = this
    // 获取当前页 类型 信息数量 是否请求
    let uid = this.data.uid
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      uid: uid,
      currPage: currPage,
      pageSize: pageSize
    }
    if (!isend) {
      console.log("加载更多")
      getUserTopUpOdRcds(params).then(res => {
        console.log("默认请求", res)
        that.setData({
          year: res.data.data.year
        })
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
            icon: 'none',
            title: res.data.code + ':' + res.data.message,
            duration: 2000
          })

        }
      })
    } else {
      console.log("不请求")
      return
    }
  }
})