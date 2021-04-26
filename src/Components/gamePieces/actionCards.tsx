import {cardInterface} from "../../types/types";
import anySectorImage from "../../Images/anySector.jpg";
import yourSectorImage from "../../Images/yourSector.jpg";
import silenceImage from "../../Images/silence.jpg";

export const possibleCards: cardInterface[] = [
    {
        title: "Noise in Any Sector",
        description: "You may fake your position, You must announce 'NOISE IN SECTOR [X,Y]' where [X,Y] is the coordinators of any sector you choose.",
        type: "anySector",
        item: null,
        image: anySectorImage,
        weight:27
    },
    {
        title: "Noise in Your Sector",
        description: "You must announce your location by saying 'NOISE IN SECTOR [X,Y]' where [X,Y] is the coordinators of the Sector you just moved into.",
        type: "yourSector",
        item: null,
        image: yourSectorImage,
        weight:27
    },
    {
        title: "Silence",
        description: "You must announce 'SILENCE IN ALL SECTORS'.",
        type: "silence",
        item: null,
        image: silenceImage,
        weight:23
    }]