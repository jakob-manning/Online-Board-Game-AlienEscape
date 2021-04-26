import React, {MouseEventHandler, useState} from 'react';
import {Card, CardDeck, Modal, Button} from "react-bootstrap";
import "./modal.css"

interface Props {
    title: string
    description: string
    image: string
    show: boolean
    onHide: MouseEventHandler
    onPlay: MouseEventHandler

}

const CenteredModal: React.FC<Props> = (props) => {
    return (
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
                <div className={"centerFlex middleFlex"}>
                    <img className={"modal-item-img"} src={props.image} alt={props.title + " item icon"} />
                    <p>{props.description}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onPlay} variant={"danger"}>Play</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CenteredModal