let ages = []
for (let i = 1; i <= 100; i++) {
  ages.push(i)
}
console.log('ages', ages)
import {
  setAge, // 获取消费档案标签
  getAgeRcds, // 获取消费档案历史记录
} from '../../../../../route/index/appointorder/profile'
Page({
  data: {
    firmLabels: [], // 薪资标准
    activeIndex: -1,
    age: 30,
    ages:ages,
    value1: [29],
    uid: '',
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    isend: false, // 是否最后一页
    list: [] // 历史记录
  },
  onLoad: function (options) {
    let that = this
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
      getAgeRcds(params).then(res => {
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
  // 提交
  save: function () {
    // 获取 uid 和 consumeGradeLabelId 
    let age = this.data.age
    let uid = this.data.uid
    if (age == '') {
      wx.showToast({
        icon: 'none',
        title: '请选择年龄'
      })
      return
    }
    let params = {
      age: age,
      uid: uid
    }
    console.log('params', params)
    setAge(params).then(res => {
      console.log("提交成功", res)
      if (res.data.code == 200) {
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
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
      }
    })
  },
  // 选择年龄
  bindChange1: function (e) {
    console.log('年龄', e.detail.value)
    const val = e.detail.value
    console.log('val', val)
    console.log('年龄', this.data.ages[val[0]])
    this.setData({
      age: this.data.ages[val[0]]
    })
  },
})