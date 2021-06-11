import React, {MouseEventHandler} from 'react';
import "./modal.css"

interface Props {
    onHide: MouseEventHandler
}



const ModalBackdrop: React.FC<Props> = (props) => {
    return (
        <div className={"modalBackdrop"} onClick={props.onHide}>

        </div>
    );
}

export default ModalBackdrop