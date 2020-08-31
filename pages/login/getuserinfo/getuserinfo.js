import {
  getSelfMySysUserInfo // 获取自己admintype
} from '../../../route/index/guanjiaoutside/guanjiaoutside'
import {
  setStaffWxInfo, // 设置员工微信头像
  setSmallAreaWxInfo, // 设置小区微信头像
  setBigAreaWxInfo, // 设置大区微信头像
  setShareHolderWxInfo // 设置股东微信头像
} from "../../../route/admin/admin";
import {
  roomInfo
} from '../../../route/login/login'
import {
  setRoomStaffHeadImg, // 设置员工头像
  setBigAreaIdentityImg, // 设置大区头像
  setSmallAreaIdentityImg, // 设置小区头像
  setShareHolderIdentityImg // 设置股东头像
} from '../../../route/mine/index/index'

Page({
  data: {
    code: '',
    iv: '',
    encryptedData: '',
    uid: '', // 根据uid获取门店图片 
    name: '',
    roomtopimg: '', // 门店头像
    admintype: 0 // 身份凭证 3 大区 4 小区 5 股东 6 员工 
  },
  onLoad: function (options) {
    let that = this
    // 看看有没有uid 
    // wx.getStorage({
    //   key: 'uid',
    //   success(res) {
    //     console.log('门店uid', res.data)
    //     let uid = res.data
    //     let params = {
    //       uid: uid
    //     }
    //     roomInfo(params).then(res => {
    //       if (res.data.code == 200) {
    //         console.log('公司logo', res)
    //         that.setData({
    //           name: res.data.data.roomBasicsDataDto.roomName,
    //           roomtopimg: res.data.data.roomBasicsDataDto.roomTopImg
    //         })
    //       }
    //     })
    //   }
    // })
    // 判断身份
    getSelfMySysUserInfo().then(res => {
      console.log('用户身份获取微信的头像', res)
      that.setData({
        admintype: res.data.data.sysUser.adminType
      })
      // 
      let uid = res.data.data.sysUser.uid
      let params = {
        uid: uid
      }
      roomInfo(params).then(res => {
        if (res.data.code == 200) {
          console.log('公司logo', res)
          that.setData({
            name: res.data.data.roomBasicsDataDto.roomName,
            roomtopimg: res.data.data.roomBasicsDataDto.roomTopImg
          })
        }
      })
    })
  },
  onShow() {
    let that = this
    wx.hideHomeButton();
    wx.login({
      success: function (res) {
        if (res.code) {
          let code = res.code
          that.setData({
            code: code
          })
        }
      }
    })
  },
  getUserInfoShouQuan(item) {
    console.log('item', item)
    let that = this
    let encryptedData = item.detail.encryptedData
    let iv = item.detail.iv
    let admintype = this.data.admintype
    let code = this.data.code
    let img = item.detail.userInfo.avatarUrl
    that.setData({
      encryptedData: encryptedData,
      iv: iv
    })

    let params = {
      encryptedData: encryptedData,
      iv: iv,
      code: code
    }
    // 身份凭证 3 大区 4 小区 5 股东 6 员工 
    // 调用设置接口
    // 员工
    if (admintype == 6) {
      setStaffWxInfo(params).then(res => {
        if (res.data.code == 200) {
          // 再修改微信头像员工
          let params = {
            headImgUrl: img
          }
          setRoomStaffHeadImg(params).then(res => {
            if (res.data.code == 200) {
              wx.switchTab({
                url: '/pages/mine/index/index'
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.message
              })
            }
          })

        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        }
      })
    }
    // 小区
    if (admintype == 4) {
      setSmallAreaWxInfo(params).then(res => {
        if (res.data.code == 200) {
          // 再修改微信头像小区
          let params = {
            img: img
          }
          setSmallAreaIdentityImg(params).then(res => {
            if (res.data.code == 200) {
              wx.switchTab({
                url: '/pages/mine/index/index'
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.message
              })
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        }
      })
    }
    // 大区
    if (admintype == 3) {
      setBigAreaWxInfo(params).then(res => {
        if (res.data.code == 200) {
          // 再修改微信头像小区
          let params = {
            img: img
          }
          setBigAreaIdentityImg(params).then(res => {
            if (res.data.code == 200) {
              wx.switchTab({
                url: '/pages/mine/index/index'
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.message
              })
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        }
      })
    }
    // 股东
    if (admintype == 5) {
      setShareHolderIdentityImg(params).then(res => {
        if (res.data.code == 200) {
          // 再修改微信头像小区
          let params = {
            img: img
          }
          setSmallAreaIdentityImg(params).then(res => {
            if (res.data.code == 200) {
              wx.switchTab({
                url: '/pages/mine/index/index'
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.message
              })
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        }
      })
    }

  }
})