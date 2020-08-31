const date = new Date()
const years = []
const months = []
const days = []
for (let i = 2015; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = '0' + i
  }
  months.push(i)
}
// 数据分析
const date1 = new Date()
const years1 = []
const months1 = []
const days1 = []
for (let i = 2015; i <= date1.getFullYear(); i++) {
  years1.push(i)
}
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = '0' + i
  }
  months1.push(i)
}
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = '0' + i
  }
  days1.push(i)
}
// 1.报销相关接口
const token = wx.getStorageSync('token') || ''
// 1.1 报销权限 + admintype == 6
import {
  selfPermissions // 判断权限有无
} from '../../../../route/admin/admin'
import {
  getSelfMySysUserInfo // 获取自己admintype
} from '../../../../route/index/guanjiaoutside/guanjiaoutside'
// 1.2 报销相关接口
import {
  addRoomReimbursement // 提交报销接口
} from '../../../../route/mine/operatingdatas/operatingdata'


import data from '../../../../route/api/baseUrl'
Page({
  data: {
    webServerUrl: data.webServerUrl,
    webServerUrl2: data.upfileurl,
    isShowDataAnalyse: true, // 数据分析
    isRuleTrue: false, // 打开右边栏
    isRuleTrue2: false,
    isstart: false, // 控制侧栏框
    // 大区
    DAitems: [{
        name: '大区1',
        bigareaid: '1', // 大区id
        isselected: false, // 选中未选中
        isopen: false, // 是否展开
        second: [{
          name: '小区11',
          bigareaid: 1, // 大区id
          smallareaid: '11', // 小区id
          isselected: false,
          isopen: false, // 是否展开
          third: [{
            name: '门店111',
            bigareaid: 1, // 大区id
            smallareaid: '11', // 小区id
            storeid: '111', // 门店id
            isselected: false, // 是否选中
            isopen: false, // 是否展开
            // 店员们
            workers: [{
              name: '佳文',
              bigareaid: 1, // 大区id
              smallareaid: '11', // 小区id
              storeid: '111', // 门店id
              id: '1111',
              isselected: false, // 是否选中
            }, {
              name: 'CD',
              bigareaid: 1, // 大区id
              smallareaid: '11', // 小区id
              storeid: '111', // 门店id
              id: '1112',
              isselected: false, // 是否选中
            }],
          }, {
            name: '门店112',
            bigareaid: 1, // 大区id
            smallareaid: '11', // 小区id
            storeid: '112', // 门店id
            isselected: false, // 是否选中
            isopen: false, // 是否展开
            // 店员们
            workers: [{
              name: '叮当',
              bigareaid: 1, // 大区id
              smallareaid: '11', // 小区id
              storeid: '112', // 门店id
              id: '1121', // 员工id
              isselected: false, // 是否选中
            }, {
              name: 'CD',
              bigareaid: 1, // 大区id
              smallareaid: '11', // 小区id
              storeid: '112', // 门店id
              id: '1122',
              isselected: false, // 是否选中
            }],
          }]
        }, {
          name: '小区12',
          bigareaid: 1,
          smallareaid: '12',
          isselected: false,
          isopen: false, // 是否展开
          third: [{
            name: '门店121',
            bigareaid: 1, // 大区id
            smallareaid: '12', // 小区id
            storeid: '121', // 门店id
            isselected: false,
            isopen: false, // 是否展开
            // 店员们
            workers: [{
              name: '鹏哥',
              bigareaid: 1, // 大区id
              smallareaid: '12', // 小区id
              storeid: '121', // 门店id
              id: '1211',
              isselected: false, // 是否选中
            }, {
              name: '王松',
              bigareaid: 1, // 大区id
              smallareaid: '12', // 小区id
              storeid: '121', // 门店id
              id: '1212',
              isselected: false, // 是否选中
            }],
          }, {
            name: '门店122',
            smallareaid: '12', // 小区id
            bigareaid: 1, // 大区id
            storeid: '122', // 门店id
            isselected: false,
            isopen: false, // 是否展开
            // 店员们
            workers: [{
              name: '东瑞',
              bigareaid: 1, // 大区id
              smallareaid: '12', // 小区id
              storeid: '122', // 门店id
              id: '1221',
              isselected: false, // 是否选中
            }, {
              name: '罗头',
              bigareaid: 1, // 大区id
              smallareaid: '12', // 小区id
              storeid: '122', // 门店id
              id: '1222',
              isselected: false, // 是否选中
            }],
          }]
        }],
      },
      {
        name: '大区2',
        bigareaid: '2',
        isselected: false, // 选中未选中
        isopen: false, // 是否展开
        second: [{
          name: '小区21',
          bigareaid: 2,
          smallareaid: '21',
          isselected: false, // 是否选中
          isopen: false, // 是否展开
          third: [{
            name: '门店211',
            bigareaid: 2, // 大区id
            smallareaid: '21', // 小区id
            storeid: '211', // 门店id
            isselected: false, // 是否选中
            isopen: false, // 是否展开
            // 店员们
            workers: []
          }]
        }, {
          name: '小区22',
          bigareaid: 2,
          smallareaid: '22',
          isselected: false, // 是否选中
          isopen: false, // 是否展开
          third: [{
            name: '门店221',
            bigareaid: 2, // 大区id
            smallareaid: '22', // 小区id
            storeid: '221', // 门店id
            isselected: false, // 是否选中
            isopen: false, // 是否展开
            // 店员们
            workers: []
          }, {
            name: '门店222',
            bigareaid: 2, // 大区id
            smallareaid: '22', // 小区id
            storeid: '222', // 门店id
            isselected: false, // 是否选中
            isopen: false, // 是否展开
            // 店员们
            workers: []
          }]
        }],
      }
    ],
    // 五个选择
    five: [{
      name: '业绩',
      id: 1
    }, {
      name: '会员',
      id: 1
    }, {
      name: '客流',
      id: 1
    }, {
      name: '项目',
      id: 1
    }, {
      name: '支出',
      id: 1
    }],
    // 三个时间
    threeTime: [{
      name: '今天',
      id: '1'
    }, {
      name: '本周',
      id: '2'
    }, {
      name: '本月',
      id: '3'
    }],
    starttime: '',
    endtime: '',
    years1: years1,
    months1: months1,
    days1: days1,
    value1: [999, 0, 0],
    dialogShow: false,
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    activeIndex2: 0,
    activeIndex: 0,
    DAvalue: '', // 报销金额
    DAvalue2: '', // 报销理由
    images: [], // 报销图片只是为了显示
    imagesreal: [], // 真正的报销图片路径
    isfakeshow: true,
    admintype: 0, // 权限 4 大区 3 小区 5 股东 6 员工(店长)
    // 展示门店
    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    isShowDataCompare: false, // 数据对比
    isallowOpen: true, // 是否允许展开(必须多选框checked都false)
    // 门店和员工
    items: [{
        id: 'USA',
        name: '仓岛美业-天通苑店1',
        isdisabled: false, // 是否禁用门店复选框
        isShowWorker: false, // 是否显示门店员工 
        checked: false, // 是否选中门店
        // 该门店员工情况
        worker: [{
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'USA', // 门店id
          workerid: 1
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'USA',
          workerid: 2
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'USA',
          workerid: 3
        }]
      },
      {
        id: 'CHN',
        name: '仓岛美业-天通苑店2',
        // checked: false,
        isdisabled: false,
        isShowWorker: false,
        checked: false,
        worker: [{
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'CHN',
          workerid: 4
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'CHN',
          workerid: 5
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'CHN',
          workerid: 6
        }]
      },
      {
        id: 'ZHE',
        name: '仓岛美业-天通苑店3',
        isdisabled: false,
        isShowWorker: false,
        checked: false,
        worker: [{
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZHE',
          workerid: 7
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZHE',
          workerid: 8
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZHE',
          workerid: 9
        }]
      },
      {
        id: 'YYY',
        name: '仓岛美业-天通苑店3',
        isdisabled: false,
        isShowWorker: false,
        checked: false,
        worker: [{
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'YYY',
          workerid: 10
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'YYY',
          workerid: 11
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'YYY',
          workerid: 12
        }]
      },
      {
        id: 'ZZZ',
        name: '仓岛美业-天通苑店3',
        isdisabled: false,
        isShowWorker: false,
        checked: false,
        worker: [{
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 13
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 14
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 15
        }]
      },
      {
        id: 'ZZZ',
        name: '仓岛美业-天通苑店3',
        isdisabled: false,
        isShowWorker: false,
        checked: false,
        worker: [{
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 13
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 14
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 15
        }]
      }, {
        id: 'ZZZ',
        name: '仓岛美业-天通苑店3',
        isdisabled: false,
        isShowWorker: false,
        checked: false,
        worker: [{
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 13
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 14
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 15
        }]
      }, {
        id: 'ZZZ',
        name: '仓岛美业-天通苑店3',
        isdisabled: false,
        isShowWorker: false,
        checked: false,
        worker: [{
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 13
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 14
        }, {
          name: '佳文',
          position: '高级造型师',
          isSelected: false,
          id: 'ZZZ',
          workerid: 15
        }]
      }
    ],
    store: [],
    workers: [],
    // 多店(人)单月
    dialogShow1: false,
    showOneButtonDialog1: false,
    // 单店(人)多月
    dialogShow2: false,
    showOneButtonDialog2: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    // 多店(人)单月
    years: years,
    months: months,
    months2: [{
        value: '01',
        name: '01'
      },
      {
        value: '02',
        name: '02'
      },
      {
        value: '03',
        name: '03'
      },
      {
        value: '04',
        name: '04'
      },
      {
        value: '05',
        name: '05'
      },
      {
        value: '06',
        name: '06'
      },
      {
        value: '07',
        name: '07'
      }, {
        value: '08',
        name: '08'
      }, {
        value: '09',
        name: '09'
      }, {
        value: '10',
        name: '10'
      }, {
        value: '11',
        name: '11'
      }, {
        value: '12',
        name: '12'
      }
    ]
  },
  onLoad: function (options) {
    // 初始化tabs数据
    const titles = [{
      title: '数据分析',
      id: 0
    }, {
      title: '数据对比',
      id: 1
    }]
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs
    })
    let that = this
    getSelfMySysUserInfo().then(res => {
      if (res.data.code == 200) {
        console.log('员工数据 + 自己的级别', res)
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
  // 点击选择数据分析 || 数据对比
  onTabCLick: function (e) {
    console.log('情况', e)
    let index = e.detail.index
    console.log(index)
    // 显示数据分析
    if (index == 0) {
      this.setData({
        isShowDataAnalyse: true,
        isShowDataCompare: false
      })
    }
    // 显示数据对比
    else if (index == 1) {
      this.setData({
        isShowDataAnalyse: false,
        isShowDataCompare: true
      })
    }
  },
  ///////////数据分析///////////////////
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  // 上传图片
  handleImagePreview: function () {
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
          images: images
        })
      }
    })
  },
  // 右边侧边栏
  DAtranslate: function () {
    this.setData({
      isRuleTrue: true
    })
    this.animation.translate(-245, 0).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 取消
  DAcancel: function () {
    this.setData({
      isRuleTrue: false
    })
    this.animation.translate(0, 0).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 完成并且关闭
  DAsuccess: function () {
    this.setData({
      isRuleTrue: false
    })
    this.animation.translate(0, 0).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 阻止滑动
  DAprevent: function () {
    return
  },
  // 三选一时间
  DAchooseOne: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    this.setData({
      activeIndex2: index
    })
  },
  // 点击打开时间选择器
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  // 获取开始时间
  bindChange1(e) {
    const val = e.detail.value
    console.log('1111111111111111', val)
    this.setData({
      year: this.data.years1[val[0]],
      month: this.data.months1[val[1]],
      day: this.data.days1[val[2]],
    })
    let year = this.data.year.toString()
    let month = this.data.month.toString()
    let day = this.data.day.toString()
    let startTime = year + '-' + month + '-' + day
    console.log(startTime)
    this.setData({
      startTime: startTime
    })

  },
  // 获取结束时间
  bindChange2(e) {
    const val = e.detail.value
    console.log('1111111111111111', val)
    this.setData({
      year: this.data.years1[val[0]],
      month: this.data.months1[val[1]],
      day: this.data.days1[val[2]]
    })
    let year = this.data.year.toString()
    let month = this.data.month.toString()
    let day = this.data.day.toString()
    let endTime = year + '-' + month + '-' + day
    console.log(endTime)
    this.setData({
      endTime: endTime
    })
  },
  // 点击确定 || 取消
  tapDialogButton: function (e) {
    console.log('111', this.data.startTime, this.data.endTime)
    console.log('e', e.detail.index)
    let index = e.detail.index
    if (index == 0) {
      console.log(1111)
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false,
        startTime: '',
        endTime: '',
        value1: [999, 0, 0]
      })
    }
    if (index == 1) {
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false,
        startTime: this.data.startTime,
        endTime: this.data.endTime
      })
    }

  },
  // 下拉菜单
  DAselect: function () {
    let isstart = this.data.isstart
    this.setData({
      isstart: !isstart,
      isRuleTrue2: true
    })
    console.log(this.data.isstart)
  },
  // 选中大区
  selectedbig: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    // 获取大区数据
    let DAitems = this.data.DAitems
    // 选中未选中
    DAitems[index].isselected = !DAitems[index].isselected
    this.setData({
      DAitems: DAitems
    })
  },
  // 小区展开
  open1: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let DAitems = this.data.DAitems
    DAitems[index].isopen = true
    this.setData({
      DAitems: DAitems
    })
  },
  // 小区收起
  close1: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let DAitems = this.data.DAitems
    DAitems[index].isopen = false
    this.setData({
      DAitems: DAitems
    })
  },
  // 选中小区
  selectedsmall: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let bigareaid = e.currentTarget.dataset.bigareaid
    console.log('小区index 大区id', index, bigareaid)
    // 获取大区数据
    let DAitems = this.data.DAitems
    // 根据id获得查询小区数据
    for (let i = 0; i < DAitems.length; i++) {
      if (DAitems[i].bigareaid == bigareaid) {
        // 选中未选中
        DAitems[i].second[index].isselected = !DAitems[i].second[index].isselected
      }
    }
    console.log('大区情况', DAitems)
    this.setData({
      DAitems: DAitems
    })
  },
  // 展开
  open2: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let bigareaid = e.currentTarget.dataset.bigareaid
    // 获取大区数据
    let DAitems = this.data.DAitems
    console.log('小区index 大区id', index, bigareaid)
    // 根据id获得查询小区数据
    for (let i = 0; i < DAitems.length; i++) {
      if (DAitems[i].bigareaid == bigareaid) {
        // 选中未选中
        DAitems[i].second[index].isopen = true
      }
    }
    console.log('大区情况', DAitems)
    this.setData({
      DAitems: DAitems
    })
  },
  // 关闭
  close2: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let bigareaid = e.currentTarget.dataset.bigareaid
    // 获取大区数据
    let DAitems = this.data.DAitems
    console.log('小区index 大区id', index, bigareaid)
    // 根据id获得查询小区数据
    for (let i = 0; i < DAitems.length; i++) {
      if (DAitems[i].bigareaid == bigareaid) {
        // 选中未选中
        DAitems[i].second[index].isopen = false
      }
    }
    console.log('大区情况', DAitems)
    this.setData({
      DAitems: DAitems
    })
  },
  // 选择门店
  selectedstore: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let bigareaid = e.currentTarget.dataset.bigareaid
    let smallareaid = e.currentTarget.dataset.smallareaid

    console.log('门店index 大区id 小区id', index, bigareaid, smallareaid)
    // 获取大区数据
    let DAitems = this.data.DAitems
    for (let i = 0; i < DAitems.length; i++) {
      if (DAitems[i].bigareaid == bigareaid) {
        for (let j = 0; j < DAitems[i].second.length; j++) {
          if (DAitems[i].second[j].smallareaid == smallareaid) {
            console.log(DAitems[i].second[j].third[index])
            DAitems[i].second[j].third[index].isselected = !DAitems[i].second[j].third[index].isselected
          }
        }
      }
    }
    console.log('大区情况', DAitems)
    this.setData({
      DAitems: DAitems
    })

  },
  // 展开
  open3: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let bigareaid = e.currentTarget.dataset.bigareaid
    let smallareaid = e.currentTarget.dataset.smallareaid
    console.log('门店index 大区id 小区id', index, bigareaid, smallareaid)
    // 获取大区数据
    let DAitems = this.data.DAitems
    for (let i = 0; i < DAitems.length; i++) {
      if (DAitems[i].bigareaid == bigareaid) {
        for (let j = 0; j < DAitems[i].second.length; j++) {
          if (DAitems[i].second[j].smallareaid == smallareaid) {
            console.log(DAitems[i].second[j].third[index])
            DAitems[i].second[j].third[index].isopen = true
          }
        }
      }
    }
    console.log('大区情况', DAitems)
    this.setData({
      DAitems: DAitems
    })
  },
  // 关闭
  close3: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let bigareaid = e.currentTarget.dataset.bigareaid
    let smallareaid = e.currentTarget.dataset.smallareaid
    console.log('门店index 大区id 小区id', index, bigareaid, smallareaid)
    // 获取大区数据
    let DAitems = this.data.DAitems
    for (let i = 0; i < DAitems.length; i++) {
      if (DAitems[i].bigareaid == bigareaid) {
        for (let j = 0; j < DAitems[i].second.length; j++) {
          if (DAitems[i].second[j].smallareaid == smallareaid) {
            console.log(DAitems[i].second[j].third[index])
            DAitems[i].second[j].third[index].isopen = false
          }
        }
      }
    }
    console.log('大区情况', DAitems)
    this.setData({
      DAitems: DAitems
    })
  },
  // 选择员工
  selectedone: function (e) {
    console.log('e', e)
    let index = e.currentTarget.dataset.index
    let bigareaid = e.currentTarget.dataset.bigareaid
    let smallareaid = e.currentTarget.dataset.smallareaid
    let storeid = e.currentTarget.dataset.storeid
    let id = e.currentTarget.dataset.id
    console.log('门店index 大区id 小区id 店铺', index, bigareaid, smallareaid, id)
    // 获取大区数据
    let DAitems = this.data.DAitems
    for (let i = 0; i < DAitems.length; i++) {
      // 确定大区
      if (DAitems[i].bigareaid == bigareaid) {
        for (let j = 0; j < DAitems[i].second.length; j++) {
          // 确定小区
          if (DAitems[i].second[j].smallareaid == smallareaid) {
            console.log(DAitems[i].second[j].third)
            // 确定门店
            for (let h = 0; h < DAitems[i].second[j].third.length; h++) {
              if (DAitems[i].second[j].third[h].storeid == storeid) {
                console.log(DAitems[i].second[j].third[h].workers)
                DAitems[i].second[j].third[h].workers[index].isselected = !DAitems[i].second[j].third[h].workers[index].isselected
              }
            }
          }
        }
      }
    }

    console.log('大区情况', DAitems)
    this.setData({
      DAitems: DAitems
    })
  },
  // 取消
  DAreset: function () {
    this.setData({
      isRuleTrue2: false,
      isstart: false
    })
  },
  // 确定
  DAsure: function () {
    let DAitems = this.data.DAitems
    // 创建参数对象
    let params = {
      big: [],
      small: [],
      store: [],
      workers: []
    }
    // 遍历数组 获取数据 {[],[],[],[]}
    for (let i = 0; i < DAitems.length; i++) {
      // 如果大区被选中 放到数组里面
      if (DAitems[i].isselected) {
        params.big.push(DAitems[i].bigareaid)
      }
      // 如果小区被选中
      for (let u = 0; u < DAitems[i].second.length; u++) {
        if (DAitems[i].second[u].isselected) {
          params.small.push(DAitems[i].second[u].smallareaid)
        }
        // 如果门店被选中
        for (let y = 0; y < DAitems[i].second[u].third.length; y++) {
          if (DAitems[i].second[u].third[y].isselected) {
            params.store.push(DAitems[i].second[u].third[y].storeid)
          }
          // 如果员工被选中
          for (let w = 0; w < DAitems[i].second[u].third[y].workers.length; w++) {
            if (DAitems[i].second[u].third[y].workers[w].isselected) {
              params.workers.push(DAitems[i].second[u].third[y].workers[w].id)
            }
          }
        }
      }
    }
    console.log('params', params)
















    // 关闭
    this.setData({
      isRuleTrue2: false,
      isstart: false
    })
  },
  // 五个选择一个并且动态获取高低
  tapone: function (e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index
    })
  },
  // 跨店消费记录
  gocrossstoreconsumption: function (e) {
    wx.navigateTo({
      url: '/packageD/pages/operatingdatas/crossstoreconsumption/crossstoreconsumption',
    })
  },
  // 去提现记录
  gocashoutrecord: function (e) {
    wx.navigateTo({
      url: '/packageD/pages/operatingdatas/cashoutrecord/cashoutrecord',
    })
  },




  //////////// 报销 /////////////
  // 上传报销图片
  upimg: function () {
    let that = this
    let webServerUrl2 = this.data.webServerUrl2
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const images = that.data.images.concat(res.tempFilePaths)
        console.log(images)
        // 获取图片 上传给后台返回真正的图片
        wx.showLoading()
        // 调用 这块循环次数 要用每次上传过的图片数量来判断 不能用综合image来判断
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          wx.uploadFile({
            url: webServerUrl2 + '/roomReimbursement/uploadCertificate', //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[i],
            header: {
              'content-type': 'application/json',
              'sys_user_token': token
            },
            name: 'img',
            formData: {},
            success(res) {
              // console.log('上传图片完成返回路径', res)
              let data = JSON.parse(res.data)
              console.log('图片资源', data)
              let imagesreal = that.data.imagesreal
              imagesreal.push(data.data.headImgUrl)
              that.setData({
                imagesreal: imagesreal
              })
              console.log('真正的图片路径', that.data.imagesreal)
            }
          })
        }
        wx.hideLoading()
        // 渲染
        that.setData({
          images: images
        })



      }
    })
  },
  // 预览报销图片
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  // 删除报销图片
  removeImage(e) {
    const idx = e.target.dataset.idx
    console.log(idx)
    let images = this.data.images
    let imagesreal = this.data.imagesreal
    images.splice(idx, 1)
    imagesreal.splice(idx, 1)
    console.log('删除成功 假的 真的', images, imagesreal)
    this.setData({
      images: images,
      imagesreal: imagesreal
    })
  },
  // 获取报销金额
  getDAvalue: function (e) {
    console.log('报销金额', e.detail.value)
    this.setData({
      DAvalue: e.detail.value
    })
  },
  // 获取报销理由
  getDAvalue2: function (e) {
    this.setData({
      DAvalue2: e.detail.value
    })
  },
  // 确定报销
  surereimbursement: function () {
    let that = this
    // 获取报销参数 金额 报销图片 报销理由 admintype
    let admintype = that.data.admintype
    let DAvalue = that.data.DAvalue
    let imagesreal = that.data.imagesreal
    let DAvalue2 = that.data.DAvalue2
    let go = false
    // 先判断权限
    selfPermissions().then(res => {
      if (res.data.code == 200) {
        let arr = res.data.data.sysPermDtos
        console.log('全部权限情况', arr)
        for (let i = 0; i < arr.length; i++) {
          // 如果有 
          if (arr[i].pval == 'getMoney:home:shopReimbursement' && admintype == 6) {
            console.log("跳转验证记录")
            go = true
            break
          }
        }
        // 有权限 进行下一个限制
        if (go) {
          // 金额 报销图片 报销理由的限制
          if (DAvalue <= 0) {
            wx.showToast({
              icon: 'none',
              title: '请输入正确报销金额'
            })
            return
          }
          if (imagesreal.length <= 0) {
            wx.showToast({
              icon: 'none',
              title: '报销凭证必须上传'
            })
            return
          }
          if (DAvalue2.length <= 0) {
            wx.showToast({
              icon: 'none',
              title: '报销理由必须填写'
            })
            return
          }
          // 权限和限制都通过 创建参数 提交
          let params = {
            amount: DAvalue,
            cause: DAvalue2,
            certificateImgs: imagesreal
          }
          addRoomReimbursement(params).then(res => {
            if (res.data.code == 200) {
              console.log('提交报销成功', res)
              wx.showToast({
                icon: 'none',
                title: '提交成功',
                duration: 1500,
                success: function () {
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '/packageD/pages/operatingdatas/expenserecord/expenserecord'
                    })
                  }, 1500)
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
        if (!go) {
          wx.showToast({
            icon: 'none',
            title: '没有权限'
          })
        }
      }
    })




  },
  // 去报销记录
  goexpenserecord: function (e) {
    wx.navigateTo({
      url: '/packageD/pages/operatingdatas/expenserecord/expenserecord',
    })
  },



















  ///////////数据对比///////////////////
  // 多选门店 门店情况
  DCcheckboxChange(e) {
    let that = this
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].id === values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    this.setData({
      items
    })
    console.log('门店情况', items)
    // 所有员工选中true 变为false
    // 两个for 搞定
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].worker.length; j++) {
        items[i].worker[j].isSelected = false
      }
    }
    // 所有门店都没选中 才可以点击展开
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked) {
        that.setData({
          isallowOpen: false
        })
        return
      }
    }
    that.setData({
      isallowOpen: true
    })

  },
  // 展开员工 
  DCopen: function (e) {
    let isallowOpen = this.data.isallowOpen
    if (isallowOpen) {
      let that = this
      console.log('展开', e)
      let index = e.currentTarget.dataset.index
      // 1.1 复选框全部禁用 
      // 1.2 选中全部为 false 
      let items = that.data.items
      for (let i = 0; i < items.length; i++) {
        items[i].isdisabled = true
        items[i].checked = false
      }
      // 2.对应的员工框  显示
      items[index].isShowWorker = true

      that.setData({
        items: items
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '已选中门店 无法展开',
        duration: 2000
      })
    }
  },
  // 收起员工
  DCclose: function (e) {
    let that = this
    let items = that.data.items
    console.log('收起', e)
    let index = e.currentTarget.dataset.index
    // 1.对应的员工框  消失
    items[index].isShowWorker = false
    that.setData({
      items: items
    })
    // 2.1 当全部isShowWorker == false 时候
    for (let i = 0; i < items.length; i++) {
      if (items[i].isShowWorker) {
        return
      }
    }
    // 2.2 items[i].isdisabled为flase
    for (let i = 0; i < items.length; i++) {
      items[i].isdisabled = false
    }
    that.setData({
      items: items
    })

  },
  // 员工多选
  DCsletectMore: function (e) {
    let that = this
    console.log('员工', e)
    // 获取员工的下标 所属店铺id 是否选中
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    // 获取数据
    let items = this.data.items
    // 根据id查到对应员工门
    for (let i = 0; i < items.length; i++) {
      // 如果查到对应的worker
      if (id == items[i].worker[0].id) {
        console.log("扎到啦")
        // 根据对应worker的下标 将选中值为负||正
        items[i].worker[index].isSelected = !items[i].worker[index].isSelected
      }
    }
    that.setData({
      items: items
    })
    console.log('选中未选中店铺员工信息', items)

  },
  // 收集门店员工id
  DCgetid: function () {
    let that = this
    let items = this.data.items
    let store = [] // 门店id 存放地
    let workers = [] // 员工id 存放地
    // 收集门店和员工id
    for (let i = 0; i < items.length; i++) {
      // 门店没有选中 啥不干
      if (items[i].checked == false) {}
      // 门店选中 收集门店id
      else if (items[i].checked == true) {
        store.push(items[i].id)
      }
      for (let j = 0; j < items[i].worker.length; j++) {
        // 如果店员没选中 啥不干
        if (items[i].worker[j].isSelected == false) {

        }
        // 如果选中 收集员工id起来
        else if (items[i].worker[j].isSelected == true) {
          workers.push(items[i].worker[j].workerid)
        }
      }

    }
    // 保存起来
    that.setData({
      store: store,
      workers: workers
    })
  },
  // 单个门店 员工 多选月份
  DCcheckboxChange2(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const months2 = this.data.months2
    const values = e.detail.value
    for (let i = 0, lenI = months2.length; i < lenI; ++i) {
      months2[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (months2[i].value === values[j]) {
          months2[i].checked = true
          break
        }
      }
    }
    this.setData({
      months2
    })
    console.log('months2', months2)
  },
  // 开始对比
  DCCompare: function () {
    let that = this
    // 收集门店员工id
    this.DCgetid()
    // 获取门店员工信息
    let store = that.data.store
    let workers = that.data.workers
    console.log('store', store, 'workers', workers)
    // 如果都为空 弹窗 请选择门店或员工
    if (store.length == 0 && workers.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择门店或者员工',
        duration: 2000
      })
      return
    }
    // 如果门店有true 数量大于2 弹窗单月对比
    if (store.length > 1) {
      that.setData({
        dialogShow1: true
      })
    }
    // 如果门店有true 数量==1 弹窗单年多月
    if (store.length == 1) {
      that.setData({
        dialogShow2: true
      })

    }
    // 如果门店为false 员工数大于1 弹窗单月对比
    if (workers.length > 1) {
      that.setData({
        dialogShow1: true
      })

    }
    // 如果门店为false 员工数量==1 弹窗单年多月
    if (workers.length == 1) {
      that.setData({
        dialogShow2: true
      })

    }
  },
  // 数量为1的弹窗 多店(人) 单月
  DCtapDialogButton1: function (e) {
    this.setData({
      dialogShow1: false,
      showOneButtonDialog1: false
    })
    let index = e.detail.index
    console.log('下标', index)
    if (index == 0) {
      return
    } else {
      // 1.准好请求数据
      // 2.去单月
      wx.navigateTo({
        url: '/packageD/pages/operatingdatas/operatingdatasinglemonth/operatingdatasinglemonth',
      })
    }
  },
  // 数量大于1的弹窗 单店(人) 单年多月
  DCtapDialogButton2: function (e) {
    this.setData({
      dialogShow2: false,
      showOneButtonDialog2: false
    })
    let index = e.detail.index
    console.log('下标', index)
    if (index == 0) {
      return
    } else {
      // 1.准备好数据
      // 2.去多月
      wx.navigateTo({
        url: '/packageD/pages/operatingdatas/operatingdatamultmonths/operatingdatamultmonths',
      })
    }

  }
})