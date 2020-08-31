import data from '../../../../route/api/baseUrl'
import {
  selfRoomRollOut, // 门店设置
  staffCanWithdrawAmount, // 获取自己能提现的余额
  sendAwardWithdrawPhoneCaptcha, // 获取验证码-奖励金
  awardAccountWithdraw, // 奖励金提现
  getSelfMySysUserInfo, // 获取手机号
} from '../../../../route/mine/myearnings/myearnings'
import {
  getSelfCertification // 获取认证
} from '../../../../route/mine/mineprofile/mineprofile'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    isShowRest: true, // 余额账户
    restmoney2: 0, // 奖励金账户
    restmoney3: 0, // 股东账户
    isShowReward: false, // 奖励金账户
    isShowholder: false, // 股东账户
    // 弹窗选择员工
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    code: '',
    canTouch: true, // 是否点击
    seconds: 0, // 倒计时总计
    timer: '', // 计时器
    /////////////////////////////////////
    tabs: [],
    restmoney: 0, // 未提现金额 总额
    score: 0, // 总的提现分
    restmoney1: 0, // 可提现金额
    phone: '', // 手机号
    status: 0, // 状态码
    withdrawscore: 0, // 提现分
    iscashout: false, // 是否可以提现 总额小于等于最低金额不可以 
    tips: false, // 提现分不满足最低限制的判断
    withdrawWay: -1, // 提现方式   0 是微信  1 是银行卡
    isprocessdone: true, // 提现过程是否完成
    isPcSet: false // PC端是否配置上
  },
  onLoad: function (options) {
    console.log('options', options.restmoney) // 奖励金余额
    console.log('options', options.score) // 总的提现分
    this.setData({
      restmoney: options.restmoney,
      score: options.score
    })
    const titles = [{
      title: '奖励金账户',
      id: 1
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
    // 3.门店设置
    selfRoomRollOut().then(res => {
      if (res.data.code == 200) {
        console.log('门店设置', res)
        if (!res.data.data.roomStaffRollOut) {
          wx.showToast({
            icon: 'none',
            title: '公司未配置最低提现金额',
            duration: 3000
          })
          that.setData({
            isPcSet: false
          })
          return
        }
        that.setData({
          withdrawscore: res.data.data.roomStaffRollOut.withdrawScore,
          isPcSet: true
        })

        // 获取参数 奖励金总额 提现分总额 最低限度奖励金额withdrawscore
        let restmoney = that.data.restmoney
        let score = that.data.score
        let withdrawscore = res.data.data.roomStaffRollOut.withdrawScore
        // 转成数字
        restmoney = restmoney - 0
        score = score - 0
        console.log('奖励金总额 提现分总额 最低限度奖励金额', restmoney, score, withdrawscore)
        // 如果总额小于最低额度 不提现
        if (restmoney - withdrawscore < 0) {
          that.setData({
            iscashout: false
          })
          return
        }
        // 如果总提现分小于最低额度 不提现 
        if (score - withdrawscore < 0) {
          that.setData({
            iscashout: false,
            tips: true // 出现提示语
          })
          wx.showToast({
            icon: 'none',
            title: '提现分未达到最低额度',
            duration: 1500
          })
          return
        }
        console.log('奖励金总额1111', restmoney, score)

        // 奖励金总额 > 提现分
        if (restmoney > score) {
          console.log('奖励金总额1', restmoney)
          that.setData({
            iscashout: true,
            restmoney1: score
          })
        }
        //  奖励金总额 == 提现分 
        if (restmoney == score) {
          console.log('奖励金总额2', restmoney)
          that.setData({
            iscashout: true,
            restmoney1: restmoney
          })
        }
        //  奖励金总额 < 提现分
        if (restmoney < score) {
          console.log('奖励金总额3', restmoney)
          that.setData({
            iscashout: true,
            restmoney1: restmoney
          })
        }
      }
    })
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
    sendAwardWithdrawPhoneCaptcha().then(res => {
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
  // 输入验证码 确定
  tapDialogButton: function (e) {
    console.log(e.detail.index)
    // 是否完成提现过程
    let isprocessdone = this.data.isprocessdone
    // 确定按钮
    if (e.detail.index == 1) {
      // 如果请求没完成 点击无效
      if (!isprocessdone) {
        return
      }
      // 1.根据账户的type 确定提现的是那种类型账户的钱
      // 2.获取相应的参数  code验证码 金额 id?
      // 3.提现金额不能超过余额
      // 获取参数
      let that = this
      let money = this.data.restmoney1
      let code = this.data.code
      let withdrawWay = this.data.withdrawWay
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
      // 提现奖励金
      // 正在请求中 再点击无效
      that.setData({
        isprocessdone: false
      })
      awardAccountWithdraw(params).then(res => {
        that.setData({
          isprocessdone: true
        })
        if (res.data.code == 200) {
          console.log('提现成功', res)
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
        showOneButtonDialog: false
      })
    }
  },
  // 打开弹窗
  open: function () {
    let withdrawWay = this.data.withdrawWay
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
    // 0 微信 1 银行卡
    if (withdrawWay < 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择提现方式'
      })
      return
    }
    // 先获取openid再执行下面的
    this.setData({
      dialogShow: true
    })
    // 获取验证码
    this.getCode()
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
  }
})