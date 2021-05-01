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
import useStickyState from "../../hooks/useStickyState";
import {useParams} from 'react-router-dom';
import {Box, Text} from "@chakra-ui/react";

interface RouteParams {
    tableName: string
}

function Game() {
    let tableName = useParams<RouteParams>().tableName;
    if(!tableName) tableName = "casual"

    const [cardDisplayed, setCardDisplayed] = useState<cardInterface | null>(null)
    // Use parameters to search local storage
    const [gameState,setGameState] = useStickyState({tableName:"Unregistered", playerName: "Guest", role:"No Role", items:[] }, tableName)

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
        const newItems = [...gameState.items, currentItem]
        setGameState({...gameState, items: newItems})
        console.log(currentItem)
        return currentItem
    }

    const removeItem = (item: itemInterface) => {
        console.log(item)
        let index = gameState.items.findIndex((element:itemInterface) => element.title === item.title)
        let newItems = [...gameState.items]
        newItems.splice(index, 1)
        console.log(index)
        console.log(newItems)
        setGameState({...gameState, items: newItems})
    }

    return (
        <React.Fragment>
            <Box w="100%" bgGradient="linear(to-l, #7928CA, #FF0080)">
                <Text
                    m={"5"}
                    bgGradient="linear(to-l, #00A,#000)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                >
                    {gameState.playerName}
                </Text>
                <Text
                    m={"5"}
                    bgGradient="linear(to-l, #00A,#000)"
                    bgClip="text"
                    fontSize="xs"
                    opacity={"0.3"}
                    fontWeight="extrabold"
                >
                    {gameState.role}
                </Text>
            </Box>

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
                <UsersCurrentItems itemList={gameState.items} removeItem={(item: itemInterface) => removeItem(item)}/>
            </div>

        </React.Fragment>
    )
}

export default Game;
