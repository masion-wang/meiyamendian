import {
  selfFirmKpiSystem, // 获取处罚规章
  punishmentStaff // 惩罚员工
} from '../../../../route/mine/myteam/myteam'
// baseSalary   底薪   ？？？
// creditScore 信用分
// desc 详情
// rsbId 员工id
// title 主题
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl:data.webServerUrl,
    // 弹窗修改状态
    dialogShow: false,
    showOneButtonDialog: false,
    isshow: true,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    items: [{
        name: '可接待',
        value: '可接待'
      },
      {
        name: '有顾客',
        value: '有顾客',
      },
      {
        name: '过牌',
        value: '过牌'
      }
    ],
    sonofitems: [{
      name: '的大幅度'
    }, {
      name: '的大幅度'
    }, {
      name: '的大幅度'
    }, {
      name: '的大幅度'
    }, {
      name: '的大幅度'
    }],
    activeIndex: 0,
    ///////////////////////////////////////////////////
    theme: '',
    content: '',
    seven: [], // 主题
    seven2: [], // 详情
    isstart: false,
    isstart2: false,
    id: '', // 用户id
    withdrawalPoints: '', // 提现分
    creditScore: '', // 扣除信用分
    deductAmount: '', // 扣除金额
    name: '' // 名字
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      name: options.name
    })
    console.log('员工id', options.id)
  },
  onShow: function () {
    let that = this
    selfFirmKpiSystem().then(res => {
      if (res.data.code == 200) {
        console.log('规章制度', res)
        if (res.data.data.firmKpiValueDtos.length == 0) {
          return
        }
        if (res.data.data.firmKpiValueDtos.length != 0) {
          that.setData({
            seven: res.data.data.firmKpiValueDtos
          })

        }
      }
    })
  },
  // 主题打开关闭
  opens: function () {
    console.log(11111)
    let isstart = this.data.isstart

    this.setData({
      isstart: !isstart,
      isstart2: false,
      isshow: false
    })
  },
  // 详情打开关闭
  opensdetail: function () {
    let isshow = this.data.isshow
    let isstart2 = this.data.isstart2
    this.setData({
      isstart2: !isstart2,
      isshow: !isshow
    })
  },
  // 主题选择 + 获取详情
  selectOne: function (e) {
    console.log('e', e)
    this.setData({
      theme: ''
    })
    let index = e.currentTarget.dataset.index
    let seven = this.data.seven
    let name = e.currentTarget.dataset.name
    console.log('seven', seven)
    // 关闭下拉菜单
    this.setData({
      isstart: false,
      seven2: seven[index].firmKpiSystemDtos,
      theme: name,
      isshow: true,
      content: ''
    })
  },
  // 详情选择 + 获取详情
  selectOne2: function (e) {
    console.log('e', e)
    this.setData({
      content: ''
    })
    let index = e.currentTarget.dataset.index
    let seven2 = this.data.seven2
    let details = e.currentTarget.dataset.details
    console.log('seven2', seven2)
    // 关闭下拉菜单
    this.setData({
      isstart2: false,
      content: details,
      isshow: true
    })
  },
  // 主题+详情关闭
  opens2: function () {
    this.setData({
      isstart: false,
      isstart2: false,
      isshow: true
    })
  },
  sureup: function () {
    // 获取参数
    let theme = this.data.theme
    let content = this.data.content
    let id = this.data.id
    let withdrawalPoints = this.data.withdrawalPoints
    let creditScore = this.data.creditScore
    let deductAmount = this.data.deductAmount
    let params = {
      title: theme,
      desc: content,
      rsbId: id,
      baseSalary: -1,
      withdrawalPoints: withdrawalPoints,
      creditScore: 20,
      deductAmount: deductAmount,
    }
    // 主题和详情必须有内容
    console.log(theme.length, content.length)
    if (theme.length == 0 || content.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '主题和详情不能为空',
      })
      return
    }
    if (withdrawalPoints.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入提现分',
      })
      return
    }
    if (deductAmount.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入金额',
      })
      return
    }
    // 提交惩罚
    punishmentStaff(params).then(res => {
      if (res.data.code == 200) {
        console.log('提交惩罚', res)
        wx.showToast({
          icon: 'none',
          title: '提交成功',
          duration: 1500,
          success: function () {
            setTimeout(() => {
              wx.navigateTo({
                url: '/packageD/pages/myteams/finerecords/finerecords'
              })
            }, 1000)
          }
        })
      }
    })
  },
  // 惩罚记录
  tofinerecords: function () {
    wx.navigateTo({
      url: '/packageD/pages/myteams/finerecords/finerecords'
    })
  },
  // 获取主题
  gettheme: function (e) {
    let theme = e.detail.value
    this.setData({
      theme: e.detail.value
    })
  },
  // 获取详情
  getdetails: function (e) {
    let content = e.detail.value
    this.setData({
      content: e.detail.value
    })
  },
  // 获取提现分
  getwithdrawalPoints: function (e) {
    let withdrawalPoints = e.detail.value
    this.setData({
      withdrawalPoints: e.detail.value
    })
  },
  // 获取信用分
  getcreditScore: function (e) {
    let creditScore = e.detail.value
    this.setData({
      creditScore: e.detail.value
    })
  },
  // 扣除金额
  getdeductAmount: function (e) {
    let deductAmount = e.detail.value
    this.setData({
      deductAmount: e.detail.value
    })
  },
  // // 点击修改员工状态
  // openConfirm: function () {
  //   this.setData({
  //     dialogShow: true,
  //     isShow: false
  //   })
  // },
  // // 员工弹窗
  // tapDialogButton(e) {
  //   this.setData({
  //     dialogShow: false,
  //     showOneButtonDialog: false,
  //     isShow: true
  //   })
  // },
  // // 获取状态
  // radioChange: function (e) {
  //   console.log('radio发生change事件，携带value值为：', e)
  // },
  // // 选择为红
  // chooseOne: function (e) {
  //   console.log(e)
  //   let index = e.currentTarget.dataset.index
  //   this.setData({
  //     activeIndex: index
  //   })
  // }
})