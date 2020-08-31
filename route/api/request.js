export const GET = function (url, params) {
  console.log("url", url)
  // 获取token
  const token = wx.getStorageSync('token') || ''
  console.log('url', url)
  wx.showLoading({
    title: '加载中...'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: {
        ...params,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'sys_user_token': token
      },
      success(res) {
        resolve(res)
        if (res.data.code == 200) {

        }
        // 1.没有权限
        if (res.data.code == 10004) {
          wx.showToast({
            title: '没有此权限',
            icon: 'none',
            duration: 2500
          })
        }
        // 1.没有token
        if (res.data.code == 10034) {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
            duration: 2000
          })
        }
        // 2.过期token
        if (res.data.code == 10003) {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
            duration: 2000,
            success: function () {
              let timer =  setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/mine/index/index',
                  })
                  clearTimeout(timer)
                }, 2000)
            }
          })

        }
        // 3.离职
        if (res.data.code == 10026) {
          wx.showToast({
            icon: 'none',
            title: '您已离职',
            duration: 2000,
            success: function () {
              let timer =   setTimeout(() => {
                wx.switchTab({
                  url: '/pages/mine/index/index',
                })
                clearTimeout(timer)
              }, 2000)
            }
          })
        }
        // 其它
        // else {
        //   wx.showToast({
        //     icon: 'none',
        //     title: res.data.message,
        //     duration: 2000
        //   })
        // }
      },
      fail(error) {
        reject(error)
        // 失败原因
        wx.getNetworkType({
          success: (result) => {
            console.log('xhxhxhhh', result)
            if (result.networkType == 'none' || result.networkType == 'unknown') {
              wx.showToast({
                title: '网络连接失败，请检查您的网络设置。',
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '数据请求失败,请稍后重试。',
                icon: 'none',
                duration: 2000
              })
            }
          },
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}

export const POST = function (url, params) {
  const token = wx.getStorageSync('token') || ''
  wx.showLoading({
    title: '加载中...'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: {
        ...params,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'sys_user_token': token
      },
      success(res) {
        resolve(res)
        // 没有权限
        if (res.data.code == 10004) {
          wx.showToast({
            title: '没有此权限',
            icon: 'none',
            duration: 2500
          })
        }
        if (res.data.code == 200) {

        }
        // 1.没有token
        if (res.data.code == 10034) {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
            duration: 2000
          })
        }
        // 2.过期token
        if (res.data.code == 10003) {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
            duration: 2000,
            success: function () {
              let timer =   setTimeout(() => {
                wx.switchTab({
                  url: '/pages/mine/index/index',
                })
                clearTimeout(timer)
              }, 2000)
            }
          })

        }
        // 3.离职token
        if (res.data.code == 10026) {
          wx.showToast({
            icon: 'none',
            title: '您已离职',
            duration: 2000,
            success: function () {
              let timer =  setTimeout(() => {
                wx.switchTab({
                  url: '/pages/mine/index/index',
                })
                clearTimeout(timer)
              }, 2000)
            }
          })
        }
        // 其它 
        // else {
        //   wx.showToast({
        //     icon: 'none',
        //     title: res.data.message,
        //     duration: 2000
        //   })
        // }
      },
      fail(error) {
        reject(error)
        // wx.showToast({
        //   icon: 'none',
        //   title: '数据请求失败 请稍后重试'
        // })
        // 失败原因
        wx.getNetworkType({
          success: (result) => {
            console.log('xhxhxhhh', result)
            if (result.networkType == 'none' || result.networkType == 'unknown') {
              wx.showToast({
                title: '网络连接失败，请检查您的网络设置。',
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '数据请求失败,请稍后重试。',
                icon: 'none',
                duration: 2000
              })
            }
          },
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}