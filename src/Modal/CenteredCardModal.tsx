import React, {MouseEventHandler, useState} from 'react';
import {Card, CardDeck, Modal, Button, Container} from "react-bootstrap";
import "./modal.css"
import ModalBackdrop from "./ModalBackdrop";
import {itemInterface} from "../types/types";

interface Props {
    title: string
    description: string
    image: string
    item: itemInterface | null
    show: boolean
    onHide: MouseEventHandler
}


const CenteredCardModal: React.FC<Props> = (props) => {
    const [moreInfo, setMoreInfo] = useState<boolean>(false)

    const toggleInfo = () => {
        setMoreInfo(!moreInfo)
    }

    const cardDescription = (
        <React.Fragment>
            <Card.Text>
                {props != null ? props.description : null}
            </Card.Text>
        </React.Fragment>
    )

    const itemDescription = (
        <React.Fragment>
            <Card.Subtitle>
                {props.item ? "New Item: " : null}
                {props.item != null ? props.item?.title : null}
                {/*{props.item != null ? props.item?.image : null}*/}
            </Card.Subtitle>
        </React.Fragment>
    )


    return (
        <React.Fragment>
            <ModalBackdrop onHide={props.onHide}></ModalBackdrop>
            <div className={"centerFlex"}>
                <div className="modalCard">
                        <CardDeck>
                            <Card bg={"dark"} text={"white"}>
                                <Card.Img className={"modalCardImage"} variant="top" src={props.image}/>
                                <Card.Body>
                                    <Card.Title>{props.title}</Card.Title>
                                    {itemDescription}
                                    <Button
                                        className="m-2"
                                        variant={"secondary"}
                                        onClick={() => toggleInfo()}
                                    >
                                        Info
                                    </Button>
                                    <Button
                                        className="m-2"
                                        variant={"danger"}
                                        onClick={props.onHide}
                                    >
                                        Done
                                    </Button>
                                    <p></p>
                                    {moreInfo ? cardDescription : null}
                                </Card.Body>
                            </Card>
                        </CardDeck>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CenteredCardModal