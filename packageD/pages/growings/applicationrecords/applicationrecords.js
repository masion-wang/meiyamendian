import data from '../../../../route/api/baseUrl'
import {
  getSelfMySysUserInfo // 获取admintype身份
} from '../../../../route/mine/myteam/myteam'
import {
  selfPermissions // 判断权限有无
} from '../../../../route/admin/admin'
import {
  roomCheckDutyUpgradeAssessment, // 店长
  smallAreaCheckDutyUpgradeAssessment, // 小区
  bigAreaCheckDutyUpgradeAssessment, // 大区
  dutyUpgradeAssessments, // 审核人分页
  selfDutyUpgradeRecords // 晋升记录分页(员工自己看的)
} from '../../../../route/mine/applicationrecords/applicationrecords'

Page({
  data: {
    webServerUrl: data.webServerUrl,
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    list: [], //列表数据
    admintype: 0, // 获取权限身份 3大区 4小区 5股东 6 员工
    isend: false, // 是否最后一页
    isworker: true, // 是否有权限驳回通过
    shopkeeperinput: '', // 店长意见
    smallareainput: '', // 小区意见
    bigareainput: '' // 大区意见
  },
  onLoad: function (options) {
    let that = this
    // 获取admintype
    getSelfMySysUserInfo().then(res => {
      if (res.data.code == 200) {
        console.log()
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
          if (arr[i].pval == 'my:home:growUp:clickStatus') {
            that.setData({
              isworker: false
            })
            break
          }
        }
        // 判断是不是员工
        let isworker = that.data.isworker
        // 如果是员工 调用员工的接口
        if (isworker) {
          that.getlist()
        }
        // 如果是审核人 调用审核人接口
        else {
          that.getlist2()
        }


      }
    })
  },
  onShow: function () {
    // this.getlist()
  },
  // 下拉刷新-员工
  getlist: function () {
    console.log('下拉')
    this.setData({
      isend: false,
      currPage: 1,
      list: [],
    })
    this.loadMore()
  },
  // 上拉加载-员工
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
      selfDutyUpgradeRecords(params).then(res => {
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
  // 下拉刷新-股东
  getlist2: function () {
    console.log('审核人下拉')
    this.setData({
      isend: false,
      currPage: 1,
      list: [],
    })
    this.loadMore2()
  },
  // 上拉加载-股东
  loadMore2() {
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
      dutyUpgradeAssessments(params).then(res => {
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
  // 预览图片
  imgYu: function (e) {
    var src = e.currentTarget.dataset.src //获取data-src
    var imgList = e.currentTarget.dataset.list //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  // 获取店长意见
  getshopkeeperinput: function (e) {
    console.log('店长意见', e.detail.value)
    this.setData({
      shopkeeperinput: e.detail.value
    })
  },
  // 获取小区意见
  getsmallareainput: function (e) {
    console.log('小区意见', e.detail.value)
    this.setData({
      smallareainput: e.detail.value
    })
  },
  // 获取大区意见
  getbigareainput: function (e) {
    console.log('大区意见', e.detail.value)
    this.setData({
      bigareainput: e.detail.value
    })
  },
  // 驳回
  finebutton: function (e) {
    let roomcheckstate = e.currentTarget.dataset.roomcheckstate
    let smallareacheckstate = e.currentTarget.dataset.smallareacheckstate
    let bigareacheckstate = e.currentTarget.dataset.bigareacheckstate
    let id = e.currentTarget.dataset.id
    let state = e.currentTarget.dataset.state
    let shopkeeperinput = this.data.shopkeeperinput
    let smallareainput = this.data.smallareainput
    let bigareainput = this.data.bigareainput
    if (shopkeeperinput == '') {
      shopkeeperinput == -1
    }
    if (smallareainput == '') {
      smallareainput == -1
    }
    if (bigareainput == '') {
      bigareainput == -1
    }
    // 店长未审核
    if (roomcheckstate == 0) {
      let params = {
        id: id,
        checkStatus: state,
        shopManagerAdvise: shopkeeperinput
      }
      console.log('店长驳回参数', params)
      roomCheckDutyUpgradeAssessment(params).then(res => {
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
        id: id,
        checkStatus: state,
        advise: smallareainput
      }
      console.log('小区驳回参数', params)
      smallAreaCheckDutyUpgradeAssessment(params).then(res => {
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
        id: id,
        checkStatus: state,
        advise: bigareainput
      }
      console.log('大区驳回参数', params)
      bigAreaCheckDutyUpgradeAssessment(params).then(res => {
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
    let id = e.currentTarget.dataset.id
    let state = e.currentTarget.dataset.state
    let shopkeeperinput = this.data.shopkeeperinput
    let smallareainput = this.data.smallareainput
    let bigareainput = this.data.bigareainput
    if (shopkeeperinput == '') {
      shopkeeperinput == -1
    }
    if (smallareainput == '') {
      smallareainput == -1
    }
    if (bigareainput == '') {
      bigareainput == -1
    }
    // 店长未审核
    if (roomcheckstate == 0) {
      let params = {
        id: id,
        checkStatus: state,
        shopManagerAdvise: shopkeeperinput
      }
      console.log('店长通过参数', params)
      roomCheckDutyUpgradeAssessment(params).then(res => {
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
        id: id,
        checkStatus: state,
        advise: smallareainput
      }
      console.log('小区通过参数', params)
      smallAreaCheckDutyUpgradeAssessment(params).then(res => {
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
        id: id,
        checkStatus: state,
        advise: bigareainput
      }
      console.log('大区通过参数', params)
      bigAreaCheckDutyUpgradeAssessment(params).then(res => {
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