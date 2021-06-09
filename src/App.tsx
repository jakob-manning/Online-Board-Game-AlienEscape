import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss"
import "./custom.scss"
import backgroundRight from "./Images/gradientRight.svg"
import backgroundLeft from "./Images/gradientLeft.svg"
import backgroundLeftLow from "./Images/gradientLeftLow.svg"
import Footer from "./Components/Footer/Footer";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {useAuth} from "./hooks/auth-hook";
import {AuthContext} from './context/auth-context';

import JoinGame from "./Components/JoinGame/JoinGame";
import NewGame from "./Components/NewGame/NewGame";
import Login from "./Components/User/Login";
import SignUp from "./Components/User/Signup";
import Game from "./Components/game/Game";
import ChatRooms from "./Components/Chat/ChatRooms";
import ChatRoom from "./Components/Chat/ChatRoom";
import VerifyEmail from "./Components/User/VerifyEmail";

function App() {
    const {token, login, logout, userID} = useAuth();

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                login: login,
                logout: logout,
                userId: userID
            }}
        >
            <BrowserRouter>
                <div className={"gameWrapper"}>
                    {/*<img src={backgroundRight} alt={"background gradient"} className={"bgImgRight"}/>*/}
                    <img src={backgroundLeft} alt={"background gradient"} className={"bgImgLeft"}/>
                    <img src={backgroundLeftLow} alt={"background gradient"} className={"bgImgLeftLow"}/>
                    <p/>
                    <Switch>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/signup">
                            <SignUp/>
                        </Route>
                        <Route path="/verify">
                            <VerifyEmail />
                        </Route>
                        <Route path="/chat/:chatRoomName">
                            <ChatRoom />
                        </Route>
                        <Route path="/chat">
                            <ChatRooms />
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
                            <NewGame/>
                        </Route>
                        <Route path="/join_game/:tableName">
                            <JoinGame/>
                        </Route>
                        <Route path="/join_game">
                            <JoinGame/>
                        </Route>
                        <Route exact path="/">
                            <Login/>
                            {/*<HomePage/>*/}
                        </Route>
                        <Route path="/">
                            <p>Error 404 - Page not found</p>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
