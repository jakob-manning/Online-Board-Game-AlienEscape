import React from 'react';
import {
    Box,
    Text,
    Button,
    Link
} from "@chakra-ui/react";
import {AddIcon} from '@chakra-ui/icons'

const ReactFunctionalComponent: React.FC = () => {

    return (
        <React.Fragment>
            <Box w="100%" bgGradient="linear(to-l, #7928CA, #FF0080)">
                <Text
                    m={"5"}
                    bgGradient="linear(to-l, #00A,#000)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                >
                    Escape From the Aliens In Outer Space
                </Text>
            </Box>
            <Text
                m={"5"}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
            >
                Hunt or be Hunted
            </Text>
            <Link _hover={{textDecoration: "none"}} fontDecoration={"none"} href={"/join_game"}>
                <Button color={"black"} m={"3"}>
                    <Text
                        m={"2"}
                        bgGradient="linear(to-l, #7928CA,#FF0080)"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="bold"
                    >
                        Join a game
                    </Text>
                </Button>
            </Link>
            <Link _hover={{textDecoration: "none"}} fontDecoration={"none"} href={"/new_game"}>
                <Button color={"black"} m={"3"}>
                    <AddIcon/>
                    <Text
                        m={"2"}
                        bgGradient="linear(to-l, #00000A,#300000)"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="bold"
                    >
                        Create a new game
                    </Text>
                </Button>
            </Link>
        </React.Fragment>
    );
};

export default ReactFunctionalComponent;