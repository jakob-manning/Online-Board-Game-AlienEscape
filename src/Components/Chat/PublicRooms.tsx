import React, {useEffect} from 'react';
import {
    Box, Spacer,
    Text, useDisclosure,
    Popover, PopoverTrigger, PopoverBody,
    PopoverCloseButton, PopoverHeader, PopoverArrow,
    PopoverContent,
    Portal,
    Button,
    IconButton,
    PopoverFooter,
} from "@chakra-ui/react";

import {chatRoom, roomDict, roomID, Toast} from "../../types/types";
import {useHttpClient} from "../../hooks/http-hook";
import {SettingsIcon} from "@chakra-ui/icons";
import EditRoomDescription from "./CreateAndEditChat/EditRoomDescription";
import {addUserToRoom} from "../../hooks/socket-hook";

interface Props {
    setRoom: Function
    currentRoom?: roomID
    currentUser: string
}

const RoomList: React.FC<Props> = (props: Props) => {
    const {sendRequest} = useHttpClient()
    const [rooms, setRooms] = React.useState<roomDict>({})
    const {onOpen, onClose, isOpen} = useDisclosure()

    const loadRooms = async () => {
        try {
            let toast: Toast = {
                successMode: "mute",
                errorTitle: "hmmmmmmm, hmm, hmm",
                errorFallBack: "Couldn't load public chat rooms. Try refreshing the page or taking a walk?",
            }
            let response = await sendRequest("get", "/api/chat/public", toast)
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

    useEffect(() => {
        loadRooms().catch(e => console.log(e))
    }, [])

    const calculateTimeSinceMessage = (date: Date) => {
        let now = new Date()
        let timepassed = now.getTime() - date.getTime()
        let hours = timepassed / 1000 / 60 / 60

        if (hours < 24) {
            return `${Math.floor(hours)} hours ago`
        }

        if (date.getFullYear() === now.getFullYear()) {
            let datestring = date.toDateString()
            return datestring.substr(0, datestring.length - 4)
        }

        return date.toDateString()
    }

    const checkReadStatus = (room: chatRoom) => {
        if (room.membersRead?.[props.currentUser]) {
            return (true)
        }
        return false
    }

    const joinRoomHandler = (roomID: roomID) => {
        addUserToRoom(props.currentUser, roomID)
    }

    // Sort rooms by date of last message
    let roomArray = Object.values(rooms)
    roomArray.sort((a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )

    return (
        <Box overflow={"scroll"}
             flex={"1 1 0"}
             overflowX={"hidden"}
             width={"100%"}
             pl={"1"}
             pr={"5"}
        >
            {roomArray.map(room => {
                return (
                    <Popover
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        placement="bottom-start"
                    >
                        {({ isOpen, onClose} ) => (
                            <>
                        <PopoverTrigger>
                                <Box
                                    m={"2"}
                                    p={"2"}
                                    key={room.id}
                                    borderRadius="xl"
                                    display={"flex"}
                                    flexDirection={"column"}
                                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                                    _hover={props.currentRoom === room.id ? {} : {bg: "#ebedf0"}}
                                    borderWidth={"1px"}
                                    // onClick={() => props.setRoom(room.id)}
                                    zIndex={0}
                                    backgroundColor={props.currentRoom === room.id ? "#f1f7ff" : "none"}
                                    width={"100%"}

                                >
                                    <Box d={"flex"}
                                         flex={"column"}
                                         width={"100%"}
                                    >
                                        <Text
                                            bgGradient="linear(to-l, #7928CA,#FF0080)"
                                            bgClip="text"
                                            fontSize="lg"
                                            fontWeight="extrabold"
                                            textAlign={"left"}
                                            maxW={"20ch"}

                                            whiteSpace={"nowrap"}
                                            overflow={"hidden"}
                                            textOverflow={"ellipsis"}

                                        >
                                            {room.name}
                                        </Text>
                                        <Spacer/>
                                        <Text
                                            color={"#7928CA"}
                                            fontSize="m"
                                            fontWeight="light"
                                            textAlign={"right"}

                                            whiteSpace={"nowrap"}
                                            overflow={"hidden"}
                                            textOverflow={"ellipsis"}

                                        >
                                            {checkReadStatus(room) ?
                                                calculateTimeSinceMessage(new Date(room.lastUpdated)) :
                                                <Box width={"20px"}
                                                     height={"20px"}
                                                     borderRadius={"100px"}
                                                     display={"block"}
                                                     background={"rgb(2,0,36)"}
                                                     bgGradient="linear-gradient(132deg, rgba(255,255,255,1) 8%, rgba(130,255,148,1) 22%, rgba(50,207,83,1) 79%)"
                                                />}
                                        </Text>
                                    </Box>
                                    <Box d={"flex"}
                                         flex={"column"}
                                         width={"100%"}
                                    >
                                        <Text
                                            bgGradient="linear(to-l, #7928CA,#FF0080)"
                                            bgClip="text"
                                            fontSize="m"
                                            fontWeight="medium"
                                            pr={"2"}
                                            maxW={"15ch"}

                                            whiteSpace={"nowrap"}
                                            overflow={"hidden"}
                                            textOverflow={"ellipsis"}

                                        >
                                            {room.description}
                                        </Text>
                                        <Spacer/>
                                        <Text
                                            color={"#E30072"}
                                            fontSize="m"
                                            fontWeight="medium"
                                            maxW={"20ch"}

                                            whiteSpace={"nowrap"}
                                            overflow={"hidden"}
                                            textOverflow={"ellipsis"}

                                        >
                                            {room.messages[room.messages.length - 1]?.message}
                                        </Text>
                                    </Box>
                                </Box>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent width={"150px"}>
                                <PopoverArrow/>
                                <PopoverHeader>Join Room?</PopoverHeader>
                                <PopoverCloseButton/>
                                <PopoverFooter>
                                    <Button width={"100%"}
                                            colorScheme={"purple"}
                                            onClick={() => {
                                                joinRoomHandler(room.id)
                                                onClose()
                                            }}
                                    >JOIN</Button>
                                </PopoverFooter>
                            </PopoverContent>
                        </Portal>
                            </>)}
                    </Popover>

                )
            })}

        </Box>
    );
};

export default RoomList;
