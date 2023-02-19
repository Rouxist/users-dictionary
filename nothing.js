
const server = require("./app");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const express = require('express');
const router = express.Router();
// router.use(express.json());
router.use();

const SetModel = require('./backend/models/set.model');

function isEmpty(arg) {
  if(typeof arg == "undefined" || arg == null || arg == '')
    return true;
  else
    return false ;
}

console.log('damn!');

try {
  SetModel.find({}, (err, res)=> {
    console.log('res : ', res);
  });
} catch(err) {
  console.log(err);
}

router.put('/api/user', async (req,res) => {
  console.log('received requiest')
  SetModel.find({}).then((data) => {
      res.send('done!');
      console.log('done!!')
  }).catch((error) => {
      // console.log('data: ',error.response.data);
      console.log('error!');
      res.send('error!!');
  })
});

// wordData = {
//   word : 'bleach',
//   meaning : ['bleached', 'bleaching'],
//   from : 'youtube'
// }

// setData = {
//   title : 'www',
//   userId : 'hhh',
//   createdDate : new Date(),
//   wordList: [wordData, wordData]
// };

// const session = new SetModel(setData)

// try {
//   session.save();
// } catch(err) {
//   console.log(err);
// }



// io.on('connection', (socket) => {
//     console.log('user Connected : ', socket.id);

//     socket.on('disconnect', (reason) => {
//         socket.broadcast.emit('userDisconnected');
//         //임시추가
//         if (userInfo[socket.id] !== undefined ) {
//           const nickname = userInfo[socket.id].nickname;
//           delete userInfo[nickname];
//         }
//         //
//         if (userInfo[socket.id] !== undefined && userInfo[socket.id].currentRoomId.length > 3) {
//           //exitUser 복붙

//           const nickname = userInfo[socket.id].nickname;
//           const roomId = userInfo[socket.id].currentRoomId;
//           const remainingUserCount = Object.keys(roomList[roomId].users).length;
//           const owner = roomList[roomId].owner;

//           socket.leave(roomId);
//           // delete roomList[roomId].users[userId];
//           userInfo[socket.id].isInRoom = false;
//           roomList[roomId].users[nickname].isInRoom = false;

//           socket.to(roomId).emit('receiveUserExitUpdate', nickname);
//           socket.to(roomId).emit('receiveExitChatUpdate', nickname);
//           socket.broadcast.emit('receiveRoomListUpdate', getSecuredRoomList());
//           userInfo[socket.id].currentRoomId = '';

//         if (remainingUserCount === 1 || nickname === owner) {
//           //upload to db
//             roomData = {
//               title : roomList[roomId].title,
//               password : roomList[roomId].password,
//               owner : roomList[roomId].owner,
//               createdDate : roomList[roomId].createdDate,
//               eventType : roomList[roomId].eventType,
//               mode : roomList[roomId].mode,
//               users : Object.values(roomList[roomId].users),
//               messageList: roomList[roomId].messageList,
//               scrambleList: roomList[roomId].scrambleList,
//               roundCount : roomList[roomId].roundCount,
//               doneUser : roomList[roomId].doneUser,
//               currentScr : roomList[roomId].currentScr
//             };
    
//             const session = new RoomModel(roomData)
    
//             try {
//                 session.save();
//             } catch(err) {
//                 console.log(err);
//             }
    
//             delete roomList[roomId];
//             socket.to(roomId).emit('roomDeleted');
//             socket.broadcast.emit('receiveRoomListUpdate', getSecuredRoomList());
//           } 
//         }
//         console.log('user Disconnected : ', socket.id, reason);
//         delete userInfo[socket.id];
//     });
    
//     socket.on('getIsOwner', (callback) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         let isOwner;
//         const roomId = userInfo[socket.id].currentRoomId;
//           if (roomList[roomId].owner === userInfo[socket.id].nickname) {
//             isOwner = true
//           } else {
//             isOwner = false
//           }
//           if (typeof callback === 'function') {
//             callback({
//               isOwner: isOwner
//             })
//           }
//         }
//       }
//     );
    
