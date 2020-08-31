import {
  getSelfProjectOrder
} from "../../../route/order/index";
import {
  getSelfMySysUserInfo // 获取自己admintype
} from '../../../route/index/guanjiaoutside/guanjiaoutside'
import {
  selfPermissions // 判断权限有无
} from '../../../route/admin/admin'
import data from "../../../route/api/baseUrl";
Page({
  data: {
    webServerUrl: data.webServerUrl,
    tabs: [],
    currPage: 1, // 当前页面
    pageSize: 5, // 每页请求数据
    totalPages: 0, // 总页面
    orderStatus: -1, // 时间类型
    list: [], //列表数据
    isend: false, // 是否最后一页
    isgive: false, // 是否渲染 开关
    isshow: false, // 是否展现
    admintype: 0 // 权限级别
  },
  // 切换订单
  onTabItemTap(item) {},
  onLoad() {
    let that = this;
    // 初始化tabs数据
    const titles = [{
        title: "全部",
        id: -1,
      },
      {
        title: "待支付",
        id: 0,
      },
      {
        title: "待消费",
        id: 1,
      },
      {
        title: "待评价",
        id: 2,
      },
      {
        title: "退款/售后",
        id: 3,
      },
    ];
    const tabs = titles.map((item) => ({
      title: item,
    }));
    this.setData({
      tabs,
    });

  },
  onShow() {
    this.getSelfMySysUserInfo() // 获取自己员工系统信息
    let that = this
    // 判断有没有token 没有token 请空数据 roomCarouselBoards roomStaffLoopDto
    let istoken = wx.getStorageSync('token')
    if (istoken) {

    } else {
      that.setData({
        list: []
      })
    }
  },
  // 自己的级别admintsype 并且根据权限接口判断是否显示数据
  getSelfMySysUserInfo: function () {
    let that = this
    getSelfMySysUserInfo().then(res => {
      if (res.data.code == 200) {
        console.log('员工数据 + 自己的级别', res)
        that.setData({
          // uid: res.data.data.sysUser.roomStaffId,
          admintype: res.data.data.sysUser.adminType
        })
        let admintype = that.data.admintype
        let go = false
        selfPermissions().then(res => {
          if (res.data.code == 200) {
            let arr = res.data.data.sysPermDtos
            console.log('全部权限情况', arr)
            for (let i = 0; i < arr.length; i++) {
              // 如果有 不是小区大区 显示 请求数据
              if (arr[i].pval == 'staff:home:board' && admintype != 3 && admintype != 4 && admintype != 5) {
                go = true
                that.setData({
                  // 这块暂时改成false
                  isshow: true
                })
                that.getlist();
                break
              }
            }
            // 没有权限 不显示 
            if (!go) {
              that.setData({
                isshow: false
              })
              wx.showToast({
                icon: 'none',
                title: '没有权限'
              })
            }
          }
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 获取当前活跃组件下标
  onTabCLick(e) {
    let that = this;
    // 重置isend 和当前页数 还有数组信息
    // -1 代表所有 0 待支付 1 待消费 2 待评价 3 退款/售后
    that.setData({
      isend: false,
      currPage: 1,
      list: [],
      isgive: false,
    });
    // 代表所有
    if (e.detail.id == -1) {
      that.setData({
        orderStatus: -1,
      });
      this.loadMore();
    }
    // 待支付
    else if (e.detail.id == 0) {
      that.setData({
        orderStatus: 0,
      });
      this.loadMore();
    }
    // 待消费
    else if (e.detail.id == 1) {
      that.setData({
        orderStatus: 1,
      });
      this.loadMore();
    }
    // 待评价
    else if (e.detail.id == 2) {
      that.setData({
        orderStatus: 2,
      });
      this.loadMore();
    }
    // 退款/售后
    else if (e.detail.id == 3) {
      that.setData({
        orderStatus: 3,
      });
      this.loadMore();
    }
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
    let isgive = this.data.isgive;
    console.log("isgive", isgive);
    let that = this;
    // 获取当前页 类型 信息数量 是否请求
    let isend = this.data.isend;
    let currPage = this.data.currPage;
    let orderStatus = this.data.orderStatus;
    let pageSize = this.data.pageSize;
    console.log(
      "当前分页",
      currPage,
      "时间类型",
      orderStatus,
      "信息数",
      pageSize
    );
    let params = {
      currPage: currPage,
      pageSize: pageSize,
      orderStatus: orderStatus,
    };
    if (!isend) {
      console.log("加载更多");
      getSelfProjectOrder(params).then((res) => {
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
          // 在这里做一个开关 如果为false 清空一下 来第一个5条 开关变为true
          if (!isgive) {
            that.setData({
              list: [],
            });
            let currPage = ++that.data.currPage;
            let list = that.data.list.concat(res.data.data.contents);
            that.setData({
              list: list,
              currPage: currPage,
              isgive: true,
            });
          }
          //  如果不是切换那就是true 正常分页
          else if (isgive) {
            console.log('isgive', isgive)
            let currPage = ++that.data.currPage;
            let list = that.data.list.concat(res.data.data.contents);
            that.setData({
              list: list,
              currPage: currPage,
            });
          }
        }
      });
    } else {
      console.log("不请求");
      return;
    }
  },
  // 去备忘录详情
  tomemorandum: function (e) {
    console.log("备忘录id", e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    // /packageB/pages/memorandum/memorandum?id=${id}
    wx.navigateTo({
      url: `/packageB/pages/memorandum/memorandum?id=${id}`,
    });
  },
  // 去订单详情页
  toproductdetail: function (e) {
    console.log(
      "订单类型",
      e.currentTarget.dataset.odtype,
      "订单id",
      e.currentTarget.dataset.odid
    );
    let odtype = e.currentTarget.dataset.odtype;
    let odid = e.currentTarget.dataset.odid;
    // 0 普通订单
    if (odtype == 0) {
      console.log("普通订单");
      wx.navigateTo({
        url: `/packageB/pages/productdetail/productdetail/productdetail?id=${odid}`,
      });
    }
    // 1 拼团
    else if (odtype == 1) {
      console.log("拼团");
      wx.navigateTo({
        url: `/packageB/pages/productdetail/pintuan/pintuan?id=${odid}`,
      });
    }
    // 2 砍价
    else if (odtype == 2) {
      console.log("砍价");
      wx.navigateTo({
        url: `/packageB/pages/productdetail/kanjia/kanjia?id=${odid}`,
      });
    }
    // 3 亲密付
    else if (odtype == 3) {
      console.log("亲密付");
      wx.navigateTo({
        url: `/packageB/pages/productdetail/qinmifu/qinmifu?id=${odid}`,
      });
    }
    // 4 消费返还
    else if (odtype == 4) {
      console.log("消费返还");
      wx.navigateTo({
        url: `/packageB/pages/productdetail/xiaofeifanhuan/xiaofeifanhuan?id=${odid}`,
      });
    }
  }
});