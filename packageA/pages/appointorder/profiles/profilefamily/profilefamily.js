import {
  setFamilyMember, // 上传
  getFamilyMemberLabelRcds, // 获取历史记录
  getFamilyMemberLabel // 获取家庭成员
} from '../../../../../route/index/appointorder/profile'
Page({
  data: {
    firmLabels: [],
    uid: '',
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    isend: false, // 是否最后一页
    list: [] // 历史记录
  },
  onLoad: function (options) {
    let that = this
    // 获取家庭标签
    getFamilyMemberLabel().then(res => {
      if (res.data.code == 200) {
        console.log("家庭成员", res)
        that.setData({
          firmLabels: res.data.data.firmLabels
        })
      } else {
       wx.showToast({
          icon: 'none',
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
      }
    })
    console.log('会员uid', options.uid)
    this.setData({
      uid: options.uid
    })
    // 请求数据 渲染
    this.loadMore()
  },
  // 上拉加载
  loadMore() {
    console.log('上拉')
    let that = this
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend
    let uid = this.data.uid
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      uid: uid,
      currPage: currPage,
      pageSize: pageSize
    }
    if (!isend) {
      console.log("加载更多")
      getFamilyMemberLabelRcds(params).then(res => {
        console.log("默认请求", res)
        if (res.data.code == 200) {
          console.log("分页列表数据", res.data.data.roomStaffUserArchivesRcds)
          console.log("总页数", res.data.data.totalPages)
          if (res.data.data.roomStaffUserArchivesRcds.length < pageSize) {
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
          let list = that.data.list.concat(res.data.data.roomStaffUserArchivesRcds)
          that.setData({
            list: list,
            currPage: currPage
          })
        } else {
          wx.showToast({
          icon: 'none',
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
          
        }
      })
    } else {
      console.log("不请求")
      return
    }
  },
  tapmore: function (e) {
    console.log(e.currentTarget.dataset.selected)
    console.log(e.currentTarget.dataset.index)
    let selected = e.currentTarget.dataset.selected
    let index = e.currentTarget.dataset.index
    let firmLabels = this.data.firmLabels
    console.log(firmLabels)
    firmLabels[index].selected = !firmLabels[index].selected
    this.setData({
      firmLabels: firmLabels
    })
  },
  // 遍历找到合适数据结构 提交
  save: function () {
    let firmLabels = this.data.firmLabels
    let uid = this.data.uid
    let arr = []
    let params = {
      uid: uid,
      familyMemberIds: []
    }
    for (let i = 0; i < firmLabels.length; i++) {
      // 如果被选中
      if (firmLabels[i].selected) {
        arr.push(firmLabels[i].id)
      }
    }
    params.familyMemberIds = arr
    console.log("家庭成员", params)
    if (params.familyMemberIds.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择家庭成员',
      })
      return
    }
    // 上传
    setFamilyMember(params).then(res => {
      if (res.data.code == 200) {
        wx.showToast({
          title: '修改成功',
          duration: 1000,
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
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
      }
    })
  }
})