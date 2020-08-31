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
  getCustomerVisitsNumsRank, // 客量排行
  getCustomerShareRank, // 列表引流
  getCustomerNumsRank // 资源价值
} from '../../../route/index/rank/rank'
import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    tab: [],
    iscover: false, // 是否遮罩
    activeIndex: 0, // 配合ui效果用的
    whichOne: 0, // 0 客量排行  1 列表引流 2 资源价值  那个接口
    dayRange: 0, // 0  一天  1 一周 2 一个月 
    timeWay: 0, // 0 用指定时间 1 用自定义时间
    orderWay: 0, // 0 1 2 3  从左到右 配合全部三个接口
    currPage: 1, // 请求页数
    pageSize: 6, // 请求数据量
    isend: false,
    list: [],
    // 客数排行
    guest: [{
      name: '接单客数'
    }, {
      name: '指定客数'
    }, {
      name: '指定率'
    }, {
      name: '收益'
    }],
    // 裂变引流
    spread: [{
      name: '分享人次'
    }, {
      name: '预约'
    }, {
      name: '到店'
    }, {
      name: '锁客'
    }],
    // 资源价值
    value: [{
      name: '资源价值'
    }, {
      name: '接待人数'
    }, {
      name: '指定率'
    }],
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
    days,
    year: '',
    month: 1,
    day: 1,
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    value1: [],
    isDaytime: true
  },
  onLoad: function (options) {
    let that = this
    // 获取tab数据
    const titles = [{
      title: '日排行',
      id: '0'
    }, {
      title: '周排行',
      id: '1'
    }, {
      title: '月排行',
      id: '2'
    }, {
      title: '选择日期',
      id: '3'
    }]
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs
    })
    this.loadMore1()
    this.fresh()
  },
  fresh: function () {
    let that = this
    const date2 = new Date()
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
    console.log('今日日期', currentTime)
    that.setData({
      year: date2.getFullYear(),
      value1: valuecurrent,
      startTime: currentTime, // 开始时间
      endTime: currentTime, // 结束时间
    })
  },
  // 点击确定 || 取消
  tapDialogButton: function (e) {
    console.log('e', e.detail.index)
    // 确定
    if (e.detail.index == 1) {
      let that = this
      let whichOne = this.data.whichOne
      console.log(this.data.startTime, this.data.endTime)
      if (this.data.startTime.length == 0 || this.data.endTime == 0) {
        wx.showToast({
          icon: 'none',
          title: '时间选择不能为空',
          duration: 2000
        })
        this.setData({
          dialogShow: false,
          showOneButtonDialog: false
        })
        return
      }
      // 初始化  告诉后台走自定义时间
      this.setData({
        timeWay: 1,
        currPage: 1,
        pageSize: 6,
        isend: false,
        list: []
      })
      // 判断接口后 开始请求
      if (whichOne == 0) {
        this.loadMore1()
      }
      if (whichOne == 1) {
        this.loadMore2()
      }
      if (whichOne == 2) {
        this.loadMore3()
      }
    }
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  // 1.点击tab栏目 影响分页重新来
  onTabCLick: function (e) {
    let that = this
    console.log('日期012', e.detail.index)
    let index = e.detail.index
    let whichOne = this.data.whichOne
    // 1.根据日期判断 dayRange 0 1 2 
    // 2.直接请求 并且 清空时间插件
    // 3.whichOne 0 1 2 容量 裂变 资源
    // 日
    if (index == 0) {
      // 修改日期
      this.setData({
        dayRange: 0,
        pageSize: 6,
        currPage: 1,
        timeWay: 0,
        isend: false,
        list: []
      })
      // 根据whichOne请求接口
      if (whichOne == 0) {
        this.loadMore1()
      }
      if (whichOne == 1) {
        this.loadMore2()
      }
      if (whichOne == 2) {
        this.loadMore3()
      }
    }
    // 周
    if (index == 1) {
      // 修改日期
      this.setData({
        dayRange: 1,
        timeWay: 0,
        pageSize: 6,
        currPage: 1,
        isend: false,
        list: []
      })
      // 根据whichOne请求接口
      if (whichOne == 0) {
        this.loadMore1()
      }
      if (whichOne == 1) {
        this.loadMore2()
      }
      if (whichOne == 2) {
        this.loadMore3()
      }
    }
    // 月
    if (index == 2) {
      // 修改日期
      this.setData({
        dayRange: 2,
        pageSize: 6,
        currPage: 1,
        timeWay: 0,
        isend: false,
        list: []
      })
      // 根据whichOne请求接口
      if (whichOne == 0) {
        this.loadMore1()
      }
      if (whichOne == 1) {
        this.loadMore2()
      }
      if (whichOne == 2) {
        this.loadMore3()
      }
    }
    // 2.选择日期 不直接请求 打开时间选择插件
    if (index == 3) {
      that.openConfirm()
    }
  },
  // 2.切换轮播图 影响单独分页
  changeswperitem: function (e) {
    let that = this
    let index = e.detail.current
    // 获取切换轮播的下标 判断请求那个接口
    console.log('切换分页', index)
    // 容量
    if (index == 0) {
      // 切换接口 请求
      this.setData({
        whichOne: index, // 根据下标 赋值给 whichOne 0 1 2 容量 分裂 资源
        pageSize: 6,
        currPage: 1,
        activeIndex: 0,
        orderWay: 0,
        isend: false,
        list: []
      })
      this.loadMore1()
    }
    // 分裂
    if (index == 1) {
      // 切换接口 请求
      this.setData({
        whichOne: index,
        pageSize: 6,
        currPage: 1,
        activeIndex: 0,
        orderWay: 0,
        isend: false,
        list: []
      })
      this.loadMore2()
    }
    // 资源
    if (index == 2) {
      // 切换接口 请求
      this.setData({
        whichOne: index,
        pageSize: 6,
        currPage: 1,
        activeIndex: 0,
        orderWay: 0,
        isend: false,
        list: []
      })
      this.loadMore3()
    }
  },
  // 客数排行 四个或者三个获取参数请求
  changeImg1: function (e) {
    console.log('客户排行四个', e.currentTarget.dataset.key)
    this.setData({
      activeIndex: e.currentTarget.dataset.key,
    });
    // 获取四个三个
    this.setData({
      orderWay: e.currentTarget.dataset.key
    })
    // 初始化 
    this.setData({
      pageSize: 6,
      currPage: 1,
      isend: false,
      list: []
    })
    // 请求客量
    this.loadMore1()
  },
  // 裂变引流 四个或者三个获取参数请求
  changeImg2: function (e) {
    console.log('列表引流4个', e.currentTarget.dataset.key)
    this.setData({
      activeIndex: e.currentTarget.dataset.key,
    });
    this.setData({
      orderWay: e.currentTarget.dataset.key
    })
    // 初始化 
    this.setData({
      pageSize: 6,
      currPage: 1,
      isend: false,
      list: []
    })
    // 请求裂变引流
    this.loadMore2()
  },
  // 资源价值 四个或者三个获取参数请求
  changeImg3: function (e) {
    console.log('资源价值3个', e.currentTarget.dataset.key)
    this.setData({
      activeIndex: e.currentTarget.dataset.key,
    });
    this.setData({
      orderWay: e.currentTarget.dataset.key
    })
    // 初始化 
    this.setData({
      pageSize: 6,
      currPage: 1,
      isend: false,
      list: []
    })
    // 请求资源价值
    this.loadMore3()
  },
  // 客量排行
  loadMore1: function (e) {
    console.log('上拉')
    let that = this
    // 搞遮罩
    that.setData({
      iscover: true
    })
    // 1.获取那个分页四个(三个)小选择
    let orderWay = this.data.orderWay
    // 2.获取指定时间
    let dayRange = this.data.dayRange
    // 3.获取自定义时间
    let startTime = this.data.startTime
    let endTime = this.data.endTime
    // 4.获取用哪种时间方式
    let timeWay = this.data.timeWay // 0 指定 1自定义
    // 5. currPage页数 pageSize数据量
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    let isend = this.data.isend
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      orderWay: orderWay,
      dayRange: dayRange,
      startTime: startTime,
      endTime: endTime,
      timeWay: timeWay,
      currPage: currPage,
      pageSize: pageSize
    }
    console.log('params参数', params)
    if (!isend) {
      console.log("加载更多")
      getCustomerVisitsNumsRank(params).then(res => {
        that.setData({
          iscover: false
        })
        console.log("客量排行", res)
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
      that.setData({
        iscover: false
      })
      return
    }
  },
  // 裂变引流
  loadMore2: function (e) {
    console.log('上拉')
    let that = this
    that.setData({
      iscover: true
    })
    // 1.获取那个分页四个(三个)小选择
    let orderWay = this.data.orderWay
    // 2.获取指定时间
    let dayRange = this.data.dayRange
    // 3.获取自定义时间
    let startTime = this.data.startTime
    let endTime = this.data.endTime
    // 4.获取用哪种时间方式
    let timeWay = this.data.timeWay // 0 指定 1自定义
    // 5. currPage页数 pageSize数据量
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    let isend = this.data.isend
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      orderWay: orderWay,
      dayRange: dayRange,
      startTime: startTime,
      endTime: endTime,
      timeWay: timeWay,
      currPage: currPage,
      pageSize: pageSize
    }
    console.log('params参数', params)
    if (!isend) {
      console.log("加载更多")
      getCustomerShareRank(params).then(res => {
        that.setData({
          iscover: false
        })
        console.log("裂变引流", res)
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
      that.setData({
        iscover: false
      })
      return
    }
  },
  // 资源价值
  loadMore3: function (e) {
    console.log('上拉')
    let that = this
    that.setData({
      iscover: true
    })
    // 1.获取那个分页四个(三个)小选择
    let orderWay = this.data.orderWay
    // 2.获取指定时间
    let dayRange = this.data.dayRange
    // 3.获取自定义时间
    let startTime = this.data.startTime
    let endTime = this.data.endTime
    // 4.获取用哪种时间方式
    let timeWay = this.data.timeWay // 0 指定 1自定义
    // 5. currPage页数 pageSize数据量
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    let isend = this.data.isend
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      orderWay: orderWay,
      dayRange: dayRange,
      startTime: startTime,
      endTime: endTime,
      timeWay: timeWay,
      currPage: currPage,
      pageSize: pageSize
    }
    console.log('params参数', params)
    if (!isend) {
      console.log("加载更多")
      getCustomerNumsRank(params).then(res => {
        that.setData({
          iscover: false
        })
        console.log("资源价值", res)
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
      that.setData({
        iscover: false
      })
      return
    }
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
  },
  // 引流详情
  goflowdetail: function (e) {
    console.log('去引流详情页', e)
    // 获取员工id
    let id = e.currentTarget.dataset.id
    // 获取时间方式
    let orderWay = e.currentTarget.dataset.orderway
    // 获取时间范围
    let dayRange = e.currentTarget.dataset.dayrange
    // 获取开始时间
    let startTime = e.currentTarget.dataset.starttime
    // 获取结束时间
    let endTime = e.currentTarget.dataset.endtime
    let timeWay = this.data.timeWay
    wx.navigateTo({
      url: `/packageA/pages/flowdetail/flowdetail?id=${id}&&orderWay=${orderWay}&&dayRange=${dayRange}&&startTime=${startTime}&&endTime=${endTime}&&timeWay=${timeWay}`
    })
  }
})