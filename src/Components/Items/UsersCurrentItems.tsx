import React, {useState} from 'react';
import {cardInterface, itemInterface} from "../../types/types";
import CenteredModal from "../../Modal/CenteredModal";
import "./UserCurrentItems.css"

interface Props {
    itemList: itemInterface[],
    removeItem: Function
}

const UsersCurrentItems: React.FC<Props> = (props) => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [currentModal, setCurrentModal] = useState<itemInterface>({
        title:"",
        description: "",
        image: ""
    });

    const toggleModal = () => {
        setModalShow(!modalShow)
    }

    const displayModalOfItem = (item: itemInterface) => {
        setCurrentModal(item)
        toggleModal()
    }

    const onPlay = () => {
        toggleModal()
        props.removeItem(currentModal)
    }

    // const cardModal = (
    //     <Card onClick={() => toggleModal()}>
    //         <Card.Body>
    //             <Card.Img variant="top" src={item.image}/>
    //             <Card.Title>
    //                 {item.title}
    //             </Card.Title>
    //             <Card.Text>
    //                 {item.description}
    //             </Card.Text>
    //         </Card.Body>
    //     </Card>
    // )

    return(

        <div>
            <CenteredModal title={currentModal.title}
                           description={currentModal.description}
                           image={currentModal.image}
                           show={modalShow}
                           onHide={()=> toggleModal()}
                           onPlay={() => onPlay()} />
            <div className={"itemHand"}>
                {props.itemList.map( item =>(
                    <img src={item.image} alt={item.title + " icon"}  className={"itemCards"} onClick={() => displayModalOfItem(
                        {
                            title: item.title,
                            description: item.description,
                            image: item.image
                        }
                    )}>
                    </img>
                ))}
            </div>

        </div>
    )
}

export default UsersCurrentItems