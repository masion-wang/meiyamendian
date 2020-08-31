import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    items: [{
        value: '0',
        name: '兑换功能'
      },
      {
        value: '1',
        name: '5000元奖励'
      }
    ],
    recordId: ""
  },
  onLoad: function (options) {
    console.log('option', options.recordId)
    let recordId = options.recordId
    this.setData({
      recordId: recordId
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
  },
  goohthersmallroutine: function () {
    let recordId = this.data.recordId
    wx.navigateToMiniProgram({
      appId: 'wxffed40c84ef92f70',
      path: `pages/register/register1/register1?recordId=${recordId}`,
      envVersion: 'trial', // trial release devleptrial
      success(res) {
        // 打开其他小程序成功同步触发
        wx.showToast({
          title: '跳转成功'
        })
        // complete(res) {
        //   console.log(res)
        // }
      }
    })
  },
  // 拨打技术电话
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: '400-6336-010'
    })
  }
})