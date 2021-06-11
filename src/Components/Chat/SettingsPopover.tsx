import React from 'react';

import {
    IconButton,
    Button,
    Portal,
    Popover, PopoverTrigger, PopoverBody,
    PopoverCloseButton, PopoverHeader, PopoverArrow,
    PopoverContent,
    useDisclosure
} from "@chakra-ui/react";
import {SettingsIcon} from '@chakra-ui/icons'
import EditRoom from "./EditRoom";
import {chatRoom} from "../../types/types";

interface Props {
    room: chatRoom
    updateLocalRoomDescription: Function
    deleteRoomHandler: Function
}

const SettingsPopover: React.FC<Props> = (props: Props, children) => {
    const {onOpen, onClose, isOpen} = useDisclosure()

    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            placement="bottom-start"
        >
            <PopoverTrigger>
                <IconButton
                    variant="ghost"
                    color={"white"}
                    aria-label="Settings"
                    fontSize="30px"
                    icon={<SettingsIcon/>}
                />
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow/>
                    <PopoverHeader>Edit Chat Room</PopoverHeader>
                    <PopoverCloseButton/>
                    <PopoverBody>
                        <EditRoom closeHandler={onClose}
                                  name={props.room?.name}
                                  description={(props.room?.description || "")}
                                  id={props.room?.id}
                                  updateRoomDescription={props.updateLocalRoomDescription}
                        />
                        <Button onClick={() => props.deleteRoomHandler(props.room.id)}>DELETE ROOM</Button>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};

export default SettingsPopover;
