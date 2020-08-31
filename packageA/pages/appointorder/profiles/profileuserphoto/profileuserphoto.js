import {
  getUserPictureRcds, // 获取照片
  setUserPicture // 修改照片
} from '../../../../../route/index/appointorder/profile'
import data from '../../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    images: [], // 存储图片
    picPath: '', // 后台处理好流返回来的url
    isup: false,
    uid: '', // 会员uid
    currPage: 1, // 当前页面
    pageSize: 7, // 每页请求数据
    list: [], //列表数据
    isend: false, // 是否最后一页
  },
  onLoad: function (options) {
    console.log('会员uid', options.uid)
    this.setData({
      uid: options.uid
    })
    // 请求数据 渲染
    this.loadMore()
  },
  // 上拉加载
  loadMore() {
    console.log('上拉')
    let that = this
    // 获取当前页 类型 信息数量 是否请求
    let uid = this.data.uid
    let isend = this.data.isend
    let currPage = this.data.currPage
    let pageSize = this.data.pageSize
    console.log("当前分页", currPage, '请求信息数', pageSize)
    let params = {
      uid: uid,
      currPage: currPage,
      pageSize: pageSize
    }
    if (!isend) {
      console.log("加载更多")
      getUserPictureRcds(params).then(res => {
        console.log("默认请求", res)
        if (res.data.code == 200) {
          console.log("分页列表数据", res.data.data.contents)
          console.log("总页数", res.data.data.totalPages)
          if (res.data.data.contents.length < pageSize) {
            console.log("最后一页")
            that.setData({
              isend: true
            })
          } else {
            that.setData({
              isend: false
            })
          }
          let currPage = ++that.data.currPage
          let list = that.data.list.concat(res.data.data.contents)
          that.setData({
            list: list,
            currPage: currPage
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.code + ':' + res.data.message,
            duration: 2000
          })

        }
      })
    } else {
      console.log("不请求")
      return
    }
  },
  // 上传图片2
  save: function () {
    let that = this
    let uid = that.data.uid
    let picPath = that.data.picPath
    let images = that.data.images
    // 如果用户选择了图片
    if (images.length > 0) {
      let params = {
        uid: uid,
        picPath: picPath
      }
      setUserPicture(params).then(res => {
        if (res.data.code == 200) {
          console.log("上传成功", res)
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
            title: res.data.code + ':' + res.data.message,
            duration: 2000
          })

        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请选择图片',
      })
    }
  },
  // 上传图片1
  upimg: function () {
    // 获取用户token
    let token = wx.getStorageSync('token')
    console.log('token', token)
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("图片", res)
        const images = that.data.images.concat(res.tempFilePaths)
        console.log(images)
        // 限制最多只能留下3张照片
        // this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        // 渲染
        that.setData({
          images: images,
          isup: true
        })
        wx.uploadFile({
          url: `${data.BaseUrl}/roomStaffUserArchives/uploadUserPicture`,
          filePath: images[0],
          name: 'picFile', // 和后端沟通好 接收文件的name
          header: { // 请求头
            sys_user_token: token // 问问后端是否需要token 不需要就不用传
          },
          success: res => { // 上传成功后的代码
            let result = JSON.parse(res.data)
            console.log('图片url', result)
            if (result.code == 200) {
              that.setData({
                picPath: result.data.picPath
              })
            }
          }
        })

      }
    })
  },
  // 预览图片
  handleImagePreview(e) {
    console.log('e', e)
    const idx = e.target.dataset.idx
    const url = e.target.dataset.url
    const images = []
    images.push(url)
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
    images.splice(idx, 1)
    this.setData({
      images: images,
      isup: false
    })
  }
})