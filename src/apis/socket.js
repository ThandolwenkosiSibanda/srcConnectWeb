import socketIOClient from 'socket.io-client';
const socketUrl = process.env.NODE_ENV === 'production' ? window.location.hostname : 'http://localhost:4000/';
const socket = socketIOClient(socketUrl);
export default socket;
