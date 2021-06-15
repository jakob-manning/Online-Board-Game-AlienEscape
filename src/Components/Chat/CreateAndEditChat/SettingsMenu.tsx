import React, {useEffect, useState} from 'react';

import {
    IconButton,
    Button,
    useDisclosure,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Modal
} from "@chakra-ui/react";
import {SettingsIcon} from '@chakra-ui/icons'
import EditRoomDescription from "./EditRoomDescription";
import {chatRoom, userDict, userInterface} from "../../../types/types";
import AddMembers from "./AddMembers";
import CreateRoom from "./CreateRoom";

interface Props {
    room: chatRoom
    updateLocalRoomDescription: Function
    addUser: Function
    removeUser: Function
    deleteRoomHandler: Function
    users: userDict
}

const SettingsMenu: React.FC<Props> = (props: Props, children) => {
    const {onOpen, onClose, isOpen} = useDisclosure()

    const modal = (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Edit Chat room</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <EditRoomDescription closeHandler={onClose}
                                         name={props.room.name}
                                         description={props.room.description as string}
                                         id={props.room.id}
                                         updateRoomDescription={props.updateLocalRoomDescription} />
                    <AddMembers users={props.users}
                                room={props.room}
                                addUser={props.addUser}
                                removeUser={props.removeUser}
                    />
                    <Button mt={"3"} colorScheme={"red"} onClick={() => {
                        onClose()
                        props.deleteRoomHandler()
                    }}>DELETE ROOM</Button>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="purple" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

    return (
        <>
            {isOpen ? modal : null}
        <IconButton
            variant="ghost"
            color={"white"}
            aria-label="Settings"
            fontSize="30px"
            icon={<SettingsIcon/>}
            onClick={onOpen}
        />
        </>
    );
};

export default SettingsMenu;
