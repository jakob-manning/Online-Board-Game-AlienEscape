import React, {useContext} from 'react';

import {
    Menu as ChakraMenu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider,
    IconButton,
    Icon, useToast,
} from "@chakra-ui/react";
import {ChatIcon, SettingsIcon} from '@chakra-ui/icons'

import {FiLogOut, FiLogIn, VscAccount, HiDotsVertical} from "react-icons/all";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/auth-context";

const Menu: React.FC = () => {
    const history = useHistory()
    const auth = useContext(AuthContext);
    const toast = useToast();

    const roomsHandler = () => {
        toast({
            title: "You're already here, aren't you?",
            description: ("The prophecy predicts that someday this button will be more useful. But for now you just get this special message. Have a nice day!"),
            status: "info",
            duration: 5000,
            isClosable: true,
        })

        history.push("/chat")
    }

    const signOutHandler = () => {
        // delete jwt
        auth.logout("history")

        // redirect to login page
        history.push("/login")
    }

    const myAccountHandler = () => {
        toast({
            title: "Hold up cowboy.",
            description: ("that feature ain't implemented yet"),
            status: "info",
            duration: 5000,
            isClosable: true,
        })

    }

    if(auth.isLoggedIn) return (<ChakraMenu>
        <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Icon as={HiDotsVertical} boxSize={7} />}
            color={"white"}
            variant="ghost"
        />
        <MenuList>
            <MenuGroup title="Chat">
                <MenuItem icon={<ChatIcon />} onClick={roomsHandler}>
                    Rooms
                </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Profile">
                <MenuItem icon={<Icon as={VscAccount}/>} onClick={myAccountHandler} >
                    My Account
                </MenuItem>
                <MenuItem icon={<Icon as={auth.isLoggedIn ? FiLogOut : FiLogIn} />} onClick={signOutHandler} >
                    Sign Out
                </MenuItem>
            </MenuGroup>
        </MenuList>
    </ChakraMenu>)

    return (
        <IconButton
            variant="ghost"
            color={"white"}
            aria-label="Settings"
            fontSize="30px"
            icon={<Icon as={FiLogIn} />}
            onClick={signOutHandler}
        />
    );
};

export default Menu;
