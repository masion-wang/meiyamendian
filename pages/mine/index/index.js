const app = getApp()
import data from '../../../route/api/baseUrl'
import {
  getSelfRoomStaffBaseInfo, // 员工的信息
  selfSmallAreaUserInfo, // 小区的信息
  selfBigAreaUserInfo, // 大区的信息
  selfShareHolderInfo, // 股东的信息 包含认证 收益情况
  getSelfBasicsData // 门店代码6个
} from '../../../route/mine/index/index'
import {
  getSelfMySysUserInfo // 获取 admintypeindex 身份
} from '../../../route/mine/myteam/myteam'
import {
  selfPermissions // 判断权限有无
} from '../../../route/admin/admin'
// 微信登录
import {
  weixinLogin
} from '../../../route/login/login'

Page({
  data: {
    webServerUrl: data.webServerUrl,
    roomStaffBaseDto: {}, // 员工
    smallAreaDto: {}, // 小区
    bigAreaDto: {}, // 大区   
    shareHolder: {}, // 股东 
    admintypeindex: 0, // 此人的身份表示 
    roomcode: 0, // 门店编号
    ///////////////////////登录页转过来的///////////////////////////////
    code: '', // code
    iv: '', // getPhoneNumber 得到的iv值   
    encryptedData: "", // getPhoneNumber 得到的encryptedData值
    fid: '', // 管理者id
    encryptPhone: '', // 加密手机号(用来获取token)
    dialogShow: false, // 弹窗显示消失
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }], // 按钮
    multipleCompanies: [], // 多家公司信息
  },
  onLoad: function (options) {
    wx.hideLoading()
    console.log('进入我的模块', app)
    let token = wx.getStorageSync('token')
    console.log('打印token', token)
    if (token) {
      wx.switchTab({
        url: '/pages/index/index/index'
      })
    }
  },
  // 微信登录 获取 iv + encryptedData + code 判断登录几种情况
  getPhoneNumber: function (e) {
    let that = this
    let code = that.data.code
    console.log("iv值", e.detail.iv)
    console.log("encryptedData值", e.detail.encryptedData)
    let params = {
      encryptPhone: "",
      code: code,
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData
    }
    console.log('params', params)
    weixinLogin(params).then(res => {
      console.log('微信请求', res.data)
      // 情况一 有一家公司 
      if (res.data.code == 200) {
        console.log("微信请求 有一家公司", res)
        // 获取 保存token 进入首页
        let token = res.data.data.token
        wx.setStorageSync('token', token)
        that.getSelfMySysUserInfo()
        wx.reLaunch({
          url: '/pages/login/getuserinfo/getuserinfo',
        })

      }
      // 情况二 有多家公司
      else if (res.data.code == 10022) {
        console.log("微信请求 有多家公司")
        // 先获取encryptPhone
        that.setData({
          encryptPhone: res.data.data.encryptPhone
        })
        console.log("encryptPhone值", res.data.data.encryptPhone)
        console.log("多个公司情况", res.data.data.sysUsers)
        that.setData({
          multipleCompanies: res.data.data.sysUsers
        })
        // 打开弹窗
        that.openConfirm()
      } else if (res.data.code == 10021) {
        wx.navigateTo({
          url: '/pages/login/phone/phone',
        })

      } else if (res.data.code == 10002) {
        wx.navigateTo({
          url: '/pages/login/phone/phone',
        })
      } else if (res.data.code == 500) {
        wx.navigateTo({
          url: '/pages/login/phone/phone',
        })
      } else {
        wx.navigateTo({
          url: '/pages/login/phone/phone',
        })
      }
    })
  },
  // 判断此人身份 刷新数据
  onShow: function () {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
        } else {
          console.log('wx.login登录失败！' + res.errMsg)
        }
      },
    })
    getSelfMySysUserInfo().then(res => {
      // 用户所属类型 1 总部平台 2 公司 3 大区经理 4 小区经理 5 股东 6 门店员工
      // 判断此人是 6 员工 小区 大区
      if (res.data.code == 200) {
        console.log('权限级别', res)
        that.setData({
          admintypeindex: res.data.data.sysUser.adminType
        })
        // 获取身份标识
        let admintypeindex = that.data.admintypeindex
        // 员工 6
        if (admintypeindex == 6) {
          // 员工信息 
          that.getSelfRoomStaffBaseInfo()
          // 门店编号
          getSelfBasicsData().then(res => {
            if (res.data.code == 200) {
              console.log('门店编号', res)
              that.setData({
                roomcode: res.data.data.roomBasicsDataDto.roomCode
              })
            }
          })
        }
        // 小区 4
        if (admintypeindex == 4) {
          that.selfSmallAreaUserInfo()
        }
        // 大区 3
        if (admintypeindex == 3) {
          that.selfBigAreaUserInfo()
        }
        // 股东 5
        if (admintypeindex == 5) {
          that.selfShareHolderInfo()
        }
      }
    })
  },
  // 获取此人身份 刷新数据
  getSelfMySysUserInfo: function () {
    let that = this
    getSelfMySysUserInfo().then(res => {
      // 用户所属类型
      // 1 总部平台 2 公司 3 大区经理
      // 4 小区经理 5 股东 6 门店员工
      // 判断此人是 6 员工 小区 大区
      if (res.data.code == 200) {
        console.log('权限级别', res)
        that.setData({
          admintypeindex: res.data.data.sysUser.adminType
        })
        // 获取身份标识
        let admintypeindex = that.data.admintypeindex
        // 员工 6
        if (admintypeindex == 6) {
          // 员工信息 
          that.getSelfRoomStaffBaseInfo()
          // 门店编号
          getSelfBasicsData().then(res => {
            if (res.data.code == 200) {
              console.log('门店编号', res)
              that.setData({
                roomcode: res.data.data.roomBasicsDataDto.roomCode
              })
            }
          })
        }
        // 小区 4
        if (admintypeindex == 4) {
          that.selfSmallAreaUserInfo()
        }
        // 大区 3
        if (admintypeindex == 3) {
          that.selfBigAreaUserInfo()
        }
        // 股东 5
        if (admintypeindex == 5) {
          that.selfShareHolderInfo()
        }
      }
    })
  },
  // 员工 6
  getSelfRoomStaffBaseInfo: function () {
    let that = this
    getSelfRoomStaffBaseInfo().then(res => {
      console.log('获取我的员工信息', res.data)
      that.setData({
        roomStaffBaseDto: res.data.data.roomStaffBaseDto
      })
    })
  },
  // 小区 4
  selfSmallAreaUserInfo: function () {
    let that = this
    selfSmallAreaUserInfo().then(res => {
      console.log('获取小区信息', res.data)
      that.setData({
        smallAreaDto: res.data.data.smallAreaDto
      })
    })
  },
  // 大区 3
  selfBigAreaUserInfo: function () {
    let that = this
    selfBigAreaUserInfo().then(res => {
      console.log('获取大区信息', res.data)
      that.setData({
        bigAreaDto: res.data.data.bigAreaDto
      })
    })
  },
  // 股东 5
  selfShareHolderInfo: function () {
    let that = this
    selfShareHolderInfo().then(res => {
      console.log('获取股东信息', res)
      that.setData({
        shareHolder: res.data.data.shareHolder
      })
    })
  },
  // 我的收益
  tomyearings: function () {
    let admintypeindex = this.data.admintypeindex
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:earnings' && admintypeindex != 3 && admintypeindex != 4) {
            go = true
            wx.navigateTo({
              url: '/packageD/pages/myearnings/myearning/myearning',
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 我的成长
  togrowings: function () {
    let admintypeindex = this.data.admintypeindex
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          // && admintypeindex != 3 && admintypeindex != 4 && 
          if (arr[i].pval == 'my:home:growUp' && admintypeindex != 5) {
            go = true
            wx.navigateTo({
              url: '/packageD/pages/growings/growing/growing',
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 信用分
  tomycredits: function () {
    let admintypeindex = this.data.admintypeindex
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:creditScore' && admintypeindex != 3 && admintypeindex != 4 && admintypeindex != 5) {
            go = true
            wx.navigateTo({
              url: '/packageD/pages/mycredits/mycredit/mycredit',
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 合伙人邀请码
  toinvitecode: function () {
    let admintypeindex = this.data.admintypeindex
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:numCode' && admintypeindex != 3 && admintypeindex != 4 && admintypeindex != 5) {
            go = true
            wx.navigateTo({
              url: '/packageD/pages/invitecode/invitecode',
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 个人信息
  tomineprofile: function () {
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:oneselfData') {
            go = true
            wx.navigateTo({
              url: '/packageD/pages/mineprofile/mineprofile',
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 经营数据
  tooperatingdatas: function () {
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:businessData') {
            go = true
            wx.navigateTo({
              url: '/pages/mine/nooperatingdatas/nooperatingdatas',
            })
            // wx.navigateTo({
            //   url: '/packageD/pages/operatingdatas/operatingdata/operatingdata',
            // })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 我的团队
  tomyteams: function () {
    let admintypeindex = this.data.admintypeindex
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:myTeam' && admintypeindex != 5) {
            go = true
            wx.navigateTo({
              url: '/packageD/pages/myteams/myteam/myteam',
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // KPI考核
  tokpis: function () {
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:kpi') {
            go = true
            wx.navigateTo({
              url: '/packageD/pages/kpis/kpi/kpi',
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 心声社区
  tosocialtalks: function () {
    let go = false
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有
          if (arr[i].pval == 'my:home:community') {
            go = true
            wx.navigateTo({
              url: '/packageD/pages/socialtalks/socialtalk/socialtalk'
            })
            break
          }
        }
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })

  },
  // 拨打技术电话
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: '400-6336-010'
    })
  },
  // 选择完多家公司然后确定登陆  
  tapDialogButton: function (e) {
    let that = this
    console.log('dialog', e.detail)
    console.log('dialog', e.detail.index)
    // 点击确定
    if (e.detail.index == 1) {
      let fid = that.data.fid
      let adminType = that.data.admintype
      let encryptPhone = that.data.encryptPhone
      let params = {
        fid: fid,
        adminType: adminType,
        encryptPhone: encryptPhone
      }
      if (adminType == "") {
        // 后台判断code和token过期重复 导致前端被逼做了一个安全性不高的拦截
        wx.showToast({
          icon: 'none',
          title: '请选择公司',
        })
        return
      }
      weixinLogin(params).then(res => {
        // 接口通了 但是后台竟然没有返回token 醉了！
        if (res.data.code == '10022') {
          wx.showToast({
            icon: 'none',
            title: '后台错误',
          })
          return
        }
        if (res.data.code == 200) {
          console.log("通过encryptPhone获取token", res)
          console.log(res)
          // 获取保存token 进入首页
          let token = res.data.data.token
          console.log('token', token)
          wx.setStorageSync('token', token)

          that.getSelfMySysUserInfo()
          wx.reLaunch({
            url: '/pages/login/getuserinfo/getuserinfo',
          })
          // 关闭弹窗
          that.setData({
            dialogShow: false
          })
        }

      })
    }
    // 关闭弹窗
    else {
      this.setData({
        dialogShow: false,
        // showOneButtonDialog: false
      })
    }
  },
  // 打开弹窗
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  // 获取admintype fid  得到用户管理权限
  getFidAndSdminType: function (e) {
    console.log('获取admintype和fid值', e)
    console.log('adminType值', e.currentTarget.dataset.admintype)
    console.log('fid值：', e.currentTarget.dataset.fid)
    this.setData({
      admintype: e.currentTarget.dataset.admintype,
      fid: e.currentTarget.dataset.fid
    })
  },
  // 去分享页面
  toshare: function () {
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        wx.navigateTo({
          url: '/packageD/pages/share/share'
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 分享后点击进去的页面
  tosharetoohter: function () {
    wx.navigateTo({
      url: '/packageD/pages/sharetoother/sharetoohther'
    })
  }
})