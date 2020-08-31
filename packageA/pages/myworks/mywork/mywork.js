import {
  getSelfWorksStatistic, // 获取统计信息
  getCustomerShareRank, //获取自己的所有作品信息
  worksForward, // 作品转发
  worksLike, // 作品点赞
  deleteStaffWorks, // 删除作品
  worksImgTop // 上传图片
} from '../../../../route/index/mywork/mywork'
import data from '../../../../route/api/baseUrl'
import {
  getSelfMySysUserInfo // 获取自己真正有判断值的信息
} from '../../../../route/mine/myteam/myteam'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    totalComment: 0, // 总评论
    totalForward: 0, // 总分享
    totalLike: 0, // 总点赞
    totalRelease: 0, // 总发布
    currPage: 1, // 当前页面
    pageSize: 3, // 每页请求数据
    totalPages: 0, // 总页面
    list: [], //列表数据
    isend: false, // 是否最后一页
    worksId: '', // 作品id
    // 删除朋友圈
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    iscover: false,
    iscover2: false, // 打开大图专用遮罩层
    src: '', // 要置顶的图片
    admintype: 0 // 权限
  },
  onLoad: function (options) {
    this.getSelfMySysUserInfo()
  },
  onShow: function () {
    this.getlist()
    this.Statistic()
  },
  // 获取权限
  getSelfMySysUserInfo: function () {
    let that = this
    getSelfMySysUserInfo().then(res => {
      if (res.data.code == 200) {
        that.setData({
          admintype: res.data.data.sysUser.adminType
        })
      }
    })
  },
  // 点击图片放大
  getbig: function (e) {
    console.log('图片url', e)
    let url = e.currentTarget.dataset.url
    this.setData({
      iscover2: true,
      src: url
    })
  },
  // 关闭
  closethat: function () {
    this.setData({
      iscover2: false,
      src: ''
    })
  },
  // 置顶图片
  upthat: function () {
    let that = this
    let params = {
      img: this.data.src
    }
    worksImgTop(params).then(res => {
      if (res.data.code == 200) {
        console.log('置顶成功', res)
        wx.showToast({
          icon: 'none',
          title: '置顶成功!',
          duration: 2000,
          success: function () {
            setTimeout(() => {
              that.setData({
                iscover2: false,
                src: ''
              })
              // 请求作品
              that.getlist()
            }, 2000)
          }
        })
      }
    })
  },
  // 1.获取统计信息
  Statistic: function () {
    let that = this
    getSelfWorksStatistic().then(res => {
      console.log('res', res)
      if (res.data.code == 200) {
        that.setData({
          totalRelease: res.data.data.totalRelease,
          totalComment: res.data.data.totalComment, // 总评论
          totalForward: res.data.data.totalForward, // 总分享
          totalLike: res.data.data.totalLike,
        })
      } else if (res.data.code == 10004) {
        that.setData({
          iscover: true
        })
        wx.showToast({
          icon: 'none',
          title: '没有此权限',
          duration: 2500,
          success: function () {
            let timer = setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
              clearTimeout(timer)
            }, 2000)
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
      getCustomerShareRank(params).then(res => {
        console.log("我的作品的朋友圈", res)
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
          that.setData({
            iscover: true
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
  // 打开删除弹窗
  delete: function (e) {
    console.log('作品id', e.currentTarget.dataset.id)
    this.setData({
      dialogShow: true,
      worksId: e.currentTarget.dataset.id
    })
  },
  // 点击确定(删除) || 取消 
  tapDialogButton: function (e) {
    let that = this
    console.log('获取对象', e.detail.index)
    let index = e.detail.index
    // 取消 啥都不干
    if (index == 0) {}
    // 确定 删除
    if (index == 1) {
      let worksId = this.data.worksId
      let params = {
        worksId: worksId
      }
      deleteStaffWorks(params).then(res => {
        console.log('删除成功', res)
        if (res.data.code == 200) {
          wx.showToast({
            icon: 'none',
            title: '删除成功',
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
            title: res.data.message,
          })
        }
      })
    }
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  // 点赞
  like: function (e) {
    console.log('e', e.currentTarget.dataset.id)
    let worksId = e.currentTarget.dataset.id
    let params = {
      worksId: worksId
    }
    // 触发点赞接口
    worksLike(params).then(res => {
      console.log('点赞成功', res)
      if (res.data.code == 200) {
        wx.showToast({
          icon: 'none',
          title: '点赞成功',
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
  // 去上传新作品
  uploadmywork: function () {
    wx.navigateTo({
      url: '/packageA/pages/myworks/uploadmywork/uploadmywork',
    })
  },
  // 去评论详情
  tocomment: function (e) {
    console.log('作品id111111111', e.currentTarget.dataset.id)
    let workId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/packageA/pages/myworks/comment/comment?workId=${workId}`,
    })
  },
  handleImagePreview:function(){
    
  },
  // 转发
  // onShareAppMessage: function (options) {
  //   let worksId = options.target.dataset.id;
  //   console.log('分享作品worksId', worksId);
  //   let params = {
  //     worksId: worksId
  //   }
  //   // 调用转发接口
  //   worksForward(params).then(res => {
  //     console.log('分享成功', res)
  //     if (res.data.code == '200') {

  //     } else {
  //       wx.showToast({
  //         icon: 'none',
  //         title: res.data.message + ":" + res.data.code,
  //         duration: 2000
  //       })
  //     }
  //   })
  //   // 来自页面内的按钮的转发
  //   if (options.from == 'button') {
  //     // 设置路径
  //     let shareObj = {
  //       title: "以匠人之心 ，琢时光之影，不负光阴、不负卿！", // 默认是小程序的名称(可以写slogan等)
  //       path: '/pages/stylistWorks/stylistWorks?rsbId=' + options.target.dataset.rsbid,
  //       imageUrl: '',
  //       success: function (res) {
  //         // 转发成功之后的回调
  //         if (res.errMsg == 'shareAppMessage:ok') {}
  //       }
  //     }
  //   }
  //   // 返回shareObj
  //   return shareObj;
  // },

})