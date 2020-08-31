import {
  getUserList, // 用户列表
  getSelfFirmNumberCard, // 获取次卡信息
  getSelfFirmCustomerCard, // 获取会员卡信息
  getSelfFirmProjects2, // 获取项目接口
  userListTop // 置顶接口
} from '../../../route/index/userlist/userlist'
import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    // 项目弹窗
    dialogShow1: false,
    showOneButtonDialog1: false,
    // 卡类型弹窗
    dialogShow2: false,
    showOneButtonDialog2: false,
    // 按钮
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 一周 一月 三个月
    time: [{
      name: "一周",
      recentDays: 7
    }, {
      name: "一月",
      recentDays: 30
    }, {
      name: "三个月",
      recentDays: 90
    }],
    // 状态数据
    status2: [{
      name: '未到店',
      id: "0",
      selected: false
    }, {
      name: '到店',
      id: "1",
      selected: false
    }],
    activeIndex: -1, // 单选index
    isRuleTrue: false, // 右边弹窗是否出来
    projects: [], // 项目多选项数据
    cards: [], // 会员卡多选项数据
    cardsnumber: [], // 次卡多选项数据
    projectid: [], // 项目id 参数
    cardsid: [], // 会员卡id 参数
    cardsnumberid: [], // 次卡id 参数
    remarkName: '', // 关键词参数
    recentDays: 7, // 时间参数1
    recentDays2: '', // 时间参数2
    status: 0, // 状态参数  默认未到店 1 到店 0 未店 -1 无 2 是全部
    list: [], // 分页数据
    currPage: 1, // 第几页
    pageSize: 5, // 请求几条
    isend: false, // 是否有更多数据
  },
  onLoad: function () {},
  onShow: function () {
    // 获取 项目 会员卡 次卡 分页数据
    this.customercard()
    this.firmnumbercard()
    this.firmprojects()
    this.getlist()
  },
  // 获取状态参数
  tapStatus: function (e) {
    console.log("index", e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let status2 = this.data.status2
    status2[index].selected = !status2[index].selected
    // 给status准备状态 
    // 1 到店 0 未店 -1 无 2 是全部
    // 选中未到店 状态0
    if (status2[0].selected && status2[1].selected != true) {
      this.setData({
        status: 0
      })
    }
    // 只选中到店 状态1
    if (status2[1].selected && status2[0].selected != true) {
      this.setData({
        status: 1
      })
    }
    // 两个都选中 无 包含两种
    if (status2[1].selected && status2[0].selected) {
      this.setData({
        status: 2
      })
    }
    if (!status2[1].selected && !status2[0].selected) {
      this.setData({
        status: -1
      })
    }
    console.log('status状态', this.data.status)
    this.setData({
      status2: status2
    })
  },
  // 搜索 发送请求
  submit: function () {
    let recentDays = this.data.recentDays // 2.时间   recentDays
    let status = this.data.status // 2.时间   recentDays
    // 如果未选择时间参数
    if (recentDays == -1 || recentDays == 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入或选择时间参数',
        duration: 3000
      })
      return
    }
    // 如果未选择状态
    if (status == -1) {
      wx.showToast({
        icon: 'none',
        title: '请选择到店状态',
        duration: 3000
      })
      return
    }
    // 清空数组 发送请求 
    this.setData({
      list: [], // 清空数组
      currPage: 1, // 第几页
      pageSize: 5, // 请求几条
      isend: false
    })
    console.log('ahahahaha', this.data.list)
    this.loadMore()
  },
  // 完成 发送请求
  success: function () {
    let recentDays = this.data.recentDays // 2.时间   recentDays
    let status = this.data.status // 2.时间   recentDays
    // 如果未选择时间参数
    if (recentDays == -1 || recentDays == 0 || recentDays == -2) {
      wx.showToast({
        icon: 'none',
        title: '请输入或选择时间参数',
        duration: 3000
      })
      return
    }
    // 如果未选择状态
    if (status == -1) {
      wx.showToast({
        icon: 'none',
        title: '请选择到店状态',
        duration: 3000
      })
      return
    }
    this.setData({
      isRuleTrue: false
    })
    this.animation.translate(0, 0).step()
    this.setData({
      animation: this.animation.export()
    })
    // 清空数组 发送请求 
    this.setData({
      list: [], // 清空数组
      currPage: 1, // 第几页
      pageSize: 5, // 请求几条
      isend: false
    })
    // 发送请求
    this.loadMore()
  },
  // 下拉刷新
  getlist: function () {
    console.log('下拉')
    this.setData({
      isend: false,
      currPage: 1,
      projectid: [], // 项目id 参数
      cardsid: [], // 会员卡id 参数
      cardsnumberid: [], // 次卡id 参数
      remarkName: '', // 关键词参数
      recentDays: -2, // 时间参数1
      recentDays2: '', // 时间参数2
      status: -1, // 状态默认两种
      activeIndex: -1, // 交互
      list: [],
      status2: [{
        name: '未到店',
        id: "0",
        selected: false
      }, {
        name: '到店',
        id: "1",
        selected: false
      }],
    })
    this.loadMore()
  },
  // 分页数据
  loadMore() {
    console.log('上拉')
    let that = this
    let remarkName = this.data.remarkName // 1.关键词
    let recentDays = this.data.recentDays // 2.时间   recentDays
    // 如果未选择时间参数
    if (recentDays == -1) {
      wx.showToast({
        icon: 'none',
        title: '请输入或选择时间参数',
        duration: 3000
      })
      return
    }
    let proIds = this.data.projectid // 3.项目id proIds
    proIds = proIds.flat()
    let cstmCardIds = this.data.cardsid // 4.会员卡id cstmCardIds
    let numCardIds = this.data.cardsnumberid // 5.次卡id numCardIds
    let status = this.data.status // 6.状态 status
    let isend = this.data.isend // 7.是否结束请求
    let currPage = this.data.currPage // 8.currPage页数 
    let pageSize = this.data.pageSize // 9.pageSize数据量
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      remarkName: remarkName,
      recentDays: recentDays,
      proIds: proIds,
      cstmCardIds: cstmCardIds,
      numCardIds: numCardIds,
      status: status,
      currPage: currPage,
      pageSize: pageSize
    }
    console.log('用户分页params参数', params)
    if (!isend) {
      console.log("加载更多")
      getUserList(params).then(res => {
        console.log("用户列表数据", res)
        if (res.data.code == 200) {
          console.log("分页列表数据", res.data.data.contents)
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
        }
        // else if (res.data.code == 10004) {
        //   wx.showToast({
        //     icon: 'none',
        //     title: '没有此权限',
        //     duration: 2000,
        //     success: function () {
        //       setTimeout(() => {
        //         wx.navigateBack({
        //           delta: 1
        //         })
        //       }, 2000)
        //     }
        //   })
        // } 
        else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
      })
    } else {
      console.log("不请求")
      return
    }
  },
  // 卡取消
  tapDialogButton2: function (e) {
    console.log(e.detail.index)
    let buttonIndex = e.detail.index
    // 取消 清空数据会员卡和次卡
    if (buttonIndex == 0) {
      let cards = this.data.cards
      let cardsnumber = this.data.cardsnumber
      console.log('cards', cards, 'cardsnumber', cardsnumber)
      for (let item of cards) {
        item.checked = false
      }
      for (let item of cardsnumber) {
        item.checked = false
      }
      this.setData({
        cards: cards,
        cardsnumber: cardsnumber,
        cardsid: [], // 会员卡id 参数
        cardsnumberid: [] // 次卡id
      })
    }
    // 确定 
    if (buttonIndex == 1) {}
    this.setData({
      dialogShow2: false,
      showOneButtonDialog2: false
    })
  },
  // 置顶
  toup: function (e) {
    let that = this
    let userListId = e.currentTarget.dataset.id
    let params = {
      userListId: userListId
    }
    userListTop(params).then(res => {
      if (res.data.code == 200) {
        wx.showToast({
          icon: 'none',
          title: '置顶成功',
          duration: 500,
          success: function () {
            setTimeout(() => {
              // 清空数组 发送请求 
              that.setData({
                list: [], // 清空数组
                currPage: 1, // 第几页
                pageSize: 5, // 请求几条
                isend: false
              })
              // 重新渲染
              that.loadMore()
            }, 500)
          }
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
  // 微信动画对象
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  // 打开选择栏 
  translate: function () {
    this.setData({
      isRuleTrue: true
    })
    this.animation.translate(-245, 0).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 关闭选择栏
  reset: function () {
    this.setData({
      isRuleTrue: false
    })
  },
  // 获取时间参数
  tapTime: function (e) {
    console.log('选择时间', e.currentTarget.dataset.recentdays)
    // 修改交互样式 获取时间参数
    this.setData({
      activeIndex: e.currentTarget.dataset.key,
      recentDays: e.currentTarget.dataset.recentdays,
      recentDays2: ''
    });
  },
  // 获取输入时间焦点 清空交互+数据
  focus: function () {
    this.setData({
      activeIndex: -1,
      recentDays: -1,
    })
    console.log('时间参数', this.data.recentDays)
  },
  // 输入框获取时间
  recentDays: function (e) {
    console.log('时间', e.detail.value)
    // 限制时间格式
    if (Number(e.detail.value) < 0 || isNaN(Number(e.detail.value))) {
      wx.showToast({
        icon: 'none',
        title: '时间参数不可为负数或其它',
      })
      return
    }
    // 取消交互 保存正确时间格式
    this.setData({
      recentDays: e.detail.value,
      activeIndex: -1
    })
  },
  // 打开项目
  tapProject: function (e) {
    this.setData({
      dialogShow1: true
    })
  },
  // 获取项目接口
  firmprojects: function () {
    let that = this
    getSelfFirmProjects2().then(res => {
      console.log('项目', res.data.data.dutyDataDtos)
      if (res.data.code == 200) {
        that.setData({
          projects: res.data.data.dutyDataDtos
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message,
        })
      }
    })
  },
  // 项目多选
  checkboxChange3(e) {
    console.log('e', e)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let index = e.currentTarget.dataset.index
    let projects = this.data.projects
    const items = this.data.projects[index].firmProjectDtos
    const projectid = this.data.projectid
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].id == values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    // 保存最新的五个大的
    projects[index].firmProjectDtos = items
    // 根据五个的 获取五个小的 根据index保存在数组中 [[],[],[],]
    projectid[index] = e.detail.value
    console.log('projects', projects, 'projectid', projectid)
    this.setData({
      projectid: projectid,
      projects: projects
    })
    console.log('项目收集id', this.data.projectid, '项目布尔值', this.data.projects)
  },
  // 项目取消
  tapDialogButton3: function (e) {
    console.log("下标", e.detail.index)
    let buttonIndex = e.detail.index
    // 取消 清空项目勾选样式  数组里面所有对象的数组check变为false
    if (buttonIndex == 0) {
      let projects = this.data.projects
      for (let i = 0; i < projects.length; i++) {
        for (let j = 0; j < projects[i].firmProjectDtos.length; j++) {
          projects[i].firmProjectDtos[j].checked = false
        }
      }
      // 变为false id全部去掉
      this.setData({
        projects: projects,
        projectid: []
      })
    }
    // 确定
    if (buttonIndex == 1) {}
    // 关闭弹窗
    this.setData({
      dialogShow1: false,
      showOneButtonDialog1: false
    })
  },

  // 打开卡弹窗(次卡 会员卡)
  tapType: function (e) {
    this.setData({
      dialogShow2: true
    })
  },
  // 会员卡多选并且保存
  checkboxChange1(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      cardsid: e.detail.value
    })
    console.log('会员卡收集id', this.data.cardsid)
  },
  // 次卡多选并且保存
  checkboxChange2(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      cardsnumberid: e.detail.value
    })
    console.log('次卡id数组', this.data.cardsnumberid)
  },

  // 实时获取关键词
  getvalue: function (e) {
    console.log(e.detail.value)
    // 保存关键词
    this.setData({
      remarkName: e.detail.value,
    })
  },


  // 获取会员卡接口
  customercard: function () {
    let that = this
    getSelfFirmCustomerCard().then(res => {
      console.log('会员卡', res.data.data.firmCustomerCards)
      if (res.data.code == 200) {
        that.setData({
          cards: res.data.data.firmCustomerCards
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message,
        })
      }

    })
  },
  // 获取次卡接口
  firmnumbercard: function () {
    let that = this
    getSelfFirmNumberCard().then(res => {
      console.log('次卡', res.data.data.firmNumberCards)
      if (res.data.code == 200) {
        that.setData({
          cardsnumber: res.data.data.firmNumberCards
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message,
        })
      }
    })
  },
  // 去会员详情
  tocustomerdetail: function (e) {
    console.log('去会员详情页', e)
    let uid = e.currentTarget.dataset.id
    let sort = e.currentTarget.dataset.sort
    let id = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: `/packageA/pages/appointorder/customerdetail/customerdetail?uid=${uid}&&sort=${sort}&&id=${id}`,
    })
  },
  // 跳转可兑换人数页面
  gotosharepeople: function (e) {
    console.log('跳转前的id', e.currentTarget.dataset.id)
    let uid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/packageA/pages/sharepeople/sharepeople?uid=${uid}`,
    })
  },
  // 阻止滑动
  preventD: function () {
    return
  },
})