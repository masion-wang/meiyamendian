import {
  getRoomCarouselBoard, // 公告的分页
  // 公告的详情
} from '../../../../route/index/gonggao/gonggao'
Page({
  data: {
    back: false,
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    totalPages: 0, // 总页面
    type: 1, // type值 一共五种
    list: [], //列表数据
    isend: false // 是否最后一页
  },
  onLoad: function (options) {
    // 请求数据 渲染
    this.loadMore()
  },
  onShow: function () {
    // this.getlist()
  },
  upper: function () {
    this.getlist()
  },
  // 下拉刷新
  getlist: function () {
    console.log('下拉')
    this.setData({
      isend: false,
      currPage: 1,
      list: [],
    })
    this.loadMore()
  },
  // 上拉加载
  loadMore() {
    console.log('上拉')
    let that = this
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      currPage: currPage,
      pageSize: pageSize
    }
    if (!isend) {
      console.log("加载更多")
      getRoomCarouselBoard(params).then(res => {
        that.setData({
          back: false
        })
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
        } else if (res.data.code == 10004) {
          wx.showToast({
            icon: 'none',
            title: '没有此权限',
            duration: 2500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    } else {
      console.log("不请求")
      return
    }
  },
  // 去通知详情
  tonoticedetail: function (e) {
    console.log('通知详情', e)
    let rcbId = e.currentTarget.dataset.rcbid
    wx.navigateTo({
      url: `/packageA/pages/notices/noticedetail/noticedetail?rcbId=${rcbId}`,
    })
  }
})