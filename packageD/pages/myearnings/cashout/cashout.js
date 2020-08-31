import data from '../../../../route/api/baseUrl'
import {
  selfRoomRollOut, // 门店设置
  staffCanWithdrawAmount, // 获取自己能提现的余额
  getSelfMySysUserInfo, // 获取手机号
  sendBalanceWithdrawPhoneCaptcha, // 获取验证码-余额
  balanceAccountWithdraw, // 余额提现
  submitStaffCertification // 传递code值接口
} from '../../../../route/mine/myearnings/myearnings'

import {
  getSelfCertification // 获取认证
} from '../../../../route/mine/mineprofile/mineprofile'
Page({
  data: {
    restmoney2: 0, // 奖励金账户
    restmoney3: 0, // 股东账户
    isShowReward: false, // 奖励金账户
    isShowholder: false, // 股东账户
    isShowRest: true, // 余额账户
    // 验证码相关
    code: '',
    canTouch: true, // 是否点击
    seconds: 0, // 倒计时总计
    timer: '', // 计时器
    // 弹窗选择员工
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    /////////////////////////////////////////
    webServerUrl: data.webServerUrl,
    tabs: [],
    restmoney: 0, // 未提现金额 (就是余额)
    restmoney1: 0, // 可提现金额 (可以提现的全部金额)
    phone: '', // 手机号
    status: '', // 状态码
    dayvalue: '', // 几号
    daynow: '', // 本月几号
    withdrawWay: -1, // 提现方式
    isprocessdone: true, // 提现过程是否完成
    isPcSet: false // PC端是否配置上
  },
  onLoad: function (options) {
    this.fresh()
    console.log('options', options.restmoney)
    this.setData({
      restmoney: options.restmoney
    })
    // 初始化tabs数据
    const titles = [{
      title: '余额账户',
      id: 0
    }]
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs
    })
  },
  // const date = new Date()
  // let daynow = date.getDate() // 获取当天
  fresh: function () {
    let date = new Date()
    let daynow = date.getDate() // 获取当天
    this.setData({
      daynow: daynow
    })
  },
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
    // 2.获取手机号
    getSelfMySysUserInfo().then(res => {
      if (res.data.code = 200) {
        console.log('res', res)
        that.setData({
          phone: res.data.data.sysUser.uname
        })
      }
    })
    // 3.获取可提现余额接口  0 就不能提现
    staffCanWithdrawAmount().then(res => {
      if (res.data.code == 200) {
        console.log('可提现余额', res)
        that.setData({
          restmoney1: res.data.data.amount
        })
      }
    })
    // 4.门店设置  本月当天日期小于 规则日期 不能提现
    selfRoomRollOut().then(res => {
      if (res.data.code == 200) {
        console.log('门店设置', res)
        if (!res.data.data.roomStaffRollOut) {
          wx.showToast({
            icon: 'none',
            title: '公司未配置提现日期',
            duration: 3000
          })
          that.setData({
            isPcSet: false
          })
          return
        }
        that.setData({
          dayvalue: res.data.data.roomStaffRollOut.dayValue,
          isPcSet: true
        })

      }
    })
  },
  // 获取获取验证码 倒计时
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
    sendBalanceWithdrawPhoneCaptcha().then(res => {
      if (res.data.code == 200) {
        console.log('验证码', res)
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
  // 金额大于0 才可以打开验证码弹窗
  open: function () {
    let status = this.data.status
    let withdrawWay = this.data.withdrawWay
    // 如果状态不为1 说明没有认证通过
    // 审核状态 -1 未提交过 0 表示待处理 1 表示已认证 2 驳回
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
    // 0 微信 1 银行卡
    if (withdrawWay < 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择提现方式'
      })
      return
    }
    this.setData({
      dialogShow: true
    })
    // 获取验证码
    this.getCode()
  },
  // 输入验证码 确定
  tapDialogButton: function (e) {
    console.log(e.detail.index)
    // 是否完成提现过程
    let isprocessdone = this.data.isprocessdone
    // 确定按钮
    if (e.detail.index == 1) {
      // 1.根据账户的type 确定提现的是那种类型账户的钱
      // 2.获取相应的参数  code验证码 金额 id?
      // 3.提现金额不能超过余额
      // 获取参数
      let that = this
      let money = this.data.restmoney1
      let code = this.data.code
      let withdrawWay = this.data.withdrawWay
      // 验证码为空 不可以提现
      if (code.length == 0) {
        wx.showToast({
          icon: 'none',
          title: '请输入验证码'
        })
        return
      }
      let params = {
        amount: money,
        phoneCaptcha: code,
        withdrawWay: withdrawWay
      }
      console.log('参数', params)
      // 提现余额
      // 如果请求没完成 点击无效
      if (!isprocessdone) {
        return
      }
      balanceAccountWithdraw(params).then(res => {
        console.log('提现成功', res)
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
          })
        }
      })

    }
    // 取消按钮
    if (e.detail.index == 0) {
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false,

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
  // 点击清空 余额 restmoney1  
  getZerorestmoney1: function (e) {
    this.setData({
      restmoney1: ''
    })
  },
























  // 获取提现方式
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      withdrawWay: e.detail.value
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