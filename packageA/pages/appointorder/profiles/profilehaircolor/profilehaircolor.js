import {
  setDyeHair,
  getDyeHairRcds
} from '../../../../../route/index/appointorder/profile'
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
    months,
    month: 1,
    days,
    day: 1,
    year: '',
    value1: [],
    endTime: '', // 结束时间
    isDaytime: true,
    uid: '',
    dyeHairDays: 0,
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    isend: false, // 是否最后一页
    list: [] // 历史记录
  },
  onLoad: function (options) {
    console.log('会员uid', options.uid)
    this.setData({
      uid: options.uid
    })
    // 请求数据 渲染
    this.loadMore()
    // 获取今天日期
    // this.getDate()
    this.fresh()
  },
  fresh: function () {
    let that = this
    let date2 = new Date()
    let years = []
    for (let i = 2010; i <= date2.getFullYear(); i++) {
      years.push(i)
    }
    that.setData({
      years: years
    })
    let yearnow = date2.getFullYear(); // 获取完整的年份(4位)
    let monthnow = date2.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
    let daynow = date2.getDate() // (1-31)
    let valuecurrent = [999, monthnow - 1, daynow - 1]
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    if (daynow < 10) {
      daynow = '0' + daynow
    }
    let currentTime = yearnow + '-' + monthnow + '-' + daynow
    that.setData({
      year: yearnow,
      value1: valuecurrent,
      endTime: currentTime // 结束时间
    })
  },
  // 提交信息
  save: function () {
    let dyeHairDays = this.data.dyeHairDays
    let endTime = this.data.endTime
    let date3 = new Date()
    let yearnow = date3.getFullYear(); // 获取完整的年份(4位)
    let monthnow = date3.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
    let daynow = date3.getDate() // (1-31)
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    if (daynow < 10) {
      daynow = '0' + daynow
    }
    let currentTime = yearnow + '-' + monthnow + '-' + daynow
    let isover = this.judgetime(endTime, currentTime)
    let ispastover = this.judgetimeRange(endTime, currentTime, dyeHairDays)
    // 如果超过今天
    if (isover) {
      wx.showToast({
        icon: 'none',
        title: '时间不能超过今天',
      })
      return
    }
    // 如果超过间隔范围
    if (ispastover) {
      wx.showToast({
        icon: 'none',
        title: '选择日期不能超过间隔天数范围',
        duration: 1500
      })
      return
    }
    let uid = this.data.uid
    let params = {
      dyeHairDays: dyeHairDays,
      dyeHairPrevTime: endTime,
      uid: uid
    }
    setDyeHair(params).then(res => {
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
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
      }
    })
  },
  // 上拉加载
  loadMore() {
    console.log('上拉')
    let that = this
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend
    let uid = this.data.uid
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      uid: uid,
      currPage: currPage,
      pageSize: pageSize
    }
    if (!isend) {
      console.log("加载更多")
      getDyeHairRcds(params).then(res => {
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
      dyeHairDays: e.detail.value
    })
  },
  nothing: function () {
    this.setData({
      dyeHairDays: ''
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
  // 选择时间不能超过间隔范围
  judgetimeRange: function (start, end, range) {
    // 选择日期的时间戳
    let arr = start.split('-')
    let startTime = new Date(arr[0], arr[1] - 1, arr[2]).getTime()
    // 今天的时间戳
    let arr2 = end.split('-')
    let endTime = new Date(arr2[0], arr2[1] - 1, arr2[2]).getTime()
    let up = endTime - startTime // 选择日期距离今天的范围
    // 一天的时间戳
    let range2 = range * 86400000
    // 超出间隔范围
    if (up > range2) {
      return true
    } else {
      return false
    }


  }
})