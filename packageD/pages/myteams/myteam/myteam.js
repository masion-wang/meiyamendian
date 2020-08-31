import {
  getSelfLevelInfo, // 获取自己级别信息
  getSelfMySysUserInfo, // 获取自己真正有判断值的信息
  getStaffInfoByRoom, // 根据门店获取员工们
  getRoomInfoBySmallArea, // 根据小区获取门店们
  getSelfManageSmallArea, // 获取小区们
  // 获取自己权限的接口(判断有无申请人 帮别人申请的权利)
} from '../../../../route/mine/myteam/myteam'
import {
  selfPermissions
} from '../../../../route/admin/admin'
import {
  getSelfRoomStaffBaseInfo, // 员工的信息
} from '../../../../route/mine/index/index'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    info: {}, // 全部等级信息
    level: 0, //  3 大区经理 4 小区经理 5 股东 6 店长
    admintype: 0, // 1.总部 2公司 3大区经理 4小区经理 5 股东 6 员工
    roomid: '', // 门店id
    smallareaid: '', // 小区id
    id: '', // 员工id
    areas: [], // 小区们
    stores: [], // 门店们
    workers: [], // 员工们
    value1: [0],
    value2: [0],
    value3: [0],
    iscover: false, // 是否打开遮罩层
    name: '', // 要奖励或惩罚的员工
    isshowrewardandpunish: false, // 是否显示奖惩 my:home:myTeam:punishment 
    isshowoffjugde: false, // 是否显示离职审核  my:home:myTeam:leaveClick 
    roomStaffBaseDto: {} // 员工两个级别
  },
  onLoad: function (options) {
    //  判断有没有奖励和审核的权限
    this.isshow()
    // 我的级别
    this.getSelfLevelInfo()
    // 获取自己真正有判断值的信息
    this.getSelfMySysUserInfo()
  },
  onShow: function () {},
  // 判断有无奖惩 是否审核 
  isshow: function () {
    let that = this
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        console.log('全部权限情况', res)
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况2', arr)
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].pval == 'my:home:myTeam:punishment') {
            that.setData({
              isshowrewardandpunish: true
            })
          }
          if (arr[i].pval == 'my:home:myTeam:leaveClick') {
            that.setData({
              isshowoffjugde: true
            })
          }
        }
      }
    })
  },
  // 3.判断权限后 根据权限请求接口
  judge: function () {
    // 获取参数先 门店id 小区id 身份权限值
    let roomid = this.data.roomid
    let smallareaid = this.data.smallareaid
    let admintype = this.data.admintype
    let that = this
    // 如果是员工
    if (admintype == 6) {
      let params = {
        roomId: roomid
      }
      // 获取员工的级别
      that.getSelfRoomStaffBaseInfo()
      // 1-3 根据门店id获取员工们
      that.openmask()
      getStaffInfoByRoom(params).then(res => {
        if (res.data.code == 200) {
          that.closemask()
          // 如果没有员工
          if (res.data.data.roomStaffBases.length == 0) {
            that.setData({
              workers: [{
                stageName: "没有员工",
                id: ''
              }],
              id: '' // 默认第一个员工id
            })
            return
          }
          if (res.data.data.roomStaffBases.length != 0) {
            that.setData({
              workers: res.data.data.roomStaffBases,
              id: res.data.data.roomStaffBases[0].id, // 默认第一个员工id
              name: res.data.data.roomStaffBases[0].stageName
            })
            console.log('员工们', res.data.data.roomStaffBases)
            console.log('员工权限 查看员工们 默认员工id', res, res.data.data.roomStaffBases[0].id)
          }
        } else {
          that.closemask()
        }
      })
    }
    // 如果是小区经理 
    if (admintype == 4) {
      let params = {
        smallAreaId: smallareaid
      }
      that.openmask()
      // 1-2 根据小区id获取门店情况  
      getRoomInfoBySmallArea(params).then(res => {
        if (res.data.code == 200) {
          // 根据小区id获取门店 如果没有
          if (res.data.data.roomBasicsData.length == 0) {
            that.setData({
              stores: [{
                roomName: '暂无门店',
                id: ''
              }],
              roomid: '',
              workers: [{
                stageName: "没有员工",
                id: ''
              }],
              id: '' // 默认第一个员工id
            })
            that.closemask()
            return
          }
          if (res.data.data.roomBasicsData.length != 0) {
            console.log('先根据小区id获取门店情况 + 默认第一家门店的id', res, res.data.data.roomBasicsData[0].id)
            that.setData({
              stores: res.data.data.roomBasicsData,
              roomid: res.data.data.roomBasicsData[0].id
            })
            let params = {
              roomId: res.data.data.roomBasicsData[0].id
            }
            // 1-3 在默认用门店第一个roomid请求 员工信息
            getStaffInfoByRoom(params).then(res => {
              that.closemask()
              if (res.data.code == 200) {
                // 如果没有员工
                if (res.data.data.roomStaffBases.length == 0) {
                  that.setData({
                    workers: [{
                      stageName: "没有员工",
                      id: ''
                    }],
                    id: '' // 默认第一个员工id
                  })
                  return
                }
                if (res.data.data.roomStaffBases.length != 0) {
                  that.setData({
                    workers: res.data.data.roomStaffBases,
                    id: res.data.data.roomStaffBases[0].id, // 默认第一个员工id
                    name: res.data.data.roomStaffBases[0].stageName
                  })
                  console.log('员工权限 查看员工们 默认员工id', res, res.data.data.roomStaffBases[0].id)
                }
              } else {
                that.closemask()
              }
            })
          }
        } else {
          that.closemask()
        }
      })
    }
    // 如果是大区经理 
    if (admintype == 3) {
      // 1-1 先获取小区数据   
      that.openmask()
      getSelfManageSmallArea().then(res => {

        if (res.data.code == 200) {
          console.log('获取小区信息 在用默认第一个去获取门店数据', res)
          that.setData({
            areas: res.data.data.smallAreas,
            smallareaid: res.data.data.smallAreas[0].id
          })
          // 默认根据第一个小区id
          let params = {
            smallAreaId: res.data.data.smallAreas[0].id
          }
          // 1-2 根据小区id获取门店情况  
          getRoomInfoBySmallArea(params).then(res => {
            if (res.data.code == 200) {
              console.log('先根据小区id获取门店情况 + 默认第一家门店的id', res, res.data.data.roomBasicsData[0].id)
              // 根据小区id获取门店 如果没有
              if (res.data.data.roomBasicsData.length == 0) {
                that.setData({
                  stores: [{
                    roomName: '暂无门店',
                    id: ''
                  }],
                  roomid: '',
                  workers: [{
                    stageName: "没有员工",
                    id: ''
                  }],
                  id: '' // 默认第一个员工id
                })
                return
              }
              // 如果有门店
              if (res.data.data.roomBasicsData.length != 0) {
                that.setData({
                  stores: res.data.data.roomBasicsData,
                  roomid: res.data.data.roomBasicsData[0].id
                })
                let params = {
                  roomId: res.data.data.roomBasicsData[0].id
                }
                // 1-3 在默认用门店第一个roomid请求 员工信息
                getStaffInfoByRoom(params).then(res => {
                  that.closemask()
                  console.log('员工们', res)
                  if (res.data.code == 200) {
                    // 如果没有员工
                    if (res.data.data.roomStaffBases.length == 0) {
                      that.setData({
                        workers: [{
                          stageName: "没有员工",
                          id: ''
                        }],
                        id: '' // 默认第一个员工id
                      })
                      return
                    }
                    if (res.data.data.roomStaffBases.length != 0) {
                      that.setData({
                        workers: res.data.data.roomStaffBases,
                        id: res.data.data.roomStaffBases[0].id, // 默认第一个员工id
                        name: res.data.data.roomStaffBases[0].stageName
                      })
                    }
                    console.log('小区id', this.data.smallareaid, '门店id', this.data.roomid, '员工id ', this.data.id)
                  } else {
                    that.closemask()
                  }
                })
              }
            } else {
              that.closemask()
            }
          })
        } else {
          that.closemask()
        }
      })
    }
    // 暂无权限
    else {

    }
  },
  // 4.小区滑动 根据小区id获取门店数据
  bindChangeArea(e) {
    let areas = this.data.areas
    const val = e.detail.value
    // console.log('val', val, 'areas', areas)
    let that = this
    // 对准下标
    that.setData({
      value1: val,
      smallareaid: areas[val[0]].id
    })
    let params = {
      smallAreaId: areas[val[0]].id
    }
    that.openmask()
    // 1-2 根据小区id获取门店情况 
    getRoomInfoBySmallArea(params).then(res => {
      if (res.data.code == 200) {
        that.closemask()
        console.log('小群获取门店', res)
        // 根据小区id获取门店 如果没有
        if (res.data.data.roomBasicsData.length == 0) {
          that.setData({
            stores: [{
              roomName: '暂无门店',
              id: ''
            }],
            workers: [{
              stageName: "暂无员工",
              id: ''
            }],
            roomid: '',
            id: ''
          })
          console.log('小区id', this.data.smallareaid, '门店id', this.data.roomid, '员工id ', this.data.id)
          return
        }
        // 如果有
        if (res.data.data.roomBasicsData.length != 0) {
          that.setData({
            stores: res.data.data.roomBasicsData,
            roomid: res.data.data.roomBasicsData[0].id
          })
          let params = {
            roomId: res.data.data.roomBasicsData[0].id
          }
          // 1-3 在默认用门店第一个roomid请求 员工信息
          getStaffInfoByRoom(params).then(res => {
            that.closemask()
            if (res.data.code == 200) {
              that.setData({
                workers: res.data.data.roomStaffBases,
                id: res.data.data.roomStaffBases[0].id // 默认第一个员工id
              })
              // console.log('小区id', this.data.smallareaid, '门店id', this.data.roomid, '员工id ', this.data.id)
            }
          })
        }
      }
    })

  },
  // 5.店铺滑动 根据店铺id获取员工
  bindChangeStore(e) {
    let stores = this.data.stores
    const val = e.detail.value
    console.log('val', val, 'stores', stores)
    let that = this
    that.setData({
      value2: val,
      roomid: stores[val[0]].id
    })
    console.log('门店id', stores[val[0]].id)
    let params = {
      roomId: stores[val[0]].id
    }
    // 如果没有id 不要发请求
    if (params.roomId == "" || params.roomId == undefined) {
      that.closemask()
      return

    }
    that.openmask()
    // 请求员工情况
    getStaffInfoByRoom(params).then(res => {
      if (res.data.code == 200) {
        that.closemask()
        console.log('员工', res)
        // 没有员工
        if (res.data.data.roomStaffBases.length == 0) {
          that.setData({
            workers: [{
              stageName: "没有员工",
              id: ''
            }],
            id: '' // 默认第一个员工id
          })
          console.log('小区id', this.data.smallareaid, '门店id', this.data.roomid, '员工id ', this.data.id)
          return
        }
        // 有员工
        if (res.data.data.roomStaffBases.length != 0) {
          that.setData({
            workers: res.data.data.roomStaffBases,
            id: res.data.data.roomStaffBases[0].id // 默认第一个员工id
          })
        }
        console.log('小区id', this.data.smallareaid, '门店id', this.data.roomid, '员工id ', this.data.id)
      }
    })

  },
  // 6.店员滑动 获取店员id 
  bindChangeWorker(e) {
    let that = this
    // that.openmask()
    let workers = this.data.workers
    const val = e.detail.value
    console.log('店员信息 员工id', workers[val[0]], workers[val[0]].id)
    if (workers[val[0]].id == '') {
      this.setData({
        id: ''
      })
      // that.closemask()
      return
    }
    this.setData({
      id: workers[val[0]].id,
      name: workers[val[0]].stageName
    })
    // that.closemask()
    console.log('目前情况 员工id ', this.data.id)
  },
  // 获取员工级别(d级别 c++级别)
  getSelfRoomStaffBaseInfo: function () {
    let that = this
    getSelfRoomStaffBaseInfo().then(res => {
      if (res.data.code == 200) {
        console.log('员工要渲染上去的级别', res)
        that.setData({
          roomStaffBaseDto: res.data.data.roomStaffBaseDto
        })
      }
    })
  },
  // 1.获取自己级别信息
  getSelfLevelInfo: function () {
    let that = this
    getSelfLevelInfo().then(res => {
      if (res.data.code == 200) {
        console.log('自己级别信息', res)
        that.setData({
          info: res.data.data,
          level: res.data.data.levelType
        })
      }
    })
  },
  // 2.获取自己真正有判断值的信息 判断 员工(有权) 小区 大区
  getSelfMySysUserInfo: function () {
    let that = this
    getSelfMySysUserInfo().then(res => {
      if (res.data.code == 200) {
        console.log('获取自己系统级别信息', res)
        // admintype 1 总部 2 公司 3 大区经理 4 小区经理 5 股东 6 员工
        // let admintype = res.data.data.sysUser.adminType
        that.setData({
          admintype: res.data.data.sysUser.adminType
        })
        let roomid = ''
        let smallareaid = ''
        // 获取自己的级别和店铺id和小区id(级别必须有 店铺和小区id不一定有)
        if (res.data.data.sysUser.roomId) {
          roomid = res.data.data.sysUser.roomId
        } else {
          roomid = ''
        }
        if (res.data.data.sysUser.smallAreaId) {
          smallareaid = res.data.data.sysUser.smallAreaId // smallArea.id
        } else {
          smallareaid = ''
        }
        that.setData({
          // admintype: admintype, // 必须有值
          roomid: roomid, // 有值 或者 ''
          smallareaid: smallareaid // 有值 或者 ''
        })
        // 好了该获取的数据都获取了 开始判断吧再抽个方法单独做这个事
        this.judge()
      }
    })
  },
  // 关闭遮罩层
  closemask: function () {
    this.setData({
      iscover: false
    })
  },
  // 打开遮罩层
  openmask: function () {
    this.setData({
      iscover: true
    })
  },
  // 去处罚页面
  tofine: function (e) {
    console.log('目前情况 小区id 门店id 员工id ', this.data.smallareaid, this.data.roomid, this.data.id)
    let id = this.data.id
    let name = this.data.name
    if (id == '' || id == undefined) {
      wx.showToast({
        icon: 'none',
        title: '没有员工被选中',
      })
      return
    }
    wx.navigateTo({
      url: `/packageD/pages/myteams/fine/fine?id=${id}&name=${name}`,
    })
  },
  // 去奖励页面
  toreward: function (e) {
    console.log('目前情况 小区id 门店id 员工id ', this.data.smallareaid, this.data.roomid, this.data.id)
    let id = this.data.id
    let name = this.data.name
    if (id == '' || id == undefined) {
      wx.showToast({
        icon: 'none',
        title: '没有员工被选中',
      })
      return
    }
    wx.navigateTo({
      url: `/packageD/pages/myteams/reward/reward?id=${id}&name=${name}`,
    })
  },
  // 离职申请
  toseparationapplications: function () {
    wx.navigateTo({
      url: '/packageD/pages/myteams/separationapplications/separationapplications',
    })
  },
  // 离职审核
  toseparationaudit: function () {
    wx.navigateTo({
      url: '/packageD/pages/myteams/separationaudit/separationaudit',
    })
  },
  // 奖励记录
  torewardrecords: function () {
    wx.navigateTo({
      url: '/packageD/pages/myteams/rewardrecords/rewardrecords'
    })
  },
  // 惩罚记录
  tofinerecords: function () {
    wx.navigateTo({
      url: '/packageD/pages/myteams/finerecords/finerecords'
    })
  }
})