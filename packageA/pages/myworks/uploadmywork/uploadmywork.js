import {
  uploadWorks, // 上传图片
  getFaceTypes, // 获取脸型
  getHairLenTypes, // 获取发长
  getHairTypes, // 获取发型
} from '../../../../route/index/mywork/mywork'
const token = wx.getStorageSync('token') || ''
import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    webServerUrl2: data.upfileurl,
    images: [],
    imagesreal: [],
    isfakeshow: true,
    isup: false,
    ctn: '', // 输入内容
    hairlength: [], // 发长
    facestyle: [], // 脸型
    hairstyle: [], // 发型
    faceType: '', // 脸型id
    hairLengthType: '', // 发长id
    hairType: '', // 发型id
    mywork: {},
    type: [{
        value: 'new',
        name: '最新',
        checked: 'true'
      },
      {
        value: 'hot',
        name: '最热',
      },
    ]
  },
  onLoad: function (options) {
    // 获取脸型 发长 发型
    this.getFaceTypes()
    this.getHairLenTypes()
    this.getHairTypes()
  },
  // 获取发长
  getHairLenTypes: function () {
    let that = this
    getHairLenTypes().then(res => {
      console.log('发长', res)
      that.setData({
        hairlength: res.data.data.hairLenTypes
      })
    })
  },
  // 获取脸型
  getFaceTypes: function () {
    let that = this
    getFaceTypes().then(res => {
      console.log('脸型', res)
      that.setData({
        facestyle: res.data.data.faceTypes
      })
    })
  },
  // 获取发型
  getHairTypes: function () {
    let that = this
    getHairTypes().then(res => {
      console.log('发型', res)
      that.setData({
        hairstyle: res.data.data.hairTypes
      })
    })
  },
  // 上传图片
  upimg: function () {
    let that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("上传图片", images)
        let webServerUrl2 = that.data.webServerUrl2
        wx.showLoading({
          title: '加载中...',
        })
        // 调用 这块循环次数 要用每次上传过的图片数量来判断 不能用综合image来判断
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          wx.uploadFile({
            url: webServerUrl2 + '/roomStaffWorks/uploadWorksImg',
            filePath: res.tempFilePaths[i],
            header: {
              'content-type': 'multipart/form-data',
              'sys_user_token': token
            },
            name: 'img',
            formData: {},
            success(res) {
              console.log('上传图片完成返回路径', res)
              let data = JSON.parse(res.data)
              console.log('图片资源', data)
              let imagesreal = that.data.imagesreal
              imagesreal.push(data.data.picPath)
              that.setData({
                imagesreal: imagesreal
              })
              console.log('真正的图片路径', that.data.imagesreal)
              wx.hideLoading()
            },
            fail() {
              wx.hideLoading()
              wx.showToast({
                icon: 'none',
                title: '网络环境不好 上传失败',
                duration: 2000
              })
              that.setData({
                images: [],
                isup: true
              })
              return
            }
          })
        }
        wx.hideLoading()
        // 渲染
        const images = that.data.images.concat(res.tempFilePaths)
        that.setData({
          images: images,
          isup: true
        })
      }
    })
  },
  // 预览图片
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  // 删除图片
  removeImage(e) {
    const idx = e.target.dataset.idx
    console.log(idx)
    let images = this.data.images
    let imagesreal = this.data.imagesreal
    images.splice(idx, 1)
    imagesreal.splice(idx, 1)
    this.setData({
      images: images,
      imagesreal: imagesreal
    })
    console.log('预览 真实', this.data.images, this.data.imagesreal)
    // 全部删除完了
    if (images.length == 0) {
      this.setData({
        isup: false
      })
    }
  },
  // 输入描述 保存描述内容
  bindinput: function (e) {
    console.log('输入内容', e.detail.value)
    this.setData({
      ctn: e.detail.value
    })
  },
  // 获取发长id
  radioChange1: function (e) {
    console.log('radio发生change事件 发长id', e.detail.value)
    this.setData({
      hairLengthType: e.detail.value
    })
  },
  // 获取脸型id
  radioChange2: function (e) {
    console.log('radio发生change事件 脸型id', e.detail.value)
    this.setData({
      faceType: e.detail.value
    })
  },
  // 获取发型id
  radioChange3: function (e) {
    console.log('radio发生change事件 发型id', e.detail.value)
    this.setData({
      hairType: e.detail.value
    })
  },

  // 提交上传
  sureup: function () {
    // ctn faceType hairLengthType hairType worksImgs
    // 获取内容 发长 
    let ctn = this.data.ctn
    let faceType = this.data.faceType
    let hairLengthType = this.data.hairLengthType
    let hairType = this.data.hairType
    let worksImgs = this.data.imagesreal
    console.log('worksImgs111', worksImgs)
    // 限制一下图片数量
    if (worksImgs.length < 3) {
      wx.showToast({
        icon: 'none',
        title: '上传图片数量至少三张',
      })
      return
    }
    let params = {
      ctn: ctn,
      faceType: faceType,
      hairLengthType: hairLengthType,
      hairType: hairType,
      worksImgs: worksImgs
    }
    uploadWorks(params).then(res => {
      console.log('res', res)
      if (res.data.code == 200) {
        wx.showToast({
          title: '上传成功',
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
      } else {
        wx.showToast({
          icon: 'none',
          title: '所有选项为必选 图片数量为3张或6张或9张 ',
          duration: 3000
        })
      }
    })
  }










  // radioChange4: function (e) {
  //   console.log('radio发生change事件，携带value值为：', e.detail.value)
  //   // const items = this.data.items
  //   // for (let i = 0, len = items.length; i < len; ++i) {
  //   //   items[i].checked = items[i].value === e.detail.value
  //   // }
  // },

})