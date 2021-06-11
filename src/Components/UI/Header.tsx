import React, {ReactNode, useContext} from 'react';

import {
    Box,
    Text,
    IconButton,
    Container,
    Flex,
    Spacer,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    Button, Popover, Icon
} from "@chakra-ui/react";
import {FiSettings} from "react-icons/all";

import Menu from "./Menu";

interface Props {
    title: string | undefined
    subtitle?: string
    rightButton?: React.ReactNode
}

const Header: React.FC<Props> = (props: Props) => {

    return (
        <React.Fragment>
            <Box w="100%"
                 bgGradient="linear(to-l, #7928CA, #FF0080)"
                 flexDirection={"row"}
                 display={"flex"}
                 flexWrap={"wrap"}
            >
                <Container>
                <Flex width={"100%"} mt={"2"}>
                    <Menu/>
                    <Spacer/>
                    {props.rightButton}
                </Flex>
                <Flex width={"100%"}>
                    <Spacer/>
                    <Text
                        m={"5"}
                        color={"#EFF"}
                        fontSize="6xl"
                        fontWeight="extrabold"
                        alignSelf={"center"}
                    >
                        {props.title}
                    </Text>
                    <Spacer/>
                </Flex>

            <Text
                m={"5"}
                color={"#ebf2f5"}
                fontSize="lg"
            >
                {props.subtitle}
            </Text>
            </Container>
        </Box>
</React.Fragment>
);
};

export default Header;

