import React, {useContext, useEffect} from 'react';
import {
    Box,
    Text,
    useToast,
    Button,
    Input,
    InputRightElement,
    FormControl,
    FormLabel,
    FormErrorMessage,
    InputGroup,
    IconButton
} from "@chakra-ui/react";
import {AddIcon} from '@chakra-ui/icons'
import {useHistory} from 'react-router-dom';
import axios from "axios"

import {AuthContext} from '../../context/auth-context';
import {chatRoom} from "../../types/types";

const {REACT_APP_BACKEND} = process.env;

const ChatRooms: React.FC = (props) => {
    const auth = useContext(AuthContext);
    const [rooms, setRooms] = React.useState<chatRoom[]>([])
    const history = useHistory()
    const toast = useToast()

    useEffect(() => {
        const requestHandler = async () => {
            try {
                let response = await axios.get(REACT_APP_BACKEND + "/chat")

                if (response.data.rooms) {
                    // load to state
                    setRooms(response.data.rooms)
                } else {
                    toast({
                        title: "Hmm, there's nothing here.",
                        description: "No chat rooms found, time to create one?",
                        status: "error",
                        duration: 6000,
                        isClosable: true,
                    })
                }

            } catch (e) {
                console.log(e)
                if (e.response) {
                    toast({
                        title: "Oops.",
                        description: e.response.data.message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            }
        }
        requestHandler()
    }, [])


    return (
        <React.Fragment>
            <Box w="100%"
                 bgGradient="linear(to-l, #7928CA, #FF0080)"
                 justifyContent={"center"}
                 flexDirection={"row"}
                 display={"flex"}
                 flexWrap={"wrap"}
            >
                <Button
                    bg={"none"}
                    m={"5"}
                    p={"10"}
                    pb={"12"}
                    lineHeight={2.2}
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
                </Button>
            </Box>
            <Box>
                <IconButton
                    colorScheme="white"
                    aria-label="Create Room"
                    fontSize="20px"
                    icon={<AddIcon />}
                />
                {rooms.map(room => {
                    return (
                        <Box
                            key={room.id}
                        >
                            <Text
                                m={"5"}
                                bgGradient="linear(to-l, #7928CA,#FF0080)"
                                bgClip="text"
                                fontSize="xl"
                                fontWeight="extrabold"
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