import React from 'react';

import {
    Box, Container,
    Text,
    Flex,
    Spacer,
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
                <Container maxW={"100ch"}>
                    <Flex width={"100%"} mt={"2"}>
                        <Menu/>
                        <Spacer/>
                        <Text
                            p={"1"}
                            color={"#EFF"}
                            fontSize="2xl"
                            fontWeight="extrabold"
                            alignSelf={"center"}
                        >
                            {props.title}
                        </Text>
                        <Spacer/>
                        {props.rightButton}
                    </Flex>
                    <Text
                        color={"#ebf2f5"}
                        fontSize="m"
                        p={"2"}
                    >
                        {props.subtitle}
                    </Text>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default Header;