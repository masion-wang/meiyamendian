import {
  getOdRemark, // 获取备忘信息
  setRoomStaffProOdRemark // 提交备注信息
} from '../../../route/index/appointorder/memorandum'
Page({
  data: {
    id: '',
    isable: true,
    remark: '',
    time: ''
  },
  onLoad: function (options) {
    let that = this
    let id = options.id
    console.log('接收到备忘录id', id)
    this.setData({
      id: id
    })
    // 获取备注信息
    let params = {
      proOdId: options.id
    }
    getOdRemark(params).then(res => {
      console.log("获取备注信息", res)
      if (res.data.code == 200) {
        if (res.data.data.roomStaffProOd.remark == '-1') {
          res.data.data.roomStaffProOd.remark = ''
        }
        that.setData({
          remark: res.data.data.roomStaffProOd.remark,
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
      remark: e.detail.value.trim()
    })
  },
  // 编辑或保存
  editOrsave: function () {
    let id = this.data.id
    let remark = this.data.remark
    let isable = this.data.isable
    // 保存
    // if (!isable) {
    let params = {
      proOdId: id,
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
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 500)
          }
        })
      }
    })
    // }
    // isable = !isable
    this.setData({
      isable: isable
    })

  }
})