import React, {useState} from "react";
import {
    Button,
    ButtonGroup
} from "@chakra-ui/react";


const HumanAlienSwitch: React.FC = () => {
    const [speciesValue, setSpeciesValue] = useState("Human >");

    const toggleSpecies = () => {
        if(speciesValue === "Human >"){
            setSpeciesValue("< Alien")
        }
        else{
            setSpeciesValue("Human >")
        }
    }

    return (
        <ButtonGroup toggle>
                <Button onClick={() => toggleSpecies()} variant={"dark"}>{speciesValue}</Button>
        </ButtonGroup>

    )
}

export default HumanAlienSwitch