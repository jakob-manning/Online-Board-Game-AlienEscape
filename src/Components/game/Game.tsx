import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card} from "react-bootstrap";
import cardBackMovement from "../../Images/cardBackMovement.jpg"
import chooser from "random-seed-weighted-chooser";
import {cardInterface, itemInterface} from "../../types/types";
import {possibleCards} from "../gamePieces/actionCards"
import {possibleItems} from "../gamePieces/itemCards";
import UsersCurrentItems from "../Items/UsersCurrentItems";
import CenteredCardModal from "../../Modal/CenteredCardModal";
import HumanAlienSwitch from "../HumanAlienSwitch";
import useStickyState from "../../hooks/useStickyState";

function Game() {
    const [cardDisplayed, setCardDisplayed] = useState<cardInterface | null>(null)
    const [storedItems,setStoredItems] = useStickyState([], "BoardGameAlienEscape")

    const closeCard = () => {
        setCardDisplayed(null)
    }

    const generateCard = () => {
        /*
        Generate a random card. If the card is a silent card, generate an item. Update card state accordingly
         */

        console.log("button clicked")
        let newCard = chooser.chooseWeightedObject(possibleCards) as cardInterface
        if (newCard.type === "silence") {
            newCard.item = generateItem()
        }
        setCardDisplayed(newCard)
    }

    const generateItem = () => {
        /*
        Generate an item using weights. Update item state accordingly
         */
        console.log("item requested")
        const randomNumber = Math.floor(Math.random() * 23) + 1
        if (randomNumber <= 6) {
            console.log(null)
            return null
        }
        const currentItem = chooser.chooseWeightedObject(possibleItems) as itemInterface
        setStoredItems([...storedItems, currentItem])
        console.log(currentItem)
        return currentItem
    }

    const removeItem = (item: itemInterface) => {
        console.log(item)
        let index = storedItems.findIndex((element:itemInterface) => element.title === item.title)
        let newItems = [...storedItems]
        newItems.splice(index, 1)
        console.log(index)
        console.log(newItems)
        setStoredItems(newItems)
    }

    return (
        <React.Fragment>
            <HumanAlienSwitch/>
            {cardDisplayed ? <CenteredCardModal title={cardDisplayed.title}
                                                description={cardDisplayed.description}
                                                image={cardDisplayed.image}
                                                show={cardDisplayed != null}
                                                onHide={() => closeCard()}
                                                item={cardDisplayed.item}
            /> : null}
            <Container className={"centerFlex"}>
                <div className="cardBackWrapper">
                    {/*<Button block as={"h1"} onClick={() => generateCard()} variant={"outline-primary"}>Draw</Button>*/}
                    <Card border={"dark"} onClick={() => generateCard()}>
                        <Card.Img src={cardBackMovement} alt="Card back"/>
                    </Card>
                </div>
            </Container>
            <div className={"flexGrow"}>
                <UsersCurrentItems itemList={storedItems} removeItem={(item: itemInterface) => removeItem(item)}/>
            </div>

        </React.Fragment>
    )
}

export default Game;
