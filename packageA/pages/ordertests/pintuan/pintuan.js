import {
  getGroupBookingOrderItem, // 请求拼团项目
  getAllSimpleRoomStaffInfo, // 获取员工信息
  selfRoomMainStaffInfo, // 获取发型师信息
  groupBookingOrderAccepted // 提交拼团订单 
} from '../../../../route/index/ordertests/pintuan'
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
    groupBookingOrderItemDto: {},
    // 项目数量
    projectnumber: 1,
    // 员工数据
    roomStaffBases: [],
    type: '',
    index: 0,
    changeid: 0, // 修改员工id
    changename: "", // 修改员工名字
    checked: false, // 未选中
    odItemId: '' // 订单id
  },
  // 根据id渲染数据数据
  onLoad: function (options) {
    let that = this
    // 获取项目id
    console.log("一般订单id", options.id)
    let params = {
      odItemId: options.id
    }
    // 保存订单id
    that.setData({
      odItemId: options.id
    })
    // 请求数据
    getGroupBookingOrderItem(params).then(res => {
      console.log("一般订单数据", res)
      if (res.data.code == 200) {
        let data = res.data.data.groupBookingOrderItemDto
        console.log('项目数据data', data)
        that.setData({
          groupBookingOrderItemDto: data,
        })
        console.log("项目信息", res.data.data.groupBookingOrderItemDto)
      } else {
        wx.showToast({
          icon: 'none',
          title: '服务器繁忙',
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
  // 修改开始 
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
    console.log("type", type)
    this.setData({
      type: type
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
    let groupBookingOrderItemDto = this.data.groupBookingOrderItemDto
    let changename = this.data.changename
    // 如果id等于0 以为他没有要修改的员工 那就按照取消处理
    if (buttonIndex == 1 && id != 0) {
      // 仅仅 修改名字和id
      groupBookingOrderItemDto.wrapperStaff[type].stageName = changename
      groupBookingOrderItemDto.wrapperStaff[type].id = id
      that.setData({
        groupBookingOrderItemDto: groupBookingOrderItemDto
      })
      console.log("确定修改完的目前项目员工", groupBookingOrderItemDto)
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
    } else if (buttonIndex == 0 || id == 0) {
      console.log("取消修改完的目前项目员工", groupBookingOrderItemDto)
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
    let groupBookingOrderItemDto = this.data.groupBookingOrderItemDto
    let odItemId = this.data.odItemId
    let proCommission = {}
    console.log(groupBookingOrderItemDto, odItemId)
    proCommission.mainRsbId = groupBookingOrderItemDto.wrapperStaff.main.id
    proCommission.proId = groupBookingOrderItemDto.proId
    proCommission.secondaryRsbId = groupBookingOrderItemDto.wrapperStaff.secondary.id
    let params = {
      odItemId: odItemId,
      proCommission: proCommission
    }
    console.log("params", params)
    // 提交给后台相关信息
    groupBookingOrderAccepted(params).then(res => {
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
      } else if (res.data.code == 10022) {
        wx.showToast({
          icon: 'none',
          title: '已经核销 返回首页',
          duration: 2500,
          success: function () {
            let timer = setTimeout(() => {
              let timer = wx.switchTab({
                url: '/pages/index/index/index'
              })
              clearTimeout(timer)
            }, 2000)
          }
        })
      } else if (res.data.code == 10017) {
        wx.showToast({
          icon: 'none',
          title: '已经核销 返回首页',
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
      } else {
        wx.showToast({
          icon: 'none',
          title: '后台错误',
        })
      }
    })
  }
})