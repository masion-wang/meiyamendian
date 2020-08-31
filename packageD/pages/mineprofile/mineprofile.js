import data from '../../../route/api/baseUrl'
const token = wx.getStorageSync('token') || ''
import {
  getSelfMySysUserInfo // 获取自己真正有判断值的信息
} from '../../../route/mine/myteam/myteam'
import {
  getSelfRoomStaffBaseInfo, // 获取员工信息
  selfSmallAreaUserInfo, // 小区的信息
  selfBigAreaUserInfo, // 大区的信息
  selfShareHolderInfo, // 股东的信息
  setRoomStaffHeadImg, // 设置员工头像
  setBigAreaIdentityImg, // 设置大区头像
  setSmallAreaIdentityImg, // 设置小区头像
  setShareHolderIdentityImg // 设置股东头像
} from '../../../route/mine/index/index'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    webServerUrl2: data.upfileurl,
    images: [],
    admintype: 0, // 身份识别
    roomStaffBaseDto: {}, // 员工信息
    bigAreaDto: {}, // 大区
    smallAreaDto: {}, // 小区
    shareHolder: {}, // 股东
    certificationstatus: 0 //   0 未认证 1 待处理 2 认证通过 3 认证失败 
  },
  onLoad: function (options) {},
  onShow: function () {
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
        // 获取身份标识
        let admintype = that.data.admintype
        // 员工 6
        if (admintype == 6) {
          that.getavater()
        }
        // 小区 4
        if (admintype == 4) {
          that.selfSmallAreaUserInfo()
        }
        // 大区 3
        if (admintype == 3) {
          that.selfBigAreaUserInfo()
        }
        // 股东 5
        if (admintype == 5) {
          that.selfShareHolderInfo()
        }
      }
    })
  },
  // 大区 3
  selfBigAreaUserInfo: function () {
    let that = this
    selfBigAreaUserInfo().then(res => {
      console.log('获取大区信息', res.data)
      console.log('大区头像', res.data.data.bigAreaDto)
      let imgs = []
      imgs.push(res.data.data.bigAreaDto.identityImg)
      that.setData({
        images: imgs,
        bigAreaDto: res.data.data.bigAreaDto
      })
    })
  },
  // 小区 4
  selfSmallAreaUserInfo: function () {
    let that = this
    selfSmallAreaUserInfo().then(res => {
      console.log('获取小区信息', res.data)
      console.log('获取大区信息', res.data)
      console.log('小区头像', res.data.data.smallAreaDto)
      let imgs = []
      imgs.push(res.data.data.smallAreaDto.identityImg)
      that.setData({
        images: imgs,
        smallAreaDto: res.data.data.smallAreaDto
      })
    })
  },
  // 员工6
  getavater: function () {
    let that = this
    getSelfRoomStaffBaseInfo().then(res => {
      if (res.data.code == 200) {
        console.log('员工信息', res.data.data.roomStaffBaseDto)
        let imgs = []
        imgs.push(res.data.data.roomStaffBaseDto.staffHeadImg)
        that.setData({
          images: imgs,
          roomStaffBaseDto: res.data.data.roomStaffBaseDto
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 股东 5
  selfShareHolderInfo: function () {
    let that = this
    selfShareHolderInfo().then(res => {
      console.log('股东', res)
      console.log('股东头像', res.data.data.shareHolder.headImg)
      let imgs = []
      imgs.push(res.data.data.shareHolder.headImg)
      that.setData({
        images: imgs,
        shareHolder: res.data.data.shareHolder,
        certificationstatus: res.data.data.shareHolder.certificationStatus // 认证状态
      })
    })
  },

  // 更改小区头像
  changeavatar4: function () {
    let that = this
    // 更换头像 上传后台
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // const images = that.data.images.concat(res.tempFilePaths)
        const images = res.tempFilePaths
        console.log('更改头像url', images)
        let webServerUrl2 = that.data.webServerUrl2
        // 把路径传给后台收到后台真实路径 保存下来
        wx.uploadFile({
          url: webServerUrl2 + '/smallArea/uploadSmallAreaIdentityImg',
          filePath: images[0],
          header: {
            'content-type': 'application/json',
            'sys_user_token': token
          },
          name: 'img',
          formData: {},
          success(res) {
            console.log('小区返回的资源', res)
            let data = JSON.parse(res.data)
            console.log('图片资源', data)
            let arr = []
            arr.push(data.data.picPath)
            // that.setData({
            //   images: arr
            // })
            // 设置员工头像
            let headImgUrl = data.data.headImgUrl
            console.log('设置员工头像参数1111', headImgUrl)
            let params = {
              img: headImgUrl
            }
            setSmallAreaIdentityImg(params).then(res => {
              if (res.data.code == 200) {
                console.log('员工头像设置成功', res)
                // 重新获取小区信息
                that.selfSmallAreaUserInfo()
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
    })
  },
  // 更改大区头像
  changeavatar3: function () {
    let that = this
    // 更换头像 上传后台
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // const images = that.data.images.concat(res.tempFilePaths)
        const images = res.tempFilePaths
        console.log('更改头像url', images)
        let webServerUrl2 = that.data.webServerUrl2
        // 把路径传给后台收到后台真实路径 保存下来
        wx.uploadFile({
          url: webServerUrl2 + '/bigArea/uploadBigAreaIdentityImg', //仅为示例，非真实的接口地址
          filePath: images[0],
          header: {
            'content-type': 'application/json',
            'sys_user_token': token
          },
          name: 'img',
          formData: {},
          success(res) {
            console.log('大区返回的资源', res)
            let data = JSON.parse(res.data)
            console.log('图片资源', data)
            // let arr = []
            // arr.push(data.data.headImgUrl)

            let headImgUrl = data.data.headImgUrl
            console.log('设置员工头像参数1111', headImgUrl)
            let params = {
              img: headImgUrl
            }
            setBigAreaIdentityImg(params).then(res => {
              if (res.data.code == 200) {
                console.log('员工头像设置成功', res)
                // 重新获取大区信息
                that.selfSmallAreaUserInfo()
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
    })
  },
  // 更改头像员工
  changeavatar: function () {
    let that = this
    // 更换头像 上传后台
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // const images = that.data.images.concat(res.tempFilePaths)
        const images = res.tempFilePaths
        console.log('更改头像url', images)
        let webServerUrl2 = that.data.webServerUrl2
        // 把路径传给后台收到后台真实路径 保存下来
        wx.uploadFile({
          // https://staff.yigoushidai.com:8085/roomAdmin/
          url: webServerUrl2 + '/roomStaffBase/uploadStaffHeadImg', //仅为示例，非真实的接口地址
          filePath: images[0],
          header: {
            'content-type': 'multipart/form-data',
            'sys_user_token': token
          },
          name: 'img',
          formData: {},
          success(res) {
            console.log('员工返回的资源', res)
            let data = JSON.parse(res.data)
            console.log('图片资源', data)
            let arr = []
            arr.push(data.data.headImgUrl)
            // that.setData({
            //   images: arr
            // })
            // 设置员工头像
            let headImgUrl = data.data.headImgUrl
            console.log('设置员工头像参数1111', headImgUrl)
            let params = {
              headImgUrl: headImgUrl
            }
            setRoomStaffHeadImg(params).then(res => {
              if (res.data.code == 200) {
                console.log('员工头像设置成功', res)
                // 重新获取员工信息
                that.getavater()
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
    })
  },
  // 更改股东头像 
  changeavatar5: function () {
    let that = this
    // 更换头像 上传后台
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // const images = that.data.images.concat(res.tempFilePaths)
        const images = res.tempFilePaths
        console.log('更改头像url', images)
        let webServerUrl2 = that.data.webServerUrl2
        // 把路径传给后台收到后台真实路径 保存下来
        wx.uploadFile({
          url: webServerUrl2 + '/shareHolder/uploadShareHolderIdentityImg', //仅为示例，非真实的接口地址
          filePath: images[0],
          header: {
            'content-type': 'application/json',
            'sys_user_token': token
          },
          name: 'img',
          formData: {},
          success(res) {
            console.log('股东返回的资源', res)
            let data = JSON.parse(res.data)
            console.log('图片资源', data)
            // let arr = []
            // arr.push(data.data.headImgUrl)

            let headImgUrl = data.data.headImgUrl
            console.log('设置员工头像参数1111', headImgUrl)
            let params = {
              img: headImgUrl
            }
            setShareHolderIdentityImg(params).then(res => {
              if (res.data.code == 200) {
                console.log('员工头像设置成功', res)
                // 重新获取大区信息
                that.selfShareHolderInfo()
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
    })
  },
  // 简历录入
  toresume: function () {
    wx.navigateTo({
      url: '/packageD/pages/resume/resume',
    })
  },
  // 修改账号
  tomodifyphonenumber: function (e) {
    console.log('e', e)
    let oldphone = e.currentTarget.dataset.oldphone
    wx.navigateTo({
      url: `/packageD/pages/modifyphonenumber/modifyphonenumber?oldphone=${oldphone}`,
    })
  },
  // 认证
  tocertification: function () {
    wx.navigateTo({
      url: '/packageD/pages/certification/certification',
    })
  },
  // 登出 回到我的模块
  logout: function () {
    // 清空token 返回我的模块 adminindex值修改为0
    try {
      wx.removeStorageSync('token')
      const pages = getCurrentPages()
      const prevPage = pages[pages.length - 2] // 上一页
      // 调用上一个页面的setData 方法，将数据存储
      prevPage.setData({
        admintypeindex: 0
      })
      wx.navigateBack({
        delta: 1,
      })
    } catch (e) {

    }

  }
})