//     socket.on('exitUser', (callback) => {
//         //exit by pressing EXIT button
//         if (userInfo.hasOwnProperty(socket.id)) {
//           const nickname = userInfo[socket.id].nickname;
//           const roomId = userInfo[socket.id].currentRoomId;
//           const remainingUserCount = Object.keys(roomList[roomId]).length;
//           const owner = roomList[roomId].owner;

//           socket.leave(roomId);
//           // delete roomList[roomId].users[userId];
//           userInfo[socket.id].isInRoom = false;
//           roomList[roomId].users[nickname].isInRoom = false;

//           socket.to(roomId).emit('receiveUserExitUpdate', nickname);
//           socket.to(roomId).emit('receiveExitChatUpdate', nickname);
//           socket.broadcast.emit('receiveRoomListUpdate', getSecuredRoomList());
//           userInfo[socket.id].currentRoomId = '';

//           if (remainingUserCount === 1 || nickname === owner) {
//             //upload to db
//               roomData = {
//                 title : roomList[roomId].title,
//                 password : roomList[roomId].password,
//                 owner : roomList[roomId].owner,
//                 createdDate : roomList[roomId].createdDate,
//                 eventType : roomList[roomId].eventType,
//                 mode : roomList[roomId].mode,
//                 users : Object.values(roomList[roomId].users),
//                 messageList: roomList[roomId].messageList,
//                 scrambleList: roomList[roomId].scrambleList,
//                 roundCount : roomList[roomId].roundCount,
//                 doneUser : roomList[roomId].doneUser,
//                 currentScr : roomList[roomId].currentScr
//               };
      
//               const session = new RoomModel(roomData)
      
//               try {
//                   session.save();
//               } catch(err) {
//                   console.log(err);
//               }
      
//               delete roomList[roomId];
//               socket.to(roomId).emit('roomDeleted');
//               socket.broadcast.emit('receiveRoomListUpdate', getSecuredRoomList());
//           } 
//         }
//     })

//     socket.on('changeOwner', (nextOwner) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         const roomId = userInfo[socket.id].currentRoomId;
//         if (roomList[roomId].owner === userInfo[socket.id].nickname) { //validation
//           roomList[roomId].owner = nextOwner;
//           socket.to(roomId).emit('receiveStatUpdate'); //적당한 것으로 돌려막기
//         }
//         socket.to(roomId).emit('ownerChangeNoti', nextOwner);
//       }
//     })


//     //after axios removal
//     socket.on('updateAdminNickname', () => {
//       updateAdminNickname();
//     })
    
//     socket.on('isNewUser', (email, callback) => { 
//       UserModel.findOne({ email : email }).then((data) => {
//         if (data === null) {
//           if (typeof callback === 'function') {
//             callback({
//               isNewUser: true
//             })
//           }
//         } else {
//           if (typeof callback === 'function') {
//             callback({
//               isNewUser: false,
//               data: data
//             })
//           }
//         }
//       }).catch((error) => {
//         // console.log('error: ',error.response.data) //problem!!
//       })
//     })

//     // socket.on('isLoggedIn', async (idToken, callback) => {
//     //   const ticket = await client.verifyIdToken({
//     //     idToken: idToken
//     //   });
//     //   const email = ticket.getPayload().email;
//     //   const already = Object.values(userInfo).find(user => user.email === email)

//     //   if (already === undefined) { //check if user is logged in another device or tab.
//     //     if (typeof callback === 'function') {
//     //       callback({
//     //         isLoggedIn: false
//     //       })
//     //     }
//     //   } else {
//     //     if (typeof callback === 'function') {
//     //       callback({
//     //         isLoggedIn: true
//     //       })
//     //     }
//     //     console.log(ticket.getPayload().email, 'is already logged in at other tab or device.');
//     //   }
//     // })

