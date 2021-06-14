import React, { useRef }  from 'react';

import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import {ArrowForwardIcon} from '@chakra-ui/icons'
import {Field, FieldProps, Form, Formik, FormikHelpers, FormikProps} from "formik";

interface Props {
    submitMessage: (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => void
}

interface MyFormValues {
    message: string
}

const ReactFunctionalComponent: React.FC<Props> = (props: Props) => {

    return (
        <Formik
            initialValues={{
                message: "",
            }}
            onSubmit={(values, actions) => props.submitMessage(values, actions)}
        >
            {(props: FormikProps<MyFormValues>) => (
                <Form>
                    <Field name="message">
                        {({field, form}: FieldProps) => (
                            <FormControl isInvalid={!!form.errors.message && !!form.touched.messsage}>
                                <FormLabel htmlFor="message"></FormLabel>
                                <InputGroup size="md"
                                >
                                    <Input
                                        {...field}
                                        colorScheme="purple"
                                        id="message"
                                        placeholder=""
                                        autoComplete={"off"}
                                        focusBorderColor={"none"}
                                        m={"0"}
                                        pr="4.5rem"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            variant="solid"
                                            colorScheme="purple"
                                            isLoading={props.isSubmitting}
                                            type="submit"
                                        >
                                            <ArrowForwardIcon/>
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    );
};

export default ReactFunctionalComponent;
