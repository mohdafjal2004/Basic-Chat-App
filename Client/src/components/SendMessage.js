import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000"); //Here connect the backend

const SendMessage = () => {
  const [message, setMessage] = useState(""); //A 𝘀𝘁𝗮𝘁𝗲 for 𝘁𝘆𝗽𝗶𝗻𝗴 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 in 𝗶𝗻𝗽𝘂𝘁 𝗳𝗼𝗿𝗺 and then 𝘀𝗲𝗻𝗱𝗶𝗻𝗴 𝗶𝘁 to the 𝗼𝘁𝗵𝗲𝗿 𝗰𝗹𝗶𝗲𝗻𝘁 𝘃𝗶𝗮 𝘀𝗲𝗿𝘃𝗲𝗿
  const [messageReceived, SetMessageReceived] = useState(""); //A 𝘀𝘁𝗮𝘁𝗲 for 𝘂𝗽𝗱𝗮𝘁𝗶𝗻𝗴 𝗨𝗜 with the 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝘀𝗲𝗻𝘁 and 𝗿𝗲𝗰𝗲𝗶𝘃𝗲𝗱 of the client
  const [room, setRoom] = useState("");

  const handleMessage = () => {
    socket.emit("send_message", { message, room }); //𝘀𝗲𝗻𝗱_𝗺𝗲𝘀𝘀𝗮𝗴𝗲 is the event with a 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 which will be received by server, 
    //room sepecify the room to which this message will be sent,if room not used this message will be broadcasted to all the clients connected to the same server
  };

  //Receiving all the broadcast message from the Server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      SetMessageReceived(data.message);
    });
  }, []);

  const joinRoom = () => {
    if (room !== "") {
      //If room is not empty then emit the message to the room
      socket.emit("join_room", room);
    }
  };

  return (
    <div>
      {/* Here we will render 𝗜𝗻𝗽𝘂𝘁 𝗥𝗼𝗼𝗺 N𝘂𝗺𝗯𝗲𝗿 and 𝗝𝗼𝗶𝗻 𝗥𝗼𝗼𝗺 𝗯𝘂𝘁𝘁𝗼𝗻 section */}
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />

      <button onClick={joinRoom}>Join Room</button>
      <br/>

      {/* Here we will render 𝗜𝗻𝗽𝘂𝘁 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 and 𝘀𝗲𝗻𝗱 𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗯𝘂𝘁𝘁𝗼𝗻 section */}
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />

      <button onClick={handleMessage}>Send</button>
      <h1>Chat so far...</h1>
      {messageReceived}
    </div>
  );
};
export default SendMessage;