//     socket.on('login', async (idToken, callback) => { 
//       if (!userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof idToken === 'string' && idToken.length > 0) {
//           const ticket = await client.verifyIdToken({
//             idToken: idToken
//           });
//           if (typeof ticket === 'object') { //check if idToken is valid
//               const email = ticket.getPayload().email;
//               PunishedUserModel.find({email: email}).then(async (res) => { //check if punished
//                 if (res[0] === undefined) {
//                   UserModel.find({'email' : email}, (err, account)=> {
//                     userInfo[socket.id] = {
//                       nickname: account[0].nickname,
//                       profileImg: account[0].profilePic,
//                       bio: account[0].bio,
//                       wcaId: account[0].wcaId,
//                       email: account[0].email,
//                       socketId: socket.id,
//                       currentRoomId: '',
//                       isInRoom: false
//                     };
//                     socket.broadcast.emit('someoneEntered', getSecuredUserList()); 
//                     if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//                       if (Object.keys(roomList).length === 0) {
//                         socket.emit('initialFetchRoom', roomList)
//                       } else {
//                         socket.emit('initialFetchRoom', getSecuredRoomList())
//                       }
//                     }
//                     if (typeof callback === 'function') {
//                       callback({
//                         isBanned: false,
//                         info: {}
//                       })
//                     }
//                   });
//                   // socket.broadcast.emit('someoneEntered', getSecuredUserList()); 
//                 } else {
//                   if (typeof callback === 'function') {
//                     callback({
//                       isBanned: true,
//                       info: {
//                         startDate: res[0].startDate,
//                         endDate: res[0].endDate,
//                         reason: res[0].reason
//                       }
//                     })
//                   }
//                 }
//               })
//             // socket.broadcast.emit('someoneEntered');
//           }
//           // socket.broadcast.emit('someoneEntered'); 
//         }
        
//       }
//     })
    
//     socket.on('logout', () => { 
//       delete userInfo[socket.id];
//       socket.broadcast.emit('someoneEntered'); //돌려막기
//     })
    
