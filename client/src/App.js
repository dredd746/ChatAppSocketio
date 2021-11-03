import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room,username);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (<div className="room-text"></div>) : (<div className="room-text">{room}</div>)}
      {!showChat ? (<div className="room-text2"></div>) : (<div className="room-text2">{username}</div>)}
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join</h3>
          <input
            type="text"
            placeholder="nickname"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="room"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button  className="btn-show-pass" onClick={joinRoom}>connect</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;