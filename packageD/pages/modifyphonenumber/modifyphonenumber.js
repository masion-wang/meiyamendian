import {
  sendModifyPhonePhoneCaptcha, // 获取旧手机验证码
  validationModifyPhonePhoneCaptcha, // 校验旧手机号验证码
  sendNewPhoneModifyCaptcha, // 获取新的手机号的验证码
  modifySelfPhone // 带着新手机号 验证码 旧手机的加密信息 过去
} from '../../../route/mine/modifyphonenumber/modifyphonenumber'
import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl:data.webServerUrl,
    oldphone: '', // 旧手机号
    issend: false, // 是否发送旧手机
    phoneCaptcha: '', // 旧手机验证码
    encryptPhone: '', // 旧手机的加密信息
    isvoid: true, // 旧手机校验确定按钮
    isoldphoneok: false, // 是否换成新的手机号界面
    keep: false,
    newPhone: '', // 新的手机号
    isnewphoneok: false,
    newPhoneCaptcha: '', // 新手机号验证码
    // 两个互不相干的定时器
    canTouch: true, // 是否点击
    seconds: 0, // 倒计时总计
    timer: '', // 计时器
    canTouch2: true, // 是否点击
    seconds2: 0, // 倒计时总计
    timer2: '', // 计时器
  },

  onLoad: function (options) {
    let oldphone = options.oldphone
    this.setData({
      oldphone: oldphone
    })
  },
  // 获取验证码 倒计时
  getCode: function () {
    let that = this
    // 不可触碰
    that.setData({
      canTouch: false
    })
    // 倒计时逻辑
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
    // 获取旧手机的验证码
    this.sendModifyPhonePhoneCaptcha()
  },
  getCode2: function () {
    // 判断新的手机号有误 正则？？？
    let newPhone = this.data.newPhone
    if (newPhone == '') {
      wx.showToast({
        icon: 'none',
        title: '请先输入新的手机号'
      })
      return
    }
    // 交互样式
    let that = this
    // 不可触碰
    that.setData({
      canTouch2: false
    })
    // 倒计时逻辑
    that.setData({
      seconds2: 60,
      timer2: setInterval(function () {
        let seconds2 = that.data.seconds2
        that.setData({
          seconds2: seconds2 - 1
        })
        if (that.data.seconds2 == 0) {
          that.setData({
            canTouch2: true
          })
          // 读秒结束 清空计时器
          clearInterval(that.data.timer2)
        }
      }, 1000)
    })
    // 获取新手机的验证码
    this.sendNewPhoneModifyCaptcha()
  },
  // 获取旧手机的验证码
  sendModifyPhonePhoneCaptcha: function () {
    let that = this
    let params = {
      phone: that.data.oldphone
    }
    sendModifyPhonePhoneCaptcha(params).then(res => {

      if (res.data.code == 200) {
        console.log('获取旧手机验证码成功', res)
        that.setData({
          issend: true
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 校验旧的手机获取加密信息
  validationModifyPhonePhoneCaptcha: function () {
    let that = this
    let phoneCaptcha = this.data.phoneCaptcha
    let params = {
      phoneCaptcha: phoneCaptcha
    }
    validationModifyPhonePhoneCaptcha(params).then(res => {
      if (res.data.code == 200) {
        console.log('获取加密信息成功', res)
        that.setData({
          encryptPhone: res.data.data.encryptPhone,
          isvoid: false,
          isoldphoneok: true
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '验证码错误 请重新输入'
        })
      }
    })
  },
  // 获取新的手机号验证码
  sendNewPhoneModifyCaptcha: function () {
    let phone = this.data.newPhone
    let params = {
      phone: phone
    }
    sendNewPhoneModifyCaptcha(params).then(res => {
      if (res.data.code == 200) {
        console.log('获取新的手机的验证码成功', res)
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 修改新的手机号
  modifySelfPhone: function () {
    let that = this
    // 限制一下
    if (this.data.newPhone == '' || this.data.newPhoneCaptcha == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号和验证码',
      })
      return
    }
    let params = {
      encryptPhone: this.data.encryptPhone,
      newPhone: this.data.newPhone,
      newPhoneCaptcha: this.data.newPhoneCaptcha
    }
    modifySelfPhone(params).then(res => {
      if (res.data.code == 200) {
        console.log('修改成功', res)
        that.setData({
          isoldphoneok: false,
          isnewphoneok: true,
          keep: true
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 获取旧手机验证码
  getphoneCaptcha: function (e) {
    console.log('e', e.detail.value)
    this.setData({
      phoneCaptcha: e.detail.value
    })
  },
  // 获取新的手机号
  getnewphone: function (e) {
    console.log('e', e.detail.value)
    this.setData({
      newPhone: e.detail.value
    })
  },
  // 获取新手机号验证码
  getnewphonecode: function (e) {
    console.log('e', e.detail.value)
    this.setData({
      newPhoneCaptcha: e.detail.value
    })
  }
})