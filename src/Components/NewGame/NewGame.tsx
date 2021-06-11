import React from 'react';
import {
    Box,
    Text,
    useToast,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage
} from "@chakra-ui/react";
import {Formik, Form, Field, FormikProps, FieldProps, FormikHelpers} from "formik";
import {useHistory} from 'react-router-dom';
import axios from "axios"
const { REACT_APP_BACKEND } = process.env;

interface MyFormValues {
    tableName: string;
    playerCount: string;
    alienCount: string;
}

const NewGame: React.FC = (props) => {
    const history = useHistory()
    const toast = useToast()

    function validateName(value: string) {
        let error
        if (!value) {
            error = "Table Name is required"
        }
        return error
    }

    function validateNumber(value: string) {
        let error
        if (!value || !(parseInt(value) > 0)) {
            error = "Value required"
        }
        return error
     }

    const submitJoinGameHandler = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
        const body = {
            tableName: values.tableName,
            alienCount: parseInt(values.alienCount),
            humanCount: parseInt(values.playerCount) - parseInt(values.alienCount)
        }
        console.log(values)
        console.log(JSON.stringify(body))
        const url =  REACT_APP_BACKEND + "/newGame"

        let response: any
        try {
            response = await axios.post(url, body)
            console.log(response.data)
            if(response.data){
                toast({
                    title: "You're in.",
                    description: "Table successfully created",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                history.push("/join_game/" + values.tableName)

            }
            else {
                toast({
                    title: "Something went wrong.",
                    description: "Unable to create table, please try again.",
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
                    New Game
                </Text>
            </Box>
            <Text
                m={"5"}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
            >
                Ready or not, here I come...
            </Text>

            <Formik
                initialValues={{
                    tableName: "",
                    playerCount: "5",
                    alienCount: "2"
                }}
                onSubmit={(values, actions) => submitJoinGameHandler(values, actions)}
            >
                {(props: FormikProps<MyFormValues>) => (
                    <Form>
                        <Field name="tableName" validate={validateName}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.tableName && !!form.touched.tableName}>
                                    <FormLabel htmlFor="tableName">Table Name</FormLabel>
                                    <Input {...field} id="tableName" placeholder=""/>
                                    <FormErrorMessage>{form.errors.tableName}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="playerCount" validate={validateNumber}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.playerCount && !!form.touched.playerCount}>
                                    <FormLabel htmlFor="playerCount">Number of Players</FormLabel>
                                    <Input {...field} id="playerCount" placeholder=""/>
                                    <FormErrorMessage>{form.errors.playerCount}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="alienCount" validate={validateNumber}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.alienCount && !!form.touched.alienCount}>
                                    <FormLabel htmlFor="alienCount">Number of Aliens</FormLabel>
                                    <Input {...field} id="alienCount" placeholder=""/>
                                    <FormErrorMessage>{form.errors.alienCount}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
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

export default NewGame