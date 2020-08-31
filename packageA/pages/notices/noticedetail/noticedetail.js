import {
  getCarouselBoardDetail, // 公告的分页
  // 公告的详情
} from '../../../../route/index/gonggao/gonggao'
Page({
  data: {
    rcbId: '',
    roomCarouselBoard: {}
  },
  onLoad: function (options) {
    let rcbId = options.rcbId
    console.log('通知详情的id rcbId', rcbId)
    this.setData({
      rcbId: rcbId
    })
    let params = {
      rcbId: rcbId
    }
    // 请求通告详情数据
    this.getCarouselBoardDetail()
  },
  getCarouselBoardDetail() {
    let that =this
    let rcbId = this.data.rcbId
    let params = {
      rcbId: rcbId
    }
    getCarouselBoardDetail(params).then(res => {
      console.log('公告详情', res)
      if (res.data.code == 200) {
        that.setData({
          roomCarouselBoard:res.data.data.roomCarouselBoard
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '后台繁忙',
        })
      }
    })
  }
})