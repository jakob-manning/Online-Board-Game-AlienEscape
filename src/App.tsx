import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss"
import "./custom.scss"
import Game from "./Components/game/Game";
import backgroundRight from "./Images/gradientRight.svg"
import backgroundLeft from "./Images/gradientLeft.svg"
import backgroundLeftLow from "./Images/gradientLeftLow.svg"
import Footer from "./Components/Footer/Footer";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { AddIcon } from '@chakra-ui/icons'
import { Box, Text, Button, Link} from "@chakra-ui/react"
import JoinGame from "./Components/JoinGame/JoinGame";
import NewGame from "./Components/NewGame/NewGame";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/Signup";
import {useAuth} from "./hooks/auth-hook";
import HomePage from "./Components/HomePage";

function App() {
    const { token, login, logout, userID } = useAuth();

    return (
        <BrowserRouter>
            <div className={"gameWrapper"}>
                <img src={backgroundRight} alt={"background gradient"} className={"bgImgRight"}/>
                <img src={backgroundLeft} alt={"background gradient"} className={"bgImgLeft"}/>
                <img src={backgroundLeftLow} alt={"background gradient"} className={"bgImgLeftLow"}/>
                <p/>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/game/:tableName">
                        <Game/>
                        <Footer/>
                    </Route>
                    <Route path="/game">
                        <Game/>
                        <Footer/>
                    </Route>
                    <Route path="/new_game">
                        <NewGame />
                    </Route>
                    <Route path="/join_game/:tableName">
                        <JoinGame/>
                    </Route>
                    <Route path="/join_game">
                        <JoinGame/>
                    </Route>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route path="/">
                        <p>Error 404 - Page not found</p>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
