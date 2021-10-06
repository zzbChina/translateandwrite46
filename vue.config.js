// module.exports = {
//     pages : {
//         index : {
//             entry : 'src/main.js'
//         }
//     },
//     //开启代理服务器
//     // devServer: {
//     //     proxy: 'http://localhost:8000'
//     // },
//     devServer: {
//         proxy: {
//           '/api': {
//             target: 'http://openapi.youdao.com',
//             pathRewrite : { '^/api' : '' }, 
//             ws: true,
//             changeOrigin: true
//           }
//         }
//       }
// }