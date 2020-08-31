//app.js
App({
  // getParams: function (a) {
  //   return wx.getStorageSync(a)
  // },
  onShow: function () {
    // 通过判断页面深度 来判断是否判断 因为wx.chooseimage底层会调用这个app.js
    // var pages = getCurrentPages();
    // if (pages.length == 0) {
    //   // let token = this.getParams('token');
    //   let token = wx.getStorageSync('token')
    //   console.log('打印token', token)
    //   if (token) {
    //     console.log("进入首页")
    //     wx.switchTab({
    //       url: '/pages/index/index/index'
    //     })
    //   } else {
    //     console.log("进入我的")
    //     wx.switchTab({
    //       url: '/pages/mine/index/index'
    //     })
    //   }
    // }

  },
  onLaunch: function () {
    let that = this
    // 通过判断页面深度 来判断是否判断 因为wx.chooseimage底层会调用这个app.js
    var pages = getCurrentPages();
    if (pages.length == 0) {
      let token = wx.getStorageSync('token')
      console.log('打印token', token)
      if (token) {
        that.globalData.isindex = true
      } else {
        that.globalData.isindex = false
      }
    }
    // 获取用户 iv fid 保存在全局对象
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getAuthKey: function (argument) {
    let that = this
    return new Promise(function (resolve, reject) {
      // 通过判断页面深度 来判断是否判断 因为wx.chooseimage底层会调用这个app.js
      let pages = getCurrentPages();
      if (pages.length == 0) {
        let token = wx.getStorageSync('token')
        console.log('打印token', token)
        if (token) {
          that.globalData.isindex = true;
          resolve(1)
        } else {
          console.log("进入我的")
          this.globalData.isindex = false
          reject(0)
        }
      }
    });
  },
  //设置全局请求URL
  globalData: {
    userInfo: null,
    code: "",
    isindex: false,
    URL: 'https://www.oyhdo.com',
  }
})