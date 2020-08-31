const date = new Date()
let yearnow = date.getFullYear(); //获取完整的年份(4位)
let monthnow = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
let daynow = date.getDate() // (1-31)
let valuecurrent = [999, monthnow - 1, daynow - 1]
if (monthnow < 10) {
  monthnow = '0' + monthnow
}
if (daynow < 10) {
  daynow = '0' + daynow
}
let currentTime = yearnow + '-' + monthnow + '-' + daynow
console.log('今日日期', currentTime)
Component({
  properties: {
    date: {
      type: null,
      value: new Date()
    },
    rsvTmps: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {}
    },
    currentMonth: {
      type: String,
      value: '',
      observer(newVal, oldVal) {}
    },
    selected: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {
        console.log(newVal)
        // this.getWeek(new Date())
      }
    },
    isOpen: {
      type: Boolean,
      value: true,
    }
  },
  data: {
    calShow: true, // 日历组件是否打开
    dateShow: false, // 日期是否选择
    selectDay: '', // 当前选择日期
    canlender: { // 当前日历内容数据
      "weeks": []
    },
    yearnow: yearnow,
    monthnow: monthnow,
    daynow: daynow,
  },
  ready() {
    if (this.data.isOpen) {
      this.setData({
        calShow: false,
        dateShow: true
      })
    }


  },
  methods: {
    // 获取日历内容
    getWeek(dateData) {
      console.log("getWeek当前日期1", dateData)
      let selected = this.data.selected
      let a = new Date()
      // console.log("im date ", a, typeof a === 'object')
      // 判断当前是 安卓还是ios ，传入不容的日期格式
      if (typeof dateData !== 'object') {
        dateData = dateData.replace(/-/g, "/")
      }
      // console.log("getWeek当前日期2",dateData)
      let _date = new Date(dateData);
      let year = _date.getFullYear(); //年
      let month = _date.getMonth() + 1; //月
      let date = _date.getDate(); //日
      let day = _date.getDay(); // 天
      let canlender = [];
      // console.log(selected)
      let dates = {
        firstDay: new Date(year, month - 1, 1).getDay(),
        lastMonthDays: [], // 上个月末尾几天
        currentMonthDys: [], // 本月天数
        nextMonthDays: [], // 下个月开始几天
        endDay: new Date(year, month, 0).getDay(),
        weeks: []
      }
      // 循环上个月末尾几天添加到数组
      for (let i = dates.firstDay; i > 0; i--) {
        dates.lastMonthDays.push({
          'date': new Date(year, month, -i).getDate() + '',
          'month': month - 1
        })
      }
      // 循环本月天数添加到数组
      for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
        let have = false;
        for (let j = 0; j < selected.length; j++) {
          let selDate = selected[j].date.split('-');
          if (Number(year) === Number(selDate[0]) && Number(month) === Number(selDate[1]) && Number(i) === Number(selDate[2])) {
            have = true;
          }
        }
        dates.currentMonthDys.push({
          'date': i + "",
          'month': month,
          have
        })
      }
      // 循环下个月开始几天 添加到数组
      for (let i = 1; i < 7 - dates.endDay; i++) {
        dates.nextMonthDays.push({
          'date': i + '',
          'month': month + 1
        })
      }
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays)
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (let i = 0; i < canlender.length; i++) {
        if (i % 7 == 0) {
          dates.weeks[parseInt(i / 7)] = new Array(7);
        }
        dates.weeks[parseInt(i / 7)][i % 7] = canlender[i]
      }


      // 渲染数据
      this.setData({
        selectDay: month + "月" + date + "日",
        "canlender.weeks": dates.weeks,
        'canlender.month': month,
        'canlender.date': date,
        "canlender.day": day,
        'canlender.year': year,
      })
      month = month < 10 ? "0" + month : month
      date = date < 10 ? "0" + date : date
      this.triggerEvent('getdate', {
        year,
        month,
        date,
        day
      })
    },
    // 清空样式
    componentInnerFunction: function () {
      console.log('清空样式', this.data.rsvTmps);
      let arr = this.data.rsvTmps
      for (let item of arr) {
        console.log('item', item)
        for (let sonitem of item) {
          console.log('sonitem', sonitem)
          sonitem.selected = false
        }
      }
      this.setData({
        rsvTmps: arr
      })
    },
    // 点击日期
    selectDay(e) {
      console.log('该日期', e)
      // 1.如果已经关闭 不能操作
      let isclose = e.currentTarget.dataset.isclose
      let isoverninety = e.currentTarget.dataset.isoverninety
      let month = e.currentTarget.dataset.month
      let day = e.currentTarget.dataset.day
      let currentMonth = this.data.currentMonth

      // let nine = e.currentTarget.dataset.nine

      // 超过90天 啥也干不了
      if (isoverninety) {
        return
      }
      // 已经关闭 啥也干不了
      if (isclose) {
        return
      }
      // 非本月 啥也干不了
      if (currentMonth != month) {
        return
      }
      // 当月之前日期 啥也干不了
      if (monthnow == month && day < daynow) {
        return
      }
      let rsvTmps = this.data.rsvTmps
      let weekindex = e.currentTarget.dataset.weekindex
      let index = e.currentTarget.dataset.index
      let obj = {
        year: e.currentTarget.dataset.year,
        month: e.currentTarget.dataset.month,
        day: e.currentTarget.dataset.day,
        selected: !e.currentTarget.dataset.selected
      }
      // 改变交互样式
      rsvTmps[weekindex][index].selected = !rsvTmps[weekindex][index].selected
      this.setData({
        rsvTmps: rsvTmps
      })
      // 不仅仅仅是传参 带着一个删除条件
      this.triggerEvent('selectDay', obj)
    },
    // 取消
    cancel(e) {
      this.setData({
        rsvTmps: []
      })
    },

















    // 确定
    // packup() {
    //   // console.log("数据结构",this.data.canlender)
    //   let self = this;
    //   if (this.data.isOpen) {
    //     let year = self.data.canlender.year + "-" + self.data.canlender.month + "-" + self.data.canlender.date
    //     let _date = self.getDate(year, 0);
    //     console.log("year", year)
    //     console.log("_date", _date)
    //     self.getWeek(_date);
    //     return
    //   }
    //   self.setData({
    //     dateShow: false // 当前日期是否选择 ？？？
    //   }, () => {
    //     setTimeout(() => {
    //       self.setData({
    //         calShow: true // ???
    //       }, () => {
    //         let year = self.data.canlender.year + "-" + self.data.canlender.month + "-" + self.data.canlender.date
    //         let _date = self.getDate(year, 0);
    //         self.getWeek(_date);
    //         // 下面告诉日历是否打开
    //         self.triggerEvent('select', {
    //           ischeck: !self.data.calShow
    //         })
    //       })
    //     }, 300)
    //   })
    // },
















    // 时间计算
    getDate(date, AddDayCount, str = 'day') {
      if (typeof date !== 'object') {
        date = date.replace(/-/g, "/")
      }
      let dd = new Date(date)
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
          break;
        case 'month':
          dd.setMonth(dd.getMonth() + AddDayCount) // 获取AddDayCount天后的日期
          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount) // 获取AddDayCount天后的日期
          break;
      }
      let y = dd.getFullYear()
      let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1) // 获取当前月份的日期，不足10补0
      let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
      return y + '-' + m + '-' + d
    },

































    // 返回今天
    backtoday() {
      this.getWeek(new Date());
    },
    // 暂时用不上 (前一天 后一天)
    dataBefor(e) {
      let num = 0;
      let types = e.currentTarget.dataset.type
      if (e.currentTarget.dataset.id === "0") {
        num = -1;
      } else {
        num = 1
      }
      let year = this.data.canlender.year + "-" + this.data.canlender.month + "-" + this.data.canlender.date
      let _date = this.getDate(year, num, types === 'month' ? "month" : "day");
      this.getWeek(_date);
    },
    // 暂时用不上
    // dateSelection() {
    //   if (this.data.isOpen) {
    //     return
    //   }
    //   let self = this;
    //   if (self.data.calShow) {
    //     self.setData({
    //       calShow: false
    //     }, () => {
    //       setTimeout(() => {
    //         self.setData({
    //           dateShow: true
    //         }, () => {
    //           self.triggerEvent('select', {
    //             ischeck: !self.data.calShow
    //           })
    //         })
    //       }, 100)
    //     })
    //   } else {
    //     self.setData({
    //       dateShow: false
    //     }, () => {
    //       setTimeout(() => {
    //         self.setData({
    //           calShow: true
    //         }, () => {
    //           self.triggerEvent('select', {
    //             ischeck: !self.data.calShow
    //           })
    //         })
    //       }, 300)
    //     })
    //   }

    // }
  }
})