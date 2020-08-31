import {
  getSelfMySysUserInfo, // 获取自己身份参数
  selfFirmAwardRecord, // 奖励记录分页
  roomManagerCheckAwardRecord, // 门店驳回通过
  smallAreaManagerCheckAwardRecord, // 小区驳回通过
  bigAreaManagerCheckAwardRecord // 大区驳回通过
} from '../../../../route/mine/myteam/myteam'
import {
  selfPermissions // 判断权限有无
} from '../../../../route/admin/admin'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    admintype: 0, // 6店长 3大区 4小区
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    totalPages: 0, // 总页面
    list: [], //列表数据
    isend: false, // 是否最后一页
    isworker: true // 是否为员工
  },
  onLoad: function (options) {},
  onShow: function () {
    let that = this
    this.getlist()
    // 自己的等级
    getSelfMySysUserInfo().then(res => {
      if (res.data.code == 200) {
        console.log('自己权限', res)
        that.setData({
          admintype: res.data.data.sysUser.adminType
        })
      }
    })
    // 自己有无按钮权限
    selfPermissions().then(res => {
      let that = this
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:myTeam:punishment') {
            that.setData({
              isworker: false
            })
            break
          }
        }

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
      selfFirmAwardRecord(params).then(res => {
        that.setData({
          back: false
        })
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
        } else if (res.data.code == 10004) {
          wx.showToast({
            icon: 'none',
            title: '没有此权限',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
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
  // 驳回
  finebutton: function (e) {
    let roomcheckstate = e.currentTarget.dataset.roomcheckstate
    let smallareacheckstate = e.currentTarget.dataset.smallareacheckstate
    let bigareacheckstate = e.currentTarget.dataset.bigareacheckstate
    let recordId = e.currentTarget.dataset.id
    let state = e.currentTarget.dataset.state
    // 店长未审核
    if (roomcheckstate == 0) {
      let params = {
        recordId: recordId,
        state: state
      }
      console.log('店长驳回参数', params)
      roomManagerCheckAwardRecord(params).then(res => {
        if (res.data.code == 200) {
          console.log('店长驳回成功', res)
          wx.showToast({
            icon: 'none',
            title: '驳回成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
    // 小区  店长必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 0) {
      let params = {
        recordId: recordId,
        state: state
      }
      console.log('小区驳回参数', params)
      smallAreaManagerCheckAwardRecord(params).then(res => {
        if (res.data.code == 200) {
          console.log('小区驳回成功', res)
          wx.showToast({
            icon: 'none',
            title: '驳回成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
    // 大区  店长和小区必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 1 && bigareacheckstate == 0) {
      let params = {
        recordId: recordId,
        state: state
      }
      console.log('大区驳回参数', params)
      bigAreaManagerCheckAwardRecord(params).then(res => {
        if (res.data.code == 200) {
          console.log('大区驳回成功', res)
          wx.showToast({
            icon: 'none',
            title: '驳回成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
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
    let recordId = e.currentTarget.dataset.id
    let state = e.currentTarget.dataset.state
    // 店长未审核
    if (roomcheckstate == 0) {
      let params = {
        recordId: recordId,
        state: state
      }
      console.log('店长通过参数', params)
      roomManagerCheckAwardRecord(params).then(res => {
        if (res.data.code == 200) {
          console.log('店长通过成功', res)
          wx.showToast({
            icon: 'none',
            title: '通过成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
    // 小区  店长必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 0) {
      let params = {
        recordId: recordId,
        state: state
      }
      console.log('小区通过参数', params)
      smallAreaManagerCheckAwardRecord(params).then(res => {
        if (res.data.code == 200) {
          console.log('小区通过成功', res)
          wx.showToast({
            icon: 'none',
            title: '通过成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
    // 大区  店长和小区必须通过
    if (roomcheckstate == 1 && smallareacheckstate == 1 && bigareacheckstate == 0) {
      let params = {
        recordId: recordId,
        state: state
      }
      console.log('大区通过参数', params)
      bigAreaManagerCheckAwardRecord(params).then(res => {
        if (res.data.code == 200) {
          console.log('大区通过成功', res)
          wx.showToast({
            icon: 'none',
            title: '通过成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }
      })
    }
  }


})