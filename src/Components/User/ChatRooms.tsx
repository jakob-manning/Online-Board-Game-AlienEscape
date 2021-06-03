import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Text,
    Button,
    Link,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    InputRightAddon, useToast
} from "@chakra-ui/react";
import {ArrowForwardIcon} from '@chakra-ui/icons'
import {Field, FieldProps, Form, Formik, FormikHelpers, FormikProps} from "formik";

import {AuthContext} from "../../context/auth-context";
import {
    initiateSocket, disconnectSocket,
    subscribeToChat, sendMessage, loadHistory
} from '../../hooks/socket-hook';
import {chatItem} from "../../types/types"

interface MyFormValues {
    message: string;
}

const ReactFunctionalComponent: React.FC = () => {
    const auth = useContext(AuthContext);
    const toast = useToast()
    const rooms = ['A', 'B', 'C'];
    const [room, setRoom] = useState(rooms[0]);
    const [chat, setChat] = useState<chatItem[]>([]);

    const errorHandler = (error: Error) => {
        toast({
            title: "Oppsie-daisy.",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
        })
        return
    }

    useEffect(() => {
        if (room) initiateSocket(room, auth.token, errorHandler)

        loadHistory((error, data) => {
            const {history, room} = data
            console.log("History loaded: " + history)
            if (error) {
                console.log("error getting data from chat")
                return
            }
            if (room && history) {
                setChat(history)
            }
        })

        subscribeToChat((error, data: chatItem) => {
            if (error) {
                console.log("error getting data from chat")
                return
            }
            setChat(oldChats => [...oldChats, data])
        })

        return () => {
            disconnectSocket();
        }
    }, [room, auth])

    const submitMessageHandler = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
        sendMessage(room, values.message)
        actions.resetForm()
    }

    return (
        <React.Fragment>
            <Box w="100%"
                 bgGradient="linear(to-l, #7928CA, #FF0080)"
                 justifyContent={"center"}
                 flexDirection={"row"}
                 display={"flex"}
                 flexWrap={"wrap"}
            >
                <Text
                    m={"5"}
                    bgGradient="linear(to-l, #000,#008)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                >
                    Chat Room: {room}
                </Text>
            </Box>
            <Text
                m={"5"}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
            >
                What's up friends? 💁‍♂️
            </Text>
            <Box
                display={"flex"}
            >
                {rooms.map((r, i) =>
                    <Button
                        m={"5"}
                        colorScheme="teal"
                        onClick={() => setRoom(r)}
                        key={i}
                    >{r}
                    </Button>
                )}
            </Box>
            <Box></Box>
            {chat.map((item, index) => {
                return(
                    <Box>
                        <Text
                            m={"0"}
                            bgGradient="linear(to-l, #FF0080,#FF008A)"
                            bgClip="text"
                            fontSize="xl"
                            fontWeight="extrabold"
                            key={index}
                        >
                            {item.name + " says: "}
                        </Text>
                        <Text
                            m={"0"}
                            bgGradient="linear(to-l, #FF0080,#FF008A)"
                            bgClip="text"
                            fontSize="xl"
                            fontWeight="extrabold"
                            key={index}
                        >
                            {item.message}
                        </Text>
                    </Box>
                    )
            })}
            <Formik
                initialValues={{
                    message: "",
                }}
                onSubmit={(values, actions) => submitMessageHandler(values, actions)}
            >
                {(props: FormikProps<MyFormValues>) => (
                    <Form>
                        <Field name="message">
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.message && !!form.touched.messsage}>
                                    <FormLabel htmlFor="message"></FormLabel>
                                    <InputGroup size="md" mb={"5"}>
                                        <Input
                                            {...field}
                                            id="message"
                                            placeholder=""
                                            autocomplete="off"
                                            focusBorderColor={"none"}
                                        />
                                        <InputRightAddon width="4.5rem">
                                            <Button
                                                variant="ghost"
                                                colorScheme="teal"
                                                isLoading={props.isSubmitting}
                                                type="submit"
                                                ml={"-3"}
                                                pl={"8"}
                                                pr={"8"}
                                            >
                                                <ArrowForwardIcon/>
                                            </Button>
                                        </InputRightAddon>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default ReactFunctionalComponent;
