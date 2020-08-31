import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    goods: [{
        id: "1",
        image: "http://192.168.44.110:3080/images/product/goodOne.png",
        name: '泡沫染发剂植物染发膏',
        price: 50,
        save: 120,
        num: 0
      },
      {
        id: "2",
        image: "http://192.168.44.110:3080/images/product/goodTwo.png",
        name: '泡沫染发剂植物染发膏',
        price: 50,
        save: 120,
        num: 0
      },
      {
        id: "3",
        image: "http://192.168.44.110:3080/images/product/goodThree.png",
        name: '泡沫染发剂植物染发膏',
        price: 50,
        save: 120,
        num: 0
      },
      {
        id: "4",
        image: "http://192.168.44.110:3080/images/product/goodFour.png",
        name: '泡沫染发剂植物染发膏',
        price: 50,
        save: 120,
        num: 0
      },
      {
        id: "5",
        image: "http://192.168.44.110:3080/images/product/goodOne.png",
        name: '泡沫染发剂植物染发膏',
        price: 50,
        save: 120,
        num: 0
      },
      {
        id: "6",
        image: "http://192.168.44.110:3080/images/product/goodTwo.png",
        name: '泡沫染发剂植物染发膏',
        price: 50,
        save: 120,
        num: 0
      },
      {
        id: "7",
        image: "http://192.168.44.110:3080/images/product/goodThree.png",
        name: '泡沫染发剂植物染发膏',
        price: 50,
        save: 120,
        num: 0
      },
      {
        id: "8",
        image: "http://192.168.44.110:3080/images/product/goodFour.png",
        name: '泡沫染发剂植物染发膏',
        price: 50,
        save: 120,
        num: 0
      },
    ],
    selectgood: [], // 选择商品
    storemoney: 200, // 店流水
    total: 0, // 总共几种商品
    selectNum: 0, // 已经选择几样商品
    sum: 0,
    totalPrice: 0, // 合计
    dialogShow: false, // 提示门店流水
    buttons: [{ // 按钮
      text: '确定'
    }]
  },
  onLoad: function (options) {
    // 获取商品总数量
    let arr = this.data.goods
    this.setData({
      total: arr.length
    })
    console.log(arr)
  },
  // 减少数量 减少对象数据
  sub: function (e) {
    console.log(e)
    let id = e.target.dataset.id
    let index = e.target.dataset.index
    let goods = this.data.goods
    console.log(id, index)
    goods[index].num--
    this.setData({
      goods: goods
    })
    this.selectNum()
    this.sum()
  },
  // 增减数量 保存对象数据
  add: function (e) {
    // 获取商品id index 全部商品 用户选择商品
    let id = e.target.dataset.id
    let index = e.target.dataset.index
    let goods = this.data.goods
    let selectgood = this.data.selectgood
    console.log(id, index)
    goods[index].num++
    this.setData({
      goods: goods
    })
    this.selectNum()
    this.sum()
    // 将数据保存起来
    // selectgood


  },
  // 判断选中商品数量
  selectNum: function () {
    let goods = this.data.goods
    let num = 0
    for (let item of goods) {
      if (item.num > 0) {
        num++
      }
    }
    this.setData({
      selectNum: num
    })
  },
  // 求总价
  sum: function () {
    let totalPrice = 0
    let goods = this.data.goods
    for (let i = 0; i < goods.length; i++) {
      totalPrice += goods[i].price * goods[i].num - 0;
    }
    console.log("总价格", totalPrice)
    this.setData({
      totalPrice: totalPrice
    })
  },
  // 确定金钱
  suremoney: function () {
    let that = this
    // 进货金额 店铺流水(可以花的钱) 选择商品数量
    let totalPrice = this.data.totalPrice
    let storemoney = this.data.storemoney
    let selectNum = this.data.selectNum
    // 如果么有选择商品 提示
    if (selectNum <= 0) {
      wx.showToast({
        icon: "none",
        title: '请选择商品',
      })
      return
    }
    // 钱不够 弹窗提示
    if (storemoney < totalPrice) {
      that.lackmoney()
    }
    // 钱够 进入真正结算
    else if (storemoney >= totalPrice) {
      that.torealspendmoney()
    }
  },
  // 金额不足
  lackmoney: function () {
    this.setData({
      dialogShow: true
    })
  },
  // 知道金额不足 关闭弹窗
  tapDialogButton: function () {
    this.setData({
      dialogShow: false
    })
  },
  // 去店铺记录
  topurchaserecord: function () {
    wx.navigateTo({
      url: '/packageC/pages/storepurchaserecord/storepurchaserecord',
    })
  },
  // 去真正结算页
  torealspendmoney: function () {
    // 将用户数据带到下一页
    // 获得全部商品 和 创建选择商品数组
    let goods = this.data.goods;
    let selectgood = []
    // 如果商品被选中  放进去新数组
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].num > 0) {
        selectgood.push(goods[i])
      }
    }
    let dataList = encodeURIComponent(JSON.stringify(selectgood))
    wx.navigateTo({
      url: `/packageC/pages/spendrealmoney/spendrealmoney?dataList=${dataList}`,
    })
  }
})