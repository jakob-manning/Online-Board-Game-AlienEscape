import {
    Box,
    Text,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react";
import {Formik, Form, Field, FormikProps, FieldProps, FormikHelpers} from "formik";
import {useHttpClient} from "../../hooks/http-hook";
import {Toast} from "../../types/types";

const {REACT_APP_BACKEND} = process.env;

interface MyFormValues {
    name: string;
    description: string;
}

interface Props {
    closeHandler: Function;
    completeHandler: Function;
}

const CreateRoom: React.FC<Props> = (props: Props) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

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
            response = await sendRequest("post", "/api/chat/newRoom", toast ,body)
            if (response.data) {
                actions.setSubmitting(false)
                props.completeHandler()
                actions.resetForm()
                return props.closeHandler()
            }
        } catch (e) {
            console.log(e)
        }
        actions.setSubmitting(false)
        return
    }

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
                                <FormLabel htmlFor="name" m={"2"}>Room Name</FormLabel>
                                <Input {...field}
                                       id="name"
                                       placeholder="Give your room a clever name"
                                       autocomplete={"off"}
                                />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="description" validate={validateDescription}>
                        {({field, form}: FieldProps) => (
                            <FormControl isInvalid={!!form.errors.description && !!form.touched.description}>
                                <FormLabel htmlFor="description" m={"2"} mt={"4"}>Description</FormLabel>
                                <Input
                                    {...field}
                                    id="description"
                                    placeholder="Enter description"
                                    autocomplete={"off"}
                                />
                                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
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
