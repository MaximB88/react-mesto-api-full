import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState();
    const [link, setLink] = React.useState();

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        })
    }

    return(
        <PopupWithForm name="change-avatar" title="Добавить место" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="place-name-input" value={name} type="text" name ="name" onChange={handleChangeName} className="popup__input" placeholder="Название" required minLength="2" maxLength="30" />
            <span className="popup__input-error place-name-input-error"></span>
            <input id="place-link-input" value={link} type="url" name ="link" onChange={handleChangeLink} className="popup__input" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error place-link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;