import {
  selfFirmRoomStaffInfo, // 获取员工信息
  addLeaveOffice, // 离职申请
  selfRoomStaffInfo // 获取不带自己的员工信息
} from '../../../../route/mine/myteam/myteam'
import {
  selfPermissions // 自己权限状态
} from '../../../../route/admin/admin'
import {
  getSelfMySysUserInfo // 获取自己admintype
} from '../../../../route/index/guanjiaoutside/guanjiaoutside'
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    name: '', // 员工名字
    id: '', // 员工id
    name1: '', // 历史名字临时
    id1: '', // 员工id临时
    title: '', // 标题
    content: '', // 内容
    isShowapl: false, // 是否显示申请人
    // 弹窗修改状态
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 7项目
    items: [],
    admintype: 0 // 身份等级
  },
  onLoad: function (options) {
    let that = this
    getSelfMySysUserInfo().then(res => {
      if (res.data.code == 200) {
        console.log('自己的级别', res)
        that.setData({
          admintype: res.data.data.sysUser.adminType
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  onShow: function () {
    let that = this
    // 1.获取员工信息
    selfRoomStaffInfo().then(res => {
      if (res.data.code == 200) {
        console.log('员工信息为', res)
        that.setData({
          items: res.data.data.roomStaffBaseDtos
        })
      }
    })
    // 2.获自己的权限状态
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        console.log('当前人权限状态为', res)
        // 根据数组里面对象里面字段pval是否有 my:home:myTeam:leaveDApply
        // 有就有这个权限 没有就没有
        for (let i = 0; i < res.data.data.sysPermDtos.length; i++) {
          // 如果有这个权限 显示
          if (res.data.data.sysPermDtos[i].pval == 'my:home:myTeam:leaveDApply') {
            that.setData({
              isShowapl: true
            })

            break
          }
        }
      }
    })
  },

  // 提交离职申请
  sureup: function () {
    let admintype = this.data.admintype
    // 获取参数 title标题  rsbId员工id(非必须填写) leaveCause离职原因
    let isShowapl = this.data.isShowapl
    let id = this.data.id
    // 如果是大区或者小区  股东? 必须选择申请人
    if ((admintype == 3 || admintype == 4) && id == '') {
      wx.showToast({
        icon: 'none',
        title: '大小区经理自己不能申请离职',
        duration: 2000
      })
      return
    }
    // 如果有权限但是没有选择申请人 id为-1
    if (isShowapl && id == '') {

      id = -1
    }
    // 如果没有权限
    if (!isShowapl) {
      id = -1
    }
    let title = this.data.title
    let content = this.data.content
    // 限制参数
    if (title.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入标题',
      })
      return
    }
    if (content.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入离职原因',
      })
      return
    }
    // 通过限制 准备提交 title标题  rsbId员工id(没有权限传-1) leaveCause离职原因
    let params = {
      title: title,
      leaveCause: content,
      rsbId: id
    }
    addLeaveOffice(params).then(res => {
      if (res.data.code == 200) {
        console.log('提交离职申请成功', res)
        wx.showToast({
          icon: 'none',
          title: '离职申请成功',
          duration: 2500,
          success: function () {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          }
        })
      }
      if (res.data.code == 10028) {
        wx.showToast({
          icon: 'none',
          title: '请选择申请人',
          duration: 2000
        })
      }
    })



  },



  // 点击修改员工状态
  openConfirm: function () {
    this.setData({
      dialogShow: true,
      isShow: false
    })
  },
  // 获取状态
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    let index = e.detail.value
    let items = this.data.items
    // items[index].userName
    // items[index].id
    this.setData({
      name1: items[index].stageName,
      id1: items[index].id
    })
    console.log('员工名字和id', this.data.name1, this.data.id1)
  },
  // 员工弹窗
  tapDialogButton(e) {
    console.log('index', e.detail.index)
    let index = e.detail.index
    let name1 = this.data.name1
    let id1 = this.data.id1
    // 取消
    if (index == 0) {}
    // 确定
    if (index == 1) {
      this.setData({
        name: name1,
        id: id1
      })
    }
    // 关闭弹窗
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  // 获取标题
  gettitle: function (e) {
    this.setData({
      title: e.detail.value
    })
    console.log('标题', e.detail.value)
  },
  // 获取内容
  getcontent: function (e) {
    this.setData({
      content: e.detail.value
    })
    console.log('内容', e.detail.value)
  }
})