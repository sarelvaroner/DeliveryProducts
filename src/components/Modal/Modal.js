import React from 'react';
import './Modal.css';

const Modal = ({ sucssesHandler, name }) => {
    return (
        <div className={'successModalWrapper'} onClick={() => sucssesHandler()}>
            <div className='successModal' >
                {`Thank you for updating product ${name}`}
            </div>
        </div>
    );
}

export default Modal;
