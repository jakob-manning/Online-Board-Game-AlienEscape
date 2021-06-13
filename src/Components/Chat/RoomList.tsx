import React from 'react';
import {
    Box, Spacer,
    Text,
} from "@chakra-ui/react";

import {chatRoom, roomDict, roomID} from "../../types/types";

interface Props {
    roomDict: roomDict
    setRoom: Function
    currentRoom?: roomID
    currentUser: string
}

const RoomList: React.FC<Props> = (props: Props) => {

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

    const checkReadStatus = (room: chatRoom) =>{
        if(room.membersRead?.[props.currentUser]) {
            return (true)
        }
        return false
    }

    // Sort rooms by date of last message
    let roomArray = Object.values(props.roomDict)
    roomArray.sort( (a,b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )

    return (
        <Box pr={"4"}
             overflow={"scroll"}
             flex={"1 1 0"}
             overflowX={"hidden"}
             width={"100%"}
        >
            {roomArray.map(room => {
                return (
                    <Box
                        m={"2"}
                        p={"1"}
                        key={room.id}
                        as={"button"}
                        borderRadius="xl"
                        display={"flex"}
                        flexDirection={"column"}
                        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                        _hover={props.currentRoom === room.id ? {} : {bg: "#ebedf0"}}
                        borderWidth={"1px"}
                        onClick={() => props.setRoom(room.id)}
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
                            <Spacer />
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
                        {/*<Text*/}
                        {/*    m={"5"}*/}
                        {/*    bgGradient="linear(to-l, #7928CA,#FF0080)"*/}
                        {/*    bgClip="text"*/}
                        {/*    fontSize="s"*/}
                        {/*    fontWeight="medium"*/}
                        {/*    textOverflow={"ellipsis"}*/}
                        {/*    overflow={"hidden"}*/}
                        {/*>*/}
                        {/*    {room.membersRead && room.membersRead.get(auth.userId as string)}*/}
                        {/*</Text>*/}
                    </Box>
                )
            })}

        </Box>
    );
};

export default RoomList;
