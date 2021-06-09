import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text
} from "@chakra-ui/react";
import {Field, FieldProps, Form, Formik, FormikProps} from "formik";

const VerifyEmail: React.FC = () => {

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
                    bgGradient="linear(to-l, #008,#000)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                >
                    You're almost there
                </Text>
            </Box>
            <Text
                m={"5"}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
            >
                Please check your email for a verification link
            </Text>
        </React.Fragment>
    );
};

export default VerifyEmail;
