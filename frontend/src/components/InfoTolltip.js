import React from 'react';
import success from '../images/success.png';
import error from '../images/error.png';

function InfoTooltip (props) {
    const className = `${props.isOpen ? 'popup_opened' : ''} popup`;
    return(
        <article className={className}>
            <div className="popup__container popup__container_auth">
                <img className="popup__image" src={props.isRegister ? success : error} alt="Статус регистрации" />
                <h3 className="popup__name popup__name_auth">{props.isRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
                <button type="button" className="button popup__close-button" onClick={props.onClose}></button>
            </div>
        </article>
        
    )
}

export default InfoTooltip