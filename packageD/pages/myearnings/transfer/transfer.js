import data from '../../../../route/api/baseUrl'
import {
  selfFirmRoomStaffInfo, // 获取公司员工
  selfRoomStaffInfo, // 获取门店员工
  getSelfMySysUserInfo, // 获取手机号
  sendTransferPhoneCaptcha, // 获取验证码-转账
  staffTransfer // 转账
} from '../../../../route/mine/myearnings/myearnings'
import {
  getSelfCertification // 获取认证
} from '../../../../route/mine/mineprofile/mineprofile'
Page({
  data: {
    webServerUrl: data.webServerUrl, // 静态路径
    ishide: true, // 隐藏textarea
    name: '', // 姓名
    readyname: '', // 临时名字
    id: '', // 员工id
    money: 0,
    reason: '', // 原因
    // 公司员工
    items: [],
    // 弹窗验证码
    dialogShow2: false,
    showOneButtonDialog2: false,
    // 弹窗选择员工
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 验证码相关
    iscode: false, // 同事名字和金额大于0
    code: '', // 验证码
    canTouch: true, // 是否点击
    seconds: 0, // 倒计时总计
    timer: '', // 计时器
    phone: '', // 手机号
    status: 0, // 手机状态码
    isprocessdone: true // 提现过程是否完成
  },
  onLoad: function (options) {},
  onShow: function () {
    let that = this
    // 1.判断认证情况 是否通过 审核状态 -1 未提交过 0 表示待处理 1 表示已认证 2 驳回
    getSelfCertification().then(res => {
      if (res.data.code = 200) {
        console.log('认证信息', res)
        that.setData({
          status: res.data.data.status,
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
    // 获取手机号
    getSelfMySysUserInfo().then(res => {
      if (res.data.code = 200) {
        console.log('res', res)
        that.setData({
          phone: res.data.data.sysUser.uname
        })
      }
    })
  },
  // 1获取同事id
  radioChange(e) {
    console.log("e", e)
    let items = this.data.items
    let value = e.detail.value
    let choosename = ''
    for (let i = 0; i < items.length; i++) {
      // 被选中checked为true
      if (items[i].id == value) {
        items[i].checked = true
        choosename = items[i].stageName
      } else {
        // 其它为false
        items[i].checked = false
      }
    }
    this.setData({
      readyname: choosename,
      id: value,
      items: items
    })
    let readyname = this.data.readyname
    // 获得名字和id
    console.log(readyname, value)
  },
  // 2 获取金额
  getmoney: function (e) {
    console.log(e.detail.value)
    this.setData({
      money: e.detail.value
    })
  },
  // 3 获取原因
  getreason: function (e) {
    console.log('e', e.detail.value)
    this.setData({
      reason: e.detail.value
    })
  },
  // 4 打开验证码弹窗
  transfermoney: function () {
    // 获取同事 金额
    let id = this.data.id
    let money = this.data.money
    let status = this.data.status

    // 如果状态不为1 说明没有认证通过  审核状态 -1 未提交过 0 表示待处理 1 表示已认证 2 驳回
    if (status != 1) {
      wx.showModal({
        title: '请先完成认证',
        content: '确认跳转到认证界面？',
        success(res) {
          // 确定
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/packageD/pages/certification/certification',
            })
          }
          // 取消
          else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    if (id == '') {
      wx.showToast({
        icon: 'none',
        title: '请选择同事',
      })
      return
    }
    if (money <= 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确金额',
      })
      return
    }


    // 判断是否认证
    this.setData({
      dialogShow2: true,
      ishide: false
    })
    this.getCode()
  },
  // 5 获取验证码 倒计时
  getCode: function () {
    // 判断是否可以点击
    let name = this.data.name
    let money = this.data.money
    let that = this
    if (name.length > 0 && money > 0) {
      // 不可触碰
      that.setData({
        canTouch: false
      })
      // 倒计时逻辑
      that.setData({
        seconds: 60,
        timer: setInterval(function () {
          let seconds = that.data.seconds
          that.setData({
            seconds: seconds - 1
          })
          if (that.data.seconds == 0) {
            that.setData({
              canTouch: true
            })
            // 读秒结束 清空计时器
            clearInterval(that.data.timer)
          }
        }, 1000)
      })
      // 获取验证码
      sendTransferPhoneCaptcha().then(res => {
        if (res.data.code == 200) {
          console.log('验证码', res)
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请输入同事名和金额',
        duration: 1000
      })
    }
  },
  // 6 输入验证码 确定
  tapDialogButton2: function (e) {
    let that = this
    // 验证码 同事id 原因 金额
    // 是否完成提现过程
    let isprocessdone = this.data.isprocessdone
    let code = this.data.code
    let id = this.data.id
    let reason = this.data.reason
    let money = this.data.money
    console.log(e.detail.index)
    // 确定
    if (e.detail.index == 1) {
      // 如果请求没完成 点击无效
      if (!isprocessdone) {
        return
      }
      //  amount  desc phoneCaptcha rsbId
      let params = {
        amount: money,
        desc: reason,
        phoneCaptcha: code,
        rsbId: id
      }
      that.setData({
        isprocessdone: false
      })
      staffTransfer(params).then(res => {
        that.setData({
          isprocessdone: true
        })
        if (res.data.code == 200) {
          wx.showToast({
            icon: 'none',
            title: '提交成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                that.setData({
                  dialogShow2: false,
                  showOneButtonDialog2: false
                })
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
      })
    }
    // 取消
    if (e.detail.index == 0) {
      this.setData({
        dialogShow2: false,
        showOneButtonDialog2: false,
        ishide: true
      })
    }

  },
  // 获取验证码
  getcode: function (e) {
    console.log('e', e)
    this.setData({
      code: e.detail.value
    })
  },
  // 打开弹窗 隐藏textarea 获取同事
  choose: function () {
    let that = this
    this.setData({
      dialogShow: true,
      ishide: false
    })
    // 公司员工
    selfRoomStaffInfo().then(res => {
      if (res.data.code == 200) {
        console.log('门店同事', res)
        that.setData({
          items: res.data.data.roomStaffBaseDtos
        })
      }
    })
  },
  // 清空为零
  clearZero: function () {
    // 清空数据零
    this.setData({
      money: ''
    })
  },
  // 关闭弹窗 显示textarea
  tapDialogButton: function (e) {
    console.log(this.data.items)
    console.log(e.detail.index)
    if (e.detail.index == 1) {
      let readyname = this.data.readyname
      this.setData({
        name: readyname
      })
    }
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false,
      ishide: true
    })
  }
})