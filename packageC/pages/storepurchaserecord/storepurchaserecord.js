import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    arr: [{
        titletime: "2019-12-14 12:45",
        titlestatus: '待收货',
        content: [{
            id: "1",
            image: "http://192.168.44.110:3080/images/product/goodOne.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 10,

          },
          {
            id: "2",
            image: "http://192.168.44.110:3080/images/product/goodTwo.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 20,

          },
        ],
        totalprice: '1560',
        isfold: false,
        orderId: "1"
      },
      {
        titletime: "2019-12-14 12:45",
        titlestatus: '已收货',
        content: [{
            id: "1",
            image: "http://192.168.44.110:3080/images/product/goodOne.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 10,
          },
          {
            id: "2",
            image: "http://192.168.44.110:3080/images/product/goodTwo.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 20,
          },
        ],
        totalprice: '1560',
        isfold: false,
        orderId: "2"
      },
      {
        titletime: "2019-12-14 12:45",
        titlestatus: '待收货',
        content: [{
            id: "1",
            image: "http://192.168.44.110:3080/images/product/goodOne.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 10,

          },
          {
            id: "2",
            image: "http://192.168.44.110:3080/images/product/goodTwo.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 20,

          },
        ],
        totalprice: '1560',
        isfold: false,
        orderId: "1"
      },
      {
        titletime: "2019-12-14 12:45",
        titlestatus: '已收货',
        content: [{
            id: "1",
            image: "http://192.168.44.110:3080/images/product/goodOne.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 10,
          },
          {
            id: "2",
            image: "http://192.168.44.110:3080/images/product/goodTwo.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 20,
          },
        ],
        totalprice: '1560',
        isfold: false,
        orderId: "2"
      },
      {
        titletime: "2019-12-14 12:45",
        titlestatus: '待收货',
        content: [{
            id: "1",
            image: "http://192.168.44.110:3080/images/product/goodOne.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 10,

          },
          {
            id: "2",
            image: "http://192.168.44.110:3080/images/product/goodTwo.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 20,

          },
        ],
        totalprice: '1560',
        isfold: false,
        orderId: "1"
      },
      {
        titletime: "2019-12-14 12:45",
        titlestatus: '已收货',
        content: [{
            id: "1",
            image: "http://192.168.44.110:3080/images/product/goodOne.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 10,
          },
          {
            id: "2",
            image: "http://192.168.44.110:3080/images/product/goodTwo.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 20,
          },
        ],
        totalprice: '1560',
        isfold: false,
        orderId: "2"
      },
      {
        titletime: "2019-12-14 12:45",
        titlestatus: '待收货',
        content: [{
            id: "1",
            image: "http://192.168.44.110:3080/images/product/goodOne.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 10,

          },
          {
            id: "2",
            image: "http://192.168.44.110:3080/images/product/goodTwo.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 20,

          },
        ],
        totalprice: '1560',
        isfold: false,
        orderId: "1"
      },
      {
        titletime: "2019-12-14 12:45",
        titlestatus: '已收货',
        content: [{
            id: "1",
            image: "http://192.168.44.110:3080/images/product/goodOne.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 10,
          },
          {
            id: "2",
            image: "http://192.168.44.110:3080/images/product/goodTwo.png",
            name: '泡沫染发剂植物染发膏',
            price: 50,
            save: 120,
            num: 20,
          },
        ],
        totalprice: '1560',
        isfold: false,
        orderId: "2"
      }
    ]
  },
  onLoad: function (options) {

  },
  // 收起打开
  openorclose: function (e) {
    // id和isfold 数组arr
    console.log("isfold", e.currentTarget.dataset.isfold)
    console.log("orderid", e.currentTarget.dataset.orderid)
    let orderid = e.currentTarget.dataset.orderid
    let arr = this.data.arr
    // 收起 打开
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].orderId == orderid) {
        arr[i].isfold = !arr[i].isfold
      }
    }
    this.setData({
      arr: arr
    })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})