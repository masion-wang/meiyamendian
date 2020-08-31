import {
  selfFirmAccountFunction,
  addShareRecord
} from '../../../route/mine/share/share'
import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    isshow: false,
    awardAmt: 0, // 奖励5000元
    awardType: -1, // 奖励类型  0要钱 1要功能
    awardFun: -1, // 奖励方式 0亲密付 1免费请客 2合伙人 3消费返还 -1代表无
    recordId: '', // 记录id
    items: [{
        value: '1',
        name: '兑换功能'
      },
      {
        value: '0',
        name: '5000元奖励'
      }
    ],
    items2: [{
        value: '0',
        name: '免费请客'
      },
      {
        value: '1',
        name: '消费返还'
      },
      {
        value: '2',
        name: '亲密付'
      },
      {
        value: '3',
        name: '合伙人'
      }
    ],
    showrealshare: false,
    issure: false
  },
  onLoad: function (options) {},
  // 一级选择 奖励类型  0要钱 1要功能
  radioChange(e) {
    console.log('一级选择', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
    // 兑换功能-显示  1 0123 5000
    if (e.detail.value == 1) {
      this.setData({
        isshow: true,
        awardType: 1,
        awardFun: -1,
        showrealshare: false
      })
    }
    // 5000元-隐藏  0 5000 -1
    if (e.detail.value == 0) {
      this.setData({
        isshow: false,
        awardType: 0,
        awardAmt: 5000,
        awardFun: -1,
      })
    }
    // 如果awardFun不等于''
    console.log('awardType awardFun awardAmt', this.data.awardType, this.data.awardFun, this.data.awardAmt)

  },
  // 二级选择
  radioChange2(e) {
    console.log('二级选择', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
    this.setData({
      awardFun: e.detail.value
    })
    console.log('awardType awardFun awardAmt', this.data.awardType, this.data.awardFun, this.data.awardAmt)

  },
  // 点击确定 获取记录id
  addShareRecord: function () {
    let awardAmt = this.data.awardAmt
    let awardType = this.data.awardType
    let awardFun = this.data.awardFun
    let that = this
    // 如果满足条件 获取接口
    if (this.data.awardType == 1 && this.data.awardFun >= 0 || this.data.awardType == 0 && this.data.awardAmt == 5000) {
      let params = {
        awardAmt: awardAmt,
        awardType: awardType,
        awardFun: awardFun,
      }
      // 提交记录
      addShareRecord(params).then(res => {
        console.log('res', res)
        if (res.data.code == 200) {
          that.setData({
            recordId: res.data.data.recordId,
            showrealshare: true,
            issure: true
          })
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请选择分享优惠项目',
        duration: 2000
      })
    }
  },
  onShareAppMessage: function (options) {
    let webServerUrl = this.data.webServerUrl
    let recordId = this.data.recordId
    var shareObj = {
      title: "移动互联网美业门店系统、一年365天循环精准拓客、全员复制",
      path: '',
      imageUrl: webServerUrl+'/images/share/outsideimg.jpg'
      // imageUrl: 'http://192.168.44.106:3080/imagesong/mine/share/outsideimg.jpg'
    };
    if (options.from == 'button') {
      shareObj.path = '/packageD/pages/sharetoother/sharetoohther?recordId=' + recordId;
    }
    return shareObj;
  },
  // 拨打技术电话
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: '400-6336-010'
    })
  }
})