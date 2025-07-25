import { io } from "socket.io-client";

const token = localStorage.getItem("whiteboard_user_token");
console.log(token);

const socket = io("https://realtime-whiteboard-1g1v.onrender.com", {
  
  extraHeaders: token ? { Authorization: `Bearer ${token}` } : {}, // Only send if token exists
});

export default socket;
