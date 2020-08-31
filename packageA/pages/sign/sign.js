// let dd = new Date()
// let y = dd.getFullYear()
// let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1) // 获取当前月份的日期，不足10补0
// let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
import {
  getRoomStaffSignRcds, // 签到情况
  signIn, // 签到
  signOut // 签退
} from '../../../route/index/sign/sign'
import data from '../../../route/api/baseUrl'

Page({
  data: {
    webServerUrl: data.webServerUrl,
    // 今天日期
    today: {},
    belate: false, //是否迟到
    signOutEd: false, // 今日是否已签退
    signEd: false, // 今日是否已签到
    signData: null, // 后台总的签到记录
    roomStaffSignRcdDtos: [], // 签到的记录
    iscover: false // 是否打开遮罩层 
  },
  onLoad: function (options) {
    this.getrecord()
    this.fresh()
  },
  fresh: function () {
    let dd = new Date()
    let y = dd.getFullYear()
    let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1) // 获取当前月份的日期，不足10补0
    let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
    let today = {
      y,
      m,
      d,
      todayStr: y + '-' + m + '-' + d
    }
    this.setData({
      today: today
    })
  },
  onUnload: function () {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    // 调用列表页的获取数据函数
    beforePage.getLatestRoomCarouselBoard();
    console.log('销毁', beforePage)
  },
  // 获取签到记录
  getrecord: function () {
    let that = this
    let date = new Date
    let year = date.getFullYear();
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    console.log('年月', year, month)
    let params = {
      year: year,
      month: month
    }
    // 获取签到情况
    getRoomStaffSignRcds(params).then(res => {
      that.setData({
        iscover: true
      })
      if (res.data.code == 200) {
        that.setData({
          iscover: false
        })
        console.log('签到记录', res.data)
        // 本月的签到记录
        var roomStaffSignRcdDtos = res.data.data.roomStaffSignRcdDtos
        // 今天的年月日
        var todayStr = that.data.today.todayStr
        var signEd = false
        var signOutEd = false
        // 判断今天是否签到 || 签退
        console.log('被拆成六个数组之前', roomStaffSignRcdDtos)
        for (var i = 0; i < roomStaffSignRcdDtos.length; i++) {
          if (roomStaffSignRcdDtos[i].signInTime && roomStaffSignRcdDtos[i].signInTime.indexOf(todayStr) > -1) {
            if (roomStaffSignRcdDtos[i].signInStatus > -1) {
              signEd = true
            }
          }
          if (roomStaffSignRcdDtos[i].signOutTime && roomStaffSignRcdDtos[i].signOutTime.indexOf(todayStr) > -1) {
            console.log(roomStaffSignRcdDtos[i])
            if (roomStaffSignRcdDtos[i].signOutStatus > -1) {
              signOutEd = true
            }
          }
        }
        console.log('判断今天是否签到 || 签退', signEd, signOutEd)
        let arr = []
        // 拆成六个数组  0 7  7 15
        for (let i = 0; i < 42; i = i + 7) {
          let week = roomStaffSignRcdDtos.slice(i, i + 7)
          arr.push(week)
        }
        console.log('arr', arr)
        // 保存签到签退的值  签到的记录
        that.setData({
          signEd,
          signOutEd,
          roomStaffSignRcdDtos: arr,
          signData: res.data.data // 后台总的签到记录
        })
      } else if (res.data.code == 10004) {
        wx.showToast({
          icon: 'none',
          title: '没有此权限',
          duration: 2500,
          success: function () {
            let timer = setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
              clearTimeout(timer)
            }, 2000)
          }
        })
      } else {

        wx.showToast({
          icon: 'none',
          title: res.data.code + ':' + res.data.message,
          duration: 2000
        })
      }
    })
  },
  // 签到  (正常和迟到)
  onGosign() {
    // 先获取经纬度
    let that = this
    wx.getLocation({
      type: 'gcj02',
      // altitude: true,
      success(res) {
        console.log("经纬度", res)
        // 小程序坐标系转化称百度坐标系
        var lat = res.latitude
        var lng = res.longitude
        console.log(lat + "||latitude");
        console.log(lng + "||longitude");
        // wgs84转百度坐标系
        var ssws = that.wgs84togcj02(lng, lat)
        ssws = that.gcj02tobd09(ssws[0], ssws[1])
        //解决定位偏移
        var ssssss1 = ssws[1] - 0.000160
        var ssssss2 = ssws[0] - 0.000160
        ssssss1 = ssssss1.toFixed(6)
        ssssss2 = ssssss2.toFixed(6)
        console.log('经纬度', ssssss1, ssssss2)
        let params = {
          x: lng, // 经
          y: lat // 纬
        }
        // that.setData({
        //   params: params
        // })
        // 调用签到方法
        signIn(params).then(res => {
          // cover打开遮罩层
          that.setData({
            iscover: true
          })
          console.log(res)
          if (res.data.code == 200) {
            // cover关闭遮罩层
            that.setData({
              iscover: false
            })
            that.setData({
              signEd: true,
              signModal: true
            })

          } else if (res.data.code == 10004) {

          } else if (res.data.code == 10002) {
            // cover关闭遮罩层
            that.setData({
              iscover: false
            })
            wx.showToast({
              icon: 'none',
              title: '请在门店内签到',
            })
          } else {
            // cover关闭遮罩层
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
      fail(ex) {
        // cover关闭遮罩层
        that.setData({
          iscover: false
        })
        wx.showModal({
          title: '提示',
          content: '请按照提示打开位置权限',
          success() {
            wx.openSetting({
              complete: (res) => {},
            })
          }
        })
      }
    })
  },
  // 签退
  onGoSignOut() {
    // 先获取经纬度
    let that = this
    wx.getLocation({
      type: 'gcj02',
      // altitude: true,
      success(res) {
        console.log("经纬度", res)
        // 小程序坐标系转化称百度坐标系
        var lat = res.latitude
        var lng = res.longitude
        console.log(lat + "||latitude");
        console.log(lng + "||longitude");
        // wgs84转百度坐标系
        var ssws = that.wgs84togcj02(lng, lat)
        ssws = that.gcj02tobd09(ssws[0], ssws[1])
        //解决定位偏移
        var ssssss1 = ssws[1] - 0.000160
        var ssssss2 = ssws[0] - 0.000160
        console.log('经纬度', ssssss1, ssssss2)
        ssssss1 = ssssss1.toFixed(6)
        ssssss2 = ssssss2.toFixed(6)
        let params = {
          x: lng, // 经
          y: lat // 纬
        }
        that.setData({
          params: params
        })

        // 调用签到方法
        signOut(params).then(res => {
          // cover打开遮罩层
          that.setData({
            iscover: true
          })
          console.log(res)
          if (res.data.code == 200) {
            // cover关闭遮罩层
            that.setData({
              iscover: false
            })
            that.setData({
              signEd: true,
              signOutModal: true
            })
          } else if (res.data.code == 10004) {

          } else if (res.data.code == 10002) {
            // cover关闭遮罩层
            that.setData({
              iscover: false
            })
            wx.showToast({
              icon: 'none',
              title: '请在门店内签退',
            })
          } else {
            // cover关闭遮罩层
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
      fail(ex) {
        // cover关闭遮罩层
        that.setData({
          iscover: false
        })
        wx.showModal({
          title: '提示',
          content: '请按照提示打开位置权限',
          success() {
            wx.openSetting({
              complete: (res) => {},
            })
          }
        })
      }
    })
  },
  // 关闭提示窗 刷新数据
  close: function () {
    let that = this
    this.setData({
      signModal: false,
      signOutModal: false,
      SignLateModal: false
    })
    that.getrecord()
  },
  wgs84togcj02: function (lng, lat) {
    var that = this
    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    if (that.out_of_china(lng, lat)) {
      return [lng, lat]
    } else {
      var dlat = that.transformlat(lng - 105.0, lat - 35.0);
      var dlng = that.transformlng(lng - 105.0, lat - 35.0);
      var radlat = lat / 180.0 * PI;
      var magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      var sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
      var mglat = lat + dlat;
      var mglng = lng + dlng;
      return [mglng, mglat]
    }
  },
  gcj02tobd09: function (lng, lat) {
    var that = this
    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
  },
  transformlat: function (lng, lat) {
    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
  },
  transformlng: function (lng, lat) {
    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
  },
  out_of_china: function (lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
  }
})