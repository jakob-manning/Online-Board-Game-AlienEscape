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

function App() {

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
                        <Box w="100%" bgGradient="linear(to-l, #7928CA, #FF0080)">
                        <Text
                            m={"5"}
                            bgGradient="linear(to-l, #00A,#000)"
                            bgClip="text"
                            fontSize="6xl"
                            fontWeight="extrabold"
                        >
                            Escape From the Aliens In Outer Space
                        </Text>
                        </Box>
                        <Text
                            m={"5"}
                            bgGradient="linear(to-l, #7928CA,#FF0080)"
                            bgClip="text"
                            fontSize="6xl"
                            fontWeight="extrabold"
                        >
                            Hunt or be Hunted
                        </Text>
                        <Link _hover={{textDecoration: "none"}} fontDecoration={"none"} href={"/join_game"}>
                        <Button color={"black"} m={"3"} >
                            <Text
                                m={"2"}
                                bgGradient="linear(to-l, #7928CA,#FF0080)"
                                bgClip="text"
                                fontSize="2xl"
                                fontWeight="bold"
                            >
                                Join a game
                            </Text>
                        </Button>
                        </Link>
                        <Link _hover={{textDecoration: "none"}} fontDecoration={"none"} href={"/new_game"}>
                        <Button color={"black"} m={"3"}>
                            <AddIcon />
                            <Text
                                m={"2"}
                                bgGradient="linear(to-l, #00000A,#300000)"
                                bgClip="text"
                                fontSize="2xl"
                                fontWeight="bold"
                            >
                                Create a new game
                            </Text>
                        </Button>
                        </Link>

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
