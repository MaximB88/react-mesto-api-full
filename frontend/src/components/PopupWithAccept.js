import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithAccept(props) {
    return(
        <PopupWithForm name="change-avatar" title="Вы уверены?" buttonText="Да" isOpen={props.isOpen} onClose={props.onClose}>
            <h3 className="popup__name">{props.buttonText}</h3>
        </PopupWithForm>
    )
}

export default PopupWithAccept;