import {
  getStaffWorksDetail, // 员工作品详情
  getRoomStaffWorksCmt, // 获取评价信息分页
  roomStaffWorksCmt, //  评论
  addRoomStaffWorksCmtSub // 回复
} from '../../../../route/index/mywork/mywork'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    isreply: false, // 是否回复
    replyname: '', // 被回复者名字
    replyId: '', // 被回复者id   
    comment: '', // 内容
    workId: '', // 作品详情id
    workdetail: {}, // 作品详情
    worksId: '', // 作品id
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    list: [], //评论数据
    isend: false, // 是否最后一页
    iscover: false, // 是否遮罩层
  },
  onLoad: function (options) {
    let workId = options.workId
    console.log('worksId', workId)
    this.setData({
      worksId: workId
    })
    this.getStaffWorksDetail()
  },
  onReady: function () {
    this.getlist()
  },
  // 1.获取作品详情
  getStaffWorksDetail: function () {
    let that = this
    let worksId = this.data.worksId
    let params = {
      worksId: worksId
    }
    getStaffWorksDetail(params).then(res => {
      console.log('作品详情', res)
      if (res.data.code == 200) {
        that.setData({
          workdetail: res.data.data.roomStaffWorksDto
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
  // 2.下拉刷新
  getlist: function () {
    console.log('下拉')
    this.setData({
      isend: false,
      currPage: 1,
      comment: '',
      list: [],
    })
    this.loadMore()
  },
  // 上拉加载
  loadMore() {
    console.log('上拉')
    let that = this
    // 获取当前页 类型 信息数量 是否请求 worksId
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    let worksId = this.data.worksId
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      worksId: worksId,
      currPage: currPage,
      pageSize: pageSize
    }
    if (!isend) {
      console.log("加载更多")
      getRoomStaffWorksCmt(params).then(res => {
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
  // 回复  获取被回复人名字和id
  reply: function (e) {
    // 获取被回复人的名字和id
    console.log("被回复人信息名字和id", e.currentTarget.dataset.id, e.currentTarget.dataset.name)
    this.setData({
      isreply: true,
      replyname: e.currentTarget.dataset.name,
      replyId: e.currentTarget.dataset.id
    })
  },
  // 取消回复 清空被回复人名字和id
  cancle: function (e) {
    // 清空被回复者名字和id
    this.setData({
      replyname: '',
      replyId: '',
      isreply: false
    })
  },
  // 提交 回复||评价
  submitForm(e) {
    let that = this;
    // 通过isreply判断 评论 or 回复
    let isreply = this.data.isreply
    // 获取内容
    var form = e.detail.value;
    // 内容为空 
    if (form.comment == "") {
      wx.showToast({
        icon: 'none',
        title: '输入内容不能为空',
      })
      return
    }

    // 遮罩层
    that.setData({
      iscover: true
    })
    console.log('内容为', form.comment, '是回复?', isreply)
    // 评价
    if (!isreply) {
      // 获取 worksId+ form.comment
      let worksId = this.data.worksId
      let ctn = form.comment
      let params = {
        worksId: worksId,
        ctn: ctn
      }
      // 评价接口
      roomStaffWorksCmt(params).then(res => {
        console.log('评价成功', res)
        if (res.data.code == 200) {
          wx.showToast({
            icon: 'none',
            title: '评价成功',
            duration: 1000,
            success: function () {
              setTimeout(() => {
                // 遮罩层
                that.setData({
                  iscover: false
                })
                // 初始化评价分页接口
                that.getlist()
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
    }
    // 回复   
    else if (isreply) {
      // 获取 cmtCtn	parentCmtId
      let parentCmtId = this.data.replyId
      let cmtCtn = form.comment
      let params = {
        parentCmtId: parentCmtId,
        cmtCtn: cmtCtn
      }
      // 回复接口
      addRoomStaffWorksCmtSub(params).then(res => {
        console.log('回复成功', res)
        if (res.data.code == 200) {
          wx.showToast({
            icon: 'none',
            title: '回复成功',
            duration: 1000,
            success: function () {
              setTimeout(() => {
                // 遮罩层
                that.setData({
                  iscover: false
                })
                // 初始化评价分页接口
                that.getlist()
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
    }
    // console.log(app.globalData.haulUserInfo);

  },
  // 预览图片
  handleImagePreview: function (e) {
    console.log("e", e);
    const url = e.currentTarget.dataset.url;
    let images = this.data.workdetail.roomStaffWorksImgs
    console.log('images', images)
    const images2 = [];
    for (let i = 0; i < images.length; i++) {
      images2.push(images[i].img);
    }
    wx.previewImage({
      current: url, //当前预览的图片
      urls: images2, //所有要预览的图片
    });
  }
})