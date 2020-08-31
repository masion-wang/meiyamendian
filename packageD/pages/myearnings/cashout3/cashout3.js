import data from '../../../../route/api/baseUrl'
import {
  getSelfMySysUserInfo, // 获取手机号
  sendShareHolderWithdPhoneCaptcha, // 获取验证码-股东
  shareHolderAccountWithdraw, // 股东提现
  selfFirmShareWithdrawSet // 获取股东设置
} from '../../../../route/mine/myearnings/myearnings'
import {
  selfShareHolderInfo // 获取股东认证信息
} from '../../../../route/mine/index/index'
Page({
  data: {
    // 弹窗选择员工
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    webServerUrl: data.webServerUrl,
    tabs: [],
    code: '', // 手机验证码
    canTouch: true, // 是否点击
    seconds: 0, // 倒计时总计
    timer: '', // 计时器
    ////////////////////////////////////////////////////
    restmoney: 0, // 未提现金额 
    restmoney1: 0, // 可提现金额
    phone: '', // 手机号
    shareHolder: {}, // 股东余额信息
    firmShareWithdrawSet: {}, // 股东设置
    certificationstatus: 0, // 股东认证状态0 未认证 1 待处理 2 认证通过 3 认证失败
    withdrawWay: -1, // 提现方式
    isprocessdone: true // 提现过程是否完成
  },
  onLoad: function (options) {
    // 初始化tabs数据
    const titles = [{
      title: '股东账户',
      id: 2
    }]
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs
    })
  },
  onShow: function () {
    let that = this
    // 判断认证情况 是否通过 没通过不能提现
    // 审核状态 -1 未提交过 0 表示待处理 1 表示已认证 2 驳回
    selfShareHolderInfo().then(res => {
      if (res.data.code = 200) {
        console.log('认证信息', res)
        that.setData({
          certificationstatus: res.data.data.shareHolder.certificationStatus,
          shareHolder: res.data.data.shareHolder
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

    // 获取股东配置
    selfFirmShareWithdrawSet().then(res => {
      if (res.data.code == 200) {
        console.log('股东设置', res)
        if (!res.data.data.firmShareWithdrawSet) {
          wx.showToast({
            icon: 'none',
            title: '公司未配置提现比例',
            duration: 3000
          })
          return
        }
        that.setData({
          firmShareWithdrawSet: res.data.data.firmShareWithdrawSet
        })
      }
    })
  },
  // 打开弹窗
  open: function () {
    // 认证情况
    let certificationstatus = this.data.certificationstatus
    let withdrawWay = this.data.withdrawWay
    console.log('certificationstatus', certificationstatus)
    // 如果不通过 提示请先认证
    if (certificationstatus != 2) {
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
    // 如果没有选择提现方式
    // 0 微信 1 银行卡
    if (withdrawWay < 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择提现方式'
      })
      return
    }
    // 获取验证码
    this.setData({
      dialogShow: true
    })
    this.getCode()
  },
  // 输入验证码 确定
  tapDialogButton: function (e) {
    let that = this
    console.log(e.detail.index)
    // 是否完成提现过程
    let isprocessdone = this.data.isprocessdone
    // 确定按钮
    if (e.detail.index == 1) {
      // 获取参数
      let shareHolder = that.data.shareHolder
      let amount = shareHolder.canWithdrawBalance
      let code = that.data.code
      if (code.length == 0) {
        wx.showToast({
          icon: 'none',
          title: '请输入验证码'
        })
        return
      }
      let params = {
        amount: amount,
        phoneCaptcha: code
      }
      console.log('params', params)
      // 股东提现
      // 如果请求没完成 点击无效
      if (!isprocessdone) {
        return
      }
      shareHolderAccountWithdraw(params).then(res => {
        that.setData({
          isprocessdone: true
        })
        if (res.data.code == 200) {
          console.log('股东提现成功', res)
          wx.showToast({
            icon: 'none',
            title: '提现成功',
            success: function () {
              setTimeout(() => {
                that.setData({
                  dialogShow: false,
                  showOneButtonDialog: false
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
            duration: 1500
          })
        }
      })
    }
    // 取消按钮
    if (e.detail.index == 0) {
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
    }
  },
  // 获取验证码 倒计时
  getCode: function () {
    let that = this
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
    sendShareHolderWithdPhoneCaptcha().then(res => {
      if (res.data.code == 200) {
        console.log('res', res)
      }
    })
  },
  // 获取验证码
  getcode: function (e) {
    console.log('e', e)
    this.setData({
      code: e.detail.value
    })
  },
  // 判断账户类型
  onTabCLick: function (e) {
    let that = this
    console.log("账户类型id", e.detail.id)
    if (e.detail.id == 0) {
      that.setData({
        isShowRest: true,
        isShowReward: false,
        isShowholder: false
      })
    } else if (e.detail.id == 1) {
      that.setData({
        isShowRest: false,
        isShowReward: true,
        isShowholder: false
      })
    } else if (e.detail.id == 2) {
      that.setData({
        isShowRest: false,
        isShowReward: false,
        isShowholder: true
      })
    }
  },
  // 获取余额
  getrestmoney1: function (e) {
    console.log('e', e)
    let money = e.detail.value
    money = Number(money)
    // console.log('money', money)
    this.setData({
      restmoney1: money
    })
    console.log('余额(有可能为NAN)并且不能超过该用户余额总额', this.data.restmoney1)
  },
  // 获取奖励金账户
  getrestmoney2: function (e) {
    console.log('e', e)
    let money = e.detail.value
    money = Number(money)
    this.setData({
      restmoney2: money
    })
    console.log('奖励金(有可能为NAN)并且不能超过该用户余额总额', this.data.restmoney2)
  },
  // 获取股东账户
  getrestmoney3: function (e) {
    console.log('e', e)
    let money = e.detail.value
    money = Number(money)
    // console.log('money', money)
    this.setData({
      restmoney3: money
    })
    console.log('股东账户(有可能为NAN)并且不能超过该用户余额总额', this.data.restmoney3)
  },
  // 点击清空 余额 restmoney1  
  getZerorestmoney1: function (e) {
    this.setData({
      restmoney1: ''
    })
  },
  // 点击清空 奖励金账户 restmoney2  
  getZerorestmoney2: function (e) {
    this.setData({
      restmoney2: ''
    })
  },
  // 点击清空 股东账户 restmoney3
  getZerorestmoney3: function (e) {
    this.setData({
      restmoney3: ''
    })
  }
})