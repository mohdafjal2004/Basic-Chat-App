const express = require("express");
const { createServer } = require("http"); //createServer : A class which returns a new instance of Server.

const { Server } = require("socket.io"); //Server = a class that represents a socket.io server
const cors = require("cors");

const app = express();
app.use(cors());

const http = createServer(app); //Enabling express app for http requests

const io = new Server(http, {
  //socket.io server is constructed

  cors: {
    origin: "http://localhost:3000", //Here it will connect to Frontend
  },
});

io.on("connection", (socket) => {
  //𝗛𝗲𝗿𝗲 𝗶𝘁 𝘄𝗶𝗹𝗹 𝗿𝗲𝗰𝗲𝗶𝘃𝗲 𝗲𝗻𝘁𝗶𝗿𝗲 𝗰𝗹𝗶𝗲𝗻𝘁 𝗱𝗮𝘁𝗮 𝘁𝗵𝗮𝘁 𝗶𝘀 𝗰𝗹𝗶𝗲𝗻𝘁 𝗶𝗱 𝗮𝗻𝗱 𝗰l𝗶𝗲𝗻𝘁 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀
  console.log(`User Connected:${socket.id}`); //⁡⁢⁣⁣𝗖𝗹𝗶𝗲𝗻𝘁 𝗶𝗱⁡

  //! 1. Here we broadcasted the message received from a single client to 𝗮𝗹𝗹 𝘁𝗵𝗲 𝗰𝗹𝗶𝗲𝗻𝘁𝘀 𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 𝘁𝗼 𝘁𝗵𝗲 𝘀𝗮𝗺𝗲 𝘀𝗲𝗿𝘃𝗲𝗿
  //?socket.on("send_message", (data) => {
  //Here it will receive  ⁡⁢⁣⁣𝗮𝗹𝗹 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀⁡ ⁡⁢⁣⁡⁢⁣⁣from 𝗮𝗹𝗹 𝗰𝗹𝗶𝗲𝗻𝘁𝘀 with 𝘀𝗲𝗻𝗱_𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝗲𝘃𝗲𝗻𝘁⁡⁡⁡⁡

  //?console.log(data);
  // This 𝗱𝗮𝘁𝗮⁡ is the 𝗮𝗰𝘁𝘂𝗮𝗹 𝗺𝗲𝘀𝘀𝗮𝗴𝗲⁡ sent by one of our client, now we may send it to 𝟭 𝘂𝘀𝗲𝗿
  //or 𝗯𝗿𝗼𝗮𝗱𝗰𝗮𝘀𝘁 to 𝗺𝗮𝗻𝘆 𝘂𝘀𝗲𝗿 connected to this server

  //?socket.broadcast.emit("receive_message", data);
  // After receving message, 𝗯𝗿𝗼𝗮𝗱𝗰𝗮𝘀𝘁𝗶𝗻𝗴 this 𝗺𝗲𝘀𝘀𝗮𝗴𝗲(𝗱𝗮𝘁𝗮) with an event(receive_message) to all the connected client to the same server
  //});

  //! 2.  Here we send message recieved from a client to  𝗮𝗹𝗹 𝗰𝗹𝗶𝗲𝗻𝘁𝘀 𝗶𝗻 𝗮 𝘀𝗽𝗲𝗰𝗶𝗳𝗶𝗰 𝗿𝗼𝗼𝗺
  socket.on("join_room", (data) => {
    //Here it will receive all messages from client with the same event created
    socket.join(data); //Here server 𝗷𝗼𝗶𝗻𝘀 𝗮 𝗿𝗼𝗼𝗺
  });

  //So here the server send the message to a specific room instead of broadcasting it
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

http.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
1;
