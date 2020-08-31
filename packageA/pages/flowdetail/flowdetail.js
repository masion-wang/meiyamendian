import * as echarts from '../../../ec-canvas/echarts';
var barec1 = null
var barec2 = null
var barec3 = null
var barec4 = null
var barec5 = null
var option1 = {
  tooltip: {
    trigger: 'item',
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '80%', //['70%', '30%'],
    center: ['35%', '50%'],
    itemStyle: {
      normal: {
        color: function (params) {
          //自定义颜色
          var colorList = ['#ef5c28', '#f79822', '#b86de3', '#0c8de0', '#fde01a', '#67d4fd'];
          return colorList[params.dataIndex]
        },
        label: {
          show: false //隐藏文字
        },
        labelLine: {
          show: false //隐藏指示线
        }
      },

    },
    data: [{
        value: 0,
        name: '亲密付'
      },
      {
        value: 0,
        name: '拼团'
      },
      {
        value: 0,
        name: '砍价'
      },
      {
        value: 0,
        name: '合伙人'
      },
      {
        value: 0,
        name: '消费返还'
      },
      {
        value: 0,
        name: '免费请客'
      }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};
var option2 = {
  tooltip: {
    trigger: 'item',
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '80%', //['70%', '30%'],
    center: ['35%', '50%'],
    itemStyle: {
      normal: {
        color: function (params) {
          //自定义颜色
          var colorList = ['#ef5c28', '#f79822', '#b86de3', '#0c8de0', '#fde01a', '#67d4fd'];
          return colorList[params.dataIndex]
        },
        label: {
          show: false //隐藏文字
        },
        labelLine: {
          show: false //隐藏指示线
        }
      },

    },
    data: [{
        value: 0,
        name: '亲密付'
      },
      {
        value: 0,
        name: '拼团'
      },
      {
        value: 0,
        name: '砍价'
      },
      {
        value: 0,
        name: '合伙人'
      },
      {
        value: 0,
        name: '消费返还'
      },
      {
        value: 0,
        name: '免费请客'
      }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};
var option3 = {
  tooltip: {
    trigger: 'item',
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '80%', //['70%', '30%'],
    center: ['35%', '50%'],
    itemStyle: {
      normal: {
        color: function (params) {
          //自定义颜色
          var colorList = ['#ef5c28', '#f79822', '#b86de3', '#0c8de0', '#fde01a', '#67d4fd'];
          return colorList[params.dataIndex]
        },
        label: {
          show: false //隐藏文字
        },
        labelLine: {
          show: false //隐藏指示线
        }
      },

    },
    data: [{
        value: 0,
        name: '亲密付'
      },
      {
        value: 0,
        name: '拼团'
      },
      {
        value: 0,
        name: '砍价'
      },
      {
        value: 0,
        name: '合伙人'
      },
      {
        value: 0,
        name: '消费返还'
      },
      {
        value: 0,
        name: '免费请客'
      }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};
var option4 = {
  tooltip: {
    trigger: 'item',
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '80%', //['70%', '30%'],
    center: ['35%', '50%'],
    itemStyle: {
      normal: {
        color: function (params) {
          //自定义颜色
          var colorList = ['#ef5c28', '#f79822', '#b86de3', '#0c8de0', '#fde01a', '#67d4fd'];
          return colorList[params.dataIndex]
        },
        label: {
          show: false //隐藏文字
        },
        labelLine: {
          show: false //隐藏指示线
        }
      },

    },
    data: [{
        value: 0,
        name: '亲密付'
      },
      {
        value: 0,
        name: '拼团'
      },
      {
        value: 0,
        name: '砍价'
      },
      {
        value: 0,
        name: '合伙人'
      },
      {
        value: 0,
        name: '消费返还'
      },
      {
        value: 0,
        name: '免费请客'
      }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};
var option5 = {
  tooltip: {
    trigger: 'item',
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '80%', //['70%', '30%'],
    center: ['35%', '50%'],
    itemStyle: {
      normal: {
        color: function (params) {
          //自定义颜色
          var colorList = ['#ef5c28', '#f79822', '#0c8de0', '#fde01a', '#67d4fd'];
          return colorList[params.dataIndex]
        },
        label: {
          show: false //隐藏文字
        },
        labelLine: {
          show: false //隐藏指示线
        }
      },

    },
    data: [{
        value: 0,
        name: '亲密付'
      },
      {
        value: 0,
        name: '拼团'
      },
      {
        value: 0,
        name: '合伙人'
      },
      {
        value: 0,
        name: '消费返还'
      },
      {
        value: 0,
        name: '免费请客'
      }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};
import {
  getStaffShareInfo
} from '../../../route/index/flowdetail/flowdetail'
Page({
  data: {
    // 分享人数
    ec1: {
      onInit: function (canvas, width, height, dpr) {
        barec1 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec1);
        // chart.setOption(option1)
        return barec1;
      }
    },
    // 分享人次
    ec2: {
      onInit: function (canvas, width, height, dpr) {
        barec2 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec2);
        // chart.setOption(option2)
        return barec2;
      }
    },
    // 预约人次
    ec3: {
      onInit: function (canvas, width, height, dpr) {
        barec3 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec3);
        // chart.setOption(option3)
        return barec3;
      }
    },
    // 到店人次
    ec4: {
      onInit: function (canvas, width, height, dpr) {
        barec4 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec4);
        // chart.setOption(option4)
        return barec4;
      }
    },
    // 锁客人数
    ec5: {
      onInit: function (canvas, width, height, dpr) {
        barec5 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec5);
        // chart.setOption(option5)
        return barec5;
      }
    },
    rsbId: '',
    timeWay: -5, //  0 非自定义日期(需要传dayRange) 1 自定义日期(需要传startTime和endTime)
    dayRange: -5, // 时间范围 0 日排行 1 周排行 2 月排行
    startTime: '',
    endTime: '',
    data: {},
    shareNum: 0,
    shareTime: 0,
    appointTime: 0,
    atStore: 0,
    lockNum: 0
  },
  onLoad: function (options) {
    console.log('员工id', options.id)
    // console.log('时间方式', options.orderWay)
    console.log('时间方式', options.timeWay)
    console.log('时间范围', options.dayRange)
    console.log('开始时间', options.startTime)
    console.log('结束时间', options.endTime)
    let rsbId = options.id
    let timeWay = options.timeWay
    let dayRange = options.dayRange
    let startTime = options.startTime
    let endTime = options.endTime

    this.setData({
      rsbId: rsbId,
      timeWay: timeWay,
      dayRange: dayRange,
      startTime: startTime,
      endTime: endTime,
    })

  },
  // 获取该员工的引流数据
  onReady: function () {
    let that = this
    let p = new Promise((resolve, reject) => {
      that.checkEchartsTimer = setInterval(() => {
        if (echarts) {
          clearInterval(that.checkEchartsTimer)
          resolve()
        }
      }, 300)
    })
    p.then(res => {
      this.getStaffShareInfo()
      clearInterval(that.checkEchartsTimer)
    }).catch(err => {
      clearInterval(that.checkEchartsTimer)
    })
    // setTimeout(() => {
    //   this.getStaffShareInfo()
    // }, 750)
  },
  // 获取该员工的引流数据
  getStaffShareInfo: function () {
    let that = this
    let rsbId = this.data.rsbId
    let timeWay = this.data.timeWay
    let dayRange = this.data.dayRange
    let startTime = this.data.startTime
    let endTime = this.data.endTime

    let params = {
      rsbId: rsbId,
      timeWay: timeWay - 0,
      dayRange: dayRange - 0,
      startTime: startTime,
      endTime: endTime
    }
    console.log('params', params)
    getStaffShareInfo(params).then(res => {
      if (res.data.code == 200) {
        console.log('该员工相关数据为', res)
        that.setData({
          data: res.data.data,
          // 分享人数
          shareNum: res.data.data.sharePeople.csmReturn + res.data.data.sharePeople.freeHospitality + res.data.data.sharePeople.grlfrndCard + res.data.data.sharePeople.grpBuy + res.data.data.sharePeople.hackPrice + res.data.data.sharePeople.intimacy,
          // 分享次数
          shareTime: res.data.data.shareQuantity.csmReturn + res.data.data.shareQuantity.freeHospitality + res.data.data.shareQuantity.grlfrndCard + res.data.data.shareQuantity.grpBuy + res.data.data.shareQuantity.hackPrice + res.data.data.shareQuantity.intimacy,
          // 预约人次
          appointTime: res.data.data.reserveQuantity.csmReturn + res.data.data.reserveQuantity.freeHospitality + res.data.data.reserveQuantity.grlfrndCard + res.data.data.reserveQuantity.grpBuy + res.data.data.reserveQuantity.hackPrice + res.data.data.reserveQuantity.intimacy,
          // 到店人次
          atStore: res.data.data.acceptedQuantity.csmReturn + res.data.data.acceptedQuantity.freeHospitality + res.data.data.acceptedQuantity.grlfrndCard + res.data.data.acceptedQuantity.grpBuy + res.data.data.acceptedQuantity.hackPrice + res.data.data.acceptedQuantity.intimacy,
          // 锁客人数
          lockNum: res.data.data.lockUserPeople.csmReturn + res.data.data.lockUserPeople.freeHospitality + res.data.data.lockUserPeople.grlfrndCard + res.data.data.lockUserPeople.grpBuy + res.data.data.lockUserPeople.intimacy + res.data.data.lockUserPeople.hackPrice
        })
        console.log('locknum', that.data.lockNum)
        // 分享人数 亲密付 拼团 砍价 合伙人 消费返还 免费请客
        option1.series[0].data[0].value = res.data.data.sharePeople.intimacy
        option1.series[0].data[1].value = res.data.data.sharePeople.grpBuy
        option1.series[0].data[2].value = res.data.data.sharePeople.hackPrice
        option1.series[0].data[3].value = res.data.data.sharePeople.grlfrndCard
        option1.series[0].data[4].value = res.data.data.sharePeople.csmReturn
        option1.series[0].data[5].value = res.data.data.sharePeople.freeHospitality
        // 分享人次 亲密付 拼团 砍价 合伙人 消费返还 免费请客
        option2.series[0].data[0].value = res.data.data.shareQuantity.intimacy
        option2.series[0].data[1].value = res.data.data.shareQuantity.grpBuy
        option2.series[0].data[2].value = res.data.data.shareQuantity.hackPrice
        option2.series[0].data[3].value = res.data.data.shareQuantity.grlfrndCard
        option2.series[0].data[4].value = res.data.data.shareQuantity.csmReturn
        option2.series[0].data[5].value = res.data.data.shareQuantity.freeHospitality
        // 预约人次 亲密付 拼团 砍价 合伙人 消费返还 免费请客
        option3.series[0].data[0].value = res.data.data.reserveQuantity.intimacy
        option3.series[0].data[1].value = res.data.data.reserveQuantity.grpBuy
        option3.series[0].data[2].value = res.data.data.reserveQuantity.hackPrice
        option3.series[0].data[3].value = res.data.data.reserveQuantity.grlfrndCard
        option3.series[0].data[4].value = res.data.data.reserveQuantity.csmReturn
        option3.series[0].data[5].value = res.data.data.reserveQuantity.freeHospitality
        // 到店人次 亲密付 拼团 砍价 合伙人 消费返还 免费请客
        option4.series[0].data[0].value = res.data.data.acceptedQuantity.intimacy
        option4.series[0].data[1].value = res.data.data.acceptedQuantity.grpBuy
        option4.series[0].data[2].value = res.data.data.acceptedQuantity.hackPrice
        option4.series[0].data[3].value = res.data.data.acceptedQuantity.grlfrndCard
        option4.series[0].data[4].value = res.data.data.acceptedQuantity.csmReturn
        option4.series[0].data[5].value = res.data.data.acceptedQuantity.freeHospitality
        // 锁客人数 亲密付 拼团  合伙人 消费返还 免费请客
        option5.series[0].data[1].value = res.data.data.acceptedQuantity.grpBuy
        option5.series[0].data[1].value = res.data.data.acceptedQuantity.intimacy
        option5.series[0].data[2].value = res.data.data.acceptedQuantity.grlfrndCard
        option5.series[0].data[3].value = res.data.data.acceptedQuantity.csmReturn
        option5.series[0].data[4].value = res.data.data.acceptedQuantity.freeHospitality
        barec1.setOption(option1, true)
        barec2.setOption(option2, true)
        barec3.setOption(option3, true)
        barec4.setOption(option4, true)
        barec5.setOption(option5, true)
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  }
})