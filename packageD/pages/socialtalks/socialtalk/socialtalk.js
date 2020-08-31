import {
  getHeartVoicePosts, // 获取心声社区接口
  heartVoicePostsLike, // 点赞接口
} from "../../../../route/mine/socialtalks/socialtalks";
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    currPage: 1, // 当前页面
    pageSize: 7, // 每页请求数据
    totalPages: 0, // 总页面
    list: [], //列表数据
    isend: false, // 是否最后一页
    x: 0,
    y: 0,
    scale: 2
  },
  onLoad: function (options) {
    this.getlist();
  },
  onShow: function () {
    // this.getlist()
  },
  // 下拉刷新
  getlist: function () {
    console.log("下拉");
    this.setData({
      isend: false,
      currPage: 1,
      list: [],
    });
    this.loadMore();
  },
  // 上拉加载
  loadMore() {
    console.log("上拉");
    let that = this;
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend;
    let currPage = this.data.currPage;
    let pageSize = this.data.pageSize;
    console.log("当前分页", currPage, "请求信息数", pageSize);
    let params = {
      currPage: currPage,
      pageSize: pageSize,
    };
    if (!isend) {
      console.log("加载更多");
      getHeartVoicePosts(params).then((res) => {
        console.log("默认请求", res);
        if (res.data.code == 200) {
          console.log("分页列表数据", res.data.data.contents);
          console.log("总页数", res.data.data.totalPages);
          if (res.data.data.contents.length < pageSize) {
            console.log("最后一页");
            that.setData({
              isend: true,
            });
          } else {
            that.setData({
              isend: false,
            });
          }
          let currPage = ++that.data.currPage;
          let list = that.data.list.concat(res.data.data.contents);
          that.setData({
            list: list,
            currPage: currPage,
          });
        }
        // else if (res.data.code == 10004) {
        //   wx.showToast({
        //     icon: "none",
        //     title: "没有此权限",
        //     duration: 2500,
        //     success: function () {
        //       setTimeout(() => {
        //         wx.navigateBack({
        //           delta: 1,
        //         });
        //       }, 2000);
        //     },
        //   });
        // }
        else {

          wx.showToast({
            icon: "none",
            title: res.data.message + ":" + res.data.code,
            duration: 2000,
          });
        }
      });
    } else {
      console.log("不请求");
      return;
    }
  },
  // 预览图片
  handleImagePreview(e) {
    console.log("e", e);
    const url = e.currentTarget.dataset.url;
    const indexfater = e.currentTarget.dataset.indexfater;
    const images = this.data.list[indexfater].staffHeartVoicePostsImgs;
    const images2 = [];
    for (let i = 0; i < images.length; i++) {
      images2.push(images[i].img);
    }
    console.log("预览数组", images2);
    wx.previewImage({
      current: url, //当前预览的图片
      urls: images2, //所有要预览的图片
    });
  },
  // 点赞
  like: function (e) {
    console.log("e", e);
    let that = this
    let shvpId = e.currentTarget.dataset.shvpid;
    let params = {
      shvpId: shvpId,
    };
    // 点赞
    heartVoicePostsLike(params).then((res) => {
      if (res.data.code == 200) {
        wx.showToast({
          icon: "none",
          title: "点赞成功",
          duration: 1500,
          success: function () {

            setTimeout(() => {
              that.getlist()
            }, 1500)
          }
        });
      } else {
        wx.showToast({
          // title: res.data.message + ":" + res.data.code,
          title: '已点赞',
          icon: "none",
          duration: 2000,
        });
      }
    });
  },
  clearIndex: function () {
    console.log('我是上一个页面带来方法')
    this.getlist()
  },
  // 跳转评论页面
  gocomment: function (e) {
    console.log("e", e);
    let id = e.currentTarget.dataset.shvpid;
    wx.navigateTo({
      url: `/packageD/pages/socialtalks/socialtalkcomment/socialtalkcomment?id=${id}`,
    });
  },
  // 跳转输出页面
  gosocialtalkoutput: function () {
    wx.navigateTo({
      url: "/packageD/pages/socialtalks/socialtalkoutput/socialtalkoutput",
    });
  },

  //开始拖动
  moveStart: function (ent) {
    console.log(ent);
    //获取最开始的Y坐标
    this.setData({
      startY: ent.changedTouches[0].pageY
    })
  },

  //结束拖动
  endOfTouch: function (e) {
    //结束后的代码逻辑
  },

  //拖动中
  slide: function (ent) {
    console.log(ent);
    var processY = ent.changedTouches[0].pageY;
    if (processY > this.data.firstTopY) {
      console.log('下滑');
    } else if (processY < this.data.firstTopY) {
      console.log('上滑');
    }
  }
});