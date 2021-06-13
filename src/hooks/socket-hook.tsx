import io, {Socket} from 'socket.io-client';
import {DefaultEventsMap} from 'socket.io-client/build/typed-events';

import {chatPayload, chatRoom, roomID, userID, userInterface} from "../types/types"
import favicon from "../Images/android-chrome-512x512.png";

const {REACT_APP_BACKEND} = process.env;

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const initiateSocket = (token: string | null, errorCallBack: (error: Error) => void) => {

    socket = io(REACT_APP_BACKEND + '',
        {
            auth: {token}
        }
    );
    console.log(`Connecting socket...`);
    // if (socket && room) socket.emit('join', room);

    socket.on("connect_error", (err) => {
        console.log("connection error:");
        console.log(err.message);
        errorCallBack(err)
    });
    socket.on("error", (err) => {
        console.log("connection error:");
        console.log(err);
        errorCallBack(new Error(err))
    });
}

export const joinRoom = (room: string) => {
    if (socket && room) socket.emit('join', room);
}

export const loadHistory = (cb: (error: any, data: any) => void) => {
    if (!socket) return (true)
    socket.on('roomHistory', data => cb(null, data))
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}

export const subscribeToChat = (userID: string | null, cb: (error: Error | null, data: chatPayload | null) => void) => {
    if (!socket) return cb(new Error("Couldn't connect to chat."), null);

    Notification.requestPermission()

    socket.on('chat', (payload: chatPayload) => {
        console.log('Websocket event received!');

        const {newMessage, room} = payload
        // Display a notification if the message isn't from you
        if (newMessage.userID !== userID) {
            new Notification(newMessage.userName, {
                body: newMessage.message,
                icon: favicon,
            });
        }
        return cb(null, payload);
    });
}

export const sendMessage = (room: roomID, message: string) => {
    if (socket) socket.emit('chat', {message, room});
}

export const markAsRead = (room: roomID) => {
    if (socket) socket.emit("markAsRead", {room})
}

export const listenForNewRooms = (newRoomCallback: (room: chatRoom) => void,
                                  roomDeletedCallback: (roomID: roomID) => void) => {
    socket.on("newRoom", (payload) => {
        console.log('Websocket event received! Added to a new room');
        const {room} = payload
        return newRoomCallback(room);
    });

    socket.on("roomDeleted", (payload) => {
        console.log('Websocket event received! - Room deleted');
        console.log("room delete sent to us")
        console.log(payload)
        const {roomID} = payload
        return roomDeletedCallback(roomID)
    });
}

export const addUsersToRoom = (membersToAdd: userID[], roomID: roomID) => {
    if (socket) socket.emit("addUsersToRoom", {membersToAdd, roomID})
}
