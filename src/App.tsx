import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss"
import "./custom.scss"
import Game from "./Components/game/Game";
import backgroundRight from "./Images/gradientRight.svg"
import backgroundLeft from "./Images/gradientLeft.svg"
import backgroundLeftLow from "./Images/gradientLeftLow.svg"

function App() {

    return (
        <div className={"gameWrapper"}>
            <img src={backgroundRight} alt={"background gradient"} className={"bgImgRight"}/>
            <img src={backgroundLeft} alt={"background gradient"} className={"bgImgLeft"}/>
            <img src={backgroundLeftLow} alt={"background gradient"} className={"bgImgLeftLow"}/>
            <p></p>
            <Game></Game>
        </div>
    );
}

export default App;
