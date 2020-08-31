import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    selectgoods: [], // 上一页传过来的数据
    sort: 0, // 种类
    number: 0, // 数量
    totalprice: 0, // 总价格
    dialogShow: false,
    buttons: [{
      text: '确认提交'
    }],
    code: '',
    canTouch: true, // 是否点击
    seconds: 0, // 倒计时总计
    timer: '', // 计时器
  },
  onLoad: function (options) {
    // 获取上个页面传来的商品数据
    let dataTemp = decodeURIComponent(options.dataList)
    let selectgoods = JSON.parse(dataTemp)
    console.log("上个页面传来的selectgoods", selectgoods)
    // 种类
    let sort = selectgoods.length
    console.log(sort)
    // 数量
    let number = 0
    selectgoods.forEach(item => {
      console.log(item.num)
      number += item.num
    });
    console.log(number)
    // 总价
    let totalprice = 0
    selectgoods.forEach(item => {
      console.log(item)
      totalprice += item.price * item.num
    });
    console.log(totalprice)
    this.setData({
      sort: sort,
      number: number,
      totalprice: totalprice,
      selectgoods: selectgoods
    })
  },
  // 验证码确认
  suremoneyagain: function () {
    this.setData({
      dialogShow: true
    })
    // 触发验证码请求事件
    this.getCode()
  },
  // 最终确认
  tapDialogButton: function (e) {
    wx.redirectTo({
      url: '/pages/product/storepurchaserecord/storepurchaserecord',
    })
  },
  // 获取验证码 倒计时
  getCode: function () {
    let that = this
    // 不可触碰
    that.setData({
      canTouch: false
    })
    // 倒计时逻辑
    that.setData({
      seconds: 60,
      timer: setInterval(function () {
        let seconds = that.data.seconds
        that.setData({
          seconds: seconds - 1
        })
        if (that.data.seconds == 0) {
          that.setData({
            canTouch: true
          })
          // 读秒结束 清空计时器
          clearInterval(that.data.timer)
        }
      }, 1000)
    })


  },
})