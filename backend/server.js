// const express = require("express");
// const app = express();
// const http = require("http");
// app.set("port", 5000);
// const server = http.createServer(app);

// const io = require("socket.io")(server);

// const activeUser = {};
// io.on("connection", (socket) => {
//   console.log("connected");
//   socket.emit("connection", null);

//   socket.on("test", () => {
//     console.log("update");
//   });

//   socket.on("chat-join", (payload) => {
//     if (activeUser[payload.chatroomId]) {
//       if (!activeUser[payload.chatroomId].includes(payload.userId)) {
//         activeUser[payload.chatroomId].push(payload.userId);
//       }
//     } else {
//       activeUser[payload.chatroomId] = [];
//     }

//     socket.emit("user-join", activeUser[payload.chatroomId]);
//   });

//   socket.on("chat-leave", (payload) => {
//     console.log("user left chat");
//     if (activeUser[payload.chatroomId]) {
//       let removeUserIndex = activeUser[payload.chatroomId].indexOf(
//         payload.userId
//       );
//       activeUser[payload.chatroomId].splice(removeUserIndex, 1);
//     }
//   });
// });

// server.listen(3000, () => {
//   console.log("socket.io");
// });
