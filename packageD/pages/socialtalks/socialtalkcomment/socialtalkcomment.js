const app = getApp()
var mydata = {
  end: 0,
  replyUserName: ""
}
import {
  getHeartVoicePost, // 获取帖子详情
  getHeartVoicePostsComment, // 获取评论分页
  addHeartVoicePostsComment, // 进行评价
  addPostsCommentReply // 进行回复
} from '../../../../route/mine/socialtalks/socialtalks'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    staffHeartVoicePostsDto: {}, // 帖子相关信息
    data: {
      contents: [{
          id: 6,
          cmtCtn: "铸铁转椅的漆皮已剥落，磨剃头刀的牛皮也已斑驳，收钱用的小木盒风光不再，静静地躺在桌上，一切都让人回想起旧日的时光。当国营理发店走入历史的灯火阑珊处，成为久远的时代记忆时，位于城东路的的这家理发店犹如一位老人，沉淀了半个世纪的沧桑，依然保持当年国营理发店的本色",
          uid: 1, // 用户
          rsbId: -1, // 员工
          worksId: 1,
          cmtDate: "2020-04-24 20:27:11",
          user: {
            id: 1,
            nick: "奥利奥",
            avatar: "https://wx.qlogo.cn/mmopen/vi_32/vwv0qiaibQzcTjoWCO8Tbef2NIUv2uCJUEOJb6wbCP7pXHCq2iaDiaQ0aN7DQNVSU7L0Cc0iamHCstUibEjBwBLBhcvw/132",
            sex: 0
          },
          roomStaffWorksCmtSubs: []
        },
        {
          id: 2,
          cmtCtn: "铸铁转椅的漆皮已剥落，磨剃头刀的牛皮也已斑驳，收钱用的小木盒风光不再，静静地躺在桌上，一切都让人回想起旧日的时光。当国营理发店走入历史的灯火阑珊处，成为久远的时代记忆时，位于城东路的的这家理发店犹如一位老人，沉淀了半个世纪的沧桑，依然保持当年国营理发店的本色",
          uid: -1,
          rsbId: 9,
          worksId: 1,
          cmtDate: "2020-04-15 16:43:35",
          roomStaffBase: {
            id: 9,
            teamName: "武庚团队",
            userName: "武庚",
            stageName: "小庚纸",
            phone: "17788888880",
            staffHeadImg: "http://b-ssl.duitang.com/uploads/item/201608/05/20160805234507_vJVKn.jpeg",
            specifiedRate: 100,
            monthOrders: 0,
            starLevel: 5
          },
          roomStaffWorksCmtSubs: [{
              id: 2,
              cmtCtn: "感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的",
              uid: -1,
              rsbId: 9,
              cmtParentId: 2,
              cmtDate: "2020-04-15 16:44:26",
              roomStaffBase: {
                id: 9,
                teamName: "武庚团队",
                userName: "武庚",
                stageName: "小庚纸",
                staffHeadImg: "http://b-ssl.duitang.com/uploads/item/201608/05/20160805234507_vJVKn.jpeg",
                specifiedRate: 100,
                monthOrders: 0,
                starLevel: 5
              }
            },
            {
              id: 2,
              cmtCtn: "感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的",
              uid: 1,
              rsbId: 9,
              cmtParentId: 2,
              cmtDate: "2020-04-15 16:44:26",
              user: {
                id: 1,
                nick: "奥利奥",
                avatar: "https://wx.qlogo.cn/mmopen/vi_32/vwv0qiaibQzcTjoWCO8Tbef2NIUv2uCJUEOJb6wbCP7pXHCq2iaDiaQ0aN7DQNVSU7L0Cc0iamHCstUibEjBwBLBhcvw/132",
                sex: 0
              },
            }

          ]
        }, {
          id: 6,
          cmtCtn: "铸铁转椅的漆皮已剥落，磨剃头刀的牛皮也已斑驳，收钱用的小木盒风光不再，静静地躺在桌上，一切都让人回想起旧日的时光。当国营理发店走入历史的灯火阑珊处，成为久远的时代记忆时，位于城东路的的这家理发店犹如一位老人，沉淀了半个世纪的沧桑，依然保持当年国营理发店的本色",
          uid: 1, // 用户
          rsbId: -1, // 员工
          worksId: 1,
          cmtDate: "2020-04-24 20:27:11",
          user: {
            id: 1,
            nick: "奥利奥",
            avatar: "https://wx.qlogo.cn/mmopen/vi_32/vwv0qiaibQzcTjoWCO8Tbef2NIUv2uCJUEOJb6wbCP7pXHCq2iaDiaQ0aN7DQNVSU7L0Cc0iamHCstUibEjBwBLBhcvw/132",
            sex: 0
          },
          roomStaffWorksCmtSubs: []
        },
        {
          id: 2,
          cmtCtn: "铸铁转椅的漆皮已剥落，磨剃头刀的牛皮也已斑驳，收钱用的小木盒风光不再，静静地躺在桌上，一切都让人回想起旧日的时光。当国营理发店走入历史的灯火阑珊处，成为久远的时代记忆时，位于城东路的的这家理发店犹如一位老人，沉淀了半个世纪的沧桑，依然保持当年国营理发店的本色",
          uid: -1,
          rsbId: 9,
          worksId: 1,
          cmtDate: "2020-04-15 16:43:35",
          roomStaffBase: {
            id: 9,
            teamName: "武庚团队",
            userName: "武庚",
            stageName: "小庚纸",
            phone: "17788888880",
            staffHeadImg: "http://b-ssl.duitang.com/uploads/item/201608/05/20160805234507_vJVKn.jpeg",
            specifiedRate: 100,
            monthOrders: 0,
            starLevel: 5
          },
          roomStaffWorksCmtSubs: [{
              id: 2,
              cmtCtn: "感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的",
              uid: -1,
              rsbId: 9,
              cmtParentId: 2,
              cmtDate: "2020-04-15 16:44:26",
              roomStaffBase: {
                id: 9,
                teamName: "武庚团队",
                userName: "武庚",
                stageName: "小庚纸",
                staffHeadImg: "http://b-ssl.duitang.com/uploads/item/201608/05/20160805234507_vJVKn.jpeg",
                specifiedRate: 100,
                monthOrders: 0,
                starLevel: 5
              }
            },
            {
              id: 2,
              cmtCtn: "感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的",
              uid: 1,
              rsbId: 9,
              cmtParentId: 2,
              cmtDate: "2020-04-15 16:44:26",
              user: {
                id: 1,
                nick: "奥利奥",
                avatar: "https://wx.qlogo.cn/mmopen/vi_32/vwv0qiaibQzcTjoWCO8Tbef2NIUv2uCJUEOJb6wbCP7pXHCq2iaDiaQ0aN7DQNVSU7L0Cc0iamHCstUibEjBwBLBhcvw/132",
                sex: 0
              },
            }

          ]
        }, {
          id: 6,
          cmtCtn: "铸铁转椅的漆皮已剥落，磨剃头刀的牛皮也已斑驳，收钱用的小木盒风光不再，静静地躺在桌上，一切都让人回想起旧日的时光。当国营理发店走入历史的灯火阑珊处，成为久远的时代记忆时，位于城东路的的这家理发店犹如一位老人，沉淀了半个世纪的沧桑，依然保持当年国营理发店的本色",
          uid: 1, // 用户
          rsbId: -1, // 员工
          worksId: 1,
          cmtDate: "2020-04-24 20:27:11",
          user: {
            id: 1,
            nick: "奥利奥",
            avatar: "https://wx.qlogo.cn/mmopen/vi_32/vwv0qiaibQzcTjoWCO8Tbef2NIUv2uCJUEOJb6wbCP7pXHCq2iaDiaQ0aN7DQNVSU7L0Cc0iamHCstUibEjBwBLBhcvw/132",
            sex: 0
          },
          roomStaffWorksCmtSubs: []
        },
        {
          id: 2,
          cmtCtn: "铸铁转椅的漆皮已剥落，磨剃头刀的牛皮也已斑驳，收钱用的小木盒风光不再，静静地躺在桌上，一切都让人回想起旧日的时光。当国营理发店走入历史的灯火阑珊处，成为久远的时代记忆时，位于城东路的的这家理发店犹如一位老人，沉淀了半个世纪的沧桑，依然保持当年国营理发店的本色",
          uid: -1,
          rsbId: 9,
          worksId: 1,
          cmtDate: "2020-04-15 16:43:35",
          roomStaffBase: {
            id: 9,
            teamName: "武庚团队",
            userName: "武庚",
            stageName: "小庚纸",
            phone: "17788888880",
            staffHeadImg: "http://b-ssl.duitang.com/uploads/item/201608/05/20160805234507_vJVKn.jpeg",
            specifiedRate: 100,
            monthOrders: 0,
            starLevel: 5
          },
          roomStaffWorksCmtSubs: [{
              id: 2,
              cmtCtn: "感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的",
              uid: -1,
              rsbId: 9,
              cmtParentId: 2,
              cmtDate: "2020-04-15 16:44:26",
              roomStaffBase: {
                id: 9,
                teamName: "武庚团队",
                userName: "武庚",
                stageName: "小庚纸",
                staffHeadImg: "http://b-ssl.duitang.com/uploads/item/201608/05/20160805234507_vJVKn.jpeg",
                specifiedRate: 100,
                monthOrders: 0,
                starLevel: 5
              }
            },
            {
              id: 2,
              cmtCtn: "感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的感谢你的评价 我会继续努力的",
              uid: 1,
              rsbId: 9,
              cmtParentId: 2,
              cmtDate: "2020-04-15 16:44:26",
              user: {
                id: 1,
                nick: "奥利奥",
                avatar: "https://wx.qlogo.cn/mmopen/vi_32/vwv0qiaibQzcTjoWCO8Tbef2NIUv2uCJUEOJb6wbCP7pXHCq2iaDiaQ0aN7DQNVSU7L0Cc0iamHCstUibEjBwBLBhcvw/132",
                sex: 0
              },
            }

          ]
        }
      ], // 
      currPage: 0, // 当前页
      pageSize: 0, // 分页大小
      pageTotalSize: 15, // 品论总量
      totalPages: 99 // 总页数
    },
    isComment: false, // 打开评论
    isreply: false, // 打开回复
    replyname: '', // 被回复者的名字
    replyId: '', // 被回复人的id   
    comment: '', // 评论回复内容
    isanony: false, // 是否匿名
    id: '',
    anonymous: 1, // 默认不匿名
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    list: [], //评论数据
    isend: false, // 是否最后一页
  },
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id: id
    })
    // 帖子详情
    this.getHeartVoicePost()
  },
  // 回复 
  toreply: function (e) {
    // 获取被回复人的名字和id
    console.log("被回复人信息名字和id", e.currentTarget.dataset.id, e.currentTarget.dataset.name)
    this.setData({
      isreply: true,
      replyname: e.currentTarget.dataset.name,
      replyId: e.currentTarget.dataset.id
    })
  },
  // 取消回复 就变成了评论 是否去掉匿名发送？？？
  cancleReply: function (e) {
    mydata.commentId = "";
    mydata.replyUserName = "";
    // 清空被回复者名字和id
    this.setData({
      replyname: '',
      replyId: '',
      isreply: false,
      isanony: false,
      anonymous: 1,
      comment: ''
    })
  },
  // 提交 回复||评价
  submitForm(e) {
    let that = this;
    let isreply = this.data.isreply // 通过isreply判断评论还是回复
    var form = e.detail.value; // 获取评论内容
    let ctn = form.comment // 获取评论或者回复内容
    let shvpId = this.data.id // 获取id
    let shvpcId = this.data.replyId // 被回复人id
    let anonymous = this.data.anonymous // 0 匿名 1 不匿名
    // 评论必须有内容
    if (form.comment == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入内容',
        duration: 2000
      })
      return;
    }
    // 回复
    if (isreply) {
      // 获取参数
      let params = {
        ctn: ctn,
        shvpcId: shvpcId,
        anonymous: anonymous
      }
      addPostsCommentReply(params).then(res => {
        if (res.data.code == 200) {
          console.log('回复成功', res)
          wx.showToast({
            icon: 'none',
            title: '回复成功',
          })
          that.setData({
            comment: ""
          })
          // 重新渲染评论
          that.getlist()
          that.cancleReply()
        } else {
          wx.showToast({
            title: res.data.message + ':' + res.data.code,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    // 评论
    else if (!isreply) {
      // 获取参数
      let params = {
        ctn: ctn,
        shvpId: shvpId,
        anonymous: anonymous
      }
      addHeartVoicePostsComment(params).then(res => {
        if (res.data.code == 200) {
          console.log('评论成功', res)
          wx.showToast({
            icon: 'none',
            title: '评论成功',
          })
          that.setData({
            comment: ""
          })
          // 重新渲染评论
          that.getlist()
        } else {
          wx.showToast({
            title: res.data.message + ':' + res.data.code,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  // 返回上一页面 刷新帖子分页
  onUnload: function () {
    var pages = getCurrentPages(); // 当前页面
    console.log('当前页面', pages)
    var beforePage = pages[pages.length - 2];
    beforePage.clearIndex(); // 执行前一个页面的onLoad方法
  },
  // 预览图片
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.staffHeartVoicePostsDto.staffHeartVoicePostsImgs
    const images2 = [];
    for (let i = 0; i < images.length; i++) {
      images2.push(images[i].img);
    }
    console.log('idx', 'images', idx, images)
    wx.previewImage({
      current: images2[idx], //当前预览的图片
      urls: images2, //所有要预览的图片
    })
  },
  onReady: function () {
    this.getlist()
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
    // 获取当前页 类型 信息数量 是否请求 shvpId
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    let shvpId = this.data.id
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      shvpId: shvpId,
      currPage: currPage,
      pageSize: pageSize
    }
    if (!isend) {
      console.log("加载更多")
      getHeartVoicePostsComment(params).then(res => {
        console.log("默认请求", res)
        if (res.data.code == 200) {
          console.log("带匿名的分页数据", res.data.data.contents)
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
  // 获取帖子详情
  getHeartVoicePost: function () {
    let that = this
    let params = {
      postId: this.data.id
    }
    getHeartVoicePost(params).then(res => {
      if (res.data.code == 200) {
        console.log('该帖子的详情信息', res)
        that.setData({
          staffHeartVoicePostsDto: res.data.data.staffHeartVoicePostsDto
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 是否匿名
  selectednonename: function () {
    let isanony = this.data.isanony
    this.setData({
      isanony: !isanony
    })
    // 点击匿名 anonymous 0 匿名
    if (this.data.isanony) {
      this.setData({
        anonymous: 0
      })
    }
    // 再次点击 anonymous 1 不匿名
    else {
      this.setData({
        anonymous: 1
      })
    }
    console.log('匿名', this.data.isanony, this.data.anonymous)
  }
})