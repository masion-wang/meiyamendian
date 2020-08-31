import {
  getSimpleUserInfo, // 用户信息
  getUserOrderConsumeRcds, // 消费记录
  getUserNumCardRcds, // 办卡记录
  getUserCstmCardRcds, // 会员卡开卡记录
  userListTop, // 设置置顶
  cancelUserListTop // 取消置顶
} from '../../../../route/index/appointorder/customerdetail'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    uid: '', // 用户uid
    id: '', // 列表id
    user: {}, // 用户信息
    cus: [], // 顾客消费记录
    card: [], // 办卡记录
    topup: [], // 会员卡记录
    sort: -1 // 大于0 置顶 小于等于0 没置顶
  },
  onLoad: function (options) {
    let that = this
    // 获取用户uid
    console.log('会员详情', "uid", options.uid, "sort", options.sort, 'id', options.id)
    let uid = options.uid
    let sort = options.sort
    let id = options.id
    this.setData({
      uid: uid,
      sort: sort,
      id: id
    })
    let params1 = {
      uid: uid
    }
    let params2 = {
      uid: uid,
      currPage: 1,
      pageSize: 3
    }
    // 获取会员详情(四个接口)
    getSimpleUserInfo(params1).then(res => {
      console.log("用户信息", res)
      if (res.data.code == 200) {
        console.log(res.data.data.user)
        that.setData({
          user: res.data.data.user
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
    // 消费
    getUserOrderConsumeRcds(params2).then(res => {
      console.log("消费记录", res)
      if (res.data.code == 200) {
        that.setData({
          cus: res.data.data.contents
        })
      }
      // else if (res.data.code == '10022') {
      //   wx.showToast({
      //     icon: 'none',
      //     title: '没有相关权限',
      //     duration: 1000,
      //     success: function () {
      //       setTimeout(() => {
      //         wx.navigateBack({
      //           delta: 1
      //         })
      //       }, 1000)
      //     }
      //   })
      // } 
      else {
        wx.showToast({
          icon: 'none',
          title: res.data.message,
        })
      }
    })
    // 办次卡
    getUserNumCardRcds(params2).then(res => {
      console.log("办卡记录", res)
      if (res.data.code == 200) {
        that.setData({
          card: res.data.data.contents
        })
      } 
    })
    // 办会员卡
    getUserCstmCardRcds(params1).then(res => {
      console.log("会员卡记录", res)
      if (res.data.code == 200) {
        that.setData({
          topup: res.data.data.firmUserDataDto
        })
      }
    })
  },
  // 去档案信息
  gotoprofile: function (e) {
    console.log("标签档案", e.currentTarget.dataset.uid)
    let uid = e.currentTarget.dataset.uid
    wx.navigateTo({
      // /pages/index/appointorder/profiles/profile/profile?uid=${uid}
      url: `/packageA/pages/appointorder/profiles/profile/profile?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 去消费记录
  toexpensesrecord: function () {
    // 用户id
    let uid = this.data.uid
    wx.navigateTo({
      // /pages/index/appointorder/expensesrecord/expensesrecord?uid=${uid}
      url: `/packageA/pages/appointorder/expensesrecord/expensesrecord?uid=${uid}`,
    })
  },
  // 去办卡记录
  tocardrecord: function () {
    // 用户id
    let uid = this.data.uid
    // /pages/index/appointorder/cardrecord/cardrecord?uid=${uid}
    wx.navigateTo({
      url: `/packageA/pages/appointorder/cardrecord/cardrecord?uid=${uid}`,
    })
  },
  // 去会员卡充值记录
  torechargerecord: function () {
    // 用户id
    let uid = this.data.uid
    // /pages/index/appointorder/rechargerecord/rechargerecord?uid=${uid}
    wx.navigateTo({
      url: `/packageA/pages/appointorder/rechargerecord/rechargerecord?uid=${uid}`,
    })
  },
  // 设为置顶
  toup: function () {
    let that = this
    let userListId = this.data.id
    let params = {
      userListId: userListId
    }
    userListTop(params).then(res => {
      if (res.data.code == 200) {
        console.log('置顶成功', res)
        that.setData({
          sort: 100
        })
        wx.showToast({
          title: '置顶成功',
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message,
        })
      }
    })
  },
  // 取消置顶
  cancelup: function () {
    let that = this
    let userListId = this.data.id
    let params = {
      userListId: userListId
    }
    cancelUserListTop(params).then(res => {
      if (res.data.code == 200) {
        console.log('取消成功', res)
        that.setData({
          sort: -100
        })
        wx.showToast({
          title: '取消成功',
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message,
        })
      }
    })
  }
})