import {
  tochinese
} from '../../../../utils/js/tochinese'
import {
  getUserProjectOrder, // 请求一般项目
  getAllSimpleRoomStaffInfo, // 获取员工(发型师-助理)信息
  selfRoomMainStaffInfo, // 获取发型师信息
  userProjectOrderAccepted // 提交一般订单 
} from '../../../../route/index/ordertests/ordertests'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    // 员工弹窗
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 项目数据
    projectdata: [],
    // 项目数量
    projectnumber: 0,
    // 员工数据
    roomStaffBases: [],
    type: '',
    index: 0,
    changeid: 0, // 修改员工id
    changename: "", // 修改员工名字
    odId: '', // 订单id
    checked: false // 未选中
  },
  // 根据id渲染数据数据
  onLoad: function (options) {
    let that = this
    // 获取项目id
    console.log("一般订单id", options.id)
    let params = {
      odId: options.id
    }
    // 保存订单id
    that.setData({
      odId: options.id
    })
    // 请求数据
    getUserProjectOrder(params).then(res => {
      console.log("一般订单数据", res)
      if (res.data.code == 200) {
        let data = res.data.data.userProjectOrderDto.userProOdItemDtos
        console.log('项目数据data', data)
        // 根据阿拉伯数字变成项目一二三  + 共几项
        let projectnumber = 0
        for (let i = 0; i < data.length; i++) {
          let num = i + 1
          let str = tochinese(num)
          data[i].projectname = '项目' + str
          projectnumber += 1
        }
        that.setData({
          projectdata: data,
          projectnumber: projectnumber
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
  // 修改开始-发型师
  select2: function (e) {
    let that = this
    that.setData({
      checked: false
    })
    // 取员工数据
    selfRoomMainStaffInfo().then(res => {
      console.log(res)
      if (res.data.code == 200) {
        that.setData({
          roomStaffBases: res.data.data.roomStaffBaseDtos
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '获取员工信息失败 后台有误',
        })
      }
    })
    // 打开弹窗
    this.setData({
      dialogShow: true
    })
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    console.log("修改index和type", index, type)
    this.setData({
      type: type,
      index: index
    })
  },
  // 修改开始-助理
  select: function (e) {
    let that = this
    that.setData({
      checked: false
    })
    // 取员工数据
    getAllSimpleRoomStaffInfo().then(res => {
      console.log(res)
      if (res.data.code == 200) {
        that.setData({
          roomStaffBases: res.data.data.roomStaffBases
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '获取员工信息失败 后台有误',
        })
      }
    })
    // 打开弹窗
    this.setData({
      dialogShow: true
    })
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    console.log("修改index和type", index, type)
    this.setData({
      type: type,
      index: index
    })
  },
  // 修改过程
  radioChange: function (e) {
    // 员工id和项目数据
    let roomStaffBases = this.data.roomStaffBases
    let id = e.detail.value - 0
    console.log(id, roomStaffBases)
    // 获取员工 id 和 name
    for (let i = 0; i < roomStaffBases.length; i++) {
      if (roomStaffBases[i].id == id) {
        this.setData({
          changeid: id,
          changename: roomStaffBases[i].stageName
        })
        break;
      }
    }
    console.log("员工id和名字", this.data.changeid, this.data.changename)

  },
  // 修改完成
  tapDialogButton: function (e) {
    let that = this
    let type = this.data.type // type值
    let buttonIndex = e.detail.index // 确定或取消
    let index = this.data.index // 索引
    let id = this.data.changeid
    let projectdata = this.data.projectdata
    let changename = this.data.changename
    // 如果id等于0 以为他没有要修改的员工 那就按照取消处理
    if (buttonIndex == 1 && id != 0) {
      // 仅仅 修改名字和id
      projectdata[index].wrapperStaff[type].stageName = changename
      projectdata[index].wrapperStaff[type].id = id
      that.setData({
        projectdata: projectdata
      })
      console.log("确定修改完的目前项目员工", projectdata)
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
    } else if (buttonIndex == 0 || id == 0) {
      console.log("取消修改完的目前项目员工", projectdata)
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
    }

  },
  // 取消 回到首页
  cancel: function () {
    wx.switchTab({
      url: '/pages/index/index/index'
    })
  },
  // 确定 提交订单
  sureorder: function () {
    // 获取项目信息和订单id
    let projectdata = this.data.projectdata
    let odId = this.data.odId
    console.log(projectdata, odId)
    let proCommissions = []
    for (let i = 0; i < projectdata.length; i++) {
      let obj = {}
      obj.mainRsbId = projectdata[i].wrapperStaff.main.id
      obj.proId = projectdata[i].proId
      obj.secondaryRsbId = projectdata[i].wrapperStaff.secondary.id
      proCommissions.push(obj)
    }
    let params = {
      odId: odId,
      proCommissions: proCommissions
    }
    console.log("params", params)
    // 提交给后台相关信息
    userProjectOrderAccepted(params).then(res => {
      if (res.data.code == 200) {
        wx.showToast({
          title: '提交成功!',
          duration: 1000,
          success: function () {
            let timer = setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index/index'
              })
              clearTimeout(timer)
            }, 1000)
          }
        })
      } else if (res.data.code == 10004) {

      } else if (res.data.code == 10022) {
        wx.showToast({
          icon: 'none',
          title: '已经核销 返回首页',
          duration: 2500,
          success: function () {
            let timer = setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index/index'
              })
              clearTimeout(timer)
            }, 200)
          }
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '后台错误',
        })
      }
    })
  }
})