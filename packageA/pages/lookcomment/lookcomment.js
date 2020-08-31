import { getSelfComment } from "../../../route/index/searchcomment/searchcoment";
import data from "../../../route/api/baseUrl";
Page({
  data: {
    webServerUrl: data.webServerUrl,
    tab: [],
    isend: false,
    cmtLevel: -1, // 默认全部 -1 所有 1 好评 2 中评 3 差评
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    praiseRate: 0, // 好拼
    averageQuantity: 0, // 中评数量
    badQuantity: 0, // 差评
    praiseQuantity: 0, // 好评
    list: [], //列表数据
    normalSrc: data.webServerUrl + "/images/index/lookcomment/zero.png", //没点亮的星
    selectedSrc: data.webServerUrl + "/images/index/lookcomment/full.png", //点亮的整颗星
    halfSrc: data.webServerUrl + "/images/index/lookcomment/half.png", //点亮半颗星
  },
  onLoad: function (options) {},
  onShow: function () {
    this.getlist();
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
    let cmtLevel = this.data.cmtLevel;
    console.log("等级", cmtLevel, "当前分页", currPage, "请求信息数", pageSize);
    let params = {
      cmtLevel: cmtLevel,
      currPage: currPage,
      pageSize: pageSize,
    };
    if (!isend) {
      console.log("加载更多");
      getSelfComment(params).then((res) => {
        console.log("默认请求", res);
        if (res.data.code == 200) {
          ////////////////////////////////////////////////
          ////////////////////////////////////////////////
          // 保存好评率
          that.setData({
            averageQuantity: res.data.data.averageQuantity, // 中评数量
            badQuantity: res.data.data.badQuantity, // 差评
            praiseQuantity: res.data.data.praiseQuantity, // 好评
          });
          // 初始化tabs数据
          // 初始化tabs数据
          let praiseQuantity, averageQuantity, badQuantity;
          if (res.data.data.praiseQuantity == 0) {
            praiseQuantity = "";
          } else {
            praiseQuantity = res.data.data.praiseQuantity;
          }
          if (res.data.data.averageQuantity == 0) {
            averageQuantity = "";
          } else {
            averageQuantity = res.data.data.averageQuantity;
          }
          if (res.data.data.badQuantity == 0) {
            badQuantity = "";
          } else {
            badQuantity = res.data.data.badQuantity;
          }

          const titles = [
            {
              title: "全部",
              id: -1,
            },
            {
              title: "好评" + " " + praiseQuantity,
              id: 1,
            },
            {
              title: "中评" + " " + averageQuantity,
              id: 2,
            },
            {
              title: "差评" + " " + badQuantity,
              id: 3,
            },
          ];
          const tabs = titles.map((item) => ({
            title: item,
          }));
          that.setData({
            tabs,
          });
          ////////////////////////////////////////////////
          ////////////////////////////////////////////////
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
        } else if (res.data.code == 10004) {
          wx.showToast({
            icon: "none",
            title: "没有此权限",
            duration: 2500,
            success: function () {
              let timer = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
                clearTimeout(timer)
              }, 1000)
            }
          });
        } else {
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
  // 全部 好评 中评 差评
  onTabCLick: function (e) {
    console.log("e", e.detail.index);
    // 获取
    let cmtLevel = e.detail.index;
    // 全部
    if (cmtLevel == 0) {
      this.setData({
        cmtLevel: -1,
      });
      // 重新来请求
      this.getlist();
    }
    // 好拼
    if (cmtLevel == 1) {
      this.setData({
        cmtLevel: cmtLevel,
      });
      // 重新来请求
      this.getlist();
    }
    // 中评
    if (cmtLevel == 2) {
      this.setData({
        cmtLevel: cmtLevel,
      });
      // 重新来请求
      this.getlist();
    }
    // 差评
    if (cmtLevel == 3) {
      this.setData({
        cmtLevel: cmtLevel,
      });
      // 重新来请求
      this.getlist();
    }
  },
});
