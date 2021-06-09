import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider, extendTheme} from "@chakra-ui/react"

// Initialize Chakra Theme
const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
}
const theme = extendTheme({colors})


ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
                <App/>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
