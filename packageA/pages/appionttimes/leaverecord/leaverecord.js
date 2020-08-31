import {
  getSelfLeavePenaltyStatistics, // 获取统计信息
  getFirmLeaveData, // 获取请假记录分页
  roomManagerCheckLeaveData, // 门店审核
  smallAreaManagerCheckLeaveData, // 小区审核
  bigAreaManagerCheck, // 大区审核
  // getSelfMySysUserInfo // 获取身份自己身份
} from '../../../../route/index/leaverecord/leaverecord'
import {
  selfPermissions // 判断权限有无
} from '../../../../route/admin/admin'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    punish: {},
    adminType: '', // 自己级别的信息
    // 1.总部 2公司 3大区经理 4小区经理 5股东 6门店员工
    isend: false, // 是否显示
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    totalPages: 0, // 总页面
    list: [], //列表数据
    leaveDataId: '', // 请假记录id
    state: 0, // 通过 驳回   
    index: 0, // 判断请求那个接口
    // 弹窗修改状态
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 状态值   可接待 0 有顾客 1 过牌2
    items: [{
        name: '通过',
        value: '1'
      },
      {
        name: '驳回',
        value: '2',
      }
    ],
    isworker: true // 是否为员工
  },
  onLoad: function (options) {
    // 获取统计信息
    this.getSelfLeavePenaltyStatistics()
    // 请假信息分页
    this.loadMore()
    // 自己有无按钮权限
    selfPermissions().then(res => {
      let that = this
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'staff:home:reserveDate:leaveCheck') {
            that.setData({
              isworker: false
            })
            break
          }
        }

      }
    })
  },
  // 获取自己的身份
  // getSelfMySysUserInfo: function () {
  //   let that = this
  //   getSelfMySysUserInfo().then(res => {
  //     console.log('自己的级别', res)
  //     if (res.data.code == 200) {
  //       that.setData({
  //         adminType: res.data.data.sysUser.adminType
  //       })
  //     } else {
  //       wx.showToast({
  //         icon: 'none',
  //         title: res.data.message
  //       })
  //     }
  //   })
  // },
  // 获取扣除统计信息
  getSelfLeavePenaltyStatistics: function () {
    let that = this
    getSelfLeavePenaltyStatistics().then(res => {
      console.log('统计信息', res)
      if (res.data.code == 200) {
        that.setData({
          punish: res.data.data
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message,
        })
      }
    })
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
      getFirmLeaveData(params).then(res => {
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
  // 门店审核
  roomManagerCheckLeaveData: function (e) {
    console.log('门店审核的审核对象', e)
    let roomcheckpermission = e.currentTarget.dataset.roomcheckpermission
    let state = e.currentTarget.dataset.state
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id // 请假记录id
    // 判断有没有资格打开 
    if (roomcheckpermission && state == 0) {
      // 打开
      this.openConfirm()
      // 保存id
      this.setData({
        leaveDataId: id,
        index: index
      })
    } else {
      return
    }

  },
  // 小区审核
  smallAreaManagerCheckLeaveData: function (e) {
    console.log('小区审核')
    let smallAreaCheckPermission = e.currentTarget.dataset.smallAreaCheckPermission
    let state = e.currentTarget.dataset.state
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id // 请假记录id
    // 判断有没有资格打开 
    if (smallAreaCheckPermission && state == 0) {
      // 打开
      this.openConfirm()
      // 保存id
      this.setData({
        leaveDataId: id,
        index: index
      })
    } else {
      return
    }
  },
  // 大区审核
  bigAreaManagerCheck: function (e) {
    let bigAreaCheckPermission = e.currentTarget.dataset.bigAreaCheckPermission
    let state = e.currentTarget.dataset.state
    let index = e.currentTarget.dataset.index

    let id = e.currentTarget.dataset.id // 请假记录id
    // 判断有没有资格打开 
    if (bigAreaCheckPermission && state == 0) {
      // 打开
      this.openConfirm()
      // 保存id
      this.setData({
        leaveDataId: id,
        index: index
      })
    } else {
      return
    }
  },
  // 打开弹窗 获取id
  openConfirm: function (e) {
    this.setData({
      dialogShow: true
    })
  },
  // 获取状态判断值
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    // 获取状态值
    this.setData({
      state: e.detail.value
    })
  },
  // 驳回
  finebutton: function (e) {
    let roomcheckstate = e.currentTarget.dataset.roomcheckstate
    let smallareacheckstate = e.currentTarget.dataset.smallareacheckstate
    let bigareacheckstate = e.currentTarget.dataset.bigareacheckstate
    let leaveDataId = e.currentTarget.dataset.id
    let state = e.currentTarget.dataset.state
    // 店长未审核
    if (roomcheckstate == 0) {
      let params = {
        leaveDataId: leaveDataId,
        state: state
      }
      console.log('店长驳回参数', params)
      roomManagerCheckLeaveData(params).then(res => {
        if (res.data.code == 200) {
          console.log('店长驳回成功', res)
          wx.showToast({
            icon: 'none',
            title: '驳回成功',
            duration: 1500,
            success: function () {
              let timer = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
                clearTimeout(timer)
              }, 1000)
            }
          })
        }
      })
    }
    // 小区  店长必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 0) {
      let params = {
        leaveDataId: leaveDataId,
        state: state
      }
      console.log('小区驳回参数', params)
      smallAreaManagerCheckLeaveData(params).then(res => {
        if (res.data.code == 200) {
          console.log('小区驳回成功', res)
          wx.showToast({
            icon: 'none',
            title: '驳回成功',
            duration: 1500,
            success: function () {
              let timer = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
                clearTimeout(timer)
              }, 1000)
            }
          })
        }
      })
    }
    // 大区  店长和小区必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 1 && bigareacheckstate == 0) {
      let params = {
        leaveDataId: leaveDataId,
        state: state
      }
      console.log('大区驳回参数', params)
      bigAreaManagerCheck(params).then(res => {
        if (res.data.code == 200) {
          console.log('大区驳回成功', res)
          wx.showToast({
            icon: 'none',
            title: '驳回成功',
            duration: 1500,
            success: function () {
              let timer = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
                clearTimeout(timer)
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
    let leaveDataId = e.currentTarget.dataset.id
    let state = e.currentTarget.dataset.state
    // 店长未审核
    if (roomcheckstate == 0) {
      let params = {
        leaveDataId: leaveDataId,
        state: state
      }
      console.log('店长通过参数', params)
      roomManagerCheckLeaveData(params).then(res => {
        if (res.data.code == 200) {
          console.log('店长通过成功', res)
          wx.showToast({
            icon: 'none',
            title: '通过成功',
            duration: 1500,
            success: function () {
              let timer = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
                clearTimeout(timer)
              }, 1000)
            }
          })
        }
      })
    }
    // 小区  店长必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 0) {
      let params = {
        leaveDataId: leaveDataId,
        state: state
      }
      console.log('小区通过参数', params)
      smallAreaManagerCheckLeaveData(params).then(res => {
        if (res.data.code == 200) {
          console.log('小区通过成功', res)
          wx.showToast({
            icon: 'none',
            title: '通过成功',
            duration: 1500,
            success: function () {
              let timer = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
                clearTimeout(timer)
              }, 1000)
            }
          })
        }
      })
    }
    // 大区  店长和小区必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 1 && bigareacheckstate == 0) {
      let params = {
        leaveDataId: leaveDataId,
        state: state
      }
      console.log('大区通过参数', params)
      bigAreaManagerCheck(params).then(res => {
        if (res.data.code == 200) {
          console.log('大区通过成功', res)
          wx.showToast({
            icon: 'none',
            title: '通过成功',
            duration: 1500,
            success: function () {
              let timer = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
                clearTimeout(timer)
              }, 1000)
            }
          })
        }
      })
    }
  },
  // 确认修改状态员工
  tapDialogButton(e) {
    console.log('e', e)
    if (e.detail.index == 1) {
      //  index:0,  // 判断请求那个接口 1 门店 2 小区 3 大区
      let index = this.data.index
      // 获取参数 state  通过1 驳回2  leaveDataId: '', // 请假记录id
      let state = this.data.state
      let leaveDataId = this.data.leaveDataId
      let params = {
        state: state,
        leaveDataId: leaveDataId
      }
      // 门店
      if (index == 1) {
        roomManagerCheckLeaveData(params).then(res => {
          console.log('门店审核结果', res)
          if (res.data.code == 200) {
            // 获取统计信息
            this.getSelfLeavePenaltyStatistics()
            // 请假信息分页
            this.getlist()
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.message
            })
          }
        })
      }
      // 小区
      if (index == 2) {
        smallAreaManagerCheckLeaveData(params).then(res => {
          console.log('小区审核结果', res)
          if (res.data.code == 200) {
            // 获取统计信息
            this.getSelfLeavePenaltyStatistics()
            // 请假信息分页
            this.getlist()
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.message
            })
          }
        })
      }
      // 大区
      if (index == 3) {
        bigAreaManagerCheck(params).then(res => {
          console.log('大区审核结果', res)
          if (res.data.code == 200) {
            // 获取统计信息
            this.getSelfLeavePenaltyStatistics()
            // 请假信息分页
            this.getlist()
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.message
            })
          }
        })
      }
    } else {

    }
    // 关闭弹窗
    this.setData({
      dialogShow: false
    })
  }
})