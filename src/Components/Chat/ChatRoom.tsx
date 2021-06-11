import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    IconButton,
    Button,
    Portal,
    Popover, PopoverTrigger, PopoverBody,
    PopoverCloseButton, PopoverHeader, PopoverArrow,
    PopoverContent,
    useDisclosure, useToast,
} from "@chakra-ui/react";
import {SettingsIcon, ArrowLeftIcon} from '@chakra-ui/icons'
import {FormikHelpers} from "formik";

import {chatItem, chatPayload, chatRoom, roomDict, Toast} from "../../types/types";
import {useHttpClient} from "../../hooks/http-hook";
import EditRoom from "./EditRoom";
import ChatFeed from "./ChatFeed";
import {AuthContext} from "../../context/auth-context";
import ChatInput from "./ChatInput";
import Header from "../UI/Header";
import {useHotkeys} from "react-hotkeys-hook";
import RoomList from "./RoomList";
import classes from "./ChatRoom.module.css"
import SmallHeader from "../UI/SmallHeader";

interface RouteParams {
    chatRoomID: string
}

interface Props {
    closeRoom: Function
    submitMessage: Function
    room: chatRoom
    rooms: roomDict
    setRoom: Function
}

const ChatRoom: React.FC<Props> = (props: Props) => {
    const toast = useToast()
    const {onOpen, onClose, isOpen} = useDisclosure()
    const auth = useContext(AuthContext);
    const {sendRequest} = useHttpClient()
    const [room, setRoom] = React.useState<chatRoom | undefined>(undefined)
    const [chat, setChat] = useState<chatItem[]>([]);

    useEffect(() => {
        setRoom(props.room)
        setChat(props.room.messages)
    }, [props])

    const submitMessageHandler = (values: { message: string }, actions: FormikHelpers<{ message: string }>) => {
        props.submitMessage(room?.id, values.message)
        actions.resetForm()
    }

    const updateRoomDescription = (description: string) => {
        if (room) setRoom({...room, description})
    }

    const deleteRoomHandler = async () => {
        const endPoint = "/api/chat/" + room?.id
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
            return props.closeRoom
        } catch (e) {
            console.log(e)
        }
    }

    useHotkeys("alt+left", (event) => {
        event.preventDefault()
        props.closeRoom()
    })

    const settingsButton = (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            placement="bottom-start"
        >
            <PopoverTrigger>
                <IconButton
                    variant="ghost"
                    colorScheme="blackAlpha"
                    color={"#FEE"}
                    aria-label="Settings"
                    fontSize="30px"
                    icon={<SettingsIcon/>}
                />
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow/>
                    <PopoverHeader>Edit Chat Room</PopoverHeader>
                    <PopoverCloseButton/>
                    <PopoverBody>
                        <EditRoom closeHandler={onClose}
                                  name={room?.name}
                                  description={(room?.description || "")}
                                  id={room?.id}
                                  updateRoomDescription={updateRoomDescription}
                        />
                        <Button onClick={deleteRoomHandler}>DELETE ROOM</Button>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>)

    return (
        <React.Fragment>
            <Box
                display={"flex"}
                flexDirection={"column"}
                height={"100%"}
                justifyContent={"center"}
            >
                <SmallHeader title={room?.name}
                             subtitle={room?.description}
                             rightButton={settingsButton}></SmallHeader>
                <Box d={"flex"}
                     flexDirection={"row"}
                     flex={"1 1 0"}
                     alignSelf={"center"}
                     justifyContent={"center"}


                     width={"100%"}
                     border={"2px solid green"}
                >
                    <Box className={classes.roomList}
                         pr={"5"}
                    >
                        <RoomList currentUser={auth.userId as string}
                                  currentRoom={props.room.id}
                                  roomDict={props.rooms}
                                  setRoom={setRoom}
                        />
                    </Box>
                    <Box d={"flex"}
                         flexDirection={"column"}
                         className={classes.chatParent}
                    >
                        <Box width={"100%"}
                             className={classes.backNav}
                        >
                            <Box d={"flex"}
                                 alignItems={"flex-start"}>
                                <IconButton onClick={() => props.closeRoom()}
                                            aria-label="Search database"
                                            icon={<ArrowLeftIcon />}
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
                             border={"2px solid red"}
                        >
                            <ChatFeed chatItems={room?.messages ? room.messages : []}
                                      currentUser={auth.userId}/>
                        </Box>
                        <Box
                            position={"relative"}
                            width={"100%"}
                            alignSelf={"center"}
                            maxW={"80ch"}
                            p={"2"}
                        >
                            <ChatInput submitMessage={submitMessageHandler}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default ChatRoom