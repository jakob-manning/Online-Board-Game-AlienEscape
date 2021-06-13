import {useState, useCallback, useRef, useEffect, useContext} from "react"

import {AuthContext} from '../context/auth-context';
import {useToast} from "@chakra-ui/react";
import axios from "axios";
import {Toast} from "../types/types";

const {REACT_APP_BACKEND} = process.env;

type methodType = "get" | "post" | "put" | "delete" | "patch"

export const useHttpClient = () => {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const toast = useToast()

    // a reference is something that is not updated between renders
    const activeHttpRequest = useRef([]);

    // we use "useCallback" to prevent infinite loops when the component rerenders
    const sendRequest = useCallback(
        async (
            method: methodType = "get",
            endPoint: string,
            toastContent: Toast = {mode: "mute"},
            body: any = null,
            headers: any = {authorization: "bearer " + auth.token}
        ) => {
            setIsLoading(true)
            const httpAbortCtrl = new AbortController();
            // @ts-ignore
            activeHttpRequest.current.push(httpAbortCtrl)

            try {
                const response = await axios({
                    method,
                    url: REACT_APP_BACKEND + endPoint,
                    data: body,
                    headers: {authorization: "bearer " + auth.token}
                })
                if(response.data){
                    if(toastContent.mode !== "mute" && toastContent.successMode !== "mute"){
                        toast({
                            title: toastContent.successTitle || "Success!",
                            description:  toastContent.successBody || "yippee ki yay!",
                            status: toastContent.successStatus || "success",
                            duration: 4000,
                            isClosable: true,
                        })
                    }
                }
                else {
                    if(toastContent.mode !== "mute" && toastContent.errorMode !== "mute"){
                        toast({
                            title: (toastContent.errorTitle || "Uh Oh!"),
                            description: (toastContent.errorFallBack || "Something went wrong behind the scenes. Please try again."),
                            status: (toastContent.errorStatus || "error"),
                            duration: 6000,
                            isClosable: true,
                        })
                    }
                    throw new Error()
                }

                activeHttpRequest.current = activeHttpRequest.current.filter(
                    reqCntrl => reqCntrl !== httpAbortCtrl
                )
                setIsLoading(false);
                return response;
            } catch (e) {
                if(toastContent.mode !== "mute" && toastContent.errorMode !== "mute"){
                    toast({
                        title: (toastContent.errorTitle || "Uh Oh!"),
                        description: (e.response?.data?.message ||  toastContent.errorFallBack || "Something went wrong behind the scenes. Please try again."),
                        status: (toastContent.errorStatus || "error"),
                        duration: 6000,
                        isClosable: true,
                    })
                }
                setIsLoading(false);
                setError(e.message);
                throw e;
            }
        }, [auth, toast])

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            // @ts-ignore
            activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, [])

    return {isLoading, error, sendRequest, clearError}

}