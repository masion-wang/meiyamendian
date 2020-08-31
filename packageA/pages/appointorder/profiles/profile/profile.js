let ages = []
for (let i = 1; i <= 100; i++) {
  ages.push(i)
}
console.log('ages', ages)
import {
  getUserArchives, // 总的档案信息
} from '../../../../../route/index/appointorder/profile'
import data from '../../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    uid: '', // 用户的uid
    // 弹窗修改消费状态
    dialogShow: false,
    showOneButtonDialog: false,
    // 弹窗修改性别状态
    dialogShow2: false,
    showOneButtonDialog2: false,
    // 弹窗修改年龄状态
    dialogShow3: false,
    showOneButtonDialog3: false,
    ages: ages,
    age: 30,
    value1: [29],
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 状态值
    items: [{
        name: '高档',
        value: 'high'
      },
      {
        name: '中档',
        value: 'middle',
        // checked: 'true'
      },
      {
        name: '低档',
        value: 'low'
      }
    ],
    // 性别标签
    firmLabels2: [],
    roomStaffUserArchivesDto: {}, // 个人档案
    firmLabels: [], // 消费档次
    consumeGradeLabelId: -1, // 消费水平id
    sexLabelId: -1 // 性别id
  },
  onLoad: function (options) {
    let that = this
    let uid = options.uid
    console.log('用户id', uid)
    this.setData({
      uid: uid
    })

  },
  onShow: function () {
    let that = this
    let uid = this.data.uid
    let params = {
      uid: uid
    }
    getUserArchives(params).then(res => {
      console.log("个人档案", res)
      if (res.data.code == 200) {
        that.setData({
          roomStaffUserArchivesDto: res.data.data.roomStaffUserArchivesDto
        })
      } else if (res.data.code == 10030) {
        wx.showToast({
          icon: 'none',
          title: '没有权限访问该用户信息',
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
      }
    })
  },
  // 备注名
  toprofilename: function () {
    let uid = this.data.uid
    wx.navigateTo({
      url: `/packageA/pages/appointorder/profiles/profilename/profilename?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 获取性别 打开弹窗 选择重新熏染数据
  togetSexLabel: function () {
    let that = this
    let uid = this.data.uid
    wx.navigateTo({
      url: `/packageA/pages/appointorder/profiles/profilesex/profilesex?uid=${uid}`
    })
  },
  // 去年龄模块
  togetage: function () {
    let that = this
    let uid = this.data.uid
    wx.navigateTo({
      url: `/packageA/pages/appointorder/profiles/profileage/profileage?uid=${uid}`
    })
  },
  // 消费档次 打开弹窗 选择重新渲染数据
  toconsumptiongrade: function () {
    let uid = this.data.uid
    wx.navigateTo({
      url: `/packageA/pages/appointorder/profiles/profilecustomerlabel/profilecustomerlabel?uid=${uid}`
    })
  },
  // 用户照片
  toprofileuserphoto: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profileuserphoto/profileuserphoto?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 家庭住址
  toprofileaddress: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profileaddress/profileaddress?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 家庭成员
  toprofilefamily: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profilefamily/profilefamily?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 单位名称
  toprofilecompanyname: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profilecompanyname/profilecompanyname?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 薪水标准
  toprofilesalary: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profilesalary/profilesalary?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 发型要求
  toprofilehairstylerequire: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profilehairstylerequire/profilehairstylerequire?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 服务要求
  toprofileservicerequire: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profileservicerequire/profileservicerequire?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 偏好
  toprofilefavor: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profilefavor/profilefavor?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 意见和建议
  toprofileadvice: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profileadvice/profileadvice?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 关于会员卡
  toprofileaboutcard: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profileaboutcard/profileaboutcard?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 关于次卡
  toprofiletimecard: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profiletimecard/profiletimecard?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 关于烫发
  toprofileperm: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profileperm/profileperm?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 关于染发
  toprofilehaircolor: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profilehaircolor/profilehaircolor?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 关于剪发
  toprofilehaircut: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profilehaircut/profilehaircut?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 关于护法
  toprofilehaircare: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profilehaircare/profilehaircare?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 关于头皮
  toprofilescalp: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profilescalp/profilescalp?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 通话记录
  tophonerecord: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/phonerecord/phonerecord?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 聊天记录
  tochatrecord: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/chatrecord/chatrecord?uid=${uid}`,
      success: function (res) {}
    })
  },
  // 其它
  toprofileother: function () {
    let uid = this.data.uid
    wx.navigateTo({
      // ?key=none
      url: `/packageA/pages/appointorder/profiles/profileother/profileother?uid=${uid}`,
      success: function (res) {}
    })
  }
})