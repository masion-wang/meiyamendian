import data from '../../../route/api/baseUrl'
import {
  getSelfInviteCode
} from '../../../route/mine/invitecode/invitecode'
Page({
  data: {
    code: '',
    webServerUrl: data.webServerUrl
  },
  onLoad: function (options) {
    this.getcode()
  },
  // 获取邀请码
  getcode: function () {
    let that = this
    getSelfInviteCode().then(res => {
      if (res.data.code == 200) {
        console.log('res', res)
        that.setData({
          code: res.data.data.inviteCode
        })
      } else if (res.data.code == 10004) {
        wx.showToast({
          icon: 'none',
          title: '没有相关权限',
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
          icon: "none",
          title: res.data.message + ":" + res.data.code,
          duration: 2000,
        });
      }
    })
  }
})