import {
  getGroupBookingOrderDetail,
  getUserArchives // 这里的用户档案主要用于判断
} from '../../../../route/order/index'
import data from '../../../../route/api/baseUrl'
import {
  getUserCstmCardRcds, // 会员卡充值记录 
} from '../../../../route/index/appointorder/customerdetail'
Page({
  data: {
    odId: '',
    groupBookingOrderItemDto: {}, // 拼团
    webServerUrl: data.webServerUrl
  },
  onLoad: function (options) {
    let that = this
    this.setData({
      odId: options.id
    })
    let params = {
      odId: options.id
    }
    console.log('传递参数', params)
    getGroupBookingOrderDetail(params).then(res => {
      console.log('拼团', res)
      if (res.data.code == 200) {
        console.log('拼团', res)
        that.setData({
          groupBookingOrderItemDto: res.data.data.groupBookingOrderItemDto
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '后台繁忙',
        })
      }
    })
  },
  // 去消费记录
  toexpensesrecord: function (e) {
    let that = this
    console.log('消费记录', e.currentTarget.dataset.uid)
    let uid = e.currentTarget.dataset.uid
    let params = {
      uid: uid
    }
    // 跳转之前需要判断一下
    getUserCstmCardRcds(params).then(res => {
      if (res.data.code == 200) {
        wx.navigateTo({
          url: `/packageA/pages/appointorder/customerdetail/customerdetail?uid=${uid}`,
        })
      }
      if (res.data.code == 10030) {
        wx.showToast({
          icon: 'none',
          title: '消费档案不在请咨询同事',
          duration: 2000
        })
        return
      }
    })



  },
  // 去档案标签
  gotoprofile: function (e) {
    console.log("标签档案", e.currentTarget.dataset.uid)
    let uid = e.currentTarget.dataset.uid
    let params = {
      uid: uid
    }
    // 跳转之前需要判断一下
    getUserArchives(params).then(res => {
      if (res.data.code == 200) {
        wx.navigateTo({
          url: `/packageA/pages/appointorder/profiles/profile/profile?uid=${uid}`,
        })
      }
      if (res.data.code == 10030) {
        wx.showToast({
          icon: 'none',
          title: '用户档案不在请咨询同事',
          duration: 2000
        })
        return
      }
    })
  }

})