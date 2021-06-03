import io, {Socket} from 'socket.io-client';
import {DefaultEventsMap} from 'socket.io-client/build/typed-events';

import {chatItem} from "../types/types"

const {REACT_APP_BACKEND} = process.env;

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const initiateSocket = (room: string, token: string | null, errorCallBack: (error: Error)=> void) => {
    socket = io(REACT_APP_BACKEND + '',
        {
            auth: {token}
        }
    );
    console.log(`Connecting socket...`);
    if (socket && room) socket.emit('join', room);

    socket.on("connect_error", (err) => {
        console.log("connection error:");
        console.log(err.message);
        errorCallBack(err)
    });
}
export const loadHistory = (cb: (error: any, data: any) => void) => {
    if (!socket) return (true)
    socket.on('roomHistory', data => cb(null, data))
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}

export const subscribeToChat = (cb: (error: any, data: chatItem) => void) => {
    if (!socket) return (true);
    socket.on('chat', data => {
        console.log('Websocket event received!');
        return cb(null, data);
    });
}

export const sendMessage = (room: string, message: string) => {
    if (socket) socket.emit('chat', {message, room});
}