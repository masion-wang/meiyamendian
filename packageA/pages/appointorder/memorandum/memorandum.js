import {
  getOdRemark, // 获取备忘信息
  setRoomStaffProOdRemark // 提交备注信息
} from '../../../../route/index/appointorder/memorandum'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    isable: true,
    proOdId: '',
    remark: '',
    time: ''
  },
  onLoad: function (options) {
    let that = this
    // 获取用户id
    console.log('备注是订单的id', options)
    this.setData({
      proOdId: options.proOdId
    })
    // 获取备注信息
    let params = {
      proOdId: options.proOdId
    }
    getOdRemark(params).then(res => {
      console.log("获取备注信息", res)
      if (res.data.code == 200) {
        let remark
        if (res.data.data.roomStaffProOd.remark == -1) {
          remark = ""
        } else {
          remark = res.data.data.roomStaffProOd.remark
        }
        that.setData({
          remark: remark,
          time: res.data.data.roomStaffProOd.remarkUpdateTime
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '后台繁忙'
        })
      }
    })
  },
  getvalue: function (e) {
    console.log("获取值", e.detail.value)
    this.setData({
      remark: e.detail.value
    })
  },
  // 编辑或保存
  editOrsave: function () {
    let proOdId = this.data.proOdId
    let remark = this.data.remark
    let params = {
      proOdId: proOdId,
      remark: remark
    }
    // 提交数据
    setRoomStaffProOdRemark(params).then(res => {
      console.log("提交信息", res)
      if (res.data.code == 200) {
        wx.showToast({
          title: '提交成功',
          duration: 500,
          success: function () {
            let timer = setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
              clearTimeout(timer)
            }, 500)
          }
        })
      } else if (res.data.code == 10002) {
        wx.showToast({
          icon: 'none',
          title: '不能超过200个字',
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