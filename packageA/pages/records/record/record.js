import {
  getAcceptedRcds
} from '../../../../route/index/records/record'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    // back: false,
    webServerUrl: data.webServerUrl,
    tabs: [], // 今天0 昨天1 过去一周2
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    totalPages: 0, // 总页面
    searchType: 0, // 时间类型
    list: [], //列表数据
    isend: false // 是否最后一页
  },
  onLoad: function (options) {
    // 初始化tabs数据
    const titles = [{
      title: '今天',
      id: 0
    }, {
      title: '昨天',
      id: 1
    }, {
      title: '近七天',
      id: 2
    }]
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs
    })
    // this.getlist()
  },
  onShow: function () {
    this.getlist()
  },
  // 今天 昨天 过去一周
  onTabCLick: function (e) {
    let that = this
    // 重置isend 和当前页数 还有数组信息
    that.setData({
      isend: false,
      currPage: 1,
      list: [],
    })
    // 今天
    if (e.detail.id == 0) {
      that.setData({
        searchType: 0
      })
      this.loadMore()
    }
    // 昨天
    else if (e.detail.id == 1) {

      that.setData({
        searchType: 1
      })
      this.loadMore()
    }
    // 近7天
    else if (e.detail.id == 2) {
      that.setData({
        searchType: 2
      })
      this.loadMore()
    }

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
    let that = this
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend
    let currPage = this.data.currPage
    let searchType = this.data.searchType
    let pageSize = this.data.pageSize
    console.log("当前分页", currPage, "时间类型", searchType, '信息数', pageSize)
    let params = {
      currPage: currPage,
      pageSize: pageSize,
      searchType: searchType
    }
    if (!isend) {
      console.log("加载更多")
      getAcceptedRcds(params).then(res => {
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
              let timer = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
                clearTimeout(timer)
              }, 2000)
            },
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
  // 去分配页 || 已经分配页
  totapdealcardgold: function (e) {
    console.log('上一个页面的type 和 id', e)
    // 获取type值 和 id
    let type = e.currentTarget.dataset.type
    let id = e.currentTarget.dataset.id
    let acceptedstatus = e.currentTarget.dataset.acceptedstatus
    if (acceptedstatus == 0) {
      wx.navigateTo({
        // /pages/index/records/dealcardgold/dealcardgold?type=${type}&id=${id}
        url: `/packageA/pages/records/dealcardgold/dealcardgold?type=${type}&id=${id}`,
        success: function (res) {}
      })
    } else if (acceptedstatus == 1) {
      wx.navigateTo({
        // /pages/index/records/checkcardgold/checkcardgold?type=${type}&id=${id}
        url: `/packageA/pages/records/checkcardgold/checkcardgold?type=${type}&id=${id}`,
        success: function (res) {}
      })
    }

  }
})