//     socket.on('fetchRoomList', (callback) => { 
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (Object.keys(roomList).length === 0) {
//           if (typeof callback === 'function') {
//             callback({
//               data: roomList
//             })
//           }
//         } else {
//           if (typeof callback === 'function') {
//             callback({
//               data: getSecuredRoomList()
//             })
//           }
//         }
//       }
//     })

//     socket.on('fetchNotice', (callback) => {
//       NoticeModel.find({}).then((res) =>  {
//         if (typeof callback === 'function') {
//           callback({
//             data: res
//           })
//         }
//       });
//     })
    
//     socket.on('fetchBoard', (callback) => {
//       BoardModel.find({}).then((res) =>  {
//         let boardList = [];
//         for (let i = 0; i < res.length; i++) {
//           boardList.push({
//             title: res[i].title,
//             uploader: res[i].uploader,
//             _id: res[i]._id,
//             body: res[i].body,
//             createdDate: res[i].createdDate
//           });
//         }

//         if (typeof callback === 'function') {
//           callback({
//             data: boardList
//           })
//         }
//       });
//     })
    
//     // socket.on('fetchUserCount', (callback) => { 
//     //   if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//     //     callback({
//     //         data: Object.keys(userInfo).length //프론트에 띄우는 것들만 넣기
//     //     })
//     //   }
//     // })
    
//     socket.on('fetchOnlineUsers', (callback) => { 
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         callback({
//             data: getSecuredUserList() //프론트에 띄우는 것들만 넣기
//         })
//       }
//     })

//     socket.on('makeRoom', async (data, callback) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof data.title === 'string' && typeof data.pw === 'string' && typeof data.owner === 'string' && typeof data.createdDate === 'string') {
//           const mode = data.mode;
//           if (mode === 0 || mode === 5 || mode === 12 || mode === 50 || mode === 100) {
//             const eventType = data.eventType;
//             if (eventType === '2x2x2' || eventType === '3x3x3' || eventType === '4x4x4' || eventType === '5x5x5' || eventType === '6x6x6' || eventType === '7x7x7' || eventType === 'Megamix' || eventType === 'Pyraminx' || eventType === 'Skewb' || eventType === 'Square') {
//               const initScr = getScramble(data.eventType);
//               const roomId = Math.random().toString(36).substring(2,12);
//               roomList[roomId] = {
//                 title: data.title,
//                 password: data.pw,
//                 owner: data.owner,
//                 createdDate: data.createdDate,
//                 eventType: data.eventType,
//                 mode: data.mode,
//                 users: {},
//                 messageList: [],
//                 scrambleList: [initScr],
//                 roundCount: 1,
//                 doneUser: 0,
//                 currentScr: initScr
//               };

//               socket.broadcast.emit('receiveRoomListUpdate', getSecuredRoomList());

//               if (typeof callback === 'function') {
//                 callback({
//                   isDone: true,
//                   roomId: roomId
//                 })
//               }
//             }
//           }
//         }
//       }
//     })
   
//     socket.on('deleteRoom', (roomId) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof roomId === 'string') {
//           const clientNickname = userInfo[socket.id].nickname;

//           const roomOwner = roomList[roomId].owner;

//           if (clientNickname === roomOwner || clientNickname === adminNickname) { //check if real owner emitted or Admin emitted
//             // //upload to db
//             roomData = {
//               title : roomList[roomId].title,
//               password : roomList[roomId].password,
//               owner : roomList[roomId].owner,
//               createdDate : roomList[roomId].createdDate,
//               eventType : roomList[roomId].eventType,
//               mode : roomList[roomId].mode,
//               users : roomList[roomId].users,
//               messageList: roomList[roomId].messageList,
//               scrambleList: roomList[roomId].scrambleList,
//               roundCount : roomList[roomId].roundCount,
//               doneUser : roomList[roomId].doneUser,
//               currentScr : roomList[roomId].currentScr
//             };

//             const session = new RoomModel(roomData)

//             try {
//                 session.save();
//             } catch(err) {
//                 console.log(err);
//             }

//             delete roomList[roomId];

//             socket.broadcast.emit('receiveRoomListUpdate', getSecuredRoomList());
//           } 
//         }
//       }
//     })

//     socket.on('validateRoomPW', (roomId, enteredPW, callback) => {
//       if (typeof roomId === 'string' && typeof enteredPW === 'string') {
//         const roomPW = roomList[roomId].password;
//         let isCorrect;

//         if (roomPW === enteredPW) {
//           isCorrect = true;
//         } else {
//           isCorrect = false;
//         }
//         if (typeof callback === 'function') {
//           callback({
//             isCorrect: isCorrect
//           })
//         }
//       }
//     })
    
//     // socket.on('isRealRoom', (roomId, callback) => {
//     //   if (roomList.hasOwnProperty(roomId)) {
//     //     if (typeof callback === 'function') {
//     //       callback({
//     //         isCorrect: true
//     //       })
//     //     }
//     //   } else {
//     //     if (typeof callback === 'function') {
//     //       callback({
//     //         isCorrect: false
//     //       })
//     //     }
//     //   }
//     // });

//     socket.on('enterRoom', (roomId) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof roomId === 'string' && roomId.length > 0 && roomList.hasOwnProperty(roomId)) {
//           socket.join(roomId)
//           userInfo[socket.id].currentRoomId = roomId;
      
//           const nickname = userInfo[socket.id].nickname;
//           const profileImg = userInfo[socket.id].profileImg;
//           const bio = userInfo[socket.id].bio;
//           const wcaId = userInfo[socket.id].wcaId;
      
//           const roundCount = roomList[roomId].roundCount;
//           let newRecordList = [];

//           if (!roomList[roomId].users.hasOwnProperty(nickname)) {
//             if (roundCount !== 1) {
//               for (let i=0; i < roundCount; i++) {
//                 newRecordList.push(-2);
//               }
//               roomList[roomId].doneUser++
//             }
//             roomList[roomId].users[nickname] = {
//               nickname: nickname, 
//               profileImg: profileImg,
//               bio: bio,
//               wcaId: wcaId,
//               recordList: newRecordList,
//               isRunning: false,
//               isObserving: false,
//               isInRoom: true
//             };
//           } else {
//             userInfo[socket.id].isInRoom = true;
//             roomList[roomId].users[nickname].isInRoom = true;
//           }
          
//           socket.to(roomId).emit('notifyUserEnter')
//           socket.to(roomId).emit('receiveJoinUpdate', roomList[roomId]);
//           socket.to(roomId).emit('receiveJoinChatUpdate', nickname);
//           socket.broadcast.emit('receiveRoomListUpdate', getSecuredRoomList());
//         } 
//       }
//     })
    

//     socket.on('fetchRoomInfo', (callback) => { 
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         const roomId = userInfo[socket.id].currentRoomId;

//         if (typeof callback === 'function') {
//           callback({
//               data: roomList[roomId]
//           })
//         }
//       }
//     })
    
    

//     //about messaging
//     socket.on('fetchMessages', (roomId, callback) => { 
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof roomId === 'string') {
//           if (typeof callback === 'function') {
//             callback({
//                 data: roomList[roomId].messageList
//             })
//           }
//         }
//       }
//     })

//     socket.on('sendMessage', (message, callback) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof message === 'string') {
//           const roomId = userInfo[socket.id].currentRoomId;
//           const sendTime = new Date();
//           const sendDate = new Date(sendTime.setHours(sendTime.getHours() + 9)).toISOString().replace('T',' ').substring(0,19); //new 중요

//           const msgInMinute = roomList[roomId].messageList.filter((msg) => msg.time.slice(11,16) === sendDate.slice(11,16));
//           const msgCountInMinute = msgInMinute.length;

//           if (msgCountInMinute > 15) {
//             if (typeof callback === 'function') {
//               callback({
//                 isLimited: true
//               })
//             }
//           } else {
//             const messageData = {
//               nickname: userInfo[socket.id].nickname,
//               profileImg: userInfo[socket.id].profileImg,
//               message: message,
//               time: sendDate
//             };
      
//             roomList[roomId].messageList.push(messageData);
//             socket.to(roomId).emit('receiveMessage', messageData);
          
//             if (typeof callback === 'function') {
//               callback({
//                 isLimited: false
//               })
//             }
//           }
//         }
//       }
//     });
    

//     //about game
//     socket.on('uploadRecord', (record) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof record === 'number') {
//           const roomId = userInfo[socket.id].currentRoomId;
//           const nickname = userInfo[socket.id].nickname;
//           const myRecordCount = roomList[roomId].users[nickname].recordList.length;
//           const roundCount = roomList[roomId].roundCount;

//           if (roomId.length > 2) { //보안 가능?
//             if (myRecordCount < roundCount || record !== 0) {
//               roomList[roomId].users[nickname].recordList.push(record);
//               // socket.to(roomId).emit('receiveStatUpdate'); //moved to addDone
//             }
//           }
//         }
//       }
//     })

//     socket.on('getIsSubmitted', (callback) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         const roomId = userInfo[socket.id].currentRoomId;
//         const nickname = userInfo[socket.id].nickname;
//         const myRecordCount = roomList[roomId].users[nickname].recordList.length;
//         const roundCount = roomList[roomId].roundCount;
        
//         let isSubmitted;
//         if (myRecordCount < roundCount) {
//           isSubmitted = false;
//         } else {
//           isSubmitted = true;
//         }
//         if (typeof callback === 'function') {
//           callback({
//             isSubmitted: isSubmitted
//           })
//         }
//       }
//     })

//     socket.on('addDoneUser', () => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         const roomId = userInfo[socket.id].currentRoomId;

//         if (roomId.length > 2) {
//           roomList[roomId].doneUser++
//           socket.to(roomId).emit('receiveStatUpdate');
//         }
//       }
//     })

//     socket.on('getIsAllDone', (callback) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         const roomId = userInfo[socket.id].currentRoomId;
//         const userCount = Object.keys(roomList[roomId].users).length;
//         const doneUserCount = roomList[roomId].doneUser;
//         let isAllDone;

//         const roomOwner = roomList[roomId].owner;
//         const clientNickname = userInfo[socket.id].nickname;
//         let isOwner;

//         if(userCount === doneUserCount) {
//           isAllDone = true;
//         } else {
//           isAllDone = false;
//         }

//         if (roomOwner == clientNickname) {
//           isOwner = true;
//         } else {
//           isOwner = false;
//         }
//         if (typeof callback === 'function') {
//           callback({
//             isAllDone: isAllDone,
//             isOwner: isOwner
//           })
//         }
//       }
//     })

//     socket.on('nextRound', () => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         //방장 여부는 getIsAllDone에서 체크 후 넘어옴
//         const roomId = userInfo[socket.id].currentRoomId;
//         const doneUserCount = roomList[roomId].doneUser;
//         const userCount = Object.keys(roomList[roomId].users).length;
//         const newScr = getScramble(roomList[roomId].eventType);
        
//         roomList[roomId].scrambleList.push(newScr);
//         roomList[roomId].currentScr = newScr;
//         roomList[roomId].doneUser = 0;

//         if (doneUserCount == userCount) {
//           //When all participants have done
//           roomList[roomId].roundCount++
//           socket.to(roomId).emit('receiveRoundUpdate');
//           } else {
//           //When some participants haven't done
//           const roundCount = roomList[roomId].roundCount;
//           const userKeyList = Object.keys(roomList[roomId].users);
//           const userValueList = Object.values(roomList[roomId].users);

//           for (let i = 0; i < userCount; i++) {
//             if (userValueList[i].recordList.length !== roundCount) {
//               roomList[roomId].users[userKeyList[i]].recordList.push(-2);
//             }
//           }
//           roomList[roomId].roundCount++
//           socket.to(roomId).emit('receiveRoundUpdate');
//         } 
//       }
//     })
    
//     socket.on('toggleIsRunning', (bool) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof bool === 'boolean') {
//           const roomId = userInfo[socket.id].currentRoomId;
//           const nickname = userInfo[socket.id].nickname; 

//           roomList[roomId].users[nickname].isRunning = bool;
//           socket.to(roomId).emit('someoneRunning');
//         }
//       }
//     })
    
//     socket.on('toggleIsObserving', (callback) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         const roomId = userInfo[socket.id].currentRoomId;
//         const nickname = userInfo[socket.id].nickname; 
//         const prevIsObserving = roomList[roomId].users[nickname].isObserving;
        
//         const myRecordCount = roomList[roomId].users[nickname].recordList.length;
//         const roundCount = roomList[roomId].roundCount;


//         if (!prevIsObserving) {
//           //when observe
//           if (myRecordCount < roundCount) {
//             roomList[roomId].users[nickname].recordList.push(-2);
//             roomList[roomId].doneUser++
//           }
//         } else {
//           //when rejoin
//         }

//         roomList[roomId].users[nickname].isObserving = !prevIsObserving;
//         socket.to(roomId).emit('observeUpdate');

//         if (typeof callback === 'function') {
//           callback({
//             isObserving: !prevIsObserving
//           });
//         }
//       }
//     })

//     socket.on('changeEventType', (newEventType) => {
      
//     })
    
//     socket.on('sendAdminNoti', (msg) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof msg === 'string') {
//           socket.broadcast.emit('receiveAdminNoti',msg);
//         }
//       }
//     })
    
//     socket.on('songSet', (videoId, title) => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         if (typeof videoId === 'string' && typeof title === 'string') {
//           //방장 여부는 getIsOwner에서
//           const roomId = userInfo[socket.id].currentRoomId;
//           socket.to(roomId).emit('receiveNewSong', videoId, title);
//         }
//       }
//     })
    
//     socket.on('songRemove', () => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         //방장 여부는 getIsOwner에서
//         const roomId = userInfo[socket.id].currentRoomId;
//         socket.to(roomId).emit('receiveSongRemove');
//       }
//     })

//     socket.on('sendJjajajan', () => {
//       if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//         const roomId = userInfo[socket.id].currentRoomId;
//         socket.to(roomId).emit('jjajajan');
//       }
//     })
    
    
//     socket.on('getAdminNickname', (callback) => {
//       UserModel.find({'email' : adminEmail}, (err, account)=> {
//         if (typeof callback === 'function') {
//           callback({
//             adminNickname: account[0].nickname
//           });
//         }
//       });
      
//     })

//   socket.on('editNickname', async (nickname) => {
//     if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//       if (typeof nickname === 'string') {
//         userEmail = userInfo[socket.id].email;
//         await UserModel.updateOne(
//           { email: userEmail},
//           { $set: { nickname: nickname }} 
//         );
//       }
//     }
//   })
  
//   socket.on('editBio', async (bio) => {
//     if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//       if (typeof bio === 'string') {
//         userEmail = userInfo[socket.id].email;
//         await UserModel.updateOne(
//           { email: userEmail},
//           { $set: { bio: bio }} 
//         );
//       }
//     }
//   })
  
//   socket.on('editWcaId', async (wcaId) => {
//     if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//       if (typeof wcaId === 'string') {
//         userEmail = userInfo[socket.id].email;
//         await UserModel.updateOne(
//           { email: userEmail},
//           { $set: { wcaId: wcaId }} 
//         );
//       }
//     }
//   })
  
//   socket.on('addToBoard', async (title, body, callback) => {
//     if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//       if (title.length > 0 && title.length < 51 && body.length > 0 && body.length < 501) {
//         // let isAvailable = true;
//         let isLimited = false;
//         await BoardModel.find({'uploaderEmail' : userInfo[socket.id].email}).then((data) => {
//           const dateString = new Date().toDateString() //for UST
//           const korDateString = getKorTime(new Date()).toDateString();
//           console.log('기준인 오늘 : ', dateString)
//           console.log('data : ', data)
          
//           // const postMadeToday = data.filter(post => post.createdDate.toDateString() === dateString); //v1
//           const postMadeToday = data.filter(post => getKorTime(post.createdDate).toDateString() === korDateString); //v2


//           // const postMadeToday = data.filter(post => post.createdDate.getMonth() === getKorTimeMonth(date) && post.createdDate.getDate() === getKorTimeDate(date));
//           console.log('after : ', postMadeToday);
//           if (postMadeToday[0] !== undefined) {
//             console.log('after createdDate : ', postMadeToday[0].createdDate);
//             console.log('after toDateString : ', postMadeToday[0].createdDate.toDateString());
//           }
//           // console.log('previousPostTime to Kor', getKorTime(data[0].createdDate), getKorTimeMonth(data[0].createdDate), getKorTimeDate(data[0].createdDate));
//           // console.log('previousPostTime to Kor',getKorTime(data[0].createdDate), getKorTimeMonth(data[0].createdDate),getKorTimeDate(data[0].createdDate));
//           if (postMadeToday[0] !== undefined) {
//             isLimited = true;
//             callback({
//               isLimited: true
//             })
//           }   
//         });

//         if (!isLimited) {
//           boardData = {
//             title : title,
//             body : body,
//             createdDate : new Date(),
//             uploader : userInfo[socket.id].nickname,
//             uploaderEmail : userInfo[socket.id].email,
//           };
    
//           const board = new BoardModel(boardData)
    
//           try {
//               await board.save();
//           } catch(err) {
//               console.log(err);
//           }
  
//           if (typeof callback === 'function') {
//             callback({
//               isDone: true
//             })
//           }
//         } else {
//           if (typeof callback === 'function') {
//             callback({
//               isDone: false,
//               isLimited: false
//             })
//           }
//         }
//       }
//     }
//   })
  
//   socket.on('deleteBoard', async (id, callback) => {
//     if (userInfo.hasOwnProperty(socket.id)) { //check if user is properly logged in
//       if (typeof id === 'string') {
//         const clientEmail = userInfo[socket.id].email;
//         let uploaderEmail;
//         await BoardModel.findById(id).then((data) => {
//           uploaderEmail = data.uploaderEmail;
//         });

//         if (clientEmail === uploaderEmail) {
//           await BoardModel.deleteOne({_id: id}, {uploaderEmail: clientEmail}); //await!!!
        
//           if (typeof callback === 'function') {
//             callback({
//               isDone: true
//             })
//           }
//         } else {
//           if (typeof callback === 'function') {
//             callback({
//               isDone: false
//             })
//           }
//         }
//       }
//     }
//   })
// });