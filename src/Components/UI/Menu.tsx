import React, {useContext} from 'react';

import {
    Menu as ChakraMenu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider,
    IconButton,
    Icon,
} from "@chakra-ui/react";
import {ChatIcon} from '@chakra-ui/icons'

import {FiLogOut, VscAccount, HiDotsVertical} from "react-icons/all";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/auth-context";

const Menu: React.FC = () => {
    const history = useHistory()
    const auth = useContext(AuthContext);

    const roomsHandler = () => {
        history.push("/chat")
    }

    const signOutHandler = () => {
        // delete jwt
        auth.logout("history")

        // redirect to login page
        history.push("/login")
    }

    return (
        <ChakraMenu>
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
                    <MenuItem icon={<Icon as={VscAccount} />}>
                        My Account
                    </MenuItem>
                    <MenuItem icon={<Icon as={FiLogOut} />} onClick={signOutHandler} >
                        Sign Out
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </ChakraMenu>
    );
};

export default Menu;
