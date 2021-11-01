import React from "react";

function PopupWithForm(props) {
    const className = `${props.isOpen ? 'popup_opened' : ''} popup popup_type_${props.name}`;
    
    return(
        <article className={className}>
            <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
                <button type="button" className="button popup__close-button popup__close-button_type_edit" onClick={props.onClose}></button>
                <h3 className="popup__name">{props.title}</h3>
                {props.children}
                <button type="submit" className="button popup__save-button popup__save-button_type-edit">{props.buttonText}</button>
            </form>
        </article>    
    )
}

export default PopupWithForm;