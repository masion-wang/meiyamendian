const months = []
const days = []
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = '0' + i
  }
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = '0' + i
  }
  days.push(i)
}
import data from '../../../../route/api/baseUrl'
import {
  getSelfRoomKpiAssessByMonth, // 月份的分页
  getSelfRoomKpiAssessByQuarter, // 季度的分页
  getStaffKpiValuesAssess, // 获取员工kpi价值观考核信息
  getSelfFirmKpiValueRegulation, // 获取自己公司的kpi价值观奖罚规则
  setStaffKpiValuesAssess, // 设置员工kpi价值观考核内容
  selfFirmAssessUser // 获取审核人信息
} from '../../../../route/mine/kpi/kpi'
Page({
  data: {
    months,
    isred: false, // 扣分
    isorange: false, // 给分
    // 弹窗修改时间参数
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 四季
    fourseason: [{
      name: '第一季度',
      id: '1'
    }, {
      name: '第二季度',
      id: '2'
    }, {
      name: '第三季度',
      id: '3'
    }, {
      name: '第四季度',
      id: '4'
    }],
    webServerUrl: data.webServerUrl, // 0 公共部分
    activeIndex: 1, // 四季单选
    isstart: false, // 下拉菜单 展开收起
    isopen: false, // 审核标准展开收起
    showModalStatus: false, // 控制底部弹窗弹出收起
    showModal: false, // 打开关闭价值观弹窗
    start: '', // 下拉菜单
    seven: [], // 月份
    firmKpiValueRwdPntRcdDtos: [], // 具体某一大项5个价值观  月份
    firmKpiValueRegulations: [], // 规章制度  
    threeitem: [{
      name: '扣分',
      img: data.webServerUrl + '/images/mine/kpi/lose.png',
      status: 0
    }, {
      name: '给分',
      img: data.webServerUrl + '/images/mine/kpi/give.png',
      status: 1
    }, {
      name: '提升',
      status: 2
    }],
    threeindex: -1, // 扣分 给分 提升
    rsbId: '', // 七大项rsbId
    /////////////////////////////////////////////////////////
    tab: [], // 月份和季度
    isMonth: true, // 月份
    isSeason: false, // 季度
    kpiid: '', // kpi信息的id
    cause: '', // 原因内容 
    status: -1, // status状态: 0扣分 1给分 2提升(默认不扣不给)
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    list: [], //列表数据
    isend: false, // 是否最后一页
    sysUserDtos: [], // 考核人信息
    iscover: false, // 是否遮罩
    touchend: false, // 是否结束上次请求
    years: [],
    value: [],
    year: '', // 默认当年
    month: '', // 默认当月(上个月)
    startTime: '', // 默认当年当月
    year2: '', // 临时年
    month2: '', // 临时月
    startTime2: '' // 临时年月
  },
  onLoad: function (options) {
    let that = this
    // 初始化tabs数据
    const titles = [{
      title: '按月份',
      id: 0
    }, {
      title: '按季度',
      id: 1
    }]
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs
    })
    // 获取审核人信息
    selfFirmAssessUser().then(res => {
      if (res.data.code == 200) {
        console.log('获取审核人信息', res.data.data.sysUserDtos)
        that.setData({
          sysUserDtos: res.data.data.sysUserDtos
        })
      }
    })
    this.fresh()
  },
  fresh: function () {
    let that = this
    let date = new Date()
    let years = []
    for (let i = 2010; i <= date.getFullYear(); i++) {
      years.push(i)
    }
    that.setData({
      years: years
    })
    let yearnow = date.getFullYear(); // 获取当年
    let monthnow = date.getMonth() + 1; // 获取当月
    let daynow = date.getDate() // 获取当天
    // 获取当月第一天
    let valuecurrent = [999, monthnow - 1]
    // let valuecurrent = [999, monthnow - 1 - 1] // 先默认上个月
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    if (daynow < 10) {
      daynow = '0' + daynow
    }
    let currentTime = yearnow + '-' + monthnow // 默认当月

    // 获取值
    that.setData({
      value: valuecurrent,
      year: date.getFullYear(), // 默认当年
      month: monthnow, // 默认当月(上个月)
      startTime: currentTime, // 默认当年当月
      year2: yearnow, // 临时年
      month2: monthnow, // 临时月
      startTime2: currentTime, // 临时年月
      webServerUrl: data.webServerUrl, // 0 公共部分
    })
    this.getlist()
  },
  // tab 切换月份 季度
  onTabCLick: function (e) {
    let that = this
    let index = e.detail.index
    console.log('index', index)
    // 按月份
    if (index == 0) {
      console.log('按月份')
      this.setData({
        isMonth: true,
        isSeason: false,
        activeIndex: 1,
      })
      // 按月份获取接口
      this.getlist()
    }
    // 按季度
    else if (index == 1) {
      console.log('按季度 当前季度为', this.data.activeIndex)
      this.setData({
        isSeason: true,
        isMonth: false,
        activeIndex: 1
      })
      // 按季度获取接口
      this.getlist2()
    }
  },
  onShow: function () {},
  // 下拉刷新1
  getlist: function () {
    console.log('下拉')
    this.setData({
      isend: false,
      currPage: 1,
      list: [],
    })
    this.loadMore()
  },
  // 下拉刷新2
  getlist2: function () {
    console.log('下拉')
    this.setData({
      isend: false,
      currPage: 1,
      list: [],
    })
    this.loadMore2()
  },
  // 上拉加载(月份)
  loadMore() {
    console.log('上拉')
    let that = this
    let iscover = this.data.iscover
    if (iscover) {
      return
    }
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    let year = this.data.year
    let month = this.data.month
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      year: year,
      month: month,
      currPage: currPage,
      pageSize: pageSize,
    }
    that.setData({
      iscover: true
    })
    // 请求
    if (!isend) {
      console.log("加载更多")
      getSelfRoomKpiAssessByMonth(params).then(res => {
        console.log("默认请求", res)
        if (res.data.code == 200) {
          console.log("分页列表数据月份", res.data.data.contents)
          console.log("总页数", res.data.data.totalPages)
          // 返回数量小于请求条数
          if (res.data.data.contents.length < pageSize) {
            console.log("最后一页")
            that.setData({
              isend: true
            })
          } else {
            that.setData({
              isend: false
            })
          }
          // 请求下一页
          let currPage = ++that.data.currPage
          let list = that.data.list.concat(res.data.data.contents)
          that.setData({
            list: list,
            currPage: currPage,
          })
          that.setData({
            iscover: false
          })
        } else if (res.data.code == 10004) {
          wx.showToast({
            icon: 'none',
            title: '没有此权限',
            duration: 2500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
          that.setData({
            iscover: false
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
          that.setData({
            iscover: false
          })
        }
      })
    }
    // 不请求
    else {
      console.log("不请求")
      that.setData({
        iscover: false
      })
      return
    }
  },
  // 上拉加载(季度)
  loadMore2() {
    console.log('上拉')
    let that = this
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    let quarter = this.data.activeIndex
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      currPage: currPage,
      pageSize: pageSize,
      quarter: quarter
    }
    if (!isend) {
      console.log("加载更多")
      getSelfRoomKpiAssessByQuarter(params).then(res => {
        console.log("默认请求", res)
        if (res.data.code == 200) {
          console.log("分页列表数据季度", res.data.data.contents)
          console.log("总页数", res.data.data.totalPages)
          if (res.data.data.contents.length < pageSize) {
            console.log("最后一页")
            that.setData({
              isend: true
            })
          } else {
            that.setData({
              isend: false
            })
          }
          let currPage = ++that.data.currPage
          let list = that.data.list.concat(res.data.data.contents)
          that.setData({
            list: list,
            currPage: currPage
          })
        } else if (res.data.code == 10004) {
          wx.showToast({
            icon: 'none',
            title: '没有此权限',
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
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    } else {
      console.log("不请求")
      return
    }
  },
  // 1.打开价值观对话框 获取员工价值观情况
  showDialogBtn: function (e) {
    let that = this
    console.log('e', e)
    let year = this.data.year
    let month = this.data.month
    let rsbId = e.currentTarget.dataset.rsbid
    let params = {
      year: year,
      month: month,
      rsbId: rsbId
    }
    // 保存7大项目的id
    this.setData({
      rsbId: rsbId
    })
    // 打开
    this.setData({
      showModal: true
    })
    // 获取 month rsbId year
    getStaffKpiValuesAssess(params).then(res => {
      if (res.data.code == 200) {
        console.log('员工价值', res)
        that.setData({
          seven: res.data.data.firmKpiValueRwdPntRcdDtos,
          start: res.data.data.firmKpiValueRwdPntRcdDtos[0].name,
          firmKpiValueRwdPntRcdDtos: res.data.data.firmKpiValueRwdPntRcdDtos[0].firmKpiValueRwdPntRcdDtos
        })
      }
    })

  },
  // 1-2 获取员工价值观情况
  // showDialogBtn2: function () {
  //   let that = this
  //   let year = this.data.year
  //   let month = this.data.month
  //   let rsbId = this.data.rsbId
  //   let params = {
  //     year: year,
  //     month: month,
  //     rsbId: rsbId
  //   }
  //   // 获取 month rsbId year
  //   getStaffKpiValuesAssess(params).then(res => {
  //     if (res.data.code == 200) {
  //       console.log('员工价值', res)
  //       return
  //       that.setData({
  //         seven: res.data.data.firmKpiValueRwdPntRcdDtos,
  //         start: res.data.data.firmKpiValueRwdPntRcdDtos[0].name,
  //         firmKpiValueRwdPntRcdDtos: res.data.data.firmKpiValueRwdPntRcdDtos[0].firmKpiValueRwdPntRcdDtos
  //       })
  //     }
  //   })
  // },
  // 2.选择打分项下拉菜单某一项
  selectOne: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let seven = this.data.seven
    console.log('seven', seven)
    // 关闭下拉菜单
    this.setData({
      isstart: false
    })
    // 选择价值观情况
    console.log('价值观', e)
    let start = e.currentTarget.dataset.name
    // 修改名字 + 和对应价值观情况
    this.setData({
      start: start,
      firmKpiValueRwdPntRcdDtos: seven[index].firmKpiValueRwdPntRcdDtos
    })
    // 新的名字和新的价值观
    console.log('新的名字', '新的价值观', start, this.data.firmKpiValueRwdPntRcdDtos)
  },






  // 3.展开收起审核标准 获取审核标准
  openOrClose: function () {
    let that = this
    let isopen = this.data.isopen
    // 如果要打开标准 关闭下拉菜单
    if (!isopen) {
      this.setData({
        isstart: false
      })
      // 请求审核制度
      getSelfFirmKpiValueRegulation().then(res => {
        if (res.data.code == 200) {
          console.log('公司审核制度', res)
          that.setData({
            firmKpiValueRegulations: res.data.data.firmKpiValueRegulations
          })
        }
      })
    }
    this.setData({
      isopen: !isopen
    })
  },
  // 4.关闭下拉框+标准 打开底部弹窗 获取 设置员工kpi的id kpiValueAssessRcdId
  edit: function (e) {
    // 如果不是本年本月 不能打开底部弹窗
    // let month2 = this.data.month2 // 临时月
    // let year2 = this.data.year2 // 临时年

    // console.log('用户当前年月', year2, month2)
    // console.log('真实世界的当前年月', yearnow, monthnow)
    // if (year2 != yearnow || month2 != monthnow) {
    //   wx.showToast({
    //     icon: 'none',
    //     title: '请勿操作非本月员工的kpi数据'
    //   })
    // }

    let kpiValueAssessRcdId = e.currentTarget.dataset.kpivaldataid
    this.setData({
      kpiid: kpiValueAssessRcdId
    })
    this.setData({
      isstart: false,
      isopen: false
    })
    this.openbottom();
    console.log('kpi记录的id', this.data.kpiid)
  },
  // 5.选择扣分 给分 提升 获取status
  oneofthree: function (e) {
    let index = e.currentTarget.dataset.index
    let status = e.currentTarget.dataset.status
    console.log('状态值', status)
    this.setData({
      threeindex: index,
      status: status
    })
  },
  // 6.提交惩奖励数据
  save: function () {
    // 获取参数
    let that = this
    let status = this.data.status
    let kpiid = this.data.kpiid
    let cause = this.data.cause
    // 判断状态是否选中 没有选中不能提交
    if (status == -1) {
      wx.showToast({
        icon: 'none',
        title: '请执行奖惩分数操作'
      })
      return
    }
    if (cause.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '考评内容不能为空'
      })
      return
    }
    let params = {
      status: status,
      kpiValueAssessRcdId: kpiid,
      cause: cause
    }
    // 设置员工奖励惩法操作
    setStaffKpiValuesAssess(params).then(res => {
      if (res.data.code == 200) {
        console.log('奖励惩罚结果', res)
        // 隐藏底部弹窗
        that.hideModal2()
        // 重新获取员工价值情况
        // that.showDialogBtn2()
      } else if (res.data.code == 10004) {
        wx.showToast({
          icon: 'none',
          title: '没有权限操作',
          duration: 2000
        })
      } else if (res.data.code == 10031) {
        wx.showToast({
          icon: 'none',
          title: '请勿操作非本月员工的kpi数据',
          duration: 2000
        })
      }
    })
  },
  // 7.点击确定时间 请求getlist()
  tapDialogButton: function (e) {
    let that = this
    // 获取时间参数 年月 年 月
    let startTime2 = this.data.startTime2
    let year2 = this.data.year2
    let month2 = this.data.month2
    // 确定
    if (e.detail.index == 1) {
      // 赋值
      this.setData({
        startTime: startTime2,
        year: year2,
        month: month2
      })
      // 请求当前年月份的分页接口
      this.getlist()
    }
    // 取消 
    else {}
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  // 8.四个季度交互方式 请求季度分页接口
  whichOne: function (e) {
    console.log('现在季度', e)
    let index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index
    })
    console.log('当前季度', this.data.activeIndex)
    this.getlist2()
  },














  // 一些样式交互
  // 扣分交互
  red: function () {
    this.setData({
      isred: true,
      isorange: false
    })
  },
  // 给分交互
  orange: function () {
    this.setData({
      isred: false,
      isorange: true
    })
  },
  // 打开弹窗 保存上一次数据
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  // 获取用户选择时间值
  bindChangeArea: function (e) {
    const val = e.detail.value
    console.log(val)
    this.setData({
      year2: this.data.years[val[0]],
      month2: this.data.months[val[1]],
    })
    let year2 = this.data.year2.toString()
    let month2 = this.data.month2.toString()
    let startTime2 = year2 + '-' + month2
    this.setData({
      startTime2: startTime2
    })
    console.log('开始时间', startTime2, '年的参数', this.data.year2, '月的参数', this.data.month2)
  },
  // 关闭价值观对话框
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  // 关闭价值观对话框
  onCancel: function () {
    this.hideModal();
  },
  // 展开收起打分项下拉菜单
  opens: function () {
    // 关闭标准
    this.setData({
      isopen: false
    })
    console.log(1111)
    let isstart = this.data.isstart
    this.setData({
      isstart: !isstart
    })
  },
  // 显示底部弹窗
  openbottom: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  // 隐藏底部弹框
  hideModal2: function () {
    console.log('隐藏底部弹窗')
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      status: -1, // 状态恢复默认没选
      threeindex: -1, // 样式清空
      cause: '' // 内容为空
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  // 弹出框蒙层截断touchmove事件
  preventTouchMove: function () {},
  // 获取原因内容
  inputcause: function (e) {
    console.log('e', e)
    let detail = e.detail.value
    this.setData({
      cause: detail
    })
    console.log('输入内容', detail)
  }
})