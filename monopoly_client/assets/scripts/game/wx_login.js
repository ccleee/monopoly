// let button = wx.createUserInfoButton({
//     type: 'text',
//     text: '获取用户信息',
//     style: {
//       left: 10,
//       top: 76,
//       width: 200,
//       height: 40,
//       lineHeight: 40,
//       backgroundColor: '#ff0000',
//       color: '#ffffff',
//       textAlign: 'center',
//       fontSize: 16,
//       borderRadius: 4
//     }
//   })
//   button.onTap((res) => {
//     console.log(res)
//   })


// let exportJson = {};
// let sysInfo = window.wx.getSystemInfoSync();
// //获取微信界面大小
// let width = sysInfo.screenWidth;
// let height = sysInfo.screenHeight;
// window.wx.getSetting({
//     success (res) {
//         console.log(res.authSetting);
//         if (res.authSetting["scope.userInfo"]) {
//             console.log("用户已授权");
//             window.wx.getUserInfo({
//                 success(res){
//                     console.log(res);
//                     exportJson.userInfo = res.userInfo;
//                     //此时可进行登录操作
//                 }
//             });
//         }else {
//             console.log("用户未授权");
//             let button = window.wx.createUserInfoButton({
//                 type: 'text',
//                 text: '',
//                 style: {
//                     left: 0,
//                     top: 0,
//                     width: width,
//                     height: height,
//                     backgroundColor: '#00000000',//最后两位为透明度
//                     color: '#ffffff',
//                     fontSize: 20,
//                     textAlign: "center",
//                     lineHeight: height,
//                 }
//             });
//             button.onTap((res) => {
//                 if (res.userInfo) {
//                     console.log("用户授权:", res);
//                     exportJson.userInfo = res.userInfo;
//                     //此时可进行登录操作
//                     button.destroy();
//                 }else {
//                     console.log("用户拒绝授权:", res);
//                 }
//             });
//         }
//     }
//  })
