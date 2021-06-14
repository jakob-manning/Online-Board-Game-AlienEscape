import React, {useEffect, useState} from 'react';

import {
    Box,
    Text,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Avatar,
    Tag,
    TagLabel,
    CloseButton,
    IconButton,
    Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody,PopoverFooter
} from "@chakra-ui/react";
import {chatRoom, Toast, userDict, userInterface} from "../../../types/types";

interface Props {
    users: userDict
    room: chatRoom
    addUser: Function
    removeUser: Function
}

const ReactFunctionalComponent: React.FC<Props> = (props: Props, children) => {
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState<userInterface[]>([])
    const [usersAdded, setUsersAdded] = useState<Array<userInterface>>([])
    const searchBarRef = React.useRef<HTMLInputElement>(null);

    useEffect( () => {
        // map current users
        let knownMembers = props.room.members.filter( memberID => props.users[memberID])
        setUsersAdded(knownMembers.map(member => props.users[member]))
    },[props.room, props.users])

    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    }

    useEffect(() => {
        if (searchValue.length > 0) {
            //search users for this name
            let userList = Object.values(props.users)
            let results = userList.filter(user => {
                let substring = user.name.search(new RegExp(searchValue, "i"))
                if (substring === -1) {
                    return false
                }
                return true
            })
            setSearchResults(results)
        } else {
            // clear search results
            setSearchResults([])
        }
    }, [searchValue])

    return (
        <Box mt={"2"}>
            <FormLabel htmlFor="userSearch"
            >Members</FormLabel>
        <Box m={"2"}>
            {usersAdded.map(user => {
                if(user) return (
                    <Popover key={user.id}>
                        {({ isOpen, onClose} ) => (<>
                        <PopoverTrigger>
                            <Tag size="lg"
                                 colorScheme="blue"
                                 borderRadius="full"
                                 cursor={"pointer"}
                                 m={"1"}
                            >
                                <Avatar
                                    size="xs"
                                    name={user.name}
                                    ml={-1}
                                    mr={2}
                                />
                                <TagLabel>{user.name}</TagLabel>
                            </Tag>
                        </PopoverTrigger>
                        <PopoverContent width={"150px"}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Remove User?</PopoverHeader>
                            <PopoverFooter>
                                <Button colorScheme={"red"}
                                        onClick={() => {
                                            props.removeUser(user.id)
                                            onClose()
                                        }}
                                        width={"100%"}
                                >
                                    Remove
                                </Button>
                            </PopoverFooter>
                        </PopoverContent>
                        </>)}
                    </Popover>
                )
            })}
        </Box>
        <Box mt={"2"}>
            <FormLabel htmlFor="addFriends"></FormLabel>
            <Input
                id="addFriends"
                name={"userSearch"}
                value={searchValue}
                placeholder="Invite Friends"
                autoComplete={"off"}
                ref={searchBarRef}
                onChange={(event) => searchHandler(event)}
            />
            <Box m={"2"}>
                {searchResults.map(user => {
                    if(user) return (
                        <Popover key={user.id}>
                            {({ isOpen, onClose} ) => (<>
                            <PopoverTrigger>
                                <Tag size="lg"
                                     colorScheme="red"
                                     borderRadius="full"
                                     cursor={"pointer"}
                                     m={"1"}
                                >
                                    <Avatar
                                        size="xs"
                                        name={user.name}
                                        ml={-1}
                                        mr={2}
                                    />
                                    <TagLabel>{user.name}</TagLabel>
                                </Tag>
                            </PopoverTrigger>
                            <PopoverContent width={"150px"}>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Add User?</PopoverHeader>
                                <PopoverFooter>
                                    <Button colorScheme={"green"}
                                            onClick={() => {
                                                props.addUser(user.id)
                                                onClose()
                                            }}
                                            width={"100%"}
                                    >
                                        Add
                                    </Button>
                                </PopoverFooter>
                            </PopoverContent>
                                </>)}
                        </Popover>
                    )
                })}
            </Box>
        </Box>
        </Box>
    );
};

export default ReactFunctionalComponent;
