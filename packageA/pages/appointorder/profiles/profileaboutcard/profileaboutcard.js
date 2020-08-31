import {
  setCstmCardWish,
  getCstmCardWishRcds
} from '../../../../../route/index/appointorder/profile'
Page({
  data: {
    uid: '',
    cstmCardWish: '',
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    isend: false, // 是否最后一页
    list: [] // 历史记录
  },
  onLoad: function (options) {
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
      getCstmCardWishRcds(params).then(res => {
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
            currPage: currPage,
          })
          
        } else {
          wx.showToast({
            icon: 'none',
            title: '后台繁忙',
          })
        }
      })
    } else {
      console.log("不请求")
      return
    }
  },
  // 上传家庭地址
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      cstmCardWish: e.detail.value
    })
  },
  // 保存
  save: function () {
    let uid = this.data.uid
    let cstmCardWish = this.data.cstmCardWish
    let params = {
      uid: uid,
      cstmCardWish: cstmCardWish
    }
    setCstmCardWish(params).then(res => {
      if (res.data.code == 200) {
        console.log("上传成功", res)
        wx.showToast({
          title: '修改成功',
          duration: 1000,
          success: function () {
            let timer = setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
              clearTimeout(timer)
            }, 1000)
          }
        })
      } else if (res.data.code == '10002') {
        wx.showToast({
          icon: 'none',
          title: '文字请保持在60个以内',
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