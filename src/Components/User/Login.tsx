import React, {useContext} from 'react';
import {
    Box,
    Center,
    Text,
    useToast,
    Button,
    Input,
    InputRightElement,
    FormControl,
    FormLabel,
    FormErrorMessage, InputGroup,
} from "@chakra-ui/react";
import {Formik, Form, Field, FormikProps, FieldProps, FormikHelpers} from "formik";
import {useHistory} from 'react-router-dom';
import axios from "axios"
import isEmail from 'validator/lib/isEmail'

import {AuthContext} from '../../context/auth-context';

const { REACT_APP_BACKEND } = process.env;

interface MyFormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const auth = useContext(AuthContext);
    const [showPassword, setShowPassword] = React.useState(false)
    const history = useHistory()
    const toast = useToast()

    const togglePasswordShow = () => setShowPassword(!showPassword)

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
            email: values.email,
            password: values.password
        }
        const url =  REACT_APP_BACKEND + "/api/users/login"

        let response: any
        try {
            response = await axios.post(url, body)
            if(response.data){
                toast({
                    title: "You're in.",
                    description: "Welcome back",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                actions.setSubmitting(false)
                auth.login(response.data.userId, response.data.token, null);
                return history.push("/chat")
            }
            else {
                toast({
                    title: "Something went wrong.",
                    description: response.data.message || "Unable to sign in, please try again.",
                    status: "info",
                    duration: 6000,
                    isClosable: true,
                })
            }

        } catch (e) {
            console.log(e)
            if(e.response){
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

                    colorScheme={"none"}
                >
                    <Text
                        m={"5"}
                        p={"5"}
                        bgGradient="linear(to-l, #e0e1ff, #ffe0e5)"
                        bgClip="text"
                        fontSize="6xl"
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
                    onClick={() => history.push("/signup")}

                    colorScheme={"none"}
                >
                    <Text
                        m={"5"}
                        p={"1"}
                        bgGradient="linear(to-l, #e0e1ff, #ffe0e5)"
                        bgClip="text"
                        fontSize="6xl"
                        opacity={0.3}
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
                Welcome back cool cat 🐱
            </Text>

            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                onSubmit={(values, actions) => submitLoginHandler(values, actions)}
            >
                {(props: FormikProps<MyFormValues>) => (
                    <Form>
                        <Field name="email" validate={validateEmail}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.email && !!form.touched.email}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} id="email" placeholder="" mb={"5"}/>
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password" validate={validatePassword}>
                            {({field, form}: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.password && !!form.touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup mb={"5"}>
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

export default Login