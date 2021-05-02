import React from 'react';
import {
    Box,
    CircularProgress,
    Text,
    useToast,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage
} from "@chakra-ui/react";
import {Formik, Form, Field, FormikProps, FieldProps, FormikHelpers} from "formik";
import {useHistory, useParams} from 'react-router-dom';
import axios from "axios"
import useStickyState from "../../hooks/useStickyState";
import {itemInterface} from "../../types/types";


interface MyFormValues {
    tableName: string;
    playerName: string;
}

interface gameState {
    tableName: string;
    playerName: string;
    role: string
    items: itemInterface[]
}

interface RouteParams {
    tableName: string
}

const JoinGame: React.FC = (props) => {
    const history = useHistory()
    const toast = useToast()

    let tableNameParam = useParams<RouteParams>().tableName;
    if(!tableNameParam) tableNameParam = ""

    function validateTableName(value: string) {
        let error
        if (!value) {
            error = "Table name is required"
        }
        return error
    }

    function validateName(value: string) {
        let error
        if (!value) {
            error = "Player name is required"
        }
        return error
    }

    const submitJoinGameHandler = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
        const body = values
        const url = process.env.REACT_APP_BACKEND + "/joinGame"

        let response: any
        try {
            response = await axios.post(url, values)
            console.log(response.data)
            console.log(response.data.data.name)
            console.log(response.data.data.role)
            if(response.data.data.name && response.data.data.role){
                toast({
                    title: "You're in.",
                    description: "Welcome " + response.data.data.name + ". You are playing the role of " + response.data.data.role + ".",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })

                // Push something to local storage to tell us who this person is playing as during this game
                const gameState: gameState = {
                    playerName: values.playerName,
                    tableName: values.tableName,
                    role: response.data.data.role,
                    items: []
                }

                localStorage.setItem(values.tableName, JSON.stringify(gameState))

                // Redirect the player
                history.push("/game/" + values.tableName )

            }
            else {
                toast({
                    title: "Something went wrong.",
                    description: "Unable to connect to table, please try again.",
                    status: "info",
                    duration: 9000,
                    isClosable: true,
                })
            }

        } catch (e) {
            console.log(e)
            if(e.response){
                toast({
                    title: "Oops.",
                    description: e.response.data.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
        }


        actions.setSubmitting(false)
        return

    }


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
                    Join an Existing Game
                </Text>
            </Box>
            <Text
                m={"5"}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
            >
                Escape or Die Trying
            </Text>

            <Formik
                initialValues={{
                    tableName: tableNameParam,
                    playerName: ""
                }}
                onSubmit={(values, actions) => submitJoinGameHandler(values, actions)}
            >
                {(props: FormikProps<MyFormValues>) => (
                    <Form>
                        <Field name="tableName" validate={validateTableName}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.tableName && !!form.touched.tableName}>
                                    <FormLabel htmlFor="tableName">Table Name</FormLabel>
                                    <Input {...field} id="tableName" placeholder=""/>
                                    <FormErrorMessage>{form.errors.tableName}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Box mt={"3"}>
                            <Field name="playerName" validate={validateName}>
                                {({field, form}: FieldProps) => (
                                    <FormControl isInvalid={!!form.errors.playerName && !!form.touched.playerName}>
                                        <FormLabel htmlFor="playerName">Player Name</FormLabel>
                                        <Input {...field} id="playerName" placeholder=""/>
                                        <FormErrorMessage>{form.errors.playerName}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </Box>
                        <Box m={"3"} pb={"6"}>
                            <Button
                                mt={4}
                                colorScheme="teal"
                                isLoading={props.isSubmitting}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

export default JoinGame