import React from 'react';
import {
    Box,
    CircularProgress,
    Text,
    useToast,
    Button,
    Input,
    InputRightElement,
    InputGroup,
    FormControl,
    FormLabel,
    FormErrorMessage
} from "@chakra-ui/react";
import {Formik, Form, Field, FormikProps, FieldProps, FormikHelpers} from "formik";
import {useHistory} from 'react-router-dom';
import axios from "axios"
import isEmail from 'validator/lib/isEmail';

const {REACT_APP_BACKEND} = process.env;

interface MyFormValues {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = (props) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const history = useHistory()
    const toast = useToast()

    const togglePasswordShow = () => setShowPassword(!showPassword)

    function validateName(value: string) {
        let error
        if (!value) {
            error = "Required"
        }
        return error
    }

    function validatePassword(value: string) {
        let error
        if (!value) {
            error = "Required"
        }
        if (value.length > 8) {
            error = "Password is weaksauce"
        }
        return error
    }

    // TODO: write a validator for email
    function validateNumber(value: string) {
        let error
        if (!value || !(parseInt(value) > 0)) {
            error = "Value required"
        }
        return error
    }

    const submitLoginHandler = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
        const body = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        console.log(values)
        console.log(JSON.stringify(body))
        const url = REACT_APP_BACKEND + "/api/users/signup"

        let response: any
        try {
            response = await axios.post(url, body)
            console.log(response.data)
            if (response.data) {
                toast({
                    title: "You're in.",
                    description: "Welcome back",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                history.push("/")

            } else {
                toast({
                    title: "Something went wrong.",
                    description: "Unable to sign in, please try again.",
                    status: "info",
                    duration: 6000,
                    isClosable: true,
                })
            }

        } catch (e) {
            console.log(e)
            if (e.response) {
                toast({
                    title: "Unable to sign in.",
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
                    Sign Up
                </Text>
            </Box>
            <Text
                m={"5"}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
            >
                Want to play a game? ...
            </Text>

            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: ""
                }}
                onSubmit={(values, actions) => submitLoginHandler(values, actions)}
            >
                {(props: FormikProps<MyFormValues>) => (
                    <Form>
                        <Field name="name" validate={validateName}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
                                    <FormLabel htmlFor="name">User Name</FormLabel>
                                    <Input {...field} id="name" placeholder=""/>
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="email" validate={validateName}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.email && !!form.touched.email}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} id="email" placeholder=""/>
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password" validate={validatePassword}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.password && !!form.touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            placeholder="Enter password"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={togglePasswordShow}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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

export default SignUp