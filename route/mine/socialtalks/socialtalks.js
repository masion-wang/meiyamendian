import data from '../../api/baseUrl'
import {
  POST,
  GET
} from '../../api/request' // 引入 get post 方法
console.log("接口路径和静态资源路径", data)

// 1.获取心声社区列表分页
export const getHeartVoicePosts = function (params) {
  return GET(`${data.BaseUrl}/staffHeartVoicePosts/getHeartVoicePosts/${params.currPage}/${params.pageSize}`, {})
}

// 2.添加心声社区帖子 detailCtn imgs[] isAnonymous 0是 1 不是 title 标题
export const addHeartVoicePosts = function (params) {
  return POST(`${data.BaseUrl}/staffHeartVoicePosts/addHeartVoicePosts`, params)
}

// 3.点赞接口 shvpId
export const heartVoicePostsLike = function (params) {
  return POST(`${data.BaseUrl}/staffHeartVoicePosts/heartVoicePostsLike`, params)
}

// 4.获取帖子详情 postId
export const getHeartVoicePost = function (params) {
  return GET(`${data.BaseUrl}/staffHeartVoicePosts/getHeartVoicePost/${params.postId}`, {})
}

// 5.获取评论分页 shvpId
export const getHeartVoicePostsComment = function (params) {
  return GET(`${data.BaseUrl}/staffHeartVoicePosts/getHeartVoicePostsComment/${params.shvpId}/${params.currPage}/${params.pageSize}`, {})
}

// 6.进行评价 shvpId  ctn anonymous  0是 1不是 
export const addHeartVoicePostsComment = function (params) {
  return POST(`${data.BaseUrl}/staffHeartVoicePosts/addHeartVoicePostsComment`, params)
}

// 7.进行回复 shvpId  ctn anonymous  0是 1不是
export const addPostsCommentReply = function (params) {
  return POST(`${data.BaseUrl}/staffHeartVoicePosts/addPostsCommentReply`, params)
}