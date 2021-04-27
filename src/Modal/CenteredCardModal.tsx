import React, {MouseEventHandler, useState} from 'react';
import {Card, Modal, Button} from "react-bootstrap";
import "./modal.css"
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
            <Card.Title>
                {props.item ? "New Item: " : null}
                {props.item ? props.item?.title : null}
            </Card.Title>
        </React.Fragment>
    )


    return (
        <React.Fragment>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Img variant="top" src={props.image} alt={props.title + " card face"}/>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
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
                    <p />
                    {itemDescription}
                    {moreInfo ? cardDescription : null}
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default CenteredCardModal