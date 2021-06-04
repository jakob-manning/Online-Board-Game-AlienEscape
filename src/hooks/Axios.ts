import {useContext} from "react";
import axios from "axios";

import {AuthContext} from '../context/auth-context';
const { REACT_APP_BACKEND } = process.env;

type methodType = "get" | "post" | "put" | "delete" | "patch"

const Axios = async (method: methodType, endPoint: string, body: any) => {
    const auth = useContext(AuthContext);
    console.log(method)
    console.log(endPoint)
    console.log(body)

    const response = await axios({
        method,
        url: REACT_APP_BACKEND + endPoint,
        data: body,
        headers: {authorization: "bearer " + auth.token}
    })

    console.log(response)

    return response
};

export default Axios;
