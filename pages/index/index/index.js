import {
  getLatestRoomCarouselBoard, // 轮播公告(默认三条)
  getMyRoomStaffLoop, // 员工排序
  loopIdle, // 空闲
  loopPassed, // 过牌
  loopReserved, // 有预约
  getSelfMySysUserInfo, // 获取自己admintype
  getSelfBasicsData, // 获取门店信息
  selfFirmData // 获取公司信息
} from '../../../route/index/guanjiaoutside/guanjiaoutside'
import {
  getHackPriceOrder // 请求砍价项目
} from '../../../route/index/ordertests/kanjia'
import {
  getUserProjectOrder // 请求一般项目
} from '../../../route/index/ordertests/ordertests'
import {
  getGroupBookingOrderItem // 请求拼团项目
} from '../../../route/index/ordertests/pintuan'
import {
  getIntimacyPayOrder // 请求亲密付项目
} from '../../../route/index/ordertests/qinmifu'
import {
  getConsumeReturnOrder // 请求消费返还项目
} from '../../../route/index/ordertests/xiaofeifanhuan'
import {
  selfPermissions // 判断权限有无
} from '../../../route/admin/admin'
import data from '../../../route/api/baseUrl'
Page({
  data: {
    uid: '',
    webServerUrl: data.webServerUrl,
    autoplay: true, // 轮播图配置
    interval: 2000,
    duration: 500,
    dialogShow: false, // 弹窗修改状态
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    back: false,
    roomCarouselBoards: [], // 公告栏
    roomStaffLoopDto: [], // 员工轮排情况
    rsliId: '', // 员工轮排id
    whicOneAPI: '', // 状态判断API
    // 状态值   可接待 0 有顾客 1 过牌2
    items: [{
        name: '可接待',
        value: '0'
      },
      {
        name: '有顾客',
        value: '1',
        // checked: 'true'
      },
      {
        name: '过牌',
        value: '2'
      }
    ],
    storename: '',
    admintype: 0 // 3 大区 4 小区 5 股东 6 员工 
  },
  // 点击首页更新
  onTabItemTap: function () {
    this.getLatestRoomCarouselBoard()
  },
  // 一开始加载首页
  onLoad: function () {
    this.getLatestRoomCarouselBoard() // 轮播公告
  },
  onShow: function () {
    let that = this
    // 判断有没有token 没有token 请空数据 roomCarouselBoards roomStaffLoopDto
    let istoken = wx.getStorageSync('token')
    if (istoken) {

    } else {
      that.setData({
        roomCarouselBoards: [],
        roomStaffLoopDto: []
      })
    }
  },
  // 改成公司的标题
  selfFirmData: function () {
    selfFirmData().then(res => {
      if (res.data.code == 200) {
        console.log('门店信息改成公司信息', res)
        wx.setNavigationBarTitle({
          // 店名称 roomName
          // 公司名称 roomFirmName
          title: res.data.data.firmDataDto.firmBrand
        })
      }
    })
  },
  // 获取人的(大概率员工)uid和级别
  getSelfMySysUserInfo: function () {
    let that = this
    getSelfMySysUserInfo().then(res => {
      if (res.data.code == 200) {
        console.log('员工数据 + 自己的级别', res)
        that.setData({
          uid: res.data.data.sysUser.roomStaffId,
          admintype: res.data.data.sysUser.adminType
        })
        // 保存获取门店图片的uid
        let uid2 = res.data.data.sysUser.uid
        uid2 = uid2.toString()
        console.log('uid的type', typeof uid2)
        wx.setStorageSync('uid', uid2)
        console.log('保存uid', uid2)
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 下拉刷新
  upper: function () {
    console.log('下拉刷新')
    this.getLatestRoomCarouselBoard()
    this.getMyRoomStaffLoop()
  },
  // 获取公告
  getLatestRoomCarouselBoard: function () {
    let that = this
    getLatestRoomCarouselBoard().then(res => {
      that.setData({
        back: false
      })
      console.log('公告三条数据信息', res)
      if (res.data.code == 200) {
        that.setData({
          roomCarouselBoards: res.data.data.roomCarouselBoards
        })
        that.getMyRoomStaffLoop() // 门店员工
        that.getSelfMySysUserInfo() // 获取自己员工系统信息
        that.selfFirmData() // 获取公司信息
      }
    })
  },
  // 获取轮排情况
  getMyRoomStaffLoop: function () {
    // 轮排状态 0 空闲中 1 有预约 2 过牌 3 被罚下牌4.下班时间 5.请假休息
    let that = this
    getMyRoomStaffLoop().then(res => {
      console.log('门店员工', res)
      that.setData({
        back: false
      })
      if (res.data.code == 200) {
        that.setData({
          roomStaffLoopDto: res.data.data.roomStaffLoopDto,
          whicOneAPI: ''
        })
      }
      // else if (res.data.code == 10004) {} 
      else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 打开弹窗 获取id
  openConfirm: function (e) {
    let status = e.currentTarget.dataset.status
    // 每次打开清空状态
    const items = [{
        name: '可接待',
        value: '0'
      },
      {
        name: '有顾客',
        value: '1',
        // checked: 'true'
      },
      {
        name: '过牌',
        value: '2'
      }
    ]
    this.setData({
      items: items,
    })
    console.log('修改员工状态', e)
    // 保存要操作员工的id
    this.setData({
      rsliId: e.currentTarget.dataset.id
    })
    // 判断是否打开
    console.log(e.currentTarget.dataset.sureid, this.data.uid)
    if (e.currentTarget.dataset.sureid == this.data.uid && status != 3 && status != 4 && status != 5) {
      this.setData({
        dialogShow: true
      })
    }
    //  3.被罚下牌 无法操作  4.下班时间 无法操作  5.请假状态 无法操作
    console.log('状态', status)
    if (e.currentTarget.dataset.sureid == this.data.uid && status == 3) {
      wx.showToast({
        icon: 'none',
        title: '被罚下牌 无法操作'
      })
      return
    }
    if (e.currentTarget.dataset.sureid == this.data.uid && status == 4) {
      wx.showToast({
        icon: 'none',
        title: '下班时间 无法操作'
      })
      return
    }
    if (e.currentTarget.dataset.sureid == this.data.uid && status == 5) {
      wx.showToast({
        icon: 'none',
        title: '请假状态 无法操作'
      })
      return
    }

  },
  // 获取状态判断值
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    // 获取状态值
    this.setData({
      whicOneAPI: e.detail.value
    })
  },
  // 确认修改状态员工
  tapDialogButton(e) {
    let that = this
    console.log('取消还是确定', e.detail.index)
    // 1.获取下标 2.判断走哪个操作whichOne 3.获取员工id
    let index = e.detail.index
    let whicOneAPI = this.data.whicOneAPI
    let rsliId = this.data.rsliId
    let params = {
      rsliId: rsliId
    }
    // 取消按钮 
    if (index == 0) {
      that.setData({
        whicOneAPI: ''
      })
    }
    // 确定按钮 根据接待状态判断修改接口 然后重新渲染门店员工数据
    else if (index == 1) {
      // whichOneAPI
      // 0 可接待操作 loopIdle => 空闲状态 
      // 1 有顾客操作 loopReserved => 有预约状态
      // 2 过牌操作   loopPassed => 有预约状态
      if (whicOneAPI == '') {
        wx.showToast({
          icon: 'none',
          title: '请选中后再操作',
        })
        return
      }
      if (whicOneAPI == 0) {
        loopIdle(params).then(res => {
          console.log('可接待', res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '修改成功！',
              success: function () {
                // 2.请求门店员工排序数据
                getMyRoomStaffLoop().then(res => {
                  console.log('门店员工', res)
                  if (res.data.code == 200) {
                    that.setData({
                      roomStaffLoopDto: res.data.data.roomStaffLoopDto,
                      whicOneAPI: ''
                    })
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: '后台繁忙',
                    })
                  }
                })
              }
            })
          }
          if (res.data.code == 10002) {
            wx.showToast({
              icon: 'none',
              title: '无法进行该操作',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.message,
            })
          }
        })
      }
      if (whicOneAPI == 1) {
        loopReserved(params).then(res => {
          console.log('有顾客', res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '修改成功！',
              success: function () {
                // 2.请求门店员工排序数据
                getMyRoomStaffLoop().then(res => {
                  console.log('门店员工', res)
                  if (res.data.code == 200) {
                    that.setData({
                      roomStaffLoopDto: res.data.data.roomStaffLoopDto,
                      whicOneAPI: ''
                    })
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: '后台繁忙',
                    })
                  }
                })
              }
            })
          }
          if (res.data.code == 10002) {
            wx.showToast({
              icon: 'none',
              title: '无法进行该操作',
            })
          }
        })
      }
      if (whicOneAPI == 2) {
        loopPassed(params).then(res => {
          console.log('过牌', res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '修改成功！',
              success: function () {
                // 2.请求门店员工排序数据
                getMyRoomStaffLoop().then(res => {
                  console.log('门店员工', res)
                  if (res.data.code == 200) {
                    that.setData({
                      roomStaffLoopDto: res.data.data.roomStaffLoopDto,
                      whicOneAPI: ''
                    })
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: '后台繁忙',
                    })
                  }
                })
              }
            })
          }
          if (res.data.code == 10002) {
            wx.showToast({
              icon: 'none',
              title: '无法进行该操作',
            })
          }
        })

      }
    }
    // 10002 参数错误
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },





  // 11个子模块
  // 扫码验证
  saoyisao: function () {
    let admintype = this.data.admintype
    console.log('admintype', admintype)
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:verify' && admintype != 3 && admintype != 4 && admintype != 5) {
            wx.scanCode({
              success(res) {
                console.log(res)
                let data = JSON.parse(res.result)
                console.log("解析后数据", data)
                console.log("二维码业务类型", data.type)
                let id = encodeURIComponent(data.data.id) // 订单id
                // status 拼团订单项支付状态 0 未支付成功 1 支付成功,未校验 2 支付成功已校验
                // 3 已支付，退款中 4 因拼团超时或要求退款，已经退款 
                // 5 未支付已取消订单 6 已支付、已核销、已经评论 7 退款失败 8 超时,订单因长时间未核销而超时,等待用户申请退款 9 拼团超时退款，因长时间未达到拼团人数系统自动退款
                // 根据不通过业务类型 跳转不同页面
                // 1.一般订单 ok
                if (data.type == 'user_project_order') {
                  let params = {
                    odId: id
                  }
                  getUserProjectOrder(params).then(res => {
                    if (res.data.code == 10021) {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })

                    }
                    if (res.data.code == 200) {
                      console.log('一般订单已经核销过', res)
                      if (res.data.data.userProjectOrderDto.status == 2) {
                        wx.showToast({
                          icon: 'none',
                          title: '已核销 请勿重复操作',
                          duration: 2000
                        })
                        return
                      } else {
                        wx.navigateTo({
                          url: `/packageA/pages/ordertests/ordertest/ordertest?id=${id}`,
                          success: function (res) {}
                        })
                      }
                    } else {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })
                    }
                  })
                }
                // 2.砍价 ok
                if (data.type == 'hack_price_order') {
                  let params = {
                    odId: id
                  }
                  getHackPriceOrder(params).then(res => {
                    if (res.data.code == 10021) {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })
                    }
                    if (res.data.code == 200) {
                      console.log('砍价已经核销过', res)
                      if (res.data.data.hackPriceOrderDto.payStatus == 2) {
                        wx.showToast({
                          icon: 'none',
                          title: '已核销 请勿重复操作',
                          duration: 2000
                        })
                        return
                      } else {
                        wx.navigateTo({
                          url: `/packageA/pages/ordertests/kanjia/kanjia?id=${id}`,
                          success: function (res) {}
                        })
                      }

                    } else {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })
                    }
                  })
                }
                // 3.消费返回 ok
                if (data.type == 'consume_return_order') {
                  let params = {
                    odId: id
                  }
                  getConsumeReturnOrder(params).then(res => {
                    if (res.data.code == 10021) {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })
                    }
                    if (res.data.code == 200) {
                      console.log('消费返还已经核销过', res)
                      if (res.data.data.consumeReturnOrderDto.status == 2) {
                        wx.showToast({
                          icon: 'none',
                          title: '已核销 请勿重复操作',
                          duration: 2000
                        })
                        return
                      } else {
                        wx.navigateTo({
                          url: `/packageA/pages/ordertests/xiaofeifanhuan/xiaofeifanhuan?id=${id}`,
                          success: function (res) {}
                        })
                      }

                    } else {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })
                    }
                  })
                }
                // 4.拼团 ok
                if (data.type == 'group_booking_order_item') {
                  let params = {
                    odItemId: id
                  }
                  getGroupBookingOrderItem(params).then(res => {
                    if (res.data.code == 10021) {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })
                    }
                    if (res.data.code == 200) {
                      console.log('拼团已经核销过', res)
                      if (res.data.data.groupBookingOrderItemDto.status == 2) {
                        wx.showToast({
                          icon: 'none',
                          title: '已核销 请勿重复操作',
                          duration: 2000
                        })
                        return
                      } else {
                        wx.navigateTo({
                          url: `/packageA/pages/ordertests/pintuan/pintuan?id=${id}`,
                          success: function (res) {}
                        })
                      }

                    } else {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })
                    }
                  })
                }
                // 5.亲密付 ok
                if (data.type == 'intimacy_pay_order') {
                  let params = {
                    odId: id
                  }
                  getIntimacyPayOrder(params).then(res => {
                    if (res.data.code == 10021) {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })
                    }
                    if (res.data.code == 200) {
                      console.log('亲密付已经核销过', res)
                      if (res.data.data.intimacyPayOrderDto.status == 2) {
                        wx.showToast({
                          icon: 'none',
                          title: '已核销 请勿重复操作',
                          duration: 2000
                        })
                        return
                      } else {
                        wx.navigateTo({
                          url: `/packageA/pages/ordertests/qinmifu/qinmifu?id=${id}`,
                          success: function (res) {}
                        })
                      }
                    } else {
                      wx.showToast({
                        icon: 'none',
                        title: '请在预约门店核销',
                        duration: 3000
                      })
                    }
                  })
                }
              }
            })
            go = true
            break
          }

        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 验证记录
  toRecord: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:verifyDetails' && admintype != 3 && admintype != 4 && admintype != 5) {
            console.log("跳转验证记录")
            wx.navigateTo({
              url: '/packageA/pages/records/record/record',
              success: function (res) {}
            })
            go = true
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 预约订单
  toRecordWithChat: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:order' && admintype != 3 && admintype != 4 && admintype != 5) {
            console.log("跳转预约订单")
            wx.navigateTo({
              url: '/packageA/pages/appointorder/appointlist/appointlist',
              success: function (res) {}
            })
            go = true
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 签到
  toSign: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:signIn' && admintype != 3 && admintype != 4 && admintype != 5) {
            console.log("跳转签到页面")
            wx.navigateTo({
              url: '/packageA/pages/sign/sign',
              success: function (res) {}
            })
            go = true
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 跳转公告页
  goNotice: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:board') {
            go = true
            console.log("跳转公告页面")
            wx.navigateTo({
              url: '/packageA/pages/notices/notice/notice',
              success: function (res) {}
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 订单统计
  toOrderStatistic: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:orderList' && admintype != 3 && admintype != 4 && admintype != 5) {
            go = true
            console.log("跳转订单统计")
            wx.navigateTo({
              url: '/packageA/pages/orderstatistic/orderstatistic',
              success: function (res) {}
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 用户列表
  toUserList: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:usreList' && admintype != 3 && admintype != 4 && admintype != 5) {
            go = true
            console.log("跳转用户列表")
            wx.navigateTo({
              url: '/packageA/pages/userlist/userlist',
              success: function (res) {}
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 排行榜
  toRankList: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:rankingList') {
            go = true
            console.log("跳转排行榜")
            wx.navigateTo({
              url: '/packageA/pages/ranklist/ranklist',
              success: function (res) {}
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      }
    })

  },
  // 预约时间
  toAppiontTime: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有  大区小区因为要审核所以没有限制
          if (arr[i].pval == 'staff:home:reserveDate' && admintype != 5) {
            go = true
            console.log("跳转预约时间")
            wx.navigateTo({
              url: '/packageA/pages/appionttimes/appionttime/appionttime',
              success: function (res) {}
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 查看评论  
  toLookComment: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:evaluate' && admintype != 3 && admintype != 4 && admintype != 5) {
            go = true
            console.log("跳转查看评论")
            wx.navigateTo({
              url: '/packageA/pages/lookcomment/lookcomment',
              success: function (res) {}
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 我的作品
  toMyWork: function () {
    let admintype = this.data.admintype
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:works' && admintype != 3 && admintype != 4 && admintype != 5) {
            go = true
            console.log("跳转我的作品")
            wx.navigateTo({
              url: '/packageA/pages/myworks/mywork/mywork',
              success: function (res) {}
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  }
})