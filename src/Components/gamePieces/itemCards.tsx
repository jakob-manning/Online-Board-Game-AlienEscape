import {itemInterface} from "../../types/types";
import imageAttack from "../../Images/Items/itemAttack.jpg";
import imageDefence from "../../Images/Items/itemDefence.jpg";
import imageTeleport from "../../Images/Items/itemTeleport.jpg";
import imageSensor from "../../Images/Items/itemSensor.jpg";
import imageMutation from "../../Images/Items/itemMutation.jpg";
import imageClone from "../../Images/Items/itemClone.jpg";
import imageSedatives from "../../Images/Items/itemSedatives.jpg";
import imageCat from "../../Images/Items/itemCat.jpg";
import imageSpotlight from "../../Images/Items/itemSpotlight.jpg";
import imageAdrenaline from "../../Images/Items/itemAdrenaline.jpg";

export const possibleItems: itemInterface[] = [
    {
        title: "Attack",
        description: "Attack, using the same rules as the aliens.",
        image: imageAttack,
        weight: 2
    },
    {
        title: "Defence",
        description: "Play this card immediately when an Alien attacks you. You are NOT AFFECTED BY THE ATTACK.",
        image: imageDefence,
        weight: 1
    },
    {
        title: "Teleport",
        description: "Move directly to the Human Sector. This is in addition to your normal movement which can happen before or after you use the item.",
        image: imageTeleport,
        weight: 1
    },

    {
        title: "Sensor",
        description: "Play on another player. That player must immediately announce their exact location. This card affects both Humans and Aliens.",
        image: imageSensor,
        weight: 1
    },
    {
        title: "Mutation", description: "Use to transform into an Alien.",
        image: imageMutation,
        weight: 1
    },
    {
        title: "Clone",
        description: "Play when an Alien attacks you. Discard your items and begin your next turn in the Human Sector.",
        image: imageClone,
        weight: 1
    },
    {
        title: "Sedatives",
        description: "Do not draw a Dangerous Sector Card this turn. Play at the beginning of your turn",
        image: imageSedatives,
        weight: 3
    },
    {
        title: "Cat",
        description: "Declare noise in two different sectors.",
        image: imageCat,
        weight: 3
    },
    {
        title: "Spotlight",
        description: "Name a Sector. Players in that Sector or any of the six adjacent must announce their location.",
        image: imageSpotlight,
        weight: 2
    },
    {
        title: "Adrenaline",
        description: "Move one extra sector this turn.",
        image: imageAdrenaline,
        weight: 3
    },
]