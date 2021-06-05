import React from 'react';

import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
    InputRightAddon
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
                                            p={"2"}
                                >
                                    <Input
                                        {...field}
                                        id="message"
                                        placeholder=""
                                        autocomplete="off"
                                        focusBorderColor={"none"}
                                        m={"0"}
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
    );
};

export default ReactFunctionalComponent;
