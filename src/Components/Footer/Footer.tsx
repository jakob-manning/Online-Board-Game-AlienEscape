import React from "react";
import "./Footer.css"
import itemRules from "../../Images/ItemRules.jpg"

const Footer: React.FC = () => {

    return (
        <div className={"FooterWrapper"}>
            <a href={"http://www.eftaios.com/downloads/EFTAIOS%20-%202012%20Before%20The%20World%20Ends%20Map%20Pack.zip"}>
                <div className={"FooterItem"}>
                    Maps
                </div>
            </a>
            <a href={itemRules}>
                <div className={"FooterItem"}>
                    Items Rules
                </div>
            </a>
            <a href={"http://www.eftaios.com/EFTAIOSUE.pdf"}>
                <div className={"FooterItem"}>
                    Rules
                </div>
            </a>
        </div>

    )
}

export default Footer