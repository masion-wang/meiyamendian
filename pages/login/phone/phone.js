import {
  getCode,
  getLogin,
  roomInfo // 获取门店图片
} from '../../../route/login/login'
import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    telphone: '', // 手机号
    phoneCaptcha: '', // 验证码 
    canTouch: true,
    seconds: 0, // 倒计时总计
    timer: '', // 计时器
    code: '', // wx.login 得到的code
    iv: '', // getPhoneNumber 得到的iv值   
    encryptedData: "", // getPhoneNumber 得到的encryptedData值
    encryptPhone: '', // 加密手机号(用来获取token)
    dialogShow: false, // 弹窗显示消失
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }], // 按钮
    items: [], // 公司名字
    admintype: "", // 管理者身份
    fid: '', // 管理者id
    uid: '', // 根据uid获取门店图片 
    roomtopimg: '' // 门店头像
  },
  onLoad: function () {
    let that = this
    // 看看有没有uid 
    wx.getStorage({
      key: 'uid',
      success(res) {
        console.log('门店uid', res.data)
        let uid = res.data
        let params = {
          uid: uid
        }
        roomInfo(params).then(res => {
          if (res.data.code == 200) {
            console.log('公司logo', res)
            that.setData({
              roomtopimg: res.data.data.roomBasicsDataDto.roomTopImg
            })
          }
        })
      }
    })
  },
  // 获取手机号
  getNumber: function (e) {
    // console.log('手机号',e)
    this.setData({
      telphone: e.detail.value.replace(/\s+/g, '')
    })
  },
  // 获取验证码
  getPhoneCaptcha: function (e) {
    this.setData({
      phoneCaptcha: e.detail.value.replace(/\s+/g, '') // 去除空格
    })
  },
  // 获取验证码 倒计时
  getCode: function () {
    let that = this
    let phone = this.data.telphone
    let params = {
      phone: phone
    }
    getCode(params).then(res => {
      console.log("请求验证码", res.data)
      if (res.data.code == "10002") {
        wx.showToast({
          icon: 'none',
          title: '请输入正确手机号',
        })
        return
      } else if (res.data.code == "10021") {
        wx.showToast({
          icon: 'none',
          title: '该手机号不存在 请在后台录入',
        })
        return
      } else if (res.data.code == "10003") {
        wx.showToast({
          icon: 'none',
          title: '服务器超时',
        })
        return
      } else if (res.data.code == "500") {
        wx.showToast({
          icon: 'none',
          title: '后台错误',
        })
        return
      } else {
        that.setData({
          canTouch: false
        })
        that.setData({
          seconds: 60,
          timer: setInterval(function () {
            let seconds = that.data.seconds
            that.setData({
              seconds: seconds - 1
            })
            if (that.data.seconds == 0) {
              that.setData({
                canTouch: true
              })
              // 读秒结束 清空计时器
              clearInterval(that.data.timer)
            }
          }, 1000)
        })
      }
    })
  },
  // 手机号登录
  loginByPhone: function () {
    let that = this
    // 获取手机号 验证码
    let phone = this.data.telphone
    let phoneCaptcha = this.data.phoneCaptcha
    let params = {
      adminType: -1, // 第一次暂无身份
      fid: -1, // 第一次暂无身份
      phone: phone,
      phoneCaptcha: phoneCaptcha
    }
    // 手机号登录请求
    getLogin(params).then(res => {
      console.log("手机号登录请求", res.data)
      // 情况一 手机号不存在
      if (res.data.code == "10021") {
        wx.showToast({
          icon: 'none',
          title: '手机号不存在',
        })
      }
      // 情况二 验证码不正确
      if (res.data.code == "10002") {
        console.log(1111)
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
      // 情况三 只有一家公司 登陆成功
      else if (res.data.code == 200) {
        // 获取 保存token 进入首页
        console.log("只有一家公司 登陆成功", res.data.data)
        let token = res.data.data.token
        wx.setStorageSync('token', token)
        wx.reLaunch({
          url: '/pages/login/getuserinfo/getuserinfo',
        })
        // wx.switchTab({
        //   url: '/pages/index/index/index'
        // })

      }
      // 情况四 有多个公司 登录成功
      else if (res.data.code == 10022) {
        console.log("手机请求 有多个公司", res.data.data)
        console.log("多个公司情况", res.data.data.sysUsers)
        that.setData({
          items: res.data.data.sysUsers
        })
        // 打开弹窗用户选择
        that.openConfirm()
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 选择公司 获取admintype fid 
  getFidAndSdminType: function (e) {
    console.log('获取admintype和fid值', e)
    console.log('adminType值', e.currentTarget.dataset.admintype)
    console.log('fid值：', e.currentTarget.dataset.fid)
    this.setData({
      admintype: e.currentTarget.dataset.admintype,
      fid: e.currentTarget.dataset.fid
    })
  },
  // 确定登陆
  tapDialogButton: function (e) {
    let that = this
    // 点击确定
    if (e.detail.index == 1) {
      let fid = that.data.fid
      let adminType = that.data.admintype
      let phoneCaptcha = that.data.phoneCaptcha
      let phone = that.data.telphone
      let params = {
        fid: fid,
        adminType: adminType,
        phoneCaptcha: phoneCaptcha,
        phone: phone
      }
      // 手机号登录
      getLogin(params).then(res => {
        console.log("获取token", res.data.data)
        // 获取保存token 进入首页
        let token = res.data.data.token
        wx.setStorageSync('token', token)
        wx.reLaunch({
          url: '/pages/login/getuserinfo/getuserinfo',
        })
        // wx.switchTab({
        //   url: '/pages/index/index/index'
        // })
      })
    }
    // 关闭弹窗
    else {
      this.setData({
        dialogShow: false,
      })
    }
  },
  // 打开弹窗
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  }
})