import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL, {
  cors: {
    origin: process.env.REACT_APP_SERVER,
    credentials: true,
  },
  transports: ["websocket"],
});

export default socket;
