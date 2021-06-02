import React, {useContext} from 'react';
import {
    Box,
    Text,
    Button,
    Link
} from "@chakra-ui/react";
import {AddIcon} from '@chakra-ui/icons'

import {AuthContext} from "../../context/auth-context";


const ReactFunctionalComponent: React.FC = () => {
    const auth = useContext(AuthContext);

    return (
        <div>
            <h1>User ID: {auth.userId} </h1>

        </div>
    );
};

export default ReactFunctionalComponent;
