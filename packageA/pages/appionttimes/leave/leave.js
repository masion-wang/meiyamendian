import {
  getSelfFirmLeaveSet, // 获取人信息
  getRsvTmp, // 获取时间模板(1-7) 8自己写
  getRsvTmpByMonth, // 获取三个月模板
  addStaffLeaveData // 提交请假记录
} from '../../../../route/index/leave/leave'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    iscover: false,
    dialogShow3: false, // 日历
    showOneButtonDialog3: false,
    index: 0,
    rsvTmps: [], // 往后7天+8
    roomStaffSignRcdDtos: [], // 三个月的时间记录情况
    // 时间段
    selectTime: [{
      name: "半天 16:00 之前",
      type: 1,
      selected: false,
      open: true
    }, {
      name: "半天 16:00 之后",
      type: 2,
      selected: false,
      open: true
    }, {
      name: "全天",
      type: 0,
      selected: false,
      open: true
    }],
    activeIndex1: -1, // 日期index
    activeIndex2: -1, // 时间段index
    istext: true, // 文本输入框是否显示
    type: -1, // type值
    final: 0,
    dateList: [], // 选择的日期的列表 1-7
    dateList2: [], // 选择多选的日期
    leaveExplain: '', // 解释理由
    sum: 0, // 半天还是一天
    daysum: 0, // 天数
    punish: {}, // 惩罚信息
    yearnow: '',
    monthnow: '',
    daynow: '',
    currentTime: ''
  },
  onLoad: function (options) {},
  onShow: function () {
    this.setData({
      leaveExplain: '',
      activeIndex1: -1,
      activeIndex2: -1,
      dateList: [],
      dateList2: []
    })
    this.fresh()
    // this.getRsvTmp() // 获取时间模板
    this.getSelfFirmLeaveSet() // 获取惩罚规则
  },
  fresh: function () {
    let date2 = new Date()
    let yearnow = date2.getFullYear(); //获取完整的年份(4位)
    let monthnow = date2.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    let daynow = date2.getDate() // (1-31)
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    if (daynow < 10) {
      daynow = '0' + daynow
    }
    let currentTime = yearnow + '-' + monthnow + '-' + daynow
    console.log('今日日期', currentTime)
    this.setData({
      yearnow: yearnow,
      monthnow: monthnow,
      daynow: daynow,
      currentTime: currentTime
    })
    this.getRsvTmp() // 获取时间模板
  },
  onUnload: function () {
    var pages = getCurrentPages(); // 当前页面
    console.log('当前页面', pages)
    var beforePage = pages[pages.length - 2];
    beforePage.clearIndex(); // 执行前一个页面的onLoad方法
  },
  // 0.获取惩罚规则信息
  getSelfFirmLeaveSet: function () {
    let that = this
    getSelfFirmLeaveSet().then(res => {
      console.log('扣分信息', res)
      if (res.data.code == 200) {
        that.setData({
          punish: res.data.data.firmLeaveSetDto
        })
      }
      if (res.data.code == 10021) {
        wx.showToast({
          icon: 'none',
          title: '请设置奖惩规则',
          duration: 2500
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
  // 1.获取时间模板(1-7) || 8 
  getRsvTmp: function () {
    let yearnow = this.data.yearnow
    let monthnow = this.data.monthnow
    let currentTime = this.data.currentTime
    let that = this
    // 获取今天往后7天
    let params = {
      start: currentTime,
      days: 8
    }
    // 获取三个月时间
    let params2 = {
      start: yearnow + '-' + monthnow,
      months: 4
    }
    // 时间模板
    getRsvTmp(params).then(res => {
      console.log('获取我的预约时间', res)
      if (res.data.code == 200) {
        that.setData({
          rsvTmps: res.data.data.rsvTmps
        })
        that.setData({
          iscover: false
        })

      } else {
        that.setData({
          iscover: false
        })
        wx.showToast({
          icon: 'none',
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
      }
    })
    // 获取三个月时间 
    getRsvTmpByMonth(params2).then(res => {
      console.log('获取三个月时间', res)
      if (res.data.code == 200) {
        console.log('1111', res.data.data.monthTmps[0])
        that.setData({
          iscover: false
        })
        // 三个数组 分成六分
        let arr1 = []
        let arr2 = []
        let arr3 = []
        let arr4 = []
        // 拆成六个数组  0 7  7 15
        for (let i = 0; i < 42; i = i + 7) {
          let week = res.data.data.monthTmps[0].rsvTmps.slice(i, i + 7)
          for (let item of week) {
            item.weekindex = (i / 7)
          }
          arr1.push(week)
        }
        for (let j = 0; j < 42; j = j + 7) {
          let week = res.data.data.monthTmps[1].rsvTmps.slice(j, j + 7)
          for (let item of week) {
            item.weekindex = (j / 7)
          }
          arr2.push(week)
        }
        for (let q = 0; q < 42; q = q + 7) {
          let week = res.data.data.monthTmps[2].rsvTmps.slice(q, q + 7)
          for (let item of week) {
            item.weekindex = (q / 7)
          }
          arr3.push(week)
        }
        for (let r = 0; r < 42; r = r + 7) {
          let week = res.data.data.monthTmps[3].rsvTmps.slice(r, r + 7)
          for (let item of week) {
            item.weekindex = (r / 7)
          }
          arr4.push(week)
        }


        console.log('arr1', arr1)
        console.log('arr2', arr2)
        console.log('arr3', arr3)
        console.log('arr4', arr4)
        // 处理一下是否超过90天
        let p1 = new Promise((resolve, reject) => {
          if (arr1 = that.isoverninety(arr1)) {
            let obj = {}
            obj.name = 'arr1'
            obj.arr = arr1
            resolve(obj)
          }
        });
        let p2 = new Promise((resolve, reject) => {
          if (arr2 = that.isoverninety(arr2)) {
            let obj = {}
            obj.name = 'arr2'
            obj.arr = arr2
            resolve(obj)
          }
        });
        let p3 = new Promise((resolve, reject) => {
          if (arr3 = that.isoverninety(arr3)) {
            let obj = {}
            obj.name = 'arr3'
            obj.arr = arr3
            resolve(obj)
          }
        });
        let p4 = new Promise((resolve, reject) => {
          if (arr4 = that.isoverninety(arr4)) {
            let obj = {}
            obj.name = 'arr4'
            obj.arr = arr4
            resolve(obj)
          }
        });
        Promise.all([p1, p2, p3, p4])
          .then(result => {
            console.log('result', result)
            for (let obj of result) {
              if (obj.name == 'arr1') {
                res.data.data.monthTmps[0].rsvTmps = obj.arr
              }
              if (obj.name == 'arr2') {
                res.data.data.monthTmps[1].rsvTmps = obj.arr
              }
              if (obj.name == 'arr3') {
                res.data.data.monthTmps[2].rsvTmps = obj.arr
              }
              if (obj.name == 'arr4') {
                res.data.data.monthTmps[3].rsvTmps = obj.arr
              }
            }

            console.log('处理后的数组', res.data.data.monthTmps)
            that.setData({
              roomStaffSignRcdDtos: res.data.data.monthTmps
            })

          })
          .catch(e => console.log(e));

        // res.data.data.monthTmps[0].rsvTmps = arr1
        // res.data.data.monthTmps[1].rsvTmps = arr2
        // res.data.data.monthTmps[2].rsvTmps = arr3
        // res.data.data.monthTmps[3].rsvTmps = arr4
        // console.log('处理后的数组', res.data.data.monthTmps)
        // that.setData({
        //   roomStaffSignRcdDtos: res.data.data.monthTmps
        // })

      } else {
        that.setData({
          iscover: false
        })
        wx.showToast({
          icon: 'none',
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
      }
    })
  },
  // 增加一个属性是否超过90天
  isoverninety: function (arr) {
    let yearnow = this.data.yearnow
    let monthnow = this.data.monthnow
    let currentTime = this.data.currentTime
    console.log('arr判断是否超过90天 isoverninety', arr)
    for (let item of arr) {
      for (let itemson of item) {
        console.log('每天', itemson)
        let date = new Date()
        // 获取今天时间戳
        let todaycur = date.getTime(currentTime)
        let dateperday = 24 * 60 * 60 * 1000
        // 获取第90天的时间戳
        let dateninety = todaycur + dateperday * 89
        // 获取每天的时间戳
        let chooseday = itemson.year + '-' + itemson.month + '-' + itemson.day
        let choosedaycur = new Date(chooseday).getTime()
        console.log('每天的时间', '每天的时间戳', chooseday, choosedaycur)
        // 如果用户选择的天数 小于等于 90限制
        if (choosedaycur <= dateninety) {
          console.log('小于90')
          itemson.isoverninety = false
        }
        if (choosedaycur > dateninety) {
          console.log('大于90')
          itemson.isoverninety = true
        }

      }
    }
    return arr

  },
  // 2.根据1-7 8 获取日期参数 以及单选||多选
  tapdate: function (e) {
    let yearnow = this.data.yearnow
    let monthnow = this.data.monthnow
    let currentTime = this.data.currentTime
    console.log('index', e)
    let that = this
    let year = e.currentTarget.dataset.year
    let month = e.currentTarget.dataset.month
    let day = e.currentTarget.dataset.day
    let index = e.currentTarget.dataset.index
    let dateList = this.data.dateList
    // 如果选择单选 那就清空数组
    this.setData({
      dateList: [],
      sum: 0
    })
    console.log('先清空数组', this.data.dateList)
    // 1-7 仅仅是选中
    if (index < 7) {
      this.setData({
        final: 7,
        daysum: 0
      })
      console.log('final为7 以为单选dateList为准', this.data.final)
      let time = year + '-' + month + '-' + day
      let dateList = this.data.dateList
      dateList.push(time)
      this.setData({
        dateList: dateList
      })
      // 重新渲染 清空数组
      this.getRsvTmp()
      this.setData({
        dateList2: []
      })
      console.log('选择单选日期的参数', this.data.dateList)
    }
    // 8 打开弹窗
    if (index == 7) {
      // 如果选择多选 那就清空数组
      this.setData({
        dateList: []
      })
      this.setData({
        final: 8
      })
      console.log('清空单选的数组', this.data.dateList)
      console.log('final为8 以为多选dateList2为准', this.data.final)
      this.openConfirm3() // 打开弹窗
    }
    // 1.满足交互效果
    this.setData({
      activeIndex1: index,
      activeIndex2: -1,
      type: -1
    })
  },
  // 打开日历弹窗
  openConfirm3: function () {
    // 如果没选择时间段 不能触发
    this.setData({
      dialogShow3: true,
      istext: false
    })
  },
  // 2.把日历多选日期添加进数组
  onSelectDay(e) {
    console.log('eeee', e)
    // 获取参数数组
    let dateList2 = this.data.dateList2
    // 选中 添加
    if (e.detail.selected) {
      dateList2.push(e.detail)
    }
    // 取消 删除
    if (!e.detail.selected) {
      dateList2 = dateList2.filter((item) => {
        console.log('对比', item, e.detail)
        if (item.year == e.detail.year && item.month == e.detail.month && item.day == e.detail.day) {
          return false
        } else {
          return true
        }
      })
    }
    // 保存几天
    this.setData({
      dateList2: dateList2,
      daysum: dateList2.length
    })
    console.log('多选的日期', this.data.dateList2, this.data.daysum)
  },
  // 日历确定||取消
  tapDialogButton3: function (e) {
    this.setData({
      dialogShow3: false,
      showOneButtonDialog3: false,
      istext: true
    })
    // 如果按钮为取消  重新渲染 并且清空数组
    if (e.detail.index == 0) {
      this.getRsvTmp()
      this.setData({
        dateList2: [],
        daysum: 0
      })
    }

  },
  // 选择时间段 上午 下午 全天
  taptime: function (e) {
    let final = this.data.final
    // 请选择日期
    if (final == 0) {
      wx.showToast({
        icon: 'none',
        title: '请先选择日期',
      })
      return
    }
    let index = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    // 单选交互
    this.setData({
      activeIndex2: index
    })
    // 保存type参数
    this.setData({
      type: type
    })
    console.log('获取type参数', this.data.type)
    // 如果type 为 1 2  为半天0.5  type为 0 时间为1
    if (type == 1 || type == 2) {
      this.setData({
        sum: 0.5
      })
    } else if (type == 0) {
      this.setData({
        sum: 1
      })
    }
  },
  // 请假理由
  bindInput: function (e) {
    console.log('输入请假理由', e.detail.value)
    this.setData({
      leaveExplain: e.detail.value
    })
  },
  // 上传请假记录
  sureup: function () {
    // 获取日期参数 时间参数type 理由
    let final = this.data.final
    let type = this.data.type
    let dateList = this.data.dateList
    let dateList2 = this.data.dateList2
    let leaveExplain = this.data.leaveExplain
    if (leaveExplain.length < 50) {
      wx.showToast({
        icon: 'none',
        title: '输入文字不少于50字'
      })
      return
    }

    console.log('final 0 请选择日期 7 单选 8 多选==>', final)
    // 请选择日期
    if (final == 0) {
      wx.showToast({
        icon: 'none',
        title: '请先选择日期',
      })
      return
    }
    // 请选择时间
    if (type == -1) {
      wx.showToast({
        icon: 'none',
        title: '请选择时间',
      })
      return
    }
    if (final == 7) {
      console.log('单选')
      let params = {
        type: type,
        leaveTimes: dateList,
        leaveExplain: leaveExplain
      }
      console.log('单选参数', params)
      addStaffLeaveData(params).then(res => {
        console.log('请假成功单选', res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '请假提交成功',
          })
          wx.navigateTo({
            url: '/packageA/pages/appionttimes/leaverecord/leaverecord',
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
    if (final == 8) {
      console.log('多选')
      let arr = []
      for (let item of dateList2) {
        let time = item.year + '-' + item.month + '-' + item.day
        arr.push(time)
      }
      let params = {
        type: type,
        leaveTimes: arr,
        leaveExplain: leaveExplain
      }
      console.log('多选参数', params)
      addStaffLeaveData(params).then(res => {
        console.log('请假成功多选', res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '请假提交成功',
          })
          wx.navigateTo({
            url: '/packageA/pages/appionttimes/leaverecord/leaverecord',
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
  },




  // 去请假记录
  toleaverecord: function () {
    wx.navigateTo({
      url: '/packageA/pages/appionttimes/leaverecord/leaverecord',
    })
  }
})