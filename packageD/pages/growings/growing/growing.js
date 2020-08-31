import {
  getSelfDutyList, // 获取公司职务
  getSelfDutyUpgradeList, // 职务晋升列表数据
  uploadDutyUpgradePicture, // 上传职务晋升时的图片
  uploadDutyUpgradeVideo, // 上传职务晋升时的视频
  staffDutyUpgradeAssessment // 员工职务审核  dutyId 职务id picture 图片 video 视频
} from '../../../../route/mine/mygrowing/mygrowing'
import data from '../../../../route/api/baseUrl'
// 获取token
const token = wx.getStorageSync('token') || ''
Page({
  data: {
    webServerUrl2: data.upfileurl,
    BaseUrl: data.BaseUrl, // http请求url
    webServerUrl: data.webServerUrl, // 静态url
    dialogShow: false, // 弹窗选择员工
    showOneButtonDialog: false,
    gethigh: false, // 变高
    currentItemId: 0, // 职务轮排轮播图下标
    currentItemId2: 0, // 职务详情轮播图下标
    swiperHeight: '',
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    images: [], // 图片
    imagesreal: [], // 真的图片url
    videos: [], // 视频
    videosreal: [], // 真正视频url
    backClass2: [], // 职务详情轮播图
    dutyid: '', // 职务id
    sort: 0, // 辅助找到可以PC当前职位以上职位数组的参数
    firmDutyUpgradeDto: {}, // 目前的职务
    //////////////////////////////////////////////////////////////////////////////
    currentTime: '', // 当前的时间
    assesstime: '', // 考核的时间
    curreceptionNum: 0, // 当前职位的接待人数
    curdesignatedNum: 0, // 当前职位的指定人数
    curreceptionNum1: 0, // 当前职位的接待人数标准
    curdesignatedNum1: 0, // 当前职位的指定人数标准
    curreceptionNum2: 0, // PC端 顺序以上数组的第一个的接待人数标准
    curdesignatedNum2: 0, // PC端 顺序以上数组的第一个的制定人数标准
    items: [], //  PC端 当前职位顺序上的职位数组
    canupitem: [], // 可以晋升的数组
    timeok: false, // 是否到达审核时间
    numok: false, // 是否到达接待指定人数
    isopen: false // 是否打开
  },
  onLoad: function (options) {
    let that = this
    // 获取公司职务数据  第一个轮播图
    getSelfDutyList().then(res => {
      if (res.data.code == 200) {
        console.log('目前的职务', res)
        that.setData({
          firmDutyUpgradeDto: res.data.data.firmDutyUpgradeDto,
          sort: res.data.data.firmDutyUpgradeDto.sort,
          assesstime: res.data.data.firmDutyUpgradeDto.dutyData.assessTime
        })
        // 获取公司职务晋升列表数据 第二个轮播图
        getSelfDutyUpgradeList().then(res => {
          if (res.data.code == 200) {
            let arr = res.data.data.firmDutyUpgradeDtos
            let sort = that.data.sort // 目前的职务级别
            let arroversort = [] // 可以晋升的职务级别 console.log('目前的sort级别', sort)
            for (let j = 0; j < arr.length; j++) {
              if (arr[j].sort <= sort) {
                arroversort.push(arr[j])
              }
            }
            // 排序 console.log('排序前的数组', arroversort)
            let compare = function (obj1, obj2) {
              var val1 = obj1.sort;
              var val2 = obj2.sort;
              if (val1 < val2) {
                return 1;
              } else if (val1 > val2) {
                return -1;
              } else {
                return 0;
              }
            }
            arroversort.sort(compare)
            that.setData({
              backClass2: arr,
              items: arroversort
            })
            // 获取职务数据 遍历查到isCurr为true的 找寻它的下标 赋值给=>currentItemId
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].isCurr) {
                that.setData({
                  currentItemId2: i // 保存下标
                })
              }
            }
            console.log('排序过的数组 PC端 当前职位以上得职位数据', that.data.items)
            let items = that.data.items
            // 获取 1.当前职位的接待人数  2.当前职位的指定人数 
            // 获取 3.PC端顺序以上数组的第一个的标准接待人数 4.PC端顺序以上数组的第一个的标准指定人数
            that.setData({
              curreceptionNum: items[0].receptionNum, // 当前职位的接待人数
              curdesignatedNum: items[0].designatedNum, // 当前职位的指定人数
              curreceptionNum1: items[0].receptionNumber, // 当前职位的接待人数标准
              curdesignatedNum1: items[0].appointNumber, // 当前职位的指定人数标准
              curreceptionNum2: items[1].receptionNumber, //  PC端 顺序以上数组的第一个的接待人数标准
              curdesignatedNum2: items[1].appointNumber //  PC端 顺序以上数组的第一个的接待人数标准
            })

          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.message
            })
          }
        })
      } else {
        // wx.showToast({
        //   icon: 'none',
        //   title: res.data.message
        // })
      }
    })
    this.fresh()
  },
  // 更新时间数据
  fresh: function () {
    // 当前时间年月日
    let date = new Date()
    let yearnow = date.getFullYear(); // 获取当年
    let monthnow = date.getMonth() + 1; // 获取当月
    let daynow = date.getDate() // 获取当天
    if (monthnow < 10) {
      monthnow = '0' + monthnow
    }
    if (daynow < 10) {
      daynow = '0' + daynow
    }
    let currentTime = yearnow + '-' + monthnow + '-' + daynow
    this.setData({
      currentTime: currentTime
    })
  },
  // 判断是否满足条件打开晋升弹窗
  openConfirm: function () {
    // 1.获取参数
    let currentTime = this.data.currentTime
    let assesstime = this.data.assesstime
    let curreceptionNum = this.data.curreceptionNum // 1000
    let curdesignatedNum = this.data.curdesignatedNum // 1000
    let curreceptionNum1 = this.data.curreceptionNum1 // 当前职位的接待人数标准
    let curdesignatedNum1 = this.data.curdesignatedNum1 // 当前职位的指定人数标准
    let curreceptionNum2 = this.data.curreceptionNum2 //  PC端 顺序以上数组的第一个的接待人数标准
    let curdesignatedNum2 = this.data.curdesignatedNum2 //  PC端 顺序以上数组的第一个的指定人数标准
    console.log('当前时间', currentTime,
      '考核时间', assesstime,
      '当前职位接待人数', curreceptionNum,
      '当前职位指定人数', curdesignatedNum,
      '当前职位的接待人数标准', curreceptionNum1,
      '当前职位的指定人数标准', curdesignatedNum1,
      'PC端当前职位顺序上的职位标准接待人数', curreceptionNum2,
      'PC端当前职位顺序上的职位标准指定人数', curdesignatedNum2
    )
    // 判断1 当前时间是否大于等于考核时间
    let timeok = this.canuptime(currentTime, assesstime)
    // 判断2 当前人的实际接待人数和指定人数是否都超过 当前职位的标准接待指定人数 并且超过 下一个职位的标准接待指定人数
    let numok = this.canovernum(curreceptionNum, curdesignatedNum, curreceptionNum1, curdesignatedNum1, curreceptionNum2, curdesignatedNum2)
    this.setData({
      timeok: timeok,
      numok: numok
    })
    if (!timeok) {
      wx.showToast({
        icon: 'none',
        title: '未到审核时间'
      })
      return
    }
    if (!numok) {
      wx.showToast({
        icon: 'none',
        title: '接待人数和指定人数未满足条件'
      })
      return
    }
    // 如果上面两个限制都完成了 获取满足条件的职位
    let canupitem = this.getcanupitem()
    console.log('真正可以晋升的数组', canupitem)
    this.setData({
      dialogShow: true,
      canupitem: canupitem
    })
  },
  // 判断今天是否大于等于考核时间
  canuptime: function (today, textday) {
    let datetoday = new Date(today);
    let datetest = new Date(textday)
    let datetodaycur = datetoday.getTime()
    let datetestcur = datetest.getTime()
    console.log('datetodaycur', datetodaycur, 'datetestcur', datetestcur)
    if (datetodaycur >= datetestcur) {
      return true
    } else {
      return false
    }
  },
  // 判断目前 接待指定人数 大于等于目前职务和更高级职务标准的接待指定人数
  canovernum: function (curr, curd, curr1, curd1, curr2, curd2) {
    if ((curr >= curr1 && curr >= curr2) && (curd >= curd1 && curd >= curd2)) {
      return true
    } else {
      return false
    }
  },
  // 获取满足条件的职位(当前接待指定人数大于顺序上的职位)
  getcanupitem: function () {
    let items = this.data.items
    let curreceptionNum = this.data.curreceptionNum // 1000
    let curdesignatedNum = this.data.curdesignatedNum // 1000
    let arr = []
    // 遍历这个数组
    for (let item of items) {
      // 如果这个数组里面的对象 里面的接待人数和指定人数都小于等于目前职位的人数
      if (item.receptionNumber <= curreceptionNum && item.appointNumber <= curdesignatedNum) {
        arr.push(item)
      }
    }
    console.log('真正可以晋升的数组arr', arr)
    // 去掉自己目前的职务
    arr.splice(0, 1)
    return arr
  },











  // 确定参与考核 
  tapDialogButton(e) {
    // 获取参数   dutyId 职务id picture 图片 video 视频 
    let dutyId = this.data.dutyid
    let picture = this.data.imagesreal
    let video = this.data.videosreal
    let str = ''
    let canupitem = this.data.canupitem
    if (canupitem.length == 0) {
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
      return
    }

    // 确定按钮
    if (e.detail.index == 1) {
      // 1.判断能否打开 晋升职位按钮
      // 2.处理图片参数
      if (picture.length == 0) {
        str = ''
      } else {
        for (let i = 0; i < picture.length; i++) {
          str += picture[i] + ','
        }
        // 去掉做后一个没用的逗号
        str = str.substring(0, str.length - 1)
      }
      // 3.准备参数
      let params = {
        dutyId: dutyId,
        picture: str,
        video: video[0] || ''
      }
      // 4.提交审核
      staffDutyUpgradeAssessment(params).then(res => {
        if (res.data.code == 200) {
          console.log('审核结果', res)
          wx.showToast({
            title: '申请成功',
            duration: 1500,
            success: function () {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/packageD/pages/growings/applicationrecords/applicationrecords',
                })
              }, 1500)
            }
          })
        }
        // 并无权限跳级别审核
        if (res.data.code == 10022) {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        }
      })
    }
    // 关闭弹窗
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },





















  // 获取考核职业
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    this.setData({
      dutyid: e.detail.value // 获取职务id
    })
  },
  // 我的成就 跳转我的成就 看自己历史申请记录
  toapplicationrecords() {
    wx.navigateTo({
      url: '/packageD/pages/growings/applicationrecords/applicationrecords',
    })
  },
  // 上传视频
  upvideo: function () {
    let currentTime = this.data.currentTime
    let assesstime = this.data.assesstime
    let curreceptionNum = this.data.curreceptionNum // 1000
    let curdesignatedNum = this.data.curdesignatedNum // 1000
    let curreceptionNum1 = this.data.curreceptionNum1 // 当前职位的接待人数标准
    let curdesignatedNum1 = this.data.curdesignatedNum1 // 当前职位的指定人数标准
    let curreceptionNum2 = this.data.curreceptionNum2 //  PC端 顺序以上数组的第一个的接待人数标准
    let curdesignatedNum2 = this.data.curdesignatedNum2 //  PC端 顺序以上数组的第一个的指定人数标准
    console.log('当前时间', currentTime,
      '考核时间', assesstime,
      '当前职位接待人数', curreceptionNum,
      '当前职位指定人数', curdesignatedNum,
      '当前职位的接待人数标准', curreceptionNum1,
      '当前职位的指定人数标准', curdesignatedNum1,
      'PC端当前职位顺序上的职位标准接待人数', curreceptionNum2,
      'PC端当前职位顺序上的职位标准指定人数', curdesignatedNum2
    )
    // 判断1 当前时间是否大于等于考核时间
    let timeok = this.canuptime(currentTime, assesstime)
    // 判断2 当前人的实际接待人数和指定人数是否都超过 当前职位的标准接待指定人数 并且超过 下一个职位的标准接待指定人数
    let numok = this.canovernum(curreceptionNum, curdesignatedNum, curreceptionNum1, curdesignatedNum1, curreceptionNum2, curdesignatedNum2)
    if (!timeok) {
      wx.showToast({
        icon: 'none',
        title: '未到审核时间'
      })
      return
    }
    if (!numok) {
      wx.showToast({
        icon: 'none',
        title: '接待人数和指定人数未满足条件'
      })
      return
    }
    let that = this
    let webServerUrl2 = this.data.webServerUrl2
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      compressed: true,
      camera: 'back',
      success(res) {
        console.log('用户上传视频', res.tempFilePath)
        let videosreal = that.data.videosreal
        if (videosreal.length >= 1) {
          wx.showToast({
            icon: 'none',
            title: '视频数量只能为一个 时间不超过60秒'
          })
          return
        }
        if (res.duration > 60) {
          wx.showToast({
            icon: 'none',
            title: '视频时长保证在60秒内',
          })
          return
        }
        wx.uploadFile({
          url: webServerUrl2 + '/roomStaffBase/uploadDutyUpgradeVideo',
          filePath: res.tempFilePath,
          name: 'video',
          formData: {},
          header: {
            'content-type': 'application/json',
            'sys_user_token': token
          },
          success(res) {
            console.log('上传视频完成返回路径', res)
            let data = JSON.parse(res.data)
            console.log('视频资源', data)
            if (data.code == 200) {
              let video = data.data.video
              videosreal.push(video)
              console.log('真正的图片路径', video)
              that.setData({
                videosreal: videosreal
              })
              wx.showToast({
                title: '视频上传成功'
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: data.message
              })
            }
          }
        })
      }
    })

  },
  // 上传图片 数量不能超过3张
  upimg: function () {
    let currentTime = this.data.currentTime
    let assesstime = this.data.assesstime
    let curreceptionNum = this.data.curreceptionNum // 1000
    let curdesignatedNum = this.data.curdesignatedNum // 1000
    let curreceptionNum1 = this.data.curreceptionNum1 // 当前职位的接待人数标准
    let curdesignatedNum1 = this.data.curdesignatedNum1 // 当前职位的指定人数标准
    let curreceptionNum2 = this.data.curreceptionNum2 //  PC端 顺序以上数组的第一个的接待人数标准
    let curdesignatedNum2 = this.data.curdesignatedNum2 //  PC端 顺序以上数组的第一个的指定人数标准
    console.log('当前时间', currentTime,
      '考核时间', assesstime,
      '当前职位接待人数', curreceptionNum,
      '当前职位指定人数', curdesignatedNum,
      '当前职位的接待人数标准', curreceptionNum1,
      '当前职位的指定人数标准', curdesignatedNum1,
      'PC端当前职位顺序上的职位标准接待人数', curreceptionNum2,
      'PC端当前职位顺序上的职位标准指定人数', curdesignatedNum2
    )
    // 判断1 当前时间是否大于等于考核时间
    let timeok = this.canuptime(currentTime, assesstime)
    // 判断2 当前人的实际接待人数和指定人数是否都超过 当前职位的标准接待指定人数 并且超过 下一个职位的标准接待指定人数
    let numok = this.canovernum(curreceptionNum, curdesignatedNum, curreceptionNum1, curdesignatedNum1, curreceptionNum2, curdesignatedNum2)
    if (!timeok) {
      wx.showToast({
        icon: 'none',
        title: '未到审核时间'
      })
      return
    }
    if (!numok) {
      wx.showToast({
        icon: 'none',
        title: '接待人数和指定人数未满足条件'
      })
      return
    }
    let that = this
    let webServerUrl2 = this.data.webServerUrl2
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log("图片", tempFilePaths)
        // 真正路径数组
        let imagesreal = that.data.imagesreal
        let arr = tempFilePaths
        // 图片不能超过三张
        if (imagesreal.length >= 3) {
          wx.showToast({
            icon: 'none',
            title: '最多上传3张图片',
            duration: 2000
          })
          return
        }

        // 遍历上传图片
        for (let i = 0; i < tempFilePaths.length; i++) {
          // 图片不能超过三张
          if (imagesreal.length >= 3) {
            wx.showToast({
              icon: 'none',
              title: '最多上传3张图片',
              duration: 2000
            })
            return
          }

          console.log('每次传进一张图片前的真正图片路径', imagesreal)
          wx.uploadFile({
            url: webServerUrl2 + '/roomStaffBase/uploadDutyUpgradePicture',
            filePath: arr[i],
            name: 'pic',
            formData: {},
            header: {
              'content-type': 'application/json',
              'sys_user_token': token
            },
            success(res) {
              console.log('图片', res)
              console.log('上传图片完成返回路径', res)
              let data = JSON.parse(res.data)
              console.log('图片资源', data)
              if (data.code == 200) {
                let video = data.data.video
                imagesreal.push(video)
                that.setData({
                  imagesreal: imagesreal
                })
                console.log('真正的图片路径', that.data.imagesreal)
                wx.showToast({
                  title: '图片上传成功',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: data.message
                })
              }
            }
          })
        }

      }


    })
  },



















  // 清空视频图片
  clear: function () {
    this.setData({
      images: [], // 图片
      imagesreal: [], // 真的图片url
      videos: [], // 视频
      videosreal: [] // 真正视频url
    })
    wx.showToast({
      title: '清空成功',
    })

  },
  // 获取高度
  gethigh: function (e) {
    let isopen = this.data.isopen
    this.setData({
      isopen: !isopen
    })
    console.log('e', e)
    // let gethigh = !this.data.gethigh
    // let that = this
    // this.setData({
    //   gethigh: gethigh
    // })
    // const query = wx.createSelectorQuery()
    // query.select('.li22').boundingClientRect()
    // query.exec(function (res) {
    //   console.log(res)
    //   console.log(res[0].height)
    //   console.log(res[0].height)
    //   let sumHeigth = res[0].height * 2;
    //   console.log('sumHeigth', sumHeigth)
    //   setTimeout(() => {
    //     that.setData({
    //       swiperHeight: sumHeigth,
    //     })
    //   }, 50)
    // })
  }
})


// // 当前时间年月日
// const date = new Date()
// let yearnow = date.getFullYear(); // 获取当年
// let monthnow = date.getMonth() + 1; // 获取当月
// let daynow = date.getDate() // 获取当天
// if (monthnow < 10) {
//   monthnow = '0' + monthnow
// }
// if (daynow < 10) {
//   daynow = '0' + daynow
// }

// let currentTime = yearnow + '-' + monthnow + '-' + daynow