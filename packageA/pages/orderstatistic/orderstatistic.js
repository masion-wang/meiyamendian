import {
  getTodayStaffOrderStatistic, // 今日统计
  getCurrMonthStaffOrderStatistic, // 今月统计
  getStaffOrderStatistic, // 历史统计
  getStaffDesignatedRate // 获取接待人数 指定率
} from '../../../route/index/orderstatistic/orderstatistic'
// 引入echart
import * as echarts from '../../../ec-canvas/echarts';
import data from '../../../route/api/baseUrl'
const months = []
const days = []
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = '0' + i
  }
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = '0' + i
  }
  days.push(i)
}
var barec1 = null
var barec2 = null
var barec3 = null
var barec4 = null
var barec5 = null
var barec6 = null
var barec7 = null
var option1 = {
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0, //横轴信息全部显示  
      rotate: 0, //-15度角倾斜显示 
    }
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    left: '0%',
    bottom: '0%',
    height: '90%',
    width: 'auto',
    containLabel: true
  },
  series: [{
    data: [],
    type: 'bar',
    label: {
      normal: {
        show: true,
        position: 'inside',
        // formatter: '{c}%'
      }
    },
    itemStyle: {
      normal: {
        color: '#ef5c28'
      }
    },
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(220, 220, 220, 0.8)'
    }
  }]
};
var option2 = {
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0, //横轴信息全部显示  
      rotate: 0, //-15度角倾斜显示 
    }
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    left: '0%',
    bottom: '0%',
    height: '90%',
    width: 'auto',
    containLabel: true
  },
  series: [{
    data: [],
    type: 'bar',
    label: {
      normal: {
        show: true,
        position: 'inside',
        // formatter: '{c}%'
      }
    },
    itemStyle: {
      normal: {
        color: '#f79822'
      }
    },
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(220, 220, 220, 0.8)'
    }
  }]
};
var option3 = {
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0, //横轴信息全部显示  
      rotate: 0, //-15度角倾斜显示 
    }
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    left: '0%',
    bottom: '0%',
    height: '90%',
    width: 'auto',
    containLabel: true
  },
  series: [{
    data: [],
    type: 'bar',
    label: {
      normal: {
        show: true,
        position: 'inside',
        // formatter: '{c}%'
      }
    },
    itemStyle: {
      normal: {
        color: '#b86de3'
      }
    },
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(220, 220, 220, 0.8)'
    }
  }]
};
var option4 = {
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0, //横轴信息全部显示  
      rotate: 0, //-15度角倾斜显示 
    }
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    left: '0%',
    bottom: '0%',
    height: '90%',
    width: 'auto',
    containLabel: true
  },
  series: [{
    data: [],
    type: 'bar',
    label: {
      normal: {
        show: true,
        position: 'inside',
        // formatter: '{c}%'
      }
    },
    itemStyle: {
      normal: {
        color: '#0c8de0'
      }
    },
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(220, 220, 220, 0.8)'
    }
  }]
};
var option5 = {
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0, //横轴信息全部显示  
      rotate: 0, //-15度角倾斜显示 
    }
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    left: '0%',
    bottom: '0%',
    height: '90%',
    width: 'auto',
    containLabel: true
  },
  series: [{
    data: [],
    type: 'bar',
    label: {
      normal: {
        show: true,
        position: 'inside',
        // formatter: '{c}%'
      }
    },
    itemStyle: {
      normal: {
        color: '#fde01a'
      }
    },
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(220, 220, 220, 0.8)'
    }
  }]
};
var option6 = {
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0, //横轴信息全部显示  
      rotate: 0, //-15度角倾斜显示 
    }
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    left: '0%',
    bottom: '0%',
    height: '90%',
    width: 'auto',
    containLabel: true
  },
  series: [{
    data: [],
    type: 'bar',
    label: {
      normal: {
        show: true,
        position: 'inside',
        // formatter: '{c}%'
      }
    },
    itemStyle: {
      normal: {
        color: '#67d4fd'
      }
    },
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(220, 220, 220, 0.8)'
    }
  }]
};
var option7 = {
  tooltip: {
    trigger: 'item',
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '45%',
    label: {
      formatter: '{abg|}\n{hr|}\n{b|{b}:}{c}',
      rich: {}
    },
    center: ['50%', '50%'],
    itemStyle: {
      normal: {
        color: function (params) {
          //自定义颜色
          var colorList = ['#fea128', '#2084bf'];
          return colorList[params.dataIndex]
        }
      }
    },
    data: [{
        value: 0,
        name: '指定人数'
      },
      {
        value: 0,
        name: '总接待人数'
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
Page({
  data: {
    webServerUrl: data.webServerUrl,
    tabs: [],
    istoday: true,
    ismonth: false,
    ishistory: false,
    list: [],
    // showE: true, // 是否显示echart
    data: {}, // 今日 今月 历史统计
    ec1: {
      onInit: function (canvas, width, height, dpr) {
        barec1 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec1);
        return barec1;
      }
    },
    ec2: {
      onInit: function (canvas, width, height, dpr) {
        barec2 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec2);
        return barec2;
      }
    },
    ec3: {
      onInit: function (canvas, width, height, dpr) {
        barec3 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec3);
        return barec3;
      }
    },
    ec4: {
      onInit: function (canvas, width, height, dpr) {
        barec4 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec4);
        return barec4;
      }
    },
    ec5: {
      onInit: function (canvas, width, height, dpr) {
        barec5 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec5);
        return barec5;
      }
    },
    ec6: {
      onInit: function (canvas, width, height, dpr) {
        barec6 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec6);
        return barec6;
      }
    },
    ec7: {
      onInit: function (canvas, width, height, dpr) {
        barec7 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barec7);
        return barec7;
      }
    },
    designatedNumber: 0,
    receptionNumber: 0,
    dialogShow: false,
    showOneButtonDialog: false,
    dialogShow2: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 日期数据
    years: [],
    months,
    days,
    years2: [],
    months2: months,
    days2: days,
    value1: [], // 今日统计的指定率日期1
    value2: [], // 今日统计的指定率日期2
    value11: [], // 今月统计的指定率日期1
    value22: [], // 今月统计的指定率日期2  
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    startTime2: '', // 开始时间
    endTime2: '', // 结束时间
    historyyear: '', // 历史年
    historymonth: '', // 历史月
    year: '',
    month: '',
    day: '',
    year2: '',
    month2: '',
    day2: '',
    size: 5, // 请求数量
    isend: false, // 是否显示
    iscover: true, // 是否遮罩层
    count: 0, // 计数器不能超过1
    isstart1: false, // 初始一次-日
    isstart: false // 初始一次-月
  },
  onLoad: function (options) {
    // 初始化tabs数据
    const titles = [{
      title: '今日统计',
      id: '1'
    }, {
      title: '当月统计',
      id: '2'
    }, {
      title: '历史统计',
      id: '3'
    }]
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs: tabs
    })
    this.fresh()
  },
  fresh: function () {
    let that = this
    let date2 = new Date()
    let years = []
    for (let i = 2010; i <= date2.getFullYear(); i++) {
      years.push(i)
    }
    that.setData({
      years: years,
      years2: years
    })
    let yearnow = date2.getFullYear(); // 获取当年
    let monthnow = date2.getMonth() + 1; // 获取当月
    let daynow = date2.getDate() // 获取当天
    let dayOne = '01'
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    if (daynow < 10) {
      daynow = '0' + daynow
    }
    let currentTime = yearnow + '-' + monthnow + '-' + daynow
    let cureentOne = yearnow + '-' + monthnow + '-' + dayOne
    console.log('今日日期', currentTime, '当月第一天', cureentOne)
    // 获取当月今天
    let curMoncurDay = [999, monthnow - 1, daynow - 1]
    // 获取当月第一天
    let curMoncurfirstDay = [999, monthnow - 1, dayOne - 1] // -1
    that.setData({
      year: date2.getFullYear(),
      month: monthnow,
      day: daynow,
      year2: date2.getFullYear(),
      month2: monthnow,
      day2: daynow,
      value1: curMoncurDay,
      value2: curMoncurDay,
      value11: curMoncurfirstDay,
      value22: curMoncurDay,
      startTime: currentTime, // 开始时间
      endTime: currentTime, // 结束时间
      startTime2: cureentOne, // 开始时间
      endTime2: currentTime, // 结束时间
      historyyear: yearnow, // 历史年
      historymonth: monthnow, // 历史月
    })
  },
  onReady: function () {
    // setTimeout(() => { // 给echart一个加载时间
    //   this.getTodayStaffOrderStatistic() // 获取今日数据
    // }, 750);
    // setTimeout(() => {
    //   reject('超时')
    //   // 清除定时器
    //   clearInterval(that.checkEchartsTimer)
    // }, 3000)
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
      that.getTodayStaffOrderStatistic() // 获取今日数据
      clearInterval(that.checkEchartsTimer)
    }).catch(err => {
      clearInterval(that.checkEchartsTimer)
    })

  },
  // 今日 || 今月 || 历史
  onTabCLick: function (e) {
    let that = this
    let index = e.detail.index
    // 今日统计  修改时间
    if (index == 0) {
      that.setData({
        istoday: true,
        ismonth: false,
        ishistory: false
      })
      // 今日统计接口
      console.log('今日')
      this.getTodayStaffOrderStatistic()
    }
    // 本月统计
    else if (index == 1) {
      that.setData({
        istoday: false,
        ismonth: true,
        ishistory: false
      })
      // 今月统计接口
      this.getCurrMonthStaffOrderStatistic()
    }
    // 历史记录
    else if (index == 2) {
      that.setData({
        istoday: false,
        ismonth: false,
        ishistory: true
      })
      // 引入echart
      this.getlist()
    }
  },
  // 今日统计+今日资源
  getTodayStaffOrderStatistic() {
    let that = this
    let isstart1 = this.data.isstart1
    that.setData({
      iscover: true
    })
    // 今日资源
    getTodayStaffOrderStatistic().then(res => {
      console.log('今日统计', res)
      if (res.data.code == 200) {
        that.setData({
          iscover: false
        })
        that.setData({
          data: res.data.data
        })
        // 申请7个数组 data1 data2 data3 data4 data5 data6 data7
        let data1 = [res.data.data.inviteData.intimacyPay.shareNums, res.data.data.inviteData.intimacyPay.rsvNums, res.data.data.inviteData.intimacyPay.acptNums, res.data.data.inviteData.intimacyPay.lockUserNums]
        let data2 = [res.data.data.inviteData.grpBooking.shareNums, res.data.data.inviteData.grpBooking.rsvNums, res.data.data.inviteData.grpBooking.acptNums, res.data.data.inviteData.grpBooking.lockUserNums]
        let data3 = [res.data.data.inviteData.hackPrice.shareNums, res.data.data.inviteData.hackPrice.rsvNums, res.data.data.inviteData.hackPrice.acptNums, res.data.data.inviteData.hackPrice.lockUserNums]
        let data4 = [res.data.data.inviteData.grlFrnd.shareNums, res.data.data.inviteData.grlFrnd.rsvNums, res.data.data.inviteData.grlFrnd.acptNums, res.data.data.inviteData.grlFrnd.lockUserNums]
        let data5 = [res.data.data.inviteData.csmReturn.shareNums, res.data.data.inviteData.csmReturn.rsvNums, res.data.data.inviteData.csmReturn.acptNums, res.data.data.inviteData.csmReturn.lockUserNums]
        let data6 = [res.data.data.inviteData.freeHospitality.shareNums, res.data.data.inviteData.freeHospitality.rsvNums, res.data.data.inviteData.freeHospitality.acptNums, res.data.data.inviteData.freeHospitality.lockUserNums]
        let data7 = [res.data.data.designatedRate.designatedNumber, res.data.data.designatedRate.receptionNumber]
        let data11 = ['分享' + '(' + res.data.data.inviteData.intimacyPay.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.intimacyPay.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.intimacyPay.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.intimacyPay.lockUserPercentage.toFixed(0) + '%' + ')']
        let data22 = ['分享' + '(' + res.data.data.inviteData.intimacyPay.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.intimacyPay.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.intimacyPay.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.intimacyPay.lockUserPercentage.toFixed(0) + '%' + ')']
        let data33 = ['分享' + '(' + res.data.data.inviteData.intimacyPay.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.intimacyPay.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.intimacyPay.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.intimacyPay.lockUserPercentage.toFixed(0) + '%' + ')']
        let data44 = ['分享' + '(' + res.data.data.inviteData.intimacyPay.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.intimacyPay.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.intimacyPay.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.intimacyPay.lockUserPercentage.toFixed(0) + '%' + ')']
        let data55 = ['分享' + '(' + res.data.data.inviteData.intimacyPay.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.intimacyPay.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.intimacyPay.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.intimacyPay.lockUserPercentage.toFixed(0) + '%' + ')']
        let data66 = ['分享' + '(' + res.data.data.inviteData.intimacyPay.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.intimacyPay.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.intimacyPay.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.intimacyPay.lockUserPercentage.toFixed(0) + '%' + ')']
        // 先清空 6个 option数据 人数+比例
        // option1.series[0].data = []
        // option1.xAxis.data = []
        // option2.series[0].data = []
        // option2.xAxis.data = []
        // option3.series[0].data = []
        // option3.xAxis.data = []
        // option4.series[0].data = []
        // option4.xAxis.data = []
        // option5.series[0].data = []
        // option5.xAxis.data = []
        // option6.series[0].data = []
        // option6.xAxis.data = []
        // console.log('消费返还', option5)
        // 1.亲密付 人数 || 比例
        option1.series[0].data = data1
        // option1.series[0].data.push(res.data.data.inviteData.intimacyPay.shareNums)
        // option1.series[0].data.push(res.data.data.inviteData.intimacyPay.rsvNums)
        // option1.series[0].data.push(res.data.data.inviteData.intimacyPay.acptNums)
        // option1.series[0].data.push(res.data.data.inviteData.intimacyPay.lockUserNums)
        // '分享', '预约', '到店', '锁客'
        option1.xAxis.data = data11
        // option1.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.intimacyPay.sharePercentage.toFixed(0) + '%' + ')'
        // option1.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.intimacyPay.rsvPercentage.toFixed(0) + '%' + ')'
        // option1.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.intimacyPay.acptPercentage.toFixed(0) + '%' + ')'
        // option1.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.intimacyPay.lockUserPercentage.toFixed(0) + '%' + ')'
        // console.log('亲密付 option1', option1)
        // 2.拼团
        option2.series[0].data = data2
        // option2.series[0].data.push(res.data.data.inviteData.grpBooking.shareNums)
        // option2.series[0].data.push(res.data.data.inviteData.grpBooking.rsvNums)
        // option2.series[0].data.push(res.data.data.inviteData.grpBooking.acptNums)
        // option2.series[0].data.push(res.data.data.inviteData.grpBooking.lockUserNums)
        option2.xAxis.data = data22
        // option2.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.grpBooking.sharePercentage.toFixed(0) + '%' + ')'
        // option2.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.grpBooking.rsvPercentage.toFixed(0) + '%' + ')'
        // option2.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.grpBooking.acptPercentage.toFixed(0) + '%' + ')'
        // option2.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.grpBooking.lockUserPercentage.toFixed(0) + '%' + ')'
        // console.log('拼团 option2', option2)
        // 3.砍价
        option3.series[0].data = data3
        // option3.series[0].data.push(res.data.data.inviteData.hackPrice.shareNums)
        // option3.series[0].data.push(res.data.data.inviteData.hackPrice.rsvNums)
        // option3.series[0].data.push(res.data.data.inviteData.hackPrice.acptNums)
        // option3.series[0].data.push(res.data.data.inviteData.hackPrice.lockUserNums)
        option3.xAxis.data = data33
        // option3.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.hackPrice.sharePercentage.toFixed(0) + '%' + ')'
        // option3.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.hackPrice.rsvPercentage.toFixed(0) + '%' + ')'
        // option3.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.hackPrice.acptPercentage.toFixed(0) + '%' + ')'
        // option3.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.hackPrice.lockUserPercentage.toFixed(0) + '%' + ')'
        // console.log('砍价 option3', option3)
        // 4.合伙人
        option4.series[0].data = data4
        // option4.series[0].data.push(res.data.data.inviteData.grlFrnd.shareNums)
        // option4.series[0].data.push(res.data.data.inviteData.grlFrnd.rsvNums)
        // option4.series[0].data.push(res.data.data.inviteData.grlFrnd.acptNums)
        // option4.series[0].data.push(res.data.data.inviteData.grlFrnd.lockUserNums)
        option4.xAxis.data = data44
        // option4.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.grlFrnd.sharePercentage.toFixed(0) + '%' + ')'
        // option4.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.grlFrnd.rsvPercentage.toFixed(0) + '%' + ')'
        // option4.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.grlFrnd.acptPercentage.toFixed(0) + '%' + ')'
        // option4.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.grlFrnd.lockUserPercentage.toFixed(0) + '%' + ')'
        // console.log('合伙人 option4', option4)
        // 5.消费返还
        option5.series[0].data = data5
        // option5.series[0].data.push(res.data.data.inviteData.csmReturn.shareNums)
        // option5.series[0].data.push(res.data.data.inviteData.csmReturn.rsvNums)
        // option5.series[0].data.push(res.data.data.inviteData.csmReturn.acptNums)
        // option5.series[0].data.push(res.data.data.inviteData.csmReturn.lockUserNums)
        option5.xAxis.data = data55
        // option5.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.csmReturn.sharePercentage.toFixed(0) + '%' + ')'
        // option5.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.csmReturn.rsvPercentage.toFixed(0) + '%' + ')'
        // option5.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.csmReturn.acptPercentage.toFixed(0) + '%' + ')'
        // option5.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.csmReturn.lockUserPercentage.toFixed(0) + '%' + ')'
        console.log('消费返还 option5', option5)
        // 6.免费请客
        option6.series[0].data = data6
        // option6.series[0].data.push(res.data.data.inviteData.freeHospitality.shareNums)
        // option6.series[0].data.push(res.data.data.inviteData.freeHospitality.rsvNums)
        // option6.series[0].data.push(res.data.data.inviteData.freeHospitality.acptNums)
        // option6.series[0].data.push(res.data.data.inviteData.freeHospitality.lockUserNums)
        option6.xAxis.data = data66
        // option6.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.freeHospitality.sharePercentage.toFixed(0) + '%' + ')'
        // option6.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.freeHospitality.rsvPercentage.toFixed(0) + '%' + ')'
        // option6.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.freeHospitality.acptPercentage.toFixed(0) + '%' + ')'
        // option6.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.freeHospitality.lockUserPercentage.toFixed(0) + '%' + ')'
        console.log('免费请客 option6', option6)
        // 指定人数
        console.log('指定人数', option7.series[0].data[0], '总接待人数', option7.series[0].data[1])
        // option7.series[0].data = data7
        option7.series[0].data[0].value = res.data.data.designatedRate.designatedNumber
        // 总接待人数
        option7.series[0].data[1].value = res.data.data.designatedRate.receptionNumber
        console.log('option7', option7)
        // 进行赋值
        barec1.setOption(option1, true) // 亲密付
        barec2.setOption(option2, true) // 拼团
        barec3.setOption(option3, true) // 砍价
        barec4.setOption(option4, true) // 合伙人
        barec5.setOption(option5, true) // 消费返还
        barec6.setOption(option6, true) // 免费请客
        // 如果第一次用完了 根据之前用选择的时间请求资源
        if (isstart1) {
          console.log('用户已经自己操作isstart1-日', isstart1)
          that.getStaffDesignatedRate()
        }
        // 不然第一次 单独请求本月的资源
        if (!isstart1) {
          console.log('用户还没自己操作isstart1-日', isstart1)
          barec7.setOption(option7, true)
          that.setData({
            designatedNumber: res.data.data.designatedRate.designatedNumber,
            receptionNumber: res.data.data.designatedRate.receptionNumber
          })
        }
      } else {
        that.setData({
          iscover: false
        })
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    })
  },
  // 今月统计+今月资源
  getCurrMonthStaffOrderStatistic() {
    let that = this
    let isstart = this.data.isstart
    that.setData({
      iscover: true,
    })
    getCurrMonthStaffOrderStatistic().then(res => {
      console.log('今月统计', res)
      if (res.data.code == 200) {
        that.setData({
          iscover: false,
        })
        that.setData({
          data: res.data.data
        })
        let data1 = [res.data.data.inviteData.intimacyPay.shareNums, res.data.data.inviteData.intimacyPay.rsvNums, res.data.data.inviteData.intimacyPay.acptNums, res.data.data.inviteData.intimacyPay.lockUserNums]
        let data2 = [res.data.data.inviteData.grpBooking.shareNums, res.data.data.inviteData.grpBooking.rsvNums, res.data.data.inviteData.grpBooking.acptNums, res.data.data.inviteData.grpBooking.lockUserNums]
        let data3 = [res.data.data.inviteData.hackPrice.shareNums, res.data.data.inviteData.hackPrice.rsvNums, res.data.data.inviteData.hackPrice.acptNums, res.data.data.inviteData.hackPrice.lockUserNums]
        let data4 = [res.data.data.inviteData.grlFrnd.shareNums, res.data.data.inviteData.grlFrnd.rsvNums, res.data.data.inviteData.grlFrnd.acptNums, res.data.data.inviteData.grlFrnd.lockUserNums]
        let data5 = [res.data.data.inviteData.csmReturn.shareNums, res.data.data.inviteData.csmReturn.rsvNums, res.data.data.inviteData.csmReturn.acptNums, res.data.data.inviteData.csmReturn.lockUserNums]
        let data6 = [res.data.data.inviteData.freeHospitality.shareNums, res.data.data.inviteData.freeHospitality.rsvNums, res.data.data.inviteData.freeHospitality.acptNums, res.data.data.inviteData.freeHospitality.lockUserNums]
        let data7 = [res.data.data.designatedRate.designatedNumber, res.data.data.designatedRate.receptionNumber]
        let data11 = ['分享' + '(' + res.data.data.inviteData.intimacyPay.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.intimacyPay.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.intimacyPay.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.intimacyPay.lockUserPercentage.toFixed(0) + '%' + ')']
        let data22 = ['分享' + '(' + res.data.data.inviteData.grpBooking.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.grpBooking.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.grpBooking.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.grpBooking.lockUserPercentage.toFixed(0) + '%' + ')']
        let data33 = ['分享' + '(' + res.data.data.inviteData.hackPrice.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.hackPrice.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.hackPrice.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.hackPrice.lockUserPercentage.toFixed(0) + '%' + ')']
        let data44 = ['分享' + '(' + res.data.data.inviteData.grlFrnd.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.grlFrnd.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.grlFrnd.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.grlFrnd.lockUserPercentage.toFixed(0) + '%' + ')']
        let data55 = ['分享' + '(' + res.data.data.inviteData.csmReturn.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.csmReturn.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.csmReturn.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.csmReturn.lockUserPercentage.toFixed(0) + '%' + ')']
        let data66 = ['分享' + '(' + res.data.data.inviteData.freeHospitality.sharePercentage.toFixed(0) + '%' + ')', '预约' + '(' + res.data.data.inviteData.freeHospitality.rsvPercentage.toFixed(0) + '%' + ')', '到店' + '(' + res.data.data.inviteData.freeHospitality.acptPercentage.toFixed(0) + '%' + ')', '锁客' + '(' + res.data.data.inviteData.freeHospitality.lockUserPercentage.toFixed(0) + '%' + ')']
        // 先清空 6个 option数据 人数+比例
        // option1.series[0].data = []
        // option1.xAxis.data = []
        // option2.series[0].data = []
        // option2.xAxis.data = []
        // option3.series[0].data = []
        // option3.xAxis.data = []
        // option4.series[0].data = []
        // option4.xAxis.data = []
        // option5.series[0].data = []
        // option5.xAxis.data = []
        // option6.series[0].data = []
        // option6.xAxis.data = []
        // console.log('清空option5', option5)
        // 1.亲密付 人数 || 比例
        option1.series[0].data = data1
        // option1.series[0].data.push(res.data.data.inviteData.intimacyPay.shareNums)
        // option1.series[0].data.push(res.data.data.inviteData.intimacyPay.rsvNums)
        // option1.series[0].data.push(res.data.data.inviteData.intimacyPay.acptNums)
        // option1.series[0].data.push(res.data.data.inviteData.intimacyPay.lockUserNums)
        // '分享', '预约', '到店', '锁客'
        option1.xAxis.data = data11
        // option1.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.intimacyPay.sharePercentage.toFixed(0) + '%' + ')'
        // option1.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.intimacyPay.rsvPercentage.toFixed(0) + '%' + ')'
        // option1.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.intimacyPay.acptPercentage.toFixed(0) + '%' + ')'
        // option1.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.intimacyPay.lockUserPercentage.toFixed(0) + '%' + ')'
        // console.log('亲密付 option1', option1)
        // 2.拼团
        option2.series[0].data = data2
        // option2.series[0].data.push(res.data.data.inviteData.grpBooking.shareNums)
        // option2.series[0].data.push(res.data.data.inviteData.grpBooking.rsvNums)
        // option2.series[0].data.push(res.data.data.inviteData.grpBooking.acptNums)
        // option2.series[0].data.push(res.data.data.inviteData.grpBooking.lockUserNums)
        option2.xAxis.data = data22
        // option2.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.grpBooking.sharePercentage.toFixed(0) + '%' + ')'
        // option2.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.grpBooking.rsvPercentage.toFixed(0) + '%' + ')'
        // option2.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.grpBooking.acptPercentage.toFixed(0) + '%' + ')'
        // option2.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.grpBooking.lockUserPercentage.toFixed(0) + '%' + ')'
        // console.log('拼团 option2', option2)
        // 3.砍价
        option3.series[0].data = data3
        // option3.series[0].data.push(res.data.data.inviteData.hackPrice.shareNums)
        // option3.series[0].data.push(res.data.data.inviteData.hackPrice.rsvNums)
        // option3.series[0].data.push(res.data.data.inviteData.hackPrice.acptNums)
        // option3.series[0].data.push(res.data.data.inviteData.hackPrice.lockUserNums)
        option3.xAxis.data = data33
        // option3.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.hackPrice.sharePercentage.toFixed(0) + '%' + ')'
        // option3.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.hackPrice.rsvPercentage.toFixed(0) + '%' + ')'
        // option3.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.hackPrice.acptPercentage.toFixed(0) + '%' + ')'
        // option3.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.hackPrice.lockUserPercentage.toFixed(0) + '%' + ')'
        // console.log('砍价 option3', option3)
        // 4.合伙人
        option4.series[0].data = data4
        // option4.series[0].data.push(res.data.data.inviteData.grlFrnd.shareNums)
        // option4.series[0].data.push(res.data.data.inviteData.grlFrnd.rsvNums)
        // option4.series[0].data.push(res.data.data.inviteData.grlFrnd.acptNums)
        // option4.series[0].data.push(res.data.data.inviteData.grlFrnd.lockUserNums)
        option4.xAxis.data = data44
        // option4.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.grlFrnd.sharePercentage.toFixed(0) + '%' + ')'
        // option4.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.grlFrnd.rsvPercentage.toFixed(0) + '%' + ')'
        // option4.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.grlFrnd.acptPercentage.toFixed(0) + '%' + ')'
        // option4.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.grlFrnd.lockUserPercentage.toFixed(0) + '%' + ')'
        // console.log('合伙人 option4', option4)
        // 5.消费返还
        option5.series[0].data = data5
        // option5.series[0].data.push(res.data.data.inviteData.csmReturn.shareNums)
        // option5.series[0].data.push(res.data.data.inviteData.csmReturn.rsvNums)
        // option5.series[0].data.push(res.data.data.inviteData.csmReturn.acptNums)
        // option5.series[0].data.push(res.data.data.inviteData.csmReturn.lockUserNums)
        option5.xAxis.data = data55
        // option5.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.csmReturn.sharePercentage.toFixed(0) + '%' + ')'
        // option5.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.csmReturn.rsvPercentage.toFixed(0) + '%' + ')'
        // option5.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.csmReturn.acptPercentage.toFixed(0) + '%' + ')'
        // option5.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.csmReturn.lockUserPercentage.toFixed(0) + '%' + ')'
        console.log('消费返还更新完 option5', option5)
        // 6.免费请客
        option6.series[0].data = data6
        // option6.series[0].data.push(res.data.data.inviteData.freeHospitality.shareNums)
        // option6.series[0].data.push(res.data.data.inviteData.freeHospitality.rsvNums)
        // option6.series[0].data.push(res.data.data.inviteData.freeHospitality.acptNums)
        // option6.series[0].data.push(res.data.data.inviteData.freeHospitality.lockUserNums)
        option6.xAxis.data = data66
        // option6.xAxis.data[0] = '分享' + '(' + res.data.data.inviteData.freeHospitality.sharePercentage.toFixed(0) + '%' + ')'
        // option6.xAxis.data[1] = '预约' + '(' + res.data.data.inviteData.freeHospitality.rsvPercentage.toFixed(0) + '%' + ')'
        // option6.xAxis.data[2] = '到店' + '(' + res.data.data.inviteData.freeHospitality.acptPercentage.toFixed(0) + '%' + ')'
        // option6.xAxis.data[3] = '锁客' + '(' + res.data.data.inviteData.freeHospitality.lockUserPercentage.toFixed(0) + '%' + ')'
        console.log('免费请客 option6', option6)
        // console.log('指定人数', option7.series[0].data[0], '总接待人数', option7.series[0].data[1])
        // option7.series[0].data = data7
        option7.series[0].data[0].value = res.data.data.designatedRate.designatedNumber
        // 总接待人数
        option7.series[0].data[1].value = res.data.data.designatedRate.receptionNumber

        // console.log('option7', option7)
        // 进行赋值
        barec1.setOption(option1, true) // 亲密付
        barec2.setOption(option2, true) // 拼团
        barec3.setOption(option3, true) // 砍价
        barec4.setOption(option4, true) // 合伙人
        barec5.setOption(option5, true) // 消费返还
        barec6.setOption(option6, true) // 免费请客
        // 如果第一次用完了 啥也不干
        if (isstart) {
          console.log('自己已经操作完-月isstart', isstart)
          // 今月资源
          that.getStaffDesignatedRate2()
        }
        // 第一次 单独请求本月的资源
        if (!isstart) {
          that.setData({
            designatedNumber: res.data.data.designatedRate.designatedNumber,
            receptionNumber: res.data.data.designatedRate.receptionNumber
          })
          console.log('自己尚未操作-月isstart', isstart)
          barec7.setOption(option7, true)

        }
      } else {
        that.setData({
          iscover: false,
        })
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    })
  },
  // 点击确定 || 取消(当日)
  tapDialogButton: function (e) {
    let that = this
    let startTime = this.data.startTime
    let endTime = this.data.endTime
    let params = {
      start: startTime,
      end: endTime,
    }
    console.log('开始时间', startTime, '结束时间', endTime)
    // 确定
    if (e.detail.index == 1) {
      // 请求单独的接口 资源价值的接口
      getStaffDesignatedRate(params).then(res => {
        console.log('接待人数指定人数', res)
        if (res.data.code == 200) {
          // 指定人数
          console.log('指定人数', option7.series[0].data[0], '总接待人数', option7.series[0].data[1])
          that.setData({
            designatedNumber: res.data.data.designatedRate.designatedNumber,
            receptionNumber: res.data.data.designatedRate.receptionNumber,
            isstart1: true
          })
          option7.series[0].data[0].value = res.data.data.designatedRate.designatedNumber
          // 总接待人数
          option7.series[0].data[1].value = res.data.data.designatedRate.receptionNumber
          console.log('option7', option7)
          barec7.setOption(option7, true)
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    }
    // 取消
    if (e.detail.index == 0) {}
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false // showE: true
    })
  },
  // 点击确定 || 取消(当月)
  tapDialogButton2: function (e) {
    let that = this
    let startTime2 = this.data.startTime2
    let endTime2 = this.data.endTime2
    let params = {
      start: startTime2,
      end: endTime2,
    }
    console.log('开始时间', startTime2, '结束时间', endTime2)
    // 确定
    if (e.detail.index == 1) {
      // 请求单独的接口 资源价值的接口
      getStaffDesignatedRate(params).then(res => {
        console.log('接待人数指定人数', res)
        if (res.data.code == 200) {
          // 指定人数
          console.log('指定人数', option7.series[0].data[0], '总接待人数', option7.series[0].data[1])
          that.setData({
            designatedNumber: res.data.data.designatedRate.designatedNumber,
            receptionNumber: res.data.data.designatedRate.receptionNumber,
            isstart: true
          })
          option7.series[0].data[0].value = res.data.data.designatedRate.designatedNumber
          // 总接待人数
          option7.series[0].data[1].value = res.data.data.designatedRate.receptionNumber
          console.log('option7', option7)
          barec7.setOption(option7, true)
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    }
    // 取消
    if (e.detail.index == 0) {}
    this.setData({
      dialogShow2: false,
      showOneButtonDialog2: false // showE: true
    })
  },


  // 点击打开时间选择器当日的 关闭echart
  openConfirm: function (e) {
    console.log('打开选择时间器', e)
    console.log('value1', this.data.value1)
    console.log('value2', this.data.value2)
    this.setData({
      dialogShow: true // showE: false
    })
  },
  // 点击打开时间选择器当月的 关闭echart
  openConfirm2: function (e) {
    console.log('打开选择时间器', e)
    console.log('value1', this.data.value1)
    console.log('value2', this.data.value2)
    this.setData({
      dialogShow2: true // showE: false
    })
  },

  // 今日资源 
  getStaffDesignatedRate: function () {
    let that = this
    let startTime = this.data.startTime
    let endTime = this.data.endTime
    let params = {
      start: startTime,
      end: endTime,
    }
    // 请求单独的接口 资源价值的接口
    getStaffDesignatedRate(params).then(res => {
      console.log('接待人数指定人数', res)
      if (res.data.code == 200) {
        // 指定人数
        console.log('指定人数', option7.series[0].data[0], '总接待人数', option7.series[0].data[1])
        that.setData({
          designatedNumber: res.data.data.designatedRate.designatedNumber,
          receptionNumber: res.data.data.designatedRate.receptionNumber,
          // showE: true
        })
        console.log('')
        option7.series[0].data[0].value = res.data.data.designatedRate.designatedNumber
        // 总接待人数
        option7.series[0].data[1].value = res.data.data.designatedRate.receptionNumber
        console.log('option7', option7)
        barec7.setOption(option7, true)
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message + ":" + res.data.code,
          duration: 2000
        })
      }
    })
  },
  // 今月资源
  getStaffDesignatedRate2: function () {
    let that = this
    let startTime2 = this.data.startTime2
    let endTime2 = this.data.endTime2
    let params = {
      start: startTime2,
      end: endTime2,
    }
    // 请求单独的接口 资源价值的接口
    getStaffDesignatedRate(params).then(res => {
      console.log('接待人数指定人数', res)
      if (res.data.code == 200) {
        // 指定人数
        console.log('指定人数', option7.series[0].data[0], '总接待人数', option7.series[0].data[1])
        that.setData({
          designatedNumber: res.data.data.designatedRate.designatedNumber,
          receptionNumber: res.data.data.designatedRate.receptionNumber,
          // showE: true
        })
        option7.series[0].data[0].value = res.data.data.designatedRate.designatedNumber
        // 总接待人数
        option7.series[0].data[1].value = res.data.data.designatedRate.receptionNumber
        console.log('option7', option7)
        barec7.setOption(option7, true)
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message + ":" + res.data.code,
          duration: 2000
        })
      }
    })
  },

  // 获取开始时间
  bindChange1(e) {
    const val = e.detail.value
    console.log(val)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
    let year = this.data.year //.toString()
    let month = this.data.month //.toString()
    let day = this.data.day //.toString()
    console.log('年', year, '月', month, '日', day)
    let startTime = year + '-' + month + '-' + day
    console.log('开始时间', startTime)
    this.setData({
      startTime: startTime
    })
  },
  // 获取开始时间
  bindChange11(e) {
    const val = e.detail.value
    console.log(val)
    this.setData({
      year2: this.data.years[val[0]],
      month2: this.data.months[val[1]],
      day2: this.data.days[val[2]]
    })
    let year2 = this.data.year2 //.toString()
    let month2 = this.data.month2 //.toString()
    let day2 = this.data.day2 //.toString()
    console.log('年', year2, '月', month2, '日', day2)
    let startTime2 = year2 + '-' + month2 + '-' + day2
    console.log('开始时间', startTime2)
    this.setData({
      startTime2: startTime2
    })
  },

  // 获取结束时间
  bindChange2(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
    let year = this.data.year
    let month = this.data.month
    let day = this.data.day // .toString()
    console.log('年', year, '月', month, '日', day)
    let endTime = year + '-' + month + '-' + day
    console.log('终止时间', endTime)
    this.setData({
      endTime: endTime
    })
  },
  // 获取结束时间
  bindChange22(e) {
    const val = e.detail.value
    this.setData({
      year2: this.data.years[val[0]],
      month2: this.data.months[val[1]],
      day2: this.data.days[val[2]]
    })
    let year2 = this.data.year2
    let month2 = this.data.month2
    let day2 = this.data.day2 // .toString()
    console.log('年', year2, '月', month2, '日', day2)
    let endTime2 = year2 + '-' + month2 + '-' + day2
    console.log('终止时间', endTime2)
    this.setData({
      endTime2: endTime2
    })
  },

  // 历史的分页
  getlist: function () {
    console.log('下拉')
    let date3 = new Date()
    let yearnow = date3.getFullYear(); // 获取当年
    let monthnow = date3.getMonth() + 1; // 获取当月
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    this.setData({
      isend: false, // 不显示暂无数据
      historyyear: yearnow, // 重新来当年
      historymonth: monthnow, // 重新来当月
      list: [], // 清空数组 
    })
    this.getStaffOrderStatistic()
  },
  // 历史统计
  getStaffOrderStatistic() {
    let that = this
    let historyyear = this.data.historyyear
    let historymonth = this.data.historymonth
    let size = this.data.size
    let isend = this.data.isend
    let params = {
      year: historyyear,
      month: historymonth,
      size: size
    }
    if (!isend) {
      console.log("加载更多")
      getStaffOrderStatistic(params).then(res => {
        console.log('历史统计分页', res)
        if (res.data.code == 200) {
          console.log("分页列表数据", res.data.data.statistics)
          console.log("下次要传的年月", res.data.data.year, res.data.data.month)
          if (res.data.data.statistics.length < size) {
            console.log("最后一页")
            that.setData({
              isend: true
            })
          } else {
            that.setData({
              isend: false
            })
          }
          // 保存显示的数组数据 和 下次要传递年和月
          let list = that.data.list.concat(res.data.data.statistics)
          that.setData({
            list: list,
            historyyear: res.data.data.year,
            historymonth: res.data.data.month
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
      })
    } else {
      console.log("不请求")
      return
    }
  }
})