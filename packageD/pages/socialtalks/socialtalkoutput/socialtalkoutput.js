import {
  addHeartVoicePosts // 发表帖子
} from '../../../../route/mine/socialtalks/socialtalks'
import data from '../../../../route/api/baseUrl'
const token = wx.getStorageSync('token') || ''
Page({
  data: {
    webServerUrl: data.webServerUrl,
    webServerUrl2: data.upfileurl,
    title: '',
    detailCtn: '',
    images: [],
    imagesreal: [],
    isfakeshow: true,
    isup: false,
    isAnonymous: false,
    noname: 1
  },
  onLoad: function (options) {},
  // 提交上传
  sureup: function () {
    // detailCtn imgs[] isAnonymous 0不是 1 是 title
    let title = this.data.title
    let detailCtn = this.data.detailCtn
    let imgs = this.data.imagesreal
    let isAnonymous = this.data.noname
    if (title.length == 0 || detailCtn.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '主题和心声详情不能为空',
      })
      return
    }
    let params = {
      title: title,
      detailCtn: detailCtn,
      imgs: imgs,
      isAnonymous: isAnonymous
    }
    console.log('params', params)
    addHeartVoicePosts(params).then(res => {
      if (res.data.code == 200) {
        console.log('上传成功', res)
        wx.showToast({
          title: '上传成功',
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
          title: res.data.message
        })
      }
    })
  },
  // 返回上一页面 刷新帖子分页
  onUnload: function () {
    var pages = getCurrentPages(); // 当前页面
    console.log('当前页面', pages)
    var beforePage = pages[pages.length - 2];
    beforePage.clearIndex(); // 执行前一个页面的onLoad方法
  },
  gettitle: function (e) {
    let value = e.detail.value
    console.log('标题', value)
    this.setData({
      title: e.detail.value
    })
  },
  getdetailCtn: function (e) {
    let value = e.detail.value
    console.log('内容', value)
    this.setData({
      detailCtn: e.detail.value
    })
  },
  // 上传图片
  upimg: function () {
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const images = that.data.images.concat(res.tempFilePaths)
        console.log('上传的图片111111', images)
        // 限制最多只能留下3张照片
        // that.data.images = images.length <= 3 ? images : images.slice(0, 3)
        let webServerUrl2 = that.data.webServerUrl2
        // 调用 这块循环次数 要用每次上传过的图片数量来判断 不能用综合image来判断
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          wx.showLoading()
          wx.uploadFile({
            url: webServerUrl2 + '/roomStaffWorks/uploadWorksImg', //仅为示例，非真实的接口地址
            filePath: images[i],
            header: {
              'content-type': 'application/json',
              'sys_user_token': token
            },
            name: 'img',
            formData: {},
            success(res) {
              wx.hideLoading()
              // console.log('上传图片完成返回路径', res)
              let data = JSON.parse(res.data)
              console.log('图片资源', data)
              let imagesreal = that.data.imagesreal
              imagesreal.push(data.data.picPath)
              that.setData({
                imagesreal: imagesreal
              })
              console.log('真正的图片路径', that.data.imagesreal)
            }
          })
        }
        // 渲染
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
  isAnonymous: function () {
    let isAnonymous = this.data.isAnonymous
    this.setData({
      isAnonymous: !isAnonymous
    })
    console.log(this.data.isAnonymous)
    if (this.data.isAnonymous) {
      this.setData({
        noname: 0
      })
    } else {
      this.setData({
        noname: 1
      })
    }
    console.log(this.data.noname)
  }
})