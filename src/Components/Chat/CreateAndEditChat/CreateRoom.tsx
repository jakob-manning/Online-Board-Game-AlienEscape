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
import {Formik, Form, Field, FormikProps, FieldProps, FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import {useHttpClient} from "../../../hooks/http-hook";
import {Toast, userDict, userInterface} from "../../../types/types";
import { useHotkeys } from 'react-hotkeys-hook';
import { addUsersToRoom } from "../../../hooks/socket-hook";

const {REACT_APP_BACKEND} = process.env;

interface MyFormValues {
    name: string;
    description: string;
}

interface Props {
    closeHandler: Function;
    completeHandler: Function;
    users: userDict
}

const CreateRoom: React.FC<Props> = (props: Props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState<userInterface[]>([])
    const [usersAdded, setUsersAdded] = useState<userDict>({})
    const searchBarRef = React.useRef<HTMLInputElement>(null);

    function validateName(value: string) {
        let error
        if (!value) {
            error = "Name is Required"
        }
        if (value.length > 50) {
            error = "Room name is too long"
        }
        return error
    }

    function validateDescription(value: string) {
        let error
        if (value.length > 250) {
            error = "Slow down Shakespeare, that's too many characters."
        }
        return error
    }

    const createRoomHandler = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
        actions.setSubmitting(true)
        const body = {
            name: values.name,
            description: values.description
        }

        let response: any
        try {
            let toast: Toast = {
                successTitle: "Room Created",
                successBody: "Happy yappin'!",
                errorTitle: "Hmmm, something went wrong.",
                errorFallBack: "Couldn't create a new room, please try again.",
            }
            response = await sendRequest("post", "/api/chat/newRoom", toast, body)
            if (response.data) {
                actions.setSubmitting(false)
                props.completeHandler()
                actions.resetForm()

                // add users to room
                let membersToAdd = Object.keys(usersAdded)
                addUsersToRoom(membersToAdd, response.data.roomId)
                return props.closeHandler()
            }
        } catch (e) {
            console.log(e)
        }
        actions.setSubmitting(false)
        return
    }

    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setSearchValue(event.target.value);
    }
    const addUserHandler = (userID: string) => {
        setUsersAdded( oldUsers => {
            let newUsers = {...oldUsers}
            newUsers[userID] = props.users[userID]
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
            let newUsers = {...oldUsers}
            delete newUsers[userID]
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
        <Formik
            initialValues={{
                name: "",
                description: ""
            }}
            onSubmit={(values, actions) => createRoomHandler(values, actions)}
        >
            {(props: FormikProps<MyFormValues>) => (
                <Form>
                    <Field name="name" validate={validateName}>
                        {({field, form}: FieldProps) => (
                            <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
                                <FormLabel htmlFor="name" mt={"2"}>Room Name</FormLabel>
                                <Input {...field}
                                       id="name"
                                       placeholder="Give your room a clever name"
                                       autoComplete={"off"}
                                />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="description" validate={validateDescription}>
                        {({field, form}: FieldProps) => (
                            <FormControl isInvalid={!!form.errors.description && !!form.touched.description}>
                                <FormLabel htmlFor="description" mt={"4"}>Description</FormLabel>
                                <Input
                                    {...field}
                                    id="description"
                                    placeholder="Enter description"
                                    autoComplete={"off"}
                                />
                                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Box m={"2"}>
                        {Object.values(usersAdded).map(user => {
                            return (
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
                            return (
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
                    <Box m={"3"} pb={"6"}>
                        <Button
                            mt={4}
                            colorScheme="purple"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Create Room
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default CreateRoom;

