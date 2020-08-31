import {
  getCstmCardPrchOd, // 获取会员卡 0
  getNumCardPrchOd, // 获取次卡 1 2
  getUserCstmCardTopUpOd, // 获取充值卡 3
  firmNumCardPrchOdAccepted, // 次卡核销
  customerCardOrderAccepted, // 会员卡核销
  userCstmCardTopUpOdAccepted, // 充值卡提交
  getAllSimpleRoomStaffInfo, // 获取修改员工信息接口
  selfRoomMainStaffInfo, // 获取发型师信息
  getAllWrapperSimpleRoomStaffInfo, // 获取(发型师+助理)接口
  getAllWrapperSimpleMainRoomStaffInfo // 获取发型师
  // 获取发型师
} from '../../../../route/index/records/dealcardgold'
import data from '../../../../route/api/baseUrl'
Page({
  // navigateBack navigateBack navigateBack navigateBack navigateBack
  data: {
    webServerUrl: data.webServerUrl,
    // 总值
    sum: 3000,
    // 添加员工
    dialogShow1: false,
    showOneButtonDialog1: false,
    // 删除员工
    dialogShow2: false,
    showOneButtonDialog2: false,
    // 修改员工
    dialogShow3: false,
    showOneButtonDialog3: false,
    // 确认提交
    dialogShow4: false,
    showOneButtonDialog4: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    index: 0, // 修改下标
    type: '', // type值
    addid: 0, // 增加员工id
    delindex: 0, //  删除员工索引
    changeid: 0, // 修改员工id
    changename: "", // 修改员工名字
    // 全部员工 添加
    selectInfoAll: [],
    // 目前员工 渲染提交
    wrapperStaffs: [],
    // 修改员工 修改
    roomStaffBases: [],
    odId: '', // 订单id
    cardtype: '', // 卡的类型
    totalPrice: 0, // 入会金额
    cardholder: '', //  分配人
    checked: false // 未选中
  },
  onLoad: function (options) {
    let that = this
    // 验证记录传来的id 和 type
    console.log('options', options)
    let type = options.type
    let id = options.id
    // 保存卡类型
    that.setData({
      cardtype: type,
      odId: id
    })
    let params = {

      odId: id
    }
    // 根据type 和 id 判断请求对应的接口 获得目前员工数据
    // 会员卡
    if (type == 0) {
      getCstmCardPrchOd(params).then(res => {
        console.log("会员卡", res)
        if (res.data.code == 200) {
          // 获取当前员工
          that.setData({
            totalPrice: res.data.data.firmCstmCardPrchOdDto.totalPrice,
            wrapperStaffs: res.data.data.wrapperStaffs,
            cardholder: res.data.data.firmCstmCardPrchOdDto.roomStaffBase.stageName,
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    }
    // 次卡 type 1
    else if (type == 1) {
      getNumCardPrchOd(params).then(res => {
        console.log("次卡", res)
        if (res.data.code == 200) {
          // 获取当前员工
          that.setData({
            totalPrice: res.data.data.firmNumCardPrchOdListDto.prchAmount,
            wrapperStaffs: res.data.data.wrapperStaffs,
            cardholder: res.data.data.firmNumCardPrchOdListDto.roomStaffBase.stageName,
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    } else if (type == 2) {
      getNumCardPrchOd(params).then(res => {
        console.log("次卡", res)
        if (res.data.code == 200) {
          // 获取当前员工
          that.setData({
            totalPrice: res.data.data.firmNumCardPrchOdListDto.useCstmCardAmt > 0 ? res.data.data.firmNumCardPrchOdListDto.useCstmCardAmt : res.data.data.firmNumCardPrchOdListDto.prchAmount,
            wrapperStaffs: res.data.data.wrapperStaffs,
            cardholder: res.data.data.firmNumCardPrchOdListDto.roomStaffBase.stageName,
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    }
    // 充值卡
    else if (type == 3) {
      getUserCstmCardTopUpOd(params).then(res => {
        console.log("充值", res)
        if (res.data.code == 200) {
          // 获取当前员工
          that.setData({
            totalPrice: res.data.data.firmUserCstmCardTopUpOdDto.totalPrice,
            wrapperStaffs: res.data.data.wrapperStaffs,
            cardholder: res.data.data.firmUserCstmCardTopUpOdDto.roomStaffBase.stageName,
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message + ":" + res.data.code,
            duration: 2000
          })
        }
      })
    }
  },
  // 添加发型师和助理
  addperson: function (e) {
    let that = this
    getAllWrapperSimpleMainRoomStaffInfo().then(res => {
      console.log("全部员工信息", res)
      that.setData({
        selectInfoAll: res.data.data.roomStaffBases
      })
    })
    // 打开弹窗
    this.setData({
      dialogShow1: true
    })
  },
  // 添加过程
  radioChange1: function (e) {
    // 获取员工id
    console.log(e.detail.value)
    let id = e.detail.value - 0
    // 保存员工id
    this.setData({
      addid: id
    })

  },
  // 添加
  tapDialogButton1: function (e) {
    let that = this
    console.log(e.detail.index)
    let buttonIndex = e.detail.index
    let addid = this.data.addid
    let Allarr = this.data.selectInfoAll // 全部员工
    let wrapperStaffs = this.data.wrapperStaffs // 目前员工
    // 确定
    if (buttonIndex == 1) {
      // 添加进来
      for (let i = 0; i < Allarr.length; i++) {
        if (Allarr[i].main.id == addid) {
          wrapperStaffs.push(Allarr[i])
          that.setData({
            wrapperStaffs: wrapperStaffs
          })
        }
      }
      console.log("添加完的目前员工", wrapperStaffs)
      that.setData({
        dialogShow1: false,
        showOneButtonDialog1: false
      })
    }
    // 取消
    else if (buttonIndex == 0 || addid == "") {
      that.setData({
        dialogShow1: false,
        showOneButtonDialog1: false
      })
      console.log("取消添加完的目前员工", wrapperStaffs)
    }
  },
  // 删除过程
  deleteperson: function (e) {
    let that = this
    console.log(e.currentTarget.dataset.index)
    // 获取被删除员工索引
    let delindex = e.currentTarget.dataset.index
    that.setData({
      delindex: delindex
    })
    // 打开弹窗
    this.setData({
      dialogShow2: true
    })
  },
  // 删除
  tapDialogButton2: function (e) {
    let that = this
    let buttonIndex = e.detail.index
    console.log(buttonIndex)
    let delindex = this.data.delindex // 删除索引
    let curArr = this.data.wrapperStaffs // 目前员工
    console.log("删除索引", delindex, "目前员工", curArr)
    // 确定
    if (buttonIndex == 1) {
      curArr.splice(delindex, 1)
      console.log("确定删除后数组", curArr)
      that.setData({
        wrapperStaffs: curArr
      })
      that.setData({
        dialogShow2: false,
        showOneButtonDialog2: false
      })
    }
    // 取消
    else if (buttonIndex == 0) {
      that.setData({
        dialogShow2: false,
        showOneButtonDialog2: false
      })
      console.log("取消删除完的目前员工", curArr)
    }
  },
  // 修改发型师
  selectperson2: function (e) {
    let that = this
    that.setData({
      checked: false
    })
    // 获取员工信息
    selfRoomMainStaffInfo().then(res => {
      console.log("修改员工信息", res)
      that.setData({
        roomStaffBases: res.data.data.roomStaffBaseDtos
      })
    })
    // 打开弹窗
    this.setData({
      dialogShow3: true
    })
    // 获取发型师 || 助理 type值
    console.log("type值", e)
    // console.log("index值", e)
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    console.log("修改index和type", index, type)
    this.setData({
      type: type,
      index: index
    })
  },
  // 修改 发型师助理
  selectperson: function (e) {
    let that = this
    that.setData({
      checked: false
    })
    // 获取员工信息
    getAllSimpleRoomStaffInfo().then(res => {
      console.log("修改员工信息", res)
      that.setData({
        roomStaffBases: res.data.data.roomStaffBases
      })
    })
    // 打开弹窗
    this.setData({
      dialogShow3: true
    })
    // 获取发型师 || 助理 type值
    console.log("type值", e)
    // console.log("index值", e)
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    console.log("修改index和type", index, type)
    this.setData({
      type: type,
      index: index
    })
  },
  // 修改过程
  radioChange3: function (e) {
    // 获取员工 id 和 name
    let roomStaffBases = this.data.roomStaffBases
    let id = e.detail.value - 0
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
  // 修改
  tapDialogButton3: function (e) {
    let that = this
    let type = this.data.type // type值
    let buttonIndex = e.detail.index // 确定或取消
    let index = this.data.index // 索引
    let id = this.data.changeid
    let wrapperStaffs = this.data.wrapperStaffs
    let stageName = this.data.changename
    // 如果id等于0 以为他没有要修改的员工 那就按照取消处理
    if (buttonIndex == 1 && id != 0) {
      // 仅仅 修改名字和id
      wrapperStaffs[index][type].stageName = stageName
      wrapperStaffs[index][type].id = id
      that.setData({
        wrapperStaffs: wrapperStaffs
      })
      console.log("修改完的目前员工", wrapperStaffs)
      this.setData({
        dialogShow3: false,
        showOneButtonDialog3: false
      })
    } else if (buttonIndex == 0 || id == 0) {
      console.log("目前员工", wrapperStaffs)
      this.setData({
        dialogShow3: false,
        showOneButtonDialog3: false
      })
    }
  },
  focus: function (e) {
    console.log(e)
    // 获取value 获取index
    let value = e.detail.value - 0
    let index = e.currentTarget.dataset.index
    let wrapperStaffs = this.data.wrapperStaffs
    console.log("金钱和index", value, index)
    // 修改对应的money
    console.log(wrapperStaffs[index])
    wrapperStaffs[index].money = ''
    // 渲染上去
    this.setData({
      wrapperStaffs: wrapperStaffs,
    })
    // 目前员工
    console.log("目前员工", wrapperStaffs)
  },
  // 修改金额
  sub: function (e) {
    console.log(e)
    // 获取value 获取index
    let value = e.detail.value - 0
    let index = e.currentTarget.dataset.index
    let wrapperStaffs = this.data.wrapperStaffs
    console.log("金钱和index", value, index)
    // 修改对应的money
    console.log(wrapperStaffs[index])
    wrapperStaffs[index].money = value
    // 渲染上去
    this.setData({
      wrapperStaffs: wrapperStaffs,
    })
    // 目前员工
    console.log("目前员工", wrapperStaffs)
  },
  // 确认提交
  confrim: function () {
    this.setData({
      dialogShow4: true
    })
  },
  // 提交
  tapDialogButton4: function (e) {
    let that = this
    let cardtype = that.data.cardtype // 卡类型
    let odId = that.data.odId // 订单id
    let wrapperStaffs = that.data.wrapperStaffs // 目前员工
    let buttonIndex = e.detail.index
    if (buttonIndex == 1) {
      this.setData({
        dialogShow4: false,
        showOneButtonDialog4: false
      })
      // 提交数据 判断卡的类型
      if (cardtype == 0) { // 会员卡
        let params = {
          odId: odId,
          alctAmts: []
        }
        // 遍历wrapperStaffs数据 保存到alctAmts || obj amt钱 mainRsbId剪发 secondaryRsbId助理
        for (let i = 0; i < wrapperStaffs.length; i++) {
          let obj = {}
          obj.amt = wrapperStaffs[i].money
          obj.mainRsbId = wrapperStaffs[i].main.id
          obj.secondaryRsbId = wrapperStaffs[i].secondary.id
          params.alctAmts.push(obj)
          // console.log(wrapperStaffs[i])
        }
        console.log("会员卡参数", params)
        // 提交
        customerCardOrderAccepted(params).then(res => {
          console.log("会员卡提交结果", res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '提交成功',
              duration: 1000,
              success: function () {
                let timer = setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                  clearTimeout(timer)
                }, 1000)
              }
            })
          } else if (res.data.code == 10002) {
            wx.showToast({
              icon: 'none',
              title: '金额分配错误',
              duration: 1000
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '后台繁忙',
              duration: 1000
            })
          }
        })
      } else if (cardtype == 1 || cardtype == 2) { // 次卡
        let params = {
          odId: odId,
          alctAmts: []
        }
        // 遍历wrapperStaffs数据 保存到alctAmts || obj amt钱 mainRsbId剪发 secondaryRsbId助理
        for (let i = 0; i < wrapperStaffs.length; i++) {
          let obj = {}
          obj.amt = wrapperStaffs[i].money
          obj.mainRsbId = wrapperStaffs[i].main.id
          obj.secondaryRsbId = wrapperStaffs[i].secondary.id
          params.alctAmts.push(obj)
          // console.log(wrapperStaffs[i])
        }
        console.log("次卡参数", params)
        // 提交
        firmNumCardPrchOdAccepted(params).then(res => {
          console.log("次卡提交结果", res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '提交成功',
              duration: 1000,
              success: function () {
                let timer = setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                  clearTimeout(timer)
                }, 1000)
              }
            })
          } else if (res.data.code == 10002) {
            wx.showToast({
              icon: 'none',
              title: '金额分配错误',
              duration: 1000
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '后台繁忙',
              duration: 1000
            })
          }
        })
      } else if (cardtype == 3) { // 充值
        let params = {
          odId: odId,
          alctAmts: []
        }
        // 遍历wrapperStaffs数据 保存到alctAmts || obj amt钱 mainRsbId剪发 secondaryRsbId助理
        for (let i = 0; i < wrapperStaffs.length; i++) {
          let obj = {}
          obj.amt = wrapperStaffs[i].money
          obj.mainRsbId = wrapperStaffs[i].main.id
          obj.secondaryRsbId = wrapperStaffs[i].secondary.id
          params.alctAmts.push(obj)
          // console.log(wrapperStaffs[i])
        }
        console.log("充值参数", params)
        // 提交
        userCstmCardTopUpOdAccepted(params).then(res => {
          console.log("充值提交结果", res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '提交成功',
              duration: 1000,
              success: function () {
                let timer = setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                  clearTimeout(timer)
                }, 1000)

              }
            })
          } else if (res.data.code == 10002) {
            wx.showToast({
              icon: 'none',
              title: '金额分配错误',
              duration: 1000
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '后台繁忙',
              duration: 1000
            })
          }
          // 返回验证记录
        })
      }
    } else {
      this.setData({
        dialogShow4: false,
        showOneButtonDialog4: false
      })
    }

  },
  // 取消
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})