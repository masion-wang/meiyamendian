import {
  getSelfFirmLeaveSet,
  getSelfCreditFraction
} from '../../../../route/mine/credit/credit'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    creditNumber: 0, // 分数
    firmLeaveSetDto: {}, // 扣得钱
    round: 0, // 周长
    backClass: [{
        color: "red",
        url: data.webServerUrl + '/images/mine/mycredit/level1.png',
        score: '0-399分',
        amerce: '请假每天罚款',
      },
      {
        color: "blue",
        url: data.webServerUrl + '/images/mine/mycredit/level2.png',
        score: '400-549分',
        amerce: '请假每天罚款',
      },
      {
        color: "green",
        url: data.webServerUrl + '/images/mine/mycredit/level3.png',
        score: '550-699分',
        amerce: '请假每天罚款',
      },
      {
        color: "orange",
        url: data.webServerUrl + '/images/mine/mycredit/level4.png',
        score: '700-899分',
        amerce: '请假每天罚款',
      },
      {
        color: "yellow",
        url: data.webServerUrl + '/images/mine/mycredit/level5.png',
        score: '900-1000分',
        amerce: '请假每天罚款',
      }
    ],
    word: '', // 字段
    currentItemId: 0 // 轮播图默认下标
  },
  onLoad: function (options) {
    let that = this
    getSelfFirmLeaveSet().then(res => {
      if (res.data.code == 200) {
        console.log('请假信息', res)
        that.setData({
          firmLeaveSetDto: res.data.data.firmLeaveSetDto
        })

      }
    })
    getSelfCreditFraction().then(res => {
      if (res.data.code == 200) {
        console.log('员工的信用分信息', res)
        let creditFraction = res.data.data.roomStaffBaseDto.roomStaffAccount.creditFraction
        let round = (creditFraction * 2) / 1000
        console.log('信用分', 'round', creditFraction, round)
        // 判断分数所处范围 获取相关字段和轮播图下标
        if (creditFraction >= 900) {
          that.setData({
            word: '非常优秀',
            currentItemId: 4
          })
        } else if (creditFraction >= 700 && creditFraction < 900) {
          that.setData({
            word: '优秀',
            currentItemId: 3
          })
        } else if (creditFraction >= 550 && creditFraction < 700) {
          that.setData({
            word: '不错',
            currentItemId: 2
          })
        } else if (creditFraction >= 400 && creditFraction < 550) {
          that.setData({
            word: '一般',
            currentItemId: 1
          })
        } else if (creditFraction >= 0 && creditFraction < 400) {
          that.setData({
            word: '较差',
            currentItemId: 0
          })
        }


        that.setData({
          creditNumber: creditFraction,
          round: round
        })
        that.drawCircle(round)
      }
    })
  },
  // 画出来一个底色
  drawProgressbg: function () {
    // 创建画布对象
    var ctx = wx.createCanvasContext('canvasProgressbg', this)
    // 设置圆环的宽度
    ctx.setLineWidth(9);
    //  设置圆环的颜色
    ctx.setStrokeStyle('#e7a939');
    // 设置圆环端点的形状
    ctx.setLineCap('round')
    //开始一个新的路径
    ctx.beginPath();
    // 设置一个原点(110,110)，半径为100的圆的路径到当前路径
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.draw();
  },
  // 画出来一个动态的白圆
  drawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress', this);
    context.setLineWidth(10);
    context.setStrokeStyle('white');
    context.setLineCap('round')
    context.beginPath();
    context.arc(110, 110, 100, 0, step * Math.PI, false);
    context.stroke();
    context.draw()
  },
  onReady: function () {
    this.drawProgressbg();
  },
  swiperChange: function (e) {
    console.log("滑动", e)
    var currentItemId = e.detail.currentItemId;
    this.setData({
      currentItemId: currentItemId
    })
  },
  clickChange: function (e) {
    console.log("点击", e)
    var itemId = e.currentTarget.dataset.itemId;
    this.setData({
      currentItemId: itemId
    })
  }
})