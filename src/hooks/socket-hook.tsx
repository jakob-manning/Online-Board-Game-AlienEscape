import io, {Socket} from 'socket.io-client';
import {DefaultEventsMap} from 'socket.io-client/build/typed-events';

import {chatItem} from "../types/types"
import favicon from "../Images/android-chrome-512x512.png";
import {useContext} from "react";

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
    socket.on("error", (err) => {
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

export const subscribeToChat = (userID: string | null, cb: (error: any, data: chatItem) => void) => {
    if (!socket) return (true);
    socket.on('chat', data => {
        console.log('Websocket event received!');

        // Display a notification if the message isn't from you
        if(data.userID !== userID){
            new Notification(data.userName, {
                body: data.message,
                icon: favicon,
            });
        }
        return cb(null, data);
    });
}

export const sendMessage = (room: string, message: string) => {
    if (socket) socket.emit('chat', {message, room});
}