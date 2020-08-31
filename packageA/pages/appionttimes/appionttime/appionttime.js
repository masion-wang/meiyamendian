import {
  getSelfRoomStaffBaseInfo, // 获取人信息
  getRsvTmp, // 获取时间模板(1-7) 8自己写
  getRsvTmpByMonth, // 获取时间模板(三个月) by 8
  getMyReserveTemplate, // 获取营业时间段 by(1-7)
  getMyFirmReserveTemplate, // 获取营业时间段 by(8) 新增接口
  staffCloseReserveTime, // 关闭预约时间(1-7)
  staffMonthCloseReserveTime, // 关闭月预约时间 三个月的关闭接口  新增接口
  getMyRsvTimeCloseRcd, // 获取关闭记录
  openRsvTimeRcd, // 打开关闭预约时间
} from '../../../../route/index/appionttimes/appionttimes'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    iscover: true, // 是否遮罩
    dialogShow1: false, // 关闭预约时间
    showOneButtonDialog1: false,
    dialogShow2: false, // 打卡预约时间
    showOneButtonDialog2: false,
    dialogShow3: false, // 日历弹窗
    showOneButtonDialog3: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    roomStaffBaseDto: {}, // 员工信息
    indicatorDots: true, // 轮播图
    rsvTmps: [], // 往后7天+8
    reserveTelateDtos: [], // 当天的时间段
    activeIndex: 0,
    allClose: true, // 判断全天样式
    type: 0, // 代表关闭时间是否全天 0 否 1 是
    closeInfos: [], // 时间数组
    // 关闭记录的分页
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    list: [], //列表数据
    isend: false, // 是否最后一页
    closeRcdId: '', // 打开预约接口的id
    roomStaffSignRcdDtos: [], // 三个月的时间记录情况
    dateList: [], // 三个月多选的数组
    index: 0, // 下标
    yearnow: '',
    monthnow: '',
    daynow: '',
    currentTime: ''

  },
  onLoad: function (options) {
    // this.getSelfRoomStaffBaseInfo() // 我的信息
    // this.getRsvTmp() // 获取时间模板
    // this.getlist() // 获取关闭记录
  },
  onShow: function () {
    this.setData({
      dateList: [],
      // activeIndex: 0,
      closeInfos: []
    })
    this.fresh()
    this.getSelfRoomStaffBaseInfo() // 我的信息
    // this.getRsvTmp() // 获取时间模板
    this.getlist() // 获取关闭记录

  },
  fresh: function () {
    const date2 = new Date()
    let yearnow = date2.getFullYear(); //获取完整的年份(4位)
    let monthnow = date2.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    let daynow = date2.getDate() // (1-31)
    // let valuecurrent = [999, monthnow - 1, daynow - 1]
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
  clearIndex: function () {
    console.log('我是上一个页面带来方法')
    this.setData({
      activeIndex: -1
    })
  },
  // 0.获取我的信息
  getSelfRoomStaffBaseInfo: function () {
    let that = this
    getSelfRoomStaffBaseInfo().then(res => {
      console.log('我的信息', res)
      if (res.data.code == 200) {
        that.setData({
          roomStaffBaseDto: res.data.data.roomStaffBaseDto
        })
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
    let daynow = this.data.daynow
    let currentTime = this.data.currentTime
    let that = this
    let params = {
      start: currentTime,
      days: 8
    }
    that.setData({
      iscover: true
    })
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
        // 当天时段的初始值
        that.tapdatestart()
      } else if (res.data.code == 10004) {

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
    let params2 = {
      start: yearnow + '-' + monthnow,
      months: 4
    }
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




      } else if (res.data.code == 10004) {
        that.setData({
          iscover: true
        })
        wx.showToast({
          icon: 'none',
          title: '没有此权限',
          duration: 2500,
          success: function () {
            let timer = setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
              clearTimeout(timer)
            }, 2000)
          }
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
  },
  // 增加一个属性是否超过90天
  isoverninety: function (arr) {
    let yearnow = this.data.yearnow
    let monthnow = this.data.monthnow
    let daynow = this.data.daynow
    let currentTime = this.data.currentTime
    console.log('arr判断是否超过90天 isoverninety', arr)
    for (let item of arr) {
      for (let itemson of item) {
        // console.log('每天', itemson)
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
  // 2.获取默认当天的时间段(1-7)
  tapdatestart: function () {
    let yearnow = this.data.yearnow
    let monthnow = this.data.monthnow
    let daynow = this.data.daynow
    let currentTime = this.data.currentTime
    let that = this
    let params = {
      time: currentTime
    }
    that.setData({
      iscover: true
    })
    // 2.请求对应的当天时间段
    getMyReserveTemplate(params).then(res => {
      // 请求成功后 
      if (res.data.code == 200) {
        console.log('当天时间段', res)
        that.setData({
          iscover: false
        })
        // 加个全天
        let obj = {
          timeFrame: '全天',
          year: yearnow,
          month: monthnow,
          day: daynow,
          type: 1,
          select: false
        }
        res.data.data.reserveTelateDtos.push(obj)
        that.setData({
          reserveTelateDtos: res.data.data.reserveTelateDtos, // 7天时间段
          allClose: res.data.data.allClose,
          closeInfos: [], // 清空参数
          type: 0
        })
        console.log('当天的时间段数据初始值', that.data.reserveTelateDtos)
      } else if (res.data.code == 10004) {

      } else {
        that.setData({
          iscover: false
        })
        wx.showToast({
          icon: 'none',
          title: res.data.message,
        })
      }
    })
  },

  // 3.根据预约时间 获取当天的营业时间 ( 1-7 || 8 )
  tapdate: function (e) {

    console.log('index', e)
    let that = this
    let year = e.currentTarget.dataset.year
    let month = e.currentTarget.dataset.month
    let day = e.currentTarget.dataset.day
    let index = e.currentTarget.dataset.index
    that.setData({
      index: index
    })
    that.setData({
      iscover: true
    })
    // 1.满足交互效果
    this.setData({
      activeIndex: index
    })
    // 1-7 获取营业时间
    if (index < 7) {
      let time = year + '-' + month + '-' + day
      let params = {
        time: time
      }
      // 清除参数
      this.setData({
        dateList: []
      })
      // 清空日期组件的样式
      let myComponent = this.selectComponent('#myComponent'); // 页面获取自定义组件实例
      myComponent.componentInnerFunction(); // 通过实例调用组件事件
      console.log('取消后三个月多选参数 和 三月数据', this.data.dateList)
      // 2.请求对应的当天时间段
      getMyReserveTemplate(params).then(res => {
        // 请求成功后 
        if (res.data.code == 200) {

          console.log('当天时间段', res)
          // 加个全天
          let obj = {
            timeFrame: '全天',
            type: 1,
            select: false,
            year: res.data.data.reserveTelateDtos[0].year,
            month: res.data.data.reserveTelateDtos[0].month,
            day: res.data.data.reserveTelateDtos[0].day
          }
          res.data.data.reserveTelateDtos.push(obj)
          that.setData({
            reserveTelateDtos: res.data.data.reserveTelateDtos,
            allClose: res.data.data.allClose,
            closeInfos: [], // 清空参数
            type: 0
          })
          that.setData({
            iscover: false
          })
          console.log('当天的时间段数据', that.data.reserveTelateDtos)
        } else if (res.data.code == 10004) {} else {
          that.setData({
            iscover: false
          })
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })

        }
      })
    }
    // 8 获取近三个月时间+营业时间 并且清空数组
    if (index == 7) {
      this.openConfirm3() // 打开弹窗
      this.setData({ // 清空营业时间1-7
        reserveTelateDtos: []
      })
      // + 8的营业时间
      getMyFirmReserveTemplate().then(res => {
        console.log('获取营业时间by8', res)
        // 请求成功后 
        if (res.data.code == 200) {
          that.setData({
            iscover: false
          })
          console.log('当天时间段', res)
          // 加个全天
          let obj = {
            timeFrame: '全天',
            type: 1,
            select: false,
            year: res.data.data.reserveTemplates[0].year,
            month: res.data.data.reserveTemplates[0].month,
            day: res.data.data.reserveTemplates[0].day
          }
          res.data.data.reserveTemplates.push(obj)
          that.setData({
            reserveTelateDtos: res.data.data.reserveTemplates,
            // allClose: res.data.data.allClose,
            allClose: false, // 8的营业时间不受到allClose的影响
            closeInfos: [], // 清空参数
            type: 0
          })
          console.log('当天的时间段数据', that.data.reserveTelateDtos)
        } else {
          that.setData({
            iscover: false
          })
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
      })
    }
  },

  // 4.选择当天的营业时间(多选)
  taptime: function (e) {
    console.log('e', e)
    let isclose = e.currentTarget.dataset.isclose
    let allclose = e.currentTarget.dataset.allclose
    console.log('isclose', isclose, 'allclose', allclose)
    if (isclose && allclose == undefined) {
      console.log('不可操作')
      return
    } else if (isclose == undefined && allclose) {
      console.log('不可操作')
      return
    }
    // 如果已经关闭 无需执行下面语句
    console.log('可以触发多选事件')
    let index = e.currentTarget.dataset.index
    console.log('index', index)
    // 获取参数数组 + 目前数组
    let closeInfos = this.data.closeInfos
    let reserveTelateDtos = this.data.reserveTelateDtos
    // 1.保存相关数据
    // 如果目前数组为false
    if (!reserveTelateDtos[index].select) {
      // 获取年月日时间 index
      let obj = {
        year: e.currentTarget.dataset.year,
        month: e.currentTarget.dataset.month,
        day: e.currentTarget.dataset.day,
        hour: e.currentTarget.dataset.hour,
        index: index
      }
      // 保存进去
      closeInfos.push(obj)
      console.log('增加后', closeInfos)
      this.setData({
        closeInfos: closeInfos
      })
    }
    // 如果目前数组为true
    if (reserveTelateDtos[index].select) {
      // 根据下标删除对应的对象
      closeInfos = closeInfos.filter((item) => {
        if (item.index != index) {
          return true
        }
      });
      console.log('删除后', closeInfos)
      // 保存进去
      this.setData({
        closeInfos: closeInfos
      })
    }
    this.setData({
      type: 0
    })
    let closeInfos2 = this.data.closeInfos
    // 如果相关数据 item.hour=='全天'  type = 1  否则 还是 0
    for (let item of closeInfos2) {
      if (item.hour == '全天') {
        this.setData({
          type: 1
        })
        break
      } else {
        this.setData({
          type: 0
        })
      }
    }
    // 看看参数情况如何
    console.log('closeInfos type', closeInfos2, this.data.type)
    // 2.改变select true false 修改多选交互样式
    reserveTelateDtos[index].select = !reserveTelateDtos[index].select
    this.setData({
      reserveTelateDtos: reserveTelateDtos
    })
  },



  // 1-7 || 8 关闭预约时间方法
  // 1.打开关闭弹窗 (1-7) || 8
  openConfirm1: function () {
    // 获取参数判断一下
    let closeInfos = this.data.closeInfos
    if (closeInfos.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择时间'
      })
      return
    }
    this.setData({
      dialogShow1: true
    })
  },

  // 2.确定 取消 (1-7) || 8
  tapDialogButton1: function (e) {
    let index = this.data.index
    // 取消
    if (e.detail.index == 0) {

    }
    // 确定
    if (e.detail.index == 1) {
      console.log('确定')
      // 判断一下三个月多选 多时间  || 还是 单天 多个时间段
      if (index < 7) {
        console.log('关闭单天预约')
        this.staffCloseReserveTime()
      } else if (index == 7) {
        console.log('关闭三个月多天预约')
        this.staffMonthCloseReserveTime()
      }
    }
    // 关闭弹窗
    this.setData({
      dialogShow1: false,
      showOneButtonDialog1: false
    })
  },

  // 三个月选择关闭时间(8)
  // 1.打开日历弹窗
  openConfirm3: function () {
    // 如果没选择时间段 不能触发
    this.setData({
      dialogShow3: true
    })
  },

  // 2.把日历多选日期添加进数组
  onSelectDay(e) {
    console.log('eeee', e)
    // 获取参数数组
    let dateList = this.data.dateList
    // 选中 添加
    if (e.detail.selected) {
      dateList.push(e.detail)
    }
    // 取消 删除
    if (!e.detail.selected) {
      dateList = dateList.filter((item) => {
        console.log('对比', item, e.detail)
        if (item.year == e.detail.year && item.month == e.detail.month && item.day == e.detail.day) {
          return false
        } else {
          return true
        }
      })
    }
    console.log('参数情况', dateList)
    this.setData({
      dateList,
    })
  },

  // 3.确定 取消 获取三月多天
  tapDialogButton3: function (e) {
    let that = this
    console.log(e)
    // 参数一
    let dateList = this.data.dateList
    let type = 1
    let params = {
      closeInfos: dateList,
      type: type
    }
    //为1是点击的确定，0点击的取消
    var index = e.detail.index
    // 取消
    if (index == 0) {
      // 清除参数
      this.setData({
        dateList: []
      })
      // 清空日期组件的样式
      let myComponent = this.selectComponent('#myComponent'); // 页面获取自定义组件实例
      myComponent.componentInnerFunction(); // 通过实例调用组件事件
      console.log('取消后三个月多选参数 和 三月数据', this.data.dateList)
    }
    // 确定 关闭
    if (index == 1) {
      console.log('params', params)
      // 限制一下
      if (params.closeInfos.length == 0) {
        wx.showToast({
          icon: 'none',
          title: '请选择日期',
        })
        return
      }
    }
    this.setData({
      dialogShow3: false,
      showOneButtonDialog3: false
    })
  },

  // 关闭预约时间
  // 3.关闭时间 (1-7)
  staffCloseReserveTime() {
    // 获取参数 closeInfos + type
    let that = this
    let closeInfos = this.data.closeInfos
    let type = this.data.type
    let params = {
      closeInfos: closeInfos,
      type: type
    }
    staffCloseReserveTime(params).then(res => {
      console.log('关闭成功', res)
      if (res.data.code == 200) {
        // 清空数据
        that.setData({
          rsvTmps: [],
          reserveTelateDtos: [],
          activeIndex: 0
        })
        // 重新渲染
        that.getRsvTmp()
        that.getlist()
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
      }
    })
  },
  // 4.关闭时间 (8) 时间段
  staffMonthCloseReserveTime() {
    let that = this
    // 多天 多时间段   [singleCloseInfo:{closeInfos:[{year,month,day}...],hours:['09:00','10:00']},type:1]
    let closeInfos = this.data.closeInfos
    let type = this.data.type
    let dateList = this.data.dateList
    let hours = []
    // 如果日期没有选择 限制
    if (dateList.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择日期',
      })
      return
    }
    console.log(type)
    // return
    // 多天时间段
    if (type == 0) {
      console.log('hour', hours, 'dateList', dateList)
      // 把closeInfos里面的hour提取出来
      for (let item of closeInfos) {
        hours.push(item.hour)
      }
      console.log('hour', hours)
      let params = {
        singleCloseInfo: {
          closeInfos: dateList,
          hours: hours
        },
        type: type
      }
      console.log('三个月的params关闭预约参数', params)
      staffMonthCloseReserveTime(params).then(res => {
        console.log('关闭成功', res)
        if (res.data.code == 200) {
          // 清空数据
          that.setData({
            rsvTmps: [],
            reserveTelateDtos: [],
            activeIndex: 0,
            dateList: []
          })
          // 重新渲染
          that.getRsvTmp()
          that.getlist()
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    }
    // 多天全天
    if (type == 1) {
      let params = {
        closeInfos: dateList,
        type: type
      }
      staffMonthCloseReserveTime(params).then(res => {
        console.log('关闭成功', res)
        if (res.data.code == 200) {
          // 清空数据
          that.setData({
            rsvTmps: [],
            reserveTelateDtos: [],
            activeIndex: 0,
            dateList: []
          })
          // 重新渲染
          that.getRsvTmp()
          that.getlist()
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






  // 关闭预约记录相关接口
  // .重新加载关闭记录分页
  getlist: function () {
    console.log('下拉')
    this.setData({
      isend: false,
      currPage: 1,
      list: [],
    })
    this.loadMore()
  },
  // .持续获取关闭记录
  loadMore() {
    console.log('上拉')
    let that = this
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      currPage: currPage,
      pageSize: pageSize
    }
    if (!isend) {
      console.log("加载更多")
      getMyRsvTimeCloseRcd(params).then(res => {
        console.log("关闭预约记录", res)
        if (res.data.code == 200) {
          console.log("预约记录分页", res.data.data.contents)
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
  // 2.打开记录
  openConfirm2: function (e) {
    console.log('e', e)
    let closeRcdId = e.currentTarget.dataset.id
    this.setData({
      closeRcdId: e.currentTarget.dataset.id
    })
    // 如果没选择时间段 不能触发

    this.setData({
      dialogShow2: true
    })
  },
  // 2.确定 取消
  tapDialogButton2: function (e) {
    let that = this
    let index = e.detail.index
    let closeRcdId = this.data.closeRcdId
    console.log('index closeRcdId', index, closeRcdId)
    let params = {
      closeRcdId: closeRcdId
    }
    // 取消
    if (index == 0) {

    }
    // 确定
    if (index == 1) {
      openRsvTimeRcd(params).then(res => {
        console.log('打开预约成功', res)
        if (res.data.code == 200) {
          // 清空数据
          that.setData({
            rsvTmps: [],
            reserveTelateDtos: [],
            activeIndex: 0,
            dateList: []
          })
          // 初始化 重新请求
          that.getRsvTmp()
          that.getlist()

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
      })
    }
    this.setData({
      dialogShow2: false,
      showOneButtonDialog2: false
    })
  },














  // 事假申请
  gotoleave: function () {
    wx.navigateTo({
      url: '/packageA/pages/appionttimes/leave/leave',
    })
  }
})