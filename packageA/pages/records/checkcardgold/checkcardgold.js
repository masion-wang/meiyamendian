import {
  getAcceptedCardCommission, // 获取卡类型和分配情况
} from '../../../../route/index/records/checkcardgold'
Page({
  data: {
    // 目前员工
    wrapperStaffs: [],
    acceptedOdType: '', // 卡的类型
    totalPrice: 0, // 入会金额
    cardholder: '' //  分配人
  },
  onLoad: function (options) {
    let that = this
    // 验证记录传来的id 和 type
    console.log('options', options)
    let id = options.id
    let type = options.type
    // 保存卡类型
    that.setData({
      acceptedOdId: id
    })
    let params = {
      acceptedOdId: id,
      acceptedOdType: type
    }
    getAcceptedCardCommission(params).then(res => {
      console.log("获取卡的类型和分配情况", res)
      if (res.data.code == 200) {
        if (res.data.data.roomStaffAcceptedRcdDto.acceptedOdType == 0) {
          console.log("会员卡")
          that.setData({
            acceptedOdType: res.data.data.roomStaffAcceptedRcdDto.acceptedOdType,
            totalPrice: res.data.data.roomStaffAcceptedRcdDto.firmCstmCardPrchOdDto.totalPrice,
            wrapperStaffs: res.data.data.roomStaffAcceptedRcdDto.roomStaffCardCommissionDto.roomStaffCardCmsnMbDtos,
            cardholder: res.data.data.roomStaffAcceptedRcdDto.firmCstmCardPrchOdDto.roomStaffBase.stageName
          })
        } else if (res.data.data.roomStaffAcceptedRcdDto.acceptedOdType == 1 || res.data.data.roomStaffAcceptedRcdDto.acceptedOdType == 2) {
          console.log("次卡")
          that.setData({
            acceptedOdType: res.data.data.roomStaffAcceptedRcdDto.acceptedOdType,
            totalPrice: res.data.data.roomStaffAcceptedRcdDto.firmNumCardPrchOdListDto.prchAmount,
            wrapperStaffs: res.data.data.roomStaffAcceptedRcdDto.roomStaffCardCommissionDto.roomStaffCardCmsnMbDtos,
            cardholder: res.data.data.roomStaffAcceptedRcdDto.firmNumCardPrchOdListDto.roomStaffBase.stageName
          })
        } else if (res.data.data.roomStaffAcceptedRcdDto.acceptedOdType == 3) {
          console.log("充值卡")
          that.setData({
            acceptedOdType: res.data.data.roomStaffAcceptedRcdDto.acceptedOdType,
            totalPrice: res.data.data.roomStaffAcceptedRcdDto.firmUserCstmCardTopUpOdDto.totalPrice,
            wrapperStaffs: res.data.data.roomStaffAcceptedRcdDto.roomStaffCardCommissionDto.roomStaffCardCmsnMbDtos,
            cardholder: res.data.data.roomStaffAcceptedRcdDto.firmUserCstmCardTopUpOdDto.roomStaffBase.stageName
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: '后台繁忙',
        })
      }
    })
  },
})