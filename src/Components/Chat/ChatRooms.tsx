import React, {useContext, useEffect} from 'react';
import {
    Box, Button,
    useToast, IconButton,
    Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, ModalHeader,
    useDisclosure,
} from "@chakra-ui/react";
import {useHistory} from 'react-router-dom';
import {chatPayload, chatRoom, roomID, Toast, userID, userInterface} from "../../types/types";
import CreateRoom from "./CreateAndEditChat/CreateRoom";
import {useHttpClient} from "../../hooks/http-hook";
import {AuthContext} from "../../context/auth-context";
import {
    addUserToRoom,
    disconnectSocket,
    initiateSocket,
    joinRoom, listenForNewRooms, listenForRoomUpdates, markAsRead,
    removeUserFromRoom,
    sendMessage,
    subscribeToChat
} from "../../hooks/socket-hook";
import SmallHeader from "../UI/SmallHeader";
import classes from "./ChatRoom.module.css";
import RoomList from "./RoomList";
import {ArrowLeftIcon} from "@chakra-ui/icons";
import ChatFeed from "./ChatFeed";
import ChatInput from "./ChatInput";
import SettingsMenu from "./CreateAndEditChat/SettingsMenu";
import {FormikHelpers} from "formik";
import {useHotkeys} from "react-hotkeys-hook";

interface roomDict {
    [index: string]: chatRoom;
}

interface userDict {
    [index: string]: userInterface;
}

