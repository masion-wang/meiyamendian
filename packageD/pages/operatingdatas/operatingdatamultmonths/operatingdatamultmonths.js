import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    five: [{
      name: '业绩',
      id: 1
    }, {
      name: '会员',
      id: 1
    }, {
      name: '客流',
      id: 1
    }, {
      name: '项目',
      id: 1
    }, {
      name: '支出',
      id: 1
    }],
    activeIndex: 0
  },

  onLoad: function (options) {},
  // 五个选择一个并且动态获取高低
  tapone: function (e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index
    })
  }
})