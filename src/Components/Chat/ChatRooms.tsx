import React, {useContext, useEffect} from 'react';
import {
    Box,
    Text,
    Button,
    Portal,
    Popover, PopoverTrigger, PopoverBody,
    PopoverCloseButton, PopoverHeader, PopoverArrow,
    PopoverContent,
    CloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import {useHistory} from 'react-router-dom';
import axios from "axios"

import {AuthContext} from '../../context/auth-context';
import {chatRoom, Toast} from "../../types/types";
import {Container} from "react-bootstrap";
import CreateRoom from "./CreateRoom";
import {useHttpClient} from "../../hooks/http-hook";

const {REACT_APP_BACKEND} = process.env;

const ChatRooms: React.FC = (props) => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [rooms, setRooms] = React.useState<chatRoom[]>([])
    const history = useHistory()
    const {onOpen, onClose, isOpen} = useDisclosure()

    const requestHandler = async () => {
        try {
            // let response = await axios.get(REACT_APP_BACKEND + "/api/chat")
            let toast: Toast = {
                successMode: "mute",
                errorTitle: "Duhn duhn duuuh",
                errorFallBack: "Couldn't load chat rooms. Try refreshing or create the first room?",
            }
            let response = await sendRequest("get", "/api/chat", toast)
            if (response.data.rooms) {
                // load to state
                setRooms(response.data.rooms)
            }
        } catch (e) {
            console.log(e)
        }
    }

    // Request rooms on page load
    useEffect(() => {
        requestHandler()
    }, [])

    const roomEnterHandler = (name: string) => {
        return history.push("/chat/" + name)
    }


    return (
        <React.Fragment>
            <Box w="100%"
                 bgGradient="linear(to-l, #7928CA, #FF0080)"
                 justifyContent={"center"}
                 flexDirection={"row"}
                 display={"flex"}
                 flexWrap={"wrap"}
            >
                <Text
                    m={"5"}
                    bgGradient="linear(to-l, #008,#000)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                >
                    Chat Rooms
                </Text>
            </Box>
            <Box
                display={"flex"}
                flexDirection={"column"}
            >
                <Popover
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    placement="bottom"
                >
                    <PopoverTrigger>
                        <Button
                            colorScheme="pink"
                            variant="outline"
                            m={"5"}
                            p={"5"}
                            lineHeight={2}
                        >
                            <Text
                                m={"5"}
                                bgGradient="linear(to-l, #FF0080,#FF088F)"
                                bgClip="text"
                                fontSize="xl"
                                opacity={0.9}
                                fontWeight="extrabold"
                            >
                                Create Room
                            </Text>
                        </Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverArrow/>
                            <PopoverHeader>New Chat Room</PopoverHeader>
                            <PopoverCloseButton/>
                            <PopoverBody>
                                <CreateRoom closeHandler={onClose}
                                            completeHandler={requestHandler}/>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
                {rooms.map(room => {
                    return (
                        <Box
                            m={"2"}
                            key={room.id}
                            as={"button"}
                            borderRadius="xl"
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                            _hover={{bg: "#ebedf0"}}
                            borderWidth={"1px"}
                            onClick={() => roomEnterHandler(room.name)}
                            zIndex={10}
                        >
                            <Text
                                m={"5"}
                                bgGradient="linear(to-l, #7928CA,#E30072)"
                                bgClip="text"
                                fontSize="3xl"
                                fontWeight="extrabold"
                                textAlign={"left"}
                            >
                                {room.name}
                            </Text>
                            <Text
                                m={"5"}
                                bgGradient="linear(to-l, #7928CA,#FF0080)"
                                bgClip="text"
                                fontSize="m"
                                fontWeight="medium"
                            >
                                {room.description}
                            </Text>
                        </Box>
                    )
                })
                }
            </Box>
        </React.Fragment>
    )
}

export default ChatRooms