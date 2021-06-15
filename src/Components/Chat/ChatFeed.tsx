import React, {useEffect} from 'react';
import {
    Box,
    ResponsiveValue,
} from "@chakra-ui/react";
import {chatItem} from "../../types/types";

interface Props {
    chatItems: chatItem[]
    currentUser: string | null
}

const ChatFeed: React.FC<Props> = (props: Props) => {
    const bottomRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (bottomRef.current !== null) {
            bottomRef.current.scrollIntoView();
        }
    }, [props])

    return (
        <React.Fragment>
            <Box d={"flex"}
                 flexDirection={"column"}
                 justifyContent={"center"}
                 p={"3"}
            >
            {props.chatItems.map((item, index) => {
                let currentRef = null
                if (index === props.chatItems.length - 1) {
                    currentRef = bottomRef
                }
                let alignSelf = "flex-start"
                let textAlign: ResponsiveValue<CanvasTextAlign> = "left"
                let me = false
                // let backgroundColor = "#ffabd5"
                let backgroundColor = "pink.200"
                if (item.userID === props.currentUser) {
                    alignSelf = "flex-end"
                    textAlign = "right"
                    me = true
                    // backgroundColor = "#cccfff"
                    backgroundColor = "purple.200"
                }
                return (
                    <Box
                        maxW="sm"
                        key={item.id}
                        borderRadius="lg"
                        overflow="hidden"
                        backgroundColor={backgroundColor}
                        p={"2"}
                        pl={"3"}
                        pr={"3"}
                        m={"2"}
                        boxShadow="base"

                        ml={me ? "10" : "2"}
                        mr={me ? "3" : "10"}
                        alignSelf={alignSelf}
                    >
                        <Box d="flex"
                             alignItems="baseline"
                             flexDirection={"column"}
                        >
                            <Box
                                textAlign={textAlign}
                                color="gray.100"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                ref={currentRef}
                            >
                                {!me && item.userName}
                            </Box>
                            <Box
                                alignSelf={alignSelf}
                                textAlign={textAlign}
                                mt="1"
                                fontWeight="normal"
                                fontSize={"md"}
                                color="gray.900"
                            >
                                {item.message}
                            </Box>
                        </Box>
                    </Box>
                )
            })}
            </Box>
        </React.Fragment>
    );
};

export default ChatFeed;
