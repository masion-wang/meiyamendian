Page({
  data: {
    value: "",
    goods: [], // 商品信息
    total: 0, // 总共几种商品
    selectNum: 0, // 已经选择几样商品
    sum: 0,
    totalPrice: 0 // 合计
  },
  onLoad() {
    const arr = [{
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
    ]
    this.setData({
      goods: arr
    })
    this.setData({
      total: arr.length
    })

  },
  // 搜索
  getvalue: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  // 搜索
  submit: function (options) {
    var that = this;
    var data = that.data.value;
    wx.showToast({
      title: data,
    })
  },
  // 增减数量
  add: function (e) {
    let id = e.target.dataset.id
    let index = e.target.dataset.index
    let goods = this.data.goods
    console.log(id, index)
    goods[index].num++
    this.setData({
      goods: goods
    })
    this.selectNum()
    this.sum()
  },
  // 减少数量
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
  // 去店铺进货
  gostorepurchase: function () {
    wx.navigateTo({
      url: '/packageC/pages/storepurchase/storepurchase',
    })
  }
});