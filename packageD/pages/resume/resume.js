import {
  getSelfSimpleBaseInfo, // 获取简历
  setStaffSimpleBaseInfo // 设置简历
} from '../../../route/mine/mineprofile/mineprofile'
import data from '../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    learnExperience: '',
    workExperience: '',
    awardExperience: ''
  },
  onLoad: function (options) {
    this.getSelfSimpleBaseInfo()
  },
  // 获取简历信息
  getSelfSimpleBaseInfo: function () {
    let that = this
    getSelfSimpleBaseInfo().then(res => {
      if (res.data.code == 200) {
        console.log('录入信息', res)
        let learnExperience = res.data.data.learnExperience == -1 ? '' : res.data.data.learnExperience
        let workExperience = res.data.data.workExperience == -1 ? '' : res.data.data.workExperience
        let awardExperience = res.data.data.awardExperience == -1 ? '' : res.data.data.awardExperience
        console.log('learnExperience', 'workExperience', 'awardExperience', learnExperience, workExperience, awardExperience)
        that.setData({
          learnExperience: learnExperience,
          workExperience: workExperience,
          awardExperience: awardExperience
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.message
        })
      }
    })
  },
  // 学习经历
  getlearnExperience: function (e) {
    console.log('e', e)
    this.setData({
      learnExperience: e.detail.value.trim()
    })
  },
  // 工作经历
  getworkExperience: function (e) {
    console.log('e', e)
    this.setData({
      workExperience: e.detail.value.trim()
    })
  },
  // 获奖经历
  getawardExperience: function (e) {
    console.log('e', e)
    this.setData({
      awardExperience: e.detail.value.trim()
    })
  },
  // 提交数据
  sure: function () {
    let params = {
      learnExperience: this.data.learnExperience,
      workExperience: this.data.workExperience,
      awardExperience: this.data.awardExperience
    }
    if (this.data.learnExperience.length == 0 && this.data.workExperience.length == 0 && this.data.awardExperience.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '内容不能为空'
      })
      return
    }
    setStaffSimpleBaseInfo(params).then(res => {
      if (res.data.code == 200) {
        wx.showToast({
          title: '录入成功',
          duration: 2500,
          success: function () {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
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

  }
})