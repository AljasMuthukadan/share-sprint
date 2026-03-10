import {io} from "socket.io-client";

const socket = io("https://share-sprint.onrender.com",{
    autoConnect: true,
    transports: ["websocket"],
});

export default socket;
