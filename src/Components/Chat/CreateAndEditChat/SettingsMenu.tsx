import React, {useEffect, useState} from 'react';

import {
    IconButton,
    Button,
    useDisclosure,
    Spacer,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Modal,
    FormControl,
    FormLabel,
    Switch, FormErrorMessage
} from "@chakra-ui/react";
import {SettingsIcon} from '@chakra-ui/icons'
import EditRoomDescription from "./EditRoomDescription";
import {chatRoom, Toast, userDict, userID, userInterface} from "../../../types/types";
import AddMembers from "./AddMembers";
import CreateRoom from "./CreateRoom";
import {Field, FieldProps} from "formik";
import {useHttpClient} from "../../../hooks/http-hook";

interface Props {
    room: chatRoom
    updateLocalRoomDescription: Function
    addUser: Function
    removeUser: Function
    deleteRoomHandler: Function
    users: userDict
    removeSelf: Function
}

const SettingsMenu: React.FC<Props> = (props: Props, children) => {
    const {onOpen, onClose, isOpen} = useDisclosure()
    const [publicChat, setPublicChat] = useState<boolean>(props.room.open)
    const {sendRequest} = useHttpClient()

    const togglePublicHandler = async () => {
        try {
            // Get the users rooms
            let toast: Toast = {
                successMode: "mute",
                errorTitle: "Nope, that didn't work",
                errorFallBack: "Couldn't toggle room state. Try refreshing the page or opening a window?",
            }
            let response = await sendRequest("post",
                "/api/chat/toggleOpen/" + props.room.id,
                toast,
                {newOpenState: !publicChat})

            // load rooms into state
            if (response?.data?.newState) setPublicChat(true)
            else if (response?.data?.newState === false) setPublicChat(false)
            else setPublicChat(props.room.open)
        } catch (e) {
            console.log(e)
            setPublicChat(props.room.open)
        }
    }

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
                    <FormLabel htmlFor="public" mt={"4"}>Public Room</FormLabel>
                    <Switch
                        ml={"2"}

                        id="public"
                        size="lg"
                        colorScheme="purple"
                        isChecked={publicChat}
                        onChange={togglePublicHandler}
                    />
                    <Spacer />
                    <Button mt={"3"}
                            backgroundColor={"red.300"}
                            colorScheme={"red"}
                            onClick={() => {
                        onClose()
                        props.removeSelf()
                    }}>LEAVE CHANNEL</Button>
                    <Button ml={"3"} mt={"3"} colorScheme={"red"} onClick={() => {
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
