import data from '../../../../route/api/baseUrl'
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
import {
  selfPermissions // 判断权限有无
} from '../../../../route/admin/admin'
import {
  getRoomReimbursements, // 获取报销分页
  roomReimbursementCheck, // 店长驳回通过
  smallAreaReimbursementCheck, // 小区驳回通过
  bigAreaReimbursementCheck, // 大区驳回通过
  getRoomReimbursementDetail // 报销详情
} from '../../../../route/mine/operatingdatas/operatingdata'
Page({
  data: {
    month: 1,
    day: 1,
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    summoney: 0, // 报销总额
    webServerUrl: data.webServerUrl,
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    totalPages: 0, // 总页面
    type: 1, // type值 一共五种
    list: [], //列表数据
    isend: false, // 是否最后一页
    isworker: true, // 是否有权限驳回通过
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    years: [],
    months,
    days,
    value1: [],
    year: '',
  },
  onLoad: function (options) {
    this.fresh()
    this.getlist()
    // 自己有无按钮权限
    selfPermissions().then(res => {
      let that = this
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:growUp:clickStatus') {
            that.setData({
              isworker: false
            })
            break
          }
        }
      }
    })
  },
  // 加载
  fresh: function () {
    let that = this
    const date = new Date()
    const years = []
    for (let i = 2010; i <= date.getFullYear(); i++) {
      years.push(i)
    }
    that.setData({
      years: years
    })
    let yearnow = date.getFullYear(); //获取完整的年份(4位)
    let monthnow = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    let daynow = date.getDate() // (1-31)
    let valuecurrent = [999, monthnow - 1, daynow - 1]
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    if (daynow < 10) {
      daynow = '0' + daynow
    }
    let currentTime = yearnow + '-' + monthnow + '-' + daynow
    console.log('今日日期', currentTime)
    that.setData({
      months: months,
      days: days,
      value1: valuecurrent,
      year: date.getFullYear(),
      startTime: currentTime, // 开始时间
      endTime: currentTime, // 结束时间
    })

  },
  // 驳回
  finebutton: function (e) {
    let roomcheckstate = e.currentTarget.dataset.roomcheckstate
    let smallareacheckstate = e.currentTarget.dataset.smallareacheckstate
    let bigareacheckstate = e.currentTarget.dataset.bigareacheckstate
    let id = e.currentTarget.dataset.id
    let state = e.currentTarget.dataset.state
    let shopkeeperinput = this.data.shopkeeperinput
    let smallareainput = this.data.smallareainput
    let bigareainput = this.data.bigareainput
    if (shopkeeperinput == '') {
      shopkeeperinput == -1
    }
    if (smallareainput == '') {
      smallareainput == -1
    }
    if (bigareainput == '') {
      bigareainput == -1
    }
    // 店长未审核
    if (roomcheckstate == 0) {
      let params = {
        id: id,
        checkStatus: state,
        shopManagerAdvise: shopkeeperinput
      }
      console.log('店长驳回参数', params)
      roomCheckDutyUpgradeAssessment(params).then(res => {
        if (res.data.code == 200) {
          console.log('店长驳回成功', res)
          wx.showToast({
            icon: 'none',
            title: '驳回成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
    // 小区  店长必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 0) {
      let params = {
        id: id,
        checkStatus: state,
        advise: smallareainput
      }
      console.log('小区驳回参数', params)
      smallAreaCheckDutyUpgradeAssessment(params).then(res => {
        if (res.data.code == 200) {
          console.log('小区驳回成功', res)
          wx.showToast({
            icon: 'none',
            title: '驳回成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
    // 大区  店长和小区必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 1 && bigareacheckstate == 0) {
      let params = {
        id: id,
        checkStatus: state,
        advise: bigareainput
      }
      console.log('大区驳回参数', params)
      bigAreaCheckDutyUpgradeAssessment(params).then(res => {
        if (res.data.code == 200) {
          console.log('大区驳回成功', res)
          wx.showToast({
            icon: 'none',
            title: '驳回成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
  },
  // 通过
  sure: function (e) {
    let roomcheckstate = e.currentTarget.dataset.roomcheckstate
    let smallareacheckstate = e.currentTarget.dataset.smallareacheckstate
    let bigareacheckstate = e.currentTarget.dataset.bigareacheckstate
    let id = e.currentTarget.dataset.id
    let state = e.currentTarget.dataset.state
    let shopkeeperinput = this.data.shopkeeperinput
    let smallareainput = this.data.smallareainput
    let bigareainput = this.data.bigareainput
    if (shopkeeperinput == '') {
      shopkeeperinput == -1
    }
    if (smallareainput == '') {
      smallareainput == -1
    }
    if (bigareainput == '') {
      bigareainput == -1
    }
    // 店长未审核
    if (roomcheckstate == 0) {
      let params = {
        id: id,
        checkStatus: state,
        shopManagerAdvise: shopkeeperinput
      }
      console.log('店长通过参数', params)
      roomCheckDutyUpgradeAssessment(params).then(res => {
        if (res.data.code == 200) {
          console.log('店长通过成功', res)
          wx.showToast({
            icon: 'none',
            title: '通过成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
    // 小区  店长必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 0) {
      let params = {
        id: id,
        checkStatus: state,
        advise: smallareainput
      }
      console.log('小区通过参数', params)
      smallAreaCheckDutyUpgradeAssessment(params).then(res => {
        if (res.data.code == 200) {
          console.log('小区通过成功', res)
          wx.showToast({
            icon: 'none',
            title: '通过成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
    // 大区  店长和小区必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 1 && bigareacheckstate == 0) {
      let params = {
        id: id,
        checkStatus: state,
        advise: bigareainput
      }
      console.log('大区通过参数', params)
      bigAreaCheckDutyUpgradeAssessment(params).then(res => {
        if (res.data.code == 200) {
          console.log('大区通过成功', res)
          wx.showToast({
            icon: 'none',
            title: '通过成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
  },
  // 点击确定 || 取消
  tapDialogButton: function (e) {
    // 确定
    if (e.detail.index == 1) {
      console.log(this.data.startTime, this.data.endTime)
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
      // 请求分页数据
      this.getlist()
    }
    // 取消
    else {
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
    }
  },

  // 下拉刷新
  getlist: function () {
    console.log('下拉')
    this.setData({
      isend: false,
      currPage: 1,
      list: [],
    })
    this.loadMore()
  },
  // 上拉加载
  loadMore() {
    console.log('上拉')
    let that = this
    // 获取当前页 数量 是否请求 开始时间 结束时间
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    let startTime = this.data.startTime
    let endTime = this.data.endTime
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      currPage: currPage,
      pageSize: pageSize,
      startTime: startTime,
      endTime: endTime
    }
    if (!isend) {
      console.log("加载更多")
      getRoomReimbursements(params).then(res => {
        that.setData({
          back: false
        })
        console.log("默认请求", res)
        if (res.data.code == 200) {
          console.log("分页列表数据", res.data.data.contents)
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
  // 去报销详情
  goexpenserecorddetail: function () {
    // 带着id去获取报销详情
    wx.navigateTo({
      url: '/packageD/pages/operatingdatas/expenserecorddetail/expenserecorddetail'
    })
  },
  // 点击打开时间选择器
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  // 获取开始时间
  bindChange1(e) {
    const val = e.detail.value
    console.log(val)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      isDaytime: !val[3]
    })
    let year = this.data.year.toString()
    let month = this.data.month.toString()
    let day = this.data.day.toString()
    let startTime = year + '-' + month + '-' + day
    console.log(startTime)
    this.setData({
      startTime: startTime
    })

  },
  // 获取结束时间
  bindChange2(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      isDaytime: !val[3]
    })
    let year = this.data.year.toString()
    let month = this.data.month.toString()
    let day = this.data.day.toString()
    let endTime = year + '-' + month + '-' + day
    console.log(endTime)
    this.setData({
      endTime: endTime
    })
  }
})