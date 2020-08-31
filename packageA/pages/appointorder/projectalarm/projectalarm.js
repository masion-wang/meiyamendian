import {
  userNumberCardRemind,
  setUserNumberCardRemind
} from '../../../../route/index/appointorder/projectalarm'
const months = []
const days = []
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = '0' + i
    months.push(i)
  } else {
    months.push(i)
  }
}
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = '0' + i
    days.push(i)
  } else {
    days.push(i)
  }
}
Page({
  data: {
    // 弹窗修改状态
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 日期数据
    years: [],
    year: '',
    currentTime: '',
    months,
    days,
    month: 1,
    day: 1,
    value1: [],
    isDaytime: true,
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    uid: '',
    permDays: 0, // 间隔天数
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    isend: false, // 是否最后一页
    list: [] // 历史记录
  },
  onLoad: function (options) {
    let that = this
    that.fresh()
    console.log('会员uid', options.uid)
    this.setData({
      uid: options.uid
    })
    // 获取上次设置情况
    let params = {
      userNumberCardId: options.uid
    }
    userNumberCardRemind(params).then(res => {
      if (res.data.code == 200) {
        console.log('上次设置为', res)
        if (!res.data.data.remind) {

        } else {
          that.setData({
            permDays: res.data.data.remind.intervalDays,
            endTime: res.data.data.remind.prevTime
          })
        }

      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
      }
    })
  },
  fresh: function () {
    let that = this
    let date = new Date()
    let years = []
    let year = date.getFullYear()
    for (let i = 2010; i <= date.getFullYear(); i++) {
      years.push(i)
    }
    this.setData({
      years: years,
      year: year
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
    this.setData({
      currentTime: currentTime,
      value1: valuecurrent,
      endTime: currentTime
    })
  },
  // 获取今天的年月日
  getDate: function () {
    let year2 = new Date().getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month < 10) {
      month = '0' + month
    }
    let time = year2 + "-" + month + "-" + day; //表示当前日期
    console.log('今天年月日', time)
    this.setData({
      endTime: time
    })
  },
  // 点击修改员工状态
  selecttime: function () {
    this.setData({
      dialogShow: true
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
  },
  // 点击确定 || 取消
  tapDialogButton: function (e) {
    console.log(this.data.startTime, this.data.endTime)
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  // 获取间隔时间
  getday: function (e) {
    console.log(e.detail.value)
    this.setData({
      permDays: e.detail.value
    })
  },
  nothing: function () {
    this.setData({
      permDays: ''
    })
  },
  judgetime: function (start, end) {
    let arr = start.split('-')
    let startTime = new Date(arr[0], arr[1] - 1, arr[2]).getTime()
    // 今天的时间抽
    let arr2 = end.split('-')
    let endTime = new Date(arr2[0], arr2[1] - 1, arr2[2]).getTime()
    // 如果超过今天
    if (endTime - startTime < 0) {
      return true
    } else {
      return false
    }
  },
  // 提交信息
  save: function () {
    let permDays = this.data.permDays
    // 选择的时间 的时间抽
    let endTime = this.data.endTime
    let currentTime = this.data.currentTime
    console.log('上次项目时间', endTime)
    let isover = this.judgetime(endTime, currentTime)
    // 如果超过今天
    if (isover) {
      wx.showToast({
        icon: 'none',
        title: '时间不能超过今天',
      })
      return
    }
    let uid = this.data.uid
    // intervalDays prevTim userNumberCardId
    let params = {
      intervalDays: permDays,
      prevTime: endTime,
      userNumberCardId: uid
    }
    setUserNumberCardRemind(params).then(res => {
      console.log("上传成功", res)
      if (res.data.code == 200) {
        console.log("上传成功", res)
        wx.showToast({
          title: '修改成功',
          duration: 1000,
          success: function () {
            let timer = setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
              clearTimeout(timer)
            }, 1000)
          }
        })
      } else if (res.data.code == 10002) {
        wx.showToast({
          icon: 'none',
          title: '间隔天数和项目时间必选',
          duration: 3000
        })
        return
      } else {
        wx.showToast({
          icon: 'none',
          title: '后台繁忙'
        })
      }
    })
  }
})

// const date = new Date()
// const years = []
// for (let i = 2010; i <= date.getFullYear(); i++) {
//   years.push(i)
// }
// let yearnow = date.getFullYear(); //获取完整的年份(4位)
// let monthnow = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
// let daynow = date.getDate() // (1-31)
// let valuecurrent = [999, monthnow - 1, daynow - 1]
// if (monthnow < 10) {
//   monthnow = '0' + monthnow
// }
// if (daynow < 10) {
//   daynow = '0' + daynow
// }
// let currentTime = yearnow + '-' + monthnow + '-' + daynow

    // 请求数据 渲染
    // this.loadMore()

  // 上拉加载
  // loadMore() {
  //   console.log('上拉')
  //   let that = this
  //   // 获取当前页 类型 信息数量 是否请求
  //   let isend = this.data.isend
  //   let uid = this.data.uid
  //   let currPage = this.data.currPage
  //   let pageSize = this.data.pageSize
  //   console.log("当前分页", currPage, '请求信息数', pageSize)
  //   let params = {
  //     uid: uid,
  //     currPage: currPage,
  //     pageSize: pageSize
  //   }
  //   if (!isend) {
  //     console.log("加载更多")
  //     getPermRcds(params).then(res => {
  //       console.log("默认请求", res)
  //       if (res.data.code == 200) {
  //         console.log("分页列表数据", res.data.data.contents)
  //         console.log("总页数", res.data.data.totalPages)
  //         if (res.data.data.contents.length < pageSize) {
  //           console.log("最后一页")
  //           that.setData({
  //             isend: true
  //           })
  //         } else {
  //           that.setData({
  //             isend: false
  //           })
  //         }
  //         let currPage = ++that.data.currPage
  //         let list = that.data.list.concat(res.data.data.contents)
  //         that.setData({
  //           list: list,
  //           currPage: currPage
  //         })
  //       } else {
  //         wx.showToast({
  //           icon: 'none',
  //           title: '后台繁忙',
  //         })
  //       }
  //     })
  //   } else {
  //     console.log("不请求")
  //     return
  //   }
  // },