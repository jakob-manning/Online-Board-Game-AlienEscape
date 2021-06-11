import React, {useContext} from 'react';
import {
    Box,
    Center,
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

import {AuthContext} from "../../context/auth-context";

const {REACT_APP_BACKEND} = process.env;

interface MyFormValues {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const auth = useContext(AuthContext);
    const [showPassword, setShowPassword] = React.useState(false)
    const history = useHistory()
    const toast = useToast()

    const togglePasswordShow = () => setShowPassword(!showPassword)

    function validateName(value: string) {
        let error
        if (!value) {
            error = "Required"
        }
        if (value.length > 20) {
            error = "Username is too long. Try removing letters from the the middle or either end."
        }
        return error
    }

    function validatePassword(value: string) {
        let error
        if (!value) {
            error = "Password is Required"
        }
        if (value.length < 8) {
            error = "Password is weaksauce"
        }
        return error
    }

    function validateEmail (value: string) {
        let error
        if (!value) {
            error = "Email is Required"
        }
        if (!isEmail(value)) {
            error = "Emails don't look like that, try harder"
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
                    title: "We just sent you an email",
                    description: "With a special link",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                actions.setSubmitting(false)
                auth.login(response.data.userId, response.data.token, null);
                return history.push("/verify")
            } else {
                toast({
                    title: "Something went wrong.",
                    description: "Unable to sign up, please try again.",
                    status: "info",
                    duration: 6000,
                    isClosable: true,
                })
            }

        } catch (e) {
            console.log(e)
            if (e.response) {
                toast({
                    title: "Unable to sign up.",
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
            <Box w="100%"
                 bgGradient="linear(to-l, #7928CA, #FF0080)"
                 justifyContent={"center"}
                 flexDirection={"row"}
                 display={"flex"}
                 flexWrap={"wrap"}
            >
                <Button
                    bg={"none"}
                    m={"5"}
                    p={"10"}
                    pb={"12"}
                    lineHeight={2.2}
                    onClick={() => history.push("/login")}
                    colorScheme={"none"}
                >
                    <Text
                        m={"5"}
                        bgGradient="linear(to-l, #e0e1ff, #ffe0e5)"
                        bgClip="text"
                        fontSize="6xl"
                        opacity={0.3}
                        fontWeight="extrabold"
                    >
                        Login
                    </Text>
                </Button>
                <Button
                    bg={"none"}
                    m={"5"}
                    p={"10"}
                    pb={"12"}
                    lineHeight={2.2}
                    colorScheme={"none"}
                >
                    <Text
                        m={"5"}
                        bgGradient="linear(to-l, #e0e1ff, #ffe0e5)"
                        bgClip="text"
                        fontSize="6xl"
                        fontWeight="extrabold"
                    >
                        Sign Up
                    </Text>
                </Button>
            </Box>
            <Center>
            <Box maxW={"50ch"} m={"5"}>
            <Text
                m={"5"}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
            >
                You look like you just arrived... Welcome!
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
                                    <Input {...field} id="name" placeholder=""  mb={"5"}/>
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="email" validate={validateEmail}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.email && !!form.touched.email}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} id="email" placeholder="you'll have to confirm your email"  mb={"5"}/>
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password" validate={validatePassword}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.password && !!form.touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup size="md"  mb={"5"}>
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
                                colorScheme="pink"
                                isLoading={props.isSubmitting}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
                </Box>
            </Center>
        </React.Fragment>
    )
}

export default SignUp