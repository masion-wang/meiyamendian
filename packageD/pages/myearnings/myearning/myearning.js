import {
  getSelfIncome, // 获取收益情况-员工
} from '../../../../route/mine/myearnings/myearnings'
import {
  selfShareHolderInfo, // 获取收益情况-股东
} from '../../../../route/mine/index/index'
import {
  getSelfMySysUserInfo, // 获取身份情况
} from '../../../../route/index/guanjiaoutside/guanjiaoutside'
import data from '../../../../route/api/baseUrl'
import {
  getSelfRoomStaffBaseInfo // 控制 余额提现 奖励金提现权限的接口
} from '../../../../route/admin/admin'

Page({
  data: {
    webServerUrl: data.webServerUrl,
    roomStaffAccount: {}, // 员工 提现分 余额 奖励金信息
    shareHolder: {}, // 股东余额信息
    admintype: 0, // 身份type
    baseAccountPay: false, // 余额是否可以点击
    awardAccountPay: false, // 奖励金是否可以点击
  },
  onLoad: function (options) {},
  // 获取我的收益
  onShow: function () {
    let that = this
    // 先获取自己的身份
    getSelfMySysUserInfo().then(res => {
      if (res.data.code == 200) {
        console.log('身份type', res)
        that.setData({
          admintype: res.data.data.sysUser.adminType
        })
        // 根据admintype获取员工 || 股东 的接口
        that.workerorholder()
      }
    })

  },
  // 员工 || 股东 的收益情况
  workerorholder: function () {
    let that = this
    // 获取我的收益状态 员工 || 股东
    // 1.员工
    let admintype = this.data.admintype
    if (admintype == 6) {
      getSelfIncome().then(res => {
        if (res.data.code == 200) {
          console.log('我的收益情况', res)
          if (res.data.data.roomStaffAccount) {
            that.setData({
              roomStaffAccount: res.data.data.roomStaffAccount
            })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        }
      })
      // 进行 余额 + 奖励金 权限控制
      that.getSelfRoomStaffBaseInfo()
    }
    // 2.股东
    if (admintype == 5) {
      console.log('股东')
      selfShareHolderInfo().then(res => {
        console.log('股东的收益的情况', res)
        that.setData({
          shareHolder: res.data.data.shareHolder
        })
      })
      // 进行 股东提现的 权限控制
    }
  },
  // 控制 余额提现 奖励金提现权限的接口  前提是admintype==6
  getSelfRoomStaffBaseInfo: function () {
    let that = this
    let admintype = this.data.admintype
    if (admintype == 6) {
      getSelfRoomStaffBaseInfo().then(res => {
        if (res.data.code == 200) {
          console.log('获取余额提现 奖励金提现的权限', res)
          let awardAccountPay = res.data.data.roomStaffBaseDto.roomStaffAccount.awardAccountPay.toString()
          let baseAccountPay = res.data.data.roomStaffBaseDto.roomStaffAccount.baseAccountPay.toString()
          console.log('awardAccountPay baseAccountPay', awardAccountPay, baseAccountPay)
          // 奖励金余额
          if (awardAccountPay == 'true') {
            that.setData({
              awardAccountPay: true
            })
          } else {
            that.setData({
              awardAccountPay: false
            })
          }
          // 余额的余额
          if (baseAccountPay == 'true') {
            that.setData({
              baseAccountPay: true
            })
          } else {
            that.setData({
              baseAccountPay: false
            })
          }
        }
      })
    }
  },
  // 控制 股东提现的权限 前提是admintype==5 
  // 转账
  totransfer: function (e) {
    console.log('e', e)
    let passmoney = e.currentTarget.dataset.passmoney - 0
    if (passmoney <= 0) {
      wx.showToast({
        icon: 'none',
        title: '余额不足 禁止转账',
        duration: 1500
      })
      return
    }
    wx.navigateTo({
      url: '/packageD/pages/myearnings/transfer/transfer',
    })
  },
  // 提现-余额
  tocashout: function (e) {
    console.log('e', e)
    let restmoney = e.currentTarget.dataset.restmoney
    let baseAccountPay = this.data.baseAccountPay
    if (!baseAccountPay) {
      wx.showToast({
        icon: 'none',
        title: '暂无权限',
      })
      return
    }
    wx.navigateTo({
      url: `/packageD/pages/myearnings/cashout/cashout?restmoney=${restmoney}`
    })
  },
  // 余额-奖励金
  tocashout2: function (e) {
    console.log('e', e)
    let restmoney = e.currentTarget.dataset.restmoney
    let score = e.currentTarget.dataset.score
    let awardAccountPay = this.data.awardAccountPay
    if (!awardAccountPay) {
      wx.showToast({
        icon: 'none',
        title: '暂无权限',
      })
      return
    }
    wx.navigateTo({
      url: `/packageD/pages/myearnings/cashout2/cashout2?restmoney=${restmoney}&&score=${score}`
    })
  },
  // 余额-股东
  tocashout3: function (e) {
    console.log('股东 e', e.currentTarget.dataset.restmoney)
    let restmoney = e.currentTarget.dataset.restmoney
    wx.navigateTo({
      url: `/packageD/pages/myearnings/cashout3/cashout3?restmoney=${restmoney}`,
    })
  },
  // 全部明细
  tomoneyrecord: function () {
    wx.navigateTo({
      url: '/packageD/pages/myearnings/moneyrecord/moneyrecord',
    })
  }
})