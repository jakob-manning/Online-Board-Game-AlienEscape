import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Center,
    Text,
    IconButton,
    Button,
    Portal,
    Popover, PopoverTrigger, PopoverBody,
    PopoverCloseButton, PopoverHeader, PopoverArrow,
    PopoverContent,
    useDisclosure, Input, InputRightElement, InputGroup, useToast,
} from "@chakra-ui/react";
import {SettingsIcon} from '@chakra-ui/icons'
import {FormikHelpers} from "formik";

import {useHistory, useParams} from 'react-router-dom';
import {chatItem, chatRoom, Toast} from "../../types/types";
import {useHttpClient} from "../../hooks/http-hook";
import {
    initiateSocket, disconnectSocket,
    subscribeToChat, sendMessage, loadHistory
} from '../../hooks/socket-hook';
import EditRoom from "./EditRoom";
import ChatFeed from "./ChatFeed";
import {AuthContext} from "../../context/auth-context";
import ChatInput from "./ChatInput";
import NotificationHandler from "./NotificationHandler";
import Header from "../UI/Header";

interface RouteParams {
    chatRoomName: string
}

const ChatRoom: React.FC = (props) => {
    const toast = useToast()
    const auth = useContext(AuthContext);
    const {sendRequest} = useHttpClient()
    const history = useHistory()
    const [room, setRoom] = React.useState<chatRoom | undefined>(undefined)
    const [chat, setChat] = useState<chatItem[]>([]);
    const {onOpen, onClose, isOpen} = useDisclosure()

    const chatRoomName = useParams<RouteParams>().chatRoomName;

    const initialLoadHandler = async () => {
        try {
            let toast: Toast = {
                successMode: "mute",
                errorTitle: "Hmmmm...",
                errorFallBack: "Couldn't load this chat room. Try refreshing your page or buying a new computer.",
                errorStatus: "info"
            }

            let response = await sendRequest("get", "/api/chat/byName/" + chatRoomName, toast)

            if (response.data.room) {
                // load to state
                setRoom(response.data.room)
            }
        } catch (e) {
            console.log(e)
        }
    }

    // Request rooms on page load
    useEffect(() => {
        initialLoadHandler()
    }, [])

    const roomChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const source = event.target.name
        const value = event.target.value
        if (source) {
            // @ts-ignore
            setRoom({...room, [source]: value})
        }
        return
    }

    const updateRoomLocally = () => {
        // TODO: update state so component matches changes sent to server
        return
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
            return history.push("/chat/")
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

    useEffect(() => {
        if (room) initiateSocket(room.id, auth.token, errorHandler)

        loadHistory((error, data) => {
            const {history, room} = data
            console.log("History loaded: " + history)
            if (error) {
                console.log("error getting data from chat")
                return
            }
            if (room && history) {
                setChat(history)
            }
        })

        subscribeToChat(auth.userId, (error, data: chatItem) => {
            if (error) {
                console.log("error getting data from chat")
                return
            }
            setChat(oldChats => [...oldChats, data])
        })

        return () => {
            disconnectSocket();
        }
    }, [room, auth])

    const submitMessageHandler = async (values: { message: string }, actions: FormikHelpers<{ message: string }>) => {
        if (room) sendMessage(room.id, values.message)
        actions.resetForm()
    }

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
                                  completeHandler={updateRoomLocally}
                                  name={room?.name}
                                  description={(room?.description || "")}
                                  id={room?.id}
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
                <Header title={room?.name} subtitle={room?.description} rightButton={settingsButton}></Header>
                <Box alignSelf={"center"}
                     minW={"50ch"}
                     overflow={"scroll"}
                     flex={"1 1 0"}
                     overflowX={"hidden"}
                >
                <Box
                    maxW={"50ch"}
                    m={"2"}
                >
                        <ChatFeed chatItems={chat} currentUser={auth.userId}/>
                    </Box>
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
        </React.Fragment>
    )
}

export default ChatRoom