// // 1.外网版本
// const host = 'https://my.yigoushidai.com:'
// const port = '8083'
// // 上传图片接口 外网
// const upfileurl = 'https://my.yigoushidai.com:8083/roomAdmin'
// // 外网静态资源接口
// const webServerUrl = 'https://staff.yigoushidai.com:8085'
// const BaseUrl = `${host}${port}/roomAdmin` // 服务器接口
// export default {
//   BaseUrl, // 接口
//   upfileurl, // 图片上传
//   webServerUrl // 静态
// }



// 2.内网版本 106
const host = 'http://192.168.44.106:' // 106 104
const port = '9500'
// 上传图片接口 内网
const upfileurl = 'http://192.168.44.106:9500/roomAdmin'
// 静态资源
const webServerUrl = 'https://staff.yigoushidai.com:8085'
// 服务器接口
const BaseUrl = `${host}${port}/roomAdmin`
export default {
  BaseUrl,
  upfileurl,
  webServerUrl
}


// 内网静态资源url
// const imghost = 'http://192.168.44.105:'
// const imgport = '9500'
// const ImgUrl = `${imghost}${imgport}/roomAdmin`