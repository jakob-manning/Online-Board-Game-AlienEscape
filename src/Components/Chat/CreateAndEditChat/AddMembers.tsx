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
} from "@chakra-ui/react";
import {chatRoom, userDict, userInterface} from "../../../types/types";

interface Props {
    users: userDict
    room: chatRoom
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
    },[])

    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        console.log(event.target.value)
        console.log(searchValue)
        setSearchValue(event.target.value);
    }
    const addUserHandler = (userID: string) => {
        setUsersAdded( oldUsers => {
            let newUsers = [...oldUsers]
            newUsers.push(props.users[userID])
            return newUsers
        })
        setSearchValue("")
        if (searchBarRef.current !== null) {
            searchBarRef.current.scrollIntoView();
            searchBarRef.current.select();
        }
    }

    const removeUserHandler = (userID: string) => {
        setUsersAdded( oldUsers => {
            let newUsers = oldUsers.filter(user => user?.id !== userID)
            return newUsers
        })
    }

    useEffect(() => {
        if (searchValue.length > 2) {
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
        <><FormLabel htmlFor="userSearch">Current Members</FormLabel>
        <Box m={"2"}>
            {usersAdded.map(user => {
                if(user) return (
                    <Tag size="lg"
                         colorScheme="blue"
                         borderRadius="full"
                         cursor={"pointer"}
                         m={"1"}
                         key={user.id}
                         onClick={() => removeUserHandler(user.id)}
                    >
                        <Avatar
                            size="xs"
                            name={user.name}
                            ml={-1}
                            mr={2}
                        />
                        <TagLabel>{user.name}</TagLabel>
                    </Tag>
                )
            })}
        </Box>
        <Box mt={"2"}>
            <FormLabel htmlFor="userSearch">Add Friends</FormLabel>
            <Input
                id="userSearch"
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
                        <Tag size="lg"
                             colorScheme="red"
                             borderRadius="full"
                             cursor={"pointer"}
                             m={"1"}
                             key={user.id}
                             onClick={() => addUserHandler(user.id)}
                        >
                            <Avatar
                                size="xs"
                                name={user.name}
                                ml={-1}
                                mr={2}
                            />
                            <TagLabel>{user.name}</TagLabel>
                        </Tag>
                    )
                })}
            </Box>
        </Box>
        </>
    );
};

export default ReactFunctionalComponent;