const ChatRooms: React.FC = (props) => {
    const auth = useContext(AuthContext);
    const toast = useToast();
    const {sendRequest} = useHttpClient()
    const [users, setUsers] = React.useState<userDict>({})
    const [rooms, setRooms] = React.useState<roomDict>({})
    const [roomInView, setRoomInView] = React.useState<roomID | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const history = useHistory()

    const loadRoomList = async () => {
        try {
            // Get the users rooms
            let toast: Toast = {
                successMode: "mute",
                errorTitle: "Duhn duhn duuuh",
                errorFallBack: "Couldn't load chat rooms. Try refreshing or create the first room?",
            }
            let response = await sendRequest("get", "/api/chat", toast)

            // load rooms into state
            if (response.data.rooms) {
                let roomDict: roomDict = {}
                for (let room of response.data.rooms) {
                    roomDict[room.id] = room
                }
                setRooms(roomDict)

            }
        } catch (e) {
            console.log(e)
        }
    }

    const loadUserList = async () => {
        try {
            // Get the user list
            let toast: Toast = {
                successMode: "mute",
                errorTitle: "Duhn duhn duuuh",
                errorFallBack: "Error connecting to friend server. Try refreshing your page or making new friends?",
            }
            let response = await sendRequest("get", "/api/users", toast)

            // load users into state
            if (response.data.users) {
                let userDict: userDict = {}
                for (let user of response.data.users) {
                    userDict[user.id] = user
                }
                setUsers(userDict)

            }
        } catch (e) {
            console.log(e)
        }
    }

    const errorHandler = (error: Error) => {
        toast({
            title: "Oppsie-daisy.",
            description: (error.message || "Something went wrong, please make like Brexit and try again."),
            status: "error",
            duration: 3000,
            isClosable: true,
        })
        return
    }

    const newRoomCallback = (room: chatRoom) => {
        console.log("new room")
        console.log(room)
        setRooms( oldRooms =>{
            let newRooms = {...oldRooms}
            newRooms[room.id] = room
            return newRooms
        })
        return
    }

    const roomDeletedCallback = (roomID: roomID) => {
        console.log("room deleted")
        console.log(roomID)
        setRooms( oldRooms =>{
            let newRooms = {...oldRooms}
            delete newRooms[roomID]
            return newRooms
        })
        return
    }

    const roomUpdateCallBack = (room: chatRoom) => {
        console.log("updating room metadata")
        console.log(room)
        setRooms( oldRooms => {
            if(room.id) {
                let newRooms = {...oldRooms}
                newRooms[room.id] = room
                return newRooms
            }
            return oldRooms
        })
        return
    }

    useEffect(() => {
        initiateSocket(auth.token, errorHandler)

        if (rooms) {
            for (let room in rooms) {
                joinRoom(room)
            }
        }

        subscribeToChat(auth.userId, (error: Error | null, data: chatPayload | null) => {
            if (error) {
                console.log("error getting data from chat")
                errorHandler(error)
                return
            }
            if (data !== null) {
                const {newMessage, room} = data
                setRooms(oldRooms => {
                    oldRooms[room].messages.push(newMessage)
                    oldRooms[room].lastUpdated = new Date()
                    oldRooms[room].updatedBy = newMessage.userID
                    if (!oldRooms[room].membersRead) {
                        oldRooms[room].membersRead = {}
                    }
                    if (roomInView === room || newMessage.userID === auth.userId) {
                        oldRooms[room].membersRead[auth.userId as string] = true
                        roomInView && markAsRead(roomInView)
                    } else {
                        oldRooms[room].membersRead[auth.userId as string] = false
                    }
                    return {...oldRooms}
                })
            }
        })

        listenForNewRooms(newRoomCallback, roomDeletedCallback)

        listenForRoomUpdates(roomUpdateCallBack)

        return () => {
            disconnectSocket();
        }
    }, [rooms, auth])

    // Request rooms on page load
    useEffect(() => {
        if (auth.token) {
            loadRoomList()
            loadUserList()
        }
    }, [auth])

    const roomEnterHandler = (newRoom: roomID) => {
        setRoomInView(newRoom)

        // Ask the server to mark it as read
        markAsRead(newRoom)

        // Mark it as read locally
        setRooms(oldRooms => {
            if (!oldRooms[newRoom].membersRead) {
                oldRooms[newRoom].membersRead = {}
            }
            oldRooms[newRoom].membersRead[auth.userId as string] = true
            return {...oldRooms}
        })
    }

    const closeRoom = () => {
        setRoomInView(null)
    }

    const deleteRoomHandler = async () => {
        const endPoint = "/api/chat/" + roomInView
        const toast: Toast = {
            successTitle: "Room Deleted",
            successBody: "All quiet on the western front.",
            successStatus: "info",
            errorTitle: "Hmmmm...",
            errorFallBack: "Couldn't delete this dang chat room. Try again or call it a day?",
            errorStatus: "error"
        }
        try {
            let response = await sendRequest("delete",
                endPoint,
                toast
            )
            // redirect to chat lobby
            setRoomInView(null)

            // Remove room from local list
            setRooms(oldRooms => {
                let newRooms = {...oldRooms}
                if (roomInView) {
                    delete newRooms[roomInView]
                }
                return {...newRooms}
            })
        } catch (e) {
            setRoomInView(null)
            console.log(e)
        }
    }

    const updateRoomDescription = (description: string) => {
        if (roomInView) {
            setRooms(oldRooms => {
                oldRooms[roomInView].description = description
                return {...oldRooms}
            })
        }
    }

    const addUser = async (userID: userID) => {
        if(roomInView) {
            try{
                addUserToRoom(userID, roomInView)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const removeUser = async (userID: userID) => {
        console.log("request to remove user")
        if(roomInView) {
            try{
                removeUserFromRoom(userID, roomInView)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const submitMessage = (values: { message: string }, actions: FormikHelpers<{ message: string }>) => {
        if (roomInView) sendMessage(roomInView, values.message)
        actions.resetForm()
        return
    }

    useHotkeys("alt+left", (event) => {
        event.preventDefault()
        closeRoom()
    })

    const newRoomHandler = () => {
        onClose()
        loadRoomList()
    }

    let header = (<SmallHeader title={"Chats"} />)
    if (roomInView) {
        header = (
            <SmallHeader title={rooms[roomInView]?.name}
                         subtitle={rooms[roomInView]?.description}
                         rightButton={<SettingsMenu room={rooms[roomInView]}
                                                    updateLocalRoomDescription={updateRoomDescription}
                                                    deleteRoomHandler={deleteRoomHandler}
                                                    users={users}
                                                    addUser={addUser}
                                                    removeUser={removeUser}
                         />
                         }>
            </SmallHeader>
        )
    }

    const createRoomModel = (<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Create Room</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <CreateRoom users={users} closeHandler={newRoomHandler} completeHandler={onClose}/>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>)

    return (
        <React.Fragment>
            {createRoomModel}
            <Box
                display={"flex"}
                flexDirection={"column"}
                height={"100%"}
                justifyContent={"center"}
            >
                {header}
                <Box d={"flex"}
                     flexDirection={"row"}
                     flex={"1 1 0"}
                     justifyContent={"center"}

                     width={"100%"}
                >
                    <Box
                         flexDirection={"column"}
                         className={roomInView ? classes.roomList : classes.roomListVisible}
                    >
                        <Button onClick={onOpen}
                                colorScheme={"purple"}
                                m={"2"}
                        >Create Room</Button>
                        <RoomList currentUser={auth.userId as string}
                                  currentRoom={roomInView ? rooms[roomInView].id : undefined}
                                  roomDict={rooms}
                                  setRoom={roomEnterHandler}
                        />
                    </Box>
                    <Box flexDirection={"column"}
                         className={roomInView ? classes.chatParent : classes.chatParentHidden}
                    >
                        <Box width={"100%"}
                             className={roomInView ? classes.backNav : classes.backNavHidden}
                        >
                            <Box d={"flex"}
                                 alignItems={"flex-start"}>
                                <IconButton onClick={() => closeRoom()}
                                            aria-label="Search database"
                                            icon={<ArrowLeftIcon/>}
                                            width={"10ch"}
                                            colorScheme="purple"
                                            variant={"ghost"}
                                />
                            </Box>
                        </Box>
                        <Box alignSelf={"center"}
                             overflow={"scroll"}
                             flex={"1 1 0"}
                             overflowX={"hidden"}

                             width={"100%"}

                        >
                            {roomInView ? <ChatFeed chatItems={rooms[roomInView].messages
                                ? rooms[roomInView].messages
                                : []
                                }
                                                    currentUser={auth.userId}/>
                                : null
                            }
                        </Box>
                        <Box
                            position={"relative"}
                            width={"100%"}
                            alignSelf={"center"}
                            maxW={"80ch"}
                            p={"2"}
                        >
                            {roomInView ? <ChatInput submitMessage={submitMessage}/> : null}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default ChatRooms
