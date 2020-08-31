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
  selfUnSuccessAccountDetails, // 待完成全部信息
  selfStaffAccountDetails // 自定义明细接口 一开始默认三天(今天 昨天 前天)
} from '../../../../route/mine/myearnings/myearnings'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    // 静态资源
    webServerUrl: data.webServerUrl,
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
    months: months,
    days: days,
    year: '',
    month: '',
    day: '',
    value2: [], // 前三天
    value1: [], // 今天
    startTimeshow: '', // 开始时间-显示
    endTimeshow: '', // 结束时间-显示
    startTime: '', // 开始时间-参数
    endTime: '', // 结束时间-参数
    startTime2: '', // 开始时间-临时
    endTime2: '', // 结束时间-临时
    // isdone: false,
    // islast: true, // 是否请求最后一次
    list: [], //列表数据
    isend: false, // 是否最后一页
    index: 0, // 就一次
    isoneheight: false, // 满足scrollview一页高度
    isloading: false, //   时间分割中的请求确实有数据
    nola: false // 刚开始默认三天一口气
  },
  onLoad: function (options) {
    this.fresh()
  },
  fmtDate: function (obj) {
    var date3 = new Date(obj);
    var y = 1900 + date3.getYear();
    var m = "0" + (date3.getMonth() + 1);
    var d = "0" + date3.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
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
    let yearnow = date2.getFullYear(); //获取完整的年份(4位)
    let monthnow = date2.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    let daynow = date2.getDate() // (1-31)
    let valuecurrent2 = [999, monthnow - 1, daynow - 3]
    let valuecurrent = [999, monthnow - 1, daynow - 1]
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    if (daynow < 10) {
      daynow = '0' + daynow
    }
    // 获取今天
    let currentTime = yearnow + '-' + monthnow + '-' + daynow // 默认今天
    let perday = 24 * 60 * 60 * 1000
    let todaycur = new Date(currentTime).getTime()
    let today3 = todaycur - (perday * 2)
    console.log('todaycur', 'today3', todaycur, today3)
    let currentTime2 = that.fmtDate(today3)

    that.setData({
      year: date2.getFullYear(),
      month: monthnow,
      day: daynow,
      value2: valuecurrent2,
      value1: valuecurrent,
      startTimeshow: currentTime2, // 开始时间-显示
      endTimeshow: currentTime, // 结束时间-显示
      startTime: currentTime2, // 开始时间-参数
      endTime: currentTime, // 结束时间-参数
      startTime2: currentTime, // 开始时间-临时
      endTime2: currentTime, // 结束时间-临时
    })
    this.readyandgetlist3() // 一开始就是默认三天的
  },
  // 默认三天 没有下拉这么一说
  readyandgetlist3: function () {
    let that = this
    // 先调用待完成接口
    selfUnSuccessAccountDetails().then(res => {
      if (res.data.code == 200) {
        console.log('待完成全部数据', res.data.data.detailsRecords)
        // 先把待完成的放到数组里面
        that.setData({
          list: res.data.data.detailsRecords
        })
        // 如果一开始待完成的数据 为空 暂无数据
        if (res.data.data.detailsRecords.length == 0) {
          // that.setData({
          //   isend: true
          // })
        }
        let startTime = this.data.startTime // 开始时间(每次)
        let endTime = this.data.endTime // 结束时间(每次)
        let params = {
          startTime: startTime,
          endTime: endTime
        }
        // 调用近三天的数据
        selfStaffAccountDetails(params).then(res => {
          console.log("默认请求", res)
          if (res.data.code == 200) {
            console.log("分页列表数据", res.data.data.detailsRecords)
            let list = that.data.list.concat(res.data.data.detailsRecords)
            that.setData({
              list: list,
              isend: true, // 一开始请求三天的数据 完事就为空 
              nola: true,
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.message + ":" + res.data.code,
              duration: 2000
            })
          }
        })
      }
    })
  },
  // 点击确定 || 取消
  tapDialogButton: function (e) {
    let date4 = new Date()
    let yearnow = date4.getFullYear(); //获取完整的年份(4位)
    let monthnow = date4.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    let daynow = date4.getDate() // (1-31)
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    if (daynow < 10) {
      daynow = '0' + daynow
    }
    // 获取今天
    let currentTime = yearnow + '-' + monthnow + '-' + daynow // 默认今天
    // 确定按钮
    if (e.detail.index == 1) {
      // 分页查询的时候 先隐藏掉暂无数据字样
      this.setData({
        isend: false
      })
      // 限制一 两个时间不能超过今天 开始时间不能超过结束时间
      let startTime2 = this.data.startTime2
      let endTime2 = this.data.endTime2
      let isover = this.judgetime(startTime2, currentTime)
      let isover2 = this.judgetime(endTime2, currentTime)
      let stxiaoyuet = this.judgetimeRange(startTime2, endTime2)
      // 限制二 开始时间小于结束时间
      if (stxiaoyuet) {
        wx.showToast({
          icon: 'none',
          title: '开始时间要小于结束时间'
        })
        return
      }
      // 如果有一个为true
      if (isover || isover2) {
        wx.showToast({
          icon: 'none',
          title: '选择时间不能超过今天',
          duration: 2000
        })
        return
      }
      // 都通过了 保存时间参数
      this.setData({
        startTime: startTime2,
        endTime: endTime2,
        startTimeshow: startTime2,
        endTimeshow: endTime2,
        list: [],
        isend: false,
        index: 0,
        nola: false
      })
      // 请求后台
      this.readyandgetlist()
    }
    // 关闭弹窗
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  // 确定按钮 loadmore的前一步 获取待处理数据
  readyandgetlist: function () {
    let that = this
    // 先调用待完成接口
    selfUnSuccessAccountDetails().then(res => {
      if (res.data.code == 200) {
        console.log('待完成全部数据', res.data.data.detailsRecords)
        // 先把待完成的放到数组里面
        that.setData({
          list: res.data.data.detailsRecords
        })
      }
      // 然后正常调用自定义接口 
      that.loadMore()
    })
  },
  // 上拉加载
  loadMore() {
    let nola = this.data.nola
    if (nola) {
      // 这里其实没必要 限制
      return
    }
    console.log('上拉')
    let that = this
    let startTime = this.data.startTime // 开始时间(每次)
    let endTime = this.data.endTime // 结束时间(每次)
    let endtimeevery = this.plusDays(startTime, 10) // 每次按照10天请求
    let isend = this.data.isend // 
    let index = this.data.index // 是否最后一次
    let isoneheight = this.data.isoneheight // 是否满足scroll高度
    let isloading = this.data.isloading // 是否加loading
    // 如果需要loading
    if (isoneheight && isloading) {
      wx.showLoading({
        title: '加载中...',
      })
    }
    console.log("开始日期分段", startTime, '结束日期分段', endtimeevery, '真正的最后一天', endTime)
    let params = {
      startTime: startTime,
      endTime: endtimeevery
    }
    // 每次的结束大于真正的结束时间 请求最后一次 
    let isover = this.judgetime2(endtimeevery, this.data.endTime)
    console.log('isover', isover)
    // 最后一次也没了 啥也不干 隐藏loading
    if (isend && index == 1) {
      wx.hideLoading()
      return
    }
    // 不是最后一次
    if (!isover) {
      console.log("不是最后一次")
      selfStaffAccountDetails(params).then(res => {
        console.log("默认请求", res)
        if (res.data.code == 200) {
          console.log("分页列表数据", res.data.data.detailsRecords)
          wx.hideLoading()
          // 修改一次分段开始请求时间 根据每次结束时间+1
          let starNexttTime = this.plusDays(endtimeevery, 1)
          let list = that.data.list.concat(res.data.data.detailsRecords)
          that.setData({
            list: list,
            startTime: starNexttTime,
            isend: false
          })
          wx.hideLoading()
          // 如果返回空数组 直接继续请求
          if (res.data.data.detailsRecords.length == 0) {
            console.log('立刻请求')
            // 手动发现数据为空 调用程序的loadMore
            that.loadMore()
          }
          // 如果不是空数组 高度也满足
          if (res.data.data.detailsRecords.length > 0) {
            that.setData({
              isloading: true
            })
          }
          that.gethigh()
        } else {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    }
    // 最后一次 请求完事
    else if (isover && index != 1) {
      console.log('最后一次')
      console.log("开始日期分段", startTime, '结束日期分段', this.data.endTimeshow)
      let params = {
        startTime: startTime,
        endTime: this.data.endTimeshow
      }
      // 最后一次请求
      selfStaffAccountDetails(params).then(res => {
        console.log("默认请求", res)
        if (res.data.code == 200) {
          console.log("分页列表数据", res.data.data.detailsRecords)
          let list = that.data.list.concat(res.data.data.detailsRecords)
          that.setData({
            list: list,
            isend: true,
            index: 1
          })
          wx.hideLoading()
        } else {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    }
  },
  // 获取高度
  gethigh: function () {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('.li2').boundingClientRect()
    query.exec(function (res) {
      console.log('scroll的res', res)
      console.log('高度', res[0].height)
      // 不满足 调用 this.loadMore
      if (res[0].height > 730) {
        that.setData({
          isoneheight: true
        })
        return
      } else {
        // that.loadMore()
      }
    })
  },
  judgetime2: function (start, end) {
    console.log('start', 'end', start, end)
    // 选择日期的时间戳
    let arr = start.split('-')
    let startTime = new Date(arr[0], arr[1] - 1, arr[2]).getTime()
    // 今天的时间戳
    let arr2 = end.split('-')
    let endTime = new Date(arr2[0], arr2[1] - 1, arr2[2]).getTime()
    // 如果超过今天
    if (endTime - startTime <= 0) {
      return true
    } else {
      return false
    }
  },
  // 限制一 两个时间不能超过今天
  judgetime: function (start, end) {
    console.log('start', 'end', start, end)
    // 选择日期的时间戳
    let arr = start.split('-')
    let startTime = new Date(arr[0], arr[1] - 1, arr[2]).getTime()
    // 今天的时间戳
    let arr2 = end.split('-')
    let endTime = new Date(arr2[0], arr2[1] - 1, arr2[2]).getTime()
    // 如果超过今天
    if (endTime - startTime < 0) {
      return true
    } else {
      return false
    }
  },
  // 根据单位时间后的获取结束日期
  plusDays(time, days) {
    let date = new Date(time);
    let datetime = date.getTime() + (1000 * 60 * 60 * 24 * days)
    // console.log('每次结束日期的时间戳', datetime)
    let endtimeevery = new Date(datetime)
    let year = endtimeevery.getFullYear()
    let month = endtimeevery.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = endtimeevery.getDate()
    day = day < 10 ? '0' + day : day
    let endtimeevery2 = year + '-' + month + '-' + day
    return endtimeevery2
  },
  // 打开弹窗
  open: function () {
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
      // isDaytime: !val[3]
    })
    let year = this.data.year.toString()
    let month = this.data.month.toString()
    let day = this.data.day.toString()
    let startTime = year + '-' + month + '-' + day
    console.log(startTime)
    this.setData({
      startTime2: startTime
    })

  },
  // 获取结束时间
  bindChange2(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      // isDaytime: !val[3]
    })
    let year = this.data.year.toString()
    let month = this.data.month.toString()
    let day = this.data.day.toString()
    let endTime = year + '-' + month + '-' + day
    console.log(endTime)
    this.setData({
      endTime2: endTime
    })
  },
  // 限制二 结束时间不能小于开始时间 选择时间不能超过间隔范围
  judgetimeRange: function (start, end) {
    // 选择日期的时间戳
    let arr = start.split('-')
    let startTime = new Date(arr[0], arr[1] - 1, arr[2]).getTime()
    // 今天的时间戳
    let arr2 = end.split('-')
    let endTime = new Date(arr2[0], arr2[1] - 1, arr2[2]).getTime()
    // 超出间隔范围
    if (startTime > endTime) {
      return true
    } else {
      return false
    }
  }
})
// let date = new Date()
// const years = []
// for (let i = 2010; i <= date.getFullYear(); i++) {
//   years.push(i)
// }
// let yearnow = date.getFullYear(); //获取完整的年份(4位)
// let monthnow = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
// let daynow = date.getDate() // (1-31)
// let valuecurrent2 = [999, monthnow - 1, daynow - 3]
// let valuecurrent = [999, monthnow - 1, daynow - 1]
// if (monthnow < 10) {
//   monthnow = '0' + monthnow
// }
// if (daynow < 10) {
//   daynow = '0' + daynow
// }
// 获取今天
// let currentTime = yearnow + '-' + monthnow + '-' + daynow // 默认今天
// 获取前三天的
// function fmtDate(obj) {
//   var date = new Date(obj);
//   var y = 1900 + date.getYear();
//   var m = "0" + (date.getMonth() + 1);
//   var d = "0" + date.getDate();
//   return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
// }