import data from '../../../route/api/baseUrl'
import {
  getSelfCertification, // 获取认证-员工
  submitStaffCertification // 设置认证-员工
} from '../../../route/mine/mineprofile/mineprofile'
import {
  getSelfMySysUserInfo // 获取 admintypeindex 身份
} from '../../../route/mine/myteam/myteam'
import {
  selfShareHolderInfo // 获取股东认证信息
} from '../../../route/mine/index/index'
import {
  submitShareHolderCertification, // 设置股东认证信息
  allBankCode // 获取全部银行编号
} from '../../../route/mine/mineprofile/mineprofile'
const token = wx.getStorageSync('token') || ''
Page({
  data: {
    // 弹窗修改状态
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    webServerUrl: data.webServerUrl,
    webServerUrl2: data.upfileurl,
    name: '', // 姓名
    identityCard: '', // 身份证
    accountName: '', // 开户姓名
    bankName: '', // 银行名称-员工 || 股东传个 -1
    bankCodeId: '', // 银行id 股东真正要传递的id
    bankCodeId2: '', // 临时银行id
    accountNumber: '', // 开户账号
    openingBank: '', // 开户行
    roomCertificationAudit: {},
    identityCardFront: data.webServerUrl + '/images/mine/mineprofile/font.png',
    identityCardReverse: data.webServerUrl + '/images/mine/mineprofile/back.png',
    status: -2, // 员工认证状态   -1 未提交过  0 表示待处理 1 表示已认证  2 驳回
    certificationstatus: -2, // 股东认证状态 认证状态 0 未认证 1 待处理 2 认证通过 3 认证失败(审核驳回)
    describeData: "", // 审核情况
    code: '', // 获取openid的code值
    admintype: 0, // 获取身份 如果为5 提交另一个接口
    items: [], // 全部银行编号
    checked: false, // 未选中
    shareHolder: {} // 股东信息包含认证
  },
  onLoad: function (options) {
    // 一开始也要获取身份信息  员工 || 股东
    this.getSelfMySysUserInfo()
  },
  // 获取身份信息
  getSelfMySysUserInfo: function () {
    let that = this
    getSelfMySysUserInfo().then(res => {
      // 用户所属类型（1.总部(平台)，2公司，3.大区 经理，
      // 4.小区 经理，5.股东6.门店员工）
      // 判断此人是 6 员工 小区 大区
      if (res.data.code == 200) {
        console.log('权限级别', res)
        that.setData({
          admintype: res.data.data.sysUser.adminType
        })
        let admintype = that.data.admintype
        // 如果员工 获取员工信息
        if (admintype == 6) {
          that.getSelfCertification() // 审核状态 -1 未提交过 0 表示待处理  1 表示已认证 2 驳回
        }
        // 如果是股东 获取股东认证信息
        if (admintype == 5) {
          that.selfShareHolderInfo()
        }
      }
    })
  },
  // 获取认证信息-员工
  getSelfCertification: function () {
    let that = this
    getSelfCertification().then(res => {
      if (res.data.code = 200) {
        console.log('认证信息', res)
        let describeData = ''
        if (res.data.data.roomCertificationAudit) {
          describeData = res.data.data.roomCertificationAudit.describeData
        } else {
          describeData = ''
        }
        that.setData({
          status: res.data.data.status,
          describeData: describeData
        })
        that.setData({
          name: res.data.data.roomCertificationAudit.name,
          identityCard: res.data.data.roomCertificationAudit.identityCard,
          accountName: res.data.data.roomCertificationAudit.accountName,
          bankName: res.data.data.roomCertificationAudit.bankName,
          accountNumber: res.data.data.roomCertificationAudit.accountNumber,
          openingBank: res.data.data.roomCertificationAudit.openingBank,
          identityCardFront: res.data.data.roomCertificationAudit.identityCardFront,
          identityCardReverse: res.data.data.roomCertificationAudit.identityCardReverse,
          bankCodeId: res.data.data.roomCertificationAudit.bankCodeId
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 获取认证信息-股东
  selfShareHolderInfo: function () {
    // 0 未认证 1 待处理 2 认证通过 3 认证失败 驳回
    let that = this
    selfShareHolderInfo().then(res => {
      if (res.data.code == 200) {
        console.log('股东的认证信息', res)
        let bankName = ''
        let bankCodeId = ''
        let identityCardFront = that.data.identityCardFront
        let identityCardReverse = that.data.identityCardReverse
        let name = ''
        let identityCard = ''
        let accountName = ''
        let accountNumber = ''
        let openingBank = ''
        if (res.data.data.shareHolder.shareHolderCertificationAudit) {
          bankName = res.data.data.shareHolder.shareHolderCertificationAudit.bankName
        }
        if (res.data.data.shareHolder.shareHolderCertificationAudit) {
          bankCodeId = res.data.data.shareHolder.shareHolderCertificationAudit.bankCodeId
        }
        if (res.data.data.shareHolder.shareHolderCertificationAudit) {
          identityCardFront = res.data.data.shareHolder.shareHolderCertificationAudit.identityCardFront
        }
        if (res.data.data.shareHolder.shareHolderCertificationAudit) {
          identityCardReverse = res.data.data.shareHolder.shareHolderCertificationAudit.identityCardReverse
        }


        if (res.data.data.shareHolder.shareHolderCertificationAudit) {
          name = res.data.data.shareHolder.shareHolderCertificationAudit.name
        }
        if (res.data.data.shareHolder.shareHolderCertificationAudit) {
          identityCard = res.data.data.shareHolder.shareHolderCertificationAudit.identityCard
        }
        if (res.data.data.shareHolder.shareHolderCertificationAudit) {
          accountName = res.data.data.shareHolder.shareHolderCertificationAudit.accountName
        }
        if (res.data.data.shareHolder.shareHolderCertificationAudit) {
          accountNumber = res.data.data.shareHolder.shareHolderCertificationAudit.accountNumber
        }
        if (res.data.data.shareHolder.shareHolderCertificationAudit) {
          openingBank = res.data.data.shareHolder.shareHolderCertificationAudit.openingBank
        }
        that.setData({
          shareHolder: res.data.data.shareHolder,
          certificationstatus: res.data.data.shareHolder.certificationStatus,
          bankName: bankName,
          bankCodeId: bankCodeId,
          identityCardFront: identityCardFront,
          identityCardReverse: identityCardReverse,
          name: name,
          identityCard: identityCard,
          accountName: accountName,
          accountNumber: accountNumber,
          openingBank: openingBank
        })
      }
    })
  },
  // 上传认证信息
  sure: function () {
    let that = this
    let admintype = this.data.admintype
    // 根据admintype 获取参数 使用不同接口
    // admintype==6 员工
    if (admintype == 6) {
      let webServerUrl = this.data.webServerUrl
      let name = this.data.name
      let identityCard = this.data.identityCard
      let accountName = this.data.accountName
      let bankName = this.data.bankName
      let accountNumber = this.data.accountNumber
      let openingBank = this.data.openingBank
      let identityCardFront = this.data.identityCardFront
      let identityCardReverse = this.data.identityCardReverse
      let bankCodeId = this.data.bankCodeId
      // 2. 验证参数
      let cardReg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
      let bankExp = /^([1-9]{1})(\d{15}|\d{18})$/
      // 2.1 身份证验证
      // if (identityCard == '' || !cardReg.test(identityCard)) {
      //   wx.showToast({
      //     icon: 'none',
      //     title: '身份证号格式错误',
      //   })
      //   return
      // }
      // 2.2 银行卡号验证
      // if (accountNumber == '' || !bankExp.test(accountNumber)) {
      //   wx.showToast({
      //     icon: 'none',
      //     title: '银行卡号格式错误',
      //   })
      //   return
      // }
      // 2.3 用户身份证必须传
      if (identityCardFront == webServerUrl + '/images/mine/mineprofile/font.png' && identityCardReverse == webServerUrl + "/images/mine/mineprofile/back.png") {
        wx.showToast({
          icon: 'none',
          title: '请上传身份证正反面照片',
        })
        return
      }
      // wx.login() 获取code值
      wx.login({
        success(res) {
          console.log('微信获取code', res)
          that.setData({
            code: res.code
          })
          // 验证都通过了 开始提交上传
          let params = {
            name: name,
            identityCard: identityCard,
            accountName: accountName,
            bankName: bankName,
            accountNumber: accountNumber,
            openingBank: openingBank,
            identityCardFront: identityCardFront,
            identityCardReverse: identityCardReverse,
            code: res.code,
            bankCodeId: bankCodeId
          }
          // 提交认证
          submitStaffCertification(params).then(res => {
            if (res.data.code == 200) {
              wx.showToast({
                title: '提交成功',
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

            } else if (res.data.code == 10002) {
              wx.showToast({
                icon: 'none',
                title: '所有信息均为必填'
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.message
              })
            }
          })
        }
      })
    }
    // admintype==5 股东
    if (admintype == 5) {
      let webServerUrl = this.data.webServerUrl
      let name = this.data.name
      let identityCard = this.data.identityCard
      let accountName = this.data.accountName
      let bankName = this.data.bankName
      let accountNumber = this.data.accountNumber
      let openingBank = this.data.openingBank
      let identityCardFront = this.data.identityCardFront
      let identityCardReverse = this.data.identityCardReverse
      let bankCodeId = this.data.bankCodeId
      if (bankCodeId == '') {
        wx.showToast({
          icon: 'none',
          title: '请选择银行',
        })
        return
      }
      // 2.3 用户身份证必须传
      if (identityCardFront == webServerUrl + '/images/mine/mineprofile/font.png' && identityCardReverse == webServerUrl + "/images/mine/mineprofile/back.png") {
        wx.showToast({
          icon: 'none',
          title: '请上传身份证正反面照片',
        })
        return
      }
      // wx.login() 获取code值
      wx.login({
        success(res) {
          console.log('微信获取code', res)
          that.setData({
            code: res.code
          })
          // 验证都通过了 开始提交上传
          let params = {
            name: name,
            identityCard: identityCard,
            accountName: accountName,
            bankCodeId: bankCodeId,
            bankName: bankName,
            accountNumber: accountNumber,
            openingBank: openingBank,
            identityCardFront: identityCardFront,
            identityCardReverse: identityCardReverse,
            code: res.code
          }
          // 提交认证
          submitShareHolderCertification(params).then(res => {
            if (res.data.code == 200) {
              wx.showToast({
                title: '提交成功',
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

            } else if (res.data.code == 10002) {
              wx.showToast({
                icon: 'none',
                title: '所有信息均为必填'
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.message
              })
            }
          })
        }
      })
    }
  },









  // 身份证正面-员工
  upfont: function () {
    // 审核中和认证成功点击没反应
    let status = this.data.status
    console.log('status', status)
    if (status == 0 || status == 1) {
      return
    }
    let that = this
    let webServerUrl2 = this.data.webServerUrl2
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const images = res.tempFilePaths
        wx.uploadFile({
          url: webServerUrl2 + '/roomStaffBase/uploadIdentityCardFront', //仅为示例，非真实的接口地址
          filePath: images[0],
          header: {
            'content-type': 'application/json',
            'sys_user_token': token
          },
          name: 'img',
          formData: {},
          success(res) {
            console.log('上传图片完成返回路径', res)
            let data = JSON.parse(res.data)
            console.log('图片资源', data)
            console.log('真正的图片路径', data.data.imgPath)
            that.setData({
              identityCardFront: data.data.imgPath
            })
          }
        })
      }
    })
  },
  // 身份证反面-员工
  upback: function () {
    // 审核中和认证成功点击没反应
    let status = this.data.status
    if (status == 0 || status == 1) {
      return
    }
    let that = this
    let webServerUrl2 = this.data.webServerUrl2
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const images = res.tempFilePaths
        wx.uploadFile({
          url: webServerUrl2 + '/roomStaffBase/uploadIdentityCardReserve', //仅为示例，非真实的接口地址
          filePath: images[0],
          header: {
            'content-type': 'application/json',
            'sys_user_token': token
          },
          name: 'img',
          formData: {},
          success(res) {
            console.log('上传图片完成返回路径', res)
            let data = JSON.parse(res.data)
            console.log('图片资源', data)
            console.log('真正的图片路径', data.data.imgPath)
            that.setData({
              identityCardReverse: data.data.imgPath
            })
          }
        })
      }
    })
  },
  // 身份证正面-股东
  upfont1: function () {
    // 审核中和认证成功点击没反应   0 未认证 1 待处理 2 认证通过 3 认证失败
    let certificationstatus = this.data.certificationstatus
    if (certificationstatus == 1 || certificationstatus == 2) {
      return
    }
    let that = this
    let webServerUrl2 = this.data.webServerUrl2
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const images = res.tempFilePaths
        wx.uploadFile({
          url: webServerUrl2 + '/shareHolder/uploadIdentityCardFront', //仅为示例，非真实的接口地址
          filePath: images[0],
          header: {
            'content-type': 'application/json',
            'sys_user_token': token
          },
          name: 'img',
          formData: {},
          success(res) {
            console.log('上传图片完成返回路径', res)
            let data = JSON.parse(res.data)
            console.log('图片资源', data)
            console.log('真正的图片路径', data.data.imgPath)
            that.setData({
              identityCardFront: data.data.imgPath
            })
          }
        })
      }
    })
  },
  // 身份证反面-股东
  upback1: function () {
    // 审核中和认证成功点击没反应
    // 审核中和认证成功点击没反应   0 未认证 1 待处理 2 认证通过 3 认证失败
    let certificationstatus = this.data.certificationstatus
    if (certificationstatus == 1 || certificationstatus == 2) {
      return
    }
    let that = this
    let webServerUrl2 = this.data.webServerUrl2
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const images = res.tempFilePaths
        wx.uploadFile({
          url: webServerUrl2 + '/shareHolder/uploadIdentityCardReserve', //仅为示例，非真实的接口地址
          filePath: images[0],
          header: {
            'content-type': 'application/json',
            'sys_user_token': token
          },
          name: 'img',
          formData: {},
          success(res) {
            console.log('上传图片完成返回路径', res)
            let data = JSON.parse(res.data)
            console.log('图片资源', data)
            console.log('真正的图片路径', data.data.imgPath)
            that.setData({
              identityCardReverse: data.data.imgPath
            })
          }
        })
      }
    })
  },
  // 获取姓名
  getname: function (e) {
    console.log('e', e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  // 获取身份证号
  getidentityCard: function (e) {
    console.log('e', e.detail.value)
    this.setData({
      identityCard: e.detail.value
    })
  },
  // 获取开户姓名
  getaccountName: function (e) {
    console.log('e', e.detail.value)
    this.setData({
      accountName: e.detail.value
    })
  },
  // 获取银行名称-员工
  getbankName: function (e) {
    console.log('e', e.detail.value)
    this.setData({
      bankName: e.detail.value
    })
  },
  // 获取全部银行编号-股东 打开弹窗获取信息
  getbankName2: function (e) {
    let that = this
    let certificationstatus = this.data.certificationstatus
    let status = this.data.status
    // status: '', // 员工认证状态   -1 未提交过  0 表示待处理 1 表示已认证  2 驳回
    // certificationstatus: 0, // 股东认证状态 认证状态 0 未认证 1 待处理 2 认证通过 3 认证失败(审核驳回)
    console.log('certificationstatus', 'status', certificationstatus, status)
    // 认证成功就不要打开了
    if (certificationstatus == 2 || certificationstatus == 1) {
      return
    }
    if (status == 1 || status == 0) {
      return
    }
    this.setData({
      dialogShow: true,
      showOneButtonDialog: true,
      checked: false
    })
    // 获取全部银行接口
    allBankCode().then(res => {
      if (res.data.code == 200) {
        console.log('全部银行编号', res)
        that.setData({
          items: res.data.data.bankCodes
        })
      }

    })
  },
  // 获取状态判断值
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    let that = this
    let items = that.data.items
    // 获取银行id
    this.setData({
      bankCodeId2: e.detail.value
    })
    // 获取银行名字
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == e.detail.value) {
        that.setData({
          bankName: items[i].bankName
        })
      }
    }
  },
  // 确认修改状态员工
  tapDialogButton(e) {
    let that = this
    let bankCodeId = that.data.bankCodeId2
    console.log('取消还是确定', e.detail.index)
    let index = e.detail.index
    // 确定
    if (index == 1) {
      that.setData({
        bankCodeId: bankCodeId
      })
    }
    // 取消
    if (index == 0) {
      that.setData({
        bankCodeId: ''
      })
    }
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  // 获取开户账号
  getaccountNumber: function (e) {
    console.log('e', e.detail.value)
    // getaccountNumber 开户账号

    this.setData({
      accountNumber: e.detail.value
    })
  },
  // 获取开户行
  getopeningBank: function (e) {
    console.log('e', e.detail.value)
    this.setData({
      openingBank: e.detail.value
    })
  }
})