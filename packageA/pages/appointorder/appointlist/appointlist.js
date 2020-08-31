import {
  getMyReservedOrder,
} from '../../../../route/index/appointorder/appointlist'
import {
  getUserArchives // 这里的用户档案主要用于判断
} from '../../../../route/order/index'
import {
  getUserCstmCardRcds, // 会员卡充值记录也是用于判断
} from '../../../../route/index/appointorder/customerdetail'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    back: false,
    webServerUrl: data.webServerUrl,
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    totalPages: 0, // 总页面
    type: 1, // type值 一共五种
    list: [], //列表数据
    isend: false // 是否最后一页
  },
  onLoad: function (options) {
    this.getlist()
    // this.upper()
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
  // 拨打技术电话
  callPhone(e) {
    console.log('e', e.target.dataset.phone)
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone
    })
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
      getMyReservedOrder(params).then(res => {
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
  // 跳转标签档案
  toprofile: function (e) {
    console.log("标签档案", e.currentTarget.dataset.uid)
    let uid = e.currentTarget.dataset.uid
    let params = {
      uid: uid
    }
    getUserArchives(params).then(res => {
      if (res.data.code == 200) {
        wx.navigateTo({
          url: `/packageA/pages/appointorder/profiles/profile/profile?uid=${uid}`,
          success: function (res) { }
        })
      }
      if (res.data.code == 10030) {
        wx.showToast({
          icon: 'none',
          title: '标签档案不在请咨询同事',
          duration: 2000
        })
        return
      }
    })
  },
  // 跳转会员详情
  tocustomerdetail: function (e) {
    console.log('去会员详情页', e)
    let uid = e.currentTarget.dataset.id
    let sort = e.currentTarget.dataset.sort
    let id = e.currentTarget.dataset.idx
    if (uid == undefined) {
      wx.showToast({
        icon: 'none',
        title: '消费档案不在请咨询同事'
      })
      return
    }
    let params = {
      uid: uid
    }
    getUserCstmCardRcds(params).then(res => {
      if (res.data.code == 200) {
        wx.navigateTo({
          url: `/packageA/pages/appointorder/customerdetail/customerdetail?uid=${uid}&&sort=${sort}&&id=${id}`,
        })
      }
      if (res.data.code == 10030) {
        wx.showToast({
          icon: 'none',
          title: '消费档案不在请咨询同事'
        })
      }
    })


  },
  // 跳转备忘录
  tomemorandum: function (e) {
    console.log("备注", e.currentTarget.dataset.proodid)
    let proOdId = e.currentTarget.dataset.proodid
    wx.navigateTo({
      // /pages/index/appointorder/memorandum/memorandum?proOdId=${proOdId}
      url: `/packageA/pages/appointorder/memorandum/memorandum?proOdId=${proOdId}`,
      success: function (res) { }
    })
  }
})