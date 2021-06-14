import React from 'react';
import "./App.scss"
import "./custom.scss"
import backgroundLeft from "./Images/gradientLeft.svg"
import backgroundLeftLow from "./Images/gradientLeftLow.svg"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useAuth} from "./hooks/auth-hook";
import {AuthContext} from './context/auth-context';

import Login from "./Components/User/Login";
import SignUp from "./Components/User/Signup";
import ChatRooms from "./Components/Chat/ChatRooms";
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
                    <img src={backgroundLeft} alt={"background gradient"} className={"bgImgLeft"}/>
                    <img src={backgroundLeftLow} alt={"background gradient"} className={"bgImgLeftLow"}/>
                    <p/>
                    <Switch>
                        <Route path="/login">
                            {token? <Redirect to="/" /> : <Login/>}
                        </Route>
                        <Route path="/signup">
                            {token? <Redirect to="/" /> : <SignUp/>}
                        </Route>
                        <Route path="/verify">
                            <VerifyEmail />
                        </Route>
                        <Route path="/chat">
                            <Redirect to="/" />
                        </Route>
                        <Route exact path="/">
                            {token ? <ChatRooms /> : <Redirect to="/login" /> }
                        </Route>
                        <Route path="/">
                            {token ? <Redirect to="/" /> : <Redirect to="/login" /> }
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
